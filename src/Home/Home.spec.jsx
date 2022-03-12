import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from '.'

global.posts_per_page = 0

const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/*', (req, res, ctx) => {

        let posts = []
        for (let i = 1; i <= global.posts_per_page; i++)
            posts.push({
                userId: i,
                id: i,
                title: `title ${i}`,
                body: `body ${i}`,
                url: `img${i}.png`,
            })

        return res(ctx.json(posts))
    }),
]

const server = setupServer(...handlers)

describe('< Home />', () => {

    beforeAll(() => {
        server.listen()
    })

    afterAll(() => {
        server.close()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    it('should render no posts', () => {
        render(<Home />)

        expect(screen.getByRole('searchbox')).toBeInTheDocument()   // Check the input element
        expect(screen.queryAllByRole('button')).toHaveLength(0)     // No button
        expect(screen.getByText(/no posts/i)).toBeInTheDocument()   // No posts message
    })

    it('should render posts', async () => {
        global.posts_per_page = 10

        render(<Home />)

        const noMorePosts = screen.getByText(/no posts/i)

        expect(noMorePosts).toBeInTheDocument()

        await waitForElementToBeRemoved(noMorePosts)

        // Three posts
        expect(screen.getAllByRole('img', { name: /title/i})).toHaveLength(global.posts_per_page)
        expect(screen.getAllByText(/title/i)).toHaveLength(global.posts_per_page)
        expect(screen.getAllByText(/body/i)).toHaveLength(global.posts_per_page)

        expect(screen.queryAllByRole('button')).toHaveLength(2)     // Two buttons: prev and next

        // Get the buttons by their labels
        expect(screen.getByRole('button', {name: /prev posts/i})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /next posts/i})).toBeInTheDocument()

        // Both buttons must be disabled
        expect(screen.getByRole('button', {name: /prev posts/i})).toBeDisabled()
        expect(screen.getByRole('button', {name: /next posts/i})).toBeDisabled()
    })

    it('should find two posts', async () => {
        global.posts_per_page = 10

        render(<Home />)

        const noMorePosts = screen.getByText(/no posts/i)

        expect(noMorePosts).toBeInTheDocument()

        await waitForElementToBeRemoved(noMorePosts)

        const input = screen.getByRole('searchbox')
        const value = 'title 1'

        userEvent.type(input, value)

        expect(screen.queryAllByText(/title 1/i)).toHaveLength(2)
        expect(screen.queryAllByText(/title 2/i)).toHaveLength(0)

        expect(screen.getByText(/2 posts were found/i)).toBeInTheDocument()
    })

    it('should find one post', async () => {
        global.posts_per_page = 2

        render(<Home />)

        const noMorePosts = screen.getByText(/no posts/i)

        expect(noMorePosts).toBeInTheDocument()

        await waitForElementToBeRemoved(noMorePosts)

        const input = screen.getByRole('searchbox')
        const value = 'title 2'

        userEvent.type(input, value)

        expect(screen.queryAllByText(/title 1/i)).toHaveLength(0)
        expect(screen.queryAllByText(/title 2/i)).toHaveLength(1)

        expect(screen.getByText(/just 1 post was found/i)).toBeInTheDocument()
    })

    it('should find no posts', async () => {
        global.posts_per_page = 10

        render(<Home />)

        const noMorePosts = screen.getByText(/no posts/i)

        expect(noMorePosts).toBeInTheDocument()

        await waitForElementToBeRemoved(noMorePosts)

        const input = screen.getByRole('searchbox')
        const value = 'bla'

        userEvent.type(input, value)

        expect(screen.queryAllByText(/title 1/i)).toHaveLength(0)
        expect(screen.queryAllByText(/title 2/i)).toHaveLength(0)

        expect(screen.getByText(/no post was found/i)).toBeInTheDocument()
    })

    it('should go to the next page', async () => {
        global.posts_per_page = 11

        render(<Home />)

        const noMorePosts = screen.getByText(/no posts/i)

        expect(noMorePosts).toBeInTheDocument()

        await waitForElementToBeRemoved(noMorePosts)

        // Get the buttons by their labels
        const prevButton = screen.getByRole('button', {name: /prev posts/i})
        const nextButton = screen.getByRole('button', {name: /next posts/i})

        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeEnabled()

        // Click on next button
        userEvent.click(nextButton)

        expect(screen.queryAllByText(/title 1/i)).toHaveLength(1)
        expect(screen.queryAllByText(/title 2/i)).toHaveLength(0)

        expect(prevButton).toBeEnabled()
        expect(nextButton).toBeDisabled()

        // Click on prev button
        userEvent.click(prevButton)

        expect(screen.queryAllByText(/title 1/i)).toHaveLength(2)
        expect(screen.queryAllByText(/title 2/i)).toHaveLength(1)

        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeEnabled()
    })
})
