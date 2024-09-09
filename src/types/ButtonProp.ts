export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    option : "solid" | "outlined" | "outlinedSecondary" | "danger";
    size : "large" | "xsmall";
    text : string;
}
