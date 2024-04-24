import { Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const entAnim = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    scale: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    transition: {
      // duration: 0.9,
      type: "spring",
      damping: 15,
      stiffness: 500,
    },
  },
  visible2: {
    scale: 1,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      damping: 15,
      stiffness: 500,
    },
  },
  hover: {
    scale: 0.8,
  },
  color: {
    color: "#009b4d",
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
  exitup: {
    opacity: 0,
  },
};

const GamePage = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(0);

  const handleClick = (a, b) => {
    if (winner) return; // game is already over
    if (board[a][b] !== "") return; // cell is already occupied

    const newBoard = [...board];
    newBoard[a][b] = turn;
    setBoard(newBoard);

    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);

    checkWinner();
  };
  const checkWinner = () => {
    // check rows and columns
    for (let a = 0; a < 3; a++) {
      if (
        board[a][0] === board[a][1] &&
        board[a][1] === board[a][2] &&
        board[a][0] !== ""
      ) {
        setWinner(board[a][0]);
        return;
      }
      if (
        board[0][a] === board[1][a] &&
        board[1][a] === board[2][a] &&
        board[0][a] !== ""
      ) {
        setWinner(board[0][a]);
        return;
      }
    }

    // check diagonals
    if (
      (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      setWinner(board[1][1]);
      return;
    }

    // check for draw
    if (!board.flat().includes("")) {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setTurn("X");
    setWinner(null);
  };
  return (
    <Box sx={{ display: "inline-block" }}>
      <AnimatePresence initial={false} mode="wait">
        {winner && (
          <Box
            component={motion.div}
            variants={entAnim}
            initial="hidden"
            animate="visible2"
            exit="exit"
            sx={{
              width: "100%",
              display: "flex",

              position: "fixed",
              top: 20,
              left: 0,
              right: 0,
            }}
          >
            {winner === "draw" ? (
              <Typography
                variant="h3"
                sx={{ marginLeft: 0.5, color: "#ffffff" }}
              >
                It is a draw!
              </Typography>
            ) : (
              <Typography variant="h4" sx={{ color: "#ffffff" }}>
                Player
                <Typography
                  variant="caption"
                  color="initial"
                  sx={{ fontSize: 50, marginLeft: 0.5, color: "#ffffff" }}
                >
                  {winner}
                </Typography>{" "}
                wins!
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={resetGame}
              elevation={0}
              sx={{
                display: "flex",
                background:
                  "radial-gradient(at 0% 30%, #ff003f90 0px,#ffd4ff90 80%)",
              }}
            >
              New Game
            </Button>
          </Box>
        )}
      </AnimatePresence>

      {board.map((row, a) => (
        <Box
          key={a}
          sx={{
            display: "flex",
            maxWidth: "auto",
          }}
        >
          {row.map((cell, b) => (
            <Box
              key={b}
              onClick={() => handleClick(a, b)}
              sx={{
                width: "70px",
                height: "70px",
                // border: "1px solid black",
                boxShadow: "1px 1px 5px #22222260",
                margin: 0.5,
                background:
                  "radial-gradient(at 100% 0%, #ff003f90 0px, #00d4ff90 80%)",
                borderRadius: 1,
              }}
            >
              {/* <AnimatePresence initial={false} mode="wait"> */}
              <Typography
                variant="h3"
                component={motion.h3}
                variants={entAnim}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                exit="exit"
                sx={{ fontSize: 60, fontWeight: "bold", color: "#ffffff" }}
              >
                {cell}
              </Typography>
              {/* </AnimatePresence> */}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default GamePage;
