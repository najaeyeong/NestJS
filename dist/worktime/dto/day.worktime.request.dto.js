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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayWorkTimeRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DayWorkTimeRequestDto {
}
exports.DayWorkTimeRequestDto = DayWorkTimeRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            출근시간: '2023-07-16T09:00:00.000Z',
            퇴근시간: '2023-07-16T18:00:00.000Z',
        },
        description: '근무시간',
    }),
    __metadata("design:type", Object)
], DayWorkTimeRequestDto.prototype, "\uADFC\uBB34\uC2DC\uAC04", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                시작시간: '2023-07-16T12:00:00.000Z',
                종료시간: '2023-07-16T13:00:00.000Z',
            },
            {
                시작시간: '2023-07-13T18:00:00.000Z',
                종료시간: '2023-07-13T18:30:00.000Z',
            },
            {
                시작시간: '2023-07-13T23:30:00.000Z',
                종료시간: '2023-07-14T00:30:00.000Z',
            },
        ],
        description: '휴식시간목록',
    }),
    __metadata("design:type", Array)
], DayWorkTimeRequestDto.prototype, "\uD734\uC2DD\uC2DC\uAC04\uBAA9\uB85D", void 0);
//# sourceMappingURL=day.worktime.request.dto.js.map