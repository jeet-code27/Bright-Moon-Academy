import ActivitiesSection from "@/component/ActivitiesSection";
import FAQSection from "@/component/FAQSection";
import HeroSection from "@/component/HeroSection";
import LearningOpportunitiesSection from "@/component/LearningOpportunitiesSection";
import SchoolSection from "@/component/SchoolSection";
import TestimonialsSection from "@/component/TestimonialsSection";


export default function Home() {
  return (
   <>
   <HeroSection />
   <SchoolSection/>
   <LearningOpportunitiesSection/>
   <ActivitiesSection/>
   <TestimonialsSection/>
   <FAQSection/>
   </>
  );
}
