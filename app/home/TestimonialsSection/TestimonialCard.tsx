'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import {
  CardContainer,
  CardHeader,
  Avatar,
  UserInfo,
  UserName,
  StarsContainer,
  StarIcon,
  ReviewContent,
  ReviewText,
  ReadMoreButton,
} from './styles'

interface Testimonial {
  id: number
  name: string
  rating: number
  review: string
  initial: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 120
  const shouldTruncate = testimonial.review.length > maxLength

  const displayReview = testimonial.review

  return (
    <CardContainer>
      <CardHeader>
        <Avatar>
          {testimonial.initial}
        </Avatar>
        <UserInfo>
          <UserName>{testimonial.name}</UserName>
          <StarsContainer>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < testimonial.rating}>
                <Star size={16} />
              </StarIcon>
            ))}
          </StarsContainer>
        </UserInfo>
      </CardHeader>

      <ReviewContent>
        <ReviewText isExpanded={isExpanded}>
          {displayReview}
        </ReviewText>
        
        {shouldTruncate && (
          <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Leer menos' : 'Leer más'}
          </ReadMoreButton>
        )}
      </ReviewContent>
    </CardContainer>
  )
}
