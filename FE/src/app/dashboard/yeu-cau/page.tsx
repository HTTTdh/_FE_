'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Eye, Edit, Check, X } from 'lucide-react'
import { useQuery } from 'react-query'
import { formatDateTime, getTrangThaiBadgeColor } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock data - replace with actual API call
const mockYeuCau = [
  {
    id: '1',
    noi_dung: 'Yêu cầu tài khoản Google Ads cho chiến dịch marketing Q4',
    ngay_yeu_cau: '2024-01-15T10:30:00',
    so_luong: 1,
    trang_thai: 'Chờ duyệt',
    LoaiTaiSan: { loai: 'Google Ads' },
    NhaCungCap: { ten: 'Google' },
    NguoiYeuCau: { ho_ten: 'Nguyễn Văn A' },
    NguoiDuyet: null
  },
  {
    id: '2',
    noi_dung: 'Cần 2 tài khoản Facebook Ads cho dự án mở rộng thị trường',
    ngay_yeu_cau: '2024-01-14T14:15:00',
    so_luong: 2,
    trang_thai: 'Đã duyệt',
    LoaiTaiSan: { loai: 'Facebook Ads' },
    NhaCungCap: { ten: 'Meta' },
    NguoiYeuCau: { ho_ten: 'Trần Thị B' },
    NguoiDuyet: { ho_ten: 'Lê Văn C' }
  },
  {
    id: '3',
    noi_dung: 'Tài khoản TikTok Ads cho campaign sản phẩm mới',
    ngay_yeu_cau: '2024-01-13T09:20:00',
    so_luong: 1,
    trang_thai: 'Từ chối',
    LoaiTaiSan: { loai: 'TikTok Ads' },
    NhaCungCap: { ten: 'ByteDance' },
    NguoiYeuCau: { ho_ten: 'Phạm Văn D' },
    NguoiDuyet: { ho_ten: 'Hoàng Thị E' }
  }
]

export default function YeuCauPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const { data: yeuCauList, isLoading } = useQuery(
    'yeu-cau',
    () => Promise.resolve(mockYeuCau),
    {
      refetchOnWindowFocus: false,
    }
  )

  const filteredData = yeuCauList?.filter(item => {
    const matchesSearch = item.noi_dung.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.LoaiTaiSan.loai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.NguoiYeuCau.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !filterStatus || item.trang_thai === filterStatus
    
    return matchesSearch && matchesStatus
  }) || []

  const handleApprove = (id: string) => {
    toast.success('Đã duyệt yêu cầu!')
    // Implement API call
  }

  const handleReject = (id: string) => {
    toast.error('Đã từ chối yêu cầu!')
    // Implement API call
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
          <h1 className="text-2xl font-bold text-gray-900">Yêu Cầu</h1>
          <p className="text-gray-600">Quản lý yêu cầu tài khoản số</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo Yêu Cầu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900">
            {yeuCauList?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Tổng yêu cầu</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {yeuCauList?.filter(item => item.trang_thai === 'Chờ duyệt').length || 0}
          </div>
          <div className="text-sm text-gray-600">Chờ duyệt</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">
            {yeuCauList?.filter(item => item.trang_thai === 'Đã duyệt').length || 0}
          </div>
          <div className="text-sm text-gray-600">Đã duyệt</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-red-600">
            {yeuCauList?.filter(item => item.trang_thai === 'Từ chối').length || 0}
          </div>
          <div className="text-sm text-gray-600">Từ chối</div>
        </div>
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
                placeholder="Tìm kiếm theo nội dung, loại tài sản, người yêu cầu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Từ chối">Từ chối</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
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
                  Yêu cầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại & Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người yêu cầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
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
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {item.noi_dung}
                      </div>
                      <div className="text-sm text-gray-500">
                        Số lượng: {item.so_luong}
                      </div>
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
                        {item.NguoiYeuCau.ho_ten}
                      </div>
                      {item.NguoiDuyet && (
                        <div className="text-sm text-gray-500">
                          Duyệt bởi: {item.NguoiDuyet.ho_ten}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDateTime(item.ngay_yeu_cau)}
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
                      
                      {item.trang_thai === 'Chờ duyệt' && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Duyệt"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Từ chối"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      {(item.trang_thai === 'Chờ duyệt' || item.trang_thai === 'Từ chối') && (
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy yêu cầu nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
