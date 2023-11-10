import gen_list from "../../assets/game_img_urls";

export const handleGenImageSelect = ({ gen, id }) => {
  let base_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-`;
  let genSelected = gen_list.filter((e) => e.gen_id == gen);
  console.log(genSelected);
};
