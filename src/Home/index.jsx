import './styles.css'

import { loadPosts } from '../utils/load-posts'
import { Posts } from '../components/Posts'
import { Component } from 'react'
import { SearchResult } from '../components/SearchResult'
import { TextInput } from '../components/TextInput'

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    searchPosts: [],
    page: 0,
    postsPerPage: 5,
    searchText: '',
  }

  componentDidMount() { 
    loadPosts().then( posts => 
      this.setState({ 
        posts: posts.slice(this.state.page, this.state.page+this.state.postsPerPage), 
        allPosts: posts,
        searchPosts: posts,
      })
    )
  }

  handlePrevPosts = () => {
    const { page, postsPerPage, searchPosts } = this.state
    const prevPage = page - postsPerPage

    this.setState({ 
      page: prevPage,
      posts: searchPosts.slice(prevPage, page)
    })
  }

  handleNextPosts = () => {
    const { page, postsPerPage, searchPosts } = this.state
    const nextPage = page + postsPerPage

    this.setState({ 
      page: nextPage,
      posts: searchPosts.slice(nextPage, nextPage + postsPerPage)
    })
  }

  handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase()
    const { postsPerPage, allPosts } = this.state

    if (searchText.length === 0) {
      const posts = allPosts.slice(0, postsPerPage)
      this.setState({ page: 0, searchText, searchPosts: allPosts, posts })
    }
    else {
      const searchPosts = allPosts.filter( post => post.title.toLowerCase().indexOf(searchText) !== -1 )
      const posts = searchPosts.slice(0, postsPerPage)
      this.setState({ page: 0, searchText, searchPosts, posts })
    }
  }

  render() {
    const { posts, searchText, searchPosts } = this.state

    return (
      <section className="container">
        <TextInput label="Search:" onChange={this.handleSearch} />
        <SearchResult search={!!searchText} qty={searchPosts.length} />
        {posts.length > 0 && (
          <Posts posts={posts} 
                 onPrev={this.handlePrevPosts}
                 onNext={this.handleNextPosts} 
                 disablePrev={this.state.page === 0}
                 disableNext={this.state.page+this.state.postsPerPage >= this.state.searchPosts.length}/>
        )}
      </section>
    )
  }
}
