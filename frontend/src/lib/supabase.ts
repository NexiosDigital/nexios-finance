import { createClient } from "@supabase/supabase-js";
import { Database, UserData } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Faltam variáveis de ambiente do Supabase");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Tipos para autenticação
export type UserSession = {
	user: {
		id: string;
		email: string;
		user_metadata: {
			name?: string;
		};
	} | null;
	session: any | null;
};

// Exportando UserData para compatibilidade
export { UserData };
