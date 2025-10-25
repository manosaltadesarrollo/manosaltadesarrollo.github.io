import type { PortableTextBlock } from "@portabletext/react";

export interface Publication {
  _originalId: string;
  descripcionBreve: string;
  descripcionCompleta: PortableTextBlock[];
  estado: string;
  fecha: string;
  fotoUrl: string;
  subtitulo: string;
  titulo: string;
}
