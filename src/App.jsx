import React, { useState } from 'react';
import Header from './components/FormPage/Header';
import UserForm from './components/FormPage/UserForm';
import Footer from './components/FormPage/Footer';
import Modal from './components/FormPage/Modal';
import './App.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFormSubmit = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header />
      <UserForm onSubmit={handleFormSubmit} />
      {isModalVisible && <Modal onClose={handleCloseModal} />}
      <Footer />
    </>
  );
}

export default App;
