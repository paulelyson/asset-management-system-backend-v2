import {
  BorrowedEquipmentStatus,
  STATUS_FLOW,
} from 'src/borrowed-equipment/enums/borrowed-equipment.enum';
import { Transaction } from 'src/borrowed-equipment/schemas/transaction.schema';

export function getAccumulatedStatus(transactions: Transaction[]) {
  const accumulated: Pick<Transaction, 'status' | 'quantity'>[] = [];
  const reached = new Map<BorrowedEquipmentStatus, number>();

  for (const tx of transactions) {
    // Sum quantities per status instead of taking max
    reached.set(tx.status, (reached.get(tx.status) ?? 0) + tx.quantity);
  }

  for (let i = 0; i < STATUS_FLOW.length; i++) {
    const status = STATUS_FLOW[i];
    const currentReached = reached.get(status);
    if (!currentReached) continue;

    let nextReached = 0;
    for (let j = i + 1; j < STATUS_FLOW.length; j++) {
      const candidate = reached.get(STATUS_FLOW[j]);
      if (candidate !== undefined) {
        nextReached = candidate;
        break;
      }
    }

    const quantity = currentReached - nextReached;
    if (quantity > 0) {
      accumulated.push({ status, quantity });
    }
  }

  return accumulated;
}
