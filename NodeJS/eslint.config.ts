import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
     rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule
      "@typescript-eslint/no-unused-vars": [
      "error",
      { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // <--- Add this to define 'process'
      },
    },
  },
  {
    // Best practice: disable no-undef for TS files since TS handles this itself
    files: ["**/*.{ts,mts,cts,tsx}"],
    rules: {
      "no-undef": "off",
    },
  },
);
