import { Suspense, lazy } from 'react';

const RegisterForm = lazy(() => import('../../components/register/RegisterForm'));

const RegisterPage = () => {
	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<RegisterForm />
				</Suspense>
			</div>
		</>
	);
};

export default RegisterPage;
