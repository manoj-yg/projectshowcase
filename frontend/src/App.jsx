import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import SharedPortfolio from './pages/SharedPortfolio';
import ProjectDetail from './pages/ProjectDetail'; // Add this

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Routes with Header */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path="/projects" element={
            <>
              <Header />
              <Projects />
            </>
          } />
          
          {/* Project Detail Route with Header */}
          <Route path="/project/:id" element={
            <>
              <Header />
              <ProjectDetail />
            </>
          } />
          
          {/* Shared Portfolio Route without Header */}
          <Route path="/shared/:shareId" element={<SharedPortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;