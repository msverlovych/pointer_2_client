import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import { ILinkButtonProps, PrimaryButtonProps, SecondaryButtonProps, OutlineButtonProps } from "../../types/component-types"
import { cn } from "../../lib/utils"

export const IconButton: FC<ILinkButtonProps> = ({ path, ariaLabel, icon, alt, className, onClick }): ReactElement => (
    <Link to={path} aria-label={ariaLabel}>
        <img  
            src={icon} 
            alt={alt} 
            width={40}
            height={40}
            onClick={onClick}
            className={cn('iconButton', className)} 
        />
    </Link>
)

export const ButtonPrimary: FC<PrimaryButtonProps> = ({ children, className, type, ...rest }): ReactElement => (
    <button type={type} className={cn('button-primary transition-all', className)} { ...rest }>
        {children}
    </button>
)

export const ButtonSecondary: FC<SecondaryButtonProps> = ({ children, className, type, ...rest }): ReactElement => (
    <button className={cn('button-secondary transition-all', className)} type={type} { ...rest }>
        {children}
    </button>
)

export const ButtonOutline: FC<OutlineButtonProps> = ({ children, className, type, ...rest }): ReactElement => (
    <button className={cn('button-outline transition-all', className)} type={type} { ...rest }>
        {children}
    </button>
)