import { Product } from '@prisma/client'
import ProductItem from '../../../components/ui/ProductItem';
import { computeProductTotalPrice } from '@/helpers/product';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <div className='flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden px-5'>
        {products.map((product) => <ProductItem key={product.id} product={computeProductTotalPrice(product)}/>)}
      </div>
    </>
  )
}

export default ProductList