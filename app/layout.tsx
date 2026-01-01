import "./globals.css"

// Root layout that just passes through to locale layout
// All actual layout logic is in app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
