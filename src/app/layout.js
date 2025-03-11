import "./styles/globals.css";

export const metadata = {
  title: "VisaTrendWise Dashboard",
  description: "Visa Hackathon",
  icons: {
    icon: "/visa-logo.png", // Path to your favicon
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
