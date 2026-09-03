import { useState } from "react";

import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import ServicesPage from "./pages/ServicesPage";
import LinksPage from "./components/LinksPage";

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

  const isLinksPage =
    window.location.hash === "#/liens";

  if (isLinksPage) {
    return <LinksPage />;
  }

  return (
    <>
      {step === "hero" && (
        <Hero
          onDiscover={goToNeeds}
        />
      )}

      {step === "needs" && (
        <NeedSelector
          onSelect={handleNeedSelect}
        />
      )}

      {step === "services" && (
        <ServicesPage
          need={selectedNeed}
          onSelectNeed={handleNeedSelect}
        />
      )}
    </>
  );
}

export default App;