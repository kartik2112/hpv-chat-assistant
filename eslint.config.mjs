import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// Turn off the rule that forbids explicit `any` in TypeScript files.
// This project intentionally allows `any` in a few spots (speech API interop, quick prototyping).
eslintConfig.push({
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
});

export default eslintConfig;
