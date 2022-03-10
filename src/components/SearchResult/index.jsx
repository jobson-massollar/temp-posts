import './styles.css'

export const SearchResult = ({ search, qty }) => {
    if (search && qty > 1)
        return (
            <div className="search-result-container">
                <p>{qty} posts were found</p>
            </div>
        )
    else if (search && qty === 1)
        return (
            <div className="search-result-container">
                <p>Just 1 post was found</p>
            </div>
        )
    else if (search && qty === 0)
        return (
            <div className="search-result-container">
                <p>No post was found!</p>
            </div>
        )
    else
        return (<></>)
}