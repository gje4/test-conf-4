export type BrandInfo = {
  id?: string;
  name: string;
  slug: string;
  path?: string;
};

export type CategoryInfo = {
  id: string;
  name: string;
  slug: string;
  path: string;
};

export type ProductImage = {
  url: string;
  urlOriginal?: string;
  url_thumbnail?: string;
  alt?: string;
  url_so?: string;
  isDefault?: boolean;
};

export type ProductPrice = {
  value: number;
  currencyCode?: "USD" | "CAD" | "EUR" | "ARS" | string;
  retailPrice?: number;
  salePrice?: number;
  listPrice?: number;
  extendedSalePrice?: number;
  extendedListPrice?: number;
};

export type ProductOption = {
  __typename?: "MultipleChoiceOption";
  id: string;
  displayName: string;
  values: ProductOptionValues[];
};

export type ProductOptionValues = {
  label: string;
  hexColors?: string[];
  isDefault?: boolean;
};

export type SKU = string;

export type ProductVariant = {
  id: string | number;
  sku: SKU;
  options: ProductOption[];
  availableForSale?: boolean;
  price?: ProductPrice;
  defaultImage?: ProductImage;
};

export type BulletPoints = Array<string>;

export type Product = {
  id: string;
  objectID: string;
  name: string;
  description: string;
  descriptionHtml?: string;
  warranty?: string; // STOREFRONT_AVAILABILITY_TEXT
  shipping?: string; // STOREFRONT_WARRANTY_INFO
  sku?: SKU;
  slug?: string;
  path?: string;
  brand?: BrandInfo;
  defaultImage?: { url640wide: string };
  categories?: CategoryInfo[];
  images: ProductImage[];
  variants: ProductVariant[];
  price: ProductPrice;
  options: ProductOption[];
  custom_url?: { url: string; is_customized: boolean };
};

// This type is the minimal information needed to render a ProductCard,
// and allows for smaller queries, or sending less data to the FE
export const ProductForCardFields = [
  "id",
  "price",
  "path",
  "slug",
  "images",
  "name",
  "brand",
  "defaultImage",
] as const;
export type ProductForCard = Pick<Product, typeof ProductForCardFields[number]>;
