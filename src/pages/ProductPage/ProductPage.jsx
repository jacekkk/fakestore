import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { getProduct } from '../../services/products/products-service'

const Image = styled.img`
  max-width: 200px;
`

function ProductPage() {
  let params = useParams();
  const [product, setProduct] = useState(null)
  const imagePlaceholder = 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(params.productId);
        setProduct(product);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [params.productId]);

  if (!product) {
    return <p>Fetching product details...</p>
  }

  return (
    <>
      <p>ID: {product.id}</p>
      <p>Title: {product.title}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Rating</p>
      <p>Rate: {product.rating.rate}</p>
      <p>Count: {product.rating.count}</p>
      <Image src={product.image || imagePlaceholder} alt="" />
    </>
  )
}

export default ProductPage
