import {Helmet} from 'react-helmet-async';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import CardsList from '../../components/cards-list/cards-list';
import {Reviews} from '../../types/review-type';
import {Offers} from '../../types/offer-type';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';

import {getStarsStyle} from '../../components/place-card/const';


import Header from '../../components/header/header';

type OfferProps = {
  reviews: Reviews;
  offers: Offers;
  actualCity: string;
}

function Offer(props:OfferProps): JSX.Element {
  const {reviews, offers, actualCity} = props;
  const params = useParams();
  const offersNear = offers.slice(0,3);
  const activeOffer = params.id;
  const selectedOffer = offers.find((offer) => offer.id === activeOffer);

  const offer = useAppSelector((state) => state.offer);
  const {id, bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type} = offer;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                images.map((srcImg)=>(
                  <div key={`img-${id}`} className="offer__image-wrapper">
                    <img
                      className="offer__image"
                      src={srcImg}
                      alt={`Photo ${type}`}
                    />
                  </div>

                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                {isPremium ? <span>Premium</span> : ''}
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={isFavorite ? 'offer__bookmark-button button offer__bookmark-button--active' : 'offer__bookmark-button button'} type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width:getStarsStyle(rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms > 0 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
              Max {maxAdults} {maxAdults > 0 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&#39;s inside </h2>
                <ul className="offer__inside-list">
                  {goods.map((good)=>(
                    <li key={good} className="offer__inside-item">{good}</li>))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  <span className="offer__user-status">{host.isPro ? 'Pro' : ''}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm/>
              </section>
            </div>
          </div>
          <section className="offer__map map" >
            <Map offers={offersNear}
              selectedOffer={selectedOffer}
              mapWidth = {'1145px'}
              mapHeight = {'579px'}
              mapMargin ={'auto'}
              actualCity={actualCity}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <CardsList offers={offersNear}/>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default Offer;
