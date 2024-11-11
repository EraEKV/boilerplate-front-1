"use client";

import React from 'react';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};


interface Post {
    userId: string;
    id: number;
    title: string;
    body: string;
}

const Posts: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<Post[], Error>('posts', fetchPosts);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            <ul>
                {data?.map((post: Post) => (
                    <li key={post.id} className="mb-2 p-4 border rounded-lg">
                        <h3 className="font-semibold">{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;