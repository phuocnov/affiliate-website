export interface ICategory {
  code: string;
  desc: string;
}

export interface IBrand {
  code: string;
  desc: string;
}

export interface IPermission {
  code: string;
  desc: string;
}

export interface IRole {
  code: string;
  desc: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface IRolePermission {
  role_id: string;
  permission_id: string;
}

export interface IUserRole {
  user_id: string;
  role_id: string;
}

export interface IShop {
  shop_id?: string;
  name: string;
  short_description: string;
  long_description: string;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}

export interface IProduct {
  product_id?: string;
  shop_id?: string;
  short_url?: string;
  price?: number;
  original_price?: number;
  rating_average?: number;
  review_count?: number;
  all_time_quantity_sold?: number;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}

export interface ICreateProduct {
  product_id?: string;
  shop_id?: string;
  short_url?: string;
  price?: number;
  original_price?: number;
  rating_average?: number;
  review_count?: number;
  all_time_quantity_sold?: number;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}

export interface ICreateShop {
  shop_id?: string;
  name: string;
  short_description: string;
  long_description: string;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}
