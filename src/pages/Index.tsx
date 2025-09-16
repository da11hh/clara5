import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Eye, EyeOff, Crown, Zap, Shield } from 'lucide-react';

const Index = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setLoginError('Email ou senha inválidos. Verifique suas credenciais.');
      }
    } catch (error) {
      setLoginError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-lg font-semibold text-foreground">Carregando ExecutiveAI...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury relative overflow-hidden flex items-center justify-center">
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/98 to-muted/3" />
      
      {/* Premium Ambient Lights */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl flex items-center justify-center glow-primary">
                  <Sparkles className="w-8 h-8 text-white animate-glow" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-black text-background">AI</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black gradient-text tracking-tight">ExecutiveAI Pro</h1>
              <p className="text-muted-foreground">Assistente Inteligente Premium para Executivos</p>
            </div>
          </div>

          {/* Login Form */}
          <Card className="glass-card border-border/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">Acesso Executivo</CardTitle>
              <CardDescription>Entre com suas credenciais para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="h-12"
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-12 pr-12"
                        required
                        data-testid="input-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {loginError && (
                  <Alert variant="destructive">
                    <AlertDescription data-testid="text-login-error">{loginError}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/90"
                  disabled={isSubmitting}
                  data-testid="button-login"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Conectando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4" />
                      <span>Entrar no Sistema</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="glass-card border-border/20 bg-muted/20">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Credenciais de Demo:</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-2 bg-background/50 rounded border">
                    <div className="font-medium">Admin Empresa A:</div>
                    <div>Email: admin@empresaa.com</div>
                    <div>Senha: 123456</div>
                  </div>
                  <div className="p-2 bg-background/50 rounded border">
                    <div className="font-medium">Gestor Empresa B:</div>
                    <div>Email: gestor@empresab.com</div>
                    <div>Senha: senha123</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Análise Inteligente</div>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-xs text-muted-foreground">Segurança Enterprise</div>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">Experiência Premium</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;