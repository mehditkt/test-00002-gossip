import cheeseBurger from "@/assets/menu/cheese-burger.jpg";
import chickenBurger from "@/assets/menu/chicken-burger.jpg";
import gossipBurger from "@/assets/menu/gossip-burger.jpg";
import hotdog from "@/assets/menu/hotdog.jpg";
import caesar from "@/assets/menu/caesar.jpg";
import mozzaSticks from "@/assets/menu/mozza-sticks.jpg";
import chickenFingers from "@/assets/menu/chicken-fingers.jpg";
import frites from "@/assets/menu/frites.jpg";
import milkshakeClassic from "@/assets/menu/milkshake-classic.jpg";
import milkshakeSpecial from "@/assets/menu/milkshake-special.jpg";
import churrosSucre from "@/assets/menu/churros-sucre.jpg";
import churrosNutella from "@/assets/menu/churros-nutella.jpg";
import crepeSucre from "@/assets/menu/crepe-sucre.jpg";
import crepeNutellaBanane from "@/assets/menu/crepe-nutella-banane.jpg";
import fondant from "@/assets/menu/fondant.jpg";
import tarteTatin from "@/assets/menu/tarte-tatin.jpg";
import chicha from "@/assets/menu/chicha.jpg";
import boraBora from "@/assets/menu/bora-bora.jpg";
import virginMojito from "@/assets/menu/virgin-mojito.jpg";
import strawberryMojito from "@/assets/menu/strawberry-mojito.jpg";
import mojitoBull from "@/assets/menu/mojito-bull.jpg";
import nightRider from "@/assets/menu/night-rider.jpg";
import redCorvette from "@/assets/menu/red-corvette.jpg";
import sodas from "@/assets/menu/sodas.jpg";
import redbull from "@/assets/menu/redbull.jpg";
import eauJus from "@/assets/menu/eau-jus.jpg";
import sirops from "@/assets/menu/sirops.jpg";
import theMenthe from "@/assets/menu/the-menthe.jpg";
import cafe from "@/assets/menu/cafe.jpg";
import chocolatChaud from "@/assets/menu/chocolat-chaud.jpg";

export type Product = { name: string; price: string; desc: string; image: string };
export type Category = { id: string; name: string; tagline: string; cover: string; items: Product[] };

export const categories: Category[] = [
  {
    id: "narguiles",
    name: "Narguilés",
    tagline: "Têtes premium · charbons naturels",
    cover: chicha,
    items: [
      { name: "Chicha Classique", price: "15 €", desc: "Menthe · Pomme · Pomme/Menthe · Hawaï · Love 66 · Mi Amor — tête aluminium.", image: chicha },
      { name: "Goût du jour", price: "20 €", desc: "Disponible uniquement en Kaloud, Quasar ou Brohood.", image: chicha },
      { name: "Charbon naturel", price: "20 €", desc: "Kaloud · Quasar · Brohood — combustion lente, fumée dense.", image: chicha },
      { name: "Tuyau Freeze", price: "+3 €", desc: "Tuyau givré pour une expérience encore plus fraîche.", image: chicha },
    ],
  },
  {
    id: "cocktails",
    name: "Cocktails",
    tagline: "40cl · faits minute, sans alcool",
    cover: boraBora,
    items: [
      { name: "Bora Bora", price: "9 €", desc: "Fruit de la passion, ananas, framboise. L'évasion tropicale.", image: boraBora },
      { name: "Virgin Mojito", price: "9 €", desc: "Limonade, citron vert, menthe fraîche, sucre. Le classique frais.", image: virginMojito },
      { name: "Strawberry Mojito", price: "9 €", desc: "Limonade, sirop de fraise, citron vert, menthe fraîche.", image: strawberryMojito },
      { name: "Virgin Mojito Bull", price: "9 €", desc: "RedBull, citron vert, menthe fraîche, sucre. Pétillant, énergique.", image: mojitoBull },
      { name: "Night Rider", price: "9 €", desc: "Mangue, ananas, orange, grenadine. Le coucher de soleil en verre.", image: nightRider },
      { name: "Little Red Corvette", price: "9 €", desc: "Framboise, fraise, fruit de la passion. Intense et vibrant.", image: redCorvette },
    ],
  },
  {
    id: "burgers",
    name: "Starter & Burgers",
    tagline: "Frites maison · steak ou poulet",
    cover: gossipBurger,
    items: [
      { name: "Cheese Burger", price: "14 €", desc: "Steak haché, cheddar, salade, tomate, oignons grillés, ketchup, mayonnaise & frites maison.", image: cheeseBurger },
      { name: "Chicken Burger", price: "14 €", desc: "Filet de poulet pané, cheddar, salade, sauce miel moutarde & frites maison.", image: chickenBurger },
      { name: "Gossip Burger", price: "15 €", desc: "Steak haché, cheddar, salade, œuf, champignons, oignons grillés, ketchup, mayonnaise & frites maison.", image: gossipBurger },
      { name: "Hot-Dog", price: "13 €", desc: "Saucisses de poulet, cheddar, oignons frits, ketchup, moutarde américaine & frites maison.", image: hotdog },
      { name: "Caesar Salade", price: "13 €", desc: "Salade, filet de poulet pané, parmesan, croûtons, sauce Caesar.", image: caesar },
      { name: "Mozzarella Sticks", price: "8 €", desc: "Bâtonnets de mozzarella panés, dorés, fondants à cœur.", image: mozzaSticks },
      { name: "Chicken Fingers", price: "8 €", desc: "Aiguillettes de poulet pané, sauce barbecue.", image: chickenFingers },
      { name: "Portion de Frites", price: "6 €", desc: "Frites maison croustillantes. Extra cheddar +1 € · bacon +1 €.", image: frites },
    ],
  },
  {
    id: "milkshakes",
    name: "Milkshakes",
    tagline: "33cl · onctueux et gourmands",
    cover: milkshakeSpecial,
    items: [
      { name: "Milkshake Classic", price: "9 €", desc: "Au choix : fraise, vanille, chocolat ou fruit de la passion.", image: milkshakeClassic },
      { name: "Milkshake Spécial", price: "10 €", desc: "Au choix : Kinder Bueno, Schokobons, Oreo ou Speculoos.", image: milkshakeSpecial },
    ],
  },
  {
    id: "crepes",
    name: "Crêpes & Churros",
    tagline: "Faits minute · extras gourmands",
    cover: crepeNutellaBanane,
    items: [
      { name: "Churros Sucre Glace", price: "7 €", desc: "Beignets dorés, croustillants, saupoudrés de sucre glace.", image: churrosSucre },
      { name: "Churros Nutella", price: "8 €", desc: "Nos churros maison nappés de Nutella fondant.", image: churrosNutella },
      { name: "Crêpe Sucre", price: "7 €", desc: "Pâte fine maison, sucre fin. La simplicité parfaite.", image: crepeSucre },
      { name: "Crêpe Nutella", price: "8 €", desc: "Crêpe fine, Nutella fondant.", image: crepeSucre },
      { name: "Crêpe Nutella Banane", price: "9 €", desc: "Crêpe, Nutella, banane fraîche.", image: crepeNutellaBanane },
      { name: "Crêpe Nutella Banane Royale", price: "11 €", desc: "Nutella, banane, glace vanille & crème fouettée. Extras +1 € : Kinder, Schokobons, Oreo, Speculoos.", image: crepeNutellaBanane },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    tagline: "Maison · servis avec gourmandise",
    cover: fondant,
    items: [
      { name: "Fondant au Chocolat", price: "8 €", desc: "Cœur coulant, boule de glace vanille, crème fouettée.", image: fondant },
      { name: "Tarte Tatin", price: "8 €", desc: "Pommes caramélisées, glace vanille, crème fouettée.", image: tarteTatin },
    ],
  },
  {
    id: "sodas",
    name: "Sodas & Énergisants",
    tagline: "Servis bien frais",
    cover: sodas,
    items: [
      { name: "Sodas 33cl", price: "5 €", desc: "Coca, Coca Zéro, Coca Cherry, Hawaï, Schweppes Agrum, Schweppes Lemon, Orangina, Sprite, Perrier.", image: sodas },
      { name: "RedBull 25cl", price: "6 €", desc: "Pour prolonger la soirée. Givré, intense.", image: redbull },
    ],
  },
  {
    id: "boissons",
    name: "Boissons & Sirops",
    tagline: "Eaux, jus, sirops à l'eau",
    cover: eauJus,
    items: [
      { name: "Eaux & Jus 33cl", price: "5 €", desc: "Evian, Oasis Tropical, Oasis Pomme-Cassis, Ice Tea Pêche.", image: eauJus },
      { name: "Sirop à l'eau", price: "Sur demande", desc: "Grenadine, fraise, menthe, pomme verte, violette, melon, citron, kiwi, pêche, passion, ananas, framboise, banane verte, mangue, poire.", image: sirops },
    ],
  },
  {
    id: "chaudes",
    name: "Boissons Chaudes",
    tagline: "Thé à la menthe, cafés, chocolats",
    cover: theMenthe,
    items: [
      { name: "Magnum Thé à la Menthe", price: "5 €", desc: "Servi avec menthe fraîche.", image: theMenthe },
      { name: "Théière 2 pers.", price: "10 €", desc: "Thé à la menthe pour deux.", image: theMenthe },
      { name: "Théière 3 pers.", price: "15 €", desc: "Thé à la menthe pour trois.", image: theMenthe },
      { name: "Café", price: "4 €", desc: "Expresso, torréfaction maison.", image: cafe },
      { name: "Café Latté", price: "5 €", desc: "Café & lait moussé, onctueux.", image: cafe },
      { name: "Café Viennois", price: "5 €", desc: "Café surmonté de crème fouettée.", image: cafe },
      { name: "Chocolat Chaud", price: "6 €", desc: "Chocolat classique, généreux.", image: chocolatChaud },
      { name: "Chocolat Viennois", price: "6 €", desc: "Chocolat chaud & chantilly maison.", image: chocolatChaud },
    ],
  },
];
