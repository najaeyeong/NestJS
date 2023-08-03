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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comments_repository_1 = require("../comments.repository");
const cats_repository_1 = require("../../cats2/cats.repository");
let CommentsService = exports.CommentsService = class CommentsService {
    constructor(commentsRepository, catsRepository) {
        this.commentsRepository = commentsRepository;
        this.catsRepository = catsRepository;
    }
    async getAllComments() {
        try {
            return await this.commentsRepository.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createComment(id, body) {
        try {
            const { author, contents } = body;
            const targetCat = await this.catsRepository.findCatByIdWithdoutPassword(id);
            const authorCat = await this.catsRepository.findCatByIdWithdoutPassword(author);
            return await this.commentsRepository.create(targetCat.id, authorCat.id, contents);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async plusLike(id) {
        try {
            const likeCount = await this.commentsRepository.getLikeCount(id);
            return await this.commentsRepository.updateLikeCount(id, likeCount + 1);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        cats_repository_1.CatsRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map