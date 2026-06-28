import { flightApiConfig } from '../config/travelpayouts';

export interface FlightRoute {
  airline: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  bookingUrl: string;
}

const AIRLINES: Record<string, { name: string; logo: string }> = {
  VN: { name: 'Vietnam Airlines', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' },
  VJ: { name: 'VietJet Air', logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=80&h=80&fit=crop&q=80' },
  '6E': { name: 'IndiGo', logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop&q=80' },
  AI: { name: 'Air India', logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=80&h=80&fit=crop&q=80' },
  SQ: { name: 'Singapore Airlines', logo: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=80&h=80&fit=crop&q=80' }
};

export async function searchFlights(
  from: string,
  to: string,
  date: string,
  passengers: number = 1
): Promise<FlightRoute[]> {
  const origin = from.toUpperCase().trim();
  const destination = to.toUpperCase().trim();
  
  const dateParts = date.split('-');
  const formattedDateForDeepLink = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`; // YYYY-MM-DD
  
  // Try Kiwi API if API key is present
  if (flightApiConfig.kiwiApiKey) {
    try {
      const kiwiDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      const response = await fetch(
        `https://api.tequila.kiwi.com/v2/search?fly_from=${origin}&fly_to=${destination}&date_from=${kiwiDate}&date_to=${kiwiDate}&adults=${passengers}&curr=INR&limit=10`,
        {
          headers: { apikey: flightApiConfig.kiwiApiKey }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.data.map((flight: any) => {
          const airline = flight.airlines[0] || 'VN';
          const airlineInfo = AIRLINES[airline] || { name: flight.airlines[0], logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80' };
          const durationHrs = Math.floor(flight.duration.total / 3600);
          const durationMins = Math.floor((flight.duration.total % 3600) / 60);
          
          return {
            airline,
            airlineName: airlineInfo.name,
            airlineLogo: airlineInfo.logo,
            flightNumber: `${airline}${flight.route[0]?.flight_no || '101'}`,
            departureTime: new Date(flight.local_departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrivalTime: new Date(flight.local_arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: `${durationHrs}h ${durationMins}m`,
            stops: flight.route.length - 1,
            price: Math.round(flight.price),
            bookingUrl: `https://www.kiwi.com/deep?from=${origin}&to=${destination}&departure=${formattedDateForDeepLink}&passengers=${passengers}`
          };
        });
      }
    } catch (e) {
      console.error('Error fetching live flights:', e);
      if (!flightApiConfig.useMockFallback) {
        throw e;
      }
    }
  }

  // Fallback / Smart Mock Data Generator (Customized dynamically by route)
  if (flightApiConfig.useMockFallback) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isIndia = (code: string) => ['DEL', 'BOM', 'BLR', 'MAA', 'CCU', 'HYD'].includes(code);
    const isVietnam = (code: string) => ['SGN', 'HAN', 'DAD', 'PQC', 'CXR'].includes(code);

    const bookingUrl = `https://www.kiwi.com/deep?from=${origin}&to=${destination}&departure=${formattedDateForDeepLink}&passengers=${passengers}`;

    // 1. Domestic Vietnam
    if (isVietnam(origin) && isVietnam(destination)) {
      return [
        {
          airline: 'VJ',
          airlineName: 'VietJet Air',
          airlineLogo: AIRLINES.VJ.logo,
          flightNumber: 'VJ124',
          departureTime: '06:00',
          arrivalTime: '08:10',
          duration: '2h 10m',
          stops: 0,
          price: 3200 * passengers,
          bookingUrl
        },
        {
          airline: 'VN',
          airlineName: 'Vietnam Airlines',
          airlineLogo: AIRLINES.VN.logo,
          flightNumber: 'VN216',
          departureTime: '12:30',
          arrivalTime: '14:40',
          duration: '2h 10m',
          stops: 0,
          price: 4900 * passengers,
          bookingUrl
        }
      ];
    }

    // 2. Domestic India
    if (isIndia(origin) && isIndia(destination)) {
      return [
        {
          airline: '6E',
          airlineName: 'IndiGo',
          airlineLogo: AIRLINES['6E'].logo,
          flightNumber: '6E2042',
          departureTime: '07:15',
          arrivalTime: '09:30',
          duration: '2h 15m',
          stops: 0,
          price: 5400 * passengers,
          bookingUrl
        },
        {
          airline: 'AI',
          airlineName: 'Air India',
          airlineLogo: AIRLINES.AI.logo,
          flightNumber: 'AI805',
          departureTime: '20:00',
          arrivalTime: '22:15',
          duration: '2h 15m',
          stops: 0,
          price: 6800 * passengers,
          bookingUrl
        }
      ];
    }

    // 3. India to Vietnam (standard route)
    if (isIndia(origin) && isVietnam(destination)) {
      return [
        {
          airline: 'VJ',
          airlineName: 'VietJet Air',
          airlineLogo: AIRLINES.VJ.logo,
          flightNumber: 'VJ896',
          departureTime: '13:50',
          arrivalTime: '19:40',
          duration: '4h 20m',
          stops: 0,
          price: 18500 * passengers,
          bookingUrl
        },
        {
          airline: 'VN',
          airlineName: 'Vietnam Airlines',
          airlineLogo: AIRLINES.VN.logo,
          flightNumber: 'VN502',
          departureTime: '23:35',
          arrivalTime: '06:10',
          duration: '5h 05m',
          stops: 0,
          price: 24500 * passengers,
          bookingUrl
        },
        {
          airline: '6E',
          airlineName: 'IndiGo',
          airlineLogo: AIRLINES['6E'].logo,
          flightNumber: '6E1611',
          departureTime: '08:45',
          arrivalTime: '14:25',
          duration: '4h 10m',
          stops: 0,
          price: 17200 * passengers,
          bookingUrl
        },
        {
          airline: 'SQ',
          airlineName: 'Singapore Airlines',
          airlineLogo: AIRLINES.SQ.logo,
          flightNumber: 'SQ401',
          departureTime: '09:20',
          arrivalTime: '18:15',
          duration: '7h 25m',
          stops: 1,
          price: 31000 * passengers,
          bookingUrl
        }
      ];
    }

    // 4. Fallback international / other routes
    return [
      {
        airline: 'VN',
        airlineName: 'Vietnam Airlines',
        airlineLogo: AIRLINES.VN.logo,
        flightNumber: 'VN821',
        departureTime: '10:15',
        arrivalTime: '18:30',
        duration: '8h 15m',
        stops: 1,
        price: 35000 * passengers,
        bookingUrl
      },
      {
        airline: 'SQ',
        airlineName: 'Singapore Airlines',
        airlineLogo: AIRLINES.SQ.logo,
        flightNumber: 'SQ222',
        departureTime: '14:40',
        arrivalTime: '23:55',
        duration: '9h 15m',
        stops: 1,
        price: 42000 * passengers,
        bookingUrl
      }
    ];
  }

  return [];
}
