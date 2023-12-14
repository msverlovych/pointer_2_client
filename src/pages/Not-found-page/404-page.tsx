import { FC, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import { Htag, Paragraph, ButtonOutline } from "../../components"

import LocalImageLarge from '/assets/images/local-image-1792.avif'
import LocalImageMedium from '/assets/images/local-image-900.avif'
import LocalImageSmall from '/assets/images/local-image-500.avif'

const NotFoundPage: FC = (): ReactElement => {
    const navigate = useNavigate()

    return (
        <section id="not-found_page">
            <div className='flex flex-center items-center'>
                <div className="container">
                    <div className="wrapper">
                        <div className="content">
                            <picture>
                                <source type="image/avif" srcSet={LocalImageSmall} media="(max-width: 500px)"/>
                                <source type="image/avif" srcSet={LocalImageMedium} media="(max-width: 900px)"/>
                                <source type="image/avif" srcSet={LocalImageLarge} media="(max-width: 1200px)"/>
                                <img className="image-block" src={LocalImageLarge} alt="Flower" loading="eager"/>
                            </picture>
                            <article className="article-block">
                                <Htag level={1} color="secondary" className="main-title">SORRY</Htag>
                                <Paragraph size="large" color="secondary" className="article-block__subtitle">
                                    At the moment a page you're looking for is unavailable. Please try again later
                                </Paragraph>
                                <ButtonOutline
                                    className="article-block__button"
                                    onClick={() => navigate(-1)}>
                                        BACK
                                </ButtonOutline>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage