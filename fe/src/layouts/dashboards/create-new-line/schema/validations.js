import * as Yup from "yup";
import checkout from "layouts/dashboards/create-new-line/schema/newLineForm";

const {
  formField: { lineCode, lineName, description, cycleTime },
} = checkout;

const validations = Yup.object().shape({
  [lineName.name]: Yup.string().required(lineName.errorMsg).min(1, lineName.errorMsg),
  [lineCode.name]: Yup.string().required(lineCode.errorMsg),
  [description.name]: Yup.string().required(description.errorMsg),
  [cycleTime.name]: Yup.number().required(cycleTime.errorMsg),
});

export default validations;
