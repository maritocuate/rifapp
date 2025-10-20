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
  WarningIcon, 
  TrophyIcon, 
  CalendarIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { formatPrice } from '@/lib/utils'

export function WinnersTable() {
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null)

  const { data: winners, isLoading, error } = trpc.admin.getAllWinners.useQuery()

  const getClaimStatusBadge = (isClaimed: boolean) => {
    if (isClaimed) {
      return <Badge className="bg-green-100 text-green-800">Reclamado</Badge>
    }
    return <Badge className="bg-orange-100 text-orange-800">Pendiente</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner message="Cargando ganadores..." size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <WarningIcon className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los ganadores: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Ganadores</CardTitle>
          <CardDescription>
            Administra todos los ganadores y premios del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ganador</TableHead>
                  <TableHead>Rifa</TableHead>
                  <TableHead>Número Ganador</TableHead>
                  <TableHead>Premio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {winners?.map((winner) => (
                  <TableRow key={winner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <TrophyIcon className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">{winner.profiles?.username}</p>
                          <p className="text-sm text-gray-600">{winner.profiles?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{winner.raffles?.title}</p>
                        <p className="text-sm text-gray-600">{winner.raffles?.alias}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-lg text-yellow-600">
                          {winner.winning_number.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          {formatPrice(winner.prize_value || 0)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getClaimStatusBadge(winner.is_claimed)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {new Date(winner.won_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedWinner(winner.id)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        
                        {!winner.is_claimed && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
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

      {/* Estadísticas de ganadores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ganadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {winners?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premios Reclamados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {winners?.filter(w => w.is_claimed).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premios Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {winners?.filter(w => !w.is_claimed).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatPrice(winners?.reduce((sum, w) => sum + (w.prize_value || 0), 0) || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasa de reclamo */}
      <Card>
        <CardHeader>
          <CardTitle>Tasa de Reclamo de Premios</CardTitle>
          <CardDescription>
            Porcentaje de premios que han sido reclamados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Premios Reclamados</span>
              <span className="text-sm text-gray-600">
                {winners?.filter(w => w.is_claimed).length || 0} de {winners?.length || 0}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${winners?.length ? 
                    ((winners.filter(w => w.is_claimed).length / winners.length) * 100) : 0}%` 
                }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {winners?.length ? 
                Math.round((winners.filter(w => w.is_claimed).length / winners.length) * 100) : 0}% 
              de los premios han sido reclamados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ganadores recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Ganadores Recientes</CardTitle>
          <CardDescription>
            Los últimos ganadores del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {winners?.slice(0, 5).map((winner) => (
              <div key={winner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <TrophyIcon className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{winner.winner_username}</p>
                    <p className="text-sm text-gray-600">
                      Ganó el número {winner.winning_number} en {winner.raffle_title}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {formatPrice(winner.prize_value || 0)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {winner.is_claimed ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ClockIcon className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {winner.is_claimed ? 'Reclamado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
