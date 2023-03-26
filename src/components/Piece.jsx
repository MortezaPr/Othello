import "./Piece.css";

export default function Piece({color}) {
  return (
    <div
      className="piece"
      style={color == "white" ? { background: "#F8F4EA" } : { background: "#181818" }}
    />
  );
}