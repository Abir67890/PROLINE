"use client";

import { useState } from "react";

type PdfViewerProps = {
  url: string;
  title?: string;
};

function getFileName(url: string): string {
  const raw = url.split("/").pop() ?? "document.pdf";
  try {
    return decodeURIComponent(raw).replace(/[\\/:*?"<>|%]/g, "_");
  } catch {
    return raw.replace(/[\\/:*?"<>|%]/g, "_");
  }
}

export default function PdfViewer({ url, title = "Document PDF" }: PdfViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const fileName = getFileName(url);

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-toolbar">
        <span className="pdf-viewer-title">{title}</span>
        <div className="pdf-viewer-actions">
          <a href={url} target="_blank" rel="noopener noreferrer" className="pdf-viewer-btn">
            Ouvrir
          </a>
          <a href={url} download={fileName} className="pdf-viewer-btn pdf-viewer-btn-primary">
            Télécharger
          </a>
        </div>
      </div>

      <div className="pdf-viewer-body">
        {!loaded && !failed && <p className="pdf-viewer-status">Chargement du document…</p>}
        {failed && (
          <p className="pdf-viewer-status">
            Impossible d'afficher le document. Utilisez les boutons ci-dessus pour l'ouvrir ou le télécharger.
          </p>
        )}
        <iframe
          src={url}
          title={title}
          className="pdf-viewer-frame"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ display: failed ? "none" : "block" }}
        />
      </div>
    </div>
  );
}