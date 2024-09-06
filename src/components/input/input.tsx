import { InputProp } from "@/type/inputprop"

export default function Input({labeltext, option, errortext, placeholder}: InputProp) {

    const optionStyle = {
        text: `rounded-[12px] bg-background-secondary text-lg text-primary font-regular p-[16px] placeholder-text-default 
                outline outline-4 outline-[#F8FAFC1A]`,
        password: `rounded-[12px] bg-background-secondary text-lg text-primary font-regular p-[16px] placeholder-text-default
                    outline outline-1 outline-icon-inverse`
    }

    const inputSize = {
        large: ``,
        small: ``
    }

    return (
        <div className='w-[460px] h-[79px]'>
            <p>{labeltext}</p>
            <input type={option} placeholder={placeholder} className={optionStyle[option]} />
            { //err조건 넣기
                <p>{}</p>
            }
        </div>
    )
}