"use client";

import { useContext } from 'react';
import { CartContext } from '@/providers/cart';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from './badge';

const Cart = () => {
  const { products } = useContext(CartContext);
  
  return (
    <>
      <div>
        <Badge 
            className='w-fit gap-1 border-primary px-3 py-[.375rem] text-base uppercase' 
            variant={'outline'}
          >
            <ShoppingCartIcon size={16}/>
            Carrinho
        </Badge>

        {products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
          </div>
        ))}
      </div>
    </>
  )
}

export default Cart;