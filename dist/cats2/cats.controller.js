"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsController = void 0;
const common_1 = require("@nestjs/common");
const cats_service_1 = require("./cats.service");
const cats_request_dto_1 = require("./dto/cats.request.dto");
const swagger_1 = require("@nestjs/swagger");
const cats_response_dto_1 = require("./dto/cats.response.dto");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const auth_service_1 = require("../auth/auth.service");
const login_request_dto_1 = require("../auth/dto/login.request.dto");
const login_response_dto_1 = require("../auth/dto/login.response.dto");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const user_decorator_1 = require("../common/decordators/user.decorator");
const cats_schema_1 = require("./cats.schema");
const aws_service_1 = require("../aws/aws.service");
const comments_repository_1 = require("../comments/comments.repository");
const http_exception_filter_1 = require("../common/exceptions/http-exception.filter");
let CatsController = exports.CatsController = class CatsController {
    constructor(awsService, catsService, authService, commentsRepository) {
        this.awsService = awsService;
        this.catsService = catsService;
        this.authService = authService;
        this.commentsRepository = commentsRepository;
    }
    getCurrentCat(cat) {
        return cat;
    }
    async signUp(body) {
        return this.catsService.signUp(body);
    }
    login(body) {
        return this.authService.JwtLogIn(body);
    }
    async uploadImage(files, cat) {
        console.log(cat);
        try {
            console.log(files);
            if (files.mimetype === 'image/png' || files.mimetype === 'image/jpeg') {
                const originKey = cat.key;
                const result = await this.awsService.deleteS3Object(originKey);
                console.log(originKey, result);
                const keyObject = await this.awsService.uploadFileToS3('catImg', files);
                const key = keyObject.key;
                const imgUrl = this.awsService.getAwsS3FileUrl(key);
                return this.catsService.uploadImg(cat, imgUrl, key);
            }
            else {
                throw new common_1.BadRequestException('File type not good');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(`${error}`);
        }
    }
    async getAllCats() {
        return this.catsService.getAllCats();
    }
    async separateTime(body) {
        return this.catsService.separateTime(body.근무시간, body.휴식시간목록);
    }
    async getKindOfWorkTimeList(body) {
        const { 시작시간, 종료시간, 일일소정근로시간 } = body;
        return this.catsService.getKindOfWorkTimeList(시작시간, 종료시간, 일일소정근로시간);
    }
    async getTotalDayWorkTimeList(body) {
        console.log(body.근무시간, body.휴식시간목록);
        return this.catsService.getTotalDayWorkTimeList(body.근무시간, body.휴식시간목록);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '현재 유저 정보 갖어오기' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: cats_response_dto_1.CatResponseDto }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "getCurrentCat", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버에러' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '성공', type: cats_response_dto_1.CatResponseDto }),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cats_request_dto_1.CatRequestDto]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그인성공',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", void 0)
], CatsController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '이미지 업로드' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '업로드 성공',
        type: cats_response_dto_1.CatResponseDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('images')),
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cats_schema_1.Cat]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "uploadImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '고양지 전체 갖어오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '업로드 성공',
        type: cats_response_dto_1.CatResponseDto,
        isArray: true,
    }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "getAllCats", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "separateTime", null);
__decorate([
    (0, common_1.Post)('test2'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "getKindOfWorkTimeList", null);
__decorate([
    (0, common_1.Post)('test3'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatsController.prototype, "getTotalDayWorkTimeList", null);
exports.CatsController = CatsController = __decorate([
    (0, common_1.Controller)('cats'),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [aws_service_1.AWSService,
        cats_service_1.CatsService,
        auth_service_1.AuthService,
        comments_repository_1.CommentsRepository])
], CatsController);
//# sourceMappingURL=cats.controller.js.map