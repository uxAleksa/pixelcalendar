import { useState } from "react";
import CalendarScreen from "./components/CalendarScreen";
import LoadingScreen from "./components/LoadingScreen";
import NotesHistoryScreen from "./components/NotesHistoryScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState<"calendar" | "history">("calendar");

  if (isLoading) {
    return <LoadingScreen setIsLoading={setIsLoading} />;
  }

  if (screen === "history") {
    return <NotesHistoryScreen onBack={() => setScreen("calendar")} />;
  }

  return <CalendarScreen onOpenHistory={() => setScreen("history")} />;
}

export default App;