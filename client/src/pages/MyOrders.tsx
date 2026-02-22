import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import {
  Package,
  ChevronLeft,
  Calendar,
  MapPin,
  Clock,
  Check,
  Truck,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Orders Data
const mockOrders = [
  {
    id: "ORD-2026-001",
    date: "20 ก.พ. 2026",
    dateEn: "Feb 20, 2026",
    items: [
      { name: "พวงหรีดขาวคลาสสิค", nameEn: "Classic White Wreath", qty: 1, price: 1500 },
    ],
    total: 1500,
    status: "delivered",
    statusText: "จัดส่งแล้ว",
    statusTextEn: "Delivered",
    deliveryDate: "20 ก.พ. 2026",
    deliveryLocation: "วัดเทพศิรินทร์ ศาลา 5",
    trackingNumber: "TH123456789",
  },
  {
    id: "ORD-2026-002",
    date: "21 ก.พ. 2026",
    dateEn: "Feb 21, 2026",
    items: [
      { name: "ดอกไม้จันทน์ Premium", nameEn: "Premium Sandalwood Flowers", qty: 2, price: 1500 },
    ],
    total: 3000,
    status: "delivering",
    statusText: "กำลังจัดส่ง",
    statusTextEn: "In Transit",
    deliveryDate: "22 ก.พ. 2026",
    deliveryLocation: "วัดธาตุทอง ศาลา 3",
    trackingNumber: "TH987654321",
  },
  {
    id: "ORD-2026-003",
    date: "19 ก.พ. 2026",
    dateEn: "Feb 19, 2026",
    items: [
      { name: "ของชำร่วยงานศพ ชุด A", nameEn: "Funeral Souvenir Set A", qty: 100, price: 50 },
      { name: "พวงหรีดทองพรีเมียม", nameEn: "Premium Gold Wreath", qty: 1, price: 3500 },
    ],
    total: 8500,
    status: "delivered",
    statusText: "จัดส่งแล้ว",
    statusTextEn: "Delivered",
    deliveryDate: "19 ก.พ. 2026",
    deliveryLocation: "วัดมกุฏกษัตริยาราม ศาลา 1",
    trackingNumber: "TH456789123",
  },
  {
    id: "ORD-2026-004",
    date: "15 ก.พ. 2026",
    dateEn: "Feb 15, 2026",
    items: [
      { name: "โกศบรรจุอัฐิ รุ่น Premium", nameEn: "Premium Urn", qty: 1, price: 8500 },
    ],
    total: 8500,
    status: "completed",
    statusText: "เสร็จสิ้น",
    statusTextEn: "Completed",
    deliveryDate: "16 ก.พ. 2026",
    deliveryLocation: "จัดส่งถึงบ้าน",
    trackingNumber: "TH111222333",
  },
];

export default function MyOrders() {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const [filter, setFilter] = useState<"all" | "delivering" | "delivered" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return <Check className="w-4 h-4" />;
      case "delivering":
        return <Truck className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "delivering":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "cancelled":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      default:
        return "text-blue-400 bg-blue-500/10 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setLocation("/profile")}
              className="flex items-center gap-2 text-white/50 hover:text-white mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === "th" ? "กลับไปโปรไฟล์" : "Back to Profile"}</span>
            </button>
            <h1 className="text-3xl font-serif text-gold mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" />
              {language === "th" ? "คำสั่งซื้อของฉัน" : "My Orders"}
            </h1>
            <p className="text-white/50">
              {language === "th" 
                ? `ทั้งหมด ${mockOrders.length} รายการ` 
                : `Total ${mockOrders.length} orders`}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder={language === "th" ? "ค้นหาเลขที่คำสั่งซื้อ..." : "Search order number..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: "all", label: language === "th" ? "ทั้งหมด" : "All", count: mockOrders.length },
                { id: "delivering", label: language === "th" ? "กำลังจัดส่ง" : "In Transit", count: mockOrders.filter(o => o.status === "delivering").length },
                { id: "delivered", label: language === "th" ? "จัดส่งแล้ว" : "Delivered", count: mockOrders.filter(o => o.status === "delivered").length },
                { id: "completed", label: language === "th" ? "เสร็จสิ้น" : "Completed", count: mockOrders.filter(o => o.status === "completed").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === tab.id
                      ? "bg-gold text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Orders List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                >
                  {/* Order Header */}
                  <div className="p-4 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{order.id}</span>
                        <span className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {language === "th" ? order.statusText : order.statusTextEn}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-bold text-lg">฿{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-white/70">
                            {language === "th" ? item.name : item.nameEn} x {item.qty}
                          </span>
                          <span className="text-white/50">฿{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-white/40 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{language === "th" ? order.date : order.dateEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{order.deliveryLocation}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white/60 hover:bg-white/5"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        {language === "th" ? "รายละเอียด" : "Details"}
                      </Button>
                      {order.status === "delivering" && (
                        <Button
                          size="sm"
                          className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        >
                          <Truck className="w-4 h-4 mr-1.5" />
                          {language === "th" ? "ติดตามพัสดุ" : "Track"}
                        </Button>
                      )}
                      {(order.status === "delivered" || order.status === "completed") && (
                        <Button
                          size="sm"
                          className="bg-gold/20 text-gold hover:bg-gold/30"
                        >
                          <RefreshCw className="w-4 h-4 mr-1.5" />
                          {language === "th" ? "สั่งอีกครั้ง" : "Reorder"}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white/60 mb-2">
                  {language === "th" ? "ไม่พบคำสั่งซื้อ" : "No orders found"}
                </h3>
                <p className="text-white/40 text-sm mb-6">
                  {language === "th" 
                    ? "ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น" 
                    : "Try changing filters or search terms"}
                </p>
                <Button
                  onClick={() => setLocation("/shop")}
                  className="bg-gold text-black hover:bg-yellow-400"
                >
                  {language === "th" ? "เลือกซื้อสินค้า" : "Browse Shop"}
                </Button>
              </div>
            )}
          </motion.div>

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{selectedOrder.id}</h3>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-white/40 hover:text-white"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border mt-2 ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    {language === "th" ? selectedOrder.statusText : selectedOrder.statusTextEn}
                  </span>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Items */}
                  <div>
                    <h4 className="text-sm text-white/50 mb-3">
                      {language === "th" ? "รายการสินค้า" : "Items"}
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white">{language === "th" ? item.name : item.nameEn}</p>
                            <p className="text-white/40 text-sm">x {item.qty}</p>
                          </div>
                          <p className="text-gold font-medium">฿{(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-white/60">{language === "th" ? "รวมทั้งหมด" : "Total"}</span>
                      <span className="text-gold font-bold text-xl">฿{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h4 className="text-sm text-white/50 mb-3">
                      {language === "th" ? "ข้อมูลการจัดส่ง" : "Delivery Info"}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-gold mt-0.5" />
                        <div>
                          <p className="text-white/40 text-xs">{language === "th" ? "วันที่จัดส่ง" : "Delivery Date"}</p>
                          <p className="text-white">{selectedOrder.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gold mt-0.5" />
                        <div>
                          <p className="text-white/40 text-xs">{language === "th" ? "สถานที่" : "Location"}</p>
                          <p className="text-white">{selectedOrder.deliveryLocation}</p>
                        </div>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="flex items-start gap-3">
                          <Truck className="w-4 h-4 text-gold mt-0.5" />
                          <div>
                            <p className="text-white/40 text-xs">{language === "th" ? "เลขพัสดุ" : "Tracking Number"}</p>
                            <p className="text-white font-mono">{selectedOrder.trackingNumber}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-gold text-black hover:bg-yellow-400"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {language === "th" ? "สั่งอีกครั้ง" : "Reorder"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white/60"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {language === "th" ? "ติดต่อ" : "Contact"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
