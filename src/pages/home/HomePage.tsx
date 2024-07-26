import React, { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/config';
import { Pagination } from 'react-bootstrap';
import './all.css';

const NavBarComponent = lazy(() => import('../../components/common/NavbarComponent'));
const ProductCard = lazy(() => import('../../components/product/ProductCard'));
const Search = lazy(() => import('../../components/common/Search')); // Assuming there's a Search component

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	currentPrice: number;
	image: string;
}

const HomePage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8;

	const toggleVisibility = () => {
		setIsVisible(window.pageYOffset > 300);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		axios
			.get(`${SERVER_URL}/products`)
			.then((response) => {
				setProducts(response.data);
				setFilteredProducts(response.data); // Set filteredProducts initially
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});

		window.addEventListener('scroll', toggleVisibility);

		const user = localStorage.getItem('user');
		if (user) {
			const userObj = JSON.parse(user);
			setUserName(userObj.name);
		}

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const handleSearch = (term: string, minPrice?: number, maxPrice?: number, wireless?: boolean, wired?: boolean) => {
		let filtered = products.filter((product) =>
			product.name.toLowerCase().includes(term.toLowerCase())
		);

		if (minPrice !== undefined) {
			filtered = filtered.filter((product) => product.currentPrice >= minPrice);
		}

		if (maxPrice !== undefined) {
			filtered = filtered.filter((product) => product.currentPrice <= maxPrice);
		}

		if (wireless) {
			filtered = filtered.filter((product) => product.name.toLowerCase().includes('không dây'));
		}

		if (wired) {
			filtered = filtered.filter((product) => product.name.toLowerCase().includes('có dây'));
		}

		setFilteredProducts(filtered);
		setCurrentPage(1); // Reset to the first page on new search
	};

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="home-page">
			<Suspense fallback={<div>Loading...</div>}>
				<NavBarComponent />
				<div className="container mt-4">
					{userName && <h2 className="text-center">Chào mừng, {userName}!</h2>}
					<h6 className="display-6 mb-5 text-center">Danh sách sản phẩm</h6>
					<Search onSearch={handleSearch} />
					<div className="row d-flex">
						{currentProducts.map((product) => (
							<div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={product.id}>
								<ProductCard {...product} />
							</div>
						))}
					</div>

					<Pagination className="justify-content-center">
						<Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
						<Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
						{pageNumbers.map((number) => (
							<Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
								{number}
							</Pagination.Item>
						))}
						<Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} />
						<Pagination.Last onClick={() => paginate(pageNumbers.length)} disabled={currentPage === pageNumbers.length} />
					</Pagination>
				</div>
			</Suspense>
			{isVisible && (
				<div onClick={scrollToTop} className="position-fixed bottom-0 end-0 p-3">
					<button type="button" className="btn btn-secondary">
						<span className="text-white">&uarr;</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default HomePage;
