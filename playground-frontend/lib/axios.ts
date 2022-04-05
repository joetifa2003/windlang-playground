import ax from "axios";

const axios = ax.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:8080/"
            : "https://windlang-playground-production.up.railway.app/",
});

export default axios;
