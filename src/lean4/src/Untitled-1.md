```
theorem <proposition_name>:<statement>:= <proof>
```
定理名の型は対応する定理の主張
定理の主張の型はProp



※注意：命題は必ず真または偽の値をとる？

※bool型

```
inductive Bool : Type where
  | false : Bool
  | true : Bool
```


※命題の評価可能性

各命題pについて`Deciable p`という型を考える
`Deciable p`の型を持つ要素は全部で２つあり、再び`Deciable p`という型を持つ
片方は`isTrue (h : p)`で、もう片方は`isFalse (h : Not p)`
hは主張pを証明する定理

(lean4/src/Init/Prelude.lean,264)
```
class inductive Decidable (p : Prop) where
  | isFalse (h : Not p) : Decidable p
  | isTrue  (h : p) : Decidable p

@[inlineIfReduce, nospecialize] def Decidable.decide (p : Prop) [h : Decidable p] : Bool :=
  Decidable.casesOn (motive := fun _ => Bool) h (fun _ => false) (fun _ => true)
```

※例
pは型Propを持つ主張で、hはその主張を証明する定理の場合。
例えば、Bool型のtrueについて、定理rflは

(lean4/src/Init/Prelude.lean,64)
```
@[matchPattern] def rfl {α : Sort u} {a : α} : Eq a a := Eq.refl a
```

であった。したがって、この場合`Decidable rfl`は、`Decidable rfl`の型を持つ
`isFalse Not (true = true)、isTrue  (true = true)`の２要素を持つ


※命題評価への帰着

(lean4/src/Init/Prelude.lean,279)
```
abbrev DecidableEq (α : Sort u) :=
  (a b : α) → Decidable (Eq a b)
```

※等価評価のboolによる表現

`DecidableEq Bool`の型を持つ要素を定義する


(src/Init/Prelude.lean,308)
```
@[inline] instance : DecidableEq Bool :=
  fun a b => match a, b with
   | false, false => isTrue rfl
   | false, true  => isFalse (fun h => Bool.noConfusion h)
   | true, false  => isFalse (fun h => Bool.noConfusion h)
   | true, true   => isTrue rfl

class BEq (α : Type u) where
  beq : α → α → Bool

open BEq (beq)

instance [DecidableEq α] : BEq α where
  beq a b := decide (Eq a b)

-- We use "dependent" if-then-else to be able to communicate the if-then-else condition
-- to the branches
@[macroInline] def dite {α : Sort u} (c : Prop) [h : Decidable c] (t : c → α) (e : Not c → α) : α :=
  Decidable.casesOn (motive := fun _ => α) h e t
```




## 問題


### 小問（難易度★☆☆☆☆～★★★★☆）

### 大問（難易度★★★★★）



```
def byCases {q : Sort u} [dec : Decidable p] (h1 : p → q) (h2 : ¬p → q) : q :=
  match dec with
  | isTrue h  => h1 h
  | isFalse h => h2 h
```

```
theorem diaconescu_theorem' (p : Prop) [Decidable p] : p ∨ ¬p := sorry
theorem of_not_not [Decidable p] : ¬ ¬ p → p := sorry
theorem byContradiction [hp : Decidable p] (h : ¬p → False) : p := sorry
```


```
/- Diaconescu's theorem -/
theorem diaconescu_theorem (p : Prop) : p ∨ ¬p := sorry
```


```
theorem exists_if_nonempty {α : Sort u} : Nonempty α → ∃ x : α, True := sorry
```
