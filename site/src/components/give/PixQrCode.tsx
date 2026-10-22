import QRCode from "qrcode";

/** QR Code do Pix gerado no servidor como SVG (nítido em qualquer tamanho). */
export async function PixQrCode({ payload, className = "" }: { payload: string; className?: string }) {
  const svg = await QRCode.toString(payload, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    // Fundo transparente e módulos em currentColor: a cor vem do tema (text-pine).
    color: { dark: "#000000", light: "#0000" },
  }).then((markup) => markup.replace('stroke="#000000"', 'stroke="currentColor"'));

  return (
    <div
      role="img"
      aria-label="QR Code do Pix da Primeira Igreja Batista em Pará de Minas"
      className={`text-pine [&>svg]:size-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
