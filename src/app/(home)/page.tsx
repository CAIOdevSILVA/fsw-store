import Image from 'next/image';
import Categories from './_components/Categories';
import ProductList from './_components/ProductList';

import { prismaClient } from '@/lib/prisma';

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0 //discount maior que 0
      }
    }
  });


  return (
    <>
      <div className='p-5 space-y-8'>
        <Image 
          src={'/banner-home-1.png'}
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-auto'
          alt='Até 55% de desconto nesse mês!'
        />

        <Categories />
        <ProductList products={deals}/>

      </div>
    </>
  );
}
