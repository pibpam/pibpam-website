export const SITE_URL = (process.env.SITE_URL ?? "https://www.pibpam.org").replace(/\/$/, "");

export const SITE_NAME = "PIB Pará de Minas";
export const CHURCH_LEGAL_NAME = "Primeira Igreja Batista em Pará de Minas";
export const FOUNDED_YEAR = 1981;
export const SITE_DESCRIPTION =
  "Primeira Igreja Batista em Pará de Minas – MG. Cultos com exposição bíblica aos domingos e quartas, Escola Bíblica Dominical, transmissões ao vivo e agenda da igreja.";

export const NAV_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/ministerios", label: "Ministérios" },
  { href: "/conteudos", label: "Mensagens" },
  { href: "/agenda", label: "Agenda" },
  { href: "/ao-vivo", label: "Ao vivo" },
  { href: "/contato", label: "Contato" },
] as const;

/** Plataforma de inscrições em eventos da igreja. */
export const EVENTS_URL = "https://eventos.pibpam.org/";

export const APP_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam",
  ios: "https://apps.apple.com/br/app/pibpam/id6448954477",
};

/** Usado quando a API está fora do ar, para o rodapé e o JSON-LD não ficarem vazios. */
export const FALLBACK_CONTACT = {
  address: "Av. Presidente Vargas, 1840 - Providência, Pará de Minas - MG",
  phoneNumber: "37 3232-7250",
  email: "secretariapibpam@gmail.com",
};

export const CONTACT_ENABLED = process.env.CONTACT_ENABLED === "true";

/** Dados de contribuição via Pix (mesmos do material impresso da igreja). */
export const PIX = {
  keyLabel: "Telefone",
  key: "37 99979-4374",
  /** Formato aceito pelos apps de banco ao colar a chave de telefone. */
  keyValue: "+5537999794374",
  recipient: "Primeira Igreja Batista em Pará de Minas",
  /** Código Pix estático (BR Code), o mesmo do QR impresso. */
  copyPaste:
    "00020126360014br.gov.bcb.pix0114+55379997943745204000053039865802BR5925PRIMEIRA_IGREJA_BATISTA_E6013Para_de_Minas610935660-87662290525UZXW0100990817563838822676304930D",
};
