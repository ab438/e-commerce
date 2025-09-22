import Allproducts from "./_components/Allproducts/Allproducts";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import MainSlider from "./_components/MainSlider/MainSlider";
export default function Home(){
  return (
    <>
      <MainSlider/>
      <CategorySlider/>
      <Allproducts/>
    </>
  )
}