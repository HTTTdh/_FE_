'use client'

import { useAuth } from '@/contexts/auth-context'
import { CreditCard, FileText, Users, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Tổng Tài Khoản Số',
      value: '124',
      change: '+12%',
      changeType: 'increase',
      icon: CreditCard,
    },
    {
      name: 'Yêu Cầu Chờ Duyệt',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: FileText,
    },
    {
      name: 'Người Dùng Hoạt Động',
      value: '32',
      change: '+5%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Hiệu Suất',
      value: '98.2%',
      change: '+0.5%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Chào mừng, {user?.ho_ten}!
        </h1>
        <p className="text-gray-600">
          Tổng quan về hệ thống quản lý tài khoản số
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Yêu Cầu Gần Đây
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Yêu cầu tài khoản Google Ads #{item}
                    </p>
                    <p className="text-sm text-gray-500">
                      2 giờ trước
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Chờ duyệt
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Trạng Thái Hệ Thống
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Backend</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Authentication</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
