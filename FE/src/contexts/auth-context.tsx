'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

interface User {
  id: string
  username: string
  ho_ten: string
  sdt: string
  cap: number
  PhongBanId: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token')
      if (token) {
        // Verify token with backend
        const userData = await authApi.me()
        setUser(userData)
      }
    } catch (error) {
      Cookies.remove('token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.login({ username, password })
      
      if (response.success !== false) {
        setUser(response.user)
        toast.success('Đăng nhập thành công!')
        router.push('/dashboard')
      } else {
        toast.error(response.message || 'Đăng nhập thất bại')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi đăng nhập')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
      Cookies.remove('token')
      toast.success('Đăng xuất thành công!')
      router.push('/auth/login')
    } catch (error) {
      // Still logout on frontend even if backend fails
      setUser(null)
      Cookies.remove('token')
      router.push('/auth/login')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  console.log('useAuth called', context)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
