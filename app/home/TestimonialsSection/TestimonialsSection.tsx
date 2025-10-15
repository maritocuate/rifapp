'use client'

import { useState, useEffect } from 'react'
import { TestimonialCard } from './index'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  TestimonialsContainer,
  TestimonialsContent,
  TestimonialsHeader,
  TestimonialsTitle,
  SliderContainer,
  SliderWrapper,
  SliderTrack,
  SlideItem,
  NavigationButton,
  DotsContainer,
  Dot,
} from './styles'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    rating: 5,
    review: 'Riffita ha sido una herramienta increíble para organizar la rifa de mi negocio. La interfaz es muy fácil de usar y los participantes pudieron comprar sus números sin problemas. Definitivamente la recomiendo.',
    initial: 'M'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    rating: 5,
    review: 'Excelente plataforma para crear sorteos. El proceso de configuración es muy intuitivo y la gestión de participantes es muy sencilla. Los resultados fueron exactamente lo que esperaba.',
    initial: 'C'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    rating: 5,
    review: 'Muy buena experiencia usando Riffita. La plataforma es confiable y el soporte al cliente es excelente. Solo le faltan algunas opciones de personalización, pero en general está muy bien.',
    initial: 'A'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    rating: 5,
    review: 'He usado Riffita para varias rifas de mi organización sin fines de lucro. Es perfecta para recaudar fondos de manera transparente y profesional. Los participantes confían en la plataforma.',
    initial: 'L'
  },
  {
    id: 5,
    name: 'Sofia Herrera',
    rating: 5,
    review: 'La mejor plataforma para sorteos que he usado. La configuración es rápida, los pagos se procesan correctamente y la experiencia del usuario es excelente. Muy recomendada.',
    initial: 'S'
  },
  {
    id: 6,
    name: 'Diego Morales',
    rating: 5,
    review: 'Riffita me ayudó a organizar un sorteo para mi comunidad. La plataforma es fácil de usar y los resultados fueron transparentes. Solo me gustaría ver más opciones de diseño para las tarjetas.',
    initial: 'D'
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardsToShow = isMobile ? 1 : 3
  const maxIndex = Math.max(0, testimonials.length - cardsToShow)

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <TestimonialsContainer>
      <TestimonialsContent>
        <TestimonialsHeader>
          <TestimonialsTitle>
            Nuestros usuarios
          </TestimonialsTitle>
        </TestimonialsHeader>

        <SliderContainer>
          <SliderWrapper>
            <SliderTrack translateX={currentIndex} cardsToShow={cardsToShow}>
              {testimonials.map((testimonial) => (
                <SlideItem key={testimonial.id} cardsToShow={cardsToShow}>
                  <TestimonialCard testimonial={testimonial} />
                </SlideItem>
              ))}
            </SliderTrack>
          </SliderWrapper>

          <NavigationButton
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="prev"
          >
            <ChevronLeft size={16} />
          </NavigationButton>

          <NavigationButton
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="next"
          >
            <ChevronRight size={16} />
          </NavigationButton>
        </SliderContainer>

        <DotsContainer>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </DotsContainer>
      </TestimonialsContent>
    </TestimonialsContainer>
  )
}
