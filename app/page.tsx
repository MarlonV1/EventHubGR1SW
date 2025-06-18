import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data para eventos
const events = [
  {
    id: 1,
    title: "Festival de Música Electrónica 2024",
    description: "Los mejores DJs internacionales en una noche épica",
    date: "2024-07-15",
    time: "20:00",
    location: "Estadio Nacional",
    category: "Música",
    price: 75,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 1250,
    maxCapacity: 2000,
    featured: true,
  },
  {
    id: 2,
    title: "Conferencia Tech Innovation",
    description: "Las últimas tendencias en tecnología e innovación",
    date: "2024-06-20",
    time: "09:00",
    location: "Centro de Convenciones",
    category: "Tecnología",
    price: 45,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 890,
    maxCapacity: 1000,
    featured: false,
  },
  {
    id: 3,
    title: "Feria Gastronómica Internacional",
    description: "Sabores del mundo en un solo lugar",
    date: "2024-06-25",
    time: "11:00",
    location: "Parque Central",
    category: "Gastronomía",
    price: 25,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 2100,
    maxCapacity: 3000,
    featured: true,
  },
  {
    id: 4,
    title: "Taller de Arte Contemporáneo",
    description: "Aprende técnicas modernas de pintura y escultura",
    date: "2024-06-18",
    time: "14:00",
    location: "Museo de Arte",
    category: "Arte",
    price: 35,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 45,
    maxCapacity: 50,
    featured: false,
  },
]

const categories = ["Todos", "Música", "Tecnología", "Gastronomía", "Arte", "Deportes", "Teatro"]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EventHub
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Eventos
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Organizadores
              </Link>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Crear Evento
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Descubre Eventos Increíbles
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Encuentra y compra entradas para los mejores eventos de tu ciudad. Conciertos, conferencias, talleres y
            mucho más.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar eventos..."
                    className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-purple-500"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Eventos Destacados</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter((event) => event.featured)
              .map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <div className="relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Destacado
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">{event.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="text-gray-600">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                        <span>
                          {new Date(event.date).toLocaleDateString("es-ES")} - {event.time}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-purple-600" />
                        <span>
                          {event.attendees}/{event.maxCapacity} asistentes
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-2xl font-bold text-purple-600">${event.price}</span>
                        <Link href={`/event/${event.id}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Ver Detalles
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Todos los Eventos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white"
              >
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-32 object-cover" />
                  <Badge className="absolute top-2 right-2 bg-purple-600 text-white">{event.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800 line-clamp-1">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-1 text-purple-600" />
                      <span>{new Date(event.date).toLocaleDateString("es-ES")}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1 text-purple-600" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-purple-600">${event.price}</span>
                      <Link href={`/event/${event.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">EventHub</h4>
              </div>
              <p className="text-gray-400">La plataforma líder para descubrir y gestionar eventos increíbles.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Eventos</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Música
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tecnología
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Arte
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Gastronomía
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Organizadores</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Panel de Control
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Crear Evento
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Estadísticas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Soporte</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EventHub. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
