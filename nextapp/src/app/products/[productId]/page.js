'use client';
import React, { use, useEffect, useState } from 'react';

export default function ProjectDetails( props ) {
    const params =  use(props.params);
    const { productId } = params;
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/products/${productId}`);
                if (!res.ok) throw new Error(`Failed to fetch project, status ${res.status}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <p className="mt-4 text-center">Loading...</p>;
    if (error) return (
        <main className="max-w-3xl mx-auto p-6">
            <h1>Error loading project</h1>
            <p>{error}</p>
        </main>
    );

    return (
        <main className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="rounded-xl mb-6 w-full object-cover max-h-[400px]"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <strong className="block my-4 text-sm text-gray-500 mb-6">{product.date}</strong>

            <div
                className="prose max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: product.content }}
            />
            <span className="inline-block my-4 text-md text-gray-600">Author: {product.author}</span>
            <b className="text-md text-gray-500 ml-4">Last updated: {product.modified}</b>
        </main>
    );
}