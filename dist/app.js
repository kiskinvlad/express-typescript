"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
var method_override_1 = __importDefault(require("method-override"));
var q_1 = __importDefault(require("q"));
var mongoose_1 = __importDefault(require("mongoose")); //import mongoose
var config_1 = require("./config");
var routes_1 = require("./routes");
var config_2 = require("./config");
var user_mongo_1 = require("./schemas/mongo/user.mongo");
var App = /** @class */ (function () {
    function App() {
        this.model = Object();
        global.Promise = q_1.default.Promise;
        this.express = express_1.default();
        this.setupConfigurations();
        this.mountAPIRoutes();
        this.handleErrors();
        this.setupMongo();
    }
    App.prototype.setupConfigurations = function () {
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(method_override_1.default());
        this.express.set('view options', { layout: false });
        this.express.use(express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
        this.express.use('/', express_1.default.static(path_1.default.join(__dirname, process.env.NODE_ENV === 'production' ? 'dist/static' : '/static')));
    };
    App.prototype.setupMongo = function () {
        mongoose_1.default.Promise = global.Promise;
        var MONGODB_CONNECTION = "mongodb://localhost:27017/mongoDB";
        var connection = mongoose_1.default.createConnection(MONGODB_CONNECTION, { useNewUrlParser: true });
        this.model.user = connection.model("User", user_mongo_1.userMongoSchema);
    };
    App.prototype.setupPostgress = function () {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new config_2.SequelizeConfig().sync({ force: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.mountAPIRoutes = function () {
        this.express.use('/api', routes_1.api);
    };
    App.prototype.handleErrors = function () {
        this.express.use(config_1.ErrorHandler.logErrors);
        this.express.use(config_1.ErrorHandler.clientErrorHandler);
        this.express.use(config_1.ErrorHandler.errorHandler);
    };
    return App;
}());
exports.default = new App().express;
