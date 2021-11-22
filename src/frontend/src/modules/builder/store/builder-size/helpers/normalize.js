const SizeClasses = {
  1: "small",
  2: "normal",
  3: "big",
};

export const normalize = (sizes) =>
  sizes.map((size, index) => ({
    ...size,
    classMod: SizeClasses[size.multiplier],
    isChecked: index === 1,
    radioName: "diameter",
  }));
