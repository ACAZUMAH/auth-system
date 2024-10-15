import Ajv from "ajv";
import addFormat from "ajv-formats";
import createHttpError from "http-errors";
import { UserType } from "../../types";

const validateUpdate = async (data: UserType) => {
  const ajv = new Ajv();

  addFormat(ajv);

  ajv.addFormat("phone", {
    type: "string",
    validate: (value: string) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(value);
    },
  });

  const Schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string", format: "phone" },
      password: { type: "string", minLength: 6 },
      role: { type: "string" },
    },
    additionalProperties: false,
  };

  const validate = ajv.compile(Schema);

  const isValid = validate(data);

  if (!isValid) {
    throw new createHttpError.BadRequest(
      validate.errors?.map((error) => error.message).join(", ")
    );
  };

};

export default validateUpdate;