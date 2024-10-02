import CardsList from '../../components/cards-list/cards-list';

import Header from '../../components/header/header';
import {Helmet} from 'react-helmet-async';
import {Offers} from '../../types/offer-type';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import {useAppSelector} from '../../hooks/index';

import {getOffersByCity, getSortedOffers} from '../main/common';


type MainProps = {
  cities: string[];
  sortTypes: string[];
  actualCity: string;
  offers: Offers;
}

function MainPage({cities, sortTypes, actualCity, offers}: MainProps): JSX.Element {
  const actualSort = useAppSelector((state) => state.sort);
  const filtredOffers = getSortedOffers(getOffersByCity(actualCity, offers),actualSort);

  const cardsCount = filtredOffers.length;

  const activeOfferId = useAppSelector((state) => state.activeOfferId);
  const selectedOffer = filtredOffers.find((offer) => offer.id === activeOfferId);

  return(
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>
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
