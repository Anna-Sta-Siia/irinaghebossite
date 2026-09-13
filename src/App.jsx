import { useState } from "react";

import Hero from "./components/Hero";
import NeedSelector from "./components/NeedsSelector";
import ServicesPage from "./pages/ServicesPage";
import LinksPage from "./components/LinksPage";
import Loader from "./components/Loader";

function App() {
  const [step, setStep] =
    useState("hero");

  const [selectedNeed, setSelectedNeed] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(false);

  /* ===========================
     SÉLECTION
  =========================== */

  const [selection, setSelection] =
    useState([]);

  const addToSelection = (item) => {
    setSelection((currentSelection) => {
      const alreadyExists =
        currentSelection.some(
          (selectedItem) =>
            selectedItem.id === item.id &&
            selectedItem.type === item.type
        );

      if (alreadyExists) {
        return currentSelection;
      }

      return [
        ...currentSelection,
        item,
      ];
    });
  };

  const removeFromSelection = (
    id,
    type
  ) => {
    setSelection((currentSelection) =>
      currentSelection.filter(
        (item) =>
          !(
            item.id === id &&
            item.type === type
          )
      )
    );
  };

  const clearSelection = () => {
    setSelection([]);
  };

  /* ===========================
     NAVIGATION
  =========================== */

  const runWithLoader = (
    callback,
    delay = 450
  ) => {
    setIsLoading(true);

    window.setTimeout(() => {
      callback();

      setIsLoading(false);
    }, delay);
  };

  const handleNeedSelect = (need) => {
    runWithLoader(() => {
      setSelectedNeed(need);

      setStep("services");
    });
  };

  const goToNeeds = () => {
    runWithLoader(() => {
      setStep("needs");
    });
  };

  const isLinksPage =
    window.location.hash === "#/liens";

  if (isLinksPage) {
    return <LinksPage />;
  }

  return (
    <>
      {isLoading && (
        <Loader
          fullscreen
          label="Préparation de votre espace…"
        />
      )}

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

          selection={selection}

          onAddToSelection={
            addToSelection
          }

          onRemoveFromSelection={
            removeFromSelection
          }

          onClearSelection={
            clearSelection
          }
        />
      )}
    </>
  );
}

export default App;