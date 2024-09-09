import { InputProp } from "@/types/InputProp"
import clsx from "clsx"
import visbilityIcon from "@/assets/password_visbility_on.svg";
import uvisbilityIcon from "@/assets/password_visbility_off.svg";
import { useState } from "react";

export default function Input({labeltext, option, inputsize, errortext, placeholder, pattern=undefined, ...rest}: InputProp) {

    const [visbilityCheck, setVisbilityCheck] = useState();

    const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
                            bg-background-secondary text-text-primary font-regular
                            border-solid border-[1px] outlien outline-none`

    const optionClassName = {
        text: ` border-border-primary-10
                hover:border-interaction-hover
                focus:border-interaction-focus
                disabled:border-interacion-inactive`,
        password: ``
    }

    const sizeClassName = clsx(
        inputsize === 'large' && 'text-lg',
        inputsize === 'small' && 'text-md'
    )
    //주석
    return (
        <div className={clsx(
            inputsize === 'large' && `w-[460px] h-[79px]`,
            inputsize === 'small' && `w-[343px] h-[44px]`)}>
            <p>{labeltext}</p>
            <input 
                type={option}
                placeholder={placeholder}
                pattern={pattern ? pattern : undefined} 
                className={clsx(defaultClassName, optionClassName[option], sizeClassName)}>
            </input>
            { //err조건 넣기
                <p>{}</p>
            }
        </div>
    )
}
