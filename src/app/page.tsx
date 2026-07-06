import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { LocationTeaser } from "@/components/sections/home/LocationTeaser";
import { PartnersMarquee } from "@/components/sections/shared/PartnersMarquee";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { StatsBand } from "@/components/sections/home/StatsBand";
import { ProcessTeaser } from "@/components/sections/home/ProcessTeaser";
import { MobilityBand } from "@/components/sections/home/MobilityBand";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CtaBand } from "@/components/sections/shared/CtaBand";

export const metadata: Metadata = {
  title: "Constatare Daune RCA/CASCO București | VP Service Auto",
  description:
    "Centru de constatare daune RCA/CASCO pe Splaiul Unirii 969, București. Avizăm dauna, întocmim dosarul, reparăm și îți dăm mașină la schimb. Sună acum!",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <LocationTeaser />
      <PartnersMarquee />
      <ServicesOverview />
      <StatsBand />
      <ProcessTeaser />
      <MobilityBand />
      <Testimonials />
      <CtaBand />
    </>
  );
}
