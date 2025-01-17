export const ENV_PATH: string = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}`
  : '.env';

export enum errorMessages {
  ALBUM_NOT_FOUND = 'Album has not been found',
  ARTIST_NOT_FOUND = 'Artist has not been found',
  LOGIN_FAIL_CREDENTIAL = 'Incorrect login or password',
  LOGIN_SUCCESS = 'Successful login',
  SHOULD_NOT_BE_EMPTY = 'Field should not be empty',
  SIGNUP_SUCCESS = 'Successful signup',
  TRACK_NOT_FOUND = 'Track has not been found',
  USER_ALREADY_EXISTS = 'User already exists',
  USER_IS_NOT_AUTHORIZED = 'User is not authorized',
  USER_NOT_FOUND = 'User has not been found',
  USER_WRONG_PASSWORD = 'Wrong password',
}

export const DEFAULT_CRYPT_SALT = 5;

export const minLoginLength = 3;
export const maxLoginLength = 255;

export const minPasswordLength = 3;
export const maxPasswordLength = 30;

export const randomUUID = '0a35dd62-e09f-444b-a628-f4e7c6954f57';

export const ROUTES = {
  ALBUM: 'album',
  ARTIST: 'artist',
  AUTH: 'auth',
  FAVORITES: 'favs',
  TRACK: 'track',
  USER: 'user',
};
