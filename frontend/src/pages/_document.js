import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap"
      rel="stylesheet" />
      <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"/>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
