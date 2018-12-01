"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convict = require("convict");
class EnvSetup {
    constructor() {
        this.config = this.createConfiguration();
        this.setConfiguration();
    }
    createConfiguration() {
        return convict({
            env: {
                doc: "The application environment.",
                format: ["production", "development", "staggin"],
                default: "development",
                env: "NODE_ENV"
            },
            db: {
                host: {
                    doc: "Database host name/IP",
                    format: '*',
                    default: 'server1.dev.test'
                },
                name: {
                    doc: "Database name",
                    format: String,
                    default: 'db'
                }
            }
        });
    }
    setConfiguration() {
        const env = this.config.get('env');
        this.config.loadFile(`./config/${env}.json`);
        this.config.validate({ allowed: 'strict' });
    }
}
exports.default = new EnvSetup().config;
