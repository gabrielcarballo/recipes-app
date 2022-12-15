import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header pageName="Meals" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
