import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HeaderNavigation from "@/components/HeaderNavigation";
import {
  BarChart3,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Users,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  PieChart,
  Pie
} from "recharts";

const AnalysisPage = () => {
  // Dados das métricas executivas
  const executiveMetrics = [
    {
      title: "Conversas Atendidas",
      value: "1.247",
      change: "+23%",
      changeType: "increase",
      description: "vs mês anterior",
      icon: MessageCircle,
      color: "text-blue-500"
    },
    {
      title: "Taxa de Conversão",
      value: "27.4%",
      change: "+12%",
      changeType: "increase", 
      description: "vs mês anterior",
      icon: Target,
      color: "text-green-500"
    },
    {
      title: "Receita Gerada",
      value: "R$ 68.400",
      change: "+89%",
      changeType: "increase",
      description: "vs mês anterior", 
      icon: DollarSign,
      color: "text-secondary"
    },
    {
      title: "Tempo Resposta Médio",
      value: "2.3s",
      change: "-15%",
      changeType: "decrease",
      description: "vs mês anterior",
      icon: Clock,
      color: "text-primary"
    }
  ];

  // Dados para gráfico de conversas por dia
  const conversationData = [
    { date: '01', conversations: 42, conversions: 11 },
    { date: '05', conversations: 48, conversions: 13 },
    { date: '10', conversations: 45, conversions: 12 },
    { date: '15', conversations: 52, conversions: 15 },
    { date: '20', conversations: 38, conversions: 10 },
    { date: '25', conversations: 55, conversions: 16 },
    { date: '30', conversations: 49, conversions: 14 }
  ];

  // Dados para funil de conversão
  const funnelData = [
    { name: 'Leads Recebidos', value: 1247, percentage: 100 },
    { name: 'Respostas Automáticas', value: 1189, percentage: 95.3 },
    { name: 'Interesse Demonstrado', value: 487, percentage: 39.0 },
    { name: 'Agendamentos', value: 342, percentage: 27.4 },
    { name: 'Reuniões Confirmadas', value: 274, percentage: 22.0 }
  ];

  // Dados para receita por mês
  const revenueData = [
    { month: 'Jul', revenue: 45000, target: 50000 },
    { month: 'Ago', revenue: 52000, target: 50000 },
    { month: 'Set', revenue: 48000, target: 50000 },
    { month: 'Out', revenue: 61000, target: 50000 },
    { month: 'Nov', revenue: 68000, target: 50000 },
    { month: 'Dez', revenue: 72000, target: 50000 }
  ];

  // Dados para performance da IA
  const aiPerformance = {
    precision: 94,
    responseTime: 2.3,
    uptime: 99.9,
    satisfaction: 4.8
  };

  // Top 10 clientes
  const topClients = [
    { rank: 1, name: 'Dr. Silva', conversations: 45, revenue: 8500 },
    { rank: 2, name: 'Advogado Santos', conversations: 38, revenue: 7200 },
    { rank: 3, name: 'Consultoria ABC', conversations: 32, revenue: 6800 },
    { rank: 4, name: 'Clínica XYZ', conversations: 28, revenue: 5900 },
    { rank: 5, name: 'Escritório Lima', conversations: 25, revenue: 5100 },
    { rank: 6, name: 'Dr. Costa', conversations: 22, revenue: 4800 },
    { rank: 7, name: 'Consultora Maria', conversations: 19, revenue: 4200 },
    { rank: 8, name: 'Advogada Ana', conversations: 16, revenue: 3900 },
    { rank: 9, name: 'Clínica Beta', conversations: 14, revenue: 3500 },
    { rank: 10, name: 'Dr. Oliveira', conversations: 12, revenue: 3100 }
  ];

  // Palavras-chave mais usadas
  const keywordsData = [
    { keyword: 'consulta', count: 234 },
    { keyword: 'agendamento', count: 198 },
    { keyword: 'preço', count: 156 },
    { keyword: 'horário', count: 134 },
    { keyword: 'disponibilidade', count: 112 },
    { keyword: 'orçamento', count: 89 },
    { keyword: 'tratamento', count: 67 },
    { keyword: 'consulta online', count: 45 },
    { keyword: 'primeira consulta', count: 34 },
    { keyword: 'emergência', count: 23 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-luxury relative overflow-hidden">
      {/* Header Navigation */}
      <HeaderNavigation />
      
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/98 to-muted/3" />
      
      {/* Premium Ambient Lights */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <main className="relative z-10 container-luxury py-8 space-y-8 animate-fade-in" style={{ paddingTop: '6rem' }}>
        
        {/* Header da Página */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-foreground tracking-tight gradient-text">
              Análise Executiva
            </h1>
            <p className="text-xl text-muted-foreground/80">
              Métricas avançadas e insights estratégicos do seu negócio
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 dias</SelectItem>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="90days">Últimos 90 dias</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Métricas Executivas - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executiveMetrics.map((metric, index) => (
            <Card key={index} className="glass-card border-border/20 hover:shadow-luxury transition-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black gradient-text mb-1">{metric.value}</div>
                <div className="flex items-center space-x-1">
                  {metric.changeType === 'increase' ? (
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-green-500" />
                  )}
                  <span className="text-xs text-green-500 font-medium">{metric.change}</span>
                  <span className="text-xs text-muted-foreground">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gráficos Principais - Grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Conversas por Dia */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Conversas por Dia</span>
              </CardTitle>
              <CardDescription>Evolução diária das conversas nos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Funil de Conversão */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-secondary" />
                <span>Funil de Conversão</span>
              </CardTitle>
              <CardDescription>Processo de conversão de leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {funnelData.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{stage.name}</span>
                      <span className="text-muted-foreground">{stage.value} ({stage.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Receita por Mês */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-secondary" />
                <span>Receita por Mês</span>
              </CardTitle>
              <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Receita']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }} 
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance da IA */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Performance da IA</span>
              </CardTitle>
              <CardDescription>Métricas de desempenho do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20"></div>
                    <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-black gradient-text">{aiPerformance.precision}%</div>
                        <div className="text-xs text-muted-foreground">Precisão</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">{aiPerformance.responseTime}s</div>
                    <div className="text-xs text-muted-foreground">Tempo</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">{aiPerformance.uptime}%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">{aiPerformance.satisfaction}/5</div>
                    <div className="text-xs text-muted-foreground">Satisfação</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Análise Avançada - Grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Top 10 Clientes */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Top 10 Clientes</span>
              </CardTitle>
              <CardDescription>Ranking por conversas e receita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {client.rank}
                      </Badge>
                      <span className="font-medium">{client.name}</span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-semibold">{formatCurrency(client.revenue)}</div>
                      <div className="text-muted-foreground">{client.conversations} conversas</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Palavras-chave Mais Usadas */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                <span>Palavras-chave Mais Usadas</span>
              </CardTitle>
              <CardDescription>Termos mais frequentes nas conversas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keywordsData.slice(0, 8).map((keyword, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{keyword.keyword}</span>
                      <span className="text-muted-foreground">{keyword.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(keyword.count / keywordsData[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
};

export default AnalysisPage;