import { buildStaticForm } from "@/modules/cart/store/cart-make-order/helpers";
import { required } from "vuelidate/lib/validators";

const buildFormFromBack = (data) => {
  if (!data) {
    return [];
  }

  return data.map((it) => ({
    id: it.id,
    name: it.name,
    form: {
      addressName: it.name,
      address: {
        ...Object.keys(it)
          .filter((key) => !["userId"].includes(key))
          .reduce((obj, v) => {
            obj[v] = { value: it[v], isDisabled: true };

            return obj;
          }, {}),
      },
      validationRule: {
        street: {
          required,
        },
        building: {
          required,
        },
      },
    },
  }));
};

export const buildForm = (formDataItems) =>
  [...buildStaticForm(), ...buildFormFromBack(formDataItems)].filter(
    (it) => it
  );
