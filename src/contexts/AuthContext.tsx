import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'viewer';
}

interface Client {
  id: string;
  name: string;
  email: string;
  plan_type: 'starter' | 'pro' | 'enterprise';
}

interface ClientCredentials {
  google_calendar: boolean;
  google_meet: boolean;
  whatsapp: boolean;
  evolution_api: boolean;
  supabase_configured: boolean;
  n8n_configured: boolean;
}

interface AuthContextType {
  user: User | null;
  client: Client | null;
  credentials: ClientCredentials | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateCredentials: (type: string, credentials: any) => Promise<boolean>;
  refreshCredentialFlags: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [credentials, setCredentials] = useState<ClientCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!client;

  // Verificar se já existe uma sessão ativa ao carregar
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    const savedClient = localStorage.getItem('client_data');
    const savedCredentials = localStorage.getItem('client_credentials');
    
    if (token && savedUser && savedClient) {
      try {
        setUser(JSON.parse(savedUser));
        setClient(JSON.parse(savedClient));
        if (savedCredentials) {
          setCredentials(JSON.parse(savedCredentials));
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (response.success) {
        // Salvar token
        localStorage.setItem('auth_token', response.token);
        
        // Salvar dados do usuário
        setUser(response.user);
        localStorage.setItem('user_data', JSON.stringify(response.user));
        
        // Salvar dados do cliente
        setClient(response.client);
        localStorage.setItem('client_data', JSON.stringify(response.client));
        
        // Salvar flags de credenciais
        setCredentials(response.credentials);
        localStorage.setItem('client_credentials', JSON.stringify(response.credentials));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateCredentials = async (type: string, newCredentials: any): Promise<boolean> => {
    try {
      await apiRequest(`/credentials/${type}`, {
        method: 'PUT',
        body: JSON.stringify(newCredentials)
      });
      
      // Refresh credential flags after successful update
      await refreshCredentialFlags();
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar credenciais:', error);
      return false;
    }
  };

  const refreshCredentialFlags = async () => {
    try {
      const credentialFlags = await apiRequest('/credentials');
      setCredentials(credentialFlags);
      localStorage.setItem('client_credentials', JSON.stringify(credentialFlags));
    } catch (error) {
      console.error('Erro ao buscar flags de credenciais:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setClient(null);
    setCredentials(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('client_data');
    localStorage.removeItem('client_credentials');
  };

  const value: AuthContextType = {
    user,
    client,
    credentials,
    isAuthenticated,
    login,
    logout,
    isLoading,
    updateCredentials,
    refreshCredentialFlags,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};