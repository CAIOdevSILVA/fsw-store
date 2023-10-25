import { headerMenuContent } from '@/constants/constants';
import { MenuIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import ButtonHeader from './ButtonHeader';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Separator } from './separator';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetClose } from './sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';



const SidebarMenu = () => {
  const { status, data } = useSession();

	const handleLoginClick = async() => {
		await signIn();
	}

	const handleLogoutClick = async() => {
		await signOut();
	}

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side={"left"}>
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarFallback className="h-8 w-8 rounded-full bg-primary text-white">
                  {data?.user?.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data?.user?.image && <AvatarImage src={data?.user.image} />}
              </Avatar>

              <div className="flex flex-col">
                <p className="font-medium">{data?.user?.name}</p>
                <p className="text-xs text-zinc-300 opacity-75">
                  Boas compras!
                </p>
              </div>
            </div>
          )}
          <Separator orientation="horizontal" className="bg-zinc-800" />
          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <ButtonHeader
                id={1}
                title={"Fazer login"}
                icon={LogInIcon}
                onClick={handleLoginClick}
              />
            )}

            {status === "authenticated" && (
              <ButtonHeader
                id={1}
                title={"Fazer Logout"}
                icon={LogOutIcon}
                onClick={handleLogoutClick}
              />
            )}

            {headerMenuContent.map((content) => (
              <SheetClose key={content.id} asChild>
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
    </>
  );
};

export default SidebarMenu;
