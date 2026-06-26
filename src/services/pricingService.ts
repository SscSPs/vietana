import { TRIP_BUILDER_CONSTANTS } from '../data/tripBuilder';
import { TripEstimate } from '../types';

export type TravelStyle = 'budget' | 'comfort' | 'premium' | 'luxury';
export type FlightType = 'round' | 'oneway';
export type VisaType = 'single' | 'multiple';

export const calculateTripEstimate = (
  selectedCities: string[],
  style: TravelStyle,
  days: number,
  pax: number,
  flightType: FlightType = 'round',
  visaType: VisaType = 'single'
): TripEstimate => {
  // Dynamic hourly fluctuation factor: fluctuates +/- 6% based on current hour
  const currentHour = new Date().getHours();
  const priceFluctuation = 1 + (Math.sin(currentHour) * 0.06);

  // Visa Cost (Government fees are fixed, but let's simulate live INR-USD exchange rate offset of +/- 1.5% hourly)
  const exchangeFluctuation = 1 + (Math.cos(currentHour) * 0.015);

  // Flight Cost
  const flightPerPerson = Math.round(TRIP_BUILDER_CONSTANTS.flights[flightType][style] * priceFluctuation);
  const flightTot = flightPerPerson * pax;

  // Visa Cost
  const visaPerPerson = Math.round(TRIP_BUILDER_CONSTANTS.visa[visaType] * exchangeFluctuation);
  const visaTot = visaPerPerson * pax;

  // Transfer Cost
  const transferPerPerson = Math.round(TRIP_BUILDER_CONSTANTS.transfers[style] * priceFluctuation);
  const transferTot = transferPerPerson * pax;

  // Daily Costs
  const dailyConfig = TRIP_BUILDER_CONSTANTS.daily[style];
  
  const hotelsTot = Math.round(dailyConfig.hotels * priceFluctuation) * days * pax;
  const foodTot = Math.round(dailyConfig.food * priceFluctuation) * days * pax;
  const transportTot = Math.round(dailyConfig.transport * priceFluctuation) * days * pax;
  const experiencesTot = Math.round(dailyConfig.experiences * priceFluctuation) * days * pax;
  
  const dailyTotal = hotelsTot + foodTot + transportTot + experiencesTot;

  const total = flightTot + visaTot + transferTot + dailyTotal;

  return {
    flight: flightTot,
    visa: visaTot,
    transfers: transferTot,
    hotels: hotelsTot,
    food: foodTot,
    transport: transportTot,
    experiences: experiencesTot,
    dailyTotal,
    total
  };
};
