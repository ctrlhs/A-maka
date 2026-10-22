import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { RoutesSection } from './components/RoutesSection';
import { LandmarksSection } from './components/LandmarksSection';
import { FeaturesSection } from './components/FeaturesSection';
import { SeerahSection } from './components/seerah/SeerahSection';
import { PilgrimGuide } from './components/PilgrimGuide';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import type { PackageItem } from './types';

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('packages');
  const [selectedRoute, setSelectedRoute] = useState('مسار رحلة العمرة من أسوان إلى المملكة (15 يومًا)');
  const [selectedPackage, setSelectedPackage] = useState('باقة تشمل الوجبات');

  // Ensure the page always opens from the very top on load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['packages', 'routes', 'landmarks', 'features', 'seerah-guide', 'guide', 'booking'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 75;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackage(pkg.name);
    scrollToSection('booking');
  };

  const handleSelectRoute = (routeTitle: string) => {
    setSelectedRoute(routeTitle);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#1a2e26] flex flex-col font-sans" dir="rtl">
      {/* Top Navigation */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onExplorePackages={() => scrollToSection('packages')}
          onBookNow={() => scrollToSection('booking')}
          onViewRoute={() => scrollToSection('routes')}
        />

        {/* 2. About Journey */}
        <AboutSection />

        {/* 3. Packages Section */}
        <PackagesSection onSelectPackage={handleSelectPackage} />

        {/* 4. Routes Section */}
        <RoutesSection onSelectRoute={handleSelectRoute} />

        {/* 5. Holy Landmarks Gallery */}
        <LandmarksSection />

        {/* 6. Why Choose Us / Features */}
        <FeaturesSection />

        {/* 7. Seerah Guide (مرشد السيرة النبوية) */}
        <SeerahSection />

        {/* 8. Pilgrim Guide & FAQ */}
        <PilgrimGuide />

        {/* 9. Booking & Inquiry Form */}
        <BookingForm
          initialRoute={selectedRoute}
          initialPackage={selectedPackage}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Call & WhatsApp Actions */}
      <FloatingActions />
    </div>
  );
}

export default App;
