const newAssetForm = {
  formId: "new-asset-form",
  formField: {
    assetNumber: {
      name: "assetNumber",
      label: "Asset Number",
      placeholder: "Enter Asset No",
      type: "text",
      errorMsg: "Asset Number is required.",
    },
    assetName: {
      name: "assetName",
      placeholder: "Enter Asset Name",
      label: "Asset Name",
      type: "text",
      errorMsg: "Asset Name is required.",
    },
    status: {
      name: "status",
      placeholder: "Status",
      label: "Status",
      type: "text",
      errorMsg: "Status is required.",
    },
    assetLocation: {
      name: "assetLocation",
      placeholder: "Enter Asset Location",
      label: "Asset Location",
      type: "text",
      errorMsg: "Asset Location is required.",
    },
    assetFunction: {
      name: "assetFunction",
      placeholder: "Enter Asset Function",
      label: "Asset Function",
      type: "text",
      errorMsg: "Asset Function is required.",
    },
    process: {
      name: "process",
      placeholder: "Enter Process",
      label: "Process",
      type: "text",
      errorMsg: "Process is required.",
    },
    output: {
      name: "output",
      placeholder: "Enter Output",
      label: "Output",
      type: "text",
      errorMsg: "Output is required.",
    },
    lastPoPrice: {
      name: "lastPoPrice",
      label: "Last PO Price",
      type: "number",
      errorMsg: "Price is required.",
    },
  },
};

export default newAssetForm;
