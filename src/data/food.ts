import { FoodItem } from '../types';

export const VEG_ITEMS: FoodItem[] = [
  { id: 'dal-makhani', name: 'Dal Makhani', desc: 'Slow-cooked black lentils with butter and cream. A North Indian classic.', tags: ['North Indian', 'Rich'], img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80' },
  { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', desc: 'Cottage cheese cubes in a creamy tomato gravy.', tags: ['Popular', 'Vegetarian'], img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=800&q=80' },
  { id: 'chole-bhature', name: 'Chole Bhature', desc: 'Spicy chickpea curry served with fried bread.', tags: ['Punjabi', 'Comfort'], img: 'https://images.unsplash.com/photo-1626082895617-2c6ad3ed3298?w=800&q=80' },
  { id: 'masala-dosa', name: 'Masala Dosa', desc: 'Crispy rice crepe filled with spiced potato mash. Served with sambar and chutney.', tags: ['South Indian', 'Breakfast'], img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { id: 'palak-paneer', name: 'Palak Paneer', desc: 'Paneer in a thick paste made from puréed spinach and seasoned with garlic, garam masala, and other spices.', tags: ['Healthy', 'North Indian'], img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80' },
  { id: 'veg-biryani', name: 'Vegetable Biryani', desc: 'Aromatic basmati rice cooked with mixed vegetables and traditional spices.', tags: ['Rice', 'Spicy'], img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80' },
  { id: 'malai-kofta', name: 'Malai Kofta', desc: 'Deep-fried potato and paneer balls in a creamy, rich, mild and sweet onion tomato gravy.', tags: ['Rich', 'Mughlai'], img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80' },
  { id: 'aloo-gobi', name: 'Aloo Gobi', desc: 'Potatoes and cauliflower cooked with onions, tomatoes and spices.', tags: ['Dry', 'Homestyle'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'baingan-bharta', name: 'Baingan Bharta', desc: 'Fire-roasted eggplant mashed and cooked with onions, tomatoes, and spices.', tags: ['Smoky', 'Punjabi'], img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80' },
  { id: 'kadai-paneer', name: 'Kadai Paneer', desc: 'Paneer and bell peppers cooked in a spicy tomato gravy with freshly ground kadai masala.', tags: ['Spicy', 'Popular'], img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=800&q=80' },
  { id: 'sambar-vada', name: 'Sambar Vada', desc: 'Deep-fried lentil donuts served immersed in hot, spicy lentil soup.', tags: ['South Indian', 'Snack'], img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { id: 'uttapam', name: 'Uttapam', desc: 'Thick pancake made from rice and lentil batter, topped with tomatoes, onions, and chilies.', tags: ['South Indian', 'Healthy'], img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' },
  { id: 'rajma-chawal', name: 'Rajma Chawal', desc: 'Red kidney bean curry served with steamed basmati rice.', tags: ['Comfort', 'North Indian'], img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80' },
  { id: 'bhindi-masala', name: 'Bhindi Masala', desc: 'Stir-fried okra cooked with onions, tomatoes, and Indian spices.', tags: ['Dry', 'Homestyle'], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
  { id: 'pavos-bhaji', name: 'Pav Bhaji', desc: 'A spicy mash of vegetables served with hot, buttered bread rolls.', tags: ['Street Food', 'Mumbai'], img: 'https://images.unsplash.com/photo-1626082895617-2c6ad3ed3298?w=800&q=80' }
];

export const NON_VEG_ITEMS: FoodItem[] = [
  { id: 'butter-chicken', name: 'Butter Chicken', desc: 'Tender chicken pieces cooked in a smooth, buttery and creamy tomato-based gravy.', tags: ['North Indian', 'Popular'], img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80' },
  { id: 'chicken-tikka-masala', name: 'Chicken Tikka Masala', desc: 'Roasted marinated chicken chunks (tikka) in a spiced curry sauce.', tags: ['Classic', 'Rich'], img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80' },
  { id: 'mutton-rogan-josh', name: 'Mutton Rogan Josh', desc: 'Aromatic lamb dish of Persian origin, which is one of the signature recipes of Kashmiri cuisine.', tags: ['Kashmiri', 'Spicy'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' },
  { id: 'chicken-biryani', name: 'Chicken Biryani', desc: 'A world-renowned Indian dish, long-grained rice flavored with fragrant spices and layered with chicken.', tags: ['Mughlai', 'Rice'], img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80' },
  { id: 'tandoori-chicken', name: 'Tandoori Chicken', desc: 'Chicken marinated in yogurt and spices and roasted in a tandoor, a cylindrical clay oven.', tags: ['Starter', 'Smoky'], img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80' },
  { id: 'fish-curry', name: 'Goan Fish Curry', desc: 'Spicy and tangy fish curry made with coconut, tamarind, and Goan spices.', tags: ['Seafood', 'Coastal'], img: 'https://images.unsplash.com/photo-1626804475297-41609ea265eb?w=800&q=80' },
  { id: 'mutton-biryani', name: 'Hyderabadi Mutton Biryani', desc: 'A classic Indian dish made with goat meat, basmati rice, and a blend of aromatic spices.', tags: ['Hyderabadi', 'Iconic'], img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80' },
  { id: 'keema-matar', name: 'Keema Matar', desc: 'Minced meat cooked with green peas, onions, tomatoes, and spices.', tags: ['Minced', 'Comfort'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' },
  { id: 'chicken-korma', name: 'Chicken Korma', desc: 'Chicken cooked in a mild, creamy sauce made with yogurt, cream, nut pastes, and seed pastes.', tags: ['Mughlai', 'Mild'], img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80' },
  { id: 'prawn-masala', name: 'Prawn Masala', desc: 'Juicy prawns cooked in a spicy, flavorful tomato-onion gravy.', tags: ['Seafood', 'Spicy'], img: 'https://images.unsplash.com/photo-1626804475297-41609ea265eb?w=800&q=80' },
  { id: 'chicken-chettinad', name: 'Chicken Chettinad', desc: 'A classic South Indian recipe from Tamil Nadu, known for its spicy and aromatic flavor profile.', tags: ['South Indian', 'Very Spicy'], img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80' },
  { id: 'mutton-korma', name: 'Mutton Korma', desc: 'Tender goat meat slow-cooked in a rich, aromatic yogurt and spice gravy.', tags: ['Awadhi', 'Rich'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' },
  { id: 'chicken-65', name: 'Chicken 65', desc: 'Spicy, deep-fried chicken dish originating from Chennai, as an entrée, or quick snack.', tags: ['Starter', 'Spicy'], img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80' },
  { id: 'fish-fry', name: 'Amritsari Fish Fry', desc: 'Crispy batter-fried fish, a popular street food from the city of Amritsar.', tags: ['Starter', 'Punjabi'], img: 'https://images.unsplash.com/photo-1626804475297-41609ea265eb?w=800&q=80' },
  { id: 'bhuna-gosht', name: 'Bhuna Gosht', desc: 'Mutton pieces pan-fried with spicy onions and tomatoes.', tags: ['Dry', 'Intense'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' }
];

export const CAFES = [
  '☕ The Note Coffee', '☕ Cộng Cà Phê', '☕ Cafe Giảng (Egg Coffee)', '☕ Ru Nam Bistro', '☕ L\'Usine'
];
