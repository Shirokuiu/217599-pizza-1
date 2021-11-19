export const patchFormValues = (newValues, oldValues) =>
  Object.keys(newValues).reduce((obj, v) => {
    obj[v] = {
      ...oldValues[v],
      value: newValues[v],
    };

    return obj;
  }, {});
