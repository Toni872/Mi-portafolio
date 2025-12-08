import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Achievements } from "@/components/gamification/Achievements";
import { Providers } from "@/components/providers/Providers";
import { MatrixBackground } from "@/components/ui/MatrixBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'),
  title: {
    default: "Antonio Lloret | Ingeniero de Software",
    template: "%s | Antonio Lloret"
  },
  description: "Portafolio profesional de Antonio Lloret. Ingeniero de Software especializado en Python y desarrollo full stack con React, Next.js y TypeScript.",
  keywords: ["Ingeniero de Software", "Software Engineer", "Python", "React", "Next.js", "TypeScript", "Full Stack", "Portfolio", "Web Development"],
  authors: [{ name: "Antonio Lloret" }],
  creator: "Antonio Lloret",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://antoniolloret.com",
    title: "Antonio Lloret | Ingeniero de Software",
    description: "Portafolio profesional de Antonio Lloret. Ingeniero de Software especializado en Python y desarrollo full stack.",
    siteName: "Antonio Lloret Portfolio",
    images: [
      {
        url: "/og-image.png", // Needs to be created or added
        width: 1200,
        height: 630,
        alt: "Antonio Lloret Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Lloret | Ingeniero de Software",
    description: "Portafolio profesional de Antonio Lloret. Ingeniero de Software especializado en Python y desarrollo full stack.",
    creator: "@antoniolloret", // Placeholder
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <MatrixBackground />
        <Providers>
          {children}
          <Achievements />
        </Providers>
      </body>
    </html>
  );
}

