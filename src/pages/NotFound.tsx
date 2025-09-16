import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxury relative overflow-hidden flex items-center justify-center">
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/98 to-muted/3" />
      
      {/* Premium Ambient Lights */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative z-10 text-center space-y-8 animate-fade-in max-w-md mx-auto p-4">
        
        {/* 404 Número */}
        <div className="space-y-4">
          <h1 className="text-8xl font-black gradient-text tracking-tight" data-testid="text-404">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Mensagem */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground" data-testid="text-title">
            Página Não Encontrada
          </h2>
          <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
            A página que você está procurando não existe ou foi movida.
            Verifique o endereço ou retorne ao dashboard principal.
          </p>
        </div>

        {/* Ícone de Busca */}
        <div className="my-8">
          <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center space-x-2 h-12"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 h-12 bg-gradient-to-r from-primary to-primary/90"
            data-testid="button-home"
          >
            <Home className="w-4 h-4" />
            <span>Ir para Dashboard</span>
          </Button>
        </div>

        {/* Links Úteis */}
        <div className="border-t border-border/20 pt-6 mt-8">
          <p className="text-sm text-muted-foreground mb-3">Links úteis:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid="link-dashboard"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/analise')}
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid="link-analysis"
            >
              Análises
            </button>
            <button
              onClick={() => navigate('/clients')}
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid="link-clients"
            >
              Clientes
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="text-primary hover:text-primary/80 transition-colors"
              data-testid="link-settings"
            >
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;