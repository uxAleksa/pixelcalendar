import React from "react";

function NotesHistoryScreen({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        width: 375,
        height: 812,
        margin: "0 auto",
        backgroundColor: "#121212",
        color: "#fff",
        position: "relative",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: 20,
          left: 16,
          background: "none",
          border: "none",
          color: "#007AFF",
          fontSize: 17,
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <div style={{ paddingTop: 80, paddingLeft: 16 }}>
        Here will be your notes
      </div>
    </div>
  );
}

export default NotesHistoryScreen;