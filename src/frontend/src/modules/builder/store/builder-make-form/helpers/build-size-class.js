const SizeClasses = {
  light: "small",
  large: "big",
};

export const buildSizeClass = (doughs) =>
  SizeClasses[doughs.find(({ isChecked }) => isChecked)?.classMod];
