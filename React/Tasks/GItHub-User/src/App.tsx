import { BrowserRouter, Routes, Route } from "react-router";
import { UserPage, HomePage } from './page'
import Search from "./page/SearchPage";
import ThemeProvider from "./context/ThemeContext";


function App() {

  return (
    <div className="h-lvh">
    <BrowserRouter>
      <Routes>
        <Route path={`/`}
          element={
            <>
              <ThemeProvider>
                <HomePage />
              </ThemeProvider>
            </>
          } />
        <Route path={`search/:keyword`}
          element={
            <>
              <ThemeProvider>
                <Search />
              </ThemeProvider>
            </>
          } />
        <Route path={`users/:username`}
          element={
            <>
              <ThemeProvider>
                <UserPage />
              </ThemeProvider>
            </>
          } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
