import Header from "@/components/Header";
import ActionBoxes from "@/components/ActionBoxes";
import WhyChooseSection from "@/components/WhyChooseSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <ActionBoxes />
        <WhyChooseSection />
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
