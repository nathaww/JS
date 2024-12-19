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
    console.log(`Taxed price(s) : ${this.price + this.price * percent}`);
  }
}

const pr1 = new Product("Bags", 100);
pr1.displayProduct();
const total = pr1.calcTax(0.5);


const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());

function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
getPersonInfo("Lydia is 21 years old");