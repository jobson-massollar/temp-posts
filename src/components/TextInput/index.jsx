import './styles.css'

export const TextInput = ({ label, onChange}) =>
    <div className="input-container">
        {label} <input type="search" onChange={onChange} size="50" maxLength="50" placeholder='Type your search here'/>
    </div>