import { Plus_Jakarta_Sans } from 'next/font/google'

// Mesma fonte do site. O GlobalStyle publica `--font-jakarta` no :root, que é
// o que o Tailwind (`font-sans`) e o theme.fontFamily consomem.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
})
