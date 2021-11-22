export const normalizeAdditionals = (additionals) =>
  additionals.map((additional) => {
    let imageArr = additional.image.split("/");

    return {
      ...additional,
      image: imageArr[imageArr.length - 1],
      counter: {
        value: 0,
        maxInc: undefined,
        maxDec: 0,
      },
      totalPrice: 0,
    };
  });
