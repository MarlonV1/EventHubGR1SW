import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
// Importar el CartProvider
import { CartProvider } from "@/components/shopping-cart"

export const metadata: Metadata = {
  title: "EventHub",
  description: "Desarrollado por Marlon Vinueza y Josué Aldaz",
}

// Actualizar el RootLayout para incluir el CartProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
