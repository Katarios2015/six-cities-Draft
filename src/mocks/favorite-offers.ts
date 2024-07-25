import {Offer} from '../types/offer-type';

export const favoriteOffers:Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: 'luxurious room at great location',
    type: 'room',
    price: 150,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: 'Beautiful & luxurious house at great location',
    type: 'house',
    price: 220,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 1,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: 'Beautiful & luxurious hotel at great location',
    type: 'hotel',
    price: 120,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 7,
    previewImage: 'https://url-to-image/image.png'
  }
];
