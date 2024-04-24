import "./App.css";
import Box from "@mui/material/Box";
import GamePage from "./pages/GamePage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence initial={false} mode="wait">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GamePage />
      </Box>
    </AnimatePresence>
  );
}

export default App;
