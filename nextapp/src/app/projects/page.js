'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/projects?page=1&per_page=2`);
                const data = await res.json();

                setPosts(data.posts ?? []);
                setTotalPages(data.total_pages || 1);
                setHasMore((data.total_pages || 1) > 1);
            } catch (e) {
                console.error('Initial fetch error:', e);
            }
        };

        fetchInitial();
    }, []);

    const loadMore = async () => {
        if (loading || page >= totalPages) return;
        setLoading(true);
        const nextPage = page + 1;

        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/projects?page=${nextPage}&per_page=2`);
        const data = await res.json();
        const newPosts = data.posts ?? [];

        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        setHasMore(nextPage < totalPages);
        setLoading(false);
    };

    return (
        <main className="mx-auto">
            <h1 className="text-3xl font-bold mb-6">Popular Projects list</h1>
            <div className="space-y-6">
                {posts.map(post => (
                    <Link href={`/projects/${post.id}`} className="border-b pb-4 hover:bg-gray-50 p-2 rounded" key={post.id}>
                        {post.thumbnail && <img className="w-[150px] h-[100px] object-cover rounded-md mb-2" src={post.thumbnail} alt={post.title} />}
                        <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
                        <strong className="text-gray-500 block mb-2">{post.date}</strong>
                        <p className="text-gray-700">{post.excerpt}</p>
                    </Link>
                ))}
            </div>
            {hasMore ? (
                <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={loadMore}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            ) : (
                <span className="hidden">No more posts.</span>
            )}
        </main>
    );
}