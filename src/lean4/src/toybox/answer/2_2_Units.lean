
-- prerequires

theorem zero_le_one : 0 < 1 := Nat.succ_pos 0
theorem zero_le_two : 0 < 2 := Nat.succ_pos 1
theorem one_le_two : 1 < 2 := Nat.succ_lt_succ zero_le_one
theorem zero_le_three : 0 < 3 := Nat.succ_pos 2
theorem one_le_three : 1 < 3 := Nat.succ_lt_succ zero_le_two
theorem two_le_three : 2 < 3 := Nat.succ_lt_succ one_le_two

-- the elements of some finite sets

def zero_in_one   : Fin 1 := {val := 0, isLt := zero_le_one}
def zero_in_two   : Fin 2 := {val := 0, isLt := zero_le_two}
def one_in_two    : Fin 2 := {val := 1, isLt := one_le_two}
def one_in_three  : Fin 3 := {val := 1, isLt := one_le_three}
def two_in_three  : Fin 3 := {val := 2, isLt := two_le_three}

namespace Units_of_Fin

class Units_of_Fin (n : Nat) where
  val : Fin n
  inv : Fin n
  val_inv : val.val * inv.val % n = 1
  inv_val : inv.val * val.val % n = 1

-- Todo
private theorem mul_val_inv {n : Nat} {a : Fin n} {a_inv : Fin n} {b : Fin n} {b_inv : Fin n} :
  (a_val_inv : a.val * a_inv.val % n = 1) → (b_val_inv : b.val * b_inv.val % n = 1)
    → (a * b).val * (b_inv * a_inv).val % n = 1 := sorry
private theorem mul_inv_val {n : Nat} {a : Fin n} {a_inv : Fin n} {b : Fin n} {b_inv : Fin n} :
  (a_inv_val : a_inv.val * a.val % n = 1) → (b_inv_val : b_inv.val * b.val% n = 1)
    → (b_inv * a_inv).val * (a * b).val % n = 1 := sorry

def Units_of_Fin.mul : Units_of_Fin n → Units_of_Fin n → Units_of_Fin n
  | ⟨a, a_inv, a_val_inv, a_inv_val⟩, ⟨b, b_inv, b_val_inv, b_inv_val⟩
      => ⟨a * b, b_inv * a_inv, mul_val_inv a_val_inv b_val_inv, mul_inv_val a_inv_val b_inv_val⟩
instance {n : Nat} : Mul (Units_of_Fin n) where
  mul := Units_of_Fin.mul

notation:1025 "(ℤ/"n"ℤ)ˣ" => Units_of_Fin n

end Units_of_Fin

-- example `(ℤ/ 3 ℤ)ˣ`

open Units_of_Fin

#check (ℤ/ 3 ℤ)ˣ
#check Units_of_Fin 3

def _1_mod_3 : Units_of_Fin 3 := {
  val := one_in_three,
  inv := one_in_three,
  val_inv := rfl,
  inv_val := rfl,
}
def _2_mod_3 : Units_of_Fin 3 := {
  val := two_in_three,
  inv := two_in_three,
  val_inv := rfl,
  inv_val := rfl,
}

instance {n : Nat} : ToString (Units_of_Fin n) where
  toString a := Nat.repr a.val

#check _1_mod_3

#eval _1_mod_3

#eval _1_mod_3 * _1_mod_3
#eval _1_mod_3 * _2_mod_3
#eval _2_mod_3 * _1_mod_3
#eval _2_mod_3 * _2_mod_3

-- example `ℤ/2ℤ ≅ (ℤ/ 3 ℤ)ˣ`

def f : Fin 2 → Units_of_Fin 3
  | 0 => _1_mod_3
  | 1 => _2_mod_3

#eval f 0
#eval f 1

class isHom where
  to_fun : Fin 2 → Units_of_Fin 3
  map_mul : ∀ (x y : Fin 2), to_fun (x * y) = (to_fun x) * (to_fun y)
class isEquiv where
  to_fun : Fin 2 → Units_of_Fin 3
  inv_fun : Units_of_Fin 3 → Fin 2
  map_mul : ∀ (x y : Fin 2), to_fun (x * y) = (to_fun x) * (to_fun y)
  inv_map_mul : ∀ (x y : Units_of_Fin 3), inv_fun (x * y) = (inv_fun x) * (inv_fun y)
  to_inv : ∀ (x : Fin 2), inv_fun (to_fun x) = x
  inv_to : ∀ (y : Units_of_Fin 3), to_fun (inv_fun y) = y

theorem Fin_2_is_equiv_to_Units_of_Fin_3 : 
  ∃(f : Fin 2 → Units_of_Fin 3), ∃ h:isEquiv, h.to_fun = f := sorry


-- `-------------------------------------------------------------`

-- compairing as magma (or monoid) (*Todo)

-- namespace Monoid
-- class HMul (α : Type u) (β : Type v) (γ : outParam (Type w)) where
--   hMul : α → β → γ
-- notation:60 a "＊" b => HMul.hMul a b
-- export HMul (hMul)

-- instance {n : Nat} : HMul (Fin n) (Fin n) (Fin n) where
--   hMul := Fin.add
-- instance {n : Nat} : HMul (Units_of_Fin n) (Units_of_Fin n) (Units_of_Fin n) where
--   hMul := Units_of_Fin.mul



-- class Magma where
--   α   : Type u
--   mul : α → α → α

-- -- abbrev mul {M : Magma} (a b : M.α) : M.α :=
-- --   M.mul a b

-- -- set_option pp.all true
-- -- notation:70 a "＊" b => Magma.mul a b
-- -- infixl:70 (priority := high) "＊" => mul

-- -- def units_as_magma {n : Nat} : Magma := { α := Units_of_Fin n, mul := Units_of_Fin.mul }
-- def Fin_2_as_Magma {n : Nat} : Magma := {α := Fin 2, mul := Fin.mul}

-- #eval (0 : Fin_2_as_Magma.α) ＊ (0 : Fin_2_as_Magma.α)  -- 0
-- -- #eval (0 : Fin 2) ＊ (1 : Fin 2)  -- 1
-- -- #eval (1 : Fin 2) ＊ (0 : Fin 2)  -- 1
-- -- #eval (1 : Fin 2) ＊ (1 : Fin 2)  -- 0

-- -- #eval _1_mod_3 ＊ _1_mod_3        -- 1
-- -- #eval _1_mod_3 ＊ _2_mod_3        -- 2
-- -- #eval _2_mod_3 ＊ _1_mod_3        -- 2
-- -- #eval _2_mod_3 ＊ _2_mod_3        -- 1

-- -- #check 

-- class Hom (M N : Magma) where
--   to_fun : M.α → N.α
--   map_mul : ∀ (x y : M.α), to_fun (M.mul x y) = N.mul (to_fun x) (to_fun y)



-- end Monoid
