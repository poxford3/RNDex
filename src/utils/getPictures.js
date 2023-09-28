const spriteFunction = async (pokemon) => {
  const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const json3 = await response3.json();
  const pic = json3.sprites.front_default;

  return pic;
};

const getPictures = async (evolutions) => {
  let pic_list = [];
  const tasks = [];
  // setImgURLs([]);

  if (evolutions[0] == null || evolutions[1] == null) {
    return;
  }

  // console.log("continuing", evolutions[0]);
  for (const pokemon in evolutions) {
    const task = spriteFunction(evolutions[pokemon])
      .then((detail) => {
        pic_list.push(detail);
      })
      .catch((error) => {
        console.log("error in api");
        console.log(error.message);
      });
    tasks.push(task);
  }

  await Promise.all(tasks);
  return pic_list.sort();
};
