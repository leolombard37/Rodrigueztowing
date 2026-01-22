import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import GallerySection from "@/components/sections/GallerySection";
import Reviews from "@/components/sections/Reviews";
import Locations from "@/components/sections/Locations";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <GallerySection />
      <Reviews />
      <Locations />
    </>
  );
}
