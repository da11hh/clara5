import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { toast } = useToast();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao ExecutiveAI Pro",
        });
        navigate("/dashboard");
      } else {
        setErrors({
          general: "Credenciais inválidas. Use: executivo@empresa.com / 123456"
        });
        
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Credenciais inválidas. Verifique e tente novamente.",
        });
      }
    } catch (error) {
      setErrors({
        general: "Erro interno do servidor. Tente novamente."
      });
      
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Erro interno. Tente novamente em alguns instantes.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Premium Content Card */}
      <Card className="w-full max-w-lg glass-card border-border/30 relative z-10 animate-slide-up shadow-luxury">
        <CardHeader className="space-y-6 text-center pt-8">
          {/* Luxury Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-3xl flex items-center justify-center glow-primary transform transition-premium group-hover:scale-105 shadow-premium">
                <Sparkles className="w-10 h-10 text-white animate-glow" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border-2 border-background flex items-center justify-center glow-gold animate-scale-in">
                <span className="text-sm font-black text-background tracking-tighter">AI</span>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent to-white/10 opacity-30"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <CardTitle className="text-3xl font-black gradient-text tracking-tight leading-none">
              ExecutiveAI Pro
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 text-lg font-medium">
              <span className="gradient-text-gold">Plataforma Executiva</span> · Inteligência Premium
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Luxury Email Field */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/90 tracking-wide">
                Email Executivo
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-muted-foreground/70 group-focus-within:text-primary transition-elegant" />
                <Input
                  id="email"
                  type="email"
                  placeholder="executivo@empresa.com"
                  className={`pl-12 transition-elegant hover:border-primary/30 ${
                    errors.email ? "border-destructive focus:border-destructive" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  required
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-destructive text-sm mt-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Luxury Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground/90 tracking-wide">
                Senha Executiva
              </Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-muted-foreground/70 group-focus-within:text-primary transition-elegant" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className={`pl-12 pr-12 transition-elegant hover:border-primary/30 ${
                    errors.password ? "border-destructive focus:border-destructive" : ""
                  }`}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, password: e.target.value }));
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-muted-foreground/70 hover:text-primary transition-elegant p-1 rounded-lg hover:bg-muted/20"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-destructive text-sm mt-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="flex items-center space-x-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <span className="text-muted-foreground">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-primary hover:text-primary/80 transition-smooth font-medium"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Premium Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              variant="premium"
              size="lg"
              className="w-full font-bold tracking-wide group mt-6"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-base">Acessando Plataforma...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-base">Acessar ExecutiveAI</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-premium" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <Separator className="bg-border/50" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
              ou
            </span>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <button className="text-primary hover:text-primary/80 font-medium transition-smooth">
                Criar conta
              </button>
            </p>
          </div>

          {/* Luxury Premium Badge */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 badge-premium rounded-full animate-scale-in">
              <div className="w-3 h-3 bg-gradient-to-r from-secondary to-secondary/80 rounded-full animate-pulse shadow-gold" />
              <span className="text-sm font-bold gradient-text-gold tracking-wide">Executive Premium</span>
              <div className="w-1 h-1 bg-secondary/60 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};