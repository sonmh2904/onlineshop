declare type ProductInfo = {
	id: number;
	name: string;
	description: string;
	price: number;
	currentPrice: number;
	image: string;
  };
  
  declare type Account = {
	id?: number; // Make id optional
	name: string;
	username: string;
	password: string;
	role: string; // Add role property here
  };
  