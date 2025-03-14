// src/lib/supabase-enhanced.ts
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
// Re-export UserData and UserSession types
import { UserData, UserSession } from "./supabase";

// Verificar se estamos no cliente ou no servidor
const isBrowser = typeof window !== "undefined";

// Obter variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
	console.error("⚠️ Variáveis de ambiente Supabase não configuradas:");
	throw new Error("Variáveis de ambiente Supabase não definidas");
}

// Implementação de armazenamento segura para SSR
const safeStorage = {
	getItem: (key: string): string | null => {
		if (isBrowser) {
			const value = localStorage.getItem(key);
			console.log(
				`🔑 Lendo ${key} do localStorage:`,
				value ? "Valor encontrado" : "Sem valor"
			);
			return value;
		}
		return null;
	},
	setItem: (key: string, value: string): void => {
		if (isBrowser) {
			console.log(`💾 Salvando ${key} no localStorage`);
			localStorage.setItem(key, value);
		}
	},
	removeItem: (key: string): void => {
		if (isBrowser) {
			console.log(`🗑️ Removendo ${key} do localStorage`);
			localStorage.removeItem(key);
		}
	},
};

// Criar o cliente Supabase com opções específicas para melhorar a persistência de sessão
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true,
		flowType: "implicit", // Usar fluxo implícito para evitar problemas com cookies
		storage: safeStorage,
	},
	global: {
		headers: {
			"X-Client-Info": "nexios-finance",
		},
	},
});

// Adicionalmente, tenta restaurar a sessão do localStorage
export const initializeAuth = async () => {
	if (!isBrowser) return; // Só execute no cliente

	try {
		const token = localStorage.getItem("supabase.auth.token");
		if (token) {
			console.log("🔄 Tentando restaurar sessão do token armazenado...");
			await supabase.auth.setSession({
				access_token: token,
				refresh_token: "",
			});
		}
	} catch (error) {
		console.error("❌ Erro ao inicializar autenticação:", error);
	}
};

// Log para confirmar inicialização
console.log("✅ Cliente Supabase aprimorado inicializado");

// Re-export tipos para compatibilidade
export { UserData, UserSession };
