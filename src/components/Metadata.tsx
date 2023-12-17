import { FC, ReactElement } from "react"
import { Helmet } from "react-helmet-async"
import { TMetaData } from "../types/component-types"

const MetaData: FC<TMetaData> = ({ title, description, ogTitle, ogDescription, ogUrl, ogImage, canonicalLink }): ReactElement => {
    return (
        <Helmet>
            <title>Pointer | {title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={ogDescription} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:image" content={ogImage}/>
            <link rel="canonical" href={canonicalLink} />
        </Helmet>
    )
}

export default MetaData