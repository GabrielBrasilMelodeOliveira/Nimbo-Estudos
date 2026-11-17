import {
  LibraryBig,
  Link2,
  FileText,
  Video,
  Folder,
  BookOpenText,
  Image as ImageIcon,
  FileType2,
} from "lucide-react";
export const icons = {
  PDF: FileText,
  DOCX: FileType2,
  IMAGE: ImageIcon,
  VIDEO: Video,
  QUESTIONS: BookOpenText,
  DRIVE: Folder,
  COURSE: LibraryBig,
  OTHER: Link2,
};
export const blank = {
  title: "",
  url: "",
  type: "PDF",
  topicId: "",
  description: "",
  assetId: null,
  previewAssetId: null,
};
export const mastery = {
  WEAK: "Preciso revisar",
  MEDIUM: "Em aprendizado",
  STRONG: "Domino bem",
};
export const fmt = (n) => (n === 1 ? "1 material" : `${n} materiais`);
