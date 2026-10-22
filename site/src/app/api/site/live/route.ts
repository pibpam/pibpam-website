import { connection } from "next/server";
import { getLives } from "@/lib/api";

export async function GET() {
  // Sempre no momento da requisição (nunca pré-renderizado no build).
  await connection();
  const lives = await getLives();
  return Response.json(lives, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30" },
  });
}
