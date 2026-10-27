import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "react/no-unescaped-entities": "off",
      // Regras do React Compiler (react-hooks 7) que o eslint-config-next 16
      // liga como erro. O app não usa o compilador; ficam como aviso até
      // alguém revisar os hooks apontados.
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts",
    // Projeto separado, com config própria.
    "site/**",
  ]),
]);

export default eslintConfig;
