import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TimeGen",
  description: "College Timetable Generator",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-slate-800`}>
        <div>
        {children}
        </div>
      </body>
    </html>
  )
}
