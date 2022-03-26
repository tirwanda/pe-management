const newLineForm = {
  formId: "new-line-form",
  formField: {
    lineName: {
      name: "lineName",
      label: "Line Name",
      placeholder: "Enter Line Name",
      type: "text",
      errorMsg: "Line Name is required.",
    },
    lineCode: {
      name: "lineCode",
      placeholder: "Enter Line Code",
      label: "Line Code",
      type: "text",
      errorMsg: "Line Code is required.",
    },
    description: {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
      type: "text",
      errorMsg: "Description is required.",
    },
    category: {
      name: "category",
      placeholder: "Select a Category",
      label: "Category",
      type: "text",
      errorMsg: "Category is required.",
    },
    cycleTime: {
      name: "cycleTime",
      label: "Cycle Time(sec)",
      type: "number",
      errorMsg: "Cycle Time is required.",
    },
  },
};

export default newLineForm;
