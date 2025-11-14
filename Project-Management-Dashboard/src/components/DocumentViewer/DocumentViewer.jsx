import { useRef, useState } from "react";
import styles from "./DocumentViewer.module.css";

export default function DocumentViewer({ doc, onClose }) {
  const modalRef = useRef(null);
  const [isFull, setIsFull] = useState(false);

  function toggleFull() {
    if (!document.fullscreenElement && modalRef.current) {
      modalRef.current.requestFullscreen();
      setIsFull(true);
    } else {
      document.exitFullscreen();
      setIsFull(false);
    }
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function renderContent() {
    if (!doc || !doc.url || !isValidUrl(doc.url)) {
      return <p className={styles.error}>Document could not be loaded.</p>;
    }

    if (doc.type === "pdf" || doc.type === "iframe") {
      return <iframe src={doc.url} className={styles.frame} title={doc.name} />;
    }

    if (doc.type === "image") {
      return <img src={doc.url} alt={doc.name} className={styles.image} />;
    }

    return <p className={styles.error}>Unsupported document type.</p>;
  }

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <h3>{doc?.name || "Document Viewer"}</h3>
          <div className={styles.actions}>
            <button onClick={toggleFull}>
              {isFull ? "Exit Fullscreen" : "Fullscreen"}
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}
