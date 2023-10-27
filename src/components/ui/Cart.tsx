"use client";

import { useContext } from 'react';
import { CartContext } from '@/providers/cart';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from './badge';
import CartItem from './CartItem';
import { computeProductTotalPrice } from '@/helpers/product';
import { Separator } from './separator';
import { getCurrency } from '@/constants/constants';

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  
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

        <div className="flex flex-col gap-5">
          {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any}/>
                ))}
              </>
            ) : (
              <p className='text-center font-semibold'>Carrinho Vazio</p>
            )}
        </div>

        <div className="flex flex-col gap-3">
          <Separator orientation="horizontal"/>
          <div className="flex flex-items justify-between text-xs">
            <p>Subtotal</p>
            <p className='line-through text-zinc-300'>{getCurrency(subtotal)}</p>
          </div>

          <Separator orientation="horizontal"/>
          <div className="flex flex-items justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTIS</p>
          </div>

          <Separator orientation="horizontal"/>
          <div className="flex flex-items justify-between text-xs">
            <p>Descontos</p>
            <p>{getCurrency(totalDiscount)}</p>
          </div>

          <Separator orientation="horizontal"/>
          <div className="flex flex-items justify-between text-xs">
            <p className='text-sm font-bold'>Total</p>
            <p className='text-sm font-bold'>{getCurrency(total)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;