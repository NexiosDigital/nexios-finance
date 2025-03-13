import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	// Rotas que não precisam de autenticação
	const publicRoutes = ["/", "/login", "/register"];
	const isPublicRoute = publicRoutes.some(
		(route) => req.nextUrl.pathname === route
	);

	// Rotas protegidas (que exigem autenticação)
	const protectedRoutes = ["/dashboard"];
	const isProtectedRoute = protectedRoutes.some(
		(route) =>
			req.nextUrl.pathname === route ||
			req.nextUrl.pathname.startsWith(`${route}/`)
	);

	// Se não tiver sessão e estiver tentando acessar uma rota protegida
	if (!session && isProtectedRoute) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// Se tiver sessão e estiver tentando acessar login/register
	if (
		session &&
		(req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return res;
}

// Configurar em quais caminhos o middleware deve ser executado
export const config = {
	matcher: [
		/*
		 * Match all routes except:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. Static files in public
		 */
		"/((?!api|_next|.*\\..*).+)",
	],
};
