export interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
    labeltext : string;
    option : 'text' | 'password';
    errortext : string[]; //0번 입력없을시 에러메시지 1번 잘못된 입력 에러 메시지
    inputsize? : 'large' | 'small';
    placeholder : string;
}
