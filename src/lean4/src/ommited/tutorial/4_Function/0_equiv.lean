
universe u v
variable {α : Sort u} {β : α → Sort v}

namespace function

/-- The relation stating that two functions are pointwise equal. -/
protected def equiv (f₁ f₂ : Π x : α, β x) : Prop := ∀ x, f₁ x = f₂ x

local infix:50 " ~ " => function.equiv

protected theorem equiv.refl (f : Π x : α, β x) : f ~ f := assume x, rfl

protected theorem equiv.symm {f₁ f₂ : Π x: α, β x} : f₁ ~ f₂ → f₂ ~ f₁ :=
λ h x, eq.symm (h x)

protected theorem equiv.trans {f₁ f₂ f₃ : Π x: α, β x} : f₁ ~ f₂ → f₂ ~ f₃ → f₁ ~ f₃ :=
λ h₁ h₂ x, eq.trans (h₁ x) (h₂ x)

protected theorem equiv.is_equivalence (α : Sort u) (β : α → Sort v) : equivalence (@function.equiv α β) :=
mk_equivalence (@function.equiv α β) (@equiv.refl α β) (@equiv.symm α β) (@equiv.trans α β)