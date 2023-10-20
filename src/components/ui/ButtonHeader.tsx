import { LucideIcon } from "lucide-react";
import { Button } from './button';

interface ButtonHeaderProps {
  id: number;
  title: string;
  icon: LucideIcon;
  onClick?: () => {}
}

const ButtonHeader = ({
  id, title, icon: Icon, onClick
}: ButtonHeaderProps) => {
  return (
    <>
      <Button 
        variant={"outline"} 
        className="w-full justify-start gap-2"
        onClick={onClick}
      >
        <Icon size={16} />
        {title}
      </Button>
    </>
  );
};

export default ButtonHeader;
