export async function getStaticProps() {
    const res = await fetch('http://nginx/wp-json/nextapp/v1/projects');
    const posts = await res.json();

    return {
        props: { posts },
        revalidate: 10,
    };
}


export default function Home({ posts }) {
    return (
        <main>
            <h1>Projects</h1>
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
        </main>
    );
}