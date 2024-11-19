import NavbarBanner from "../../components/Navbar/NavbarBanner";
import Hero from "../../components/Hero/Hero";
import NumberCounter from "../../components/NumberCounter/NumberCounter";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Testimonial from "../../components/Testimonial/Testimonial";

const HomePage = () => {
    return (
        <>
            <NavbarBanner />
            <Hero />
            <NumberCounter />
            <WhyChooseUs />
            <Testimonial />
        </>
    )
}

export default HomePage;