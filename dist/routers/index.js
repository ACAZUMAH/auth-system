"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user = __importStar(require("../controllers/index"));
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.post('/auth/register', user.Register);
router.post('/auth/verify', user.verifyOtp);
router.post('/auth/login', user.Login);
router.route('/assign-role/:id')
    .post(helpers_1.verifyAccessToken, user.assignRole);
router.route('/profile')
    .get(helpers_1.verifyAccessToken, user.getProfile)
    .put(helpers_1.verifyAccessToken, user.updateProfile);
router.delete('/user/:id', helpers_1.verifyAccessToken, user.deleteUser);
router.get('/public-data', user.getUsers);
exports.default = router;
