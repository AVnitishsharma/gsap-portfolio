import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "GSAP Portfolio",
  description: "GSAP Portfolio Website with Next.js, React, Tailwind and GSAP",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
