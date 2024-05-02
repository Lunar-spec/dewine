import { adminCardProps, Product, sideBarProps } from "@/types";
import { FaCcMastercard, FaMailBulk, FaUserCircle, FaUserFriends } from "react-icons/fa";
import { FaChessKing, FaScrewdriverWrench } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";

export const headerLinks: { text: string; href: string }[] = [
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Contact",
    href: "/contact",
  },
];

export const productDefault = {
  brand: "",
  title: "",
  description: "",
  img: "",
  year: "",
  alcohol: "",
  size: "",
  price: "",
  winery: "",
  category: {
    _id: "",
    name: "",
  },
}

export const products: Product[] = [
  {
    _id: "1",
    brand: "Kai-Simone",
    title: "Cabernet Sauvignon",
    description:
      "Bold and dry with notes of black currants, chocolate, and coffee, finishing with a hint of vanilla.",
    img: "/assets/kai.avif",
    year: "2020",
    alcohol: "14%",
    size: "750ml",
    price: "$35",
    winery: "Hill Country, Texas",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "2",
    brand: "Talamonti",
    title: "Montepulciano",
    description:
      "A bold and structured red wine with intense flavors of black cherry, plum, and leather, underscored by hints of spice and earthiness.",
    img: "/assets/moda.avif",
    year: "2020",
    alcohol: "13%",
    size: "750ml",
    price: "$30",
    winery: "Montepulciano d'Abruzzo, Italy",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "3",
    brand: "Borsao Bodegas",
    title: "Barrica",
    description:
      "A rich and complex red wine with flavors of plum, fig, chocolate, and spice, finishing with a sweet note.",
    img: "/assets/borsao.avif",
    year: "2020",
    alcohol: "18%",
    size: "500ml",
    price: "$45",
    winery: "Campo de Borja, Spain",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "4",
    brand: "Bonpas",
    title: "Grand Orateur Red",
    description:
      "A vibrant red wine with flavors of passion fruit, gooseberry, and citrus, complemented by a crisp acidity.",
    img: "/assets/rasteau.avif",
    year: "2019",
    alcohol: "14%",
    size: "750ml",
    price: "$40",
    winery: "Rhone Valley, France",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "5",
    brand: "Ondulé",
    title: "Esmi",
    description:
      "A fruity and refreshing red wine with notes of citrus, berries, and spice, perfect for any occasion.",
    img: "/assets/ondule.avif",
    year: "2014",
    alcohol: "13%",
    size: "750ml",
    price: "$20",
    winery: "Napa Valley, California",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "6",
    brand: "Puisseguin Saint-Émilion",
    title: "Esprit de Puisseguin",
    description:
      "A bold and flavorful red wine with rich notes of dark berries, plum, and spice, finishing with a smooth and lingering taste.",
    img: "/assets/wayne.avif",
    year: "2016",
    alcohol: "13.5%",
    size: "750ml",
    price: "$25",
    winery: "Château des Laurets, Bordeaux, France",
    category: {
      _id: "3",
      name: "Red Wine",
    },
  },
  {
    _id: "7",
    brand: "Broadleaf",
    title: "Cabernet Sauvignon",
    description:
      "A classic Cabernet Sauvignon with dry yet bold flavors of black currants, chocolate, and coffee.",
    img: "/assets/broadleaf.avif",
    year: "2002",
    alcohol: "14%",
    size: "750ml",
    price: "$35",
    winery: "Maipo Valley, Chile",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "8",
    brand: "Artezin Mendocino",
    title: "Zinfandel",
    description:
      "Silky smooth with flavors of cherry, strawberry, and spice, underscored by earthy undertones.",
    img: "/assets/artezin.avif",
    year: "2019",
    alcohol: "15%",
    size: "750ml",
    price: "$40",
    winery: "Mendocino County, California",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
  {
    _id: "9",
    brand: "Château de Beauregard",
    title: "Chardonnay",
    description:
      "A crisp white wine with flavors of green apple, pear, and citrus, finishing with a hint of butter.",
    img: "/assets/chardonnay.avif",
    year: "2019",
    alcohol: "13%",
    size: "750ml",
    price: "$30",
    winery: "Burgundy, France",
    category: {
      _id: "2",
      name: "White Wine",
    },
  },
  {
    _id: "10",
    brand: "Monte Sasso",
    title: "Primitivo di Manduria",
    description:
      "A robust red wine with intense flavors of blackberry, currant, spice, and vanilla, finishing with a long, smooth note.",
    img: "/assets/monte.avif",
    year: "2017",
    alcohol: "16%",
    size: "750ml",
    price: "$50",
    winery: "Puglia, Italy",
    category: {
      _id: "1",
      name: "Red Wine",
    },
  },
];

export const adminCards: adminCardProps[] = [
  {
    icon: FaUserFriends,
    title: "Users",
    count: 12,
  },
  {
    icon: GiShoppingBag,
    title: "Products",
    count: 10,
  },
  {
    icon: FaCcMastercard,
    title: "Orders",
    count: 20,
  },
];

export const sideBarLinks: sideBarProps[] = [
  {
    text: "Dashboard",
    href: "/admin",
    icon: FaChessKing,
  },
  {
    text: "Users",
    href: "/admin/users",
    icon: FaUserFriends,
  },
  {
    text: "Products",
    href: "/admin/products",
    icon: GiShoppingBag,
  },
  {
    text: "Orders",
    href: "/admin/orders",
    icon: FaCcMastercard,
  },
  {
    text: "Contact",
    href: "#",
    icon: FaMailBulk,
  },
  {
    text: "Settings",
    href: "#",
    icon: FaScrewdriverWrench,
  },
]