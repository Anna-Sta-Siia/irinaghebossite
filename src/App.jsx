import { useState } from "react";

import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import Services from "./components/Services";
import AllServices from "./components/AllServices";

function App() {
  const [step, setStep] = useState("hero");
  const [selectedNeed, setSelectedNeed] = useState(null);

  const handleNeedSelect = (need) => {
    setSelectedNeed(need);
    setStep("services");
  };

  const goToNeeds = () => {
    setStep("needs");
  };

  const goToAllServices = () => {
    setStep("allServices");
  };

  return (
    <>
      {step === "hero" && <Hero onDiscover={goToNeeds} />}

      {step === "needs" && <NeedSelector onSelect={handleNeedSelect} />}

      {step === "services" && (
     <Services
  need={selectedNeed}
  onBack={goToNeeds}
  onShowAllServices={goToAllServices}
  onSelectNeed={handleNeedSelect}
/>
      )}

      {step === "allServices" && (
        <AllServices
          onBack={goToNeeds}
        />
      )}
    </>
  );
}

export default App;