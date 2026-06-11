import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import type { IRootState } from '@config/store';
import './ProductDetailPage.scss';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector(({ Products }: IRootState) =>
    Products.items.find((p) => p.id === Number(id)),
  );

  if (!product) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 gap-3">
        <p className="text-muted fs-5">Product not found.</p>
        <Button color="primary" outline onClick={() => navigate('/')}>
          Back to catalogue
        </Button>
      </div>
    );
  }

  const stockColor = product.stock > 20 ? 'success' : product.stock > 5 ? 'warning' : 'danger';
  const stockLabel = product.stock > 20 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Almost Gone';
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));
  const image = product.images[0] ?? product.thumbnail;

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__topbar">
        <Container>
          <Button
            color="link"
            className="product-detail-page__back-btn px-0 text-decoration-none text-muted"
            onClick={() => navigate('/')}
          >
            ← Back to catalogue
          </Button>
        </Container>
      </div>

      <Container className="product-detail-page__content py-5">
        <Row className="g-5 align-items-start">
          <Col xs={12} md={5}>
            <div className="product-detail-page__image-wrapper">
              <img
                src={image}
                alt={product.title}
                className="product-detail-page__image"
                loading="lazy"
              />
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className="product-detail-page__info">
              <div className="d-flex gap-2 mb-3">
                <Badge color="secondary" className="product-detail-page__category">
                  {product.category}
                </Badge>
                <Badge color="light" text="dark" className="product-detail-page__brand">
                  {product.brand}
                </Badge>
              </div>

              <h1 className="product-detail-page__name h3 fw-bold mb-2">
                {product.title}
              </h1>

              <div className="product-detail-page__rating d-flex align-items-center gap-2 mb-3">
                <div className="product-detail-page__stars">
                  {stars.map((filled, i) => (
                    <span key={i} className={filled ? 'star star--filled' : 'star'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted small">{product.rating.toFixed(1)} / 5.0</span>
              </div>

              <div className="d-flex align-items-baseline gap-3 mb-4">
                <p className="product-detail-page__price fw-bold text-primary mb-0">
                  ${product.price.toFixed(2)}
                </p>
                {product.discountPercentage > 0 && (
                  <Badge color="danger" className="product-detail-page__discount">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </Badge>
                )}
              </div>

              <p className="product-detail-page__description text-secondary mb-4">
                {product.description}
              </p>

              <div className="product-detail-page__meta mb-4">
                <Row className="g-2">
                  <Col xs={6}>
                    <div className="product-detail-page__meta-item">
                      <span className="text-muted small d-block">SKU</span>
                      <span className="fw-semibold">{product.sku}</span>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="product-detail-page__meta-item">
                      <span className="text-muted small d-block">Availability</span>
                      <Badge color={stockColor} className="product-detail-page__stock">
                        {stockLabel} ({product.stock} units)
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="d-flex gap-3">
                <Button color="primary" size="lg" className="flex-grow-1">
                  Add to Cart
                </Button>
                <Button color="outline-secondary" size="lg">
                  ♡
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetailPage;
