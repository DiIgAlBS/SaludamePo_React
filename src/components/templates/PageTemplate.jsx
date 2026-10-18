import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function PageTemplate({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container my-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export default PageTemplate;