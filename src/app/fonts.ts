import { Manrope } from "next/font/google";
import localFont from "next/font/local";

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const customFont = localFont({
  src: "../../public/fonts/custom.woff2",
  variable: "--font-custom",
  display: "swap",
});
