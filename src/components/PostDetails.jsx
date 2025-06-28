import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'

//put on separate file,
const fetchPost = async (postId) => {
    return await axios.get(`http://localhost:4000/posts/${postId}`)
}
const PostDetails = () => {
    // postId is from react router, params in route id, which we have set in Route.
    const {postId} = useParams()
    // console.log(postId)
    // as we know, we always get response from useQuery,,,
    // and takes two parameters, which is necessary,
    const {data, isLoading, isError, error} = useQuery({

    queryKey: ['post', postId], // unique query key to identify the query, needs to be fetched, since only need to fetch data from /posts endpoints,
    queryFn: () => fetchPost(postId)
})

 if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Data Loading...</div>;
  }

const {title,body} = data?.data || {};

  return (
    <div className='post-details-container'>
        <h1 className='post-details-title'>{title}</h1>
        <p className='post-details-body'>{body}</p>
    </div>
  )
}

export default PostDetails