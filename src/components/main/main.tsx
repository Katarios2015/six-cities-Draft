//import {useState} from 'react';
import CardsList from '../cards-list/cards-list';
import Logo from '../logo/logo';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {/*Offer, */Offers} from '../../types/offer-type';
import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import Sort from '../sort/sort';
import {useAppSelector} from '../../hooks/index';

import {getOffersByCity, getSortedOffers} from '../main/common';

type MainProps = {
  cities: string[];
  sortTypes: string[];
  actualCity: string;
  offers: Offers;
}

function MainPage({cities, sortTypes, actualCity, offers}: MainProps): JSX.Element {

  /*const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );*/

  const actualSort = useAppSelector((state) => state.sort);
  const filtredOffers = getSortedOffers(getOffersByCity(actualCity, offers),actualSort);

  const cardsCount = filtredOffers.length;

  const activeOffer = useAppSelector((state) => state.activeOffer);
  const selectedOffer = filtredOffers.find((offer) => offer.id === activeOffer);

  return(
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo/>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsCount} {cardsCount > 1 ? 'places' : 'place'} to stay in {actualCity}</b>
              <Sort sortTypes={sortTypes}/>
              <div className="cities__places-list places__list tabs__content">
                <CardsList offers={filtredOffers}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map offers={filtredOffers} selectedOffer={selectedOffer}
                  mapWidth = {'auto'}
                  mapHeight = {'100%'}
                  mapMargin ={'auto'}
                  actualCity = {actualCity}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default MainPage;
