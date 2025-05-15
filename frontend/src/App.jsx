import {Box} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import {useColorModeValue} from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import Createpage from "./pages/Createpage";
import Navbar from "./components/Navbar";

function App() {
  console.log("Hello World");
  return (
    <Box minH = {"100vh"} bg = {useColorModeValue("blue.300", "blue.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
      </Routes>
    </Box>
  );
}

export default App;
