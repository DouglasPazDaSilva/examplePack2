"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const axios_1 = require("axios");
function handleError(error) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (error instanceof axios_1.AxiosError) {
        // time out error
        if (error.code && error.code === 'ECONNABORTED') {
            return {
                status: 500,
                code: 500,
                message: 'Falha de conexão, tente novamente.',
            };
        }
        // api error
        if (error.response) {
            return Object.assign(Object.assign({}, error.response.data), { status: error.response.status || 500, code: ((_c = (_b = (_a = error.response.data) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.code) || ((_d = error.response.data) === null || _d === void 0 ? void 0 : _d.code) || 500, message: ((_g = (_f = (_e = error.response.data) === null || _e === void 0 ? void 0 : _e.detail) === null || _f === void 0 ? void 0 : _f.error) === null || _g === void 0 ? void 0 : _g.message) || ((_h = error.response.data) === null || _h === void 0 ? void 0 : _h.message) || 'Erro interno' });
        }
        // api error sem response
        return Object.assign(Object.assign({}, error), { status: 500, code: 500, message: error.message });
    }
    // generic error
    return {
        status: 500,
        code: 500,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
    };
}
exports.handleError = handleError;
