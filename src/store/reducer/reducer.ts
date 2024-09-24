//import {offers} from '../../mocks/offers';
import {Offers} from '../../types/offer-type';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers, sortOffers, hoverOffer, checkAuthorization, setError, setOffersLoadingStatus} from '../action';
import {INITIAL_CITY, INITIAL_SORT} from './const';
import {AuthorizationStatus} from '../../components/private-route/const';


type InitalState = {
  city: string;
  sort: string;
  offers: Offers;
  activeOfferId: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersLoading: boolean;
}

const initialState:InitalState = {
  city: INITIAL_CITY,
  offers: [],
  sort: INITIAL_SORT,
  activeOfferId: '',
  authorizationStatus: AuthorizationStatus.Auth,
  error: null,
  isOffersLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(hoverOffer, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(checkAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    });
});

export {reducer};
