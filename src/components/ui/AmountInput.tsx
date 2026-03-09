import InputWrapper from "./InputWrapper";
import style from './inputs.module.scss';

export type AmountInputProps = {
	name: string;
	label: string;
	value: string;
	onChange: (a: string) => void;
}

const AmountInput = ({ name, label, value, onChange }: AmountInputProps) => (
	<InputWrapper name={name} label={label}>
		<input
			name={name}
			id={name}
			type='number'
			value={value}
			onChange={(e) => onChange(e.currentTarget.value)}
			placeholder='100.00'
			className={style.Input}
		/>
	</InputWrapper>
);

export { AmountInput as default };