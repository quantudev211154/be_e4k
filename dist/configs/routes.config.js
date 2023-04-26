"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../routes");
function default_1(app) {
    app.use("/api", routes_1.AuthRouter);
    app.use("/api/course", routes_1.CourseRouter);
    app.use("/api/diary", routes_1.DiaryRouter);
    app.use("/api/user", routes_1.UserRouter);
    app.use("/api/word", routes_1.WordRouter);
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
