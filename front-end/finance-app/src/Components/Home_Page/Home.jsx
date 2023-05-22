import Footer from "./Home_Components/Footer/Footer";
import Header from "./Home_Components/Header/Header";
import NewsRoom from "./Home_Components/NewsRoom/NewsRoom";
import SignUp from "./Home_Components/SignUp/SignUp";
import MySlider from "./Home_Components/Slider/Slider";
import WhyChoose from "./Home_Components/Why_Choose/Why_Choose";

function HomePage() {
    return (
      <>
          <Header />
          <MySlider />
          <WhyChoose />
          <NewsRoom />
          <SignUp />
          <Footer />
      </>
    );
  }
export default HomePage;