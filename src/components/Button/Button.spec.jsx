import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from '.'

describe('<Button />', () => {
    it('should render the button text', () => {
        render(<Button label="Load"/>)

        expect.assertions(1)

        const button = screen.getByRole('button', { name: /load/i })
        expect(button).toBeInTheDocument()
    })

    it('should fire button click', () => {
        const fn = jest.fn()  // Create a mock function
        render(<Button text='Load' onClick={fn}/>)

        const button = screen.getByRole('button')

        userEvent.click(button)
        // fireEvent(button).click()

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should be disabled', () => {
        render(<Button text="Load" disabled={true}/>)

        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
    })

    it('should be enabled', () => {
        render(<Button text="Load" disabled={false}/>)

        const button = screen.getByRole('button')

        expect(button).toBeEnabled()
    })

    it('should match snapshot', () => {
        const fn = jest.fn()  // Create a mock function
        const {container} = render(<Button text='Load' onClick={fn}/>)

        expect(container.firstChild).toMatchSnapshot()
    })
})
