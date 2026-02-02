// Route: src/app/layout.js
// Goal: keep the code stable.
// To change fonts later, you only edit ONE line: the import line below.

import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // regular → bold
});

const monoFont = IBM_Plex_Sans ({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Zamor Data & Models",
  description: "Scientific data analysis, modeling & technical solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.className} ${monoFont.className}`}>
        {children}
      </body>
    </html>
  );
}
