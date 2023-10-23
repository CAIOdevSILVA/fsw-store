import { Badge } from '@/components/ui/badge';
import { prismaClient } from '@/lib/prisma';
import { ShapesIcon } from 'lucide-react';
import CategoryItem from './_components/CategoryItem';

const CatalogPage = async() => {
  const categories = await prismaClient.category.findMany({});
  
  return (
    <>
      <div className='p-5 space-y-8'>
        <Badge 
          className='w-fit gap-1 border-primary px-3 py-[.375rem] text-base uppercase' 
          variant={'outline'}
        >
          <ShapesIcon size={16}/>
          Catálogo
        </Badge>

        <div className='grid grid-cols-2 gap-8'>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default CatalogPage;