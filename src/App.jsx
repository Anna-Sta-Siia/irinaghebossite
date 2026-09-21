import { useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import LinksPage from "./pages/LinksPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  /* ===========================
     SÉLECTION
  =========================== */

  const [selection, setSelection] =
    useState([]);

  const addToSelection = (item) => {
    setSelection(
      (currentSelection) => {
        const alreadyExists =
          currentSelection.some(
            (selectedItem) =>
              selectedItem.id ===
                item.id &&
              selectedItem.type ===
                item.type
          );

        if (alreadyExists) {
          return currentSelection;
        }

        return [
          ...currentSelection,
          item,
        ];
      }
    );
  };

  const removeFromSelection = (
    id,
    type
  ) => {
    setSelection(
      (currentSelection) =>
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
     ROUTING
  =========================== */

  return (
    <Routes>
      {/* ACCUEIL :
          "/" = Hero
          "/?vue=chemins" = cartes chemins
      */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* SERVICES :
          "/services" = tous les accompagnements
          "/services?besoin=force"
          "/services?besoin=liberte"
          etc.
      */}
<Route
  path="/services"
  element={
    <ServicesPage
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
  }
/>

<Route
  path="/services/:serviceSlug"
  element={
    <ServicesPage
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
  }
/>

      {/* PAGE LIENS */}
      <Route
        path="/liens"
        element={<LinksPage />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;