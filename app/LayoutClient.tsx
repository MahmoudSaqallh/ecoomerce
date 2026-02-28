"use client"

import { usePathname } from "next/navigation"
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

export default function LayoutClient({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const hideOn = [
    "/Ui-components/Page/Login/",
    "/Ui-components/Page/Regester/"
  ]


  const hideLayout = hideOn.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      {children}

    
    {!hideLayout && <Footer/> }

    </>
  )
}
