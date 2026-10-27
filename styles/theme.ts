const theme = {
  colors: {
    primary: '#5FD9DA',
    secondary: '#B5DA35',

    white: '#FFFFFF',
    black: '#000000',
    gray900: '#1D1D1D',
    gray800: '#2F2A2A',
    gray750: '#383838',
    gray700: '#3D3D3D',
    gray650: '#5E5B5B',
    gray600: '#494949',
    gray550: '#8A9A9A',
    gray400: '#8E8E8E',
    gray350: '#B3C0C0',
    gray225: '#DDDDDD',
    gray200: '#C8C8C8',
    gray100: '#F2F2F2',
    gray50: '#F4F6F8',
    disabled: '#C2CAD2',

    tealDark: '#2F6F70',
    tealMedium: '#53C4C4',
    tealLight: '#A9E7E8',
    tealTint: '#EEF4F4',
    tealTintLight: '#F4FBFB',
    tealBorder: '#E2EEEE',
    tealBorderSoft: '#D7ECEC',
    tealBorderCard: '#E8F3F3',
    tealHover: '#E8FAFA',

    limeTint: '#EEF8D9',
    success: '#6E8F0A',
    successText: '#5C7A0A',
    successTint: '#EAF6D8',

    successAlertText: '#1E6B1E',
    successAlertBorder: '#B8E6B8',
    successAlertTint: '#F0FAF0',

    error: '#C64545',
    errorStrong: '#FF0000',
    errorText: '#A62F2F',
    errorBorder: '#FFD6D6',
    errorBorderStrong: '#F1B4B4',
    errorTint: '#FFF4F4',
    errorTintStrong: '#FDE8E8',

    warningTint: '#FFF4E0',
    warningText: '#A5641E',
    warningBorder: '#F5D9AC',

    // Superfícies escuras e texto sobre elas (mesmos valores do site: pine/ink-inverse).
    pine: '#12302F',
    pineSoft: '#1B4241',
    inkInverse: '#F4FBFB',
    inkInverseMuted: '#A9C9C8',
    lineInverse: '#2B5150',
  },
  // `--font-jakarta` é definido no :root pelo GlobalStyle (next/font).
  fontFamily: 'var(--font-jakarta), ui-sans-serif, system-ui, sans-serif',
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '14px',
    xxl: '16px',
    xxxl: '24px',
    dialog: '20px',
    pill: '41.5px',
    circle: '50%',
  },
  shadows: {
    // Cartão claro em repouso (atalhos, próximo evento).
    card: '0 2px 10px rgba(47, 111, 112, 0.08)',
    // Cartão colorido em destaque (mídia, leitura).
    raised: '0 6px 18px rgba(47, 111, 112, 0.25)',
    // Cartão lima em destaque (próximo evento, aniversariantes).
    raisedLime: '0 6px 18px rgba(110, 143, 10, 0.3)',
    // Sombra suave sob texto branco em degradê claro (ajuda a legibilidade).
    onGradientText: '0 1px 2px rgba(0, 0, 0, 0.25)',
    // Barra de navegação flutuante.
    floating: '0 8px 24px rgba(47, 111, 112, 0.22)',
  },
  gradients: {
    // Card de aniversariante (Home e tela de aniversariantes): degradê claro, texto branco.
    birthday: 'linear-gradient(120deg, #6E8F0A 0%, #B5DA35 55%, #53C4C4 100%)',
    // Fundo das telas de destaque (Home): teal bem claro <-> lima bem claro. Pensado para
    // ser animado (background-size 100% 300% + deslocamento vertical).
    screen: 'linear-gradient(180deg, #E8FAFA 0%, #F4FBFB 25%, #EEF8D9 50%, #F4FBFB 75%, #E8FAFA 100%)',
    // Escurece a base de uma imagem para dar contraste a texto sobreposto.
    imageOverlay: 'linear-gradient(180deg, rgba(8, 12, 35, 0) 0%, rgba(8, 12, 35, 0.2) 45%, rgba(8, 12, 35, 0.8) 100%)',
  },
}

export default theme