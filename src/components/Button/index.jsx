import P from 'prop-types'

import './styles.css'

import { Component } from "react";

export class Button extends Component {

    render() {
        const { label, onClick, disabled = false } = this.props

        return (
            <button className="button" onClick={onClick} disabled={disabled}>{label}</button>
        )
    }
}

Button.propTypes = {
    label: P.string.isRequired,
    onClick: P.func.isRequired,
    disabled: P.bool,
}
