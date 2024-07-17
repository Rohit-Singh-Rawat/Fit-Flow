import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { dark } from "@clerk/themes";
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";

export const metadata: Metadata = {
  title: "Fit Flow",
  description: "Stackoverflow for Gym Rats",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
