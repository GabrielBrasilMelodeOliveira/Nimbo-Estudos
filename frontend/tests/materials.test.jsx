import React from "react";
import { it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/shared/theme/theme.js";
import Materials from "../src/pages/materials/Materials.jsx";
import MaterialPreview from "../src/pages/materials/components/MaterialPreview.jsx";
import { useMaterials } from "../src/pages/materials/hooks/useMaterials.jsx";
import JSZip from "jszip";
import { renderDocumentPreview } from "../src/pages/materials/services/documentPreview.js";
const show = (element) =>
  render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

it("opens YouTube inside the site and preserves the same player when expanding and restoring", () => {
  const open = vi.spyOn(window, "open").mockImplementation(() => null);
  show(
    <Materials
      data={{
        materials: [
          {
            id: 1,
            title: "Aula de Java",
            type: "VIDEO",
            url: "https://youtu.be/M7lc1UVf-VE",
          },
        ],
        topics: [],
      }}
      action={vi.fn()}
      working={false}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Abrir Aula de Java" }));
  const player = screen.getByTitle("Vídeo Aula de Java");
  expect(player.getAttribute("src")).toContain(
    "youtube-nocookie.com/embed/M7lc1UVf-VE",
  );
  expect(player.hasAttribute("allowfullscreen")).toBe(true);
  fireEvent.click(screen.getByRole("button", { name: "Tela cheia" }));
  expect(screen.getByTitle("Vídeo Aula de Java")).toBe(player);
  expect(document.querySelector(".MuiDialog-paperFullScreen")).toBeTruthy();
  expect(screen.queryByText("Meu acompanhamento")).toBeNull();
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape", keyCode: 27 });
  expect(screen.getByTitle("Vídeo Aula de Java")).toBe(player);
  expect(document.querySelector(".MuiDialog-paperFullScreen")).toBeNull();
  expect(open).not.toHaveBeenCalled();
});
it("renders local PDFs and images directly with the download source", () => {
  const { rerender } = show(
    <MaterialPreview
      material={{ title: "Apostila", type: "PDF", assetId: "pdf-123" }}
    />,
  );
  expect(
    screen.getByTitle("Leitura do PDF Apostila").getAttribute("src"),
  ).toContain("/api/uploads/pdf-123/content");
  rerender(
    <MaterialPreview
      material={{ title: "Diagrama", type: "IMAGE", assetId: "img-123" }}
    />,
  );
  expect(
    screen.getByRole("img", { name: "Diagrama" }).getAttribute("src"),
  ).toBe("/api/uploads/img-123/content");
});
it("automatically saves a pasted YouTube link as VIDEO", async () => {
  const action = vi.fn().mockResolvedValue(true);
  function Form() {
    const state = useMaterials({ data: { materials: [] }, action });
    return (
      <>
        <button
          onClick={() =>
            state.setForm({
              ...state.form,
              title: "Aula",
              url: "https://youtu.be/M7lc1UVf-VE",
            })
          }
        >
          Preencher
        </button>
        <form onSubmit={state.save}>
          <button>Salvar</button>
        </form>
      </>
    );
  }
  render(<Form />);
  fireEvent.click(screen.getByText("Preencher"));
  fireEvent.click(screen.getByText("Salvar"));
  await waitFor(() =>
    expect(action).toHaveBeenCalledWith(
      "materials",
      "POST",
      expect.objectContaining({
        type: "VIDEO",
        url: "https://youtu.be/M7lc1UVf-VE",
      }),
      expect.any(String),
    ),
  );
});
it("renders DOCX text and tables in an isolated document with no active scripts", async () => {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
  );
  zip.file(
    "_rels/.rels",
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
  );
  zip.file(
    "word/document.xml",
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>Apostila de Java</w:t></w:r></w:p><w:tbl><w:tr><w:tc><w:p><w:r><w:t>Tabela de revisão</w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:sectPr/></w:body></w:document>',
  );
  const html = await renderDocumentPreview(
    await zip.generateAsync({ type: "arraybuffer" }),
  );
  expect(html).toContain("Apostila de Java");
  expect(html).toContain("<table");
  expect(html).toContain("Tabela de revisão");
  expect(html).toContain("Content-Security-Policy");
  expect(html).not.toContain("<script");
});
it("shows a recoverable error for an unavailable DOCX", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false });
  show(
    <MaterialPreview
      material={{ title: "Arquivo", type: "DOCX", assetId: "missing" }}
    />,
  );
  await screen.findByText(/Não foi possível visualizar este DOCX/);
});
