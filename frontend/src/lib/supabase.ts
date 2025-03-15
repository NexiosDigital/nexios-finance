// Adicione esta importação no topo do arquivo
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Faltam variáveis de ambiente do Supabase");
}

// Defina o tipo UserData diretamente
export type UserData = {
	id: string;
	email: string;
	name: string | null;
	membership_level?: string;
	settings?: any;
	created_at?: string;
	updated_at?: string;
};

export type User = UserData;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
