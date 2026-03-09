import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { apiMockServer } from './test/apiHandlers';
import { AppWithStore } from './test/testUtils';

beforeAll(() => apiMockServer.listen())
afterEach(() => {
    apiMockServer.resetHandlers();
    cleanup();
})
afterAll(() => apiMockServer.close())

describe('Converter App', () => {

    test('smoke test', async () => {
        const { findByText, getByText } = render(<AppWithStore />);
        expect(getByText('Currency data loading...'));
        // wait for it to load
        expect(await findByText('ConverterApp'));
    });

    test('feeds back form status to the user as expected', async () => {
        const { findByText, getByText, getByLabelText, getByDisplayValue } = render(<AppWithStore />);
        const user = userEvent.setup();
        expect(await findByText('ConverterApp'));

        // get our form elements
        const amount = getByLabelText('Amount to convert...');
        const from = getByDisplayValue('Pound Sterling (£)');
        const to = getByDisplayValue('Yen (¥)');

        // default button feedback
        expect(getByText('Enter a valid amount to convert from...'));
        // switch to a valid amount but duplicate currencies
        await user.type(amount, '123');
        await user.selectOptions(to, 'Pound Sterling (£)');
        expect(await findByText('Currencies are the same...'));
        // switch to distinct currency options
        await user.selectOptions(from, 'Yen (¥)');
        expect(await findByText('Convert 123 JPY to GBP'));
    });
    
    test('handles a basic currency conversion', async () => {
        const { getByText, findByText, getByLabelText, getByDisplayValue } = render(<AppWithStore />);
        const user = userEvent.setup();
        expect(await findByText('ConverterApp'));

        // get our form elements
        const amount = getByLabelText('Amount to convert...');
        const from = getByDisplayValue('Pound Sterling (£)');
        const to = getByDisplayValue('Yen (¥)');

        // let's do a conversion
        await user.type(amount, '666');
        await user.selectOptions(from, 'US Dollar ($)');
        await user.selectOptions(to, 'Pound Sterling (£)');
        const button = await findByText('Convert 666 USD to GBP');
        await user.click(button);
        expect(await findByText('Converting, hold tight...'));
        expect(getByText('Converting...'));
        expect(await findByText('$666.00'));
        expect(await findByText('£123.45'));
    });

    test('handles other currency formats', async () => {
        const { findByText, getByLabelText, getByDisplayValue } = render(<AppWithStore />);
        const user = userEvent.setup();
        expect(await findByText('ConverterApp'));

        // get our form elements
        const amount = getByLabelText('Amount to convert...');
        const from = getByDisplayValue('Pound Sterling (£)');

        // let's do a conversion
        await user.type(amount, '5467.12345');
        await user.selectOptions(from, 'Bulgarian Lev (лв)');
        const button = await findByText('Convert 5467.12345 BGN to JPY');
        await user.click(button);
        expect(await findByText('5 467,12лв'));
        expect(await findByText('¥123'));
    });

})