export class Product{
    productId: string;
    title: string;
    description: string;
    url: string;
    quantity: number;
    manufacturer: Manufacturer;
    shippingDetails: ShippingDetails;
    category: Category;
    pricing: Pricing;
}

export class Manufacturer{
    ModelNumber: string;
    date: Date;
}

export class ShippingDetails{
    weight: number;
    width: number;
    height: number;
    depth: number;
}

export class Category{
    categoryName: string;
    color: string;
}

export class Pricing{
    price: number;
}

export class Elasticsearch{
    hits: hits[];
}

export class hits{
    _source : Product
}