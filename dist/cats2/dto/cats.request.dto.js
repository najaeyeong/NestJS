"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cats_schema_1 = require("../cats.schema");
class CatRequestDto extends (0, swagger_1.PickType)(cats_schema_1.Cat, [
    'email',
    'password',
    'name',
]) {
}
exports.CatRequestDto = CatRequestDto;
//# sourceMappingURL=cats.request.dto.js.map