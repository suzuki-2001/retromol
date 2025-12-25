import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProteinGallery from '@/components/ProteinGallery';
import PdbInput from '@/components/PdbInput';
import HeroBackground from '@/components/HeroBackground';
import TypewriterTitle from '@/components/TypewriterTitle';
import { SAMPLE_PROTEINS } from '@/data/sampleProteins';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col grid-pattern">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 text-center relative overflow-hidden">
        <HeroBackground />
        <div className="max-w-3xl mx-auto relative z-10">
          <TypewriterTitle />
          <p className="text-white/50 text-base md:text-lg mb-10 max-w-md mx-auto">
            Transform PDB structures into retro-style molecular icons
          </p>
          <PdbInput />
        </div>
      </section>

      {/* Gallery */}
      <main className="flex-1 px-6 md:px-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <ProteinGallery proteins={SAMPLE_PROTEINS} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
