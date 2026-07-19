import { createRoot } from "react-dom/client"

import "./index.css"
import Primer from "./Primer.tsx"
import Voter from "./Voter.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { HashRouter, Route, Routes } from "react-router"
import Choose from "./Choose.tsx"
import RequireUser from "./RequireUser.tsx"
import Validate from "./Validate.tsx"
import Results from "./Results.tsx"
import AwaitingResults from "./AwaitingResults.tsx"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Primer />} />
                <Route path="/voter/:id" element={<RequireUser />}>
                    <Route index element={<Voter />} />
                    <Route path=":position" element={<Choose />} />
                </Route>
                <Route path="/primer" element={<Primer />} />
                <Route path="/validation" element={<Validate />} />
                <Route path="/awaiting-results" element={<AwaitingResults />} />
                <Route path="/results" element={<Results />} />
                <Route path="*" element={<Primer />} />
            </Routes>
        </HashRouter>
    </ThemeProvider>
)
