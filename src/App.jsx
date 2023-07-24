import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const isDataEqual = (oldData, newData) => {
    if (oldData.length !== newData.length) {
      return false;
    }

    for (let i = 0; i < oldData.length; i++) {
      if (oldData[i].PartNum !== newData[i].PartNum) {
        return false;
      }
    }

    return true;
  };

  const isDataChanged = (newData) => {
    if (data.length !== newData.length) {
      return true;
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].PartNum !== newData[i].PartNum) {
        return true;
      }
    }

    return false;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("Api", {
        headers: {
          accept: "*/*",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJrYWlyb3NkZXYxIiwicGFzc3dvcmQiOiJLQGlyb3NQYXNzOTkiLCJleHAiOjE2ODk4NTUwNzMsImlzcyI6Ind3dy5rYWlyb3Nzb2x1dGlvbnMuY28iLCJhdWQiOiJ3d3cua2Fpcm9zc29sdXRpb25zLmNvIn0.WM0bQNWCxScuiE5XY5nU8nNyhaz6cX4x81kFsOgDPBc",
        },
      });

      if (isDataChanged(response.data.Data)) {
        setData((prevData) => {
          // Only update the state with the new data if it's different
          if (!isDataEqual(prevData, response.data.Data)) {
            console.log("loading ");
            return response.data.Data;
          }
          return prevData; // Keep the previous state if there are no changes
        });
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call initially when the component mounts

    const intervalId = setInterval(() => {
      fetchData();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  if (data.length === 0) {
    // Handle the case when data is still loading or empty
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data Table</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Description</th>
            <th>Customer Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            {/* Add other table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            console.log("new Data");
            return (
              <tr key={item.PartNum}>
                <td>{item.PartNum}</td>
                <td>{item.Description}</td>
                <td>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {item.Journeys.map((journey) => (
                      <li key={journey.Id}>{journey.CustomerName}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {item.Journeys.map((journey) => (
                      <li key={journey.Id}>{journey.TravelStartTime}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {item.Journeys.map((journey) => (
                      <li key={journey.Id}>{journey.TravelEndTime}</li>
                    ))}
                  </ul>
                </td>
                {/* Add other table data cells as needed */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
