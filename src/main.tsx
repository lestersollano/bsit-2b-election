import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import NotFound from "./NotFound.tsx"
import Primer from "./Primer.tsx"
import Voter from "./Voter.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { HashRouter, Route, Routes } from "react-router"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/voter/:id" element={<Voter />} />
                <Route path="/voter/:id/:position" element={<App />} />
                <Route path="/primer" element={<Primer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    </ThemeProvider>
)
