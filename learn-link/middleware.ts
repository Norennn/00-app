import { withAuth } from "next-auth/middleware";
import { AUTH_ROUTES } from "./routes";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { nextUrl } = req;
      const isLoggedIn = !!token;

      const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
      // 認証関係のルートの場合、全員許可
      if (isAuthRoute) {
        return true;
      }

      // 認証済みの場合、許可
      if (isLoggedIn) {
        return true;
      }

      return false;
    },
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
