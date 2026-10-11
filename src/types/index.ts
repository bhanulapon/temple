export type Language = 'en' | 'or' | 'hi';

export interface AartiTiming {
  id: string;
  name: string;
  odiaName: string;
  time: string;
  session: 'morning' | 'evening';
  description: string;
  importance: string;
  isSpecial?: boolean;
}

export interface SevaItem {
  id: string;
  name: string;
  odiaName: string;
  category: 'archana' | 'abhisheka' | 'bhoga' | 'special';
  duration: string;
  contribution: number;
  description: string;
  benefits: string;
  offeringsIncluded: string[];
  timingSlot: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  odiaName: string;
  date: string;
  tithi: string;
  monthString: string;
  description: string;
  keyRituals: string[];
  daysRemaining: number;
  bannerTag: string;
}

export interface DonationFund {
  id: string;
  name: string;
  odiaName: string;
  description: string;
  iconName: string;
  suggestedAmounts: number[];
  taxExempt: boolean;
}

export interface SevaBookingForm {
  sevaId: string;
  devoteeName: string;
  gotra: string;
  nakshatra: string;
  rashi: string;
  familyMembers: string;
  bookingDate: string;
  preferredSlot: string;
  sankalpaWish: string;
  phoneNumber: string;
  email: string;
  address: string;
}

export interface SevaBookingReceipt {
  bookingId: string;
  sevaName: string;
  devoteeName: string;
  gotra: string;
  nakshatra: string;
  date: string;
  slot: string;
  amount: number;
  priestAssigned: string;
  reportingGate: string;
  reportingTime: string;
  paymentMode: string;
  status: 'CONFIRMED';
  createdAt: string;
}

export interface DonationReceipt {
  receiptNo: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber: string;
  address: string;
  fundName: string;
  amount: number;
  paymentMethod: string;
  date: string;
  transactionRef: string;
  trustRegistrationNo: string;
  section80GApproval: string;
}
