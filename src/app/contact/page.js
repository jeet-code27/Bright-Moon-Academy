import ContactForm from "@/component/ContactForm";
import ContactInfo from "@/component/ContactInfo";
import ContactSchoolLocation from "@/component/ContactSchoolLocation";
import Hero from "@/component/Hero";


export default function ContactUsPage() {
    return(
        <div className="bg-white">
        <Hero title="Contact us" />
        <div className="bg-[#FBF9F0]">
        <ContactInfo/>
        </div>
        
        <ContactSchoolLocation/>
       <div className="bg-[#FFCF55]">
       <ContactForm/>
       </div>
        </div>
    )
}