module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
            fontFamily: {
                mono: ["Fira Code", "monospace"],
            },
        },
    },
    daisyui: {
        themes: ["night"],
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
