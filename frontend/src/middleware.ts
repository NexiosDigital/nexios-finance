import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
	// Criar cliente do Supabase
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req: request, res });

	// Verificar se existe uma sessão
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// URLs que não exigem autenticação
	const publicUrls = ["/login", "/register", "/", "/auth/callback"];
	const isPublicUrl = publicUrls.some((url) =>
		request.nextUrl.pathname.startsWith(url)
	);

	// Se não está autenticado e tenta acessar uma URL protegida, redireciona para o login
	if (!session && !isPublicUrl) {
		const redirectUrl = new URL("/login", request.url);
		console.log(
			`Redirecionando ${
				request.url
			} para ${redirectUrl.toString()} - Usuário não autenticado`
		);
		return NextResponse.redirect(redirectUrl);
	}

	// Se está autenticado e tenta acessar login/registro, redireciona para o dashboard
	if (
		session &&
		(request.nextUrl.pathname === "/login" ||
			request.nextUrl.pathname === "/register")
	) {
		const redirectUrl = new URL("/dashboard", request.url);
		console.log(
			`Redirecionando ${
				request.url
			} para ${redirectUrl.toString()} - Usuário já autenticado`
		);
		return NextResponse.redirect(redirectUrl);
	}

	return res;
}

// Configurar em quais caminhos o middleware será executado
export const config = {
	matcher: [
		/*
		 * Corresponde a todas as rotas exceto:
		 * - Arquivos com extensão (e.g. arquivos, imagens)
		 * - Rotas de API
		 * - Rotas de _next
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
	],
};
