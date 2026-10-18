/** Mapa do Google sem chave de API, carregado só quando chega perto da tela. */
export function MapEmbed({ address, className = "" }: { address: string; className?: string }) {
  return (
    <iframe
      title={`Mapa: ${address}`}
      src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`size-full min-h-72 rounded-lg border-0 bg-brand-soft ${className}`}
    />
  );
}
