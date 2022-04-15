const dataTableData = {
  columns: [
    { Header: "id", accessor: "partId", align: "center", width: "10%" },
    { Header: "Part Name", accessor: "partName", align: "center", width: "20%" },
    { Header: "Part Number", accessor: "partNumber", align: "center", width: "20%" },
    { Header: "Stock", accessor: "stock", align: "center", width: "10%" },
    { Header: "UOM", accessor: "uom", align: "center", width: "15%" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ],

  rows: [],
};

export default dataTableData;
