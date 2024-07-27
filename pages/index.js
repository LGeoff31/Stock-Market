import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import stockData from "./data.json";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function Home() {
  const data = stockData;
  const [selectedStock, setSelectedStock] = useState(data.stocks[0]);

  const handleStockChange = (event) => {
    const selected = data.stocks.find(
      (stock) => stock.name === event.target.value
    );
    setSelectedStock(selected);
  };

  const chartData = {
    labels: data.timeSeriesData[selectedStock.symbol].map(
      (dataPoint) => dataPoint.date
    ),
    datasets: [
      {
        label: `${selectedStock.name} Price`,
        data: data.timeSeriesData[selectedStock.symbol].map(
          (dataPoint) => dataPoint.price
        ),
        borderColor: "green",
        backgroundColor: "green",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <Grid
      container
      sx={{
        background: "rgb(36,36,36)",
        padding: "2rem",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        color="white"
        textAlign="center"
        marginBottom="2rem"
      >
        Stock Market Graph
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="stock-select-label" sx={{ color: "white" }}>
          Select a stock
        </InputLabel>
        <Select
          labelId="stock-select-label"
          value={selectedStock.name}
          onChange={handleStockChange}
          sx={{ color: "white" }}
        >
          {data.stocks.map((stock) => (
            <MenuItem key={stock.symbol} value={stock.name}>
              {stock.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid
        sx={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { labels: { color: "white" } },
            },
            scales: {
              x: {
                ticks: { color: "white" },
                grid: { color: "black" },
              },
              y: {
                ticks: { color: "white" },
                grid: { color: "black" },
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
