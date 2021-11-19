export const getChecked = (arr) => {
  if (!arr.length) {
    return arr;
  }

  return arr.find(({ isChecked }) => isChecked);
};
