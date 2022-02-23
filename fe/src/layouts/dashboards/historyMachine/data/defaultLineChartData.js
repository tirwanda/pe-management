const defaultLineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Line A",
      color: "info",
      data: [50, 100, 200, 190, 400, 350, 500, 450, 350, 250, 320, 200],
    },
    {
      label: "Mini Line",
      color: "primary",
      data: [10, 30, 40, 120, 150, 220, 280, 250, 280, 300, 120, 400],
    },
    {
      label: "MM3",
      color: "dark",
      data: [30, 50, 20, 100, 80, 200, 210, 220, 260, 290, 210, 230],
    },
  ],
};

export default defaultLineChartData;
