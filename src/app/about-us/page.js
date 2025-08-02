import Hero from "@/component/Hero";
import GirlChildAdmissionBanner from "@/component/GirlChildAdmissionBanner";
import LearningPathsSection from "@/component/LearningPathsSection";
import MissionVisionSection from "@/component/MissionVisionSection";


export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <Hero title="About us" />
      <MissionVisionSection/>
      <LearningPathsSection/>
      <GirlChildAdmissionBanner/>
      
      {/* Other components can be added here */}
    </div>
  );
}
