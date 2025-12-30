import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raushan Raj | Full Stack Developer & Cybersecurity Enthusiast",
  description: "Computer Engineering student at Thapar Institute specializing in full-stack web development and cybersecurity. Building secure, scalable systems with React, Next.js, Firebase, and PostgreSQL.",
  keywords: ["Full Stack Developer", "Cybersecurity", "Web Development", "React", "Next.js", "Firebase", "PostgreSQL", "Ethical Hacking", "Computer Engineering"],
  authors: [{ name: "Raushan Raj" }],
  openGraph: {
    title: "Raushan Raj | Full Stack Developer & Cybersecurity Enthusiast",
    description: "Building secure, scalable web systems with a security-first mindset",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

