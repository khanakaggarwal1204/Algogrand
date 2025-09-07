import { Contract, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'

export class MemoryGame extends Contract {
  hidden = GlobalState<uint64>({ key: "hidden", initialValue: 3 })

  guess(num: uint64): string {
    return num === this.hidden.value ? "match" : "wrong"
  }
}
