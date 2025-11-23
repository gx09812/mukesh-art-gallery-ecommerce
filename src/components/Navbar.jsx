import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Gallery', href: '/gallery' },
		{ name: 'Free Gift', href: '/free-gift' },
		{ name: 'Commissions', href: '/commissions' },
		{ name: 'Contact', href: '/contact' }
	];

	return (
		<motion.nav
			className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center space-x-2 group">
						<motion.div
							whileHover={{ rotate: 360 }}
							transition={{ duration: 0.5 }}
						>
							<Palette className="h-8 w-8 text-[#778259]" />
						</motion.div>
						<span className="font-heading text-xl font-bold text-[#778259] group-hover:text-[#8c9d75] transition-colors">
							Mukesh Pandian
						</span>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className="text-gray-700 hover:text-[#778259] px-3 py-2 text-sm font-medium transition-colors relative group"
							>
								{item.name}
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#778259] group-hover:w-full transition-all duration-300"></span>
							</Link>
						))}
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-700 hover:text-[#778259] transition-colors"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-t border-gray-100"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white">
							{navItems.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#778259] hover:bg-gray-50 rounded-md transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	);
};

export default Navbar;