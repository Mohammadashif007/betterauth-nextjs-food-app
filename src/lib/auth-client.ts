import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
});
