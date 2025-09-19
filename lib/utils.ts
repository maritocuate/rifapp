import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número como precio con separadores de miles
 * @param amount - El número a formatear
 * @returns String formateado con puntos como separadores de miles
 * @example
 * formatPrice(1000) // "1.000"
 * formatPrice(1234567) // "1.234.567"
 * formatPrice(50) // "50"
 */
export function formatPrice(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) {
    return '0';
  }
  
  const integerPart = Math.floor(num).toString();
  let result = '';
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) {
      result = '.' + result;
    }
    result = integerPart[i] + result;
  }
  
  return result;
}
