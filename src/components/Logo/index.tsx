import { FC, ReactElement } from 'react'
import { LogoSizeType, MainLogoProps } from '../../types/component-types'
import { LogoSvg } from '../../lib/utils/svg-exports'
import { cn } from '../../lib/utils'

const LogoSizes: LogoSizeType = {
    small: '__small',
    medium: '__medium',
    large: '__large'
}

const Logo: FC<MainLogoProps> = ({ size = 'medium', className }): ReactElement => (
    <img 
        src={LogoSvg} 
        alt='Main Logo' 
        className={cn(className, 'main-logo', `main-logo${size && LogoSizes[size]}`)}
    />
)

export default Logo