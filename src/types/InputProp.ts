export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labeltext? : string;
    option : 'text' | 'password';
    errorText? : string;
    inValid : boolean;
    placeholder : string;
}