import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import HeaderNavigation from '@/components/HeaderNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, User, Bell, Shield, Key, Database, Zap, Check, X, Calendar, MessageCircle, Link2, CloudCog } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const { user, client, credentials, updateCredentials } = useAuth();
  const { toast } = useToast();
  
  // State for modal dialogs
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const [apiKeysOpen, setApiKeysOpen] = useState(false);
  const [webhooksOpen, setWebhooksOpen] = useState(false);
  
  // State for credential forms
  const [googleCalendarForm, setGoogleCalendarForm] = useState({
    client_id: '',
    client_secret: '',
    refresh_token: ''
  });
  
  const [whatsappForm, setWhatsappForm] = useState({
    api_key: '',
    phone_number: '',
    webhook_url: ''
  });
  
  const [supabaseForm, setSupabaseForm] = useState({
    url: '',
    anon_key: '',
    service_role_key: ''
  });
  
  const [evolutionApiForm, setEvolutionApiForm] = useState({
    base_url: '',
    api_key: '',
    instance_name: ''
  });
  
  const [n8nForm, setN8nForm] = useState({
    webhook_url: '',
    api_key: ''
  });
  
  // Handle credential updates
  const handleUpdateCredentials = async (type: string, formData: any) => {
    try {
      const success = await updateCredentials(type, formData);
      if (success) {
        toast({
          title: "Credenciais atualizadas",
          description: `${type} foi configurado com sucesso.`,
        });
        // Close modal
        if (type === 'google_calendar') setIntegrationsOpen(false);
        if (type === 'whatsapp') setIntegrationsOpen(false);
        if (type === 'supabase') setIntegrationsOpen(false);
        if (type === 'evolution_api') setIntegrationsOpen(false);
        if (type === 'n8n') setWebhooksOpen(false);
      } else {
        throw new Error('Falha ao atualizar');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as credenciais. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-luxury relative overflow-hidden">
      <HeaderNavigation />
      
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background/98 to-muted/3" />
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-float" />
      <div className="fixed bottom-0 right-1/3 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <main className="relative z-10 container-luxury py-8 space-y-8 animate-fade-in" style={{ paddingTop: '6rem' }}>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-foreground tracking-tight gradient-text">
            Configurações
          </h1>
          <p className="text-xl text-muted-foreground/80">
            Gerencie suas preferências e configurações do sistema
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Perfil do Usuário */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Perfil do Usuário</span>
              </CardTitle>
              <CardDescription>Informações da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={user?.name || ''} placeholder="Seu nome" data-testid="input-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ''} placeholder="seu@email.com" data-testid="input-email" />
              </div>
              <div className="flex items-center space-x-4">
                <Label>Função:</Label>
                <Badge variant="secondary" data-testid="badge-role">
                  {user?.role === 'admin' ? 'Administrador' : 'Visualizador'}
                </Badge>
              </div>
              <Button className="w-full" data-testid="button-save-profile">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-secondary" />
                <span>Notificações</span>
              </CardTitle>
              <CardDescription>Configure como você quer receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email de novas conversas</Label>
                  <p className="text-sm text-muted-foreground">Receba emails quando houver novas conversas</p>
                </div>
                <Switch defaultChecked data-testid="switch-email-conversations" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de reuniões</Label>
                  <p className="text-sm text-muted-foreground">Lembrete 15 minutos antes das reuniões</p>
                </div>
                <Switch defaultChecked data-testid="switch-meeting-reminders" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Relatórios semanais</Label>
                  <p className="text-sm text-muted-foreground">Resumo semanal por email</p>
                </div>
                <Switch data-testid="switch-weekly-reports" />
              </div>
            </CardContent>
          </Card>

          {/* Informações da Empresa */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Informações da Empresa</span>
              </CardTitle>
              <CardDescription>Detalhes da sua organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input value={client?.name || ''} disabled data-testid="input-company-name" />
              </div>
              <div className="space-y-2">
                <Label>Email da Empresa</Label>
                <Input value={client?.email || ''} disabled data-testid="input-company-email" />
              </div>
              <div className="flex items-center space-x-4">
                <Label>Plano:</Label>
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white" data-testid="badge-plan">
                  {client?.plan_type?.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Avançadas */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-secondary" />
                <span>Configurações Avançadas</span>
              </CardTitle>
              <CardDescription>Configurações técnicas e de integração</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status das credenciais */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.google_calendar ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">Google Calendar</span>
                  {credentials?.google_calendar ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.google_meet ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">Google Meet</span>
                  {credentials?.google_meet ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.whatsapp ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">WhatsApp</span>
                  {credentials?.whatsapp ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.evolution_api ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">Evolution API</span>
                  {credentials?.evolution_api ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.supabase_configured ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">Supabase</span>
                  {credentials?.supabase_configured ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${credentials?.n8n_configured ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs">N8N</span>
                  {credentials?.n8n_configured ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Configurar Integrações Button */}
                <Dialog open={integrationsOpen} onOpenChange={setIntegrationsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start" data-testid="button-integrations">
                      <Database className="w-4 h-4 mr-2" />
                      Configurar Integrações
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Configurar Integrações</DialogTitle>
                      <DialogDescription>
                        Configure suas integrações com serviços externos
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Google Calendar Integration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Google Calendar</span>
                            {credentials?.google_calendar && <Badge variant="outline" className="text-green-600">Configurado</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="google-client-id">Client ID</Label>
                            <Input
                              id="google-client-id"
                              value={googleCalendarForm.client_id}
                              onChange={(e) => setGoogleCalendarForm({...googleCalendarForm, client_id: e.target.value})}
                              placeholder="Seu Google Client ID"
                              data-testid="input-google-client-id"
                            />
                          </div>
                          <div>
                            <Label htmlFor="google-client-secret">Client Secret</Label>
                            <Input
                              id="google-client-secret"
                              type="password"
                              value={googleCalendarForm.client_secret}
                              onChange={(e) => setGoogleCalendarForm({...googleCalendarForm, client_secret: e.target.value})}
                              placeholder="Seu Google Client Secret"
                              data-testid="input-google-client-secret"
                            />
                          </div>
                          <div>
                            <Label htmlFor="google-refresh-token">Refresh Token</Label>
                            <Input
                              id="google-refresh-token"
                              type="password"
                              value={googleCalendarForm.refresh_token}
                              onChange={(e) => setGoogleCalendarForm({...googleCalendarForm, refresh_token: e.target.value})}
                              placeholder="Seu Google Refresh Token"
                              data-testid="input-google-refresh-token"
                            />
                          </div>
                          <Button 
                            onClick={() => handleUpdateCredentials('google_calendar', googleCalendarForm)}
                            className="w-full"
                            data-testid="button-save-google"
                          >
                            Salvar Google Calendar
                          </Button>
                        </CardContent>
                      </Card>

                      {/* WhatsApp Integration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp</span>
                            {credentials?.whatsapp && <Badge variant="outline" className="text-green-600">Configurado</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="whatsapp-api-key">API Key</Label>
                            <Input
                              id="whatsapp-api-key"
                              type="password"
                              value={whatsappForm.api_key}
                              onChange={(e) => setWhatsappForm({...whatsappForm, api_key: e.target.value})}
                              placeholder="Sua WhatsApp API Key"
                              data-testid="input-whatsapp-api-key"
                            />
                          </div>
                          <div>
                            <Label htmlFor="whatsapp-phone">Número de Telefone</Label>
                            <Input
                              id="whatsapp-phone"
                              value={whatsappForm.phone_number}
                              onChange={(e) => setWhatsappForm({...whatsappForm, phone_number: e.target.value})}
                              placeholder="+55 11 99999-9999"
                              data-testid="input-whatsapp-phone"
                            />
                          </div>
                          <div>
                            <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                            <Input
                              id="whatsapp-webhook"
                              value={whatsappForm.webhook_url}
                              onChange={(e) => setWhatsappForm({...whatsappForm, webhook_url: e.target.value})}
                              placeholder="https://seu-dominio.com/webhook"
                              data-testid="input-whatsapp-webhook"
                            />
                          </div>
                          <Button 
                            onClick={() => handleUpdateCredentials('whatsapp', whatsappForm)}
                            className="w-full"
                            data-testid="button-save-whatsapp"
                          >
                            Salvar WhatsApp
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Supabase Integration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Database className="w-4 h-4" />
                            <span>Supabase</span>
                            {credentials?.supabase_configured && <Badge variant="outline" className="text-green-600">Configurado</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="supabase-url">Supabase URL</Label>
                            <Input
                              id="supabase-url"
                              value={supabaseForm.url}
                              onChange={(e) => setSupabaseForm({...supabaseForm, url: e.target.value})}
                              placeholder="https://sua-url.supabase.co"
                              data-testid="input-supabase-url"
                            />
                          </div>
                          <div>
                            <Label htmlFor="supabase-anon">Anon Key</Label>
                            <Input
                              id="supabase-anon"
                              type="password"
                              value={supabaseForm.anon_key}
                              onChange={(e) => setSupabaseForm({...supabaseForm, anon_key: e.target.value})}
                              placeholder="Sua Supabase Anon Key"
                              data-testid="input-supabase-anon"
                            />
                          </div>
                          <div>
                            <Label htmlFor="supabase-service">Service Role Key</Label>
                            <Input
                              id="supabase-service"
                              type="password"
                              value={supabaseForm.service_role_key}
                              onChange={(e) => setSupabaseForm({...supabaseForm, service_role_key: e.target.value})}
                              placeholder="Sua Service Role Key"
                              data-testid="input-supabase-service"
                            />
                          </div>
                          <Button 
                            onClick={() => handleUpdateCredentials('supabase', supabaseForm)}
                            className="w-full"
                            data-testid="button-save-supabase"
                          >
                            Salvar Supabase
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Evolution API Integration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <CloudCog className="w-4 h-4" />
                            <span>Evolution API</span>
                            {credentials?.evolution_api && <Badge variant="outline" className="text-green-600">Configurado</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="evolution-url">Base URL</Label>
                            <Input
                              id="evolution-url"
                              value={evolutionApiForm.base_url}
                              onChange={(e) => setEvolutionApiForm({...evolutionApiForm, base_url: e.target.value})}
                              placeholder="https://sua-evolution-api.com"
                              data-testid="input-evolution-url"
                            />
                          </div>
                          <div>
                            <Label htmlFor="evolution-api-key">API Key</Label>
                            <Input
                              id="evolution-api-key"
                              type="password"
                              value={evolutionApiForm.api_key}
                              onChange={(e) => setEvolutionApiForm({...evolutionApiForm, api_key: e.target.value})}
                              placeholder="Sua Evolution API Key"
                              data-testid="input-evolution-api-key"
                            />
                          </div>
                          <div>
                            <Label htmlFor="evolution-instance">Instance Name</Label>
                            <Input
                              id="evolution-instance"
                              value={evolutionApiForm.instance_name}
                              onChange={(e) => setEvolutionApiForm({...evolutionApiForm, instance_name: e.target.value})}
                              placeholder="nome-da-instancia"
                              data-testid="input-evolution-instance"
                            />
                          </div>
                          <Button 
                            onClick={() => handleUpdateCredentials('evolution_api', evolutionApiForm)}
                            className="w-full"
                            data-testid="button-save-evolution"
                          >
                            Salvar Evolution API
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Gerenciar Chaves API Button */}
                <Dialog open={apiKeysOpen} onOpenChange={setApiKeysOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start" data-testid="button-api-keys">
                      <Key className="w-4 h-4 mr-2" />
                      Gerenciar Chaves API
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Gerenciar Chaves API</DialogTitle>
                      <DialogDescription>
                        Visualize e gerencie suas chaves API e tokens de acesso
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Chaves Configuradas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Calendar className="w-4 h-4" />
                                <span>Google Calendar API</span>
                              </div>
                              <Badge variant={credentials?.google_calendar ? "default" : "secondary"}>
                                {credentials?.google_calendar ? 'Ativa' : 'Inativa'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp API</span>
                              </div>
                              <Badge variant={credentials?.whatsapp ? "default" : "secondary"}>
                                {credentials?.whatsapp ? 'Ativa' : 'Inativa'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Database className="w-4 h-4" />
                                <span>Supabase API</span>
                              </div>
                              <Badge variant={credentials?.supabase_configured ? "default" : "secondary"}>
                                {credentials?.supabase_configured ? 'Ativa' : 'Inativa'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <CloudCog className="w-4 h-4" />
                                <span>Evolution API</span>
                              </div>
                              <Badge variant={credentials?.evolution_api ? "default" : "secondary"}>
                                {credentials?.evolution_api ? 'Ativa' : 'Inativa'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground">
                              Para configurar ou atualizar chaves API, use o botão "Configurar Integrações" acima.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Configurar Webhooks Button */}
                <Dialog open={webhooksOpen} onOpenChange={setWebhooksOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start" data-testid="button-webhooks">
                      <Zap className="w-4 h-4 mr-2" />
                      Configurar Webhooks
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Configurar Webhooks</DialogTitle>
                      <DialogDescription>
                        Configure webhooks e automações com serviços externos
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* N8N Webhook Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Link2 className="w-4 h-4" />
                            <span>N8N Automação</span>
                            {credentials?.n8n_configured && <Badge variant="outline" className="text-green-600">Configurado</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="n8n-webhook">N8N Webhook URL</Label>
                            <Input
                              id="n8n-webhook"
                              value={n8nForm.webhook_url}
                              onChange={(e) => setN8nForm({...n8nForm, webhook_url: e.target.value})}
                              placeholder="https://sua-instancia.n8n.cloud/webhook/..."
                              data-testid="input-n8n-webhook"
                            />
                          </div>
                          <div>
                            <Label htmlFor="n8n-api-key">N8N API Key (opcional)</Label>
                            <Input
                              id="n8n-api-key"
                              type="password"
                              value={n8nForm.api_key}
                              onChange={(e) => setN8nForm({...n8nForm, api_key: e.target.value})}
                              placeholder="Sua N8N API Key"
                              data-testid="input-n8n-api-key"
                            />
                          </div>
                          <Button 
                            onClick={() => handleUpdateCredentials('n8n', n8nForm)}
                            className="w-full"
                            data-testid="button-save-n8n"
                          >
                            Salvar N8N
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Custom Webhooks */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Webhooks Personalizados</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="custom-webhook-name">Nome do Webhook</Label>
                            <Input
                              id="custom-webhook-name"
                              placeholder="Ex: Notificação Slack"
                              data-testid="input-custom-webhook-name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-webhook-url">URL do Webhook</Label>
                            <Input
                              id="custom-webhook-url"
                              placeholder="https://hooks.slack.com/services/..."
                              data-testid="input-custom-webhook-url"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-webhook-events">Eventos</Label>
                            <Textarea
                              id="custom-webhook-events"
                              placeholder="lista de eventos que disparam o webhook"
                              data-testid="textarea-custom-webhook-events"
                            />
                          </div>
                          <Button className="w-full" data-testid="button-save-custom-webhook">
                            Adicionar Webhook
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zona de Perigo */}
        <Card className="glass-card border-border/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Zona de Perigo</CardTitle>
            <CardDescription>Ações que podem afetar permanentemente sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div>
                <h4 className="font-medium text-red-800 dark:text-red-200">Alterar Senha</h4>
                <p className="text-sm text-red-600 dark:text-red-400">Altere sua senha de acesso ao sistema</p>
              </div>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" data-testid="button-change-password">
                Alterar Senha
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div>
                <h4 className="font-medium text-red-800 dark:text-red-200">Limpar Dados</h4>
                <p className="text-sm text-red-600 dark:text-red-400">Remove todas as conversas e dados armazenados</p>
              </div>
              <Button variant="destructive" data-testid="button-clear-data">
                Limpar Dados
              </Button>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
};

export default SettingsPage;