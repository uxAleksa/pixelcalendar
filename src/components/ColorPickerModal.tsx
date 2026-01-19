import React, { useState, useEffect } from "react";
import { MOOD_COLORS } from "../constants/colors";

type ColorPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedColor: string, message: string) => void;
  initialColor?: string;
  initialMessage?: string;
};

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialColor,
  initialMessage = "",
}) => {
  const [selectedColorKey, setSelectedColorKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedColorKey(initialColor ?? null);
      setMessage(initialMessage ?? "");
    }
  }, [isOpen, initialColor, initialMessage]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!selectedColorKey) return;
    onSave(selectedColorKey, message);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "rgba(23,21,19,0.1)",
        backdropFilter: "blur(2px)",
        zIndex: 20,
      }}
      onClick={onClose}
    >
      {/* Bottom sheet */}
      <div
        style={{
          width: 375,
          height: 720,
          backgroundColor: "#1C1C1E",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grabber */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 999,
            backgroundColor: "#3A3A3C",
            alignSelf: "center",
            marginTop: 8,
            marginBottom: 16,
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "relative",
            height: 44,
            width: "100%",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              padding: 0,
              fontSize: 17,
              color: "#007AFF",
              cursor: "pointer",
              outline: "none",
              boxShadow: "none",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            Cancel
          </button>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 17,
              fontWeight: 500,
              color: "#FFFFFF",
              pointerEvents: "none",
            }}
          >
            Select option
          </div>
        </div>

        {/* Options */}
        <div style={{ padding: "0 20px", marginTop: 16 }}>
          <div
            style={{
              width: "100%",
              backgroundColor: "#2C2C2E",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {MOOD_COLORS.map((mood, index) => {
              const isSelected = selectedColorKey === mood.key;
              const isLast = index === MOOD_COLORS.length - 1;

              return (
                <div
                  key={mood.key}
                  onClick={() => setSelectedColorKey(mood.key)}
                  style={{
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    cursor: "pointer",
                    borderBottom: !isLast
                      ? "1px solid rgba(84,84,88,0.4)"
                      : "none",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 2,
                      backgroundColor: mood.color,
                      border: "0.4px solid #FFFFFF",
                      marginRight: 8,
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: "#FFFFFF",
                      textTransform: "capitalize",
                    }}
                  >
                    {mood.label}
                  </div>

                  {isSelected && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6 10L9 13L14 7"
                        stroke="#007AFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div style={{ padding: "0 20px", marginTop: 24 }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add description"
            maxLength={600}
            style={{
              width: "100%",
              height: 120,
              backgroundColor: "#2C2C2E",
              borderRadius: 12,
              border: "1px solid rgba(84,84,88,0.4)",
              padding: 12,
              fontSize: 14,
              color: "#FFFFFF",
              resize: "none",
              outline: "none",
            }}
          />
        </div>

        {/* Save */}
        <button
  onClick={handleSave}
  disabled={!selectedColorKey}
  onMouseEnter={() => setIsHover(true)}
  onMouseLeave={() => setIsHover(false)}
  style={{
    marginTop: 40,
    width: 343,
    height: 48,
    alignSelf: "center",
    borderRadius: 12,
    border: "none",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 16,
    fontWeight: 500,
    color: "#FFFFFF",
    cursor: selectedColorKey ? "pointer" : "not-allowed",
    backgroundColor: selectedColorKey
      ? isHover
        ? "#4A7300"
        : "#4E7702"
      : "#2C2C2E",
  }}
>
  Save
</button>
      </div>
    </div>
  );
};

export default ColorPickerModal;