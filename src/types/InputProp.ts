export interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
    labeltext : string;
    option : 'text' | 'password';
    inputSize : 'large' | 'small';
    placeholder : string;
    errorText? : string[];
    passwordCheck? : string;
    pattern? : 'email' | 'password' | 'nickName' | 'passwordCheck';
}
