namespace hidden

def empty : Fin 0 → Nat := (nomatch ·)

structure Fin (n : Nat) where
  val  : Nat
  isLt : LT.lt val n
structure Mul_Group_of_Fin (n : Nat) where
  val  : Nat
  isLt : val ≠ 0 ∧ LT.lt val n

end hidden

#check Fin 3
#print Fin.mk


-- theorem Nat.le_of_succ_le_succ {n m : Nat} : LE.le (succ n) (succ m) → LE.le n m :=
--   pred_le_pred

-- open Nat

#print Nat.le_of_succ_le_succ

theorem zero_le_one : 0 < 1 := Nat.succ_pos 0

theorem zero_le_two : 0 < 2 := Nat.succ_pos 1
theorem one_le_two : 1 < 2 := Nat.succ_lt_succ zero_le_one

theorem zero_le_three : 0 < 3 := Nat.succ_pos 2
theorem one_le_three : 1 < 3 := Nat.succ_lt_succ zero_le_two
theorem two_le_three : 2 < 3 := Nat.succ_lt_succ one_le_two

def zero_in_one := Fin.mk 0 zero_le_one

#print zero_in_one

def zero_in_two := Fin.mk 0 zero_le_two
def one_in_two := Fin.mk 1 one_le_two

#print zero_in_two
#print one_in_two

#eval zero_in_two + zero_in_two
#eval one_in_two + zero_in_two
#eval zero_in_two + one_in_two
#eval one_in_two + one_in_two



/- multiplicative group of Fin set -/

namespace Units_of_Fin

class Units_of_Fin {h : 1 < n} (n : Nat) where
  val  : Fin n
  inv  : Fin n
  val_neg : val * inv  = ⟨1,h⟩
  neg_val : neg * val = ⟨1,h⟩

def one_in_three := Units_of_Fin.mk 1 (And.intro zero_le_one one_le_three)
def two_in_three := Units_of_Fin.mk 2 (And.intro zero_le_two two_le_three)

-- #check Nat.mod_lt
-- theorem mlt {b : Nat} : {a : Nat} → (0 < a ∧ a < n)  → (0 < b ∧ b < n) → (0 < a * b % n ∧ a * b % n < n) :=
-- by {
--   intro a ⟨ha1,ha2⟩ ⟨hb1,hb2⟩;
--   have hn : 0 < n := Nat.zero_lt_of_lt ha2;
--   have : a * b % n < n := Nat.mod_lt _ hn;
--   apply And.intro;
--   case right => {exact this};
--   case left => {
--     have hab : 0 < a * b := by {
--       sorry
--     }

--     --  apply Nat.mod_lt _ hn;
--     -- exact hb1;
--   };
-- }

-- -- variable {b : Nat} {a : Nat} {n : Nat}
-- -- theorem ha : 0 < a ∧ a < n := sorry
-- -- theorem hb : 0 < b ∧ b < n := sorry
-- -- #check @Mul_Group_of_Fin.mlt

-- def Mul_Group_of_Fin.mul : Mul_Group_of_Fin n → Mul_Group_of_Fin n → Mul_Group_of_Fin n
--   | ⟨a, ha⟩, ⟨b, hb⟩ => ⟨(a * b) % n, @Mul_Group_of_Fin.mlt n b a ha hb⟩
-- instance : Mul (Mul_Group_of_Fin n) where
--   mul := Mul_Group_of_Fin.mul

-- #eval one_in_three * one_in_three
-- #eval two_in_three * one_in_three
-- #eval one_in_three * two_in_three
-- #eval two_in_three * two_in_three


-- def F (x : Fin 2) : Fin 3 :=
--   match x with
--   | ⟨0, h⟩ => ⟨1, Nat.succ_lt_succ h⟩
--   | ⟨1, h⟩ => ⟨2, Nat.succ_lt_succ h⟩

-- def G (x : Fin 2) : Fin 3 :=
--   match x with
--   | ⟨0, h⟩ => ⟨1, Nat.succ_lt_succ h⟩
--   | ⟨1, h⟩ => ⟨2, Nat.succ_lt_succ h⟩

