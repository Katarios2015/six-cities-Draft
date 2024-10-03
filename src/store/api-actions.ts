import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Offers, OfferPage, Login} from '../types/offer-type.js';
import {loadOffers, loadOffer,checkAuthorization, setError, setOffersLoadingStatus, redirectToRoute, login} from './action.js';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from './const';
import {AppRoute} from '../components/app/const';
import {AuthData} from '../types/auth-type.js';
import {UserData} from '../types/user-data-type.js';

import {store} from './';

export const clearErrorAction = createAsyncThunk(
  'offers/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/offer',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoadingStatus(true));
      const {data} = await api.get<OfferPage>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOffer(data));
      dispatch(setOffersLoadingStatus(false));
    } catch {
      dispatch(setOffersLoadingStatus(true));
    }
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(checkAuthorization(AuthorizationStatus.Auth));
      const {data} = await api.get<Login>(APIRoute.Login);
      dispatch(login(data.email));
    } catch {
      dispatch(checkAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(checkAuthorization(AuthorizationStatus.Auth));
    dispatch(login(email));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(checkAuthorization(AuthorizationStatus.NoAuth));
  },
);
