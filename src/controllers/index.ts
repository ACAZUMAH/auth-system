import { comparePassword } from "../helpers";
import {
  createAndSendCode,
  verifyAndSendToken,
} from "../services/auth/create0tpAndSend";
import * as service from "../services/users";
import { Request, Response } from "express";
import { genAccessToken } from "../helpers";

/**
 * controller to register a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message and otp
 */
export const Register = async (req: Request, res: Response) => {
  let { phone } = req.body;
  const create = await service.createUser({ ...req.body });
  const otp = await createAndSendCode(create, phone);
  return res
    .status(200)
    .json({ success: true, message: "Account created your OTP is " + otp });
};

/**
 * controller to verify otp
 * @param req Request object
 * @param res Response object
 * @returns response with success message and token
 */
export const verifyOtp = async (req: Request, res: Response) => {
  const { code } = req.body;
  const token = await verifyAndSendToken(code, new Date());
  return res.status(200).json({ success: true, token: token });
};

/**
 * controller to login a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message and token
 * @throws {Unauthorized} when credentials are invalid
 */
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await service.findUserByEmail(email);
  const ismatch = await comparePassword(password, user?.password);
  if (!ismatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
  const token = await genAccessToken({ id: user._id });
  return res.status(200).json({ success: true, token: token });
};

/**
 * controller to assign role to a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin
 */
export const assignRole = async (req: Request, res: Response) => {
  const { role } = req.body;
  const user: any = await service.findUserById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  await service.findByIdAndUpdate(req.params.id as string, {
    role: role as string,
  });
  return res
    .status(200)
    .json({ success: true, message: "Role assigned successfully" });
};

/**
 * controller to get user profile
 * @param req Request object
 * @param res Response object
 * @returns response with user profile
 * @throws {Unauthorized} when user is not an admin or user
 */
export const getProfile = async (req: Request, res: Response) => {
  const user: any = await service.findUserById(req.user.id);
  if (user.role === "admin" || user.role === "user") {
    return res.status(200).json({ success: true, user: user });
  }
  return res.status(403).json({ success: false, message: "Unauthorized" });
};

/**
 * controller to get all users
 * @param req Request object
 * @param res Response object
 * @returns response with all users
 */
export const getUsers = async (req: Request, res: Response) => {
  const users = await service.findUsers();
  return res.status(200).json({ success: true, users: users });
};

/**
 * controller to update user profile
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin or user
 */
export const updateProfile = async (req: Request, res: Response) => {
  const user: any = await service.findUserById(req.user.id);
  if (user.role === "admin") {
    const update = await service.findByIdAndUpdate(req.query.id as string, { ...req.body });
    return res
      .status(200)
      .json({ success: true, message: update });
  }
  if (user.role === "user") {
    const update = await service.findByIdAndUpdate(req.user.id, { ...req.body });
    return res
      .status(200)
      .json({ success: true, message: update });
  }
};

/**
 * controller to delete a user
 * @param req Request object
 * @param res Response object
 * @returns response with success message
 * @throws {Unauthorized} when user is not an admin
 */
export const deleteUser = async (req: Request, res: Response) => {
  const user: any = await service.findUserById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  await service.deleteUser(req.params.id);
  return res
    .status(200)
    .json({ success: true, message: "User deleted successfully" });
};
