export async function renderDocumentPreview(buffer) {
  const { renderAsync } = await import("docx-preview");
  const documentCopy = document.implementation.createHTMLDocument("Documento");
  await renderAsync(buffer, documentCopy.body, documentCopy.head, {
    inWrapper: true,
    ignoreWidth: true,
    useBase64URL: true,
    renderAltChunks: false,
    breakPages: true,
  });
  documentCopy
    .querySelectorAll("script, iframe, object, embed")
    .forEach((element) => element.remove());
  const policy = documentCopy.createElement("meta");
  policy.httpEquiv = "Content-Security-Policy";
  policy.content =
    "default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; font-src data: blob:;";
  documentCopy.head.prepend(policy);
  documentCopy.documentElement.lang = "pt-BR";
  return "<!doctype html>" + documentCopy.documentElement.outerHTML;
}
