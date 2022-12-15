import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../RecipeDetails.css';
import '../FavoriteRecipes.css';

function FavoriteRecipes() {
  const [copied, setCopied] = useState(true);
  const [favoriteBtn, setFavoriteBtn] = useState(false);
  const [favorites, setFavorites] = useState();

  const buttonShareIcon = (id, type) => {
    if (copied) {
      setCopied(false);
    }
    copy(`http://localhost:3000/${type}s/${id}`);
  };

  const buttonDisfavor = (index) => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const remove = storage.filter((_e, i) => i !== index);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    setFavorites(remove);
    setFavoriteBtn(true);
  };

  const buttonMeals = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterMeals = storage.filter((e) => e.type === 'meal');
    setFavorites(filterMeals);
  };

  const buttonDrinks = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterDrinks = storage.filter((e) => e.type === 'drink');
    setFavorites(filterDrinks);
  };

  const buttonAll = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(storage);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(storage);
  }, []);

  useEffect(() => {
    if (favoriteBtn) {
      buttonDisfavor();
    }
  }, [favorites]);

  return (
    <>
      <Header pageName="Favorite Recipes" />
      <div className="button-favorites">
        <button data-testid="filter-by-meal-btn" type="button" onClick={ buttonMeals } className="btn">
          Meals
        </button>
        <button data-testid="filter-by-drink-btn" type="button" onClick={ buttonDrinks } className="btn">
          Drinks
        </button>
        <button data-testid="filter-by-all-btn" type="button" onClick={ buttonAll } className="btn">
          All
        </button>
      </div>
      { favorites?.map((e, i) => (
        e.type === 'meal'
          ? (
            <div key={ i }>
              <Link to={ `/meals/${e.id}` } className="link-fav">
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt={ e.name }
                  className="imgRecipes"
                />
                <h3 data-testid={ `${i}-horizontal-name` } className="name">{ e.name }</h3>
              </Link>
              <p
                data-testid={ `${i}-horizontal-top-text` }
                className="name"
              >
                { `${e.nationality} - ${e.category}` }
              </p>
              <button type="button" onClick={ () => buttonShareIcon(e.id, e.type) }>
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
              </button>
              { copied ? <span /> : <p>Link copied!</p>}
              <button type="button" onClick={ () => buttonDisfavor(i) }>
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>)
          : (
            <div key={ i }>
              <Link to={ `/drinks/${e.id}` } className="link-fav">
                <img
                  data-testid={ `${i}-horizontal-image` }
                  src={ e.image }
                  alt={ e.name }
                  className="imgRecipes"
                />
                <h3 data-testid={ `${i}-horizontal-name` } className="name">{ e.name }</h3>
              </Link>
              <p data-testid={ `${i}-horizontal-top-text` } className="name">{ e.alcoholicOrNot }</p>
              <button type="button" onClick={ () => buttonShareIcon(e.id, e.type) }>
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share"
                />
              </button>
              { copied ? <span /> : <p>Link copied!</p>}
              <button type="button" onClick={ () => buttonDisfavor(i) }>
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>)
      ))}
    </>
  );
}

export default FavoriteRecipes;
