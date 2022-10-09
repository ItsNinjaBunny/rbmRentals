import { About } from "../components/Home/About"
import { AllInOne } from "../components/Home/AllInOne"
import { Hero } from "../components/Home/Hero"
import { Pricing } from "../components/Home/Pricing"
import { Support } from "../components/Home/Support"
import { Footer } from "../components/shared/Footer/Footer"
import { Navbar } from "../components/shared/Navbar/Navbar"

export const RentalManagement = () => {

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