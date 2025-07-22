import Link from 'next/link';

export const metadata = {
	title: 'Contact Us',
	description: 'Contact our web studio for coworking with our power development team',
	keywords: 'contacts, email, phone, webstudio',
};
const page = () => {
	return (
		<main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center px-6 py-16">
			<section className="bg-white shadow-lg rounded-xl p-10 max-w-2xl w-full text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Get in <span className="text-blue-600">Touch</span>
				</h1>
				<p className="text-gray-700 mb-8">
					We’d love to hear from you. Whether you have a question about our services, want to collaborate, or just want to say hello — we’re here for it.
				</p>

				<div className="text-left space-y-4 text-gray-800">
					<p>
						<strong>Email:</strong>{' '}
						<a href="mailto:hello@webstudio.com" className="text-blue-600 hover:underline">
							hello@webstudio.com
						</a>
					</p>
					<p>
						<strong>Phone:</strong>{' '}
						<a href="tel:+1234567890" className="text-blue-600 hover:underline">
							+1 (234) 567-890
						</a>
					</p>
					<p>
						<strong>Address:</strong> 123 Creative Ave, Studio City, Webland
					</p>
				</div>

				<div className="mt-8">
					<Link
						href="/"
						className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
					>
						Back to Home
					</Link>
				</div>
			</section>
		</main>
	);
};

export default page;
