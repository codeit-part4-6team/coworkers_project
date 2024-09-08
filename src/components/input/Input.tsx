import { InputProp } from "@/types/inputprop"
import clsx from "clsx"

export default function Input({labeltext, option, errortext, placeholder}: InputProp) {

    const defaultClassName = `rounded-[12px]`

    const optionStyle = {
        text: `bg-background-secondary text-lg text-primary font-regular p-[16px] placeholder-text-default 
                outline outline-4 outline-[#F8FAFC1A]`,
        password: `bg-background-secondary text-lg text-primary font-regular p-[16px] placeholder-text-default
                    outline outline-1 outline-icon-inverse`
    }

    const inputSize = {
        large: `w-[460px] h-[79px]`,
        small: `w-[343px] h-[44px]`
    }

    return (
        <div className={clsx()}>
            <p>{labeltext}</p>
            <input type={option} placeholder={placeholder} className={optionStyle[option]} />
            { //err조건 넣기
                <p>{}</p>
            }
        </div>
    )
}
