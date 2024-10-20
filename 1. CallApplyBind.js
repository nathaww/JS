const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
};

function cab(year) {
  console.log(
    `${this.title} was written by ${this.author} and was released in year ${year}`
  );
}

const newCab = cab.bind(book, 2012)
newCab();