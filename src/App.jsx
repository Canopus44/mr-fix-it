import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Metrics from './components/Metrics.jsx';
import About from './components/About.jsx';
import MissionVision from './components/MissionVision.jsx';
import Values from './components/Values.jsx';
import Strategies from './components/Strategies.jsx';
import OrgChart from './components/OrgChart.jsx';
import HRManagement from './components/HRManagement.jsx';
import FishCulture from './components/FishCulture.jsx';
import Intelligences from './components/Intelligences.jsx';
import Evaluation270 from './components/Evaluation270.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#contenido">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Metrics />
        <About />
        <MissionVision />
        <Values />
        <Strategies />
        <OrgChart />
        <HRManagement />
        <FishCulture />
        <Intelligences />
        <Evaluation270 />
      </main>
      <Footer />
    </div>
  );
}
