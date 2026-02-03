import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiStepSearch from "@/components/MultiStepSearch/MultiStepSearch";

const MultiSearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0 px-4 pt-8">
        <MultiStepSearch />
      </main>

      <Footer />
    </div>
  );
};

export default MultiSearchPage;
