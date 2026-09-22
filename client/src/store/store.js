import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { THEME_STORAGE_KEY } from './slices/uiSlice';
import itineraryReducer, { ITINERARY_STORAGE_KEY } from '../features/itinerary/itinerarySlice';
import authReducer, { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../features/auth/authSlice';

const loadJSON = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage:`, err);
    return undefined;
  }
};

const preloadedItinerary = loadJSON(ITINERARY_STORAGE_KEY);
const preloadedToken = localStorage.getItem(AUTH_TOKEN_KEY);
const preloadedUser = loadJSON(AUTH_USER_KEY);

const preloadedState = {};
if (preloadedItinerary) preloadedState.itinerary = preloadedItinerary;
if (preloadedToken && preloadedUser) {
  preloadedState.auth = { token: preloadedToken, user: preloadedUser };
}

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    itinerary: itineraryReducer,
    auth: authReducer,
  },
  preloadedState: Object.keys(preloadedState).length ? preloadedState : undefined,
});

store.subscribe(() => {
  try {
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(store.getState().itinerary));
  } catch (err) {
    console.warn('Could not save itinerary draft to localStorage:', err);
  }
});

let lastAuthToken = preloadedToken || null;
store.subscribe(() => {
  const { token, user } = store.getState().auth;
  if (token === lastAuthToken) return;
  lastAuthToken = token;

  try {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (err) {
    console.warn('Could not sync auth state to localStorage:', err);
  }
});

let lastTheme = store.getState().ui.theme;
store.subscribe(() => {
  const { theme } = store.getState().ui;
  if (theme === lastTheme) return;
  lastTheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.warn('Could not save theme preference to localStorage:', err);
  }
});

export default store;


