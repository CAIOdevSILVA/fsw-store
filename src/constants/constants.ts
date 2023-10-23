import { 
	ListOrderedIcon, 
	LogInIcon, 
	HomeIcon,  
	PercentIcon
} from 'lucide-react';

export const headerMenuContent = [
  {
    id: 2,
    title: "Início",
    icon: HomeIcon,
    link: "/"
  },
  {
    id: 3,
    title: "Ofertas",
    icon: PercentIcon,
    link: '/'
  },
  {
    id: 4,
    title: "Catálogo",
    icon: ListOrderedIcon,
    link: '/catalog'
  },
]