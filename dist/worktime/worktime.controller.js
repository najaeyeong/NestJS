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
exports.WorktimeController = void 0;
const common_1 = require("@nestjs/common");
const worktime_service_1 = require("./worktime.service");
const swagger_1 = require("@nestjs/swagger");
const day_worktime_response_dto_1 = require("./dto/day.worktime.response.dto");
const day_worktime_request_dto_1 = require("./dto/day.worktime.request.dto");
let WorktimeController = exports.WorktimeController = class WorktimeController {
    constructor(worktimeService) {
        this.worktimeService = worktimeService;
    }
    async separateTime(body) {
        return this.worktimeService.separateTime(body.근무시간, body.휴식시간목록);
    }
    async getKindOfWorkTimeList(body) {
        const { 시작시간, 종료시간, 일일소정근로시간 } = body;
        return this.worktimeService.getKindOfWorkTimeList(시작시간, 종료시간, 일일소정근로시간);
    }
    async getTotalDayWorkTimeList(body) {
        console.log(body.근무시간, body.휴식시간목록);
        return this.worktimeService.getTotalDayWorkTimeList(body.근무시간, body.휴식시간목록);
    }
};
__decorate([
    (0, common_1.Post)('separateTime'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorktimeController.prototype, "separateTime", null);
__decorate([
    (0, common_1.Post)('TimeList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorktimeController.prototype, "getKindOfWorkTimeList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '일일 근로시간 종류별 정리' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공',
        type: day_worktime_response_dto_1.DayWorkTimeResponseDto,
    }),
    (0, common_1.Post)('DayWorkTimeList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [day_worktime_request_dto_1.DayWorkTimeRequestDto]),
    __metadata("design:returntype", Promise)
], WorktimeController.prototype, "getTotalDayWorkTimeList", null);
exports.WorktimeController = WorktimeController = __decorate([
    (0, common_1.Controller)('worktime'),
    __metadata("design:paramtypes", [worktime_service_1.WorktimeService])
], WorktimeController);
//# sourceMappingURL=worktime.controller.js.map