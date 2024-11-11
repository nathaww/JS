// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
// .then(res => res.json())
// .then(data => console.log(data.name))
// .catch(err => console.log(err))

getData = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/typhlosion");
    if (!res.ok) {
      throw new Error("Couldn't fetch");
    }
    const data = await res.json();
    console.log(data.name);
  } catch (error) {
    console.log(error);
  }
};
getData();
