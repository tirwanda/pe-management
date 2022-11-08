const dataTableData = {
  columns: [
    { Header: "Asset Name", accessor: "assetName", width: "20%", align: "center" },
    { Header: "Line Name", accessor: "lineName", width: "15%", align: "center" },
    { Header: "Date", accessor: "startedDate", width: "10%", align: "center" },
    { Header: "Minutes", accessor: "downtimeMinute", width: "15%", align: "center" },
    { Header: "status", accessor: "status", width: "15%", align: "center" },
    { Header: "Approval", accessor: "approval", width: "10%", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ],

  rows: [],
};

export default dataTableData;
