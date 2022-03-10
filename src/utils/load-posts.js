export const loadPosts = async () => {
    const postsF = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosF = fetch('https://jsonplaceholder.typicode.com/photos')
    
    return Promise.all([postsF, photosF])
        .then(arg => {
    
            const [ postsResponse, photosResponse ] = arg
    
            return Promise.all([postsResponse.json(), photosResponse.json()])
                .then(arg => {
                    const [ postsJson, photosJson ] = arg
    
                    return postsJson.map((post, i) => {
                        return { ...post, cover: photosJson[i].url }
                    })
                })
        })
}