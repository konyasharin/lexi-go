import crypto from "crypto";

export const generatePassword = (email: string) => {
  const random = crypto.randomBytes(16).toString("hex");
  return `${email}@${random}`;
};
