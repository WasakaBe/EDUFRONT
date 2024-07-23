import React from 'react';
import AppRoutes from "./Routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
};

export default App;
