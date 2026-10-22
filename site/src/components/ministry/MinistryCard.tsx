import Image from "next/image";
import { UserRound, UsersRound } from "lucide-react";
import type { IMinistry } from "@/types";
import { joinNames, shortName } from "@/lib/format";

/** "Ministério de Louvor" → "ML", usado quando o ministério não tem logo. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

/**
 * Cartão do ministério: logo, nome, as duas descrições e quem lidera
 * (só quem tem função cadastrada, com primeiro e último nome).
 */
export function MinistryCard({ ministry }: { ministry: IMinistry }) {
  const leaders = ministry.people.filter((person) => person.role).map((person) => shortName(person.name));
  const LeaderIcon = leaders.length > 1 ? UsersRound : UserRound;
  const descriptions = [ministry.shortDescription, ministry.description].filter(
    (text, index, list): text is string => Boolean(text) && list.indexOf(text) === index,
  );

  return (
    <article className="flex h-full flex-col gap-6 rounded-lg border border-line bg-paper p-6 sm:flex-row md:p-8">
      <div className="relative size-28 shrink-0 overflow-hidden rounded-md bg-pine md:size-32">
        {ministry.image ? (
          <Image src={ministry.image} alt={`Logo do ${ministry.name}`} fill sizes="128px" className="object-cover" />
        ) : (
          <span aria-hidden className="flex size-full items-center justify-center text-3xl font-extrabold text-brand">
            {initials(ministry.name)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-2xl font-extrabold tracking-tight text-balance">{ministry.name}</h3>
        {descriptions.map((text, index) => (
          <p key={index} className={`mt-2 leading-relaxed ${index === 0 ? "text-lg text-ink" : "text-ink-muted"}`}>
            {text}
          </p>
        ))}
        {leaders.length > 0 && (
          <p className="mt-auto flex items-start gap-2 pt-5 font-semibold text-brand-strong">
            <LeaderIcon aria-hidden className="mt-0.5 size-5 shrink-0" />
            <span>
              <span className="sr-only">{leaders.length > 1 ? "Líderes: " : "Líder: "}</span>
              {joinNames(leaders)}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}
