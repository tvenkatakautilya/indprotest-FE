export class Product {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
[x: string]: any;
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: string,
        public stock: number,
        public created_at: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.created_at = created_at;
    }
  }
  