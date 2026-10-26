export interface IPlanDay {
  id: string;
  title: string;
  position: number;
  // YYYY-MM-DD, no fuso do plano.
  unlock_date: string;
  url: string;
}

export interface IPlanItem {
  id: string;
  type: string;
  title: string;
  required: boolean;
  reference: string | null;
}

export interface IPlanLatestDay {
  plan: {
    slug: string;
    title: string;
    timezone: string;
    url: string;
  };
  day: IPlanDay;
  items: IPlanItem[];
}
