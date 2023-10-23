import { Badge } from '@/components/ui/badge';
import { categoryIcon } from '@/constants/CategoryIcon';
import { Category } from '@prisma/client';
import Link from 'next/link';
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {

  return (
    <Link href={`/category/${category.slug}`}>
      <Badge variant={"outline"} className='py-3 flex justify-center items-center gap-2 rounded-lg cursor-pointer'>
        {categoryIcon[category.slug as keyof typeof categoryIcon]}
        <span className='text-xs font-bold'>{category.name}</span>
      </Badge>
    </Link>
  )
}

export default CategoryItem;

