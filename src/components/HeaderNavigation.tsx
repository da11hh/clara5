import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard,
  BarChart3,
  Users,
  Calendar,
  Settings,
  LogOut,
  Sparkles,
  Crown
} from "lucide-react";

const HeaderNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard,
      active: location.pathname === "/dashboard"
    },
    { 
      path: "/analise", 
      label: "Análise", 
      icon: BarChart3,
      active: location.pathname === "/analise"
    },
    { 
      path: "/clients", 
      label: "Clientes", 
      icon: Users,
      active: location.pathname === "/clients"
    },
    { 
      path: "/calendar", 
      label: "Calendário", 
      icon: Calendar,
      active: location.pathname === "/calendar"
    },
    { 
      path: "/settings", 
      label: "Configurações", 
      icon: Settings,
      active: location.pathname === "/settings"
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-xl flex items-center justify-center glow-primary">
                <Sparkles className="w-5 h-5 text-white animate-glow" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border border-background flex items-center justify-center">
                <span className="text-xs font-black text-background">AI</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-black gradient-text tracking-tight">ExecutiveAI Pro</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={item.active ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`h-10 px-4 ${item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <div className="flex items-center justify-end">
                <Crown className="w-3 h-3 mr-1 text-secondary" />
                <span className="text-xs text-secondary font-medium">{user?.role}</span>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="h-10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;