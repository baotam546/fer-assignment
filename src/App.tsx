import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import OrdersPage from "./pages/orders";
import { BookNavbar } from "./components/Navbar";
import UnreadBooks from "./pages/unreadBooks";
import AllBooks from "./pages/all";
import BookDetials from "./pages/detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookNavbar />}>
            <Route index element={<Home />} />
          <Route path="/se11111/unreadBooks" element={< UnreadBooks/>} />
          <Route path="/se11111/allBooks" element={< AllBooks/>} />
          <Route path="/se11111/:id" element={< BookDetials/>} />
          
          {/* <Route path="*" element={<NoPage />} />  */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
