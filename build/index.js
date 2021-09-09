"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const health = require('@cloudnative/health-connect');
const config = require('config');
let healthcheck = new health.HealthChecker();
// if(!config.get('jwtPrivateKey')){
//     console.log('Fatal error: Private key for jwt is not set.');
//     process.exit(1);
// }
let server = null;
const PORT = process.env.PORT || 5000;
function initApplication() {
    mongoose_1.default.connect('mongodb://localhost:27017/testsol')
        .then(() => {
        console.log('Connected to database!');
    });
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(morgan_1.default("tiny"));
    app.use(express_1.default.static("public"));
    app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(routes_1.MainApi);
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        const status = err.statusCode || 500;
        res.locals.status = status;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(status);
        return res.json({
            error: {
                message: err.message
            }
        });
    });
    app.use('/health', health.LivenessEndpoint(healthcheck));
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    return app;
}
function start() {
    const app = initApplication();
    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`Server started on PORT:` + PORT);
    });
}
// Start the application
start();
