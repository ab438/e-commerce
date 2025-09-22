"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
    try {
        // جلب كوكي الـ session
        const cookieStore = await cookies();
        const sessionToken =
            cookieStore.get(`next-auth.session-token`)?.value ||
            cookieStore.get(`_Secure-next-auth.session-token`)?.value;

        if (!sessionToken) return null;

        // فك الـ JWT
        const jwtPayload = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET!,
        });

        console.log("JWT Payload:", jwtPayload);

        // ارجع التوكن الصحيح
        return jwtPayload?.accessToken || jwtPayload?.user?.token || null;
    } catch (err) {
        console.error("getMyToken error:", err);
        return null;
    }
}
