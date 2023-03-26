import { useState } from "react";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "W", "B", "", "", ""],
    ["", "", "", "B", "W", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);

  function changeBoard(newBoard) {
    setBoard(newBoard);
  }

  return (
    <div className="App">
      <Board board={board} changeBoard={changeBoard} />
    </div>
  );
}

export default App;
