import { Hero, Loader, Nav } from "@/components/site/intro";
import { About, Bands, Capabilities } from "@/components/site/about";
import { Experience, Impact, Venture, Work } from "@/components/site/work";
import { Contact, Stack } from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Bands />
        <About />
        <Capabilities />
        <Experience />
        <Venture />
        <Work />
        <Impact />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
