import Link from 'next/link';

const page = () => {
	return (
		<main className="mt-4 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-6 py-16">
			<section className="hero max-w-4xl mx-auto text-center bg-white rounded-xl shadow-lg p-12">
				<h1 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
					Cutting-Edge Web Solutions by <span className="text-blue-600">Next.js + WordPress Experts</span>
				</h1>
				<p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
					We are a creative web studio specializing in modern, scalable websites powered by Next.js and Headless WordPress.
					Combining blazing-fast frontend performance with a flexible, easy-to-manage backend, we build SEO-optimized, user-friendly digital experiences tailored to your business needs.
				</p>

				<Link
					href="/projects"
					className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-blue-700 transition"
					aria-label="View our projects"
				>
					Explore Our Projects
				</Link>
			</section>

			<section className="features mt-16 max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
				<div className="feature p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
					<h2 className="text-2xl font-bold mb-3 text-blue-600">Performance & Speed</h2>
					<p className="text-gray-600">
						Leveraging Next.js's SSR and SSG capabilities for lightning-fast page loads and superior user experience.
					</p>
				</div>
				<div className="feature p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
					<h2 className="text-2xl font-bold mb-3 text-blue-600">Flexible Content Management</h2>
					<p className="text-gray-600">
						Manage your website content effortlessly with Headless WordPress — designed for marketers and editors.
					</p>
				</div>
				<div className="feature p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
					<h2 className="text-2xl font-bold mb-3 text-blue-600">SEO & Scalability</h2>
					<p className="text-gray-600">
						Built with SEO best practices and scalable architecture for future growth and visibility.
					</p>
				</div>
			</section>

			<section className="call-to-action mt-20 text-center max-w-4xl">
				<h2 className="text-3xl font-bold mb-4 text-gray-900">
					Ready to launch your next website?
				</h2>
				<p className="text-gray-700 mb-6">
					Contact us today for a free consultation and see how we can help you build a modern, high-performance web presence.
				</p>
				<Link
					href="/contacts"
					className="inline-block bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-green-700 transition"
					aria-label="Contact us"
				>
					Get In Touch
				</Link>
			</section>
		</main>
	);
};

export default page;
