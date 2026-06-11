import { useState } from 'react';
import {
  Container, Row, Col, Input, InputGroup, Spinner,
  Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import { useGetProductsQuery } from '@reducers/products/ProductsApi';
import useDebounce from '@shared/hooks/useDebounce';
import ProductCard from './components/product-card/ProductCard';
import './CatalogPage.scss';

const LIMIT = 12;

const getPageNumbers = (current: number, total: number): (number | '...')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

/**
 * use the dummy api instead: https://dummyjson.com/docs/products
 *
 */
const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: LIMIT,
    keyword: debouncedSearch,
  });

  const { products = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / LIMIT);

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="catalog-page">
      <header className="catalog-page__header">
        <Container>
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="catalog-page__logo">
              <span className="catalog-page__logo-text">ersatzteilstore</span>
              <span className="catalog-page__logo-badge">24</span>
            </div>
            <span className="text-muted small d-none d-md-block">
              Quality auto parts for every vehicle
            </span>
          </div>
        </Container>
      </header>

      <div className="catalog-page__search-bar">
        <Container>
          <InputGroup className="catalog-page__search-input">
            <span className="input-group-text bg-white border-end-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-muted"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11" />
              </svg>
            </span>
            <Input
              type="text"
              placeholder="Search by name, category, or SKU…"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="border-start-0 ps-0"
            />
            {searchTerm && (
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => handleSearchChange('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </InputGroup>
        </Container>
      </div>

      <Container className="catalog-page__content py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="catalog-page__title h5 mb-0">
            {searchTerm
              ? `${total} result${total !== 1 ? 's' : ''} for "${searchTerm}"`
              : 'All Products'}
          </h1>
          {total > 0 && (
            <span className="text-muted small">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner color="primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="catalog-page__empty text-center py-5">
            <p className="text-muted fs-5 mb-1">No products found</p>
            <p className="text-muted small">Try a different search term</p>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="catalog-page__pagination d-flex justify-content-center mt-5">
                <Pagination aria-label="Product pagination">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>

                  {getPageNumbers(currentPage, totalPages).map((page, i) =>
                    page === '...' ? (
                      <PaginationItem key={`ellipsis-${i}`} disabled>
                        <PaginationLink>…</PaginationLink>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page} active={page === currentPage}>
                        <PaginationLink onClick={() => handlePageChange(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      next
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default CatalogPage;
