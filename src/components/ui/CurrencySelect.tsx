import { type CurrencyType } from "../../api/types";
import InputWrapper from "./InputWrapper";
import style from './inputs.module.scss';

export type CurrencySelectProps = {
	name: string;
	label: string;
	currencies: CurrencyType[];
	value: string;
	onChange: (a: string) => void;
}

const CurrencySelect = ({ name, label, currencies, value, onChange }: CurrencySelectProps) => (
	<InputWrapper name={name} label={label}>
		<div className={style.SelectWrapper}>
			<select
				name={name}
				id={name}
				value={value}
				onChange={(e) => onChange(e.currentTarget.value)}
				className={style.Select}
			>
				{ currencies && currencies.map((currency) => (
					<option value={currency.shortCode} key={`${currency.name}-${currency.shortCode}`}>
						{ currency.name } ({ currency.symbol })
					</option>
				))}
			</select>
		</div>
	</InputWrapper>
);

export { CurrencySelect as default };