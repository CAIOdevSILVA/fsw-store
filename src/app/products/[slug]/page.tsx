import { prismaClient } from '@/lib/prisma'
import ProductsImages from './_components/ProductsImages';
import ProductsInfo from './_components/ProductsInfo';
import { computeProductTotalPrice } from '@/helpers/product';

interface ProductDetailsPage {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async({ params: { slug } }: ProductDetailsPage) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    }
  });
  
  if(!product) return null;

  
  return (
    <>
      <div className='p-5 space-y-8'>
        <ProductsImages imageUrls={product.imageUrls} name={product.name} />
        <ProductsInfo product={computeProductTotalPrice(product)}/>
      </div>
    </>
  );
};

export default ProductDetailsPage;