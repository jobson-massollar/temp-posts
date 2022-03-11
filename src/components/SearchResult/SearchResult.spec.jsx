import { render, screen } from '@testing-library/react'
import { SearchResult } from '.'

describe('<SearchResult />', () => {

    it('should render many found', () => {
        const props = { search: true, qty: 2 }
        render(<SearchResult {...props}/>)

        expect(screen.getByText(/2 posts/)).toBeInTheDocument()
    })

    it('should render one found', () => {
        const props = { search: true, qty: 1 }
        render(<SearchResult {...props}/>)

        expect(screen.getByText(/1 post/)).toBeInTheDocument()
    })

    it('should render none found', () => {
        const props = { search: true, qty: 0 }
        render(<SearchResult {...props}/>)

        expect(screen.getByText(/no post/i)).toBeInTheDocument()
    })

    it('should be empty 1', () => {
        const props = { search: false, qty: 2 }
        const { container } = render(<SearchResult {...props}/>)

        expect(container.childElementCount).toBe(0)
    })

    it('should be empty 2', () => {
        const props = { search: true, qty: -1 }
        const { container } = render(<SearchResult {...props}/>)

        expect(container.childElementCount).toBe(0)
    })

    it('should match snapshot', () => {
        const props = { search: true, qty: 2 }
        const { container } = render(<SearchResult {...props}/>)

        expect(container.firstChild).toMatchSnapshot()
    })
})
