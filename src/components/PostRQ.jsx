import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

//latest method to fetching data rather from that traditional way,,,, 
const PostRQ = () => {
// now , calling useQuery hook, which is used to fetch data from server, and it will return an object with properties like data, error, isLoading, etc.
  // to use react query, we need to first use useQuery , which will take two properties at minimum  inside an object format.
  // const {result} = useQuery({ // now result will be object, which will have all the properties via the useQuery hook.
  const {data, isLoading, isError, error, isFetching} = 
  useQuery({
  // every single query (like, endpoints e.g. :- /posts, /posts/1, /posts/1/comment, should have its own unique query key
    // /posts ~ ["posts"] = (in below code)
    // /posts/1 ~ ["posts", 1]
    // if need dynamic, do this /posts/1 ~ ["posts", post.id]
    // /posts/1/comments ~ ["posts", 1, "comments"]

    queryKey : ["posts"], // unique query key to identify the query, needs to be fetched, since only need to fetch data from /posts endpoints,
queryFn:() => {
  //returning promise to query fn,
 return  axios.get('http://localhost:4000/posts');
},
//staleTime, often change the data, so we can set the cache time to 0, so that it will always fetch the data from server, and not from cache.
// stay remains fresh data for 3 seconds, after that it will refetch the data from server, if the component is mounted again or if we go again that same route.
// staleTime:0,
 //another feature of polling by refetchInterval, which pool the network request every 1 sec.
  refetchInterval:1000, // refresh or request network data at every 1 sec, if the current tab i.e. browwser tab is active.
  // by default, it's set to false....
  refetchIntervalInBackground: true, // if set to true, it will keep polling the data even if the tab is inactive.
  });


 

  console.log('loading', isLoading, isFetching);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Data Loading...</div>;
  }

  // console.log(data);


  return (
    <div className='container'>
      {data && data.data.map(post => (
            <div className='post-item' key={post.id}>
            <h2 className='post-title'>{post.title}</h2>
            <p className='post-body'>{post.body}</p>
            </div>
        ))}
    </div>
  )
}

export default PostRQ