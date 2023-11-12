import { gen_list } from "../../assets/game_img_urls";

export const handleGenImageSelect = ({ gen, id }) => {
  let base_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-`;
  let genSelected = gen_list.filter((e) => e.gen_id == gen);
  let final_url;
  if (gen < 3) {
    final_url = `${base_url}${genSelected[0].gen}/${genSelected[0].game}/transparent/${id}.png`;
  } else if (gen > 8) {
    final_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  } else {
    final_url = `${base_url}${genSelected[0].gen}/${genSelected[0].game}/${id}.png`;
  }
  return final_url;
};
