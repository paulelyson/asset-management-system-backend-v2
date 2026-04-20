// utils/diff-equipment.util.ts

const TRACKED_FIELDS = [
  'serialNo', 'type', 'categories', 'name', 'brand',
  'color', 'modelNo', 'totalQuantity', 'conditionAndQuantity',
  'unit', 'matter', 'description', 'dateAcquired',
  'remarks', 'hasTag', 'department', 'tag', 'location',
  'warrantyPeriod',
];

export function diffEquipment(
  previous: Record<string, any>,
  updated: Record<string, any>,
): { field: string; previousValue: any; newValue: any }[] {
  const changes: any[] = [];

  for (const field of TRACKED_FIELDS) {
    const prev = JSON.stringify(previous[field] ?? null);
    const next = JSON.stringify(updated[field] ?? null);

    if (prev !== next) {
      changes.push({
        field,
        previousValue: previous[field] ?? null,
        newValue:      updated[field]   ?? null,
      });
    }
  }

  return changes;
}