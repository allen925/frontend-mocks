import Carousel from './components/Carousel'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/main.scss';

function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main style={{ display: "flex", justifyContent: "center" }}>
        <Carousel />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
