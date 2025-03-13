import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// Obter variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
	console.error("⚠️ Variáveis de ambiente Supabase não configuradas:", {
		url: supabaseUrl ? "definida" : "indefinida",
		key: supabaseAnonKey ? "definida" : "indefinida",
	});
	throw new Error("Variáveis de ambiente Supabase não definidas");
}

// Criar o cliente Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
});

// Log para confirmar inicialização
console.log("✅ Cliente Supabase inicializado com URL:", supabaseUrl);
