import Hero from "@/component/Hero";
import UserNoticesDisplay from "@/component/Notices";


export default function AnnouncementPage() {
  return (
    <div>
      <Hero title="Annoucement" />
      {/* <PublicNotices/> */}
      <UserNoticesDisplay/>
      
    </div>
  );
}