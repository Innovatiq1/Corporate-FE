export interface ReviewListing {
    data: Review[];
  }
  export interface Review {
    reviewType: string;
    name: string;
    qualification: string;
    country: string;
    type: string;
    url: string;
    text: string;
    position: string;
    active: boolean;
    data: Review[];
    results: number;
    _id: string;
  };