import { Text } from "@mantine/core";

interface PocketPallLogoProps {
  darkMode?: boolean;
  width?: number;
  height?: number;
}

const PocketPallLogo = (props: PocketPallLogoProps): React.ReactNode => {
  const defaultSize = 28;
  const size = props.width
    ? props.width * 0.5
    : props.height
      ? props.height * 0.7
      : defaultSize;

  return (
    <Text
      fw={700}
      size={`${size}px`}
      style={{
        background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.5px",
      }}
    >
      PocketPall
    </Text>
  );
};

export default PocketPallLogo;
