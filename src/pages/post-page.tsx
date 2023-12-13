import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"

const PostPage: FC = (): ReactElement => {
    return (
        <div>
            Post Page
            <Link to='/'>Home-Page</Link>
        </div>
    )
}

export default PostPage