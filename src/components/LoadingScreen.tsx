import { useEffect, useState } from "react";

type Props = {
  setIsLoading: (value: boolean) => void;
};

function LoadingScreen({ setIsLoading }: Props) {
  const fullText = "loading...";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.blocks}>
        <div style={{ ...styles.block, background: "#FFFFFF" }} />
        <div />
        <div style={{ ...styles.block, background: "#00F5A0" }} />
        <div style={{ ...styles.block, background: "#FFFFFF" }} />
      </div>

      <div style={styles.text}>{text}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#171513",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  blocks: {
    display: "grid",
    gridTemplateColumns: "24px 24px",
    gridTemplateRows: "24px 24px",
    gap: 2,
  },

  block: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },

  text: {
    position: "absolute",
    bottom: 80,
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 0.5,
    color: "#FFFFFF",
  },
};

export default LoadingScreen;