import P from 'prop-types'

import './styles.css'

import { PostCard } from '../PostCard';
import { Button } from '../Button';

export const Posts = ({ posts, onPrev, onNext, disablePrev = false, disableNext = false }) =>
    <>
        <div className="posts">
            {posts.map(post => (
                <PostCard key={post.id} post={post}/>
        ))}
        </div>
        <div className="button-container">
            <Button label="Prev Posts" onClick={onPrev} disabled={disablePrev}/>
            <Button label="Next Posts" onClick={onNext} disabled={disableNext}/>
        </div>
    </>

    Posts.propTypes = {
        posts: P.arrayOf(P.shape({
            id: P.number.isRequired,
            title: P.string.isRequired,
            body: P.string.isRequired,
            cover: P.string.isRequired,
        })),
        onPrev: P.func.isRequired,
        onNext: P.func.isRequired,
        disablePrev: P.bool,
        disableNext: P.bool,
    }
