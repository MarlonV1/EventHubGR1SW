"use client"

import { useState } from "react"
import { Calendar, MapPin, CreditCard, Mail, QrCode, Download, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const eventData = {
  id: 1,
  title: "Festival de Música Electrónica 2024",
  date: "2024-07-15",
  time: "20:00",
  location: "Estadio Nacional",
  price: 75,
  vipPrice: 150,
}

export default function PurchasePage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)
  const [ticketType, setTicketType] = useState("general")
  const [quantity, setQuantity] = useState(1)
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  // Mantener la estructura general pero mejorar el proceso de compra
  // Añadir más opciones y detalles

  // Actualizar el estado para incluir más información
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })

  // Añadir estado de procesamiento
  const [isProcessing, setIsProcessing] = useState(false)

  const ticketPrice = ticketType === "vip" ? eventData.vipPrice : eventData.price
  const total = ticketPrice * quantity

  // Añadir función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target
  setFormData((prev) => ({
    ...prev,
    [id]: value,
  }))
}


  // Actualizar la función de compra para validar datos
  const handlePurchase = () => {
    // Validación básica
    if (step === 2 && (!formData.firstName || !formData.email)) {
      alert("Por favor completa los campos obligatorios")
      return
    }

    if (step === 3 && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      alert("Por favor completa la información de pago")
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Simular procesamiento de pago
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setPurchaseComplete(true)
        setStep(4)
        // Aquí se guardaría la información de la compra en una base de datos
      }, 2000)
    }
  }

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16" />
            </div>
            <CardTitle className="text-3xl">¡Compra Exitosa!</CardTitle>
            <CardDescription className="text-green-100">Tu entrada ha sido confirmada</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Ticket Details */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detalles de tu Entrada</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Evento</p>
                  <p className="font-semibold">{eventData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="font-semibold">{new Date(eventData.date).toLocaleDateString("es-ES")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de Entrada</p>
                  <p className="font-semibold capitalize">{ticketType === "vip" ? "VIP" : "General"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cantidad</p>
                  <p className="font-semibold">{quantity} entrada(s)</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="inline-block bg-white p-6 rounded-lg shadow-lg border-2 border-dashed border-gray-300">
                <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">Código QR de tu entrada</p>
                <p className="text-xs text-gray-500 mt-1">ID: EVT-{Date.now()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Descargar Entrada
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Tu entrada también ha sido enviada a tu correo electrónico</p>
              <Link href="/">
                <Button variant="outline">Volver al Inicio</Button>
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
        <div className="max-w-4xl mx-auto">
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
              <span className={`text-sm ${step >= 1 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>
                Seleccionar
              </span>
              <span className={`text-sm ${step >= 2 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>
                Información
              </span>
              <span className={`text-sm ${step >= 3 ? "text-purple-600 font-semibold" : "text-gray-500"}`}>Pago</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card className="bg-white shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Selecciona tu Entrada</CardTitle>
                    <CardDescription>Elige el tipo y cantidad de entradas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Ticket Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Tipo de Entrada</Label>
                      <div className="grid gap-4">
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            ticketType === "general"
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          onClick={() => setTicketType("general")}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-gray-800">Entrada General</h4>
                              <p className="text-sm text-gray-600">Acceso completo al evento</p>
                              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                                <li>• Acceso a todos los escenarios</li>
                                <li>• Zona de food trucks</li>
                                <li>• Parking incluido</li>
                              </ul>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-purple-600">${eventData.price}</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            ticketType === "vip"
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                          onClick={() => setTicketType("vip")}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-800">Entrada VIP</h4>
                                <Badge className="bg-orange-100 text-orange-800">Limitado</Badge>
                              </div>
                              <p className="text-sm text-gray-600">Zona exclusiva + beneficios premium</p>
                              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                                <li>• Todo lo de entrada general</li>
                                <li>• Zona VIP con vista privilegiada</li>
                                <li>• Bebidas y snacks incluidos</li>
                                <li>• Meet & greet con artistas</li>
                                <li>• Entrada prioritaria</li>
                              </ul>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-orange-600">${eventData.vipPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="space-y-2">
                      <Label className="text-lg font-semibold">Cantidad</Label>
                      <Select
                        value={quantity.toString()}
                        onValueChange={(value) => setQuantity(Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} entrada{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Continuar
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="bg-white shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Información Personal</CardTitle>
                    <CardDescription>Completa tus datos para la entrada</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          placeholder="Tu nombre"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          placeholder="Tu apellido"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Atrás
                      </Button>
                      <Button
                        onClick={handlePurchase}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Continuar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="bg-white shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-800">Información de Pago</CardTitle>
                    <CardDescription>Completa tu compra de forma segura</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input
                        id="cardName"
                        placeholder="Como aparece en tu tarjeta"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CreditCard className="h-4 w-4" />
                        <span>Pago 100% seguro y encriptado</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Atrás
                      </Button>
                      {isProcessing ? (
                        <Button
                          disabled={isProcessing}
                          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        >
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Procesando...
                        </Button>
                      ) : (
                        <Button
                          onClick={handlePurchase}
                          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        >
                          Completar Compra
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-white shadow-xl border-0 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                  <CardTitle>Resumen de Compra</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Event Info */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{eventData.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(eventData.date).toLocaleDateString("es-ES")}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {eventData.location}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Order Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tipo de entrada:</span>
                      <span className="font-semibold capitalize">{ticketType === "vip" ? "VIP" : "General"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cantidad:</span>
                      <span className="font-semibold">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Precio unitario:</span>
                      <span className="font-semibold">${ticketPrice}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${total}</span>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
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
    </div>
  )
}
