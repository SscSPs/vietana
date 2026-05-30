export const TRIP_BUILDER_CONSTANTS = {
  visa: {
    single: 2500,
    multiple: 5000,
  },
  flights: {
    round: {
      budget: 22000,
      comfort: 28000,
      premium: 38000,
      luxury: 55000,
    },
    oneway: {
      budget: 12000,
      comfort: 15000,
      premium: 22000,
      luxury: 30000,
    }
  },
  transfers: {
    budget: 600,
    comfort: 1000,
    premium: 1500,
    luxury: 3000,
  },
  daily: {
    budget: { hotels: 1200, food: 700, transport: 400, experiences: 500, total: 2800 },
    comfort: { hotels: 3000, food: 1200, transport: 600, experiences: 1200, total: 6000 },
    premium: { hotels: 5000, food: 1800, transport: 1000, experiences: 2000, total: 9800 },
    luxury: { hotels: 9000, food: 3000, transport: 2000, experiences: 4000, total: 18000 },
  }
};

export const TRIP_BUILDER_CITIES = [
  "Hanoi", "Sapa", "Halong Bay", "Ninh Binh", "Da Nang", "Hoi An", "Hue", "Nha Trang", "Da Lat", "Ho Chi Minh City", "Phu Quoc"
];
