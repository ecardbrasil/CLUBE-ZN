
export interface Partner {
  id: number;
  name: string;
  category: string;
  benefit: string;
  imageUrl: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'custom';
  discountValue: number | null;
  customDiscountText: string;
}

export interface PartnerProfile {
    logoUrl: string;
    companyName: string;
    description: string;
}
