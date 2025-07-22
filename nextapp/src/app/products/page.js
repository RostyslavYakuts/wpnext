'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductFilter from '../../components/products/productFilter';
export default function ProjectsPage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({
        on_sale: false,
        orderby: 'date',
        order: 'DESC',
        price_order: '',
    });
    const buildQueryString = (page = 1) => {
        const params = new URLSearchParams({
            page,
            per_page: 3,
            orderby: filters.orderby,
            order: filters.order,
        });
        if (filters.on_sale) params.set('on_sale', 'true');
        if (filters.price_order) params.set('price_order', filters.price_order);
        return params.toString();
    };
    const fetchInitial = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/products?${buildQueryString(1)}`);
            const data = await res.json();

            setPosts(data.posts ?? []);
            setTotalPages(data.total_pages || 1);
            setHasMore((data.total_pages || 1) > 1);
            setPage(1);
        } catch (e) {
            console.error('Initial fetch error:', e);
        }
    };
    useEffect(() => {
        fetchInitial();
    }, []);

    const loadMore = async () => {
        if (loading || page >= totalPages) return;
        setLoading(true);
        const nextPage = page + 1;

        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/products?${buildQueryString(nextPage)}`);
        const data = await res.json();
        const newPosts = data.posts ?? [];

        setPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        setHasMore(nextPage < totalPages);
        setLoading(false);
    };

    return (
        <main className="mx-auto">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <ProductFilter
                filters={filters}
                setFilters={setFilters}
                onApply={() => {
                    setPage(1);
                    fetchInitial();
                }}
            />



            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <Link
                        href={`/products/${post.id}`}
                        className="w-full flex flex-col items-center gap-5 border rounded-xl shadow-sm hover:shadow-md transition-all p-4 bg-white hover:bg-gray-50"
                        key={post.id}
                    >
                        {post.thumbnail && (
                            <img
                                className="w-full h-auto object-cover rounded-md mb-4"
                                src={post.thumbnail}
                                alt={post.title}
                            />
                        )}
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h3>
                        <b>Product ID: {post.id}</b>
                        <blockquote>Price: {post.price}</blockquote>
                        <div className="text-primary text-base font-medium mb-2" dangerouslySetInnerHTML={{ __html: post.price_html }} />
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.excerpt}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{post.description}</p>
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