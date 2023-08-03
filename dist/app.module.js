"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cats_module_1 = require("./cats2/cats.module");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const comments_module_1 = require("./comments/comments.module");
const aws_module_1 = require("./aws/aws.module");
const worktime_module_1 = require("./worktime/worktime.module");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_2 = require("mongoose");
let AppModule = exports.AppModule = class AppModule {
    constructor() {
        this.isDev = process.env.MODE === 'dev' ? true : false;
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('cats');
        mongoose_2.default.set('debug', this.isDev);
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'cjdruf0984~',
                database: 'company_group',
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            cats_module_1.CatsModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            aws_module_1.AWSModule,
            worktime_module_1.WorktimeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map