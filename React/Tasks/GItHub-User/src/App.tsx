import { BrowserRouter, Routes, Route } from "react-router";
import { UserPage, HomePage } from './page'

function App() {




  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`users/:username`} element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
