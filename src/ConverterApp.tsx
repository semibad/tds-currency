import styles from './ConverterApp.module.scss';

import { useState } from 'react'
import { useGetCurrenciesQuery, useLazyGetCurrencyConversionQuery } from './api';

import Conversion from './components/Conversion';
import { AmountInput, CurrencySelect } from './components/ui';

const ConverterApp = () => {
	// local state for our UI
	const [amount, setAmount] = useState('');
	const [fromCurrency, setFromCurrency] = useState('GBP');
	const [toCurrency, setToCurrency] = useState('JPY');

	// fetch any currency data that we need
	const { data: currencies, isLoading } = useGetCurrenciesQuery();
	const [convertTrigger, { data: conversion, isFetching: conversionIsFetching}] = useLazyGetCurrencyConversionQuery()

	// if we don't have a suitable API key, let's call that out
	if (!import.meta.env.VITE_API_KEY) return (
		<div className={styles.HasIssue}>App is missing API key...</div>
	)

	// let's not do anything while the base currencies are loading
	if (!currencies || isLoading) return (
		<div className={styles.HasIssue}>Currency data loading...</div>
	)

	// disable the 'convert' function if necessary; 
	const numericalAmount = Number(amount);
	const isInvalidAmount = isNaN(numericalAmount) || !numericalAmount;
	const isSameCurrency = fromCurrency === toCurrency;

	const disallowConversion = amount === '' 
		|| isInvalidAmount
		|| conversionIsFetching 
		|| isSameCurrency;

	// feedback to the user what they need to do
	let buttonFeedback = `Convert ${amount} ${fromCurrency} to ${toCurrency}`;
	if (isInvalidAmount) buttonFeedback = 'Enter a valid amount to convert from...';
	if (conversionIsFetching) buttonFeedback = 'Converting, hold tight...'
	if (isSameCurrency) buttonFeedback = 'Currencies are the same...'

	return (
		<form className={styles.App}>
			<h1>ConverterApp</h1>

			<AmountInput
				name='amount'
				label='Amount to convert...'
				value={amount}
				onChange={setAmount}
			/>

			<CurrencySelect
				name='from-currency'
				label='Convert from...'
				currencies={currencies}
				value={fromCurrency}
				onChange={setFromCurrency}
			/>

			<CurrencySelect
				name='to-currency'
				label='Convert to...'
				currencies={currencies}
				value={toCurrency}
				onChange={setToCurrency}
			/>

			<Conversion conversion={conversion} isFetching={conversionIsFetching} />

			<button
				className={styles.Button}
				onClick={() => convertTrigger({ from: fromCurrency, to: toCurrency, amount: numericalAmount })}
				disabled={disallowConversion}
			>{ buttonFeedback }</button>
		</form>
	)
}

export { ConverterApp as default };
