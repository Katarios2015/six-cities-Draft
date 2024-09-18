import {offers} from '../../mocks/offers';
import {createReducer} from '@reduxjs/toolkit';
import {selectCity, loadOffers, sortOffers, hoverOffer} from '../action';
import {INITIAL_CITY, INITIAL_SORT} from './const';

const initialState = {
  city: INITIAL_CITY,
  offers,
  sort: INITIAL_SORT,
  activeOffer: ''
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state) => {
      state.offers = offers;
    })
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sortOffers, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(hoverOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export {reducer};
