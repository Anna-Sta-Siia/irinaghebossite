import { useState } from "react";
import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import "./App.css";

function App() {
  const [step, setStep] = useState("hero");

  return (
    <>
      {step === "hero" && <Hero onDiscover={() => setStep("needs")} />}
      {step === "needs" && <NeedSelector />}
    </>
  );
}

export default App;