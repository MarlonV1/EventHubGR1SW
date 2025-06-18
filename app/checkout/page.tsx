"use client"

import { useState } from "react"
import { Calendar, CreditCard, Check, ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data para el checkout (en una app real vendría del contexto del carrito)
const mockCartItems = [
  {
    id: 1,
    eventId: 1,
    eventTitle: "Festival de Música Electrónica 2024",
    eventDate: "2024-07-15",
    ticketType: "VIP",
    price: 150,
    quantity: 2,
  },
  {
    id: 2,
    eventId: 2,
    eventTitle: "Conferencia Tech Innovation",
    eventDate: "2024-06-20",
    ticketType: "General",
    price: 45,
    quantity: 1,
  },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // En una app real, usaríamos el contexto del carrito
  // const { cartItems, subtotal, clearCart } = useCart()
  const cartItems = mockCartItems
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxes = subtotal * 0.1
  const total = subtotal + taxes

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Procesar pago
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        // clearCart() // En una app real
      }, 2000)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-3xl">¡Compra Exitosa!</CardTitle>
            <CardDescription className="text-green-100">Tus entradas han sido confirmadas</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-800 mb-2">¡Gracias por tu compra!</p>
              <p className="text-gray-600">
                Hemos enviado un correo electrónico con los detalles de tu compra y tus entradas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Resumen de la Compra</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.ticketType} - {item.eventTitle}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/my-tickets" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Ver Mis Entradas
                </Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EventHub
            </h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">Finalizar Compra</h2>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className={`text-sm ${step >= 1 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>Carrito</span>
            <span className={`text-sm ${step >= 2 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>
              Información
            </span>
            <span className={`text-sm ${step >= 3 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>Pago</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  {step === 1 && "Revisa tu Carrito"}
                  {step === 2 && "Información de Contacto"}
                  {step === 3 && "Información de Pago"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Confirma los eventos y entradas que deseas comprar"}
                  {step === 2 && "Completa tus datos personales"}
                  {step === 3 && "Completa tu compra de forma segura"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="mb-2 sm:mb-0">
                            <h4 className="font-semibold">{item.eventTitle}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(item.eventDate).toLocaleDateString("es-ES")}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                {item.ticketType}
                              </span>
                              <span className="mx-2 text-gray-400">|</span>
                              <span className="text-sm">${item.price} por entrada</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded">
                              <button
                                type="button"
                                className="px-2 py-1 text-gray-600"
                                onClick={() => {
                                  // En una app real: updateQuantity(item.id, item.quantity - 1)
                                }}
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button
                                type="button"
                                className="px-2 py-1 text-gray-600"
                                onClick={() => {
                                  // En una app real: updateQuantity(item.id, item.quantity + 1)
                                }}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico *</Label>
                        <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre *</Label>
                          <Input id="firstName" required value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido *</Label>
                          <Input id="lastName" required value={formData.lastName} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" value={formData.address} onChange={handleChange} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input id="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Input id="country" value={formData.country} onChange={handleChange} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <Tabs defaultValue="credit-card">
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="credit-card" onClick={() => setPaymentMethod("credit-card")}>
                            Tarjeta
                          </TabsTrigger>
                          <TabsTrigger value="paypal" onClick={() => setPaymentMethod("paypal")}>
                            PayPal
                          </TabsTrigger>
                          <TabsTrigger value="bank" onClick={() => setPaymentMethod("bank")}>
                            Transferencia
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="credit-card" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                            <div className="relative">
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                required={paymentMethod === "credit-card"}
                                value={formData.cardNumber}
                                onChange={handleChange}
                              />
                              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                            <Input
                              id="cardName"
                              placeholder="Como aparece en tu tarjeta"
                              required={paymentMethod === "credit-card"}
                              value={formData.cardName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Fecha de Vencimiento *</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/AA"
                                required={paymentMethod === "credit-card"}
                                value={formData.expiry}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                required={paymentMethod === "credit-card"}
                                value={formData.cvv}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="paypal">
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-blue-600 font-bold text-xl">P</span>
                            </div>
                            <p className="text-gray-600 mb-4">
                              Serás redirigido a PayPal para completar tu pago de forma segura.
                            </p>
                            <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
                              Continuar a PayPal
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="bank">
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold mb-2">Datos Bancarios</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Realiza una transferencia a la siguiente cuenta:
                              </p>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-semibold">Banco:</span> Banco Nacional
                                </p>
                                <p>
                                  <span className="font-semibold">Titular:</span> EventHub Inc.
                                </p>
                                <p>
                                  <span className="font-semibold">IBAN:</span> ES91 2100 0418 4502 0005 1332
                                </p>
                                <p>
                                  <span className="font-semibold">Referencia:</span> TU NOMBRE + EMAIL
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Una vez realizada la transferencia, recibirás tus entradas en un plazo de 24-48 horas
                              laborables tras confirmar el pago.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <CreditCard className="h-4 w-4" />
                          <span>Pago 100% seguro y encriptado</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                        Atrás
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className={`flex-1 ${
                        step === 3
                          ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      } text-white`}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Procesando...
                        </>
                      ) : step === 3 ? (
                        "Completar Compra"
                      ) : (
                        "Continuar"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-white shadow-xl border-0 sticky top-8">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <CardTitle>Resumen de Compra</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.ticketType} -{" "}
                        {item.eventTitle.length > 20 ? `${item.eventTitle.substring(0, 20)}...` : item.eventTitle}
                      </span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Impuestos (10%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center pt-4">
                  <p>✓ Confirmación instantánea</p>
                  <p>✓ Código QR incluido</p>
                  <p>✓ Soporte 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
