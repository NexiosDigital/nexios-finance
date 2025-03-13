import { createClient } from "@supabase/supabase-js";

// Estas variáveis de ambiente precisam ser configuradas no .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Verificação básica para garantir que as variáveis de ambiente foram configuradas
if (!supabaseUrl || !supabaseAnonKey) {
	console.error("Supabase URL e Anon Key devem ser configurados no .env.local");
}

// Criação do cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as entidades do banco de dados
export type User = {
	id: string;
	email: string;
	name: string | null;
	membership_level: string;
	settings: Record<string, any>;
	created_at: string;
	updated_at: string;
};

export type Account = {
	id: string;
	user_id: string;
	name: string;
	type: string;
	institution: string | null;
	balance: number;
	currency: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type Category = {
	id: string;
	user_id: string | null;
	name: string;
	type: "income" | "expense";
	color: string;
	icon: string | null;
	parent_id: string | null;
	is_system: boolean;
	created_at: string;
	updated_at: string;
};

export type Transaction = {
	id: string;
	user_id: string;
	account_id: string | null;
	date: string;
	amount: number;
	description: string | null;
	category_id: string | null;
	notes: string | null;
	is_recurring: boolean;
	created_at: string;
	updated_at: string;
	categories?: Category;
	accounts?: Account;
};

export type Budget = {
	id: string;
	user_id: string;
	name: string;
	amount: number;
	period: string;
	start_date: string;
	category_id: string | null;
	created_at: string;
	updated_at: string;
};

export type Investment = {
	id: string;
	user_id: string;
	name: string;
	type: string;
	amount: number | null;
	initial_value: number | null;
	current_value: number | null;
	purchase_date: string | null;
	institution: string | null;
	notes: string | null;
	created_at: string;
	updated_at: string;
};

export type Goal = {
	id: string;
	user_id: string;
	name: string;
	target_amount: number;
	current_amount: number;
	target_date: string | null;
	category: string | null;
	priority: string;
	notes: string | null;
	created_at: string;
	updated_at: string;
};

export type Bill = {
	id: string;
	user_id: string;
	name: string;
	amount: number;
	due_date: string;
	recurrence: string | null;
	category_id: string | null;
	is_paid: boolean;
	notes: string | null;
	created_at: string;
	updated_at: string;
};

export type AIInsight = {
	id: string;
	user_id: string;
	type: string;
	title: string;
	description: string;
	action_link: string | null;
	is_read: boolean;
	is_dismissed: boolean;
	priority: string;
	created_at: string;
	updated_at: string;
};

// Funções de acesso aos dados
export async function getUserProfile(userId: string) {
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) {
		console.error("Erro ao buscar perfil do usuário:", error);
		throw error;
	}

	return data as User;
}

export async function getUserAccounts(userId: string) {
	const { data, error } = await supabase
		.from("accounts")
		.select("*")
		.eq("user_id", userId)
		.order("name");

	if (error) {
		console.error("Erro ao buscar contas do usuário:", error);
		throw error;
	}

	return data as Account[];
}

export async function getUserTransactions(
	userId: string,
	filters?: Record<string, any>,
	options?: {
		limit?: number;
		offset?: number;
		sortBy?: string;
		sortOrder?: "asc" | "desc";
	}
) {
	let query = supabase
		.from("transactions")
		.select(
			`
      *,
      categories:category_id (*),
      accounts:account_id (*)
    `
		)
		.eq("user_id", userId);

	// Aplicar filtros
	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				if (key === "dateFrom") {
					query = query.gte("date", value);
				} else if (key === "dateTo") {
					query = query.lte("date", value);
				} else if (key === "amountMin") {
					query = query.gte("amount", value);
				} else if (key === "amountMax") {
					query = query.lte("amount", value);
				} else if (key === "description") {
					query = query.ilike("description", `%${value}%`);
				} else {
					query = query.eq(key, value);
				}
			}
		});
	}

	// Aplicar ordenação
	if (options?.sortBy) {
		query = query.order(options.sortBy, {
			ascending: options.sortOrder === "asc",
		});
	} else {
		query = query.order("date", { ascending: false });
	}

	// Aplicar paginação
	if (options?.limit) {
		query = query.limit(options.limit);
	}

	if (options?.offset) {
		query = query.range(
			options.offset,
			options.offset + (options.limit || 10) - 1
		);
	}

	const { data, error } = await query;

	if (error) {
		console.error("Erro ao buscar transações do usuário:", error);
		throw error;
	}

	return data as Transaction[];
}

export async function getUserCategories(userId: string) {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.eq("user_id", userId)
		.order("name");

	if (error) {
		console.error("Erro ao buscar categorias do usuário:", error);
		throw error;
	}

	return data as Category[];
}

export async function getUserBudgets(userId: string) {
	const { data, error } = await supabase
		.from("budgets")
		.select(
			`
      *,
      categories:category_id (*)
    `
		)
		.eq("user_id", userId);

	if (error) {
		console.error("Erro ao buscar orçamentos do usuário:", error);
		throw error;
	}

	return data;
}

export async function getUserInvestments(userId: string) {
	const { data, error } = await supabase
		.from("investments")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		console.error("Erro ao buscar investimentos do usuário:", error);
		throw error;
	}

	return data as Investment[];
}

export async function getUserGoals(userId: string) {
	const { data, error } = await supabase
		.from("goals")
		.select("*")
		.eq("user_id", userId);

	if (error) {
		console.error("Erro ao buscar metas do usuário:", error);
		throw error;
	}

	return data as Goal[];
}

export async function getUserBills(userId: string) {
	const { data, error } = await supabase
		.from("bills")
		.select(
			`
      *,
      categories:category_id (*)
    `
		)
		.eq("user_id", userId);

	if (error) {
		console.error("Erro ao buscar contas a pagar do usuário:", error);
		throw error;
	}

	return data;
}

export async function getUserInsights(userId: string) {
	const { data, error } = await supabase
		.from("ai_insights")
		.select("*")
		.eq("user_id", userId)
		.eq("is_dismissed", false)
		.order("priority", { ascending: false })
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Erro ao buscar insights do usuário:", error);
		throw error;
	}

	return data as AIInsight[];
}
