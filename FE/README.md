# Hệ thống Quản lý Tài Khoản Số - Frontend

Frontend cho ứng dụng quản lý tài khoản số được xây dựng với Next.js 14, React 18 và TypeScript.

## Tính năng chính

- 🔐 **Xác thực người dùng** - Đăng nhập/đăng ký với JWT
- 📊 **Dashboard** - Tổng quan hệ thống với thống kê
- 💳 **Quản lý Tài Khoản Số** - CRUD tài khoản số với bảo mật
- 📝 **Quản lý Yêu Cầu** - Tạo và duyệt yêu cầu tài khoản
- 👥 **Phân quyền người dùng** - 3 cấp độ (Admin, Manager, User)
- 🎨 **UI/UX hiện đại** - Responsive design với Tailwind CSS
- 🔍 **Tìm kiếm & Lọc** - Tìm kiếm thông minh
- 📱 **Responsive** - Tương thích mọi thiết bị

## Công nghệ sử dụng

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Query + Context API
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Cài đặt

1. **Clone repository và di chuyển vào thư mục FE:**
   ```bash
   cd digital_account_manager-main/FE
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Tạo file môi trường:**
   ```bash
   cp .env.example .env.local
   ```

4. **Cấu hình backend API URL trong `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

5. **Chạy ứng dụng development:**
   ```bash
   npm run dev
   ```

   Frontend sẽ chạy tại: http://localhost:3001

## Cấu trúc thư mục

```
src/
├── app/                     # Next.js App Router
│   ├── auth/               # Trang xác thực
│   ├── dashboard/          # Trang dashboard và các module chính
│   ├── globals.css         # CSS toàn cục
│   ├── layout.tsx          # Layout chính
│   └── page.tsx            # Trang chủ
├── components/             # Components tái sử dụng
│   ├── layout/            # Layout components (Header, Sidebar)
│   ├── ui/                # UI components cơ bản
│   └── providers.tsx      # Context providers
├── contexts/              # React contexts
│   └── auth-context.tsx   # Authentication context
├── lib/                   # Utilities và API
│   ├── api.ts            # API functions
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
```

## API Endpoints

Frontend kết nối với các API endpoints sau:

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

### Admin/Account Management
- `GET /api/admin/tai-khoan/level1` - Lấy tài khoản cấp 1
- `GET /api/admin/tai-khoan/level2` - Lấy tài khoản cấp 2
- `POST /api/admin/yeu_cau` - Tạo yêu cầu
- `PATCH /api/admin/yeu_cau` - Cập nhật yêu cầu
- `POST /api/admin/tai_san_so` - Tạo tài sản số
- `POST /api/admin/hanh_dong` - Lấy hành động

## Tính năng bảo mật

- ✅ JWT Authentication với auto-refresh
- ✅ Protected routes với middleware
- ✅ Input validation và sanitization
- ✅ CORS configuration
- ✅ Secure cookie handling
- ✅ Role-based access control (RBAC)

## Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run start    # Chạy production server
npm run lint     # Kiểm tra ESLint
```

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000  # Backend API URL
```

## Phân quyền người dùng

### Cấp 1 (Admin)
- Toàn quyền truy cập tất cả tính năng
- Quản lý người dùng, loại tài sản, nhà cung cấp
- Duyệt/từ chối yêu cầu

### Cấp 2 (Manager)
- Quản lý tài khoản số
- Duyệt yêu cầu cấp dưới
- Xem báo cáo

### Cấp 3 (User)
- Tạo yêu cầu tài khoản số
- Xem tài khoản được phân quyền
- Cập nhật thông tin cá nhân

## Responsive Design

- 📱 **Mobile First** - Thiết kế tối ưu cho mobile
- 💻 **Desktop Friendly** - Trải nghiệm tốt trên desktop
- 📊 **Adaptive Layout** - Sidebar thu gọn trên màn hình nhỏ
- 🎯 **Touch Friendly** - Các element dễ tương tác

## Tích hợp với Backend

Frontend được thiết kế để hoạt động với Node.js/Express backend:

1. **CORS Configuration** - Backend phải enable CORS cho `http://localhost:3001`
2. **Cookie Authentication** - Sử dụng HTTP-only cookies
3. **API Proxy** - Next.js proxy API calls từ `/api/*` đến backend
4. **Real-time Updates** - Chuẩn bị tích hợp WebSocket

## Deploy

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend đang chạy tại port 3000
- Xác nhận CORS được cấu hình đúng
- Kiểm tra `NEXT_PUBLIC_API_URL` trong `.env.local`

### Lỗi authentication
- Xóa cookies và đăng nhập lại
- Kiểm tra JWT token hợp lệ
- Xác nhận backend authentication middleware

### Lỗi build
- Xóa `.next` folder và rebuild
- Kiểm tra TypeScript types
- Đảm bảo tất cả dependencies được cài đặt

## Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser để xem lỗi
2. Xem logs của backend
3. Đảm bảo cả frontend và backend đang chạy
4. Kiểm tra network requests trong Developer Tools
