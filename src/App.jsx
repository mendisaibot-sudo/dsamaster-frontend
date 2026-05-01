import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DataStructures from './components/DataStructures/DataStructures';
import Algorithms from './components/Algorithms/Algorithms';
import AlgorithmDetail from './components/Algorithms/AlgorithmDetail';
import DataStructureDetail from './components/DataStructures/DataStructureDetail';
import Problems from './components/Problems/Problems';
import Progress from './components/Progress/Progress';
import Blog from './components/Blog/BlogListing';
import BlogPost from './components/Blog/BlogPost';
import Footer from './components/Footer';
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <DataStructures />
      <Algorithms />
      <Problems />
      <Progress />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/algorithm/:algorithmId" element={<AlgorithmDetail />} />
                <Route path="/datastructure/:dsId" element={<DataStructureDetail />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/datastructures" element={<DataStructures />} />
                <Route path="/algorithms" element={<Algorithms />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
