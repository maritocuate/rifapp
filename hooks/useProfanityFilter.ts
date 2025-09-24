'use client'

import { useState, useCallback } from 'react'
import { Filter } from 'bad-words'

export const CHARACTER_LIMITS = {
  title: { min: 7, max: 50 },
  description: { min: 20, max: 500 },
  prize_description: { min: 20, max: 300 },
  prize_image_url: { min: 10, max: 500 }
} as const

const SPANISH_PROFANITY_WORDS = [
  'puta', 'puto', 'putas', 'putos',
  'mierda', 'mierdas',
  'joder', 'jodido', 'jodida', 'jodidos', 'jodidas',
  'hijo de puta', 'hija de puta',
  'concha', 'conchas',
  'verga', 'vergas',
  'pene', 'penes',
  'vagina', 'vaginás',
  'coño', 'coños',
  'culiar', 'culiado', 'culiada',
  'follar', 'follado', 'follada',
  'mamada', 'mamadas',
  'chupar', 'chupado', 'chupada',
  'pajear', 'pajeado', 'pajeada',
  'masturbar', 'masturbado', 'masturbada',
  'orgasmo', 'orgasmos',
  'sexo', 'sexual',
  'porno', 'pornografia',
  'prostituta', 'prostitutas',
  'putero', 'puteros',
  'zorra', 'zorras',
  'perra', 'perras',
  'marica', 'maricas',
  'maricon', 'maricones',
  'gay', 'gays',
  'lesbiana', 'lesbianas',
  'bisexual', 'bisexuales',
  'transexual', 'transexuales',
  'travesti', 'travestis',
  'drogas', 'droga',
  'marihuana', 'marijuana',
  'cocaina',
  'lsd', 'extasis',
  'borracho', 'borracha',
  'fumar', 'fumado', 'fumada',
  'inhalar', 'inhalado', 'inhalada',
  'inyectar', 'inyectado', 'inyectada',
  'suicidio', 'suicidar', 'suicidarse',
  'matar', 'matado', 'matada',
  'asesinar', 'asesinado', 'asesinada',
  'violar', 'violado', 'violada',
  'abuso', 'abusar', 'abusado', 'abusada',
  'pedofilia', 'pedofilo', 'pedofila',
  'nazi', 'nazis',
  'hitler', 'hitleriano',
  'fascista', 'fascistas',
  'racista', 'racistas',
  'xenofobo', 'xenofoba', 'xenofobos', 'xenofobas',
  'homofobo', 'homofoba', 'homofobos', 'homofobas',
  'machista', 'machistas',
  'feminista', 'feministas',
  'terrorista', 'terroristas',
  'bomba', 'bombas',
  'explosivo', 'explosivos',
  'pistola', 'pistolas',
  'cuchillo', 'cuchillos',
  'navaja', 'navajas',
  'violencia', 'violento', 'violenta',
  'golpear', 'golpeado', 'golpeada',
  'pegar', 'pegado', 'pegada',
  'gritar', 'gritado', 'gritada',
  'insultar', 'insultado', 'insultada',
  'odiar', 'odiado', 'odiada',
  'despreciar', 'despreciado', 'despreciada',
  'menospreciar', 'menospreciado', 'menospreciada',
  'humillar', 'humillado', 'humillada',
  'avergonzar', 'avergonzado', 'avergonzada',
  'ridiculizar', 'ridiculizado', 'ridiculizada',
  'burla', 'burlas',
  'mofa', 'mofas',
  'sarcasmo', 'sarcasmos',
  'ironia', 'ironias',
  'sarcastico', 'sarcastica', 'sarcasticos', 'sarcasticas',
  'ironico', 'ironica', 'ironicos', 'ironicas',
  'cinico', 'cinica', 'cinicos', 'cinicas',
  'hipocrita', 'hipocritas',
  'mentiroso', 'mentirosa', 'mentirosos', 'mentirosas',
  'tramposo', 'tramposa', 'tramposos', 'tramposas',
  'ladron', 'ladrona', 'ladrones', 'ladronas',
  'robar', 'robado', 'robada',
  'estafar', 'estafado', 'estafada',
  'engañar', 'engañado', 'engañada',
  'mentir', 'mentido', 'mentida',
  'falsificar', 'falsificado', 'falsificada',
  'corrupto', 'corrupta', 'corruptos', 'corruptas',
  'soborno', 'sobornos',
  'cohecho', 'cohechos',
  'nepotismo', 'nepotismos',
  'favoritismo', 'favoritismos',
  'discriminacion', 'discriminaciones',
  'segregacion', 'segregaciones',
  'apartheid', 'apartheids',
  'genocidio', 'genocidios',
  'limpieza etnica', 'limpiezas etnicas',
  'holocausto', 'holocaustos',
  'esclavitud', 'esclavitudes',
  'esclavo', 'esclava', 'esclavos', 'esclavas',
  'tortura', 'torturas',
  'torturar', 'torturado', 'torturada',
  'mutilacion', 'mutilaciones',
  'mutilado', 'mutilada', 'mutilados', 'mutiladas',
  'deformidad', 'deformidades',
  'deformado', 'deformada', 'deformados', 'deformadas',
  'retrasado', 'retrasada', 'retrasados', 'retrasadas',
  'mongolico', 'mongolica', 'mongolicos', 'mongolicas',
  'autista', 'autistas',
  'sindrome de down', 'sindromes de down',
  'paralitico', 'paralitica', 'paraliticos', 'paraliticas',
  'ciego', 'ciega', 'ciegos', 'ciegas',
  'sordo', 'sorda', 'sordos', 'sordas',
  'mudo', 'muda', 'mudos', 'mudas',
  'cojo', 'coja', 'cojos', 'cojas',
  'manco', 'manca', 'mancos', 'mancas',
  'tuerto', 'tuerta', 'tuertos', 'tuertas',
  'calvo', 'calva', 'calvos', 'calvas',
  'gordo', 'gorda', 'gordos', 'gordas',
  'flaco', 'flaca', 'flacos', 'flacas',
  'alto', 'alta', 'altos', 'altas',
  'bajo', 'baja', 'bajos', 'bajas',
  'feo', 'fea', 'feos', 'feas',
  'bonito', 'bonita', 'bonitos', 'bonitas',
  'guapo', 'guapa', 'guapos', 'guapas',
  'hermoso', 'hermosa', 'hermosos', 'hermosas',
  'lindo', 'linda', 'lindos', 'lindas',
  'bello', 'bella', 'bellos', 'bellas',
  'pornografico', 'pornografica', 'pornograficos', 'pornograficas',
  'vulgar', 'vulgares',
  'grosero', 'grosera', 'groseros', 'groseras',
  'mal educado', 'mal educada', 'mal educados', 'mal educadas',
  'maleducado', 'maleducada', 'maleducados', 'maleducadas',
  'sin educacion', 'sin educaciones',
  'ignorante', 'ignorantes',
  'estupido', 'estupida', 'estupidos', 'estupidas',
  'idiota', 'idiotas',
  'imbecil', 'imbeciles',
  'tonto', 'tonta', 'tontos', 'tontas',
  'bobo', 'boba', 'bobos', 'bobas',
  'tarado', 'tarada', 'tarados', 'taradas',
  'retrasado mental', 'retrasados mentales',
  'deficiente mental', 'deficientes mentales',
  'subnormal', 'subnormales',
  'anormal', 'anormales',
  'lunatico', 'lunatica', 'lunaticos', 'lunaticas',
  'demente', 'dementes',
  'psicopata', 'psicopatas',
  'sociopata', 'sociopatas',
  'esquizofrenico', 'esquizofrenica', 'esquizofrenicos', 'esquizofrenicas',
  'bipolar', 'bipolares',
  'depresivo', 'depresiva', 'depresivos', 'depresivas',
  'ansioso', 'ansiosa', 'ansiosos', 'ansiosas',
  'paranoico', 'paranoica', 'paranoicos', 'paranoicas',
  'obsesivo', 'obsesiva', 'obsesivos', 'obsesivas',
  'compulsivo', 'compulsiva', 'compulsivos', 'compulsivas',
  'adicto', 'adicta', 'adictos', 'adictas',
  'dependiente', 'dependientes',
  'enfermo', 'enferma', 'enfermos', 'enfermas',
  'patologico', 'patologica', 'patologicos', 'patologicas',
  'degenerado', 'degenerada', 'degenerados', 'degeneradas',
  'pervertido', 'pervertida', 'pervertidos', 'pervertidas',
  'depravado', 'depravada', 'depravados', 'depravadas',
  'corrupto', 'corrupta', 'corruptos', 'corruptas',
  'inmoral', 'inmorales',
  'amoral', 'amorales',
  'sin escrupulos', 'sin escrupulos',
  'sin principios', 'sin principios',
  'sin valores', 'sin valores',
  'sin moral', 'sin moral',
  'sin etica', 'sin etica',
  'sin conciencia', 'sin conciencia',
  'sin remordimientos', 'sin remordimientos',
  'sin arrepentimiento', 'sin arrepentimiento',
  'sin perdon', 'sin perdon',
  'sin compasion', 'sin compasion',
  'sin piedad', 'sin piedad',
  'sin misericordia', 'sin misericordia',
  'cruel', 'crueles',
  'despiadado', 'despiadada', 'despiadados', 'despiadadas',
  'inhumano', 'inhumana', 'inhumanos', 'inhumanas'
]

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, ' ') // Normalizar espacios
    .trim()
}

// Instancia única del filtro para mejor performance
let globalFilter: Filter | null = null

// Función para obtener la instancia del filtro (singleton)
const getFilter = (): Filter => {
  if (!globalFilter) {
    globalFilter = new Filter()
    globalFilter.addWords(...SPANISH_PROFANITY_WORDS)
  }
  return globalFilter
}

// Función optimizada para detectar malas palabras
const detectProfanity = (text: string): { hasProfanity: boolean; detectedWords: string[] } => {
  if (!text.trim()) {
    return { hasProfanity: false, detectedWords: [] }
  }

  const filter = getFilter()
  const normalizedText = normalizeText(text)
  
  // Verificar si hay profanidad usando el filtro optimizado
  if (!filter.isProfane(text)) {
    return { hasProfanity: false, detectedWords: [] }
  }

  // Solo si hay profanidad, extraer las palabras específicas
  const words = normalizedText.split(' ')
  const detectedWords: string[] = []
  const badWordsList = filter.list
  
  for (const word of words) {
    if (badWordsList.includes(word)) {
      detectedWords.push(word)
    }
  }
  
  return {
    hasProfanity: detectedWords.length > 0,
    detectedWords: Array.from(new Set(detectedWords))
  }
}

// Función optimizada para reemplazar malas palabras
const replaceProfanity = (text: string): string => {
  return getFilter().clean(text)
}

export interface ProfanityFilterResult {
  hasProfanity: boolean
  detectedWords: string[]
  filteredText: string
  originalText: string
}

export interface CharacterLimitResult {
  isValid: boolean
  currentLength: number
  minLength: number
  maxLength: number
  remaining: number
  isOverLimit: boolean
  isUnderLimit: boolean
  needsMoreChars: number
}

// Función para validar límites de caracteres
export const validateCharacterLimit = (text: string, field: keyof typeof CHARACTER_LIMITS): CharacterLimitResult => {
  const limits = CHARACTER_LIMITS[field]
  const currentLength = text.length
  const remaining = limits.max - currentLength
  const needsMoreChars = Math.max(0, limits.min - currentLength)
  
  return {
    isValid: currentLength >= limits.min && currentLength <= limits.max,
    currentLength,
    minLength: limits.min,
    maxLength: limits.max,
    remaining,
    isOverLimit: currentLength > limits.max,
    isUnderLimit: currentLength < limits.min,
    needsMoreChars
  }
}

export interface ValidationResult {
  profanity: ProfanityFilterResult
  characterLimit: CharacterLimitResult
  isValid: boolean
  errors: string[]
}

// Función optimizada que combina validación de profanidad y límites de caracteres
export const validateField = (text: string, field: keyof typeof CHARACTER_LIMITS): ValidationResult => {
  const profanity: ProfanityFilterResult = {
    hasProfanity: false,
    detectedWords: [],
    filteredText: text,
    originalText: text
  }
  
  const characterLimit = validateCharacterLimit(text, field)
  const errors: string[] = []
  
  // Solo verificar profanidad si el texto cumple los límites básicos
  if (text.trim() && !characterLimit.isUnderLimit) {
    const profanityCheck = detectProfanity(text)
    profanity.hasProfanity = profanityCheck.hasProfanity
    profanity.detectedWords = profanityCheck.detectedWords
    profanity.filteredText = profanityCheck.hasProfanity ? replaceProfanity(text) : text
    
    if (profanityCheck.hasProfanity) {
      errors.push(`Se detectaron palabras inapropiadas: ${profanityCheck.detectedWords.join(', ')}`)
    }
  }
  
  // Validar límites de caracteres
  if (characterLimit.isUnderLimit) {
    errors.push(`Mínimo ${characterLimit.minLength} caracteres (faltan ${characterLimit.needsMoreChars})`)
  } else if (characterLimit.isOverLimit) {
    errors.push(`Límite de caracteres excedido (${characterLimit.currentLength}/${characterLimit.maxLength})`)
  }
  
  return {
    profanity,
    characterLimit,
    isValid: errors.length === 0,
    errors
  }
}

export function useProfanityFilter() {
  const [isEnabled, setIsEnabled] = useState(true)
  
  const checkProfanity = useCallback((text: string): ProfanityFilterResult => {
    if (!isEnabled) {
      return {
        hasProfanity: false,
        detectedWords: [],
        filteredText: text,
        originalText: text
      }
    }
    
    const detection = detectProfanity(text)
    const filteredText = detection.hasProfanity ? replaceProfanity(text) : text
    
    return {
      hasProfanity: detection.hasProfanity,
      detectedWords: detection.detectedWords,
      filteredText,
      originalText: text
    }
  }, [isEnabled])
  
  const toggleFilter = useCallback(() => {
    setIsEnabled(prev => !prev)
  }, [])
  
  return {
    checkProfanity,
    toggleFilter,
    isEnabled,
    validateCharacterLimit,
    validateField
  }
}
