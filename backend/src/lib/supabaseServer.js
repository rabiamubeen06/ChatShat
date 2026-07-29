import { createServerClient } from "@supabase/ssr";

export function createClient(req, res) {
    return createServerClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PUBLISHABLE_KEY, {
            cookies: {
                getAll() {
                    return Object.keys(req.cookies).map((name) => ({
                        name,
                        value: req.cookies[name],
                    }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        res.cookie(name, value, options);
                    });
                },
            },
        }
    );
}