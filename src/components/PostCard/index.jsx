import P from 'prop-types'

import './styles.css'

// Está fazendo o destructuring de props no próprio parâmetro da função.
// É o mesmo que:
// export const PostCard = (props) => { const { post } = props }
// Esse destructuring pode ser usado com vários valores de props

export const PostCard = ({ post }) =>
    <div className="post">
        <img src={post.cover} alt={post.title} />
        <p className="post-title">{post.title} {post.id}</p>
        <p className="post-body">{post.body}</p>
    </div>

PostCard.propTypes = {
    post: P.exact({
        id: P.number.isRequired,
        title: P.string.isRequired,
        body: P.string.isRequired,
        cover: P.string.isRequired,
    }).isRequired,
}
