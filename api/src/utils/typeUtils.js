export const toNumber = (value) => {
  const number = Number(value);
  return isNaN(number) ? undefined : number;
};

export const toArray = (value) => {
  return typeof value === "string"
    ? value.split(",").map((item) => item.trim())
    : value;
};
