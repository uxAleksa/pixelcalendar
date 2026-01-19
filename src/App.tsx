import { useState } from "react";
import CalendarScreen from "./components/CalendarScreen";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen setIsLoading={setIsLoading} />;
  }

  return <CalendarScreen />;
}

export default App;