import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    },
    plugins: [],
};
export default config;
