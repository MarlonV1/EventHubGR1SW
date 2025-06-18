"use client"

import { Calendar, MapPin, Users, Clock, Star, Share2, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/shopping-cart"

// Mock data para el evento específico
const eventData = {
  1: {
    id: 1,
    title: "Festival de Música Electrónica 2024",
    description:
      "Los mejores DJs internacionales en una noche épica que no podrás olvidar. Ven y disfruta de la mejor música electrónica con efectos visuales espectaculares.",
    longDescription:
      "El Festival de Música Electrónica 2024 es el evento más esperado del año. Con más de 12 horas de música continua, contaremos con la presencia de los DJs más reconocidos a nivel internacional. El evento incluye múltiples escenarios, zona VIP, food trucks gourmet y una experiencia audiovisual única.",
    date: "2024-07-15",
    time: "20:00",
    endTime: "06:00",
    location: "Estadio Nacional",
    address: "Av. Principal 123, Ciudad",
    category: "Música",
    price: 75,
    vipPrice: 150,
    image: "/placeholder.svg?height=400&width=800",
    attendees: 1250,
    maxCapacity: 2000,
    rating: 4.8,
    reviews: 324,
    organizer: "MusicEvents Pro",
    features: [
      "3 escenarios principales",
      "Zona VIP exclusiva",
      "Food trucks gourmet",
      "Efectos visuales 3D",
      "Parking gratuito",
      "Seguridad 24/7",
    ],
    lineup: ["DJ Snake", "Martin Garrix", "Tiësto", "David Guetta", "Armin van Buuren"],
  },
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = eventData[1] // En una app real, usarías params.id

  const { addToCart } = useCart()

type TicketType = "VIP" | "GENERAL" // o los tipos que uses realmente

const handleAddToCart = (ticketType: TicketType) => {
  addToCart({
    id: Date.now(), // En una app real, esto vendría del backend
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    ticketType: ticketType,
    price: ticketType === "VIP" ? event.vipPrice : event.price,
  })
}


  if (!event) {
    return <div>Evento no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EventHub
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge className="mb-2 bg-gradient-to-r from-orange-500 to-red-500">{event.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center space-x-4 text-lg">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{event.rating}</span>
              <span className="text-gray-300 ml-1">({event.reviews} reseñas)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Información del Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Fecha</p>
                      <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString("es-ES", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Horario</p>
                      <p className="text-gray-600">
                        {event.time} - {event.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Ubicación</p>
                      <p className="text-gray-600">{event.location}</p>
                      <p className="text-sm text-gray-500">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Asistentes</p>
                      <p className="text-gray-600">
                        {event.attendees} de {event.maxCapacity}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">{event.longDescription}</p>
                <Separator className="my-6" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Características</h4>
                    <ul className="space-y-2">
                      {event.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Lineup</h4>
                    <ul className="space-y-2">
                      {event.lineup.map((artist, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-pink-600 rounded-full mr-3" />
                          {artist}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Organizador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">MP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{event.organizer}</h4>
                    <p className="text-gray-600">Organizador verificado</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">4.9 (156 eventos)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Purchase */}
          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-2xl sticky top-24">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Comprar Entradas</CardTitle>
                <CardDescription className="text-purple-100">Asegura tu lugar en este increíble evento</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Ticket Options */}
                <div className="space-y-4">
                  <div className="border-2 border-purple-200 rounded-lg p-4 hover:border-purple-400 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">Entrada General</h4>
                        <p className="text-sm text-gray-600">Acceso completo al evento</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">${event.price}</p>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart("GENERAL")}
                          className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Añadir al Carrito
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-orange-200 rounded-lg p-4 hover:border-orange-400 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-800">Entrada VIP</h4>
                        <p className="text-sm text-gray-600">Zona exclusiva + beneficios</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600">${event.vipPrice}</p>
                        <Badge className="bg-orange-100 text-orange-800">Limitado</Badge>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart("VIP")}
                          className="mt-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        >
                          Añadir al Carrito
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Purchase Button */}
                <Link href={`/purchase/${event.id}`}>
                  <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Comprar Ahora
                  </Button>
                </Link>

                <div className="text-center text-sm text-gray-500">
                  <p>✓ Pago seguro</p>
                  <p>✓ Confirmación instantánea</p>
                  <p>✓ Código QR incluido</p>
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Entradas vendidas</span>
                  <span className="font-semibold">{event.attendees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disponibles</span>
                  <span className="font-semibold text-green-600">{event.maxCapacity - event.attendees}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    style={{ width: `${(event.attendees / event.maxCapacity) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {Math.round((event.attendees / event.maxCapacity) * 100)}% vendido
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
