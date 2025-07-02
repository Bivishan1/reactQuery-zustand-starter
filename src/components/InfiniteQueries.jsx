import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
// import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageParam}`);
}

const InfiniteQueries = () => {

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
        
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        // if we are not using any params or variable, just add prefix _ on that thing. (e.g.: _lastPage);
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < 5) {
                return allPages.length + 1
            } else {
                return undefined
            }
        }
    })
    console.log(data?.pages?.length);

    // const { ref, inView } = useInView();

    // useEffect(() => {
    //     if (inView) {
    //         fetchNextPage();
    //     }
    // }, [fetchNextPage, inView])

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className='container'>
             {data?.pages?.map(page => {
                return page?.data.map(fruit => {
                    return <div className='fruit-item' key={fruit.id}>
                        {fruit.name}
                    </div>
                })
            })}
            {/* <div ref={ref}>{isFetchingNextPage && "Loading..."}</div> */}
            {/* this also worked to disable the button, but we also have a look boolean method from useInfiniteQuery */}
            {/* <button onClick={fetchNextPage} disabled={data?.pages?.length === 5}>Load More..</button> */}
            <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More..</button>
        </div>
    )
}

export default InfiniteQueries