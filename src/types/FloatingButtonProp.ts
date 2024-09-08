export interface FloatingButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    option : 'add' | 'success' | 'cancel';
    text : string;
    disabled? : boolean;
}
