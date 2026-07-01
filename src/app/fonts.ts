import { Raleway } from "next/font/google";
import localFont from "next/font/local";

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const customFont = localFont({
  src: "../../public/fonts/custom.woff2",
  variable: "--font-custom",
  display: "swap",
});
