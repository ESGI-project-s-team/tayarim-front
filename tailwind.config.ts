import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'regal-blue': 'rgba(255, 255, 255, 0.8)',
            },
        }
    },
    plugins: [],
};
export default config;
