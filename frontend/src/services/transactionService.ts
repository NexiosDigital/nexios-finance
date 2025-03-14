// src/services/transactionService.ts
import { supabase } from "@/lib/supabase-client";

export type Transaction = {
	id: string;
	user_id: string;
	account_id: string;
	date: string;
	amount: number;
	description: string;
	category_id: string;
	notes?: string;
	is_recurring: boolean;
	created_at: string;
	updated_at: string;
	category?: {
		id: string;
		name: string;
		type: string;
		color: string;
		icon?: string;
	};
	account?: {
		id: string;
		name: string;
		type: string;
	};
};

export type TransactionCreate = Omit<
	Transaction,
	"id" | "created_at" | "updated_at" | "category" | "account"
>;

export type TransactionUpdate = Partial<TransactionCreate>;

export type TransactionFilter = {
	startDate?: string;
	endDate?: string;
	categoryIds?: string[];
	accountIds?: string[];
	type?: "income" | "expense" | "all";
	search?: string;
};

export const transactionService = {
	/**
	 * Buscar todas as transações do usuário
	 */
	async getAll(
		userId: string,
		filters?: TransactionFilter
	): Promise<Transaction[]> {
		let query = supabase
			.from("transactions")
			.select(
				`
        *,
        category:categories(*),
        account:accounts(*)
      `
			)
			.eq("user_id", userId)
			.order("date", { ascending: false });

		// Aplicar filtros se fornecidos
		if (filters) {
			// Filtro por data
			if (filters.startDate) {
				query = query.gte("date", filters.startDate);
			}
			if (filters.endDate) {
				query = query.lte("date", filters.endDate);
			}

			// Filtro por tipo (receita/despesa)
			if (filters.type === "income") {
				query = query.gt("amount", 0);
			} else if (filters.type === "expense") {
				query = query.lt("amount", 0);
			}

			// Filtro por categoria
			if (filters.categoryIds && filters.categoryIds.length > 0) {
				query = query.in("category_id", filters.categoryIds);
			}

			// Filtro por conta
			if (filters.accountIds && filters.accountIds.length > 0) {
				query = query.in("account_id", filters.accountIds);
			}

			// Filtro por texto (busca na descrição)
			if (filters.search) {
				query = query.ilike("description", `%${filters.search}%`);
			}
		}

		const { data, error } = await query;

		if (error) {
			console.error("Erro ao buscar transações:", error);
			throw new Error(error.message);
		}

		return data as Transaction[];
	},

	/**
	 * Buscar uma transação pelo ID
	 */
	async getById(id: string, userId: string): Promise<Transaction> {
		const { data, error } = await supabase
			.from("transactions")
			.select(
				`
        *,
        category:categories(*),
        account:accounts(*)
      `
			)
			.eq("id", id)
			.eq("user_id", userId)
			.single();

		if (error) {
			console.error(`Erro ao buscar transação ${id}:`, error);
			throw new Error(error.message);
		}

		return data as Transaction;
	},

	/**
	 * Criar uma nova transação
	 */
	async create(transaction: TransactionCreate): Promise<Transaction> {
		const { data, error } = await supabase
			.from("transactions")
			.insert(transaction)
			.select()
			.single();

		if (error) {
			console.error("Erro ao criar transação:", error);
			throw new Error(error.message);
		}

		// Atualizar o saldo da conta
		try {
			await this.updateAccountBalance(
				transaction.account_id,
				transaction.amount
			);
		} catch (balanceError) {
			console.error("Erro ao atualizar saldo da conta:", balanceError);
			// Não lançamos erro aqui para evitar duplicar o erro
		}

		return data as Transaction;
	},

	/**
	 * Atualizar uma transação existente
	 */
	async update(
		id: string,
		userId: string,
		updates: TransactionUpdate
	): Promise<Transaction> {
		// Primeiro, buscar a transação atual para calcular diferença de valor
		const currentTransaction = await this.getById(id, userId);

		// Atualizar a transação
		const { data, error } = await supabase
			.from("transactions")
			.update(updates)
			.eq("id", id)
			.eq("user_id", userId)
			.select()
			.single();

		if (error) {
			console.error(`Erro ao atualizar transação ${id}:`, error);
			throw new Error(error.message);
		}

		// Se o valor mudou, atualizar o saldo da conta
		if (
			updates.amount !== undefined &&
			updates.amount !== currentTransaction.amount
		) {
			const amountDifference = updates.amount - currentTransaction.amount;
			const accountId = updates.account_id || currentTransaction.account_id;

			try {
				await this.updateAccountBalance(accountId, amountDifference);
			} catch (balanceError) {
				console.error("Erro ao atualizar saldo da conta:", balanceError);
			}
		}

		return data as Transaction;
	},

	/**
	 * Excluir uma transação
	 */
	async delete(id: string, userId: string): Promise<void> {
		// Primeiro, buscar a transação para obter o valor e conta
		const transaction = await this.getById(id, userId);

		// Excluir a transação
		const { error } = await supabase
			.from("transactions")
			.delete()
			.eq("id", id)
			.eq("user_id", userId);

		if (error) {
			console.error(`Erro ao excluir transação ${id}:`, error);
			throw new Error(error.message);
		}

		// Reverter o efeito da transação no saldo da conta
		try {
			await this.updateAccountBalance(
				transaction.account_id,
				-transaction.amount
			);
		} catch (balanceError) {
			console.error("Erro ao atualizar saldo da conta:", balanceError);
		}
	},

	/**
	 * Atualizar o saldo de uma conta após transação
	 */
	async updateAccountBalance(accountId: string, amount: number): Promise<void> {
		const { error } = await supabase.rpc("update_account_balance", {
			p_account_id: accountId,
			p_amount: amount,
		});

		if (error) {
			console.error("Erro ao atualizar saldo da conta:", error);
			throw new Error(error.message);
		}
	},

	/**
	 * Obter resumo financeiro do período (receitas, despesas, saldo)
	 */
	async getFinancialSummary(
		userId: string,
		startDate: string,
		endDate: string
	): Promise<{
		income: number;
		expense: number;
		balance: number;
	}> {
		const { data, error } = await supabase
			.from("transactions")
			.select("amount")
			.eq("user_id", userId)
			.gte("date", startDate)
			.lte("date", endDate);

		if (error) {
			console.error("Erro ao buscar resumo financeiro:", error);
			throw new Error(error.message);
		}

		const income = data
			.filter((t) => t.amount > 0)
			.reduce((sum, t) => sum + t.amount, 0);

		const expense = data
			.filter((t) => t.amount < 0)
			.reduce((sum, t) => sum + Math.abs(t.amount), 0);

		return {
			income,
			expense,
			balance: income - expense,
		};
	},
};
