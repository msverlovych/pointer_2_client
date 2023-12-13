import { FC, ReactElement } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logo, IconButton } from '../index'
import { BackButtonSvg, PluseButtonSvg } from '../../lib/utils/svg-exports'

const Navbar: FC = (): ReactElement => {
    const location = useLocation().pathname
    const navigate = useNavigate()
    
    return (
        <nav className='navbar flex flex-center items-center'>
            <div className='container'>
                <div className='navbar-box flex flex-between items-center'>
                    <Link to='/' aria-label='logo' className='flex'>
                        <Logo />
                    </Link>
                    {location === '/' ? (
                        <IconButton 
                            path='/create-post' 
                            icon={PluseButtonSvg} 
                            alt='create' 
                            ariaLabel='create-post' 
                        />
                    ) : (
                        <IconButton 
                            path='' 
                            icon={BackButtonSvg} 
                            alt='back' 
                            ariaLabel='back' 
                            onClick={() => navigate('/')} 
                        />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar