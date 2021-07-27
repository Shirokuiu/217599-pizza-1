const valueMap = [
  {
    multiplier: 1,
    value: "small",
  },
  {
    multiplier: 2,
    value: "normal",
  },
  {
    multiplier: 3,
    value: "big",
  },
];

export const normalizeSizes = (sizes) =>
  sizes.map((size, index) => ({
    ...size,
    value: {
      image: size.image,
      multiplier: size.multiplier,
      name: valueMap.find(
        ({ multiplier: multiplierMap }) => size.multiplier === multiplierMap
      ).value,
    },
    isChecked: index === 1,
  }));
