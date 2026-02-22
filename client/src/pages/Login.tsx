import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/components/AuthContext";
import { useLanguage } from "@/components/LanguageContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { t, language } = useLanguage();
  const { login, register, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login form
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Register form
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    setLocation("/profile");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(loginForm.email, loginForm.password);

    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        setLocation("/profile");
      }, 500);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setError(language === "th" ? "รหัสผ่านไม่ตรงกัน" : "Passwords do not match");
      return;
    }

    if (registerForm.password.length < 6) {
      setError(language === "th" ? "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" : "Password must be at least 6 characters");
      return;
    }

    if (!registerForm.acceptTerms) {
      setError(language === "th" ? "กรุณายอมรับเงื่อนไขการใช้งาน" : "Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    const result = await register({
      email: registerForm.email,
      password: registerForm.password,
      fullName: registerForm.fullName,
      phone: registerForm.phone,
    });

    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        setLocation("/profile");
      }, 500);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <img
              src="/logo-sasan.png"
              alt="SASAN"
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-serif text-gold mb-2">
              {activeTab === "login"
                ? language === "th" ? "เข้าสู่ระบบ" : "Sign In"
                : language === "th" ? "สมัครสมาชิก" : "Create Account"}
            </h1>
            <p className="text-white/50 text-sm">
              {activeTab === "login"
                ? language === "th" ? "ยินดีต้อนรับกลับ" : "Welcome back"
                : language === "th" ? "สร้างบัญชีใหม่เพื่อเริ่มต้น" : "Create a new account to get started"}
            </p>
          </motion.div>

          {/* Tab Switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setActiveTab("login"); setError(""); }}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-gold text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {language === "th" ? "เข้าสู่ระบบ" : "Sign In"}
            </button>
            <button
              onClick={() => { setActiveTab("register"); setError(""); }}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-gold text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {language === "th" ? "สมัครสมาชิก" : "Register"}
            </button>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "อีเมล" : "Email"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "รหัสผ่าน" : "Password"}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={loginForm.remember}
                      onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/50"
                    />
                    <span className="text-white/50 text-sm">
                      {language === "th" ? "จดจำฉัน" : "Remember me"}
                    </span>
                  </label>
                  <button type="button" className="text-gold/80 text-sm hover:text-gold">
                    {language === "th" ? "ลืมรหัสผ่าน?" : "Forgot password?"}
                  </button>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold text-black hover:bg-yellow-400 py-6 rounded-xl font-bold text-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {language === "th" ? "เข้าสู่ระบบ" : "Sign In"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Demo Account */}
                <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl">
                  <p className="text-amber-400/80 text-sm mb-2">
                    🔑 {language === "th" ? "บัญชีทดสอบ:" : "Demo Account:"}
                  </p>
                  <p className="text-white/60 text-xs">Email: demo@sasan.co.th</p>
                  <p className="text-white/60 text-xs">Password: demo1234</p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-sm">{language === "th" ? "หรือ" : "or"}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 rounded-xl text-white/70 hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>{language === "th" ? "เข้าสู่ระบบด้วย Google" : "Sign in with Google"}</span>
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 py-3 bg-[#06C755] rounded-xl text-white font-medium hover:bg-[#05b34d] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                    <span>{language === "th" ? "เข้าสู่ระบบด้วย LINE" : "Sign in with LINE"}</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                {/* Full Name */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "ชื่อ-นามสกุล" : "Full Name"} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder={language === "th" ? "ชื่อของคุณ" : "Your name"}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "อีเมล" : "Email"} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "เบอร์โทรศัพท์" : "Phone"} ({language === "th" ? "ไม่บังคับ" : "Optional"})
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="081-234-5678"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "รหัสผ่าน" : "Password"} *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder={language === "th" ? "อย่างน้อย 6 ตัวอักษร" : "At least 6 characters"}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">
                    {language === "th" ? "ยืนยันรหัสผ่าน" : "Confirm Password"} *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registerForm.acceptTerms}
                    onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                    className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/50"
                  />
                  <span className="text-white/50 text-sm">
                    {language === "th" 
                      ? "ฉันยอมรับ เงื่อนไขการใช้งาน และ นโยบายความเป็นส่วนตัว" 
                      : "I accept the Terms of Service and Privacy Policy"}
                  </span>
                </label>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold text-black hover:bg-yellow-400 py-6 rounded-xl font-bold text-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {language === "th" ? "สมัครสมาชิก" : "Create Account"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
