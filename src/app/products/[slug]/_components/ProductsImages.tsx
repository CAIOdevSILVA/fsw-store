"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface ProductsImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductsImages = ({ imageUrls, name }: ProductsImagesProps) => {
  const [currentImage, setCurrentImage] = useState<string>(imageUrls[0]);
  
  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  }

  return (
    <>
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image 
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes='100vw'
          className='h-auto max-h-[70%] w-auto max-w-[80%]'
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8 py-5">
        {imageUrls.map((imageUrl) => (
          <button 
            key={imageUrl}
            className={cn(
              `flex h-[100px] items-center justify-center rounded-lg bg-accent`, 
              imageUrl === currentImage && 'border-2 border-solid border-primary'
            )}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image 
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes='100vw'
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>   
    </div>
    </>
  )
}

export default ProductsImages;