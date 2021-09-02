import * as yup from "yup";

export const initialValues = {
  name: "",
};

export const createBusinessSchema = yup
  .object({
    name: yup.string().required(),
  }).required();