import { CountEvents } from "@/common/constants";

const MutationTypes = {
  INC: "INC",
  DEC: "DEC",
  CHANGE: "CHANGE",
  DROP: "DROP",
};

const EventTypeMap = {
  [CountEvents.INC]: {
    mutationType: MutationTypes.INC,
    evt: CountEvents.INC,
    value: (value) => value,
  },
  [CountEvents.DEC]: {
    mutationType: MutationTypes.DEC,
    evt: CountEvents.DEC,
    value: (value) => value,
  },
  [CountEvents.CHANGE]: {
    mutationType: MutationTypes.CHANGE,
    evt: CountEvents.CHANGE,
    value: (value) => value,
  },
  [CountEvents.DROP]: {
    mutationType: MutationTypes.DROP,
    evt: CountEvents.INC,
    value: (value) => value,
  },
};

export class Count {
  static validateIncDec(valueToInt, currentIngredientIdx, arr) {
    return (
      valueToInt > arr[currentIngredientIdx].counter.maxInc ||
      valueToInt < arr[currentIngredientIdx].counter.maxDec
    );
  }

  static incDec(countEvent, currentIdx, arr) {
    const arrCopy = [...arr];
    const value =
      countEvent === CountEvents.INC
        ? ++arrCopy[currentIdx].counter.value
        : --arrCopy[currentIdx].counter.value;

    const totalPrice = arrCopy[currentIdx].price * value;

    arrCopy[currentIdx] = {
      ...arrCopy[currentIdx],
      counter: {
        ...arrCopy[currentIdx].counter,
        value,
      },
      totalPrice,
    };

    return arrCopy;
  }

  static change(currentIdx, valueToInt, arr) {
    const copyArr = [...arr];
    const isValueNan = isNaN(valueToInt);

    if (isValueNan) {
      copyArr[currentIdx] = {
        ...copyArr[currentIdx],
        counter: {
          ...copyArr[currentIdx].counter,
          value: 0,
        },
        totalPrice: 0,
      };

      return copyArr;
    }

    const validate = Count.validateIncDec(valueToInt, currentIdx, copyArr);
    const value = validate ? copyArr[currentIdx].counter.value : valueToInt;
    const totalPrice = validate
      ? copyArr[currentIdx].price * arr[currentIdx].counter.value
      : copyArr[currentIdx].price * valueToInt;

    copyArr[currentIdx] = {
      ...copyArr[currentIdx],
      counter: {
        ...copyArr[currentIdx].counter,
        value,
      },
      totalPrice,
    };

    return copyArr;
  }

  static validateIncDecDrop(valueToInt, currentIdx, arr) {
    return valueToInt >= arr[currentIdx].counter.maxInc;
  }

  static buildCommitMutation({ arr, evtType, value, arrId }, cb) {
    let commitData;
    const valueToInt = parseInt(value, 10);
    const currentArrIdx = arr.findIndex(({ id }) => id === arrId);

    const valueToCommit =
      evtType === CountEvents.INC ||
      evtType === CountEvents.DEC ||
      evtType === CountEvents.DROP
        ? EventTypeMap[evtType].value(currentArrIdx)
        : EventTypeMap[evtType].value({
            id: currentArrIdx,
            value: valueToInt,
          });

    if (evtType === CountEvents.DROP) {
      if (!Count.validateIncDecDrop(valueToInt, currentArrIdx, arr)) {
        commitData = {
          mutationType: EventTypeMap[evtType].mutationType,
          payload: {
            type: EventTypeMap[evtType].evt,
            value: valueToCommit,
          },
        };

        cb(commitData);
      }

      return;
    }

    commitData = {
      mutationType: EventTypeMap[evtType].mutationType,
      payload: {
        type: EventTypeMap[evtType].evt,
        value: valueToCommit,
      },
    };

    cb(commitData);
  }
}
