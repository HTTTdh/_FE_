import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDateTime(date: Date | string | null | undefined) {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  return d.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getCapBadgeColor(cap: number) {
  switch (cap) {
    case 1:
      return 'bg-red-100 text-red-800'
    case 2:
      return 'bg-yellow-100 text-yellow-800'
    case 3:
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getTrangThaiBadgeColor(trangThai: string) {
  switch (trangThai?.toLowerCase()) {
    case 'chờ duyệt':
      return 'bg-yellow-100 text-yellow-800'
    case 'đã duyệt':
      return 'bg-green-100 text-green-800'
    case 'từ chối':
      return 'bg-red-100 text-red-800'
    case 'hoàn thành':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
