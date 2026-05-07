import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Next 16 / React 19 added several aggressive rules. The ones below
      // flag patterns that are still idiomatic in our codebase. Disabled
      // intentionally with a one-line note for each.

      // Canonical "mounted flag" pattern (useState + useEffect) is still
      // the simplest correct way to defer client-only render after hydration.
      "react-hooks/set-state-in-effect": "off",

      // Apostrophes and quotes inside JSX text are valid HTML; React
      // escapes them correctly. This rule catches roughly nothing real
      // and adds friction.
      "react/no-unescaped-entities": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
