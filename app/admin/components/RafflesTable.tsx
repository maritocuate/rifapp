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
  CheckCircle, 
  XCircle, 
  Trash, 
  Eye,
  Calendar,
  CurrencyDollar,
  Users
} from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { formatPrice } from '@/lib/utils'

export function RafflesTable() {
  const [selectedRaffle, setSelectedRaffle] = useState<string | null>(null)

  const { data: raffles, isLoading, error } = trpc.admin.getAllRaffles.useQuery()
  
  const finishRaffleMutation = trpc.admin.finishRaffle.useMutation({
    onSuccess: () => {
      // Refrescar la lista de rifas
      window.location.reload()
    }
  })

  const deleteRaffleMutation = trpc.admin.deleteRaffle.useMutation({
    onSuccess: () => {
      // Refrescar la lista de rifas
      window.location.reload()
    }
  })

  const handleFinishRaffle = (raffleId: string) => {
    if (confirm('¿Estás seguro de que quieres finalizar esta rifa?')) {
      finishRaffleMutation.mutate({ raffleId })
    }
  }

  const handleDeleteRaffle = (raffleId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta rifa? Esta acción no se puede deshacer.')) {
      deleteRaffleMutation.mutate({ raffleId })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'activo':
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case 'finalizado':
        return <Badge className="bg-gray-100 text-gray-800">Finalizado</Badge>
      case 'cancelado':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner message="Cargando rifas..." size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Warning className="h-4 w-4" />
        <AlertDescription>
          Error al cargar las rifas: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Rifas</CardTitle>
          <CardDescription>
            Administra todas las rifas del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {raffles?.map((raffle) => (
                  <TableRow key={raffle.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{raffle.title}</p>
                        <p className="text-sm text-gray-600">{raffle.alias}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{raffle.profiles?.username}</p>
                        <p className="text-sm text-gray-600">{raffle.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(raffle.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {raffle.soldNumbers}/100 vendidos
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(raffle.soldNumbers / 100) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {100 - raffle.soldNumbers} disponibles
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CurrencyDollar className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          {formatPrice(raffle.revenue)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(raffle.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRaffle(raffle.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {raffle.status === 'activo' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFinishRaffle(raffle.id)}
                            disabled={finishRaffleMutation.isPending}
                            className="text-orange-600 hover:text-orange-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {raffle.soldNumbers === 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteRaffle(raffle.id)}
                            disabled={deleteRaffleMutation.isPending}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rifas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {raffles?.filter(r => r.status === 'activo').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(raffles?.reduce((sum, r) => sum + r.revenue, 0) || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Rifa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatPrice(
                raffles?.length ? 
                (raffles.reduce((sum, r) => sum + r.revenue, 0) / raffles.length) : 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
