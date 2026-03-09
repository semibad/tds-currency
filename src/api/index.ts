import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { type CurrenciesResponse, type ConversionResponse, type CurrencyType } from './types';

const currencyAPI = createApi({
    reducerPath: 'currencyAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.currencybeacon.com/v1',
        prepareHeaders: (headers) => {
            headers.set('Host', 'api.currencybeacon.com');
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_API_KEY}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        getCurrencyConversion: build.query<ConversionResponse, { from: string, to: string, amount: number }>({
            query: ({ from, to, amount }) => `convert?from=${from}&to=${to}&amount=${amount}`
        }),
        getCurrencies: build.query<CurrencyType[], void>({
            query: () => 'currencies',
            transformResponse: (response: CurrenciesResponse) => (
                response.response.map(({ id, name, short_code, precision, subunit, symbol, symbol_first, decimal_mark, thousands_separator }) => (
                    {
                        id,
                        name,
                        shortCode: short_code,
                        precision,
                        subunit,
                        symbol,
                        isPrefix: symbol_first,
                        mark: decimal_mark,
                        seperator: thousands_separator
                    }
                )))
        })
    })
});

const { useLazyGetCurrencyConversionQuery, useGetCurrenciesQuery } = currencyAPI;

export {
    currencyAPI as default,
    useLazyGetCurrencyConversionQuery,
    useGetCurrenciesQuery,
}