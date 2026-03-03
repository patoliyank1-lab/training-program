'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Header from "@/components/layouts/header";
import CategoryProvider from "@/context/CategoryContext";
import { Provider } from "react-redux";
import store from "@/redux/store";
import JobProvider from "@/context/JobContext";
import Footer from "@/components/layouts/footer";
import AuthProvider from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>JOB finder</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <CategoryProvider>
            <AuthProvider>
            <JobProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
                <Footer />
              </ThemeProvider>
            </JobProvider>
            </AuthProvider>
          </CategoryProvider>
        </Provider>
      </body>
    </html>
  );
}

