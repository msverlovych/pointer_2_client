import { FC, ReactElement } from 'react'
import { ColorVariantsType, ParagraphProps, ParagraphSizesType } from '../../types/component-types'
import { cn } from '../../lib/utils'

const colorVariants: ColorVariantsType = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost'
  
};

const paragraphSizes: ParagraphSizesType = {
  large: 'large',
  medium: 'medium',
  small: 'small'
};

export const Paragraph: FC<ParagraphProps> = ({
    children,
    color = 'ghost',
    className,
    size = 'medium',
    ...rest
  }): ReactElement => {
  return (
    <p className={cn(className, paragraphSizes[size], colorVariants[color])} { ...rest }>
      {children}
    </p>
  )
}