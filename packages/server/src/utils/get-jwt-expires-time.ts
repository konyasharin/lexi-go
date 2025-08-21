export const getJwtExpiresTime = (type: "access" | "refresh") => {
  return (type === "access" ? 15 : 24 * 60) * 1000 * 60;
};
