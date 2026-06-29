import { useState } from "react";

import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import Services from "./components/Services";

function App() {
  const [step, setStep] = useState("hero");
  const [selectedNeed, setSelectedNeed] = useState(null);

  return (
    <>
      {step === "hero" && <Hero onDiscover={() => setStep("needs")} />}

      {step === "needs" && (
        <NeedSelector
          onSelect={(need) => {
            setSelectedNeed(need);
            setStep("services");
          }}
        />
      )}

      {step === "services" && (
        <Services
          need={selectedNeed}
          onBack={() => setStep("needs")}
        />
      )}
    </>
  );
}

export default App;