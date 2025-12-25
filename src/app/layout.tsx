import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://retromol.vercel.app";

export const metadata: Metadata = {
  title: "RetroMol - Pixel Art Protein Icons",
  description: "Transform 3D protein structures into retro pixel art. Search by PDB ID or upload your own file. Export as PNG or animated GIF. Free under CC0.",
  keywords: ["protein", "PDB", "molecular", "retro", "pixel art", "icons", "free", "science", "biology", "3Dmol", "visualization"],
  authors: [{ name: "RetroMol" }],
  creator: "RetroMol",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "RetroMol - Pixel Art Protein Icons",
    description: "Transform 3D protein structures into retro pixel art. Free under CC0.",
    siteName: "RetroMol",
    images: [
      {
        url: "/screenshot-hero.png",
        width: 1200,
        height: 630,
        alt: "RetroMol - Pixel Art Protein Visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RetroMol - Pixel Art Protein Icons",
    description: "Transform 3D protein structures into retro pixel art. Free under CC0.",
    images: ["/screenshot-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
