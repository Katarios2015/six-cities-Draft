import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer-type';

const Action = {
  SELECT_CITY:'offers/SELECT_CITY',
  LOAD_OFFERS: 'offers/LOAD_OFFERS',
  SORT: 'offers/SORT',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<{offers:Offers}>(Action.LOAD_OFFERS);

export const sortOffers = createAction(Action.SORT, (value:string)=>({
  payload:value
}));

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));
