import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { AuthProvider } from './contexts/AuthContext';
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
import ProblemSolver from './components/Problems/ProblemSolver';

import LoginPage from './components/Auth/LoginPage';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

import SEO from './components/SEO/SEO';

// Import Admin components
import Login from './components/Admin/Login';
import BlogAdmin from './components/Admin/BlogAdmin';
import BlogEditor from './components/Admin/BlogEditor';

function Home() {
  return (
    <>
      <SEO 
        title="DSA Master - Learn Data Structures & Algorithms Interactively"
        description="Master Data Structures & Algorithms with interactive coding challenges, visualizations, and instant code execution. Practice 30+ problems in JavaScript, Python, Java & C++."
        keywords="data structures, algorithms, coding interview, leetcode practice, coding challenges, DSA"
        path="/"
      />
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
      <AuthProvider>
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
                <Route path="/problems/:problemId" element={<Problems />} />
                <Route path="/problem/:problemId" element={<ProblemSolver />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/blog/new" element={<BlogEditor />} />
                <Route path="/admin/blog/edit/:slug" element={<BlogEditor />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
