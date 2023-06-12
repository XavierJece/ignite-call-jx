
export const metadata = {
  title: 'Ignite Call',
  description: 'Ignite Call - Agenda agora sua visita',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body >{children}</body>
    </html>
  )
}
