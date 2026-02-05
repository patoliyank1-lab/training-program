import { BrowserRouter, Routes, Route } from "react-router";
import { UserPage, HomePage } from './page'
import Search from "./page/SearchPage";
import Header from "./components/Header";

function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`}
          element={
            <>
              <Header />
              <HomePage />
            </>
          } />
        <Route path={`search/:keyword`}
          element={
            <>
              <Header />
              <Search />
            </>
          } />
        <Route path={`users/:username`}
          element={
            <>
              <Header />
              <UserPage />
            </>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
