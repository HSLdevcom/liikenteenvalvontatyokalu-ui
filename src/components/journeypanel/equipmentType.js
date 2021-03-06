import get from "lodash/get";
import map from "lodash/map";

const equipment = {
  "0": "C",
  "1": "B",
  "3": "A1",
  "7": "A1",
  "8": "D",
  "10": "C",
  "12": "MiniA",
  "13": "MiniB",
  "15": "A1",
  "16": "C",
  "17": "A2",
  "18": "B",
  "20": "A1",
  "21": "A1",
  "22": "A2",
  R2: "R2",
  R3: "R3",
  R4: "R4",
};

export function getEquipmentType(code) {
  return get(equipment, code + "", false);
}

export function validateEquipment(departure, equipment) {
  const {equipmentColor, equipmentIsRequired, equipmentType} = departure;
  const {type, exteriorColor, emissionDesc, emissionClass} = equipment;

  const plannedEquipmentType = getEquipmentType(equipmentType);

  // Map observed equipment features to planned ones. For each category, the observed
  // value goes in the "observed" prop and the "required" prop has the planned
  // value IF it was a requirement for the departure, otherwise it is false.
  // If "required" is not false, the "observed" and "required" props
  // should match for the requirement to be considered fulfilled.

  const observedEquipment = {
    type: {
      observed: type,
      required: equipmentIsRequired !== 0 ? plannedEquipmentType : false,
    },
    exteriorColor: {
      observed: exteriorColor,
      required: equipmentColor || false,
    },
    emissionClass: {
      observed: emissionDesc || emissionClass ? `${emissionClass}, ${emissionDesc}` : "",
      required: false,
    },
  };

  return map(observedEquipment, ({observed, required}, prop) => {
    const isRequired = required !== false;

    const color = isRequired
      ? observed === required
        ? "var(--light-green)"
        : "var(--red)"
      : "var(--lighter-grey)";

    return {
      name: prop,
      observed,
      required,
      color,
    };
  });
}
