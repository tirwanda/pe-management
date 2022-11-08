const dataTableData = {
  columns: [
    { Header: "Asset Name", accessor: "assetName", width: "20%" },
    { Header: "Asset Number", accessor: "assetNumber", width: "20%" },
    { Header: "Frequency", accessor: "frequency", with: "7%" },
    { Header: "Minute", accessor: "downtimeMinute", width: "7%" },
    { Header: "MTTR", accessor: "mttrValue" },
    { Header: "MTBF", accessor: "mtbfValue" },
  ],

  rows: [],
};

export default dataTableData;
