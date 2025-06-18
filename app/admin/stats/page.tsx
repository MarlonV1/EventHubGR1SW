"use client"

import { Calendar, ArrowLeft, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data para estadísticas
const statsData = {
  overview: {
    totalEvents: 15,
    totalRevenue: 245750,
    totalTicketsSold: 4890,
    avgTicketPrice: 50.25,
  },
  monthlyData: [
    { month: "Ene", revenue: 18500, tickets: 370 },
    { month: "Feb", revenue: 22300, tickets: 446 },
    { month: "Mar", revenue: 28900, tickets: 578 },
    { month: "Abr", revenue: 35200, tickets: 704 },
    { month: "May", revenue: 41800, tickets: 836 },
    { month: "Jun", revenue: 38750, tickets: 775 },
  ],
  topEvents: [
    { name: "Festival de Música Electrónica", revenue: 93750, tickets: 1250 },
    { name: "Conferencia Tech Innovation", revenue: 40050, tickets: 890 },
    { name: "Feria Gastronómica Internacional", revenue: 52500, tickets: 2100 },
    { name: "Concierto de Rock Clásico", revenue: 28800, tickets: 480 },
  ],
  categoryStats: [
    { category: "Música", events: 6, revenue: 145250, percentage: 59 },
    { category: "Tecnología", events: 4, revenue: 52300, percentage: 21 },
    { category: "Gastronomía", events: 3, revenue: 32500, percentage: 13 },
    { category: "Arte", events: 2, revenue: 15700, percentage: 7 },
  ],
}

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Estadísticas
                </h1>
              </div>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Último mes</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statsData.overview.totalEvents}</div>
              <p className="text-xs text-gray-500">+3 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${statsData.overview.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">+15% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Entradas Vendidas</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {statsData.overview.totalTicketsSold.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">+12% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Precio Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">${statsData.overview.avgTicketPrice}</div>
              <p className="text-xs text-gray-500">+2% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Ingresos Mensuales</CardTitle>
              <CardDescription>Evolución de ingresos en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {statsData.monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-md mb-2 transition-all hover:opacity-80"
                      style={{
                        height: `${(data.revenue / Math.max(...statsData.monthlyData.map((d) => d.revenue))) * 200}px`,
                        minHeight: "20px",
                      }}
                    />
                    <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    <span className="text-xs text-gray-500">${(data.revenue / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tickets Chart */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Entradas Vendidas</CardTitle>
              <CardDescription>Número de entradas vendidas por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {statsData.monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-md mb-2 transition-all hover:opacity-80"
                      style={{
                        height: `${(data.tickets / Math.max(...statsData.monthlyData.map((d) => d.tickets))) * 200}px`,
                        minHeight: "20px",
                      }}
                    />
                    <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    <span className="text-xs text-gray-500">{data.tickets}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Events */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Eventos Más Exitosos</CardTitle>
              <CardDescription>Ranking por ingresos generados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsData.topEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{event.name}</p>
                        <p className="text-xs text-gray-600">{event.tickets} entradas vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${event.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Estadísticas por Categoría</CardTitle>
              <CardDescription>Distribución de ingresos por tipo de evento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statsData.categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{category.category}</span>
                      <span className="text-sm text-gray-600">{category.events} eventos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{category.percentage}%</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${category.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
