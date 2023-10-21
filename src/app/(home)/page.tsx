"use client";

import Image from 'next/image';
import Categories from './_components/Categories';

export default function Home() {

  return (
    <>
      <div className='p-5'>
        <Image 
          src={'/banner-home-1.png'}
          width={0}
          height={0}
          sizes='100vw'
          className='w-full h-auto'
          alt='Até 55% de desconto nesse mês!'
        />

        <div className='mt-8'>
          <Categories />
        </div>
      </div>
    </>
  );
}
