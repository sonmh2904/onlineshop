import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const NavBarComponent = () => {
	const accountName = localStorage.getItem('account_name');
	const navigate = useNavigate();
	const location = useLocation();

	const handleManageClick = () => {
		if (accountName) {
			navigate('/clickshop/products');
		} else {
			Swal.fire({
				title: 'Vui lòng đăng nhập để tiếp tục!',
				icon: 'question',
			}).then(() => {
				navigate('/clickshop/login');
			});
		}
	};

	const activeStyle = {
		color: '#bb2d3b',
		fontWeight: 'bold',
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
			<div className="container">
				<Link className="navbar-brand fw-bold" to="/clickshop/">
					ClickShop
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className="nav-link"
								style={location.pathname === '/clickshop/' ? activeStyle : {}}
								to="/clickshop/"
							>
								Danh sách sản phẩm
							</Link>
						</li>
						<li className="nav-item">
							<button
								className="nav-link btn btn-link"
								style={
									location.pathname === '/clickshop/products'
										? activeStyle
										: { color: 'inherit', textDecoration: 'none' }
								}
								onClick={handleManageClick}
							>
								Quản lý sản phẩm
							</button>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								style={location.pathname === '/clickshop/about' ? activeStyle : {}}
								to="/clickshop/about"
							>
								Giới thiệu
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav ms-auto">
						{accountName ? (
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{accountName}
								</a>
								<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
									<li>
										<button
											onClick={() => {
												localStorage.removeItem('account_name');
												navigate('/clickshop/');
											}}
											className="dropdown-item"
										>
											Đăng xuất
										</button>
									</li>
								</ul>
							</li>
						) : (
							<li className="nav-item">
								<Link className="nav-link" to="/clickshop/login">
									Đăng nhập
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBarComponent;
