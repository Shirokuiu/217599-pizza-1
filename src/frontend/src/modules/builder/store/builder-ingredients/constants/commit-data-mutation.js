import {
  INGREDIENT_CHANGE,
  INGREDIENT_DEC,
  INGREDIENT_DROP,
  INGREDIENT_INC,
} from "@/modules/builder/store/builder-ingredients/mutation-types";

export const CommitDataMutation = {
  INC: INGREDIENT_INC,
  DEC: INGREDIENT_DEC,
  CHANGE: INGREDIENT_CHANGE,
  DROP: INGREDIENT_DROP,
};
