export enum EquipmentCondition {
  FUNCTIONAL = 'functional',
  DEFECTIVE = 'defective',
  OBSOLETE = 'obsolete',
  LOST = 'lost',
  FOR_CHECKUP = 'for_checkup',
  TURNED_OVER = 'turned_over',
}

export enum EquipmentStatus {
  ACQUIRED = 'acquired',
  RETURNED = 'returned',
}

export enum EquipmentAvailability {
  AVAILABLE = 'available',
  BORROWED = 'borrowed',
  UNRETURNED = 'unreturned',
}

export enum EquipmentInventoryType {
  INVENTORY = 'inventory',
  NON_INVENTORY = 'non_inventory',
}

export enum Matter {
  SOLID = 'solid',
  LIQUID = 'liquid',
  GAS = 'gas',
}
