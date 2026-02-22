'use client';

import { Provider } from "react-redux";
import store from "./redux/store";
import ThemeProvider from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default Wrapper