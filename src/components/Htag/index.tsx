import { FC, ReactElement } from "react"
import { ColorVariantsType, HeadingTag, HtagProps } from "../../types/component-types"
import { cn } from "../../lib/utils"

const colorVariants: ColorVariantsType = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
}

export const Htag: FC<HtagProps> = ({ children, level, color = 'ghost', className, ...rest }): ReactElement => {
    const Tag = `h${level}` as HeadingTag

    return (
        <Tag className={cn(className, colorVariants[color])} { ...rest }>
            {children}
        </Tag>
    )
}

