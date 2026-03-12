"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SIGN_KEY));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set default engine
app.set("view engine", "EJS");
app.set("views", path_1.default.join(__dirname, "../src/views"));
// Routes
app.use("/", page_routes_1.default);
app.use("/user", user_routes_1.default);
// fallback
app.use((req, res, next) => {
    res.status(404).send("Sorry, this is an invalid route");
});
// start server
const PORT = process.env.PORT;
if (!PORT) {
    throw new Error("Missing port!");
}
app.listen(PORT, () => {
    console.log(`Server is tunning on http://localhost:${PORT}`);
});
