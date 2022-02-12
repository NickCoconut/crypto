import { configureStore } from '@reduxjs/toolkit';
import { defaultFormatUtc } from 'moment';
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});

