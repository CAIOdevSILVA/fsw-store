import { Badge } from '@/components/ui/badge';
import { categoryIcon } from '@/constants/CategoryIcon';
import { Category } from '@prisma/client';
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {

  return (
    <>
      <Badge variant={"outline"} className='py-3 flex justify-center items-center gap-2 rounded-lg cursor-pointer'>
        {categoryIcon[category.slug as keyof typeof categoryIcon]}
        <span className='text-xs font-bold'>{category.name}</span>
      </Badge>
    </>
  )
}

export default CategoryItem;

