const Doughs = {
  light: "на тонком тесте",
  large: "на толстом тесте",
};

const Sauces = {
  tomato: "томатный",
  creamy: "сливочный",
};

const Sizes = {
  1: "23 см",
  2: "32 см",
  3: "45 см",
};

const getDoughDescription = (doughs) =>
  Doughs[doughs.find(({ isChecked }) => isChecked).classMod];

const getIngredientsDescription = (ingredients) =>
  ingredients
    .filter(({ counter }) => counter.value !== 0)
    .map(({ name }) => name.toLowerCase())
    .join(", ");

const getSauceDescription = (sauces) =>
  Sauces[sauces.find(({ isChecked }) => isChecked).value];

const getSizeDescription = (sizes) =>
  Sizes[sizes.find(({ isChecked }) => isChecked).multiplier];

export const buildPizzaDescription = ({
  doughs,
  ingredients,
  sauces,
  sizes,
}) => ({
  dough: getDoughDescription(doughs),
  ingredients: getIngredientsDescription(ingredients),
  sauce: getSauceDescription(sauces),
  size: getSizeDescription(sizes),
});
