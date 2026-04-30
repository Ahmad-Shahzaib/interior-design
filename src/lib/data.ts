import hero1 from "@/assets/hero-1.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import about from "@/assets/about.jpg";
import studio from "@/assets/studio.jpg";
import materials from "@/assets/materials.jpg";
import contact from "@/assets/contact.jpg";

export const IMG = { hero1, p1, p2, p3, about, studio, materials, contact };

// Unsplash interior images — direct CDN links
export const UNSPLASH = {
  i1: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80",
  i2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
  i3: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80",
  i4: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80",
  i5: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1400&q=80",
  i6: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
  i7: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
  i8: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=80",
  i9: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  i10: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80",
  i11: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80",
  i12: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80",
  marble: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80",
  wood: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?w=1400&q=80",
  concrete: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  brass: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400&q=80",
  team1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
  team2: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
  team3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  team4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
};

export const PROJECTS = [
  { slug: "maison-noir", title: "Maison Noir", category: "Residential", year: "2024", location: "Paris, FR", area: "420 m²", img: IMG.p1, scope: "Full interior, FF&E, lighting" },
  { slug: "travertine-suite", title: "Travertine Suite", category: "Residential", year: "2024", location: "Milan, IT", area: "280 m²", img: IMG.p2, scope: "Bedroom suite reno" },
  { slug: "atelier-laurent", title: "Atelier Laurent", category: "Hospitality", year: "2023", location: "Lyon, FR", area: "1,200 m²", img: IMG.p3, scope: "Hotel lobby & bar" },
  { slug: "studio-blanc", title: "Studio Blanc", category: "Commercial", year: "2023", location: "London, UK", area: "640 m²", img: UNSPLASH.i1, scope: "Office & lounge" },
  { slug: "villa-orientale", title: "Villa Orientale", category: "Residential", year: "2023", location: "Marrakech, MA", area: "780 m²", img: UNSPLASH.i2, scope: "Full villa" },
  { slug: "boutique-or", title: "Boutique d'Or", category: "Retail", year: "2022", location: "Tokyo, JP", area: "180 m²", img: UNSPLASH.i3, scope: "Flagship retail" },
  { slug: "penthouse-eleven", title: "Penthouse Eleven", category: "Residential", year: "2022", location: "New York, US", area: "560 m²", img: UNSPLASH.i4, scope: "Penthouse interior" },
  { slug: "cafe-celeste", title: "Café Céleste", category: "Hospitality", year: "2022", location: "Copenhagen, DK", area: "320 m²", img: UNSPLASH.i5, scope: "Restaurant" },
  { slug: "galerie-onze", title: "Galerie Onze", category: "Retail", year: "2021", location: "Berlin, DE", area: "240 m²", img: UNSPLASH.i6, scope: "Gallery space" },
];

export const ARTICLES = [
  { slug: "art-of-shadow", title: "The Art of Shadow", category: "Philosophy", date: "Mar 2024", read: "8 min", img: UNSPLASH.i7, excerpt: "Why darkness is the most underrated material in modern interiors." },
  { slug: "stone-and-time", title: "Stone & Time", category: "Materials", date: "Feb 2024", read: "6 min", img: UNSPLASH.i8, excerpt: "On travertine, weight, and what surfaces remember." },
  { slug: "lighting-soul", title: "Lighting the Soul", category: "Lighting", date: "Jan 2024", read: "5 min", img: UNSPLASH.i9, excerpt: "How a single lamp can change the temperature of a life." },
  { slug: "hospitality-2024", title: "Hospitality 2024", category: "Trends", date: "Dec 2023", read: "10 min", img: UNSPLASH.i10, excerpt: "The hotels redefining intimacy at scale." },
];
