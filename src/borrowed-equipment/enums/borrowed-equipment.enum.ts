export enum BorrowPurpose {
  CLASS_USE = 'class_use',
  RESEARCH = 'research',
  OTHERS = 'others',
}

export enum BorrowedEquipmentStatus {
  REQUESTED = 'requested',
  FACULTY_APPROVED = 'instructor_approved',
  FACULTY_REJECTED = 'instructor_rejected',
  OIC_APPROVED = 'oic_approved',
  OIC_REJECTED = 'oic_rejected',
  RELEASED = 'released',
  MARK_RETURNED = 'mark_returned',
  RETURNED = 'returned',
  UNRETURNED = 'unreturned',
  CANCELLED = 'cancelled',
  SYSTEM_RESET = 'system_reset',
}

export const STATUS_FLOW: BorrowedEquipmentStatus[] = [
  BorrowedEquipmentStatus.REQUESTED,
  BorrowedEquipmentStatus.FACULTY_APPROVED,
  BorrowedEquipmentStatus.OIC_APPROVED,
  BorrowedEquipmentStatus.RELEASED,
  BorrowedEquipmentStatus.MARK_RETURNED,
  BorrowedEquipmentStatus.RETURNED,
];
