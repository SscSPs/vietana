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
  // Flight Cost
  const flightPerPerson = TRIP_BUILDER_CONSTANTS.flights[flightType][style];
  const flightTot = flightPerPerson * pax;

  // Visa Cost
  const visaPerPerson = TRIP_BUILDER_CONSTANTS.visa[visaType];
  const visaTot = visaPerPerson * pax;

  // Transfer Cost
  const transferPerPerson = TRIP_BUILDER_CONSTANTS.transfers[style];
  const transferTot = transferPerPerson * pax;

  // Daily Costs
  const dailyConfig = TRIP_BUILDER_CONSTANTS.daily[style];
  
  const hotelsTot = dailyConfig.hotels * days * pax;
  const foodTot = dailyConfig.food * days * pax;
  const transportTot = dailyConfig.transport * days * pax;
  const experiencesTot = dailyConfig.experiences * days * pax;
  
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
