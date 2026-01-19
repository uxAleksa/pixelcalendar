import { MOOD_COLORS, MOOD_LABEL_STYLE, MOOD_SQUARE_STYLE } from "../constants/colors";

function ColorLegend() {
  return (
    <div
  style={{
    position: "absolute",
    top: 80,
    right: 16,
    zIndex: 2,
  }}
>
      {MOOD_COLORS.map((item) => (
        <div
          key={item.key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            marginBottom: 12
          }}
        >
          <div
            style={{
              ...MOOD_SQUARE_STYLE,
              backgroundColor: item.color,
            }}
          />
          <span style={MOOD_LABEL_STYLE}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default ColorLegend;