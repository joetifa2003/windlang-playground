import ax from "axios";

const axios = ax.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? process.env.API_ENDPOINT
            : "http://localhost:8080/",
});

export default axios;
