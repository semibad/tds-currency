import { createSelector } from "@reduxjs/toolkit/react";
import currencyAPI from ".";

const selectCurrencyDetails = (shortCode: string) => createSelector(
    currencyAPI.endpoints.getCurrencies.select(),
    (currenciesResponse) => {
        const { data: currencies } = currenciesResponse;
        return currencies?.find(currency => currency.shortCode == shortCode) || null;
    }
)

export { selectCurrencyDetails }