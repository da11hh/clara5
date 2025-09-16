import { createClient } from '@supabase/supabase-js';

// In Replit, environment variables are injected at runtime
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for dashboard_completov5 table
export interface DashboardCompleteV5 {
  idx: number;
  telefone: string;
  nome_completo: string;
  email_principal: string;
  status_atendimento: string;
  setor_atual: string | null;
  ativo: boolean | null;
  tipo_reuniao_atual: string | null;
  primeiro_contato: string;
  ultimo_contato: string;
  total_registros: number;
  registros_dados_cliente: number;
  total_mensagens_chat: number;
  total_transcricoes: number;
  fontes_dados: number;
  tem_dados_cliente: boolean;
  tem_historico_chat: boolean;
  tem_transcricoes: boolean;
  ultima_atividade: string;
  id_reuniao_atual: string | null;
  ultima_transcricao: string;
  mensagens_cliente: string;
  mensagens_agente: string;
}