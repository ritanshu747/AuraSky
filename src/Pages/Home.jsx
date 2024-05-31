import CallToAction from "../components/CallToAction/CallToAction";
import ContactForm from "../components/ContactForm";
import Flags from "../components/Flags/Flags";
import Hero from "../components/Hero/Hero";
import WeatherCardGeolocation from "../components/WeatherCardGeolocation/WeatherCardGeolocation";
function Home() {
  window.scrollTo(0, 0);
  return (
    <>
      <Hero />
      <Flags />
      <WeatherCardGeolocation />
      <CallToAction />
      <ContactForm />
    </>
  );
}

export default Home;
