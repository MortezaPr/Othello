import { toast } from "react-toastify";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const initialBoard = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "W", "B", "", "", ""],
  ["", "", "", "B", "W", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

export function changeColor(row, col, board, turn) {
  // check color
  let color;
  turn === 1 ? (color = "B") : (color = "W");

  // check north
  let meetEmptyPlace = false;
  for (let i = row - 2; i >= 0; i--) {
    if (board[i][col] === color) {
      for (let j = row - 1; j > i; j--) {
        if (board[j][col] === "" || board[row - 1][col] === color) {
          meetEmptyPlace = true;
          break;
        }
      }
    }
  }
  if (meetEmptyPlace === false) {
    for (let i = row - 2; i >= 0; i--) {
      if (board[i][col] === color) {
        for (let j = row - 1; j > i; j--) {
          if (board[j][col] !== "") {
            board[j][col] = color;
          }
        }
      }
    }
  }

  // check north-east
  meetEmptyPlace = false;
  let temp = row;
  let count = 2;
  while (true) {
    if (row - count < 0) {
      break;
    }
    if (board[row - count][col + count] === color) {
      let r = row - count + 1;
      let c = col + count - 1;
      while (r !== row) {
        if (board[r][c] === "" || board[row - 1][col + 1] === color) {
          meetEmptyPlace = true;
          break;
        }
        r++;
        c--;
      }
    }
    count++;
    temp--;
    if (temp < 0) {
      break;
    }
  }
  if (meetEmptyPlace === false) {
    temp = row;
    count = 2;
    while (true) {
      if (row - count < 0) {
        break;
      }
      if (board[row - count][col + count] === color) {
        let r = row - count + 1;
        let c = col + count - 1;
        while (r !== row) {
          board[r][c] = color;
          r++;
          c--;
        }
      }
      count++;
      temp--;
      if (temp < 0) {
        break;
      }
    }
  }

  // check north-west
  meetEmptyPlace = false;
  temp = row;
  count = 2;
  while (true) {
    if (row - count < 0) {
      break;
    }
    if (board[row - count][col - count] === color) {
      let r = row - count + 1;
      let c = col - count + 1;
      while (r !== row) {
        if (board[r][c] === "" || board[row - 1][col - 1] === color) {
          meetEmptyPlace = true;
          break;
        }
        r++;
        c++;
      }
    }
    count++;
    temp--;
    if (temp < 0) {
      break;
    }
  }
  if (meetEmptyPlace === false) {
    temp = row;
    count = 2;
    while (true) {
      if (row - count < 0) {
        break;
      }
      if (board[row - count][col - count] === color) {
        let r = row - count + 1;
        let c = col - count + 1;
        while (r !== row) {
          board[r][c] = color;
          r++;
          c++;
        }
      }
      count++;
      temp--;
      if (temp < 0) {
        break;
      }
    }
  }

  // south
  meetEmptyPlace = false;
  for (let i = row + 2; i <= 7; i++) {
    if (board[i][col] === color) {
      for (let j = row + 1; j < i; j++) {
        if (board[j][col] === "" || board[row + 1][col] === color) {
          meetEmptyPlace = true;
        }
      }
    }
  }
  if (meetEmptyPlace === false) {
    for (let i = row + 2; i <= 7; i++) {
      if (board[i][col] === color) {
        for (let j = row + 1; j < i; j++) {
          if (board[j][col] !== "") {
            board[j][col] = color;
          }
        }
      }
    }
  }

  // south-east
  meetEmptyPlace = false;
  temp = row;
  count = 2;
  while (true) {
    if (row + count > 7) {
      break;
    }
    if (board[row + count][col + count] === color) {
      let r = row + count - 1;
      let c = col + count - 1;
      while (r !== row) {
        if (board[r][c] === "" || board[row + 1][col + 1] === color) {
          meetEmptyPlace = true;
          break;
        }
        r--;
        c--;
      }
    }
    count++;
    temp++;
    if (temp > 7) {
      break;
    }
  }
  if (meetEmptyPlace === false) {
    temp = row;
    count = 2;
    while (true) {
      if (row + count > 7) {
        break;
      }
      if (board[row + count][col + count] === color) {
        let r = row + count - 1;
        let c = col + count - 1;
        while (r !== row) {
          board[r][c] = color;
          r--;
          c--;
        }
      }
      count++;
      temp++;
      if (temp > 7) {
        break;
      }
    }
  }

  // south-west
  meetEmptyPlace = false;
  temp = row;
  count = 2;
  while (true) {
    if (row + count > 7) {
      break;
    }
    if (board[row + count][col - count] === color) {
      let r = row + count - 1;
      let c = col - count + 1;
      while (r !== row) {
        if (board[r][c] === "" || board[row + 1][col - 1] === color) {
          meetEmptyPlace = true;
          break;
        }
        r--;
        c++;
      }
    }
    count++;
    temp++;
    if (temp > 7) {
      break;
    }
  }
  if (meetEmptyPlace === false) {
    temp = row;
    count = 2;
    while (true) {
      if (row + count > 7) {
        break;
      }
      if (board[row + count][col - count] === color) {
        let r = row + count - 1;
        let c = col - count + 1;
        while (r !== row) {
          board[r][c] = color;
          r--;
          c++;
        }
      }
      count++;
      temp++;
      if (temp > 7) {
        break;
      }
    }
  }

  // east
  meetEmptyPlace = false;
  for (let i = col + 2; i <= 7; i++) {
    if (board[row][i] === color) {
      for (let j = col + 1; j < i; j++) {
        if (board[row][j] === "" || board[row][col + 1] === color) {
          meetEmptyPlace = true;
        }
      }
    }
  }
  if (meetEmptyPlace === false) {
    for (let i = col + 2; i <= 7; i++) {
      if (board[row][i] === color) {
        for (let j = col + 1; j < i; j++) {
          if (board[row][j] !== "") {
            board[row][j] = color;
          }
        }
      }
    }
  }

  // west
  meetEmptyPlace = false;
  for (let i = col - 2; i >= 0; i--) {
    if (board[row][i] === color) {
      for (let j = col - 1; j > i; j--) {
        if (board[row][j] === "" || board[row][col - 1] === color) {
          meetEmptyPlace = true;
        }
      }
    }
  }
  if (meetEmptyPlace === false) {
    for (let i = col - 2; i >= 0; i--) {
      if (board[row][i] === color) {
        for (let j = col - 1; j > i; j--) {
          if (board[row][j] !== "") {
            board[row][j] = color;
          }
        }
      }
    }
  }
}

export function availablePlaces(board, turn) {
  let available = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === "") {
        if (checkPlace(i, j, board, turn)) {
          available.push([i, j]);
        }
      }
    }
  }
  return available;
}

function checkPlace(row, col, board, turn) {
  // check color
  let isAvailable = [];
  let color;
  turn === 1 ? (color = "B") : (color = "W");

  // check north
  let available = false;
  for (let i = row - 1; i >= 0; i--) {
    if (board[i][col] === color && i !== row - 1) {
      for (let j = row - 1; j > i; j--) {
        if (board[j][col] === "") {
          break;
        } else if (j === i + 1) {
          available = true;
        }
      }
    } else if (board[i][col] === color && i === row - 1) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // check north-east
  available = false;
  let temp = row;
  let count = 1;
  while (true) {
    if (row - count < 0) {
      break;
    }
    if (board[row - count][col + count] === color && count !== 1) {
      let r = row - count + 1;
      let c = col + count - 1;
      while (r < row) {
        if (board[r][c] === "" || board[r][c] === color) {
          break;
        } else if (r === row - 1) {
          available = true;
          break;
        }
        r++;
        c--;
      }
    }
    count++;
    temp--;
    if (temp < 0) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // check north-west
  available = false;
  temp = row;
  count = 1;
  while (true) {
    if (row - count < 0) {
      break;
    }
    if (board[row - count][col - count] === color && count !== 1) {
      let r = row - count + 1;
      let c = col - count + 1;
      while (r !== row) {
        if (board[r][c] === "" || board[r][c] === color) {
          break;
        } else if (r === row - 1) {
          available = true;
          break;
        }

        r++;
        c++;
      }
    }

    count++;
    temp--;
    if (temp < 0) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // **************

  // south
  available = false;
  for (let i = row + 1; i <= 7; i++) {
    if (board[i][col] === color && i !== row + 1) {
      for (let j = row + 1; j < i; j++) {
        if (board[j][col] === "") {
          break;
        } else if (j === i - 1) {
          available = true;
        }
      }
    } else if (board[i][col] === color && i === row + 1) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // **************

  // south-east
  available = false;
  temp = row;
  count = 1;
  while (true) {
    if (row + count > 7) {
      break;
    }
    if (board[row + count][col + count] === color && count !== 1) {
      let r = row + count - 1;
      let c = col + count - 1;
      while (r !== row) {
        if (board[r][c] === "" || board[r][c] === color) {
          break;
        } else if (r === row + 1) {
          available = true;
          break;
        }

        r--;
        c--;
      }
    }
    count++;
    temp++;
    if (temp > 7) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // south-west
  available = false;
  temp = row;
  count = 1;
  while (true) {
    if (row + count > 7) {
      break;
    }
    if (board[row + count][col - count] === color && count !== 1) {
      let r = row + count - 1;
      let c = col - count + 1;
      while (r !== row) {
        if (board[r][c] === "" || board[r][c] === color) {
          break;
        } else if (r === row + 1) {
          available = true;
          break;
        }
        r--;
        c++;
      }
    }
    count++;
    temp++;
    if (temp > 7) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // east
  available = false;
  for (let i = col + 1; i <= 7; i++) {
    if (board[row][i] === color && i !== col + 1) {
      for (let j = col + 1; j < i; j++) {
        if (board[row][j] === "") {
          break;
        } else if (j === i - 1) {
          available = true;
        }
      }
    } else if (board[row][i] === color && i === col + 1) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  // west
  available = false;
  for (let i = col - 1; i >= 0; i--) {
    if (board[row][i] === color && i !== col - 1) {
      for (let j = col - 1; j > i; j--) {
        if (board[row][j] === "") {
          break;
        } else if (j === i + 1) {
          available = true;
        }
      }
    } else if (board[row][i] === color && i === col - 1) {
      break;
    }
  }
  if (available) {
    isAvailable.push(1);
  }

  if (isAvailable.length === 0) {
    return false;
  } else {
    return true;
  }
}

export function isGameOver(board) {
  const { white, black } = countPieces(board);
  if (white === 0 || black === 0 || white + black === 64) {
    return true;
  }
  return false;
}

function countPieces(board) {
  let white = 0;
  let black = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === "W") {
        white++;
      } else if (board[i][j] === "B") {
        black++;
      }
    }
  }
  return { white, black };
}

export async function checkGameStatus(board) {
  let { white, black } = countPieces(board);
  if (white === 0 || black === 0) {
    if (white !== 0) {
      toast("⚪ White Wins! ⚪", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast("⚫ Black Wins! ⚫", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    toast(`⚪ White: ${white}   ⚫ Black: ${black}`, {
      position: toast.POSITION.TOP_CENTER,
    });
    await delay(5000);
    return true;
  } else if (white + black === 64) {
    if (white > black) {
      toast("⚪ White Wins! ⚪", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (white < black) {
      toast("⚫ Black Wins! ⚫", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast("🟣 It's a Tie! 🟣", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    toast(`⚪ White: ${white}   ⚫ Black: ${black}`, {
      position: toast.POSITION.TOP_CENTER,
    });
    await delay(5000);
    return true;
  }
  return false;
}
