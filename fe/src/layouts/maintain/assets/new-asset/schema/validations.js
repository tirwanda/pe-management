import * as Yup from "yup";
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

const validations = Yup.object().shape({
  [assetNumber.name]: Yup.string().required(assetNumber.errorMsg).min(1, assetNumber.errorMsg),
  [assetName.name]: Yup.string().required(assetName.errorMsg),
  [status.name]: Yup.string().required(status.errorMsg),
  [assetLocation.name]: Yup.string().required(assetLocation.errorMsg),
  [assetFunction.name]: Yup.string().required(assetFunction.errorMsg),
  [process.name]: Yup.string().required(process.errorMsg),
  [output.name]: Yup.string().required(output.errorMsg),
  [lastPoPrice.name]: Yup.number().required(lastPoPrice.errorMsg),
});

export default validations;
