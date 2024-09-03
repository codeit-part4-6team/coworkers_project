import { ButtonProps } from "@/type/buttonprop"

export default function Button({option, size, text, onClick} : ButtonProps) {

    const buttonOpton = {
        solid: "",
    }

    return (
        <div>
            <button className="w-full bg-white" onClick={onClick}>{text}</button>
        </div>
    )
}