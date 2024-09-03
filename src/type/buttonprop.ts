export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    option : "solid" | "outlined" | "outlined-secondary" | "danger";
    size : "large" | "xsmall";
    text : string;
}