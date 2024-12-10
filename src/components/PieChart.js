import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as XLSX from "xlsx";
import { Box, Button } from "@mui/material";

function PieChart({ characters }) {
  const chartRef = useRef(null);

  const processData = () => {
    return characters.map((character) => ({
      name: character.name,
      y: character.films.length,
      films: character.films,
    }));
  };

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "#c7c1c1cc",
      height: "300px",
    },
    title: {
      text: "Character Film Participation",
    },
    tooltip: {
      pointFormatter: function () {
        return `
          <b>${this.percentage.toFixed(1)}%</b><br />
          ${this.y} Film${this.y > 1 ? "s" : ""}: ${this.films.join(", ")}<br />
        `;
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
    series: [
      {
        name: "Films",
        colorByPoint: true,
        data: processData(),
      },
    ],
  };

  const exportToExcel = () => {
    const dataToExport = characters.map((character) => ({
      Name: character.name,
      Films: character.films.join(", "),
      "Number of Films": character.films.length,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Films Data");
    XLSX.writeFile(wb, "ChartData.xlsx");
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.series[0].setData(processData());
    }
  }, [characters]);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "#c7c1c1cc",
        borderRadius: 2,
        maxWidth: "100%",
        margin: "0 auto",
        mb: 2,
        height: "auto",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, display: "block", mx: "auto" }}
        onClick={exportToExcel}
      >
        Export to Excel
      </Button>
    </Box>
  );
}

export default PieChart;
