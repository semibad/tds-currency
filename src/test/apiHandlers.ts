import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const baseUrl = 'https://api.currencybeacon.com/v1';

const metaMock = {
    "code": 200,
    "disclaimer": "Meta meta meta"
}

const currenciesMock = [
    {
        "id": 14,
        "name": "Bulgarian Lev",
        "short_code": "BGN",
        "code": "975",
        "precision": 2,
        "subunit": 100,
        "symbol": "\u043b\u0432",
        "symbol_first": false,
        "decimal_mark": ",",
        "thousands_separator": " "
    },
    {
        "id": 49,
        "name": "Pound Sterling",
        "short_code": "GBP",
        "code": "826",
        "precision": 2,
        "subunit": 100,
        "symbol": "\u00a3",
        "symbol_first": true,
        "decimal_mark": ".",
        "thousands_separator": ","
    },
    {
        "id": 70,
        "name": "Yen",
        "short_code": "JPY",
        "code": "392",
        "precision": 0,
        "subunit": 1,
        "symbol": "\u00a5",
        "symbol_first": true,
        "decimal_mark": ".",
        "thousands_separator": ","
    },
    {
        "id": 147,
        "name": "US Dollar",
        "short_code": "USD",
        "code": "840",
        "precision": 2,
        "subunit": 100,
        "symbol": "$",
        "symbol_first": true,
        "decimal_mark": ".",
        "thousands_separator": ","
    }
]

const convertMock = {
    "date": "2026-01-01",
    "from": "USD",
    "to": "GBP",
    "amount": 666,
    "value": 123.45678
}
 
const handlers = [
    http.get(`${baseUrl}/currencies`, () => {
        return HttpResponse.json({
            meta: metaMock,
            response: currenciesMock
        })
    }),
    http.get(`${baseUrl}/convert`, ({ request }) => {
        const url = new URL(request.url)
        const from = url.searchParams.get('from');
        const to = url.searchParams.get('to');
        const amount = url.searchParams.get('amount');

        return HttpResponse.json({ ...convertMock, from, to, amount })
    })
]

const apiMockServer = setupServer(...handlers);

export { apiMockServer, handlers }