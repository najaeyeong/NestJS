"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSModule = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
const config_1 = require("@nestjs/config");
const cats_controller_1 = require("../cats2/cats.controller");
const cats_module_1 = require("../cats2/cats.module");
const auth_module_1 = require("../auth/auth.module");
const comments_module_1 = require("../comments/comments.module");
let AWSModule = exports.AWSModule = class AWSModule {
};
exports.AWSModule = AWSModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            (0, common_1.forwardRef)(() => cats_module_1.CatsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => comments_module_1.CommentsModule),
        ],
        controllers: [cats_controller_1.CatsController],
        providers: [aws_service_1.AWSService],
        exports: [aws_service_1.AWSService],
    })
], AWSModule);
//# sourceMappingURL=aws.module.js.map