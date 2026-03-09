import type { ReactNode } from "react";
import style from './inputs.module.scss'

type InputWrapperProps = {
    name: string;
    label: string;
    children: ReactNode;
}

const InputWrapper = ({ name, label, children }: InputWrapperProps) => (
    <div className={style.Wrapper}>
		<label htmlFor={name}>{ label }</label>
		{ children }
	</div>
)

export { InputWrapper as default }