"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
	HomeIcon, 
	ListOrderedIcon, 
	LogInIcon, 
	MenuIcon,  
	PercentIcon,  
	ShoppingCartIcon,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { headerMenuContent } from '@/constants/constants';
import ButtonHeader from './ButtonHeader';

const Header = () => {
  return (
		<>
			<Card  className="flex justify-between p-[1.875rem]">
				<Sheet>
					<SheetTrigger asChild>
						<Button size={"icon"} variant={"outline"}>
							<MenuIcon/>
						</Button>
					</SheetTrigger>

					<SheetContent side={"left"}>
						<SheetHeader className='text-left text-lg font-semibold'>Menu</SheetHeader>

						<div className="mt-2 flex flex-col gap-2">
							{headerMenuContent.map((content) => (
								<ButtonHeader
									key={content.title}
									title={content.title}
									icon={content.icon}
								/>
							))}
						</div>
					</SheetContent>
				</Sheet>

				<h1 className="font-semibold text-lg">
					<span className="text-primary">FSW</span> Store
				</h1>

				<Button size={"icon"} variant={"outline"}>
					<ShoppingCartIcon />
				</Button>
			</Card>
		</>
  )
}

export default Header;