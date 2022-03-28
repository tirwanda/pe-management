import checkout from "layouts/dashboards/create-new-line/schema/newLineForm";

const {
  formField: { lineName, lineCode, description, cycleTime },
} = checkout;

const initialValues = {
  [lineName.name]: "",
  [lineCode.name]: "",
  [description.name]: "",
  [cycleTime.name]: 0,
};

export default initialValues;
