import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header pageName="Drinks" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
