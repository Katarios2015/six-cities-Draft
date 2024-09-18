
import {Offers} from '../../types/offer-type';
import {SortTypes} from '../sort/const';

export const getOffersByCity = (city:string, offers:Offers):Offers=>{
  const offersByCity = offers.filter((offer)=>
    offer.city.name === city);
  return offersByCity;
};

export const getSortedOffers = (offers:Offers, sortType:string):Offers=>{
  const slicedOffers = [...offers];
  switch(sortType){
    case SortTypes.POPULAR:
      return offers;

    case SortTypes.PRICE_FROM_LOW:
      slicedOffers.sort((a, b)=>a.price - b.price);
      return slicedOffers;

    case SortTypes.PRICE_FROM_HIGH:
      slicedOffers.sort((a, b)=>b.price - a.price);
      return slicedOffers;

    case SortTypes.RATING:
      slicedOffers.sort((a, b)=>b.rating - a.rating);
      return slicedOffers;

    default:
      return offers;
  }
};

