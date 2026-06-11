import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';

const CatalogPage = lazy(() => import('@components/home/catalog/CatalogPage'));
const ProductDetailPage = lazy(() => import('@components/home/catalog/components/product-detail/ProductDetailPage'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner color="primary" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
