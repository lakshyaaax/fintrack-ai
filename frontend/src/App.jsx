import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Backend connection failed ❌");
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>{message}</h1>
    </div>
  );
}

export default App;