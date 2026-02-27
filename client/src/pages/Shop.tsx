import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/components/LanguageContext";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  Check,
  Truck,
  Clock,
  CreditCard,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Upload,
  Image,
  Gift,
  Flower2,
  Package,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================
// TYPES
// ============================================================
interface Product {
  id: number;
  name: string;
  nameTh: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  features?: string[];
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  customizable?: boolean;
  deliveryTime: string;
}

interface CartItem extends Product {
  quantity: number;
  customText?: string;
  deliveryDate?: string;
  deliveryLocation?: string;
}

// ============================================================
// PRODUCT DATA
// ============================================================
const products: Product[] = [
  // พวงหรีด
  {
    id: 1,
    name: "Classic White Wreath",
    nameTh: "พวงหรีดขาวคลาสสิค",
    category: "wreath",
    price: 1500,
    image: "/Flower C.png",
    description: "พวงหรีดดอกไม้สดโทนขาว สง่างาม เหมาะสำหรับทุกโอกาส",
    features: ["ดอกไม้สด 100%", "การันตีความสด 3 วัน", "จัดส่งฟรีในกรุงเทพฯ"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 3 ชม.",
  },
  {
    id: 2,
    name: "Premium Gold Wreath",
    nameTh: "พวงหรีดทองพรีเมียม",
    category: "wreath",
    price: 3500,
    originalPrice: 4000,
    image: "/Flower G.png",
    description: "พวงหรีดดอกไม้สดโทนทอง-ขาว หรูหรา สมเกียรติ",
    features: ["ดอกไม้นำเข้า", "ริบบิ้นผ้าไหม", "การ์ดข้อความพิเศษ"],
    badge: "ขายดี",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 3 ชม.",
  },
  {
    id: 3,
    name: "Royal Purple Wreath",
    nameTh: "พวงหรีดม่วงรอยัล",
    category: "wreath",
    price: 5500,
    image: "/Flower R.png",
    description: "พวงหรีดดอกไม้สดโทนม่วง-ขาว ดีไซน์พิเศษ ขนาดใหญ่",
    features: ["ขนาดใหญ่พิเศษ", "ดอกไม้พรีเมียม", "จัดส่ง VIP"],
    badge: "Premium",
    rating: 5.0,
    reviews: 45,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 2 ชม.",
  },
  {
    id: 4,
    name: "Fan Wreath Deluxe",
    nameTh: "พวงหรีด Deluxe",
    category: "wreath",
    price: 4500,
    image: "/Flower D.png",
    description: "พวงหรีด พร้อมดอกไม้ประดับ มอบให้วัดหลังงาน",
    features: ["พัดลม 18 นิ้ว", "มอบให้วัดได้", "ใช้งานได้จริง"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 4 ชม.",
  },
  {
    id: 5,
    name: "Fan Wreath Deluxe",
    nameTh: "พวงหรีดทำจากผ้า",
    category: "wreath",
    price: 2500,
    image: "/Fabric Flower.png",
    description: "พวงหรีด งานฝีมือ ทำจากผ้า",
    features: ["ทำจากผ้าห่อศพ", "มอบให้วัดได้", "ใช้งานได้จริง"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 4 ชม.",
  },
  // ดอกไม้จันทน์
  {
    id: 5,
    name: "Sandalwood Flower Set 50",
    nameTh: "ชุดดอกไม้จันทน์ 50 ดอก",
    category: "sandalwood",
    price: 500,
    image: "/50.jpg",
    description: "ดอกไม้จันทน์คุณภาพดี 50 ดอก พร้อมกล่องบรรจุสวยงาม",
    features: ["50 ดอก", "กล่องบรรจุพิเศษ", "ไม้จันทน์แท้"],
    rating: 4.6,
    reviews: 234,
    inStock: true,
    deliveryTime: "จัดส่งภายใน 1 วัน",
  },
  {
    id: 6,
    name: "Sandalwood Flower Set 100",
    nameTh: "ชุดดอกไม้จันทน์ 100 ดอก",
    category: "sandalwood",
    price: 900,
    originalPrice: 1000,
    image: "/100.jpg",
    description: "ดอกไม้จันทน์คุณภาพดี 100 ดอก คุ้มค่า ประหยัดกว่า",
    features: ["100 ดอก", "กล่องบรรจุพิเศษ", "ประหยัด 10%"],
    badge: "คุ้มค่า",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    deliveryTime: "จัดส่งภายใน 1 วัน",
  },
  {
    id: 7,
    name: "Premium Sandalwood Set",
    nameTh: "ชุดดอกไม้จันทน์พรีเมียม",
    category: "sandalwood",
    price: 1500,
    image: "/Premium.jpg",
    description: "ดอกไม้จันทน์แกะสลักลายพิเศษ 100 ดอก พร้อมกล่องไม้สัก",
    features: ["แกะสลักลายพิเศษ", "กล่องไม้สัก", "100 ดอก"],
    badge: "Premium",
    rating: 4.9,
    reviews: 56,
    inStock: true,
    deliveryTime: "จัดส่งภายใน 1 วัน",
  },
  // ของชำร่วย
  {
    id: 8,
    name: "Basic Memorial Set",
    nameTh: "ชุดของชำร่วยพื้นฐาน",
    category: "souvenir",
    price: 35,
    image: "/set1.jpg",
    description: "ของชำร่วยชุดพื้นฐาน ประกอบด้วย สบู่หอม + ถุงผ้า",
    features: ["สบู่หอม", "ถุงผ้า", "การ์ดขอบคุณ"],
    rating: 4.5,
    reviews: 456,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 3 วัน",
  },
  {
    id: 9,
    name: "Premium Memorial Set",
    nameTh: "ชุดของชำร่วยพรีเมียม",
    category: "souvenir",
    price: 85,
    image: "/set2.jpg",
    description: "ของชำร่วยชุดพรีเมียม ประกอบด้วย ร่มพับ + กล่องสวยงาม",
    features: ["ร่มพับคุณภาพดี", "กล่องของขวัญ", "พิมพ์ชื่อได้"],
    badge: "ขายดี",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 3 วัน",
  },
  {
    id: 10,
    name: "Luxury Memorial Set",
    nameTh: "ชุดของชำร่วย Luxury",
    category: "souvenir",
    price: 150,
    image: "/set3.jpg",
    description: "ของชำร่วยชุด Luxury ผ้าไหมไทย + เครื่องหอม + กล่องไม้",
    features: ["ผ้าไหมไทยแท้", "เครื่องหอม", "กล่องไม้สลักชื่อ"],
    badge: "Luxury",
    rating: 4.9,
    reviews: 87,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 5 วัน",
  },
  // โกศ
  {
    id: 11,
    name: "Ceramic Urn Classic",
    nameTh: "โกศเซรามิคคลาสสิค",
    category: "urn",
    price: 3500,
    image: "SD Urn.png",
    description: "โกศเซรามิคลายกนกไทย งานฝีมือ สวยงามคลาสสิค",
    features: ["เซรามิคคุณภาพสูง", "ลายกนกไทย", "สลักชื่อได้"],
    rating: 4.8,
    reviews: 45,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 5 วัน",
  },
  {
    id: 12,
    name: "Brass Urn Premium",
    nameTh: "โกศทองเหลืองพรีเมียม",
    category: "urn",
    price: 8500,
    image: "/Golden Urn.png",
    description: "โกศทองเหลืองแท้ แกะสลักลายไทย พร้อมฐานไม้สัก",
    features: ["ทองเหลืองแท้", "แกะสลักมือ", "ฐานไม้สัก"],
    badge: "Premium",
    rating: 5.0,
    reviews: 23,
    inStock: true,
    customizable: true,
    deliveryTime: "จัดส่งภายใน 7 วัน",
  },
];

const categories = [
  { id: "all", name: "ทั้งหมด", nameEn: "All", icon: Package },
  { id: "wreath", name: "พวงหรีด", nameEn: "Wreaths", icon: Flower2 },
  { id: "sandalwood", name: "ดอกไม้จันทน์", nameEn: "Sandalwood Flowers", icon: Flower2 },
  { id: "souvenir", name: "ของชำร่วย", nameEn: "Souvenirs", icon: Gift },
  { id: "urn", name: "โกศ/กล่องอัฐิ", nameEn: "Urns", icon: Package },
];

// ============================================================
// SKELETON COMPONENTS
// ============================================================
function ProductCardSkeleton() {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <Skeleton variant="shimmer" className="aspect-square w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton variant="shimmer" className="h-3 w-1/4 rounded" />
        <Skeleton variant="shimmer" className="h-5 w-full rounded" />
        <Skeleton variant="shimmer" className="h-4 w-full rounded" />
        <Skeleton variant="shimmer" className="h-4 w-2/3 rounded" />
        <div className="flex justify-between pt-2">
          <Skeleton variant="shimmer" className="h-6 w-20 rounded" />
          <Skeleton variant="shimmer" className="h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Shop() {
  const { t, language } = useLanguage();
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(1);
  
  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
    templeName: "",
    hallNumber: "",
    senderName: "",
    message: "",
    paymentMethod: "qr",
  });

  // Filter and sort products
  const filteredProducts = products
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameTh.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews; // popular
    });

  // Cart functions
  const addToCart = (product: Product, qty: number = 1, custom?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty, customText: custom }];
    });
    setSelectedProduct(null);
    setQuantity(1);
    setCustomText("");
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Simulate initial product load
  useEffect(() => {
    const timer = setTimeout(() => setIsProductsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-20 pb-12 bg-gradient-to-b from-amber-900/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t.shop.subtitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/60 text-lg mb-8"
            >
              {t.shop.description}
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder={t.shop.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4">{language === "th" ? "หมวดหมู่" : "Categories"}</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === cat.id
                          ? "bg-amber-500 text-black"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <cat.icon className="w-5 h-5" />
                      <span>{language === "th" ? cat.name : cat.nameEn}</span>
                      <span className="ml-auto text-sm opacity-60">
                        {cat.id === "all"
                          ? products.length
                          : products.filter((p) => p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="font-bold text-white mb-3">{language === "th" ? "บริการของเรา" : "Our Services"}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Truck className="w-4 h-4 text-amber-400" />
                      <span>{language === "th" ? "จัดส่งฟรีในกรุงเทพฯ" : "Free delivery in Bangkok"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{language === "th" ? "จัดส่งด่วน 2-3 ชม." : "Express delivery 2-3 hrs"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>{language === "th" ? "บริการ 24 ชม." : "24/7 Service"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* Sort & Filter Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-white/60">
                  {language === "th" ? "พบ" : "Found"} <span className="text-white font-bold">{filteredProducts.length}</span> {language === "th" ? "สินค้า" : "products"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">{language === "th" ? "เรียงตาม:" : "Sort by:"}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="popular">{language === "th" ? "ยอดนิยม" : "Popular"}</option>
                    <option value="price-low">{language === "th" ? "ราคา: ต่ำ-สูง" : "Price: Low-High"}</option>
                    <option value="price-high">{language === "th" ? "ราคา: สูง-ต่ำ" : "Price: High-Low"}</option>
                    <option value="rating">{language === "th" ? "คะแนนสูงสุด" : "Highest Rating"}</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isProductsLoading ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </>
                ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.nameTh}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                          product.badge === "Premium" ? "bg-purple-500 text-white" :
                          product.badge === "Luxury" ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black" :
                          product.badge === "ขายดี" ? "bg-red-500 text-white" :
                          "bg-green-500 text-white"
                        }`}>
                          {product.badge}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                      
                      {/* Quick Actions */}
                      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="p-2 bg-amber-500 text-black rounded-full hover:bg-amber-400 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                        {categories.find(c => c.id === product.category)?.name}
                      </p>
                      <h3 className="font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {product.nameTh}
                      </h3>
                      <p className="text-white/50 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm">{product.rating}</span>
                        </div>
                        <span className="text-white/40 text-sm">({product.reviews} รีวิว)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-amber-400 font-bold text-xl">
                            ฿{formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-white/40 text-sm line-through ml-2">
                              ฿{formatPrice(product.originalPrice)}
                            </span>
                          )}
                          {product.category === "souvenir" && (
                            <span className="text-white/50 text-xs">/ชิ้น</span>
                          )}
                        </div>
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          {product.deliveryTime}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-amber-500 text-black rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center hover:bg-amber-400 transition-all hover:scale-110"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.nameTh}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.badge && (
                    <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold ${
                      selectedProduct.badge === "Premium" ? "bg-purple-500 text-white" :
                      selectedProduct.badge === "Luxury" ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black" :
                      "bg-red-500 text-white"
                    }`}>
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-2">
                    {categories.find(c => c.id === selectedProduct.category)?.name}
                  </p>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProduct.nameTh}
                  </h2>
                  <p className="text-white/60 mb-4">{selectedProduct.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(selectedProduct.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white">{selectedProduct.rating}</span>
                    <span className="text-white/50">({selectedProduct.reviews} รีวิว)</span>
                  </div>

                  {/* Features */}
                  {selectedProduct.features && (
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-2">คุณสมบัติ</h4>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                            <Check className="w-4 h-4 text-green-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Custom Text */}
                  {selectedProduct.customizable && (
                    <div className="mb-6">
                      <label className="block font-bold text-white mb-2">
                        ข้อความบนพวงหรีด/ของชำร่วย
                      </label>
                      <textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="กรอกข้อความที่ต้องการ..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500 resize-none"
                        rows={3}
                      />
                    </div>
                  )}

                  {/* Price & Quantity */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-amber-400 font-bold text-3xl">
                        ฿{formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-white/40 text-lg line-through ml-2">
                          ฿{formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center gap-2 text-green-400 mb-6">
                    <Truck className="w-5 h-5" />
                    <span>{selectedProduct.deliveryTime}</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(selectedProduct, quantity, customText)}
                    className="w-full py-4 bg-amber-500 text-black rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    เพิ่มลงตะกร้า - ฿{formatPrice(selectedProduct.price * quantity)}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">ตะกร้าสินค้า ({cartCount})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50">ตะกร้าว่างเปล่า</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 bg-white/5 rounded-xl p-4"
                      >
                        <img
                          src={item.image}
                          alt={item.nameTh}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm">{item.nameTh}</h4>
                          {item.customText && (
                            <p className="text-white/40 text-xs mt-1">"{item.customText}"</p>
                          )}
                          <p className="text-amber-400 font-bold mt-2">
                            ฿{formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 bg-white/10 rounded hover:bg-white/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 bg-white/10 rounded hover:bg-white/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto p-1 text-red-400 hover:bg-red-400/10 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10">
                  <div className="flex justify-between mb-4">
                    <span className="text-white/60">รวมทั้งหมด</span>
                    <span className="text-2xl font-bold text-amber-400">
                      ฿{formatPrice(cartTotal)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-4 bg-amber-500 text-black rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors"
                  >
                    ดำเนินการสั่งซื้อ
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-900 p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">ชำระเงิน</h2>
                  <p className="text-white/50 text-sm">ขั้นตอนที่ {checkoutStep} จาก 3</p>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCheckoutStep(1);
                  }}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  {["ข้อมูลจัดส่ง", "ตรวจสอบ", "ชำระเงิน"].map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          i + 1 <= checkoutStep
                            ? "bg-amber-500 text-black"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`ml-2 text-sm hidden sm:block ${
                          i + 1 <= checkoutStep ? "text-white" : "text-white/50"
                        }`}
                      >
                        {step}
                      </span>
                      {i < 2 && (
                        <div
                          className={`w-12 sm:w-20 h-0.5 mx-2 ${
                            i + 1 < checkoutStep ? "bg-amber-500" : "bg-white/10"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {checkoutStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-lg mb-4">ข้อมูลผู้สั่ง</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">ชื่อ-นามสกุล *</label>
                        <input
                          type="text"
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                          placeholder="กรุณากรอกชื่อ"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">เบอร์โทร *</label>
                        <input
                          type="tel"
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                          placeholder="08X-XXX-XXXX"
                        />
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-4 mt-8">สถานที่จัดส่ง</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-white/60 text-sm mb-2">ชื่อวัด *</label>
                        <input
                          type="text"
                          value={checkoutForm.templeName}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, templeName: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                          placeholder="เช่น วัดเทพศิรินทร์"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">ศาลา/หมายเลข</label>
                        <input
                          type="text"
                          value={checkoutForm.hallNumber}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, hallNumber: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                          placeholder="เช่น ศาลา 5"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">ชื่อเจ้าภาพ/ผู้เสียชีวิต</label>
                        <input
                          type="text"
                          value={checkoutForm.senderName}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, senderName: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                          placeholder="สำหรับระบุตอนจัดส่ง"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-sm mb-2">วันที่จัดส่ง *</label>
                        <input
                          type="date"
                          value={checkoutForm.deliveryDate}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, deliveryDate: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-2">เวลาที่ต้องการ</label>
                        <select
                          value={checkoutForm.deliveryTime}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, deliveryTime: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="">เลือกเวลา</option>
                          <option value="morning">เช้า (8:00-12:00)</option>
                          <option value="afternoon">บ่าย (12:00-16:00)</option>
                          <option value="evening">เย็น (16:00-20:00)</option>
                          <option value="urgent">ด่วน (ภายใน 3 ชม.)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-lg mb-4">ตรวจสอบรายการสั่งซื้อ</h3>
                    
                    {/* Order Items */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4">
                          <img
                            src={item.image}
                            alt={item.nameTh}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm">{item.nameTh}</h4>
                            <p className="text-white/50 text-sm">x{item.quantity}</p>
                          </div>
                          <p className="text-amber-400 font-bold">
                            ฿{formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-3">ข้อมูลจัดส่ง</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-white/70">
                          <span className="text-white/40">ผู้สั่ง:</span> {checkoutForm.name} ({checkoutForm.phone})
                        </p>
                        <p className="text-white/70">
                          <span className="text-white/40">สถานที่:</span> {checkoutForm.templeName} {checkoutForm.hallNumber}
                        </p>
                        <p className="text-white/70">
                          <span className="text-white/40">วันที่:</span> {checkoutForm.deliveryDate}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60">ค่าสินค้า</span>
                        <span className="text-white">฿{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60">ค่าจัดส่ง</span>
                        <span className="text-green-400">ฟรี</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>รวมทั้งหมด</span>
                        <span className="text-amber-400">฿{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-lg mb-4">เลือกวิธีชำระเงิน</h3>
                    
                    <div className="space-y-3">
                      {[
                        { id: "qr", name: "QR Code พร้อมเพย์", icon: "📱", desc: "สแกน QR Code ชำระทันที" },
                        { id: "transfer", name: "โอนเงิน", icon: "🏦", desc: "โอนเงินผ่านบัญชีธนาคาร" },
                        { id: "credit", name: "บัตรเครดิต/เดบิต", icon: "💳", desc: "Visa, Mastercard, JCB" },
                        { id: "cod", name: "ชำระปลายทาง", icon: "💵", desc: "ชำระเงินสดเมื่อรับสินค้า (+฿50)" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            checkoutForm.paymentMethod === method.id
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={checkoutForm.paymentMethod === method.id}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                            className="hidden"
                          />
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex-1">
                            <p className="font-bold text-white">{method.name}</p>
                            <p className="text-white/50 text-sm">{method.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            checkoutForm.paymentMethod === method.id
                              ? "border-amber-500 bg-amber-500"
                              : "border-white/30"
                          }`}>
                            {checkoutForm.paymentMethod === method.id && (
                              <Check className="w-3 h-3 text-black" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    {checkoutForm.paymentMethod === "qr" && (
                      <div className="bg-white rounded-xl p-6 text-center">
                        <p className="text-black font-bold mb-4">สแกน QR Code เพื่อชำระเงิน</p>
                        <div className="w-48 h-48 bg-gray-200 mx-auto rounded-xl flex items-center justify-center">
                          <span className="text-gray-500">[QR Code]</span>
                        </div>
                        <p className="text-black mt-4">
                          จำนวน <span className="font-bold text-amber-600">฿{formatPrice(cartTotal)}</span>
                        </p>
                      </div>
                    )}

                    {checkoutForm.paymentMethod === "transfer" && (
                      <div className="bg-white/5 rounded-xl p-6">
                        <p className="font-bold text-white mb-4">โอนเงินเข้าบัญชี</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-white/70">ธนาคาร: <span className="text-white">กสิกรไทย</span></p>
                          <p className="text-white/70">เลขที่บัญชี: <span className="text-white">XXX-X-XXXXX-X</span></p>
                          <p className="text-white/70">ชื่อบัญชี: <span className="text-white">บริษัท ศศาน จำกัด</span></p>
                        </div>
                        <div className="mt-4">
                          <label className="block text-white/60 text-sm mb-2">อัพโหลดสลิป</label>
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                            <p className="text-white/50 text-sm">คลิกเพื่ออัพโหลดสลิปโอนเงิน</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-zinc-900 p-6 border-t border-white/10 flex gap-4">
                {checkoutStep > 1 && (
                  <button
                    onClick={() => setCheckoutStep(checkoutStep - 1)}
                    className="flex-1 py-4 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
                  >
                    ย้อนกลับ
                  </button>
                )}
                <button
                  onClick={() => {
                    if (checkoutStep < 3) {
                      setCheckoutStep(checkoutStep + 1);
                    } else {
                      // Submit order
                      alert("🎉 สั่งซื้อสำเร็จ! ทีมงานจะติดต่อกลับเพื่อยืนยันคำสั่งซื้อ");
                      setIsCheckoutOpen(false);
                      setCheckoutStep(1);
                      setCart([]);
                    }
                  }}
                  className="flex-1 py-4 bg-amber-500 text-black rounded-xl font-bold hover:bg-amber-400 transition-colors"
                >
                  {checkoutStep < 3 ? "ถัดไป" : "ยืนยันสั่งซื้อ"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 bg-zinc-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold text-amber-400 mb-4">SASAN Shop</h4>
              <p className="text-white/50 text-sm">
                พวงหรีด ดอกไม้จันทน์ ของชำร่วย และอุปกรณ์งานศพ คุณภาพดี ราคายุติธรรม
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">หมวดหมู่</h5>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="hover:text-amber-400 cursor-pointer">พวงหรีด</li>
                <li className="hover:text-amber-400 cursor-pointer">ดอกไม้จันทน์</li>
                <li className="hover:text-amber-400 cursor-pointer">ของชำร่วย</li>
                <li className="hover:text-amber-400 cursor-pointer">โกศ/กล่องอัฐิ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">บริการ</h5>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="hover:text-amber-400 cursor-pointer">จัดส่งฟรีในกรุงเทพฯ</li>
                <li className="hover:text-amber-400 cursor-pointer">จัดส่งด่วน 2-3 ชม.</li>
                <li className="hover:text-amber-400 cursor-pointer">บริการ 24 ชม.</li>
                <li className="hover:text-amber-400 cursor-pointer">รับประกันคุณภาพ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">ติดต่อเรา</h5>
              <div className="space-y-2 text-sm text-white/50">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 081-234-5678
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> @sasan
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
            © 2024 SASAN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
