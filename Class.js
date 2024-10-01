// class provides a more structured and cleaner way to work with objects
// It's a prototype

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  displayProduct() {
    console.log(this.name, this.price);
  }

  calcTax(percent) {
    console.log(`Taxed pricess : ${this.price + this.price * percent}`);
  }
}

const pr1 = new Product("Bags", 100);
pr1.displayProduct();
const total = pr1.calcTax(0.5);
