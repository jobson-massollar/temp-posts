import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputText, TextInput } from '.'

const props = {
    label: 'label',
    onChange: jest.fn()
}

describe('<TextInput />', () => {

    it('should render', () => {
        render(<TextInput {...props} />)

        expect(screen.getByText(props.label)).toBeInTheDocument()   // Check the input label
        expect(screen.getByRole('searchbox')).toBeInTheDocument()   // Check the input element
    })

    it('should handle keyboard', () => {
        render(<TextInput {...props} />)

        const input = screen.getByRole('searchbox')
        const value = 'abc'

        userEvent.type(input, value)

        expect(input.value).toBe(value)     // Check the input content
        expect(props.onChange).toHaveBeenCalledTimes(value.length)  // Check the handle calls
    })

    it('should match snapshot', () => {
        const { container } =  render(<TextInput {...props} />)

        expect(container.firstChild).toMatchSnapshot()
    })
})