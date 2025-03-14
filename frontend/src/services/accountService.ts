// src/services/accountService.ts
import { supabase } from "@/lib/supabase-client";

export type Account = {
	id: string;
	user_id: string;
	name: string;
	type: string;
	institution?: string;
	balance: number;
	currency: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type AccountCreate = Omit<Account, "id" | "created_at" | "updated_at">;
export type AccountUpdate = Partial<
	Omit<Account, "id" | "user_id" | "created_at" | "updated_at">
>;

export const accountService = {
	/**
	 * Buscar todas as contas do usuário
	 */
	async getAll(
		userId: string,
		includeInactive: boolean = false
	): Promise<Account[]> {
		let query = supabase
			.from("accounts")
			.select("*")
			.eq("user_id", userId)
			.order("name");

		if (!includeInactive) {
			query = query.eq("is_active", true);
		}

		const { data, error } = await query;

		if (error) {
			console.error("Erro ao buscar contas:", error);
			throw new Error(error.message);
		}

		return data as Account[];
	},

	/**
	 * Buscar uma conta pelo ID
	 */
	async getById(id: string, userId: string): Promise<Account> {
		const { data, error } = await supabase
			.from("accounts")
			.select("*")
			.eq("id", id)
			.eq("user_id", userId)
			.single();

		if (error) {
			console.error(`Erro ao buscar conta ${id}:`, error);
			throw new Error(error.message);
		}

		return data as Account;
	},

	/**
	 * Criar uma nova conta
	 */
	async create(account: AccountCreate): Promise<Account> {
		const { data, error } = await supabase
			.from("accounts")
			.insert(account)
			.select()
			.single();

		if (error) {
			console.error("Erro ao criar conta:", error);
			throw new Error(error.message);
		}

		return data as Account;
	},

	/**
	 * Atualizar uma conta existente
	 */
	async update(
		id: string,
		userId: string,
		updates: AccountUpdate
	): Promise<Account> {
		const { data, error } = await supabase
			.from("accounts")
			.update(updates)
			.eq("id", id)
			.eq("user_id", userId)
			.select()
			.single();

		if (error) {
			console.error(`Erro ao atualizar conta ${id}:`, error);
			throw new Error(error.message);
		}

		return data as Account;
	},

	/**
	 * "Excluir" uma conta (marcar como inativa)
	 * Obs: Não excluímos fisicamente para preservar histórico de transações
	 */
	async delete(id: string, userId: string): Promise<void> {
		const { error } = await supabase
			.from("accounts")
			.update({ is_active: false })
			.eq("id", id)
			.eq("user_id", userId);

		if (error) {
			console.error(`Erro ao desativar conta ${id}:`, error);
			throw new Error(error.message);
		}
	},

	/**
	 * Obter saldo total de todas as contas
	 */
	async getTotalBalance(userId: string): Promise<number> {
		const { data, error } = await supabase
			.from("accounts")
			.select("balance")
			.eq("user_id", userId)
			.eq("is_active", true);

		if (error) {
			console.error("Erro ao buscar saldo total:", error);
			throw new Error(error.message);
		}

		return data.reduce((total, account) => total + account.balance, 0);
	},

	/**
	 * Obter a distribuição de saldo por tipo de conta
	 */
	async getBalanceByAccountType(userId: string): Promise<
		{
			type: string;
			balance: number;
			percentage: number;
		}[]
	> {
		const { data, error } = await supabase
			.from("accounts")
			.select("type, balance")
			.eq("user_id", userId)
			.eq("is_active", true);

		if (error) {
			console.error("Erro ao buscar distribuição de saldo:", error);
			throw new Error(error.message);
		}

		// Agrupar saldo por tipo de conta
		const balanceByType = data.reduce((acc, account) => {
			const { type, balance } = account;
			if (!acc[type]) {
				acc[type] = 0;
			}
			acc[type] += balance;
			return acc;
		}, {} as Record<string, number>);

		// Calcular saldo total para percentuais
		const totalBalance = Object.values(balanceByType).reduce(
			(sum, balance) => sum + balance,
			0
		);

		// Formatar resultado
		return Object.entries(balanceByType).map(([type, balance]) => ({
			type,
			balance,
			percentage: totalBalance ? (balance / totalBalance) * 100 : 0,
		}));
	},
};
