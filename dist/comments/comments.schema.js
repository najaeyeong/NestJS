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
exports.CommentsSchema = exports.Comments = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const options = {
    collection: 'comments',
    timestamps: true,
};
let Comments = exports.Comments = class Comments extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'asdf98798sd8f92fsdnf4389',
        description: '댓글 작성자',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        ref: 'cat',
        unique: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Comments.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '안녕하세요. 좋은하루 보내세요!',
        description: '댓글 내용',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Comments.prototype, "contents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1234,
        description: '좋아요 갯수',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        default: 0,
        required: true,
    }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], Comments.prototype, "likeCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'asdf98798sd8f92fsdnf4389',
        description: '댓글이 남겨질 프로필 또는 댓글',
        required: true,
    }),
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        ref: 'cat',
        unique: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Comments.prototype, "info", void 0);
exports.Comments = Comments = __decorate([
    (0, mongoose_1.Schema)(options)
], Comments);
exports.CommentsSchema = mongoose_1.SchemaFactory.createForClass(Comments);
//# sourceMappingURL=comments.schema.js.map