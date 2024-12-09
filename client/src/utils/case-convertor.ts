const keyReplacer = (key: string) => {
  const [firstWord, ...rest] = key.split("_");
  return [
    firstWord,
    ...rest.map((v) => `${v[0].toUpperCase()}${v.substring(1)}`),
  ].join("");
};

export const snakeToCamelConvertor = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {};
  Object.entries(obj).map(([k, v]) => {
    newObj[keyReplacer(k)] = v;
  });

  return newObj;
};
