// may be good to refactor all functions to this page

export const getPokeList = async ({ url }) => {
  let tempList = [];
  const response = await fetch(url);
  const json = await response.json();

  json.results.forEach((e) => {
    // console.log(e.name);
    tempList.push(e);
  });

  setPokeList(tempList);
  setLoaded(true);

  // getPokeInfo(pokeList);

  // -- attempt 2 below

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((pokeData) => {
  //     pokeData.results.forEach((pokemon) => {
  //       getPokeInfo(pokeData);
  //     });
  //   });

  // console.log(json);
};
