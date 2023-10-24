import capitalizeString from "./capitalizeString";

// DEPRECATED
// export default function handleEvolutions(chain_json) {
//   evos = [];
//   if (chain_json.chain.evolves_to.length > 1) {
//     console.log(chain_json.chain.species.url);
//     evos.push({
//       evol: chain_json.chain.species?.name,
//       id: chain_json.chain.species?.url.split("/")[6],
//       method: null,
//       level: null,
//       time: "",
//     });
//     chain_json.chain.evolves_to.forEach((e) => {
//       console.log(e.evolution_details[0].trigger.name);
//       evos.push({
//         evol: e.species.name,
//         id: e.species?.url.split("/")[6],
//         method: e.evolution_details[0].trigger.name,
//         level: e.evolution_details[0].min_level,
//         time: "",
//       });
//     });
//     // console.log("evol2", chain_json.chain.evolves_to[1].species.name);
//   } else if (chain_json.chain.evolves_to.length == 1) {
//     // console.log("length 1");
//     console.log(chain_json.chain.species.url);

//     let evol_names = [
//       chain_json.chain.species?.name,
//       chain_json.chain.evolves_to[0]?.species.name,
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.species.name,
//     ];

//     let ids = [
//       chain_json.chain.species?.url.split("/")[6],
//       chain_json.chain.evolves_to[0].species.url.split("/")[6],
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.species.url.split("/")[6],
//     ];

//     let levels = [
//       null,
//       chain_json.chain.evolves_to[0]?.evolution_details[0].min_level,
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
//         .min_level,
//     ];
//     let methods = [
//       null,
//       chain_json.chain.evolves_to[0]?.evolution_details[0].trigger.name,
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
//         .trigger.name,
//     ];
//     // console.log(methods);

//     let items = [
//       null,
//       capitalizeString(
//         chain_json.chain.evolves_to[0]?.evolution_details[0].item?.name
//       ),
//       capitalizeString(
//         chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0].item
//           ?.name
//       ),
//     ];
//     // console.log(items);

//     let happys = [
//       null,
//       chain_json.chain.evolves_to[0]?.evolution_details[0].min_happiness,
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
//         .min_happiness,
//     ];

//     let moves = [
//       null,
//       capitalizeString(
//         chain_json.chain.evolves_to[0]?.evolution_details[0].known_move?.name
//       ),
//       capitalizeString(
//         chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
//           .known_move?.name
//       ),
//     ];

//     let times = [
//       null,
//       chain_json.chain.evolves_to[0]?.evolution_details[0].time_of_day,
//       chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
//         .time_of_day,
//     ];

//     evos = [
//       {
//         evol: evol_names[0],
//         level: levels[0],
//         id: ids[0],
//         method: methods[0],
//         item: items[0],
//         happy: happys[0],
//         move: moves[0],
//         time: times[0],
//       },
//       {
//         evol: evol_names[1],
//         level: levels[1],
//         id: ids[1],
//         method: methods[1],
//         item: items[1],
//         happy: happys[1],
//         move: moves[1],
//         time: times[1],
//       },
//       {
//         evol: evol_names[2],
//         level: levels[2],
//         id: ids[2],
//         method: methods[2],
//         item: items[2],
//         happy: happys[2],
//         move: moves[2],
//         time: times[2],
//       },
//     ];
//     // console.log("in if evos", evos[1]);
//   }
//   // console.log("in func evos", evos);
//   return evos;
// }

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
      };
      temp_list.push(temp_obj);
    });
    temp_list.push(...handleEvolutions(evo));
  });
  // console.log(temp_list);
  return temp_list;
}
