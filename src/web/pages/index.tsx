import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EntryPoints from '@/components/EntryPoints';
import PhotoStrip from '@/components/PhotoStrip';
import About from '@/components/About';
import Community from '@/components/Community';
import Donate from '@/components/Donate';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <EntryPoints />
      <PhotoStrip />
      <About />
      <Community />
      <Donate />
      <Footer />
    </main>
  );
}
