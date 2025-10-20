'use client'

import { useState } from 'react'
import { trpc } from '@/client/trpc'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Ticket, 
  Warning, 
  CheckCircle,
  Plus,
  Gear
} from '@phosphor-icons/react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface GenerateTicketsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GenerateTicketsModal({ isOpen, onClose }: GenerateTicketsModalProps) {
  const [selectedRaffle, setSelectedRaffle] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [ticketNumbers, setTicketNumbers] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Obtener rifas activas para seleccionar
  const { data: raffles, isLoading: isLoadingRaffles } = trpc.admin.getAllRaffles.useQuery()
  
  // Obtener usuarios para seleccionar
  const { data: users, isLoading: isLoadingUsers } = trpc.admin.getAllUsers.useQuery()

  const generateTicketsMutation = trpc.admin.generateCustomTickets.useMutation({
    onSuccess: () => {
      setSuccess(true)
      setIsGenerating(false)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setSelectedRaffle('')
        setSelectedUser('')
        setTicketNumbers('')
        setError('')
      }, 2000)
    },
    onError: (error) => {
      setError(error.message)
      setIsGenerating(false)
    }
  })

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsGenerating(true)

    // Validar números de tickets
    const numbers = ticketNumbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 1 && n <= 100)
    
    if (numbers.length === 0) {
      setError('Debe especificar al menos un número válido (1-100)')
      setIsGenerating(false)
      return
    }

    try {
      await generateTicketsMutation.mutateAsync({
        raffleId: selectedRaffle,
        userId: selectedUser,
        numbers: numbers
      })
    } catch (error) {
      // Error ya manejado en onError
    }
  }

  const handleClose = () => {
    if (!isGenerating) {
      onClose()
      setSelectedRaffle('')
      setSelectedUser('')
      setTicketNumbers('')
      setError('')
      setSuccess(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-gray-200 shadow-xl">
        <DialogHeader className="bg-gray-50 p-4 rounded-t-lg">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Ticket className="h-5 w-5 text-blue-600" />
            Generar Tickets
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-16 w-16 text-green-600" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-800">Tickets Generados</h3>
                <p className="text-sm text-green-700">
                  Se han generado 100 tickets para la rifa seleccionada
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <Warning className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="raffle" className="text-gray-900 font-medium">Seleccionar Rifa</Label>
                <Select
                  value={selectedRaffle}
                  onValueChange={setSelectedRaffle}
                  disabled={isGenerating || isLoadingRaffles}
                >
                  <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Selecciona una rifa activa" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {raffles?.filter(r => r.status === 'activo').map((raffle) => (
                      <SelectItem key={raffle.id} value={raffle.id} className="text-gray-900">
                        {raffle.title} - {raffle.alias}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600">
                  Solo se muestran rifas activas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user" className="text-gray-900 font-medium">Seleccionar Usuario</Label>
                <Select
                  value={selectedUser}
                  onValueChange={setSelectedUser}
                  disabled={isGenerating || isLoadingUsers}
                >
                  <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Selecciona un usuario" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200">
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id} className="text-gray-900">
                        {user.username} - {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600">
                  Usuario que recibirá los tickets
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numbers" className="text-gray-900 font-medium">Números de Tickets</Label>
                <Input
                  id="numbers"
                  type="text"
                  value={ticketNumbers}
                  onChange={(e) => setTicketNumbers(e.target.value)}
                  placeholder="1, 5, 10, 15, 20"
                  disabled={isGenerating}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <p className="text-xs text-gray-600">
                  Separa los números con comas (ej: 1, 5, 10, 15, 20)
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isGenerating}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isGenerating || !selectedRaffle || !selectedUser || !ticketNumbers.trim() || isLoadingRaffles || isLoadingUsers}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Generar Tickets
                  </>
                )}
              </Button>
            </div>
          </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


