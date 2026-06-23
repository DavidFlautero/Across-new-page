import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import HomeCorporateFinal from "@/components/sections/HomeCorporateFinal";
import HomeTabletHeroButtonsFixer from "@/components/HomeTabletHeroButtonsFixer";

export default function HomePage() {
  return (
    <div className="page-shell">
      <Header />

      <main style={{ background: "#F3EFE8" }}>
        <Hero />
        <HomeCorporateFinal />
        <HomeTabletHeroButtonsFixer />
        </main>

      <Footer />
    </div>
  );
}
