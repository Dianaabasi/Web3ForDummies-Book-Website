import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BookContentSection } from "@/components/book-content-section"
import { AuthorSection } from "@/components/author-section"
import { Footer } from "@/components/footer"
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BookContentSection />
      <AuthorSection />
      <Footer />
    </div>
  );
};

export default Index;
