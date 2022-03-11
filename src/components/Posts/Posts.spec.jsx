import { render, screen } from '@testing-library/react'
import { Posts } from '.'

const props = {
    posts: [
        {
            title: 'title 1',
            id: 1,
            body: 'body 1',
            cover: 'img/img1.png'
        },
        {
            title: 'title 2',
            id: 2,
            body: 'body 2',
            cover: 'img/img2.png'
        },
        {
            title: 'title 3',
            id: 3,
            body: 'body 3',
            cover: 'img/img3.png'
        },
    ],
    onPrev: jest.fn(),
    onNext: jest.fn(),
    onDisablePrev: true,
    onDisableNext: true,
}

describe('<Posts />', () => {

    it('should render posts', () => {
        render(<Posts {...props}/>)

        expect(screen.getAllByRole('img')).toHaveLength(3)  // It must have 3 images
        expect(screen.getAllByText(/title/)).toHaveLength(3)  // It must have 3 titles (must use RE)
        expect(screen.getAllByText(/body/)).toHaveLength(3)  // It must have 3 bodies (must use RE)
        expect(screen.getAllByRole('button')).toHaveLength(2)  // It must have 2 buttons

        expect(screen.getByRole('img', { name: /title 1/})).toHaveAttribute('src', 'img/img1.png')

    })

    it('should not render posts', () => {
        render(<Posts posts={[]} onPrev={jest.fn()} onNext={jest.fn()}/>)

        expect(screen.queryAllByRole('img')).toHaveLength(0)  // It must have 0 images
        expect(screen.queryAllByText(/title/)).toHaveLength(0)  // It must have 0 titles (must use RE)
        expect(screen.queryAllByText(/body/)).toHaveLength(0)  // It must have 0 bodies (must use RE)
    })

    it('should match snapshot', () => {
        const { container } = render(<Posts {...props}/>)

        expect(container.firstChild).toMatchSnapshot();

    })

})

