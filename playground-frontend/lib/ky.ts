import ky from "ky";

const kyClient = ky.create({
    prefixUrl:
        process.env.NODE_ENV === "development"
            ? "http://localhost:8080/"
            : "https://windlang-playground-production.up.railway.app/",
});

export default kyClient;
