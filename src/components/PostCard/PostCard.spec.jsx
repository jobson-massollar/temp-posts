import { render, screen } from "@testing-library/react"
import { PostCard } from "."

const post = {
    title: 'title 1',
    id: 1,
    body: 'body 1',
    cover: 'img/img.png'
}

describe('<PostCard />', () => {

    it('should render', () => {
        // const { debug } = render(<PostCard post={post} />)
        // debug();  // Show the code generated by the render

        render(<PostCard post={post} />)

        const img = screen.getByRole('img')

        expect(img).toHaveAttribute('src', post.cover)
        expect(img).toHaveAttribute('alt', post.title)

        expect(screen.getByText(post.title + ' ' + post.id)).toBeInTheDocument(); // Title paragraph
        expect(screen.getByText(post.body)).toBeInTheDocument(); // Body paragraph
    })

    it('should match snapshot', () => {
        const { container } = render(<PostCard post={post} />)
        
        expect(container.firstChild).toMatchSnapshot()
    })
})