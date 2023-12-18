import { FC, ReactElement, useState, Fragment } from 'react'
import { Htag, IconButton } from '..'
import { DownloadSvg } from '../../lib/utils/svg-exports'
import { downloadImage } from '../../lib/utils'
import { IRenderCards } from "../../types/component-types.ts"
import { format } from 'date-fns'

const RenderCards: FC<IRenderCards> = ({ data, title }): ReactElement => {
    const [ hoveredImage, setHoveredImage ] = useState<string | null>(null)
    const handleMouseOver = (image: string) => setHoveredImage(image)
    const handleMouseOut = () => setHoveredImage(null)    

    if (data.length > 0) {
        return (
            <Fragment>
                {data.map(({ _id, userName, image, prompt, createdAt }) => {
                    const widths = [400, 800, 1200]
                    const activeImage = hoveredImage === image.url
                    const date = format(new Date(createdAt), 'yyyy-MM-dd')
                    const srcSet = widths.map(width => `${image.url.replace('/upload', `/upload/w_${width}`)} ${width}w`).join(', ')

                    return (
                        <div
                            key={_id}
                            onMouseOver={() => handleMouseOver(image.url)}
                            className="card"
                            onMouseOut={handleMouseOut}
                        >
                            <img 
                                className="card-image" 
                                height={image.height}
                                width={image.width}
                                src={image.url} 
                                srcSet={srcSet}
                                sizes='50vw'
                                alt={prompt}
                            />
                            {activeImage && (
                                <div className="card-content">
                                    <Htag level={2} className="card-content__title prompt">{prompt}</Htag>
                                    <div className="flex flex-between items-center gap-2">
                                        <div className="flex items-center gap-05">
                                            <div className="card-content__label">{userName[0]}</div>
                                            <span className="card-content__username">{date}</span>
                                        </div>
                                        <IconButton
                                            icon={DownloadSvg}
                                            path='#'
                                            alt='download'
                                            onClick={() => downloadImage(_id, image.url)}
                                            ariaLabel='download-button'
                                            className='block'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </Fragment>
        )
    }

    return <Htag level={2} color='ghost' className='cards-title'>{title}</Htag>
}

export default RenderCards
