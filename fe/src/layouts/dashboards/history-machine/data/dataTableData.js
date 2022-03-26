// Sales dashboard components
import ProductCell from "layouts/dashboards/history-machine/components/ProductCell";
import DefaultCell from "layouts/dashboards/history-machine/components/DefaultCell";

// Images
import mcLogo from "assets/images/products/mc-logo.jpg";

const dataTableData = {
  columns: [
    { Header: "Machine", accessor: "machine", width: "55%" },
    { Header: "No Asset", accessor: "noAsset" },
    { Header: "Time (Minute)", accessor: "time", align: "center" },
    { Header: "Location", accessor: "line", align: "center" },
  ],

  rows: [
    {
      machine: <ProductCell image={mcLogo} name="MC Modul L" />,
      noAsset: <DefaultCell>12345678</DefaultCell>,
      time: <DefaultCell>36</DefaultCell>,
      line: <DefaultCell>MM3</DefaultCell>,
    },
    {
      machine: <ProductCell image={mcLogo} name="MC Press Fit" />,
      noAsset: <DefaultCell>87654321</DefaultCell>,
      time: <DefaultCell>25</DefaultCell>,
      line: <DefaultCell>MM3</DefaultCell>,
    },
    {
      machine: <ProductCell image={mcLogo} name="MC Rotary Numbering" />,
      noAsset: <DefaultCell>32145687</DefaultCell>,
      time: <DefaultCell>20</DefaultCell>,
      line: <DefaultCell>Line A</DefaultCell>,
    },
    {
      machine: <ProductCell image={mcLogo} name="MC Press Bearing Crank Case R" />,
      noAsset: <DefaultCell>76548321</DefaultCell>,
      time: <DefaultCell>20</DefaultCell>,
      line: <DefaultCell>Line</DefaultCell>,
    },
    {
      machine: <ProductCell image={mcLogo} name="MC Numbering Laser" />,
      noAsset: <DefaultCell>43526178</DefaultCell>,
      time: <DefaultCell>15</DefaultCell>,
      line: <DefaultCell>Mini Line</DefaultCell>,
    },
  ],
};

export default dataTableData;
