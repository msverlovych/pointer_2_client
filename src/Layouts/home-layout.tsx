import { FC, Fragment, ReactElement } from "react"
import { Outlet } from "react-router-dom"
import { Navbar, Footer } from '../components'
import { Toaster } from "react-hot-toast"

const HomeLayout: FC = (): ReactElement => {
    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <main id="main" className="w-full">
                <Toaster 
                    position="top-right" 
                    toastOptions={{
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        }
                    }}
                />
                <Outlet />
            </main>
            <footer className="footer">
                <Footer />
            </footer>
        </Fragment>
    )
}

export default HomeLayout