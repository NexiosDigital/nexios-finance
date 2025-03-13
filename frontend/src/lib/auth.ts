// src/lib/auth.ts
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User } from "./supabase";

// Definindo o tipo AuthContextType
type AuthContextType = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signIn: (
		email: string,
		password: string
	) => Promise<{
		error: Error | null;
		data: Session | null;
	}>;
	signUp: (
		email: string,
		password: string,
		name: string
	) => Promise<{
		error: Error | null;
		data: Session | null;
	}>;
	signOut: () => Promise<void>;
	resetPassword: (email: string) => Promise<{
		error: Error | null;
		data: any;
	}>;
};

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar o contexto de autenticação
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
}

// Componente Provider para autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	// Efeito para monitorar mudanças de autenticação
	useEffect(() => {
		// Obter sessão inicial
		const getInitialSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setLoading(false);

			if (session?.user?.id) {
				try {
					// Buscar perfil do usuário
					const userData = await supabase
						.from("users")
						.select("*")
						.eq("id", session.user.id)
						.single();

					if (userData.data) {
						setUser(userData.data as User);
					}
				} catch (error) {
					console.error("Erro ao buscar dados do usuário:", error);
				}
			}
		};

		getInitialSession();

		// Configurar listener para mudanças de autenticação
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event: AuthChangeEvent, session) => {
				setSession(session);

				if (event === "SIGNED_IN" && session?.user?.id) {
					try {
						// Buscar perfil do usuário ao fazer login
						const userData = await supabase
							.from("users")
							.select("*")
							.eq("id", session.user.id)
							.single();

						if (userData.data) {
							setUser(userData.data as User);
						}
					} catch (error) {
						console.error("Erro ao buscar dados do usuário:", error);
					}
				} else if (event === "SIGNED_OUT") {
					setUser(null);
				}
			}
		);

		// Limpar listener ao desmontar
		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	// Função de login
	const signIn = async (email: string, password: string) => {
		try {
			const result = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			return { error: null, data: result.data.session };
		} catch (error: any) {
			return { error, data: null };
		}
	};

	// Função de cadastro
	const signUp = async (email: string, password: string, name: string) => {
		try {
			const result = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { name },
				},
			});

			// Se o cadastro for bem-sucedido e o usuário for criado
			if (result.data.user) {
				// Criar o perfil do usuário
				await supabase.from("users").insert([
					{
						id: result.data.user.id,
						email,
						name,
					},
				]);
			}

			return { error: null, data: result.data.session };
		} catch (error: any) {
			return { error, data: null };
		}
	};

	// Função de logout
	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
	};

	// Função de redefinição de senha
	const resetPassword = async (email: string) => {
		try {
			const result = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			});
			return { error: null, data: result.data };
		} catch (error: any) {
			return { error, data: null };
		}
	};

	// Valor do contexto
	const value = {
		user,
		session,
		loading,
		signIn,
		signUp,
		signOut,
		resetPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
