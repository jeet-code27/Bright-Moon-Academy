
import Hero from "@/component/Hero";
import ProgramsSection from "@/component/ProgramsSection";


export default function Program() {
    return(
        <>
        <Hero title="Programs" />
        <div className="pb-60 bg-gray-50">
       <ProgramsSection/>
       </div>
        </>
    )
}