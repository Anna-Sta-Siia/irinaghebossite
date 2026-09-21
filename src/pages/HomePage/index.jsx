import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Hero from "../../components/Hero";
import NeedSelector from "../../components/NeedsSelector";
import BodyPaths from "../../components/BodyPaths";
import Loader from "../../components/Loader";

import "./index.css";

function HomePage() {
  const [isLoading, setIsLoading] =
    useState(false);

  const [
    isBodyPathsPlaying,
    setIsBodyPathsPlaying,
  ] = useState(false);

  const navigate = useNavigate();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const showPaths =
    searchParams.get("vue") ===
    "chemins";

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

  /* ===========================
     HERO → BODYPATHS
  =========================== */

  const goToNeeds = () => {
    runWithLoader(() => {
      setIsBodyPathsPlaying(true);
    });
  };

  /* ===========================
     BODYPATHS → CARTES
  =========================== */

  const handleBodyPathsFinished =
    () => {
      setIsBodyPathsPlaying(false);

      setSearchParams(
        {
          vue: "chemins",
        },
        {
          replace: false,
        }
      );
    };

  /* ===========================
     CARTES → SERVICES
  =========================== */

  const handleNeedSelect = (
    need
  ) => {
    runWithLoader(() => {
      navigate(
        `/services?besoin=${need}`
      );
    });
  };

  return (
    <>
      {isLoading && (
        <Loader
          fullscreen
          label="Préparation de votre espace…"
        />
      )}

      {/* HERO */}
      {!showPaths &&
        !isBodyPathsPlaying && (
          <Hero
            onDiscover={goToNeeds}
          />
        )}

      {/* TRANSITION LOGO */}
      {!showPaths &&
        isBodyPathsPlaying && (
          <section className="home-paths-intro">
            <BodyPaths
              onFinished={
                handleBodyPathsFinished
              }
            />
          </section>
        )}

      {/* CARTES CHEMINS */}
      {showPaths && (
        <NeedSelector
          onSelect={
            handleNeedSelect
          }
        />
      )}
    </>
  );
}

export default HomePage;