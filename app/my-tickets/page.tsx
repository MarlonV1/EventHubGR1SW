"use client"

import { useState } from "react"
import {
  Calendar,
  QrCode,
  Download,
  ArrowLeft,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

// ✅ Interfaz para los tickets
interface Ticket {
  id: string
  eventId: number
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  ticketType: string
  price: number
  purchaseDate: string
  status: "active" | "used"
}

// Mock data para entradas compradas
const purchasedTickets: Ticket[] = [
  {
    id: "TKT-1234567",
    eventId: 1,
    eventTitle: "Festival de Música Electrónica 2024",
    eventDate: "2024-07-15",
    eventTime: "20:00",
    eventLocation: "Estadio Nacional",
    ticketType: "VIP",
    price: 150,
    purchaseDate: "2024-05-20",
    status: "active"
  },
  {
    id: "TKT-7654321",
    eventId: 2,
    eventTitle: "Conferencia Tech Innovation",
    eventDate: "2024-06-20",
    eventTime: "09:00",
    eventLocation: "Centro de Convenciones",
    ticketType: "General",
    price: 45,
    purchaseDate: "2024-05-15",
    status: "active"
  },
  {
    id: "TKT-9876543",
    eventId: 3,
    eventTitle: "Taller de Arte Contemporáneo",
    eventDate: "2024-06-18",
    eventTime: "14:00",
    eventLocation: "Museo de Arte",
    ticketType: "General",
    price: 35,
    purchaseDate: "2024-05-10",
    status: "used"
  }
]

export default function MyTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTickets = purchasedTickets.filter((ticket) => {
    const matchesSearch = ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    return matchesSearch && matchesStatus
  })

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
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Eventos
              </Link>
              <Link href="/my-tickets" className="text-purple-600 font-medium">
                Mis Entradas
              </Link>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Mi Cuenta
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">Mis Entradas</h2>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar por nombre de evento..."
                className="pl-10 border-2 border-gray-200 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="used">Utilizados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="past">Pasados</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            {filteredTickets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets
                  .filter((ticket) => ticket.status === "active")
                  .map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
              </div>
            ) : (
              <EmptyState message="No tienes entradas próximas que coincidan con tu búsqueda" />
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            {filteredTickets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets
                  .filter((ticket) => ticket.status === "used")
                  .map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
              </div>
            ) : (
              <EmptyState message="No tienes entradas pasadas que coincidan con tu búsqueda" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// ✅ Componente tipado para los tickets
const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const [showQR, setShowQR] = useState(false)

  const isActive = ticket.status === "active"
  const eventDate = new Date(ticket.eventDate)

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
      <div
        className={`h-2 ${isActive
          ? "bg-gradient-to-r from-green-500 to-emerald-500"
          : "bg-gradient-to-r from-gray-300 to-gray-400"
          }`}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">
              {ticket.eventTitle}
            </CardTitle>
            <CardDescription>
              {new Date(ticket.eventDate).toLocaleDateString("es-ES")} - {ticket.eventTime}
            </CardDescription>
          </div>
          <Badge className={isActive
            ? "bg-green-100 text-green-800 hover:bg-green-100"
            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
          }>
            {isActive ? "Activo" : "Utilizado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tipo de entrada:</span>
            <span className="font-semibold">{ticket.ticketType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Precio:</span>
            <span className="font-semibold">${ticket.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ubicación:</span>
            <span className="font-semibold">{ticket.eventLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ID de entrada:</span>
            <span className="font-mono text-xs">{ticket.id}</span>
          </div>
        </div>
        {showQR && (
          <div className="mt-4 p-4 bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center">
            <QrCode className="h-32 w-32 text-gray-800" />
            <p className="text-xs text-gray-500 mt-2">{ticket.id}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button
          variant={showQR ? "outline" : "default"}
          className={`flex-1 ${showQR
            ? ""
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            }`}
          onClick={() => setShowQR(!showQR)}
        >
          {showQR ? "Ocultar QR" : "Mostrar QR"}
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Descargar
        </Button>
      </CardFooter>
    </Card>
  )
}

// ✅ Componente EmptyState tipado
const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No hay entradas</h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
      <Link href="/">
        <Button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
          Explorar Eventos
        </Button>
      </Link>
    </div>
  )
}
