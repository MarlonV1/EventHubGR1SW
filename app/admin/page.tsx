"use client"

import { useState } from "react"
import { Calendar, Plus, Edit, Trash2, Users, DollarSign, TrendingUp, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data para eventos del organizador
const organizerEvents = [
  {
    id: 1,
    title: "Festival de Música Electrónica 2024",
    date: "2024-07-15",
    category: "Música",
    status: "Activo",
    sold: 1250,
    capacity: 2000,
    revenue: 93750,
    price: 75,
  },
  {
    id: 2,
    title: "Conferencia Tech Innovation",
    date: "2024-06-20",
    category: "Tecnología",
    status: "Activo",
    sold: 890,
    capacity: 1000,
    revenue: 40050,
    price: 45,
  },
  {
    id: 3,
    title: "Taller de Arte Contemporáneo",
    date: "2024-06-18",
    category: "Arte",
    status: "Finalizado",
    sold: 45,
    capacity: 50,
    revenue: 1575,
    price: 35,
  },
]

export default function AdminPage() {
  const [events, setEvents] = useState(organizerEvents)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalSold = events.reduce((sum, event) => sum + event.sold, 0)
  const activeEvents = events.filter((event) => event.status === "Activo").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EventHub Admin
              </h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/admin/stats">
                <Button variant="outline" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Estadísticas</span>
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Ver Sitio Público</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Eventos Activos</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeEvents}</div>
              <p className="text-xs text-gray-500">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Entradas Vendidas</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalSold.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+8% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tasa de Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">68%</div>
              <p className="text-xs text-gray-500">+3% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Management */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-800">Gestión de Eventos</CardTitle>
                <CardDescription>Administra todos tus eventos desde un solo lugar</CardDescription>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Evento</DialogTitle>
                    <DialogDescription>Completa la información para crear tu evento</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título del Evento</Label>
                        <Input id="title" placeholder="Nombre del evento" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="musica">Música</SelectItem>
                            <SelectItem value="tecnologia">Tecnología</SelectItem>
                            <SelectItem value="arte">Arte</SelectItem>
                            <SelectItem value="gastronomia">Gastronomía</SelectItem>
                            <SelectItem value="deportes">Deportes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea id="description" placeholder="Describe tu evento..." />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Fecha</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Hora</Label>
                        <Input id="time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacidad</Label>
                        <Input id="capacity" type="number" placeholder="1000" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input id="location" placeholder="Lugar del evento" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>
                        <Input id="price" type="number" placeholder="50" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Crear Evento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Vendidas/Capacidad</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString("es-ES")}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          event.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>
                          {event.sold}/{event.capacity}
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">${event.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
