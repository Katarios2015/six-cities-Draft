import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main/main';
import MainEmpty from '../../pages/main-empty/main-empty';
import {AppRoute} from './const';
import {AuthorizationStatus} from '../private-route/const';
import Favorite from '../../pages/favorite/favorite';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';
import NotFound from '../not-found/not-found';
import Loading from '../../pages/loading/loading';
import {Offers} from '../../types/offer-type';
import {Reviews} from '../../types/review-type';

import {useAppSelector} from '../../hooks/index';

type AppProps = {
  favoriteOffers: Offers;
  reviews: Reviews;
  cities: string[];
  sortTypes: string[];
}

function App({favoriteOffers, reviews, cities, sortTypes}:AppProps) : JSX.Element {
  const actualOffers = useAppSelector((state)=>state.offers);
  const actualCity = useAppSelector((state) => state.city);
  //const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);
  if (/*authorizationStatus === AuthorizationStatus.Unknown ||*/ isOffersLoading) {
    return (
      <Loading />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={actualOffers.length > 0 ? <MainPage cities={cities} sortTypes={sortTypes} actualCity={actualCity} offers={actualOffers}/> : <MainEmpty cities={cities}/>}
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
            element={<Offer reviews={reviews} offers={actualOffers} actualCity={actualCity}/>}
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
