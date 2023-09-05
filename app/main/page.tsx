import EmailSharing from "@/components/EmailSharing/EmailSharing";
import WelcomSection from "@/components/WelcomeSection/WelcomeSection";

export default async function MainPage() {
  return (
    <>
      <WelcomSection />
      <EmailSharing />
    </>
  );
};