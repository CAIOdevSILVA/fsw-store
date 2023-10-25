"use client";

import { useContext } from 'react';
import { CartContext } from '@/providers/cart';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from './badge';
import CartItem from './CartItem';
import { computeProductTotalPrice } from '@/helpers/product';

const Cart = () => {
  const { products } = useContext(CartContext);
  
  return (
    <>
      <div className='flex flex-col gap-8'>
        <Badge 
            className='w-fit gap-1 border-primary px-3 py-[.375rem] text-base uppercase' 
            variant={'outline'}
          >
            <ShoppingCartIcon size={16}/>
            Carrinho
        </Badge>

        {products.map((product) => (
          <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any}/>
        ))}
      </div>
    </>
  )
}

export default Cart;