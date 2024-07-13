export const convertTime = (time) => {
  const date = new Date(time);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return formattedDate;
};

export const shortenAddress = (address) =>
  `${address?.slice(0, 4)}.....${address?.slice(address.length - 4)}`;

export const validObjectCheck = (obj) => {
  const values = Object.values(obj);
  for (const v in values) {
    if (!v) {
      return false;
    }
  }
  return true;
};
