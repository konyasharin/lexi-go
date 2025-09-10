export const autoId = <T extends object>(array: T[]) => {
  if (array.some((item) => Object.keys(item).some((key) => key === "id")))
    throw new Error('array contains object with "id" key');

  return array.map((item, index) => ({
    ...item,
    id: index,
  }));
};
