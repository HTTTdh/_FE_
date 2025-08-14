import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/api/auth/login', credentials).then(res => res.data),
  
  register: (userData: { username: string; password: string; ho_ten: string; sdt: string; cap: number; PhongBanId: string }) =>
    api.post('/api/auth/register', userData).then(res => res.data),
  
  logout: () =>
    api.post('/api/auth/logout').then(res => res.data),
  
  me: () =>
    api.get('/api/auth/me').then(res => res.data),
}

// Admin API
export const adminApi = {
  // Yêu cầu
  createYeuCau: (data: any) =>
    api.post('/api/admin/yeu_cau', data).then(res => res.data),
  
  updateYeuCau: (data: any) =>
    api.patch('/api/admin/yeu_cau', data).then(res => res.data),
  
  // Tài khoản
  getTaiKhoanLevel1: () =>
    api.get('/api/admin/tai-khoan/level1').then(res => res.data),
  
  getTaiKhoanLevel2: () =>
    api.get('/api/admin/tai-khoan/level2').then(res => res.data),
  
  // Hành động
  getHanhDong: (data: any) =>
    api.post('/api/admin/hanh_dong', data).then(res => res.data),
  
  // Tài sản số
  createTaiSanSo: (data: any) =>
    api.post('/api/admin/tai_san_so', data).then(res => res.data),
}

// Types
export interface TaiSanSo {
  id: string
  username: string
  password: string
  fa_2?: string
  link_dang_nhap?: string
  ngay_cap?: Date
  ngay_het_han?: Date
  LoaiTaiSanId: string
  NhaCungCapId: string
  nguoi_dai_dien_id?: string
  nguoi_nhan_id?: string
  YeuCauId?: string
}

export interface YeuCau {
  id: string
  noi_dung: string
  ngay_yeu_cau: Date
  so_luong?: number
  trang_thai?: string
  LoaiTaiSanId: string
  NhaCungCapId: string
  nguoi_duyet_id?: string
  nguoi_yeu_cau_id: string
}

export interface TaiKhoan {
  id: string
  username: string
  ho_ten: string
  sdt: string
  cap: number
  PhongBanId: string
}

export interface LoaiTaiSan {
  id: string
  loai: string
  note?: string
}

export interface NhaCungCap {
  id: string
  ten: string
  lien_he?: string
  link?: string
}

export interface PhongBan {
  id: string
  ten: string
}

export default api
