"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
	HomeIcon,  
	ListOrderedIcon, 
	LogInIcon, 
	LogOutIcon, 
	MenuIcon,  
	PercentIcon,  
	ShoppingCartIcon,
} from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { headerMenuContent } from '@/constants/constants';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import ButtonHeader from './ButtonHeader';
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Separator } from './separator';
import Link from 'next/link';

const Header = () => {
	const { status, data } = useSession();

	const handleLoginClick = async() => {
		await signIn();
	}

	const handleLogoutClick = async() => {
		await signOut();
	}

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

						{status === 'authenticated' && data?.user && (
							<div className='py-4 flex items-center gap-2'>
								<Avatar>
									<AvatarFallback className='w-8 h-8 rounded-full bg-primary text-white'>
										{data?.user?.name?.[0].toUpperCase()}
									</AvatarFallback>

									{data?.user?.image && <AvatarImage src={data?.user.image}/>}
								</Avatar>

								<div className="flex flex-col">
									<p className='font-medium'>{data?.user?.name}</p>
									<p className='text-xs text-zinc-300 opacity-75'>Boas compras!</p>
								</div>
							</div>
						)}
						<Separator orientation='horizontal' className='bg-zinc-800'/>
						<div className="mt-4 flex flex-col gap-2">
							{status === 'unauthenticated' && (
								<ButtonHeader
									id={1}
									title={"Fazer login"}
									icon={LogInIcon}
									onClick={handleLoginClick}
								/>
							)}

							{status === 'authenticated' && (
								<ButtonHeader
									id={1}
									title={"Fazer Logout"}
									icon={LogOutIcon}
									onClick={handleLogoutClick}
								/>
							)}
							
							{headerMenuContent.map((content) => (
								<SheetClose  key={content.id} asChild>
									<Link href={`${content.link}`}>
										<ButtonHeader
											id={content.id}
											title={content.title}
											icon={content.icon}
										/>
									</Link>
								</SheetClose>
							))}
						</div>
					</SheetContent>
				</Sheet>

				<Link href={"/"}>
					<h1 className="font-semibold text-lg">
						<span className="text-primary">FSW</span> Store
					</h1>
				</Link>				

				<Button size={"icon"} variant={"outline"}>
					<ShoppingCartIcon />
				</Button>
			</Card>
		</>
  )
}

export default Header;