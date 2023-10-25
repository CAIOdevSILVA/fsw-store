"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

import Link from 'next/link';
import Cart from './Cart';
import SidebarMenu from './SidebarMenu';

const Header = () => {
	
  return (
		<>
			<Card  className="flex justify-between p-[1.875rem]">
				<SidebarMenu />

				<Link href={"/"}>
					<h1 className="font-semibold text-lg">
						<span className="text-primary">FSW</span> Store
					</h1>
				</Link>				

				<Sheet>
					<SheetTrigger>
						<Button variant={"outline"} size={"icon"}>
							<ShoppingCartIcon />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<Cart />
					</SheetContent>
				</Sheet>
			</Card>
		</>
  )
}

export default Header;