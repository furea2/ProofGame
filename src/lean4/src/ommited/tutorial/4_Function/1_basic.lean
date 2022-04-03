


namespace Function
variable {α : Sort u₁} {β : Sort u₂} {φ : Sort u₃} {δ : Sort u₄} {ζ : Sort u₁}

def id {α : Sort u} (a : α) : α := a

-- /-- Composition of functions: `(f ∘ g) x = f (g x)`. -/
-- def comp (f : β → φ) (g : α → β) : α → φ := fun x => f (g x)

-- infix: ` ∘ `:90  := function.comp
notation:90 " ∘ " => Function.comp
-- notation:50 a " ∈ " s:50 => Set.in s a

variable {f : α → β}

#check @id α
#check f
-- #check Function.comp (@id β) f
#check (@id β) ∘ f
#check id ∘ f


theorem left_id (f : α → β) : id ∘ f = f := rfl

theorem right_id (f : α → β) : f ∘ id = f := rfl


/-- `left_inverse g f` means that g is a left inverse to f. That is, `g ∘ f = id`. -/
def left_inverse (g : β → α) (f : α → β) : Prop := ∀ x, g (f x) = x

/-- `has_left_inverse f` means that `f` has an unspecified left inverse. -/
def has_left_inverse (f : α → β) : Prop := ∃ finv : β → α, left_inverse finv f

/-- `right_inverse g f` means that g is a right inverse to f. That is, `f ∘ g = id`. -/
def right_inverse (g : β → α) (f : α → β) : Prop := left_inverse f g

/-- `has_right_inverse f` means that `f` has an unspecified right inverse. -/
def has_right_inverse (f : α → β) : Prop := ∃ finv : β → α, right_inverse finv f



-- W