import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "UCN HEP Journal Club",
  description: "High Energy Physics Journal Club at Universidad Católica del Norte (UCN).",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${bodyFont.className} ${monoFont.className}`}>
        {children}
      </body>
    </html>
  );
}
