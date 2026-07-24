import { useState } from "react";

import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import Services from "./components/Services";

function App() {
  const [step, setStep] = useState("hero");
  const [selectedNeed, setSelectedNeed] =
    useState(null);

  const handleNeedSelect = (need) => {
    setSelectedNeed(need);
    setStep("services");
  };

  const goToNeeds = () => {
    setStep("needs");
  };

  return (
    <>
      {step === "hero" && (
        <Hero onDiscover={goToNeeds} />
      )}

      {step === "needs" && (
        <NeedSelector
          onSelect={handleNeedSelect}
        />
      )}

      {step === "services" && (
        <Services
          need={selectedNeed}
          onBack={goToNeeds}
          onSelectNeed={handleNeedSelect}
        />
      )}
    </>
  );
}

export default App;