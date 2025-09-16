import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HeaderNavigation from '@/components/HeaderNavigation';
import { Users, Search, Plus, Mail, Phone, Calendar, DollarSign, MessageCircle } from 'lucide-react';

const ClientPage = () => {
  // Dados mock para clientes
  const clients = [
    {
      id: '1',
      name: 'Dr. João Silva',
      email: 'joao.silva@email.com',
      phone: '+55 11 99999-1111',
      status: 'active',
      lastContact: '2024-01-15',
      totalRevenue: 12500,
      conversationsCount: 45,
      plan: 'Premium'
    },
    {
      id: '2',
      name: 'Maria Santos Consultoria',
      email: 'contato@mariasantos.com',
      phone: '+55 11 99999-2222',
      status: 'active',
      lastContact: '2024-01-14',
      totalRevenue: 8900,
      conversationsCount: 32,
      plan: 'Standard'
    },
    {
      id: '3',
      name: 'Clínica Vida Nova',
      email: 'contato@vidanova.com',
      phone: '+55 11 99999-3333',
      status: 'inactive',
      lastContact: '2024-01-10',
      totalRevenue: 15200,
      conversationsCount: 67,
      plan: 'Enterprise'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ativo</Badge>;
    }
    return <Badge variant="secondary">Inativo</Badge>;
  };

  return (
    <div className="min-h-screen bg-luxury relative overflow-hidden">
      <HeaderNavigation />
      
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/98 to-muted/3" />
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <main className="relative z-10 container-luxury py-8 space-y-8 animate-fade-in" style={{ paddingTop: '6rem' }}>
        
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-foreground tracking-tight gradient-text">
              Gerenciamento de Clientes
            </h1>
            <p className="text-xl text-muted-foreground/80">
              Visualize e gerencie seus clientes de forma eficiente
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
            <Button size="sm" data-testid="button-add-client">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <Card key={client.id} className="glass-card border-border/20 hover:shadow-luxury transition-elegant" data-testid={`card-client-${client.id}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{client.name}</CardTitle>
                  {getStatusBadge(client.status)}
                </div>
                <CardDescription className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <DollarSign className="w-5 h-5 mx-auto text-primary mb-1" />
                      <div className="text-sm font-bold" data-testid={`text-revenue-${client.id}`}>
                        {formatCurrency(client.totalRevenue)}
                      </div>
                      <div className="text-xs text-muted-foreground">Receita Total</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/5 rounded-lg">
                      <MessageCircle className="w-5 h-5 mx-auto text-secondary mb-1" />
                      <div className="text-sm font-bold" data-testid={`text-conversations-${client.id}`}>
                        {client.conversationsCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Conversas</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Plano: <span className="font-medium">{client.plan}</span></span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{client.lastContact}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1" data-testid={`button-view-${client.id}`}>
                      Ver Detalhes
                    </Button>
                    <Button size="sm" className="flex-1" data-testid={`button-contact-${client.id}`}>
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contatar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card border-border/20">
          <CardHeader>
            <CardTitle>Resumo dos Clientes</CardTitle>
            <CardDescription>Estatísticas gerais da sua base de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-black gradient-text" data-testid="text-total-clients">{clients.length}</div>
                <div className="text-sm text-muted-foreground">Total de Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black gradient-text" data-testid="text-active-clients">
                  {clients.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-muted-foreground">Clientes Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black gradient-text" data-testid="text-total-revenue">
                  {formatCurrency(clients.reduce((sum, c) => sum + c.totalRevenue, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Receita Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black gradient-text" data-testid="text-total-conversations">
                  {clients.reduce((sum, c) => sum + c.conversationsCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total de Conversas</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default ClientPage;