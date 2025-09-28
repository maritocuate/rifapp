'use client'

import { styled } from '@mui/material/styles'
import { Box, Typography, Modal, IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const DetailsContainer = styled(Box)(({ theme }) => ({
  marginTop: '3rem',
  padding: '2rem',
  background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
  borderRadius: '20px',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  position: 'relative',
  backdropFilter: 'blur(10px)',
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 600,
  fontSize: '1.5rem',
  color: '#ffd700',
  textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  marginBottom: '1rem',
  textAlign: 'center',
}))

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  fontSize: '1rem',
  color: '#ffffff',
  lineHeight: 1.6,
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
}))

const PrizeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-cinzel), serif',
  fontWeight: 700,
  fontSize: '1.8rem',
  background: 'linear-gradient(145deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'left',
  marginBottom: '2rem',
  textShadow: '0 0 15px rgba(255, 215, 0, 0.6)',

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const SeparatorLine = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)',
  margin: '2rem 0 1rem 0',
}))

const PrizeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '0 3rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
  marginBottom: '2rem',
  flexWrap: 'nowrap',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '1rem',
    flexWrap: 'wrap',
    padding: '0',
  },
}))

const PrizeImageContainer = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 25px rgba(255, 215, 0, 0.4)',
    border: '2px solid rgba(255, 215, 0, 0.6)',
  },
}))

const PrizeImage = styled(Image)(({ theme }) => ({
  width: '500px !important',
  height: '120px !important',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '200px !important',
    height: '100px !important',
  },
}))

const HomeLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
    transform: 'scale(1.05)',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
  },
}))

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '800px',
  maxHeight: '90vh',
  backgroundColor: 'rgba(0, 0, 0, 0.95)',
  borderRadius: '20px',
  border: '3px solid rgba(255, 215, 0, 0.5)',
  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)',
  backdropFilter: 'blur(15px)',
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '95vw',
    padding: '1rem',
  },
}))

const ModalImage = styled(Image)(({ theme }) => ({
  maxWidth: '100%',
  maxHeight: '70vh',
  objectFit: 'contain',
  borderRadius: '12px',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: '#ffd700',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid rgba(255, 215, 0, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}))


interface EventDetailsProps {
  description: string
  prize: string
  prizeImageUrl?: string
}

const EventDetails: React.FC<EventDetailsProps> = ({
  description,
  prize,
  prizeImageUrl
}) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGoHome = () => {
    router.push('/')
  }

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <DetailsContainer>
      <SectionTitle>Detalles del Sorteo</SectionTitle>
      
      <DescriptionText>
        {description}
      </DescriptionText>
      
      <PrizeContainer>
        <PrizeText>
          🏆 Premio: {prize}
        </PrizeText>
        {prizeImageUrl && (
          <PrizeImageContainer onClick={handleImageClick}>
            <PrizeImage
              src={prizeImageUrl}
              alt="Imagen del premio - Click para ampliar"
              width={360}
              height={120}
            />
          </PrizeImageContainer>
        )}
      </PrizeContainer>
      
      <SeparatorLine />
      
      <HomeLogoContainer onClick={handleGoHome}>
        <Image
          src="/images/logo3-md.png"
          alt="Riffita - Volver al inicio"
          width={500}
          height={36}
          style={{
            width: 'auto',
            height: '40px',
            maxWidth: '100%',
          }}
        />
      </HomeLogoContainer>

      {/* Modal para mostrar imagen ampliada */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContainer>
          <CloseButton onClick={handleCloseModal} aria-label="Cerrar">
            <CloseIcon />
          </CloseButton>
          {prizeImageUrl && (
            <ModalImage
              src={prizeImageUrl}
              alt="Imagen del premio ampliada"
              width={800}
              height={600}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '70vh',
              }}
            />
          )}
        </ModalContainer>
      </Modal>
    </DetailsContainer>
  )
}

export default EventDetails
