import React, { useEffect } from 'react'

const PostsTraditional = () => {
    const [posts, setPosts] = React.useState()
    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(null)

    const fetchPosts = async ()=> {
        setLoading(true); // Start loading when button is clicked
        setError(null); // Clear previous errors

        try {
            //setting up that endpoint url from json-server package,,,, 
            const response = await fetch('http://localhost:4000/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err); // `err.message` will be accessed in render
        } finally {
            setLoading(false);
        }
    }

    // fetching posts on component mount
    // jest for unit testing, while react testing library for integration testing,,,, 
    // jest for unit testing, while 
        useEffect(()=> {
            fetchPosts()
        }
            ,[]);
  return (
    <div>
        <h1>Posts Traditional</h1>
        <button onClick={fetchPosts}>Fetch Posts</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {posts && posts.map(post => (
            <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            </div>
        ))}
    </div>
  )
}

export default PostsTraditional