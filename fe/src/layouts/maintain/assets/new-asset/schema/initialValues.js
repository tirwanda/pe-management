import checkout from "layouts/maintain/assets/new-asset/schema/newAssetForm";

const {
  formField: {
    assetNumber,
    assetName,
    status,
    assetLocation,
    assetFunction,
    process,
    output,
    lastPoPrice,
  },
} = checkout;

const initialValues = {
  [assetNumber.name]: "",
  [assetName.name]: "",
  [status.name]: "",
  [assetLocation.name]: "",
  [assetFunction.name]: "",
  [process.name]: "",
  [output.name]: "",
  [lastPoPrice.name]: 0,
};

export default initialValues;
