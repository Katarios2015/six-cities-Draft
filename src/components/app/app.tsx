import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../main/main';
import MainEmpty from '../main-empty/main-empty';
import {AppRoute} from './const';
import {AuthorizationStatus} from '../private-route/const';
import Favorite from '../favorite/favorite';
import Login from '../login/login';
import Offer from '../offer/offer';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../not-found/not-found';

import {Offers} from '../../types/offer-type';
import {Reviews} from '../../types/review-type';

import {useAppSelector} from '../../hooks/index';

type AppProps = {
  //cardsCount: number;
  offers: Offers;
  favoriteOffers: Offers;
  reviews: Reviews;
  cities: string[];
}

function App({offers, favoriteOffers, reviews, cities}:AppProps) : JSX.Element {
  const actualOffers = useAppSelector((state)=>state.offers);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={actualOffers.length > 0 ? <MainPage cities={cities}/> : <MainEmpty cities={cities}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<Login/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                status={AuthorizationStatus.Auth}
              >
                <Favorite favoriteOffers={favoriteOffers}/>
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<Offer reviews={reviews} offers={offers}/>}
          />
          <Route
            path='*'
            element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
