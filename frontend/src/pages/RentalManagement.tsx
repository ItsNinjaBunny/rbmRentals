import { About } from "../components/RentalManagement/About"
import { AllInOne } from "../components/RentalManagement/AllInOne"
import { Hero } from "../components/RentalManagement/Hero"
import { Pricing } from "../components/RentalManagement/Pricing"
import { Support } from "../components/RentalManagement/Support"
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