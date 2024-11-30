// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
// .then(res => res.json())
// .then(data => data.json())
// .catch(err => console.log(err))

getData = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error("Couldn't fetch");
    }
    const data = await res.json();
    console.log(data.length);
  } catch (error) {
    console.log(error);
  }
};
getData();

const todo = {
  userId: 10,
  id: 100,
  title: "at nam consequatur ea labore ea harum",
  body:
    "cupiditate quo est a modi nesciunt soluta\n" +
    "ipsa voluptas error itaque dicta in\n" +
    "autem qui minus magnam et distinctio eum\n" +
    "accusamus ratione error aut",
};

fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(todo),
}).then((res) => console.log(res));
