import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import {
  User,
  Mail,
  Phone,
  MessageCircle,
  Edit2,
  Save,
  X,
  Package,
  FileText,
  Clock,
  ChevronRight,
  LogOut,
  Settings,
  Heart,
  Calendar,
  Check,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock recent orders
const mockRecentOrders = [
  {
    id: "ORD-001",
    date: "20 ก.พ. 2026",
    items: "พวงหรีดขาวคลาสสิค x 1",
    total: 1500,
    status: "delivered",
    statusText: "จัดส่งแล้ว",
  },
  {
    id: "ORD-002",
    date: "21 ก.พ. 2026",
    items: "ดอกไม้จันทน์ Premium x 2",
    total: 3000,
    status: "delivering",
    statusText: "กำลังจัดส่ง",
  },
];

// Mock service requests
const mockServiceRequests = [
  {
    id: "REQ-001",
    date: "18 ก.พ. 2026",
    package: "The Legacy",
    status: "in_progress",
    statusText: "กำลังดำเนินการ",
  },
];

export default function Profile() {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const [, setLocation] = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    lineId: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  // Initialize edit form
  useEffect(() => {
    if (user) {
      setEditForm({
        fullName: user.fullName,
        phone: user.phone,
        lineId: user.lineId,
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "text-green-400 bg-green-500/10";
      case "delivering":
      case "in_progress":
        return "text-amber-400 bg-amber-500/10";
      case "pending":
        return "text-blue-400 bg-blue-500/10";
      default:
        return "text-white/60 bg-white/10";
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
            <h1 className="text-3xl font-serif text-gold mb-2">
              {language === "th" ? "โปรไฟล์ของฉัน" : "My Profile"}
            </h1>
            <p className="text-white/50">
              {language === "th" ? "จัดการข้อมูลและดูประวัติกิจกรรมของคุณ" : "Manage your information and view activity"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/30 to-amber-500/30 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gold">
                      {user.fullName.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                  <p className="text-white/50 text-sm">{user.email}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {language === "th" ? "สมาชิกตั้งแต่" : "Member since"} {user.createdAt}
                  </p>
                </div>

                {/* Profile Info */}
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/50 text-xs mb-1">
                        {language === "th" ? "ชื่อ-นามสกุล" : "Full Name"}
                      </label>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1">
                        {language === "th" ? "เบอร์โทร" : "Phone"}
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs mb-1">LINE ID</label>
                      <input
                        type="text"
                        value={editForm.lineId}
                        onChange={(e) => setEditForm({ ...editForm, lineId: e.target.value })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-gold text-black hover:bg-yellow-400"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {language === "th" ? "บันทึก" : "Save"}
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-white/20 text-white/60"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/70">
                      <Mail className="w-4 h-4 text-gold" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Phone className="w-4 h-4 text-gold" />
                      <span className="text-sm">{user.phone || "-"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MessageCircle className="w-4 h-4 text-gold" />
                      <span className="text-sm">{user.lineId || "-"}</span>
                    </div>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="w-full border-white/20 text-white/60 hover:bg-white/5 mt-4"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {language === "th" ? "แก้ไขข้อมูล" : "Edit Profile"}
                    </Button>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => setLocation("/my-orders")}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-amber-400" />
                      <span className="text-white/80">
                        {language === "th" ? "คำสั่งซื้อของฉัน" : "My Orders"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span className="text-white/80">
                        {language === "th" ? "รายการที่บันทึก" : "Saved Items"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-white/60" />
                      <span className="text-white/80">
                        {language === "th" ? "ตั้งค่า" : "Settings"}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{language === "th" ? "ออกจากระบบ" : "Sign Out"}</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Recent Orders */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-gold" />
                    {language === "th" ? "คำสั่งซื้อล่าสุด" : "Recent Orders"}
                  </h3>
                  <button
                    onClick={() => setLocation("/my-orders")}
                    className="text-gold text-sm hover:underline"
                  >
                    {language === "th" ? "ดูทั้งหมด" : "View All"}
                  </button>
                </div>

                {mockRecentOrders.length > 0 ? (
                  <div className="space-y-3">
                    {mockRecentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">#{order.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                {order.status === "delivered" ? (
                                  <span className="flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    {order.statusText}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <Truck className="w-3 h-3" />
                                    {order.statusText}
                                  </span>
                                )}
                              </span>
                            </div>
                            <p className="text-white/50 text-sm">{order.items}</p>
                            <p className="text-white/30 text-xs mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {order.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gold font-bold">฿{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/50">
                      {language === "th" ? "ยังไม่มีคำสั่งซื้อ" : "No orders yet"}
                    </p>
                    <Button
                      onClick={() => setLocation("/shop")}
                      className="mt-4 bg-gold text-black hover:bg-yellow-400"
                    >
                      {language === "th" ? "เลือกซื้อสินค้า" : "Browse Shop"}
                    </Button>
                  </div>
                )}
              </div>

              {/* Service Requests */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold" />
                    {language === "th" ? "คำขอบริการ" : "Service Requests"}
                  </h3>
                  <button className="text-gold text-sm hover:underline">
                    {language === "th" ? "ดูทั้งหมด" : "View All"}
                  </button>
                </div>

                {mockServiceRequests.length > 0 ? (
                  <div className="space-y-3">
                    {mockServiceRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">#{request.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(request.status)}`}>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {request.statusText}
                                </span>
                              </span>
                            </div>
                            <p className="text-white/50 text-sm">{request.package}</p>
                            <p className="text-white/30 text-xs mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {request.date}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white/60"
                          >
                            {language === "th" ? "ดูรายละเอียด" : "Details"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/50">
                      {language === "th" ? "ยังไม่มีคำขอบริการ" : "No service requests"}
                    </p>
                    <Button
                      onClick={() => setLocation("/?openWizard=true")}
                      className="mt-4 bg-gold text-black hover:bg-yellow-400"
                    >
                      {language === "th" ? "เริ่มออกแบบงาน" : "Start Planning"}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
