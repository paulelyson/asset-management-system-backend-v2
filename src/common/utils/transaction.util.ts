import { BorrowedEquipmentStatus, STATUS_FLOW } from "src/borrowed-equipment/enums/borrowed-equipment.enum";
import { Transaction } from "src/borrowed-equipment/schemas/transaction.schema";

export function getAccumulatedStatus(transactions: Transaction[]){
    let accumulated: Pick<Transaction, "status" | "quantity">[]= [];
    const reached = new Map<BorrowedEquipmentStatus, number>();
    for (const tx of transactions) {
      reached.set(tx.status, Math.max(reached.get(tx.status) ?? 0, tx.quantity));
    }
    // 2️⃣ subtract the NEXT EXISTING downstream status
    for (let i = 0; i < STATUS_FLOW.length; i++) {
      const status = STATUS_FLOW[i];
      const currentReached = reached.get(status);
      if (!currentReached) continue;

      let nextReached = 0;

      // 🔑 find the nearest downstream status that exists
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
    return accumulated.filter((x) => x.quantity > 0);
  }