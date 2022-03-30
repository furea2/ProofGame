universe u v w

def Set (α : Type u) := α → Prop
def Set.in (s : Set α) (a : α) := s a

notation:50 a " ∈ " s:50 => Set.in s a

def Set.pred (p : α → Prop) : Set α := p

notation "{" a "|" p "}" => Set.pred (fun a => p)

def Set.subset (s₁ s₂ : Set α) :=
  ∀a, s₁ a → s₂ a

def Set.sunion (s : Set (Set α)) : Set α :=
  { t | ∃a, a ∈ s ∧ t ∈ a }

def Set.union (s₁ s₂ : Set α) : Set α :=
  { a | a ∈ s₁ ∨ a ∈ s₂ }

def Set.sinter (s : Set (Set α)) : Set α :=
  { t | ∀a, a ∈ s ∧ t ∈ a }

def Set.inter (s₁ s₂ : Set α) : Set α :=
  { a | a ∈ s₁ ∧ a ∈ s₂ }

infix:55 " ⊂ " => Set.subset
prefix:110 " ∪₀ " => Set.sunion
infix:65 " ∪ " => Set.union
prefix:115 " ∩₀ " => Set.sinter
infix:70 " ∩ " => Set.inter

instance (s : Set α) [h : Decidable (s a)] : Decidable (a ∈ Set.pred s) :=
  h
instance (s₁ s₂ : Set α) [Decidable (a ∈ s₁)] [Decidable (a ∈ s₂)] : Decidable (a ∈ s₁ ∩ s₂) :=
  inferInstanceAs (Decidable (_ ∧ _))
instance (s₁ s₂ : Set α) [Decidable (a ∈ s₁)] [Decidable (a ∈ s₂)] : Decidable (a ∈ s₁ ∪ s₂) :=
  inferInstanceAs (Decidable (_ ∨ _))


/-!
### Topological spaces
-/

/-- A topology on `α`. -/
structure topological_space (α : Type u) :=
  (is_open        : Set α → Prop)
  (is_open_univ   : is_open univ)
  (is_open_inter  : ∀s t, is_open s → is_open t → is_open (s ∩ t))
  (is_open_sUnion : ∀(s : Set (Set α)), (∀t, t ∈ s ∧ is_open t) → is_open (∪₀ s))

-- /-- A constructor for topologies by specifying the closed sets,
-- and showing that they satisfy the appropriate conditions. -/
-- def topological_space.of_closed {α : Type u} (T : set (set α))
--   (empty_mem : ∅ ∈ T) (sInter_mem : ∀(A : Set (Set α)),  A ⊂ T ∧ ⋂₀ A ∈ T) (union_mem : ∀ A B ∈ T, A ∪ B ∈ T) :
--   topological_space α :=
-- { is_open := λ X, Xᶜ ∈ T,
--   is_open_univ := by simp [empty_mem],
--   is_open_inter := λ s t hs ht, by simpa [set.compl_inter] using union_mem sᶜ hs tᶜ ht,
--   is_open_sUnion := λ s hs,
--     by rw set.compl_sUnion; exact sInter_mem (set.compl '' s)
--     (λ z ⟨y, hy, hz⟩, by simpa [hz.symm] using hs y hy) }
