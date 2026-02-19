import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  MessageCircle,
  Sparkles,
  Send,
  Copy,
  Edit3,
  User,
  Check,
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

interface CustomerMessage {
  id: string;
  customerName: string;
  customerPhone: string;
  message: string;
  channel: "line" | "phone" | "web";
  createdAt: string;
  replied: boolean;
}

// ============================================================
// MOCK DATA
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

const mockMessages: CustomerMessage[] = [
  {
    id: "MSG-001",
    customerName: "คุณมาลี",
    customerPhone: "081-111-2222",
    message: "สอบถามราคาแพ็คเกจจัดงานศพค่ะ มีแพ็คเกจไหนบ้าง ราคาเท่าไหร่",
    channel: "line",
    createdAt: "2024-02-14T11:30:00",
    replied: false,
  },
  {
    id: "MSG-002",
    customerName: "คุณสมศักดิ์",
    customerPhone: "089-333-4444",
    message: "อยากจัดงานให้คุณพ่อ งบประมาณ 80,000 บาท แนะนำแพ็คเกจไหนดีครับ",
    channel: "web",
    createdAt: "2024-02-14T10:45:00",
    replied: false,
  },
  {
    id: "MSG-003",
    customerName: "คุณนิภา",
    customerPhone: "062-555-6666",
    message: "วัดธาตุทองรับจัดงานไหมคะ ต้องการจัดงาน 5 วัน",
    channel: "line",
    createdAt: "2024-02-14T09:20:00",
    replied: true,
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
  const [messages, setMessages] = useState<CustomerMessage[]>(mockMessages);
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 262000,
    totalOrders: 47,
    totalProducts: 156,
    newCustomers: 23,
    salesChange: 12.5,
    ordersChange: 8.3,
  });

  // AI Draft State
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [aiDraft, setAiDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedDraft, setEditedDraft] = useState("");
  const [showCopied, setShowCopied] = useState(false);

  const formatPrice = (price: number) => new Intl.NumberFormat("th-TH").format(price);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  };

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

  const getChannelInfo = (channel: CustomerMessage["channel"]) => {
    const channelMap = {
      line: { label: "LINE", color: "bg-green-500/20 text-green-400" },
      phone: { label: "โทรศัพท์", color: "bg-amber-500/20 text-amber-400" },
      web: { label: "เว็บไซต์", color: "bg-blue-500/20 text-blue-400" },
    };
    return channelMap[channel];
  };

  const maxSales = Math.max(...mockSalesData.map((d) => d.sales));

  const ordersByStatus = {
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  // ============================================================
  // AI DRAFT FUNCTIONS
  // ============================================================
  const generateAIDraft = async (message: CustomerMessage) => {
    setSelectedMessage(message);
    setIsGenerating(true);
    setAiDraft("");
    setEditedDraft("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.message }),
      });

      const data = await response.json();
      const draft = data.reply || "ขออภัยค่ะ ไม่สามารถสร้างคำตอบได้ในขณะนี้";
      setAiDraft(draft);
      setEditedDraft(draft);
    } catch (error) {
      setAiDraft("เกิดข้อผิดพลาดในการสร้างคำตอบ กรุณาลองใหม่อีกครั้ง");
      setEditedDraft("เกิดข้อผิดพลาดในการสร้างคำตอบ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedDraft);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const markAsReplied = (messageId: string) => {
    setMessages(messages.map(m => m.id === messageId ? { ...m, replied: true } : m));
    setSelectedMessage(null);
    setAiDraft("");
    setEditedDraft("");
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-white/60">ภาพรวมยอดขายและคำสั่งซื้อ</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-white/5 rounded-xl p-1">
                {[
                  { value: "today", label: "วันนี้" },
                  { value: "week", label: "สัปดาห์" },
                  { value: "month", label: "เดือน" },
                  { value: "year", label: "ปี" },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range.value ? "bg-amber-500 text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              <button onClick={refreshData} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <RefreshCw className={`w-5 h-5 text-white/70 ${isLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "ยอดขายรวม", value: `฿${formatPrice(stats.totalSales)}`, change: stats.salesChange, icon: DollarSign, color: "from-amber-500 to-amber-600" },
              { label: "คำสั่งซื้อ", value: stats.totalOrders, change: stats.ordersChange, icon: ShoppingCart, color: "from-blue-500 to-blue-600" },
              { label: "สินค้าทั้งหมด", value: stats.totalProducts, change: 5.2, icon: Package, color: "from-purple-500 to-purple-600" },
              { label: "ลูกค้าใหม่", value: stats.newCustomers, change: 15.8, icon: Users, color: "from-green-500 to-green-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {stat.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <p className="text-white/50 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* ============================================================ */}
          {/* AI DRAFT SECTION */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 bg-gradient-to-r from-purple-500/10 to-amber-500/10 border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    💬 ข้อความจากลูกค้า
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      {messages.filter(m => !m.replied).length} ใหม่
                    </span>
                  </h3>
                  <p className="text-white/50 text-sm">ใช้ AI ช่วยร่างคำตอบ แล้วตรวจสอบก่อนส่ง</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message List */}
              <div className="space-y-3">
                <p className="text-white/50 text-sm mb-2">ข้อความที่ยังไม่ได้ตอบ:</p>
                {messages.filter(m => !m.replied).map((msg) => {
                  const channelInfo = getChannelInfo(msg.channel);
                  return (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedMessage?.id === msg.id
                          ? "bg-white/10 border border-amber-500/50"
                          : "bg-white/5 border border-transparent hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white/60" />
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{msg.customerName}</p>
                            <p className="text-white/40 text-xs">{msg.customerPhone}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${channelInfo.color}`}>
                          {channelInfo.label}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">{msg.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-white/40 text-xs">{formatTime(msg.createdAt)}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            generateAIDraft(msg);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-xs rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                          <Sparkles className="w-3 h-3" />
                          AI ร่างคำตอบ
                        </button>
                      </div>
                    </div>
                  );
                })}

                {messages.filter(m => !m.replied).length === 0 && (
                  <div className="text-center py-8 text-white/40">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>ตอบข้อความครบทุกรายการแล้ว 🎉</p>
                  </div>
                )}
              </div>

              {/* AI Draft Panel */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                {selectedMessage ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-white/10">
                      <p className="text-white/50 text-xs mb-2">ข้อความจากลูกค้า:</p>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/80 text-sm">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white/50 text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          คำตอบที่ AI ร่างให้:
                        </p>
                        {aiDraft && !isGenerating && (
                          <button
                            onClick={() => generateAIDraft(selectedMessage)}
                            className="text-amber-400 text-xs hover:underline flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            สร้างใหม่
                          </button>
                        )}
                      </div>

                      {isGenerating ? (
                        <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-amber-400">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <span className="text-sm ml-2">กำลังสร้างคำตอบ...</span>
                          </div>
                        </div>
                      ) : aiDraft ? (
                        <>
                          <textarea
                            value={editedDraft}
                            onChange={(e) => setEditedDraft(e.target.value)}
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white/80 text-sm focus:outline-none focus:border-amber-500/50 resize-none"
                          />

                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={copyToClipboard}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              {showCopied ? (
                                <>
                                  <Check className="w-4 h-4 text-green-400" />
                                  คัดลอกแล้ว!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  คัดลอก
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => markAsReplied(selectedMessage.id)}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-lg text-sm font-medium transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              ตอบแล้ว
                            </button>
                          </div>

                          <p className="text-white/30 text-xs mt-3 text-center">
                            💡 คัดลอกคำตอบไปวางใน LINE หรือช่องทางที่ลูกค้าติดต่อมา
                          </p>
                        </>
                      ) : (
                        <div className="bg-white/5 rounded-lg p-6 text-center">
                          <Sparkles className="w-10 h-10 text-amber-400/50 mx-auto mb-2" />
                          <p className="text-white/50 text-sm">กด "AI ร่างคำตอบ" เพื่อให้ AI ช่วยร่างคำตอบ</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                    <MessageCircle className="w-16 h-16 text-white/20 mb-4" />
                    <p className="text-white/50">เลือกข้อความเพื่อดูรายละเอียด</p>
                    <p className="text-white/30 text-sm mt-1">และใช้ AI ช่วยร่างคำตอบ</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
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
