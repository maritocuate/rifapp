'use client'

import { useState } from 'react'
import { trpc } from '@/client/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Warning, 
  Ticket, 
  Calendar,
  User,
  Eye,
  CheckCircle,
  XCircle,
  Plus,
  Gear
} from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { formatPrice } from '@/lib/utils'
import { GenerateTicketsModal } from './index'

export function TicketsTable() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const { data: tickets, isLoading, error } = trpc.admin.getAllTickets.useQuery()

  const getStatusBadge = (isSold: boolean) => {
    if (isSold) {
      return <Badge className="bg-green-100 text-green-800">Vendido</Badge>
    }
    return <Badge variant="outline">Disponible</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner message="Cargando tickets..." size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <Warning className="h-4 w-4" />
          <AlertDescription>
            Error al cargar los tickets: {error.message}
          </AlertDescription>
        </Alert>
        
        {/* Mostrar el botón de generar tickets incluso si hay error */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestión de Tickets</CardTitle>
                <CardDescription>
                  Administra todos los tickets del sistema
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowGenerateModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Generar Tickets
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Modal para generar tickets */}
        {showGenerateModal && (
          <GenerateTicketsModal
            isOpen={showGenerateModal}
            onClose={() => setShowGenerateModal(false)}
          />
        )}
      </div>
    )
  }

  // Filtrar solo tickets vendidos para la tabla principal
  const soldTickets = tickets?.filter(ticket => ticket.is_sold) || []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestión de Tickets</CardTitle>
              <CardDescription>
                Administra todos los tickets vendidos del sistema
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowGenerateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Generar Tickets
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Rifa</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Compra</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {soldTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-blue-600" />
                        <span className="font-mono font-bold text-lg">
                          {ticket.number.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.raffles?.title}</p>
                        <p className="text-sm text-gray-600">{ticket.raffles?.alias}</p>
                        <Badge variant="outline" className="text-xs">
                          {ticket.raffles?.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{ticket.profiles?.username}</p>
                          <p className="text-sm text-gray-600">{ticket.profiles?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(ticket.is_sold)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          Ticket #{ticket.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de tickets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tickets?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {soldTickets.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {(tickets?.length || 0) - soldTickets.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Venta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {tickets?.length ? 
                Math.round((soldTickets.length / tickets.length) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets por rifa */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución por Rifa</CardTitle>
          <CardDescription>
            Número de tickets vendidos por cada rifa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets?.reduce((acc, ticket) => {
              const raffleId = ticket.raffle_id
              if (!acc[raffleId]) {
                acc[raffleId] = {
                  raffle: ticket.raffles,
                  sold: 0,
                  total: 0
                }
              }
              acc[raffleId].total++
              if (ticket.is_sold) {
                acc[raffleId].sold++
              }
              return acc
            }, {} as Record<string, any>) && 
            Object.values(tickets.reduce((acc, ticket) => {
              const raffleId = ticket.raffle_id
              if (!acc[raffleId]) {
                acc[raffleId] = {
                  raffle: ticket.raffles,
                  sold: 0,
                  total: 0
                }
              }
              acc[raffleId].total++
              if (ticket.is_sold) {
                acc[raffleId].sold++
              }
              return acc
            }, {} as Record<string, any>)).map((raffleData: any) => (
              <div key={raffleData.raffle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{raffleData.raffle.title}</p>
                  <p className="text-sm text-gray-600">{raffleData.raffle.alias}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {raffleData.sold}/{raffleData.total} vendidos
                  </p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(raffleData.sold / raffleData.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tickets recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets Recientes</CardTitle>
          <CardDescription>
            Los últimos tickets vendidos en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {soldTickets.slice(0, 5).map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Ticket className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Número {ticket.number.toString().padStart(2, '0')}</p>
                    <p className="text-sm text-gray-600">
                      {ticket.raffles?.title} - {ticket.profiles?.username}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Ticket #{ticket.id}
                  </p>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    Vendido
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal para generar tickets */}
      {showGenerateModal && (
        <GenerateTicketsModal
          isOpen={showGenerateModal}
          onClose={() => setShowGenerateModal(false)}
        />
      )}
    </div>
  )
}
