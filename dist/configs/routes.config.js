"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.use("/api", (req, res) => {
        return res.send(`<center><h1>Welcome to E4K back-end</h1></center>`);
    });
    app.use("*", (req, res) => {
        return res
            .status(404)
            .send(`<center><h1>ERROR 404: URL" ${req.originalUrl}" not found</h1></center>`);
    });
}
exports.default = default_1;
