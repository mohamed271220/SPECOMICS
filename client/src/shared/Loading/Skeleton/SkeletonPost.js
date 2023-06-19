import Skeleton from "./Skeleton"

import './post.css'

const SkeletonPost = () => {
    return (
        <div className="post">
            <Skeleton classes="title width-50" />
            <Skeleton classes="text width-100" />
            <Skeleton classes="text width-100" />
            <Skeleton classes="text width-100" />
        </div>
    )
}
export default SkeletonPost