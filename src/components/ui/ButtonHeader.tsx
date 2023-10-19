import { LucideIcon } from "lucide-react";
import { Button } from './button';

interface ButtonHeaderProps {
  title: string;
  icon: LucideIcon;
}

const ButtonHeader = ({
  title, icon: Icon
}: ButtonHeaderProps) => {
  return (
    <>
      <Button variant={"outline"} className="w-full justify-start gap-2">
        <Icon size={16} />
        {title}
      </Button>
    </>
  );
};

export default ButtonHeader;
