import logo from "./logo.svg";
import "./App.css";
import EmojiTable from "./EmojiTable";
import DonutChart from "./Donut";
import BarChart from "./BarChart";
import CurveGraph from "./Graphs";
import MarimekkoChart from "./Marimekko";
function App() {
  let weeks = [
    {
      firstDay: "2023-01-01",
      lastDay: "2023-01-07",
      text: "1 ינואר - 7 ינואר",
    },
    {
      firstDay: "2023-01-08",
      lastDay: "2023-01-14",
      text: "8 ינואר - 14 ינואר",
    },
    {
      firstDay: "2023-01-15",
      lastDay: "2023-01-21",
      text: "15 ינואר - 21 ינואר",
    },
    {
      firstDay: "2023-01-22",
      lastDay: "2023-01-28",
      text: "22 ינואר - 28 ינואר",
    },
    {
      firstDay: "2023-01-29",
      lastDay: "2023-02-04",
      text: "29 ינואר - 4 פברואר",
    },
    {
      firstDay: "2023-02-05",
      lastDay: "2023-02-11",
      text: "5 פברואר - 11 פברואר",
    },
    {
      firstDay: "2023-02-12",
      lastDay: "2023-02-18",
      text: "12 פברואר - 18 פברואר",
    },
    {
      firstDay: "2023-02-19",
      lastDay: "2023-02-25",
      text: "19 פברואר - 25 פברואר",
    },
    {
      firstDay: "2023-02-26",
      lastDay: "2023-03-04",
      text: "26 פברואר - 4 מרץ",
    },
    {
      firstDay: "2023-03-05",
      lastDay: "2023-03-11",
      text: "5 מרץ - 11 מרץ",
    },
    {
      firstDay: "2023-03-12",
      lastDay: "2023-03-18",
      text: "12 מרץ - 18 מרץ",
    },
    {
      firstDay: "2023-03-19",
      lastDay: "2023-03-24",
      text: "19 מרץ - 25 מרץ",
    },
    {
      firstDay: "2023-03-25",
      lastDay: "2023-03-31",
      text: "26 מרץ - 1 אפריל",
    },
    {
      firstDay: "2023-04-01",
      lastDay: "2023-04-07",
      text: "2 אפריל - 8 אפריל",
    },
    {
      firstDay: "2023-04-08",
      lastDay: "2023-04-14",
      text: "9 אפריל - 15 אפריל",
    },
    {
      firstDay: "2023-04-15",
      lastDay: "2023-04-21",
      text: "16 אפריל - 22 אפריל",
    },
    {
      firstDay: "2023-04-22",
      lastDay: "2023-04-28",
      text: "23 אפריל - 29 אפריל",
    },
    {
      firstDay: "2023-04-29",
      lastDay: "2023-05-05",
      text: "30 אפריל - 6 מאי",
    },
    {
      firstDay: "2023-05-06",
      lastDay: "2023-05-12",
      text: "7 מאי - 13 מאי",
    },
    {
      firstDay: "2023-05-13",
      lastDay: "2023-05-19",
      text: "14 מאי - 20 מאי",
    },
    {
      firstDay: "2023-05-20",
      lastDay: "2023-05-26",
      text: "21 מאי - 27 מאי",
    },
    {
      firstDay: "2023-05-27",
      lastDay: "2023-06-02",
      text: "28 מאי - 3 יוני",
    },
    {
      firstDay: "2023-06-03",
      lastDay: "2023-06-09",
      text: "4 יוני - 10 יוני",
    },
    {
      firstDay: "2023-06-10",
      lastDay: "2023-06-16",
      text: "11 יוני - 17 יוני",
    },
    {
      firstDay: "2023-06-17",
      lastDay: "2023-06-23",
      text: "18 יוני - 24 יוני",
    },
    {
      firstDay: "2023-06-24",
      lastDay: "2023-06-30",
      text: "25 יוני - 1 יולי",
    },
    {
      firstDay: "2023-07-01",
      lastDay: "2023-07-07",
      text: "2 יולי - 8 יולי",
    },
    {
      firstDay: "2023-07-08",
      lastDay: "2023-07-14",
      text: "9 יולי - 15 יולי",
    },
    {
      firstDay: "2023-07-15",
      lastDay: "2023-07-21",
      text: "16 יולי - 22 יולי",
    },
    {
      firstDay: "2023-07-22",
      lastDay: "2023-07-28",
      text: "23 יולי - 29 יולי",
    },
    {
      firstDay: "2023-07-29",
      lastDay: "2023-08-04",
      text: "30 יולי - 5 אוגוסט",
    },
    {
      firstDay: "2023-08-05",
      lastDay: "2023-08-11",
      text: "6 אוגוסט - 12 אוגוסט",
    },
    {
      firstDay: "2023-08-12",
      lastDay: "2023-08-18",
      text: "13 אוגוסט - 19 אוגוסט",
    },
    {
      firstDay: "2023-08-19",
      lastDay: "2023-08-25",
      text: "20 אוגוסט - 26 אוגוסט",
    },
    {
      firstDay: "2023-08-26",
      lastDay: "2023-09-01",
      text: "27 אוגוסט - 2 ספטמבר",
    },
    {
      firstDay: "2023-09-02",
      lastDay: "2023-09-08",
      text: "3 ספטמבר - 9 ספטמבר",
    },
    {
      firstDay: "2023-09-09",
      lastDay: "2023-09-15",
      text: "10 ספטמבר - 16 ספטמבר",
    },
    {
      firstDay: "2023-09-16",
      lastDay: "2023-09-22",
      text: "17 ספטמבר - 23 ספטמבר",
    },
    {
      firstDay: "2023-09-23",
      lastDay: "2023-09-29",
      text: "24 ספטמבר - 30 ספטמבר",
    },
    {
      firstDay: "2023-09-30",
      lastDay: "2023-10-06",
      text: "1 אוקטובר - 7 אוקטובר",
    },
    {
      firstDay: "2023-10-07",
      lastDay: "2023-10-13",
      text: "8 אוקטובר - 14 אוקטובר",
    },
    {
      firstDay: "2023-10-14",
      lastDay: "2023-10-20",
      text: "15 אוקטובר - 21 אוקטובר",
    },
    {
      firstDay: "2023-10-21",
      lastDay: "2023-10-27",
      text: "22 אוקטובר - 28 אוקטובר",
    },
    {
      firstDay: "2023-10-29",
      lastDay: "2023-11-04",
      text: "29 אוקטובר - 4 נובמבר",
    },
    {
      firstDay: "2023-11-05",
      lastDay: "2023-11-11",
      text: "5 נובמבר - 11 נובמבר",
    },
    {
      firstDay: "2023-11-12",
      lastDay: "2023-11-18",
      text: "12 נובמבר - 18 נובמבר",
    },
    {
      firstDay: "2023-11-19",
      lastDay: "2023-11-25",
      text: "19 נובמבר - 25 נובמבר",
    },
    {
      firstDay: "2023-11-26",
      lastDay: "2023-12-02",
      text: "26 נובמבר - 2 דצמבר",
    },
    {
      firstDay: "2023-12-03",
      lastDay: "2023-12-09",
      text: "3 דצמבר - 9 דצמבר",
    },
    {
      firstDay: "2023-12-10",
      lastDay: "2023-12-16",
      text: "10 דצמבר - 16 דצמבר",
    },
    {
      firstDay: "2023-12-17",
      lastDay: "2023-12-23",
      text: "17 דצמבר - 23 דצמבר",
    },
    {
      firstDay: "2023-12-24",
      lastDay: "2023-12-30",
      text: "24 דצמבר - 30 דצמבר",
    },
    {
      firstDay: "2023-12-31",
      lastDay: "2024-01-06",
      text: "31 דצמבר - 6 ינואר",
    },
    {
      firstDay: "2024-01-07",
      lastDay: "2024-01-13",
      text: "7 ינואר - 13 ינואר",
    },
    {
      firstDay: "2024-01-14",
      lastDay: "2024-01-20",
      text: "14 ינואר - 20 ינואר",
    },
    {
      firstDay: "2024-01-21",
      lastDay: "2024-01-27",
      text: "21 ינואר - 27 ינואר",
    },
    {
      firstDay: "2024-01-28",
      lastDay: "2024-02-03",
      text: "28 ינואר - 3 פברואר",
    },
    {
      firstDay: "2024-02-04",
      lastDay: "2024-02-10",
      text: "4 פברואר - 10 פברואר",
    },
    {
      firstDay: "2024-02-11",
      lastDay: "2024-02-17",
      text: "11 פברואר - 17 פברואר",
    },
    {
      firstDay: "2024-02-18",
      lastDay: "2024-02-24",
      text: "18 פברואר - 24 פברואר",
    },
    {
      firstDay: "2024-02-25",
      lastDay: "2024-03-02",
      text: "25 פברואר - 2 מרץ",
    },
    {
      firstDay: "2024-03-03",
      lastDay: "2024-03-09",
      text: "3 מרץ - 9 מרץ",
    },
    {
      firstDay: "2024-03-10",
      lastDay: "2024-03-16",
      text: "10 מרץ - 16 מרץ",
    },
    {
      firstDay: "2024-03-17",
      lastDay: "2024-03-23",
      text: "17 מרץ - 23 מרץ",
    },
    {
      firstDay: "2024-03-24",
      lastDay: "2024-03-29",
      text: "24 מרץ - 30 מרץ",
    },
    {
      firstDay: "2024-03-30",
      lastDay: "2024-04-05",
      text: "31 מרץ - 6 אפריל",
    },
  ];
  return (
    <div className='App'>
      {/* <img
        src='noise.jpg'
        alt='Noise background'
        className='background-image'
      /> */}
      {/* <h1
        style={{
          color: "#C7CBEE",
          textAlign: "right",
          padding: "40px",
          margin: "0",
          position: "absolute",
          right: "0",
        }}>
        אימוגי
      </h1> */}
      {/* <DonutChart /> */}
      {/* <BarChart width={500} height={400} />
      <DonutChart />
      <CurveGraph /> */}
      <EmojiTable weeks={weeks} />
      {/* <MarimekkoChart width={800} height={400} /> */}
    </div>
  );
}

export default App;
