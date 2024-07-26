/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingComponent from '../components/common/LoadingComponent';
import Error404 from '../pages/error/Error404';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const LoginPage = lazy(() => import('../pages/login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/register/RegisterPage')); // Ensure this is the correct path
const AboutPage = lazy(() => import('../pages/about/AboutPage'));
const ProductListPage = lazy(() => import('../pages/products/ProductListPage'));
const AddProductPage = lazy(() => import('../pages/products/AddProductPage'));
const UpdateProductPage = lazy(() => import('../pages/products/UpdateProductPage'));
const ProductDetailPage = lazy(() => import('../pages/products/ProductDetailPage'));

export const router = createBrowserRouter([
  {
    path: '/clickshop/',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/login',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/register',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/about',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/products',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ProductListPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/add-product',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <AddProductPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/update-product/:id',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <UpdateProductPage />
      </Suspense>
    ),
  },
  {
    path: '/clickshop/detail-product/:id',
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ProductDetailPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);
