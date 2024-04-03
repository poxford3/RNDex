import capitalizeString from "./capitalizeString";

export default function handleEvolutions(item) {
  let genderMap = {
    1: "female",
    2: "male",
  };
  let temp_list = [];
  item.evolves_to.forEach((evo) => {
    evo.evolution_details.forEach((detail) => {
      let temp_obj = {
        base: item.species.name,
        base_id: item.species.url.split("/")[6],
        evolves_to: evo.species.name,
        evo_id: evo.species.url.split("/")[6],
        method: detail.trigger.name,
        level: detail.min_level,
        gender: genderMap[detail.gender],
        time: detail.time_of_day,
        location: capitalizeString(detail.location?.name),
        happy: detail.min_happiness,
        item: capitalizeString(detail.item?.name),
        move: capitalizeString(detail.known_move?.name),
        move_type: capitalizeString(detail.known_move_type?.name),
        held_item: capitalizeString(detail.held_item?.name),
        relative_physical_stats: detail.relative_physical_stats,
      };
      temp_list.push(temp_obj);
    });
    temp_list.push(...handleEvolutions(evo));
  });
  return temp_list;
}
