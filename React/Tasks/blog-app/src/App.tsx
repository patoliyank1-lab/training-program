import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login, SignUp, Home, User, Blogs } from './pages'
import ThemeProvider from "./context/ContextValue";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./utils/userData";


function App() {

  const [isLogin, setIsLogin] = useState<boolean>()

  useEffect(()=>{
      const user =  getCurrentUser()

      if(user && user.id){
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setIsLogin(true)
      }
  },[])

  return (
    <div className="h-lvh flex flex-col overflow-hidden">
    <BrowserRouter>
      <Routes>
        <Route path={`/`}
          element={
            <>
              <ThemeProvider>
                <Home />
              </ThemeProvider>
            </>
          } />

          <Route path={'/blogs'} element={
            <>
            <ThemeProvider>
                <Blogs />
              </ThemeProvider>
            </>
          } />

        <Route path={`login`}
          element={
          !isLogin ?
           ( <>
              <ThemeProvider>
                <Login />
              </ThemeProvider>
            </>) : (<>
            <Navigate replace to={'/user'} />
            </>)
          } />
        <Route path={`register`}
          element={
           <>
              <ThemeProvider>
                <SignUp />
              </ThemeProvider>
            </>
          } />

          <Route path={`user`}
          element={
           <>
              <ThemeProvider>
                <User />
              </ThemeProvider>
            </>
          } />

      <Route path={`/*`} element={
        <>
        <h1>Page not Found</h1>
        </>
      } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
