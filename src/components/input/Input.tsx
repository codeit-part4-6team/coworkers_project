import { InputProp } from "@/types/InputProp"
import clsx from "clsx"

export default function Input({labeltext, option, errortext, placeholder, ...rest}: InputProp) {

    const defaultClassName = `rounded-[12px]`

    const optionStyle = {
        text: `bg-background-secondary text-lg text-primary font-regular p-4 placeholder-text-default 
                outline outline-4 outline-[#F8FAFC1A]`,
        password: `bg-background-secondary text-lg text-primary font-regular p-4 placeholder-text-default
                    outline outline-1 outline-icon-inverse`
    }

    const inputSize = {
        large: `w-[460px] h-[79px]`,
        small: `w-[343px] h-[44px]`
    }

    return (
        <div>
            <p>{labeltext}</p>
            <input type={option} placeholder={placeholder} 
            className={clsx(defaultClassName, optionStyle[option])} />
            { //err조건 넣기
                <p>{}</p>
            }
        </div>
    )
}