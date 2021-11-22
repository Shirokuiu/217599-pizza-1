import { required } from "vuelidate/lib/validators";

export const buildStaticForm = () => [
  {
    id: -1,
    name: "Заберу сам",
    form: {
      addressName: undefined,
      address: {
        phone: {
          value: "",
          isDisabled: false,
        },
      },
      validationRule: undefined,
    },
  },
  {
    id: -2,
    name: "Новый адрес",
    form: {
      addressName: "Новый адрес",
      address: {
        phone: {
          value: "",
          isDisabled: false,
        },
        street: {
          value: "",
          isDisabled: false,
        },
        building: {
          value: "",
          isDisabled: false,
        },
        name: {
          value: "Новый адрес",
          isDisabled: false,
        },
        flat: {
          value: "",
          isDisabled: false,
        },
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
  },
];
