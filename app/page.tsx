import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import Stage from "@/components/home/Stage";
import BrandMarquee from "@/components/home/BrandMarquee";
import FeaturedPhones from "@/components/home/FeaturedPhones";
import Categories from "@/components/home/Categories";
import Story from "@/components/home/Story";
import Promises from "@/components/home/Promises";
import VisitStore from "@/components/home/VisitStore";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Stage />
        <BrandMarquee />
        <FeaturedPhones />
        <Categories />
        <Story />
        <Promises />
        <VisitStore />
      </main>
      <Footer />
    </>
  );
}
