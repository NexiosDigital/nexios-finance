export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					id: string;
					email: string;
					name: string | null;
					membership_level: string;
					settings: Json;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					email: string;
					name?: string | null;
					membership_level?: string;
					settings?: Json;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					name?: string | null;
					membership_level?: string;
					settings?: Json;
					created_at?: string;
					updated_at?: string;
				};
			};
			accounts: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					type: string;
					institution?: string | null;
					balance?: number;
					currency?: string;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					type?: string;
					institution?: string | null;
					balance?: number;
					currency?: string;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
			categories: {
				Row: {
					id: string;
					user_id: string | null;
					name: string;
					type: string;
					color: string;
					icon: string | null;
					parent_id: string | null;
					is_system: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id?: string | null;
					name: string;
					type: string;
					color?: string;
					icon?: string | null;
					parent_id?: string | null;
					is_system?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string | null;
					name?: string;
					type?: string;
					color?: string;
					icon?: string | null;
					parent_id?: string | null;
					is_system?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
			transactions: {
				Row: {
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
				};
				Insert: {
					id?: string;
					user_id: string;
					account_id?: string | null;
					date: string;
					amount: number;
					description?: string | null;
					category_id?: string | null;
					notes?: string | null;
					is_recurring?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					account_id?: string | null;
					date?: string;
					amount?: number;
					description?: string | null;
					category_id?: string | null;
					notes?: string | null;
					is_recurring?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
			budgets: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					amount: number;
					period: string;
					start_date: string;
					category_id?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					amount?: number;
					period?: string;
					start_date?: string;
					category_id?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			investments: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					type: string;
					amount?: number | null;
					initial_value?: number | null;
					current_value?: number | null;
					purchase_date?: string | null;
					institution?: string | null;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					type?: string;
					amount?: number | null;
					initial_value?: number | null;
					current_value?: number | null;
					purchase_date?: string | null;
					institution?: string | null;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			goals: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					target_amount: number;
					current_amount?: number;
					target_date?: string | null;
					category?: string | null;
					priority?: string;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					target_amount?: number;
					current_amount?: number;
					target_date?: string | null;
					category?: string | null;
					priority?: string;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			bills: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					amount: number;
					due_date: string;
					recurrence?: string | null;
					category_id?: string | null;
					is_paid?: boolean;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					amount?: number;
					due_date?: string;
					recurrence?: string | null;
					category_id?: string | null;
					is_paid?: boolean;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			ai_insights: {
				Row: {
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
				Insert: {
					id?: string;
					user_id: string;
					type: string;
					title: string;
					description: string;
					action_link?: string | null;
					is_read?: boolean;
					is_dismissed?: boolean;
					priority?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					type?: string;
					title?: string;
					description?: string;
					action_link?: string | null;
					is_read?: boolean;
					is_dismissed?: boolean;
					priority?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}

// Tipos para autenticação
export type UserData = {
	id: string;
	email: string;
	name: string | null;
	membership_level: string;
	settings: Json;
	created_at: string;
	updated_at: string;
};

export type User = UserData;
