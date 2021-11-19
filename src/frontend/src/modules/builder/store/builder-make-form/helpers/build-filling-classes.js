const FillingClassCounts = {
  2: "second",
  3: "third",
};

export const buildFillingClasses = (ingredients) =>
  ingredients
    .map((ingredient) => {
      if (ingredient.counter.value) {
        return [
          `pizza__filling--${ingredient.classMod}`,
          `${
            ingredient.counter.value > 1
              ? `pizza__filling--${
                  FillingClassCounts[ingredient.counter.value]
                }`
              : undefined
          }`,
        ]
          .filter((it) => it)
          .join(" ");
      }
    })
    .filter((it) => it);
