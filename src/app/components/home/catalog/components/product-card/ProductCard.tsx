import { useNavigate } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Badge } from 'reactstrap';
import type { IProduct } from '@reducers/products/ProductsReducer';
import './ProductCard.scss';

interface IProductCardProps {
  product: IProduct;
}

function ProductCard({ product }: IProductCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/products/${product.id}`);
  }

  return (
    <Card className="product-card h-100" onClick={handleClick} role="button">
      <div className="product-card__image-wrapper">
        <CardImg
          top
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <CardBody className="d-flex flex-column">
        <Badge color="secondary" className="product-card__category mb-2">
          {product.category}
        </Badge>
        <CardTitle tag="h6" className="product-card__name fw-semibold mb-1">
          {product.title}
        </CardTitle>
        <CardText className="product-card__sku text-muted small mb-auto">
          {product.brand} · {product.sku}
        </CardText>
        <div className="product-card__footer mt-3 d-flex justify-content-between align-items-center">
          <span className="product-card__price fw-bold fs-5">
            ${product.price.toFixed(2)}
          </span>
          <span className="product-card__rating text-muted small">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
