
/-! ### Languages and Structures -/

/-- A first-order language consists of a type of functions of every natural-number arity and a
  type of relations of every natural-number arity. -/
class Language where
  functions : ℕ → Type u
  relations : ℕ → Type v

/-- The empty language has no symbols. -/
def Language.empty : Language := {
  functions := fun _  => PEmpty
  relations := fun _  => PEmpty
}

instance : Inhabited Language := ⟨Language.empty⟩

variable (L : Language.{u, v})
