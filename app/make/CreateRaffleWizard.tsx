'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { trpc } from '@/client/trpc'
import { styled } from '@mui/material/styles'
import { Box, Typography, Button, Stepper, Step, StepLabel, Alert } from '@mui/material'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { BasicInfoStep } from './BasicInfoStep'
import { PrizeConfigStep } from './PrizeConfigStep'
import { ReviewStep } from './ReviewStep'
import { useProfanityFilter, CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'

const WizardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
}))

const StepperContainer = styled(Box)(({ theme }) => ({
  padding: '1rem 0',
  marginBottom: '1rem',
}))

const ContentContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.03))',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  padding: '2rem',
  boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)',
}))

const WizardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#ffd700',
  textAlign: 'center',
  marginBottom: '1.5rem',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
}))

const StepContent = styled(Box)(({ theme }) => ({
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}))

const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  paddingTop: '1rem',
  borderTop: '1px solid rgba(255, 215, 0, 0.2)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontWeight: 600,
  padding: '0.75rem 1.5rem',
  borderRadius: '10px',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  color: '#ffd700',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
    boxShadow: '0 0 25px rgba(255, 215, 0, 0.4)',
  },
  
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}))

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffd700, #ffed4e)',
  color: '#1a0033',
  border: '2px solid #ffd700',
  
  '&:hover': {
    background: 'linear-gradient(145deg, #ffed4e, #ffd700)',
    boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
  },
}))

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    '& .MuiStepLabel-label': {
      fontFamily: 'var(--font-orbitron), monospace',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem',
      fontWeight: 500,
    },
    '& .MuiStepLabel-label.Mui-active': {
      color: '#ffd700',
      fontWeight: 600,
      textShadow: '0 0 5px rgba(255, 215, 0, 0.3)',
    },
    '& .MuiStepLabel-label.Mui-completed': {
      color: '#ffd700',
      fontWeight: 600,
    },
  },
  '& .MuiStepIcon-root': {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '1.2rem',
    '&.Mui-active': {
      color: '#ffd700',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))',
    },
    '&.Mui-completed': {
      color: '#ffd700',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))',
    },
  },
  '& .MuiStepConnector-root': {
    '& .MuiStepConnector-line': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderTopWidth: 2,
    },
  },
  '& .MuiStepConnector-root.Mui-active': {
    '& .MuiStepConnector-line': {
      borderColor: '#ffd700',
      borderTopWidth: 2,
    },
  },
  '& .MuiStepConnector-root.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: '#ffd700',
      borderTopWidth: 2,
    },
  },
}))

interface RaffleData {
  title: string
  description: string
  prize_description: string
  prize_image_url: string
  number_cost: number
}

const steps = [
  'Información Básica',
  'Configuración del Premio',
  'Revisión y Confirmación'
]

export function CreateRaffleWizard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [raffleData, setRaffleData] = useState<RaffleData>({
    title: '',
    description: '',
    prize_description: '',
    prize_image_url: '',
    number_cost: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const { data: userRaffleCount, isLoading: isLoadingCount } = trpc.raffles.getUserRaffleCount.useQuery(
    { author_id: user?.id || '' },
    { enabled: !!user }
  )

  const createRaffleMutation = trpc.raffles.create.useMutation({
    onSuccess: (data) => {
      router.push(`/${data.alias}`)
    },
    onError: (error) => {
      setErrors({ general: error.message })
    },
  })

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setErrors({})
    }
  }

  const handleBack = () => {
    if (activeStep === 0) {
      router.push('/')
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
      setErrors({})
    }
  }

  const handleFinish = () => {
    if (validateCurrentStep() && user) {
      createRaffleMutation.mutate({
        title: raffleData.title,
        description: raffleData.description,
        prize_description: raffleData.prize_description,
        prize_image_url: raffleData.prize_image_url,
        number_cost: raffleData.number_cost,
        author_id: user.id,
      })
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    switch (activeStep) {
      case 0:
        // Validar título (requerido)
        if (!raffleData.title.trim()) {
          newErrors.title = 'El título es requerido'
        } else {
          const titleValidation = validateField(raffleData.title, 'title')
          if (!titleValidation.isValid) {
            newErrors.title = titleValidation.errors[0]
          }
        }
        
        // Validar descripción (opcional pero con límites si se proporciona)
        if (raffleData.description.trim()) {
          const descriptionValidation = validateField(raffleData.description, 'description')
          if (!descriptionValidation.isValid) {
            newErrors.description = descriptionValidation.errors[0]
          }
        }
        break

      case 1:
        // Validar descripción del premio (requerido)
        if (!raffleData.prize_description.trim()) {
          newErrors.prize_description = 'La descripción del premio es requerida'
        } else {
          const prizeValidation = validateField(raffleData.prize_description, 'prize_description')
          if (!prizeValidation.isValid) {
            newErrors.prize_description = prizeValidation.errors[0]
          }
        }
        
        // Validar URL de imagen (opcional pero con límites si se proporciona)
        if (raffleData.prize_image_url.trim()) {
          const imageUrlValidation = validateField(raffleData.prize_image_url, 'prize_image_url')
          if (!imageUrlValidation.isValid) {
            newErrors.prize_image_url = imageUrlValidation.errors[0]
          }
        }
        
        if (raffleData.number_cost <= 0) {
          newErrors.number_cost = 'El costo por número debe ser mayor a 0'
        }
        break

      case 2:
        if (!termsAccepted) {
          newErrors.terms = 'Debes aceptar los términos y condiciones para continuar'
        }
        if (!captchaVerified) {
          newErrors.captcha = 'Debes completar la verificación de seguridad para continuar'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateRaffleData = (updates: Partial<RaffleData>) => {
    setRaffleData(prev => ({ ...prev, ...updates }))
  }

  const handleTermsAccepted = (accepted: boolean) => {
    setTermsAccepted(accepted)
  }

  const handleCaptchaVerified = (verified: boolean) => {
    setCaptchaVerified(verified)
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicInfoStep
            data={raffleData}
            onUpdate={updateRaffleData}
            errors={errors}
          />
        )
      case 1:
        return (
          <PrizeConfigStep
            data={raffleData}
            onUpdate={updateRaffleData}
            errors={errors}
          />
        )
      case 2:
        return (
          <ReviewStep
            data={raffleData}
            errors={errors}
            onTermsAccepted={handleTermsAccepted}
            onCaptchaVerified={handleCaptchaVerified}
          />
        )
      default:
        return null
    }
  }

  const hasReachedLimit = userRaffleCount !== undefined && userRaffleCount >= 3
  const isNearLimit = userRaffleCount !== undefined && userRaffleCount >= 2

  if (hasReachedLimit) {
    return (
      <WizardContainer>
        <WizardTitle>Límite de Rifas Alcanzado</WizardTitle>
        
        <ContentContainer>
          <Alert severity="error" sx={{ marginBottom: '2rem' }}>
            Has alcanzado el límite máximo de 3 rifas por usuario. No puedes crear más sorteos.
          </Alert>

          <StyledButton
            onClick={() => router.push('/')}
            startIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Volver al Inicio
          </StyledButton>
        </ContentContainer>
      </WizardContainer>
    )
  }

  return (
    <WizardContainer>
      <WizardTitle>Crear Nuevo Sorteo</WizardTitle>
      
      <StepperContainer>
        <StyledStepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>
      </StepperContainer>

      <ContentContainer>
        {/* Mostrar información del límite de rifas solo si está cerca del límite */}
        {!isLoadingCount && userRaffleCount !== undefined && isNearLimit && !hasReachedLimit && (
          <Alert 
            severity="warning" 
            sx={{ marginBottom: '1rem' }}
          >
            Tienes {userRaffleCount} rifas creadas. Te queda {3 - userRaffleCount} rifa{3 - userRaffleCount > 1 ? 's' : ''} disponible{3 - userRaffleCount > 1 ? 's' : ''}.
          </Alert>
        )}

        {errors.general && (
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            {errors.general}
          </Alert>
        )}

        <StepContent>
          {renderStepContent()}
        </StepContent>

        <NavigationContainer>
          <StyledButton
            onClick={handleBack}
            startIcon={<ArrowLeft className="h-4 w-4" />}
          >
            {activeStep === 0 ? 'Volver al Inicio' : 'Anterior'}
          </StyledButton>

          {activeStep === steps.length - 1 ? (
            <PrimaryButton
              onClick={handleFinish}
              disabled={createRaffleMutation.isPending}
              endIcon={createRaffleMutation.isPending ? null : <Check className="h-4 w-4" />}
            >
              {createRaffleMutation.isPending ? 'Creando...' : 'Crear Rifa'}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleNext}
              endIcon={<ArrowRight className="h-4 w-4" />}
            >
              Siguiente
            </PrimaryButton>
          )}
        </NavigationContainer>
      </ContentContainer>
    </WizardContainer>
  )
}
