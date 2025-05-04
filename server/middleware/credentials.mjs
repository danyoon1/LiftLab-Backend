import whitelist from "../config/whitelist.mjs";

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (whitelist.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

export default credentials;