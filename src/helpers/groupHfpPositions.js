import groupBy from "lodash/groupBy";
import map from "lodash/map";

export function groupHfpPositions(hfpData, groupKey, groupNameKey) {
  if (!hfpData || hfpData.length === 0) {
    return [];
  }

  const groupedData = groupBy(hfpData, groupKey);
  const vehicleGroups = map(groupedData, (positions, groupName) => ({
    [groupNameKey]: groupName,
    positions,
  }));

  return vehicleGroups;
}