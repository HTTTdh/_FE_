'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User, Phone, Building, UserPlus } from 'lucide-react'
import { authApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
  ho_ten: string
  sdt: string
  cap: number
  PhongBanId: string
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>()

  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }

    try {
      setIsLoading(true)
      const { confirmPassword, ...registerData } = data
      await authApi.register(registerData)
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Lỗi đăng ký')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Tạo tài khoản mới cho hệ thống
          </p>
        </div>
        
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Họ tên */}
            <div className="form-group">
              <label htmlFor="ho_ten" className="form-label">
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('ho_ten', { 
                    required: 'Vui lòng nhập họ và tên',
                    minLength: {
                      value: 2,
                      message: 'Họ tên phải có ít nhất 2 ký tự'
                    }
                  })}
                  type="text"
                  className="input pl-10"
                  placeholder="Nhập họ và tên"
                />
              </div>
              {errors.ho_ten && (
                <p className="form-error">{errors.ho_ten.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('username', { 
                    required: 'Vui lòng nhập tên đăng nhập',
                    minLength: {
                      value: 3,
                      message: 'Tên đăng nhập phải có ít nhất 3 ký tự'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Tên đăng nhập chỉ được chứa chữ, số và dấu gạch dưới'
                    }
                  })}
                  type="text"
                  className="input pl-10"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              {errors.username && (
                <p className="form-error">{errors.username.message}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="sdt" className="form-label">
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('sdt', { 
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: 'Số điện thoại không hợp lệ'
                    }
                  })}
                  type="tel"
                  className="input pl-10"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              {errors.sdt && (
                <p className="form-error">{errors.sdt.message}</p>
              )}
            </div>

            {/* Cấp độ */}
            <div className="form-group">
              <label htmlFor="cap" className="form-label">
                Cấp độ
              </label>
              <select
                {...register('cap', { 
                  required: 'Vui lòng chọn cấp độ',
                  valueAsNumber: true
                })}
                className="input"
              >
                <option value="">Chọn cấp độ</option>
                <option value={1}>Cấp 1</option>
                <option value={2}>Cấp 2</option>
                <option value={3}>Cấp 3</option>
              </select>
              {errors.cap && (
                <p className="form-error">{errors.cap.message}</p>
              )}
            </div>

            {/* Phòng ban ID */}
            <div className="form-group">
              <label htmlFor="PhongBanId" className="form-label">
                ID Phòng ban
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('PhongBanId', { 
                    required: 'Vui lòng nhập ID phòng ban'
                  })}
                  type="text"
                  className="input pl-10"
                  placeholder="Nhập ID phòng ban"
                />
              </div>
              {errors.PhongBanId && (
                <p className="form-error">{errors.PhongBanId.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', { 
                    required: 'Vui lòng nhập mật khẩu',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="input pl-10 pr-10"
                  placeholder="Nhập mật khẩu"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword', { 
                    required: 'Vui lòng xác nhận mật khẩu',
                    validate: (value) => value === password || 'Mật khẩu xác nhận không khớp'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input pl-10 pr-10"
                  placeholder="Nhập lại mật khẩu"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang đăng ký...
                  </div>
                ) : (
                  'Đăng ký'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
