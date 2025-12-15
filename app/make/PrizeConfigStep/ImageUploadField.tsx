'use client'

import { useState, useRef } from 'react'
import { Image as ImageIcon, Upload, X, Link } from 'lucide-react'
import Image from 'next/image'
import { CHARACTER_LIMITS, validateField } from '@/hooks/useProfanityFilter'
import { FieldContainer, FieldLabel, StyledTextField } from './styles'
import { ImageUrlFieldProps } from './types'
import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from '@mui/material'

// Estilos personalizados que coinciden con la estética de la app
const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  backgroundColor: 'rgba(255, 215, 0, 0.1)',
  border: '1px solid rgba(255, 215, 0, 0.3)',
  color: '#ffd700',
  borderRadius: '10px',
  padding: '0.75rem 1.5rem',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    border: '1px solid rgba(255, 215, 0, 0.5)',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
    transform: 'translateY(-1px)',
  },
  
  '&:disabled': {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    border: '1px solid rgba(255, 215, 0, 0.1)',
    color: 'rgba(255, 215, 0, 0.3)',
  },
}))

const StyledSecondaryButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '10px',
  padding: '0.75rem 1.5rem',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#ffffff',
    transform: 'translateY(-1px)',
  },
}))

const StyledRemoveButton = styled(Button)(({ theme }) => ({
  fontFamily: 'var(--font-orbitron), monospace',
  backgroundColor: 'rgba(255, 107, 107, 0.1)',
  border: '1px solid rgba(255, 107, 107, 0.3)',
  color: '#ff6b6b',
  borderRadius: '10px',
  padding: '0.5rem',
  minWidth: 'auto',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    border: '1px solid rgba(255, 107, 107, 0.5)',
    boxShadow: '0 0 10px rgba(255, 107, 107, 0.3)',
  },
}))

const PreviewCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 215, 0, 0.2)',
  borderRadius: '10px',
  padding: '1rem',
  marginTop: '0.5rem',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.1)',
  },
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.75rem',
  marginTop: '0.5rem',
}))

const UrlInputContainer = styled(Box)(({ theme }) => ({
  marginTop: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}))

const UrlButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '0.5rem',
}))

export function ImageUploadField({ value, onChange, error }: ImageUrlFieldProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const imageUrlValidation = validateField(value, 'prize_image_url')
  
  // Solo mostrar errores si hay un error explícito o si el campo tiene contenido y hay errores
  const shouldShowError = !!error || (value.trim().length > 0 && !imageUrlValidation.isValid)
  const shouldShowHelperText = error || 
    (value.trim().length > 0 && imageUrlValidation.errors.length > 0 ? imageUrlValidation.errors[0] : null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    uploadToCloudinary(file)
  }

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true)
    
    // Verificar que las variables de entorno estén configuradas
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      alert('Error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurado en las variables de entorno')
      setIsUploading(false)
      return
    }
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'rifapp_uploads') // Asegúrate de crear este preset en Cloudinary
      formData.append('folder', 'rifapp/prizes')
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Cloudinary error:', errorData)
        throw new Error(`Error al subir la imagen: ${errorData.error?.message || response.statusText}`)
      }
      
      const data = await response.json()
      const imageUrl = data.secure_url
      
      setPreviewUrl(imageUrl)
      onChange(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir la imagen. Por favor intenta de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = (url: string) => {
    setPreviewUrl(url)
    onChange(url)
    setShowUrlInput(false)
  }

  const handleRemoveImage = () => {
    setPreviewUrl('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <FieldContainer>
      <FieldLabel>
        <ImageIcon className="h-4 w-4 text-yellow-400" />
        Imagen del Premio (Opcional)
      </FieldLabel>
      
      {previewUrl ? (
        <PreviewCard>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
              <Image 
                src={previewUrl} 
                alt="Preview" 
                width={128}
                height={128}
                style={{
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-orbitron), monospace',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontStyle: 'italic'
                  }}
                >
                  Imagen cargada correctamente
                </Typography>
              </Box>
            </Box>
            <StyledRemoveButton
              type="button"
              onClick={handleRemoveImage}
            >
              <X size={16} />
            </StyledRemoveButton>
          </Box>
        </PreviewCard>
      ) : (
        <Box>
          <ButtonContainer>
            <StyledButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              sx={{ flex: 1 }}
            >
              <Upload size={16} style={{ marginRight: '0.5rem' }} />
              {isUploading ? 'Subiendo...' : 'Subir Imagen'}
            </StyledButton>
            
            <StyledSecondaryButton
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              sx={{ flex: 1 }}
            >
              <Link size={16} style={{ marginRight: '0.5rem' }} />
              Usar URL
            </StyledSecondaryButton>
          </ButtonContainer>
          
          {showUrlInput && (
            <UrlInputContainer>
              <StyledTextField
                fullWidth
                placeholder="https://ejemplo.com/imagen-premio.jpg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUrlSubmit((e.target as HTMLInputElement).value)
                  }
                }}
                autoComplete="off"
                inputProps={{ maxLength: CHARACTER_LIMITS.prize_image_url.max }}
              />
              <UrlButtonContainer>
                <StyledButton
                  type="button"
                  size="small"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder*="ejemplo.com"]') as HTMLInputElement
                    if (input?.value) {
                      handleUrlSubmit(input.value)
                    }
                  }}
                >
                  Usar URL
                </StyledButton>
                <StyledSecondaryButton
                  type="button"
                  size="small"
                  onClick={() => setShowUrlInput(false)}
                >
                  Cancelar
                </StyledSecondaryButton>
              </UrlButtonContainer>
            </UrlInputContainer>
          )}
        </Box>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {shouldShowError && (
        <p className="text-red-500 text-sm mt-1">{shouldShowHelperText}</p>
      )}
    </FieldContainer>
  )
}
