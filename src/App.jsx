import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";

function App() {
  const [isAllowed, setIsAllowed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch("https://boolean-api.vercel.app/api/get");
        const data = await response.json();
        setIsAllowed(data.result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error calling API:", error);
        setIsAllowed(false);
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (isLoading) {
    return <div className="App"></div>;
  }

  return (
    <div className="App">
      {isAllowed ? (
        <MainPage />
      ) : (
        <div
          className="error-message"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff0000",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Access Denied! Please contact the developer.
        </div>
      )}
    </div>
  );
}

export default App;
