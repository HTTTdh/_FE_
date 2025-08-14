'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Building,
  Package
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Tài Khoản Số',
    href: '/dashboard/tai-khoan-so',
    icon: CreditCard,
  },
  {
    name: 'Yêu Cầu',
    href: '/dashboard/yeu-cau',
    icon: FileText,
  },
  {
    name: 'Người Dùng',
    href: '/dashboard/nguoi-dung',
    icon: Users,
    adminOnly: true,
  },
  {
    name: 'Loại Tài Sản',
    href: '/dashboard/loai-tai-san',
    icon: Package,
    adminOnly: true,
  },
  {
    name: 'Nhà Cung Cấp',
    href: '/dashboard/nha-cung-cap',
    icon: Building,
    adminOnly: true,
  },
  {
    name: 'Cài Đặt',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || (user?.cap === 1 || user?.cap === 2)
  )

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-gray-900">
            Quản lý TKS
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={cn(
                  "flex-shrink-0 h-5 w-5",
                  isActive ? "text-primary-700" : "text-gray-400 group-hover:text-gray-500",
                  !collapsed && "mr-3"
                )}
              />
              {!collapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      {!collapsed && user && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.ho_ten.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.ho_ten}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Cấp {user.cap}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
