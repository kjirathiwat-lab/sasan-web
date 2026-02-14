import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Eye,
  MoreVertical,
  Download,
  Filter,
  RefreshCw,
  ChevronRight,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  Truck,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================
interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled";
  temple: string;
  deliveryDate: string;
  createdAt: string;
}

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  newCustomers: number;
  salesChange: number;
  ordersChange: number;
}

interface TopProduct {
  id: number;
  name: string;
  sold: number;
  revenue: number;
  image: string;
}

// ============================================================
// MOCK DATA (ใช้ข้อมูลจำลอง - เชื่อมต่อ API จริงภายหลัง)
// ============================================================
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "คุณสมชาย วงศ์ใหญ่",
    customerPhone: "081-234-5678",
    products: [{ name: "พวงหรีดทองพรีเมียม", quantity: 1, price: 3500 }],
    total: 3500,
    status: "pending",
    temple: "วัดเทพศิรินทร์",
    deliveryDate: "2024-02-15",
    createdAt: "2024-02-14T10:30:00",
  },
  {
    id: "ORD-002",
    customerName: "คุณวิภา สุขใจ",
    customerPhone: "089-876-5432",
    products: [
      { name: "ชุดดอกไม้จันทน์ 100 ดอก", quantity: 2, price: 900 },
      { name: "ของชำร่วยพรีเมียม", quantity: 100, price: 85 },
    ],
    total: 10300,
    status: "processing",
    temple: "วัดธาตุทอง",
    deliveryDate: "2024-02-15",
    createdAt: "2024-02-14T09:15:00",
  },
  {
    id: "ORD-003",
    customerName: "คุณธนา พงษ์ดี",
    customerPhone: "062-345-6789",
    products: [{ name: "พวงหรีดม่วงรอยัล", quantity: 1, price: 5500 }],
    total: 5500,
    status: "shipped",
    temple: "วัดบวรนิเวศ",
    deliveryDate: "2024-02-14",
    createdAt: "2024-02-13T14:20:00",
  },
  {
    id: "ORD-004",
    customerName: "คุณนภา กิตติ์",
    customerPhone: "095-111-2222",
    products: [{ name: "โกศทองเหลืองพรีเมียม", quantity: 1, price: 8500 }],
    total: 8500,
    status: "completed",
    temple: "วัดพระศรีมหาธาตุ",
    deliveryDate: "2024-02-13",
    createdAt: "2024-02-12T11:00:00",
  },
  {
    id: "ORD-005",
    customerName: "คุณประยุทธ์ จันทร์",
    customerPhone: "086-999-8888",
    products: [
      { name: "พวงหรีดขาวคลาสสิค", quantity: 2, price: 1500 },
      { name: "ชุดดอกไม้จันทน์ 50 ดอก", quantity: 1, price: 500 },
    ],
    total: 3500,
    status: "completed",
    temple: "วัดมกุฏกษัตริยาราม",
    deliveryDate: "2024-02-12",
    createdAt: "2024-02-11T16:45:00",
  },
];

const mockTopProducts: TopProduct[] = [
  { id: 1, name: "พวงหรีดทองพรีเมียม", sold: 45, revenue: 157500, image: "💐" },
  { id: 2, name: "ชุดดอกไม้จันทน์ 100 ดอก", sold: 38, revenue: 34200, image: "🌸" },
  { id: 3, name: "ของชำร่วยพรีเมียม", sold: 520, revenue: 44200, image: "🎁" },
  { id: 4, name: "พวงหรีดม่วงรอยัล", sold: 22, revenue: 121000, image: "💜" },
  { id: 5, name: "โกศเซรามิคคลาสสิค", sold: 15, revenue: 52500, image: "⚱️" },
];

const mockSalesData = [
  { day: "จ.", sales: 25000 },
  { day: "อ.", sales: 32000 },
  { day: "พ.", sales: 28000 },
  { day: "พฤ.", sales: 45000 },
  { day: "ศ.", sales: 52000 },
  { day: "ส.", sales: 38000 },
  { day: "อา.", sales: 42000 },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month" | "year">("week");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 262000,
    totalOrders: 47,
    totalProducts: 156,
    newCustomers: 23,
    salesChange: 12.5,
    ordersChange: 8.3,
  });

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status info
  const getStatusInfo = (status: Order["status"]) => {
    const statusMap = {
      pending: { label: "รอดำเนินการ", color: "bg-yellow-500/20 text-yellow-400", icon: AlertCircle },
      processing: { label: "กำลังเตรียม", color: "bg-blue-500/20 text-blue-400", icon: Package },
      shipped: { label: "จัดส่งแล้ว", color: "bg-purple-500/20 text-purple-400", icon: Truck },
      completed: { label: "สำเร็จ", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
      cancelled: { label: "ยกเลิก", color: "bg-red-500/20 text-red-400", icon: XCircle },
    };
    return statusMap[status];
  };

  // Calculate max sales for chart
  const maxSales = Math.max(...mockSalesData.map((d) => d.sales));

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Orders by status count
  const ordersByStatus = {
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-white/50">ภาพรวมยอดขายและคำสั่งซื้อ</p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Time Range Selector */}
              <div className="flex bg-white/5 rounded-xl p-1">
                {[
                  { id: "today", label: "วันนี้" },
                  { id: "week", label: "สัปดาห์" },
                  { id: "month", label: "เดือน" },
                  { id: "year", label: "ปี" },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range.id
                        ? "bg-amber-500 text-black"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <button
                onClick={refreshData}
                className={`p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors ${
                  isLoading ? "animate-spin" : ""
                }`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-amber-400" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stats.salesChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {stats.salesChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(stats.salesChange)}%
                </div>
              </div>
              <p className="text-white/50 text-sm mb-1">ยอดขายรวม</p>
              <p className="text-3xl font-bold text-white">฿{formatPrice(stats.totalSales)}</p>
            </motion.div>

            {/* Total Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stats.ordersChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {stats.ordersChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(stats.ordersChange)}%
                </div>
              </div>
              <p className="text-white/50 text-sm mb-1">คำสั่งซื้อทั้งหมด</p>
              <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
            </motion.div>

            {/* Total Products Sold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <p className="text-white/50 text-sm mb-1">สินค้าขายได้</p>
              <p className="text-3xl font-bold text-white">{stats.totalProducts} ชิ้น</p>
            </motion.div>

            {/* New Customers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <p className="text-white/50 text-sm mb-1">ลูกค้าใหม่</p>
              <p className="text-3xl font-bold text-white">{stats.newCustomers} คน</p>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">ยอดขาย 7 วันล่าสุด</h3>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-white/50" />
                </button>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between h-48 gap-4">
                {mockSalesData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-white/5 rounded-t-lg relative" style={{ height: "100%" }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.sales / maxSales) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg"
                      />
                    </div>
                    <span className="text-white/50 text-xs">{data.day}</span>
                  </div>
                ))}
              </div>

              {/* Chart Legend */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white/50 text-sm">รวมสัปดาห์นี้</p>
                  <p className="text-xl font-bold text-white">฿{formatPrice(mockSalesData.reduce((a, b) => a + b.sales, 0))}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/50 text-sm">เฉลี่ย/วัน</p>
                  <p className="text-xl font-bold text-white">
                    ฿{formatPrice(Math.round(mockSalesData.reduce((a, b) => a + b.sales, 0) / 7))}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Order Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-6">สถานะคำสั่งซื้อ</h3>

              <div className="space-y-4">
                {[
                  { label: "รอดำเนินการ", count: ordersByStatus.pending, color: "bg-yellow-500", icon: AlertCircle },
                  { label: "กำลังเตรียม", count: ordersByStatus.processing, color: "bg-blue-500", icon: Package },
                  { label: "จัดส่งแล้ว", count: ordersByStatus.shipped, color: "bg-purple-500", icon: Truck },
                  { label: "สำเร็จ", count: ordersByStatus.completed, color: "bg-green-500", icon: CheckCircle },
                ].map((status, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${status.color}/20 rounded-xl flex items-center justify-center`}>
                      <status.icon className={`w-5 h-5 ${status.color.replace("bg-", "text-")}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/70 text-sm">{status.label}</span>
                        <span className="text-white font-bold">{status.count}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(status.count / orders.length) * 100}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className={`h-full ${status.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">🏆 สินค้าขายดี</h3>
                <button className="text-amber-400 text-sm hover:underline">ดูทั้งหมด</button>
              </div>

              <div className="space-y-4">
                {mockTopProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/50 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{product.name}</p>
                      <p className="text-white/50 text-sm">ขายได้ {product.sold} ชิ้น</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold">฿{formatPrice(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">📋 คำสั่งซื้อล่าสุด</h3>
                <button className="text-amber-400 text-sm hover:underline">ดูทั้งหมด</button>
              </div>

              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium">{order.id}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm truncate">{order.customerName}</p>
                        <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{order.temple}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-bold">฿{formatPrice(order.total)}</p>
                        <p className="text-white/40 text-xs">{formatTime(order.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Delivery Today */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">🚚 รอจัดส่งวันนี้</h3>
                  <p className="text-white/50 text-sm">มี {orders.filter(o => o.status === "pending" || o.status === "processing").length} รายการที่ต้องจัดส่ง</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-400 transition-colors">
                ดูรายละเอียด
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {orders
                .filter((o) => o.status === "pending" || o.status === "processing")
                .slice(0, 3)
                .map((order) => (
                  <div key={order.id} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{order.id}</span>
                      <span className="text-purple-400 text-sm">{order.deliveryDate}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">{order.customerName}</p>
                    <div className="flex items-center gap-1 text-white/50 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{order.temple}</span>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
