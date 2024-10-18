import {oauthType, queryType, UserType } from "../../services/types";
import { user,oauth } from "../../models/schemas";
import createHttpError from "http-errors";
import { createAuth } from "../auth/index";
import { hashPassword } from "../../helpers";
import validate from "./validators/validate-signup";
import validateUpdate from "./validators/validate-update";
import { Types } from "mongoose";


/**
 * create a user with google data
 * @param data google user data
 * @returns created user
 */
export const createGoogleUser = async (data: oauthType) =>{
    const user = await oauth.create({ ...data });
    await createAuth(user._id);
    return user;
};
  
/**
 * save user data in the database and create an auth record
 * @param data user information
 * @returns object id of the user
 * @throws {Conflict} when user already exists
 */
export const createUser = async (data: UserType) => {
  await validate(data);
  if (await user.exists({$or:[{email: data.email},{phone:data.phone}]})){
    throw new createHttpError.Conflict("User already exists");
  }
  const hash = await hashPassword(data.password as string);
  const saveUser = await user.create({
    ...data,
    password: hash,
  });
  await createAuth(saveUser._id);
  return saveUser._id;
};

/**
 * find user in the database by id and return the user data
 * @param id id of the user
 * @returns found user
 * @throws {BadRequest} when id is invalid
 */
export const findUserById = async (id: string | Types.ObjectId) =>{
    if(!Types.ObjectId.isValid(id)){
        throw new createHttpError
        .BadRequest('Invalid user id');
    }
    return await user.findById(id, {password: 0, is_authenticated: 0})
    || await oauth.findById(id, {password: 0, is_authenticated: 0});
};   

/**
 * find google user by id in the database
 * @param id google user id
 * @returns user
 */
export const findGoogleUser = async (id: string) =>{
    const user = await oauth.findOne({ googleId: id });   
    return user;
};

/**
 * retrieve user data from the database
 * @param email user email
 * @returns found user 
 * @throws {NotFound} when useer is not found
 */
export const findUserByEmail = async (email: string) => {
    const foundUser = user.findOne({ email: email })
    || oauth.findOne({ email: email });
    if (!foundUser) {
        throw new createHttpError
        .NotFound('No user with this email found');
    }
    return foundUser;
};

/**
 * find user by id and update the user data
 * @param id id of the user information to be updated
 * @param data new data to be updated
 * @returns updated user data
 * @throws {BadRequest} when id is invalid
 */
export const findByIdAndUpdate = async (id: string|Types.ObjectId, data?: UserType) => {
    if(!Types.ObjectId.isValid(id)){
        throw new createHttpError.BadRequest('Invalid user id');
    }
    if(data){
        await validateUpdate(data as UserType);
        const updateFields: Partial<UserType> = {};
        if(data?.name) updateFields.name = data.name;
        if(data?.email) updateFields.email = data.email;
        if(data?.phone) updateFields.phone = data.phone;
        if(data?.role) updateFields.role = data.role;
        if(Object.keys(updateFields).length > 0){
            return await user
            .findByIdAndUpdate(id, {$set: updateFields}, {new: true}) ||
            await oauth.findByIdAndUpdate(id, {$set: updateFields}, {new: true});
        }
    }
    return await user.findByIdAndUpdate(id, {$set: { is_authenticated: true }})
    || await oauth.findByIdAndUpdate(id, {$set: { is_authenticated: true }});
};

/**
 * find all users in the database
 * @returns all users
 */
export const findUsers = async (query: queryType) => {
    const { page, limit } = query;
    let users = user.find({}, {password: 0, role: 0, is_authenticated: 0});
    let pages = Number(page) || 1;
    let limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    users = users.skip(skip).limit(limits);
    const result = await users;
    return result;
};

/**
 * find all users in the database
 * @param query query parameters
 * @returns found users
 */
export const findGoogleUsers = async (query: queryType) => {
    const { page, limit } = query;
    let users =  oauth.find({}, { is_authenticated: 0 });
    let pages = Number(page) || 1;
    let limits = Number(limit) || 10;
    const skip = (pages - 1) * limits;
    users = users.skip(skip).limit(limits);
    const result = await users;
    return result;
};

/**
 * delete user from the database
 * @param id id of the user to be deleted
 * @returns deleted user
 * @throws {BadRequest} when id is invalid
 */
export const deleteUser = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id)){
        throw new createHttpError.BadRequest('Invalid user id');
    }
    return await user.findByIdAndDelete(id) || 
    await oauth.findByIdAndDelete(id);
};
