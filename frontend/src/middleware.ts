import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	// Nesta versão simplificada, vamos apenas deixar passar todas as solicitações
	// para evitar problemas com SSR e cookies
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
