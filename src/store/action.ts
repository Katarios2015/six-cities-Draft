import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer-type';
import {AuthorizationStatus} from '../components/private-route/const';

const Action = {
  SELECT_CITY:'offers/SELECT_CITY',
  LOAD_OFFERS: 'offers/LOAD_OFFERS',
  SORT: 'offers/SORT',
  ACTIVE_OFFER: 'offers/ACTIVE_OFFER',
  CHECK_AUTHORIZATION: 'user/CHECK_AUTHORIZATION',
  SET_ERROR:'offers/SET_ERROR',
  SET_OFFERS_LOADING_STATUS:'data/setOffersLoadingStatus'
};

export const selectCity = createAction(Action.SELECT_CITY, (value:string)=>({
  payload:value
}));

export const loadOffers = createAction<Offers>(Action.LOAD_OFFERS);

export const sortOffers = createAction(Action.SORT, (value:string)=>({
  payload:value
}));

export const hoverOffer = createAction(Action.ACTIVE_OFFER, (value:string)=>({
  payload:value
}));

export const checkAuthorization = createAction<AuthorizationStatus>(Action.CHECK_AUTHORIZATION);

export const setError = createAction<string | null>(Action.SET_ERROR);

export const setOffersLoadingStatus = createAction<boolean>(Action.SET_OFFERS_LOADING_STATUS);
