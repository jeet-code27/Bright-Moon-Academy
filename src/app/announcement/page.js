import Hero from "@/component/Hero";
import UserNoticesDisplay from "@/component/Notices";


export default function AnnouncementPage() {
  return (
    <div className="pb-60 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Hero title="Annoucement" />
      {/* <PublicNotices/> */}
      <UserNoticesDisplay/>
      
    </div>
  );
}