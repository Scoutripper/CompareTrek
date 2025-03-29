import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For development
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanPath}`;
  }
  
  // For production - adjust this based on your deployment setup
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  if (cdnUrl) {
    return `${cdnUrl}/${cleanPath}`;
  }
  
  return `/${cleanPath}`;
} 