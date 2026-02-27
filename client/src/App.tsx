import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Shop from "@/pages/Shop";
import Dashboard from "./pages/Dashboard";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import { AuthProvider } from "@/components/AuthContext";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import MyOrders from "@/pages/MyOrders";
import San from "@/pages/San";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/my-orders" component={MyOrders} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/san" component={San} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>  
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
