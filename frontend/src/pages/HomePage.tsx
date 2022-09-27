import { Navbar } from '../components/shared/Navbar/Navbar';
import { Footer } from '../components/shared/Footer/Footer';
import { Hero } from '../components/Home/Hero';
import { About } from '../components/Home/About';
import { Support } from '../components/Home/Support';
import { AllInOne } from '../components/Home/AllInOne';
import { Pricing } from '../components/Home/Pricing';

export const HomePage = () => {

    return (
        <>  
            <Navbar />
            <Hero />
            <About />
            <Support />
            <AllInOne />
            <Pricing />
            <Footer />
        </>
    )
}