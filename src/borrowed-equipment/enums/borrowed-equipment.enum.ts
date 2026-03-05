export enum BorrowPurpose {
  CLASS_USE = 'class_use',
  RESEARCH = 'research',
  OTHERS = 'others',
}

export enum BorrowedEquipmentStatus {
  REQUESTED = 'requested',
  FACULTY_APPROVED = 'faculty_approved',
  FACULTY_REJECTED = 'faculty_rejected',
  OIC_APPROVED = 'oic_approved',
  OIC_REJECTED = 'oic_rejected',
  RELEASED = 'released',
  MARK_RETURNED = 'mark_returned',
  RETURNED = 'returned',
  UNRETURNED = 'unreturned',
  CANCELLED = 'cancelled',
  SYSTEM_RESET = 'system_reset',
}