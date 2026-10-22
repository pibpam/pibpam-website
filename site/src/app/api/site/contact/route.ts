import { contactSchema } from "@/lib/contact";
import { CONTACT_ENABLED } from "@/lib/site";

const API_URL = (process.env.API ?? "https://api.pibpam.org/").replace(/\/?$/, "/");

// Limite simples por IP (memória da instância): 5 envios a cada 10 minutos.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: object, status: number) => Response.json(body, { status });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return json({ error: "Envio inválido." }, 400);

  // Honeypot: campo invisível que só robôs preenchem. Fingimos sucesso.
  if ((body as Record<string, unknown>).website) return json({ ok: true }, 200);

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Confira os campos destacados.", fields: parsed.error.flatten().fieldErrors }, 422);
  }

  if (!CONTACT_ENABLED) return json({ error: "O envio pelo site ainda não está disponível.", fallback: true }, 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return json({ error: "Muitas mensagens em pouco tempo. Tente de novo em alguns minutos." }, 429);

  const { email, phone, ...rest } = parsed.data;
  try {
    const res = await fetch(new URL("v1/contact-messages", API_URL), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rest, email: email || undefined, phone: phone || undefined }),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    return json({ ok: true }, 201);
  } catch (error) {
    console.error("Falha ao enviar contato", error);
    return json({ error: "Não foi possível enviar agora.", fallback: true }, 502);
  }
}
