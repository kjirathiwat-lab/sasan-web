import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ============================================================
// TYPES
// ============================================================
interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  lineId: string;
  avatar: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_USERS: { [email: string]: { password: string; user: User } } = {
  "demo@sasan.co.th": {
    password: "demo1234",
    user: {
      id: "user_001",
      email: "demo@sasan.co.th",
      fullName: "สมชาย ใจดี",
      phone: "081-234-5678",
      lineId: "@somchai",
      avatar: "",
      createdAt: "2024-01-15",
    },
  },
};

// ============================================================
// CONTEXT
// ============================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("sasan_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("sasan_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check mock users
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem("sasan_user", JSON.stringify(mockUser.user));
      return { success: true, message: "เข้าสู่ระบบสำเร็จ" };
    }

    // Check registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("sasan_registered_users") || "{}");
    const registeredUser = registeredUsers[email.toLowerCase()];
    if (registeredUser && registeredUser.password === password) {
      setUser(registeredUser.user);
      localStorage.setItem("sasan_user", JSON.stringify(registeredUser.user));
      return { success: true, message: "เข้าสู่ระบบสำเร็จ" };
    }

    return { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  };

  // Register function
  const register = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const email = data.email.toLowerCase();

    // Check if email exists
    if (MOCK_USERS[email]) {
      return { success: false, message: "อีเมลนี้ถูกใช้งานแล้ว" };
    }

    const registeredUsers = JSON.parse(localStorage.getItem("sasan_registered_users") || "{}");
    if (registeredUsers[email]) {
      return { success: false, message: "อีเมลนี้ถูกใช้งานแล้ว" };
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: email,
      fullName: data.fullName,
      phone: data.phone || "",
      lineId: "",
      avatar: "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Save to localStorage
    registeredUsers[email] = {
      password: data.password,
      user: newUser,
    };
    localStorage.setItem("sasan_registered_users", JSON.stringify(registeredUsers));

    // Auto login
    setUser(newUser);
    localStorage.setItem("sasan_user", JSON.stringify(newUser));

    return { success: true, message: "สมัครสมาชิกสำเร็จ" };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("sasan_user");
  };

  // Update profile function
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("sasan_user", JSON.stringify(updatedUser));

      // Also update in registered users
      const registeredUsers = JSON.parse(localStorage.getItem("sasan_registered_users") || "{}");
      if (registeredUsers[user.email]) {
        registeredUsers[user.email].user = updatedUser;
        localStorage.setItem("sasan_registered_users", JSON.stringify(registeredUsers));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
