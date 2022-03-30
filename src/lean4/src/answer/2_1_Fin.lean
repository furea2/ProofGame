namespace hidden

structure Fin (n : Nat) where
  val  : Nat
  isLt : LT.lt val n

