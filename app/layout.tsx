import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatBot } from "@/components/ai/ChatBot";
import { Achievements } from "@/components/gamification/Achievements";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'),
  title: {
    default: "Antonio Lloret | Desarrollador Full Stack & AI Specialist",
    template: "%s | Antonio Lloret"
  },
  description: "Portafolio profesional de Antonio Lloret. Desarrollador Full Stack especializado en Inteligencia Artificial, Agentes Autónomos y Experiencias Web Inmersivas.",
  keywords: ["Desarrollador Full Stack", "AI Specialist", "React", "Next.js", "TypeScript", "Agentes Autónomos", "Portfolio", "Web Development"],
  authors: [{ name: "Antonio Lloret" }],
  creator: "Antonio Lloret",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://antoniolloret.com",
    title: "Antonio Lloret | Desarrollador Full Stack & AI Specialist",
    description: "Portafolio profesional de Antonio Lloret. Especialista en IA y Desarrollo Web.",
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
    title: "Antonio Lloret | Desarrollador Full Stack & AI Specialist",
    description: "Portafolio profesional de Antonio Lloret. Especialista en IA y Desarrollo Web.",
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
        <ThemeProvider>
          {children}
          <ChatBot />
          <Achievements />
        </ThemeProvider>
      </body>
    </html>
  );
}

