import { createRoot, Root } from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    __app_root?: Root;
  }
}

const container = document.getElementById("root")!;
window.__app_root = window.__app_root || createRoot(container);
window.__app_root.render(<App />);
