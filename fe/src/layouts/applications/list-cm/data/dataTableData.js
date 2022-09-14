const dataTableData = {
  columns: [
    { Header: "Asset Name", accessor: "assetName", width: "20%" },
    { Header: "Line Name", accessor: "lineName", width: "15%" },
    { Header: "Started Date", accessor: "startedDate", width: "10%" },
    { Header: "Completed Date", accessor: "completedDate", width: "10%" },
    { Header: "Minutes", accessor: "downtimeMinute", width: "15%" },
    { Header: "status", accessor: "status", width: "15%" },
    { Header: "Approval", accessor: "approval", width: "15%" },
    { Header: "Actions", accessor: "actions" },
  ],

  rows: [],
};

export default dataTableData;
