const SauceClasses = {
  tomato: "tomato",
  creamy: "creamy",
};

export const buildSauceClass = (sauces) =>
  SauceClasses[sauces.find(({ isChecked }) => isChecked)?.value];
