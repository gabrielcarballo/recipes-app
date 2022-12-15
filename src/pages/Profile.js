import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const getEmail = () => {
    const local = JSON.parse(localStorage.getItem('user'));
    setEmail(local?.email);
  };

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <Header pageName="Profile" />
      <div className="div-profile">
        <p data-testid="profile-email" className="profile-p">{email}</p>
        <div className="div-link">
          <Link to="/done-recipes">
            <button className="profile-button" type="button" data-testid="profile-done-btn">Done Recipes</button>
          </Link>
          <Link to="/favorite-recipes">
            <button className="profile-button" type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
          </Link>
          <button
            className="profile-button"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
