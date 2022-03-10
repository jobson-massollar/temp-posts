import './styles.css'

import { PostCard } from '../PostCard';
import { Button } from '../Button';

export const Posts = ({ posts, onPrev, onNext, disablePrev, disableNext }) =>
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