import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const buttonStyles = cva(
  "font-semibold tracking-tight px-8 py-3 disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-gray-700 disabled:text-white",
  {
    variants: {
      intent: {
        primary:
          "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-800 text-white",
        secondary:
          "bg-white text-black hover:bg-gray-100 focus:ring focus:ring-white",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus:ring focus:ring-red-800",
        ghost:
          "bg-transparent hover:bg-hover-transparent-100 active:bg-hover-transparent-200",
        dark: "bg-gray-900 text-white focus:ring focus:ring-gray-800",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-md",
        xl: "text-xl",
        xsm: "text-sm px-4",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        full: "rounded-full",
      },
      textPos: {
        center: "text-center",
        left: "text-left",
        right: "text-right",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "sm",
      rounded: "md",
      textPos: "center",
    },
  }
);

type Props = {
  children: ReactNode;
  variant?: VariantProps<typeof buttonStyles>;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, className, variant, ...props }: Props) => {
  return (
    <button {...props} className={`${buttonStyles(variant)} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
