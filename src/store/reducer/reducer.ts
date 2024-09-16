import {offers} from '../../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers} from '../action';
import {Offers} from '../../types/offer-type';

const getOffersByCity = (city:string):Offers=>{
  const offersByCity = offers.filter((offer)=>
    offer.city.name === city);
  return offersByCity;
};

const INITIAL_CITY = 'Paris';

const initialState = {
  city: INITIAL_CITY,
  offers: getOffersByCity(INITIAL_CITY),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state) => {
      state.offers = offers;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
      state.offers = getOffersByCity(action.payload);
    });
});

export {reducer};
