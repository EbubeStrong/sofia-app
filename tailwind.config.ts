import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sofia_dark: "#212121",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        libre_franklin: ["var(--font-libre-franklin)"],
      },
    },
  },
  plugins: [],
};
export default config;
