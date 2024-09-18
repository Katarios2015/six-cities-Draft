import {Link} from 'react-router-dom';
import {AppRoute} from '../app/const';
import {Offer} from '../../types/offer-type';
import {getStarsStyle} from './const';
import {MouseEvent} from 'react';
import {useAppDispatch} from '../../hooks/index';
import {hoverOffer} from '../../store/action';
type PropPlaceCard = {
  offer: Offer;
}


function PlaceCard(props: PropPlaceCard): JSX.Element {

  const {offer} = props;
  const {id, title, type, price, isPremium, isFavorite, rating, previewImage} = offer;
  const dispatch = useAppDispatch();

  function handleMouseOver(event: MouseEvent<HTMLLIElement>) {
    event.preventDefault();
    if(event.currentTarget.dataset.id) {
      dispatch(hoverOffer(event.currentTarget.dataset.id));
    }
  }
  function handleMouseOut() {
    dispatch(hoverOffer(''));
  }

  return (
    <article
      className="cities__card place-card"
      data-id={id}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">
          /&nbsp;night
            </span>
          </div>
          <button
            className= {isFavorite ?
              'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:getStarsStyle(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#">
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
