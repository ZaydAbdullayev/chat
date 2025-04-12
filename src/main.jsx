import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout";
import { ChatBox } from "./chat";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/chat/:chatId" element={<ChatBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
