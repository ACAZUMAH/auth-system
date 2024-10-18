import createHttpError from "http-errors";
import { Types } from "mongoose";
import { auth } from "../../models/schemas";

/**
 * save user id in the database to be updated with the otp code
 * @param id id of the user
 * @returns true when user id is saved successfully
 */
export const createAuth = async (id: string | Types.ObjectId) => {
  await auth.create({ user: id });
  return true;
};

/**
 * check in the database if the exist a user with the given otp code
 * @param code code to check
 * @returns found user
 */
export const findByCode = async (code: string) => {
  return await auth.findOne({ code });
};

/**
 * find user in the database with the given id 
 * and update it with otp code and expiring date
 * @param id user id 
 * @param otp otp code
 * @param expiresIn expiring date
 * @returns true when update successfully
 */
export const findUserAndUpdateCode = async (
  id: string | Types.ObjectId,
  otp: string,
  expiresIn: Date
) => {
  if(!await auth.findOne({ user: id })){
      throw new Error('Not found');
    }
  await auth.findOneAndUpdate({ user: id }, { code: otp, expiresIn });
  return true;
};

/**
 * find user in the database with the given otp code
 * and delete it
 * @param code otp code
 * @returns deleted user
 */
export const findByCodeAndDelete = async (code: string) =>{
  if(!await auth.findOne({ code })){
    throw new createHttpError.NotFound('Invalid otp');
  }
  return auth.findOneAndDelete({ code });
}

