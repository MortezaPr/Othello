import "./Board.css";
import { useState, useEffect } from "react";
import Piece from "./Piece";
import Shadow from "./Shadow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  availablePlaces,
  changeColor,
  checkGameStatus,
  initialBoard,
  isGameOver,
} from "../logic";

export default function Board({ board, changeBoard }) {
  const [turn, setTurn] = useState(1);
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const movesStatus = availablePlaces(board, turn);
    setMoves(movesStatus);
    if (movesStatus.length === 0 && !isGameOver(board)) {
      toast.error("You can't play!", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTurn((prev) => prev * -1);
    }
  }, [turn]);

  function checkSelectedPlace(row, col) {
    let moves = availablePlaces(board, turn);
    for (let i = 0; i < moves.length; i++) {
      if (moves[i][0] === row && moves[i][1] === col) {
        return true;
      }
    }
    toast.error("You can't place your piece here!", {
      position: toast.POSITION.TOP_CENTER,
    });
    return false;
  }

  async function click(row, col) {
    if (board[row][col] === "" && checkSelectedPlace(row, col)) {
      let curBoard = [...board];
      if (turn === 1) {
        curBoard[row][col] = "B";
      } else {
        curBoard[row][col] = "W";
      }
      setTurn((prev) => prev * -1);
      changeColor(row, col, curBoard, turn);
      changeBoard(curBoard);
      setMoves([]);
      const res = await checkGameStatus(board);
      if (res) {
        changeBoard(initialBoard);
        setTurn(1);
      }
    } else if (board[row][col] !== "") {
      toast.error("This place is Full", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function showPiece(row, col) {
    const thePiece = board[row][col];
    if (thePiece === "W") {
      return <Piece key={`${row}-${col}`} color={"white"} />;
    } else if (thePiece === "B") {
      return <Piece key={`${row}-${col}`} color={"black"} />;
    }
  }

  function shadow(row, col) {
    for (let i = 0; i < moves.length; i++) {
      if (moves[i][0] === row && moves[i][1] === col) {
        return <Shadow />;
      }
    }
  }

  return (
    <>
      <table cellSpacing="0" className="board">
        {board.map((line, rowIndex) => {
          return (
            <tbody>
              <tr key={rowIndex}>
                {line.map((cell, colIndex) => {
                  return (
                    <td
                      className="button"
                      onClick={() => click(rowIndex, colIndex)}
                      key={colIndex}
                    >
                      {showPiece(rowIndex, colIndex)}
                      {moves.length > 0 ? shadow(rowIndex, colIndex) : ""}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </table>
      <ToastContainer />
      <p className="turn">Turn: {turn === 1 ? "⚫ Black ⚫" : "⚪ White ⚪"}</p>
    </>
  );
}
