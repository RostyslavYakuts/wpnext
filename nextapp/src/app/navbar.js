'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = [
	{ id: 1, name: 'Home', path: '/' },
	{ id: 2, name: 'Projects', path: '/projects' },
	{ id: 3, name: 'Contacts', path: '/contacts' },
];

const Navbar = () => {
	const pathname = usePathname();
	const isActive = (path) => path === pathname;

	return (
		<nav className="bg-white shadow-md">
			<div className="navbar max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<Link href="/">
					<span className="logo text-2xl font-bold text-blue-600 cursor-pointer">NextWp</span>
				</Link>
				<ul className="flex space-x-6">
					{NavLinks.map((link) => (
						<li key={link.id}>
							<Link
								href={link.path}
								className={`text-gray-700 hover:text-blue-600 transition ${
									isActive(link.path) ? 'font-semibold text-blue-600 border-b-2 border-blue-600' : ''
								}`}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
