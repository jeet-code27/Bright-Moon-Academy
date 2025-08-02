import Hero from "@/component/Hero";
import SchoolAdmissionForm from "@/component/SchoolAdmissionForm";



export default function ApplyAddmissionPage() {
  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 pb-60">
      <Hero title="Apply For Admission" />
     <SchoolAdmissionForm/>
      
    </div>
  );
}