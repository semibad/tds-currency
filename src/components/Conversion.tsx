import style from './Conversion.module.scss';

import { useSelector } from "react-redux";
import { selectCurrencyDetails } from "../api/selectors";

type CurrencyValueProps = {
    shortCode: string;
    value: number;
}

const CurrencyValue = ({ shortCode, value }: CurrencyValueProps) => {
    const currencyDetails = useSelector(selectCurrencyDetails(shortCode));
    if (!currencyDetails) return <span>Unknown currency</span>

    const { symbol, isPrefix, seperator, mark, precision } = currencyDetails;
    const [baseValue, decimalValue] = new Intl.NumberFormat(
        'en-GB', 
        { 
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
            // @ts-expect-error: roundingMode is a well-supported property
            // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
            roundingMode: 'floor'
        }
    ).format(value).split('.');
    const formattedBase = baseValue.replaceAll(',', seperator);
    const formattedDecimal = decimalValue ? `${mark}${decimalValue}` : '';
    const formattedValue = `${formattedBase}${formattedDecimal}`;
    const valueWithSymbol = isPrefix ? `${symbol}${formattedValue}` : `${formattedValue}${symbol}`
    return <span dir='ltr'>{valueWithSymbol}</span>
};

type ConversionResponse = {
    amount: number;
    value: number;
    from: string;
    to: string;
} | undefined;

type ConversionProps = { conversion: ConversionResponse; isFetching: boolean; }

const Conversion = ({ conversion, isFetching }: ConversionProps) => {
    if (isFetching) return <div className={style.Conversion}>Converting...</div>;
    if (!conversion) return <div className={style.Conversion}>...</div>;
    const { amount, value, from, to } = conversion;

    return (
        <div className={style.Conversion}>
            <CurrencyValue shortCode={from} value={amount} /> = <CurrencyValue shortCode={to} value={value} />
        </div>
    )
}

export { Conversion as default }