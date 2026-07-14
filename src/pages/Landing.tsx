import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection from "@/features/landing/HeroSection";
import StatsSection from "@/features/landing/StatsSection";
import CategoriesSection from "@/features/landing/CategoriesSection";
import FreelancersSection from "@/features/landing/FreelancersSection";
import HowItWorksSection from "@/features/landing/HowItWorksSection";
import RealTimeFeaturesSection from "@/features/landing/RealTimeFeaturesSection";
import TestimonialsSection from "@/features/landing/TestimonialsSection";
import ArticlesSection from "@/features/landing/ArticlesSection";
import CTASection from "@/features/landing/CTASection";

export default function Landing() {
    return (
        <>
            <Navbar />

            <HeroSection />
            <StatsSection />
            <CategoriesSection />
            <FreelancersSection />
            <HowItWorksSection />
            <RealTimeFeaturesSection />
            <TestimonialsSection />
            <ArticlesSection />
            <CTASection />

            <Footer />
        </>
    );
}

export { Landing }