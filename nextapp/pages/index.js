import {useEffect, useState} from "react";
export async function getStaticProps() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/projects?page=1&per_page=2`);

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        console.log('Get Static Props:' + data);
        console.log(data);
        // from X-WP-TotalPages
       // const totalPages = parseInt(res.headers.get('X-WP-TotalPages')) || 1;

        return {
            props: {
                initialPosts: data.posts,
                totalPages: Number(data.total_pages) || 1,
            },
            revalidate: 10,
        };
    } catch (e) {
        console.error('getStaticProps error:', e);
        return {
            props: {
                initialPosts: [],
                totalPages: 1,
            },
            revalidate: 10,
        };
    }
}


export default function Home({ initialPosts, totalPages }) {

    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalPages > 1);
    useEffect(() => {
        setHasMore(page < totalPages);
    }, [page, totalPages]);

    const loadMore = async () => {
        console.log('Loading more...');
        if (loading || page >= totalPages) return;

        setLoading(true);
        const nextPage = page + 1;

        const res = await fetch(`http://localhost:8080/wp-json/nextapp/v1/projects?page=${nextPage}&per_page=2`);
        const data = await res.json();

        const newPosts = data.posts ?? [];

        if (newPosts.length > 0) {
            setPosts(prev => [...prev, ...newPosts]);
        }

        setPage(nextPage);
        setHasMore(nextPage < totalPages);

        setLoading(false);
    };
   // console.log('Has more:', hasMore);
    console.log('Posts:', posts);
    return (
        <main>
            <h1>Popular Projects</h1>
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        {post.thumbnail && <img width={150} height={100} src={post.thumbnail} alt={post.title} />}
                        <h3>{post.title}</h3>
                        <strong>{post.date}</strong>
                        <p>{post.excerpt}</p>
                        <hr/>
                    </div>
                ))}
            </div>
            {hasMore ? (
                <button className={"load-more-btn"} onClick={loadMore} disabled={loading}>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            ) : (
                <p>No more posts.</p>
            )}
        </main>
    );
}