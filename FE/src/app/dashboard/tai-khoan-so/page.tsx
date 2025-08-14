'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Eye, Edit, Trash2, Copy } from 'lucide-react'
import { useQuery } from 'react-query'
import { formatDate, getTrangThaiBadgeColor } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock data - replace with actual API call
const mockTaiKhoanSo = [
  {
    id: '1',
    username: 'admin@google.com',
    password: '••••••••',
    fa_2: 'ABCD1234EFGH5678',
    link_dang_nhap: 'https://ads.google.com',
    ngay_cap: '2024-01-15',
    ngay_het_han: '2024-12-31',
    LoaiTaiSan: { loai: 'Google Ads' },
    NhaCungCap: { ten: 'Google' },
    NguoiDaiDien: { ho_ten: 'Nguyễn Văn A' },
    NguoiNhan: { ho_ten: 'Trần Thị B' },
    trang_thai: 'Hoạt động'
  },
  {
    id: '2',
    username: 'business@facebook.com',
    password: '••••••••',
    fa_2: 'XYZA9876BCDE4321',
    link_dang_nhap: 'https://business.facebook.com',
    ngay_cap: '2024-02-01',
    ngay_het_han: '2024-11-30',
    LoaiTaiSan: { loai: 'Facebook Ads' },
    NhaCungCap: { ten: 'Meta' },
    NguoiDaiDien: { ho_ten: 'Lê Văn C' },
    NguoiNhan: { ho_ten: 'Phạm Thị D' },
    trang_thai: 'Hoạt động'
  }
]

export default function TaiKhoanSoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { data: taiKhoanSoList, isLoading } = useQuery(
    'tai-khoan-so',
    () => Promise.resolve(mockTaiKhoanSo),
    {
      refetchOnWindowFocus: false,
    }
  )

  const filteredData = taiKhoanSoList?.filter(item =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.LoaiTaiSan.loai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.NhaCungCap.ten.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password)
    toast.success('Đã sao chép mật khẩu!')
  }

  const handleCopy2FA = (fa2: string) => {
    navigator.clipboard.writeText(fa2)
    toast.success('Đã sao chép mã 2FA!')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tài Khoản Số</h1>
          <p className="text-gray-600">Quản lý tài khoản số của doanh nghiệp</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Tài Khoản
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Tìm kiếm theo username, loại tài sản, nhà cung cấp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredData.map(item => item.id))
                      } else {
                        setSelectedItems([])
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin tài khoản
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại & Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người đại diện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời hạn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id])
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== item.id))
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.username}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>••••••••</span>
                        <button
                          onClick={() => handleCopyPassword('actual_password')}
                          className="text-primary-600 hover:text-primary-800"
                          title="Sao chép mật khẩu"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      {item.fa_2 && (
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          2FA: {item.fa_2.substring(0, 8)}...
                          <button
                            onClick={() => handleCopy2FA(item.fa_2)}
                            className="text-primary-600 hover:text-primary-800"
                            title="Sao chép mã 2FA"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.LoaiTaiSan.loai}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.NhaCungCap.ten}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.NguoiDaiDien?.ho_ten || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Người nhận: {item.NguoiNhan?.ho_ten || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        Cấp: {formatDate(item.ngay_cap)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Hết hạn: {formatDate(item.ngay_het_han)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTrangThaiBadgeColor(item.trang_thai)}`}>
                      {item.trang_thai}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="text-primary-600 hover:text-primary-900"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                        onClick={() => {
                          if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
                            toast.success('Đã xóa tài khoản!')
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy tài khoản số nào</p>
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Đã chọn {selectedItems.length} mục
            </span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">
                Xuất Excel
              </button>
              <button className="btn btn-danger btn-sm">
                Xóa đã chọn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
