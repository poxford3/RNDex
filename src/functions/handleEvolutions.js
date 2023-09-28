import capitalizeString from "./capitalizeString";

let evos = [];
export default function handleEvolutions(chain_json) {
  evos = [];
  if (chain_json.chain.evolves_to.length > 1) {
    evos.push({
      evol: chain_json.chain.species?.name,
      id: chain_json.chain.species?.url.split("/")[6],
      method: null,
      level: null,
    });
    chain_json.chain.evolves_to.forEach((e) => {
      // console.log(e.species.name);
      evos.push({
        evol: e.species.name,
        id: e.species?.url.split("/")[6],
        method: e.evolution_details[0].trigger.name,
        level: e.evolution_details[0].min_level,
      });
    });
    // console.log("evol2", chain_json.chain.evolves_to[1].species.name);
  } else if (chain_json.chain.evolves_to.length == 1) {
    evos = [
      {
        evol: null,
        level: null,
        id: null,
        method: null,
      },
      {
        evol: null,
        level: null,
        id: null,
        method: null,
      },
      {
        evol: null,
        level: null,
        id: null,
        method: null,
      },
    ];

    console.log("length 1");
    let evol_names = [
      chain_json.chain.species?.name,
      chain_json.chain.evolves_to[0]?.species.name,
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.species.name,
    ];

    let ids = [
      chain_json.chain.species?.url.split("/")[6],
      chain_json.chain.evolves_to[0].species.url.split("/")[6],
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.species.url.split("/")[6],
    ];

    let levels = [
      null,
      chain_json.chain.evolves_to[0]?.evolution_details[0].min_level,
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
        .min_level,
    ];
    let methods = [
      null,
      chain_json.chain.evolves_to[0]?.evolution_details[0].trigger.name,
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
        .trigger.name,
    ];

    evos = [
      {
        evol: evol_names[0],
        level: levels[0],
        id: ids[0],
        method: methods[0],
      },
      {
        evol: evol_names[1],
        level: levels[1],
        id: ids[1],
        method: methods[1],
      },
      {
        evol: evol_names[2],
        level: levels[2],
        id: ids[2],
        method: methods[2],
      },
    ];
    // console.log("in if evos", evos);
  }
  // console.log("in func evos", evos);
  return evos;
}
