"use client"

import type React from "react"

import { useState } from "react"
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Tipo para los items del carrito
type CartItem = {
  id: number
  eventId: number
  eventTitle: string
  eventDate: string
  ticketType: string
  price: number
  quantity: number
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      // Verificar si el item ya existe en el carrito
      const existingItemIndex = prev.findIndex((i) => i.eventId === item.eventId && i.ticketType === item.ticketType)

      if (existingItemIndex >= 0) {
        // Si existe, incrementar la cantidad
        const newItems = [...prev]
        newItems[existingItemIndex].quantity += 1
        return newItems
      } else {
        // Si no existe, añadir nuevo item
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
      <ShoppingCartSheet />
    </CartContext.Provider>
  )
}

// Contexto para el carrito
import { createContext, useContext } from "react"

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Componente del carrito
function ShoppingCartSheet() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, subtotal, clearCart } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-purple-600">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Tu carrito está vacío"
              : `Tienes ${totalItems} entrada${totalItems !== 1 ? "s" : ""} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 my-6 max-h-[60vh] overflow-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b pb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.eventTitle}</h4>
                    <p className="text-xs text-gray-500">{new Date(item.eventDate).toLocaleDateString("es-ES")}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.ticketType}
                      </Badge>
                      <span className="ml-2 text-sm font-semibold">${item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Impuestos</span>
                <span className="font-semibold">${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(subtotal * 1.1).toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={clearCart}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar
                </Button>
                <SheetClose asChild>
                  <Link href="/checkout" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Finalizar Compra
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-6">Tu carrito está vacío</p>
            <SheetClose asChild>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Explorar Eventos
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
