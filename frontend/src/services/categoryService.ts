// src/services/categoryService.ts
import { supabase } from "@/lib/supabase-client";

export type Category = {
	id: string;
	user_id: string | null;
	name: string;
	type: "income" | "expense";
	color: string;
	icon?: string;
	parent_id?: string | null;
	is_system: boolean;
	created_at: string;
	updated_at: string;
};

export type CategoryCreate = Omit<Category, "id" | "created_at" | "updated_at">;
export type CategoryUpdate = Partial<
	Omit<Category, "id" | "user_id" | "is_system" | "created_at" | "updated_at">
>;

export const categoryService = {
	/**
	 * Buscar todas as categorias do usuário
	 */
	async getAll(userId: string): Promise<Category[]> {
		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.or(`user_id.eq.${userId},is_system.eq.true`)
			.order("name");

		if (error) {
			console.error("Erro ao buscar categorias:", error);
			throw new Error(error.message);
		}

		return data as Category[];
	},

	/**
	 * Buscar categorias por tipo (receita/despesa)
	 */
	async getByType(
		userId: string,
		type: "income" | "expense"
	): Promise<Category[]> {
		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.or(`user_id.eq.${userId},is_system.eq.true`)
			.eq("type", type)
			.order("name");

		if (error) {
			console.error(`Erro ao buscar categorias do tipo ${type}:`, error);
			throw new Error(error.message);
		}

		return data as Category[];
	},

	/**
	 * Buscar uma categoria pelo ID
	 */
	async getById(id: string): Promise<Category> {
		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			console.error(`Erro ao buscar categoria ${id}:`, error);
			throw new Error(error.message);
		}

		return data as Category;
	},

	/**
	 * Criar uma nova categoria personalizada
	 */
	async create(category: CategoryCreate): Promise<Category> {
		// Garantir que é uma categoria do usuário, não do sistema
		const newCategory = {
			...category,
			is_system: false,
		};

		const { data, error } = await supabase
			.from("categories")
			.insert(newCategory)
			.select()
			.single();

		if (error) {
			console.error("Erro ao criar categoria:", error);
			throw new Error(error.message);
		}

		return data as Category;
	},

	/**
	 * Atualizar uma categoria existente
	 * Obs: Apenas categorias personalizadas do usuário podem ser atualizadas
	 */
	async update(
		id: string,
		userId: string,
		updates: CategoryUpdate
	): Promise<Category> {
		// Primeiro verificar se é uma categoria do sistema ou do usuário
		const category = await this.getById(id);

		if (category.is_system) {
			throw new Error("Categorias do sistema não podem ser alteradas");
		}

		if (category.user_id !== userId) {
			throw new Error("Você não tem permissão para alterar esta categoria");
		}

		const { data, error } = await supabase
			.from("categories")
			.update(updates)
			.eq("id", id)
			.eq("user_id", userId)
			.select()
			.single();

		if (error) {
			console.error(`Erro ao atualizar categoria ${id}:`, error);
			throw new Error(error.message);
		}

		return data as Category;
	},

	/**
	 * Excluir uma categoria
	 * Obs: Apenas categorias personalizadas do usuário podem ser excluídas
	 */
	async delete(id: string, userId: string): Promise<void> {
		// Primeiro verificar se é uma categoria do sistema ou do usuário
		const category = await this.getById(id);

		if (category.is_system) {
			throw new Error("Categorias do sistema não podem ser excluídas");
		}

		if (category.user_id !== userId) {
			throw new Error("Você não tem permissão para excluir esta categoria");
		}

		const { error } = await supabase
			.from("categories")
			.delete()
			.eq("id", id)
			.eq("user_id", userId);

		if (error) {
			console.error(`Erro ao excluir categoria ${id}:`, error);
			throw new Error(error.message);
		}
	},

	/**
	 * Gerar cores aleatórias (tonalidades de verde) para novas categorias
	 */
	generateRandomColor(): string {
		// Gerar uma cor verde aleatória (tonalidades de verde do Nexios)
		const hue = 140 + Math.floor(Math.random() * 20); // Verde entre 140-160
		const saturation = 60 + Math.floor(Math.random() * 40); // Saturação entre 60-100%
		const lightness = 30 + Math.floor(Math.random() * 20); // Claridade entre 30-50%

		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	},
};
