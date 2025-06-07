import { Header } from "../components/LandingPageComponents/Header";
import { HeroSection } from "../components/LandingPageComponents/HeroSection";
import "../App.css";
import { Solutions } from "../components/LandingPageComponents/SolutionsSection";
export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Solutions />
    </>
  );
}
