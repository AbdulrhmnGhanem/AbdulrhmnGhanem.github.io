---
title: Hierarchical Authorization with Flags
draft: false
date: 18 Sep 2025
description: Implementing hierarchical role-based access control (RBAC) using Python's enum.Flag for compact and efficient permission management.
tags:
  - software-design
  - RBAC
  - Python
alias:
  - software-design/hierarchical-authorization
---

Imagine you're building a web service for a simple RPG game. A user can have one of the following roles:

- **Hero**: can strike with a sword and enter the dungeon.
- **Archer**: has the hero's abilities and can use a bow.
- **Wizard**: has the hero's abilities and can cast spells and brew potions.
- **Guild Master**: has the hero's abilities and can collect taxes.
- **King**: has the abilities of **Guild Master**, **Wizard**, and **Archer** plus can enter the castle.
- **Dragon Lord**: has the abilities of **King** plus can fly and breathe fire.

![[board.jpg]]

Let's start by defining the roles in the system.
We don't care about the actual values for the roles; we only need unique representations for each role. This is a perfect use case for [`enum.auto`](https://docs.python.org/3/library/enum.html#enum.auto).

```py
from enum import StrEnum, auto


class Role(StrEnum):
    HERO = auto()
    ARCHER = auto()
    WIZARD = auto()
    GUILD_MASTER = auto()
    KING = auto()
    DRAGON_LORD = auto()
```

Now we can define all the permissions in the system. Here, unlike roles, the choice of enum type will make a difference. I'll start with the less optimal `StrEnum`, and as we progress we'll see why `Flag` is a better fit for this use case.

```py
class Permission(StrEnum):
    STRIKE = auto()
    ENTER_DUNGEON = auto()
    USE_BOW = auto()
    CAST_SPELL = auto()
    BREW_POTION = auto()
    COLLECT_TAXES = auto()
    ENTER_CASTLE = auto()
    FLY = auto()
    BREATHE_FIRE = auto()
```

If we define the permissions for each role naively we can do something like this:

```py
ROLE_PERMISSIONS: dict[Role, set[Permission]] = {
    Role.HERO: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
    },
    Role.ARCHER: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
        Permission.USE_BOW,
    },
    Role.WIZARD: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
        Permission.CAST_SPELL,
        Permission.BREW_POTION,
    },
    Role.GUILD_MASTER: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
        Permission.COLLECT_TAXES,
    },
    Role.KING: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
        Permission.USE_BOW,
        Permission.CAST_SPELL,
        Permission.BREW_POTION,
        Permission.COLLECT_TAXES,
        Permission.ENTER_CASTLE,
    },
    Role.DRAGON_LORD: {
        Permission.STRIKE,
        Permission.ENTER_DUNGEON,
        Permission.USE_BOW,
        Permission.CAST_SPELL,
        Permission.BREW_POTION,
        Permission.COLLECT_TAXES,
        Permission.ENTER_CASTLE,
        Permission.FLY,
        Permission.BREATHE_FIRE,
    },
}
```

Now we get a new requirement that a **Hero** can `use_shield`. This means that all the other roles should also get this permission. So we need to update the `Permission` enum and the `ROLE_PERMISSIONS` mapping.

```py
class Permission(StrEnum):
    ...
    USE_SHIELD = auto()


ROLE_PERMISSIONS: dict[Role, set[Permission]] = {
    Role.HERO: {
        ...
        Permission.USE_SHIELD,
    },
    Role.ARCHER: {
        ...
        Permission.USE_SHIELD,
    },
    Role.WIZARD: {
        ...
        Permission.USE_SHIELD,
    },
    Role.GUILD_MASTER: {
        ...
        Permission.USE_SHIELD,
    },
    Role.KING: {
        ...
        Permission.USE_SHIELD,
    },
    Role.DRAGON_LORD: {
        ...
        Permission.USE_SHIELD,
    },
}
```

This approach is cumbersome and error-prone, and you can't see the role hierarchy at a glance.

## Hierarchical Permissions with Sets

To solve this problem, we can define the permissions for each role in terms of the permissions of other roles. This avoids duplication and makes the hierarchy explicit.

```py
def get_permissions_for_role(role: Role) -> set[Permission]:
    match role:
        case Role.HERO:
            return {Permission.STRIKE, Permission.ENTER_DUNGEON}
        case Role.ARCHER:
            return get_permissions_for_role(Role.HERO) | {Permission.USE_BOW}
        case Role.WIZARD:
            return get_permissions_for_role(Role.HERO) | {
                Permission.CAST_SPELL,
                Permission.BREW_POTION,
            }
        case Role.GUILD_MASTER:
            return get_permissions_for_role(Role.HERO) | {Permission.COLLECT_TAXES}
        case Role.KING:
            return (
                get_permissions_for_role(Role.GUILD_MASTER)
                | get_permissions_for_role(Role.WIZARD)
                | get_permissions_for_role(Role.ARCHER)
                | {Permission.ENTER_CASTLE}
            )
        case Role.DRAGON_LORD:
            return get_permissions_for_role(Role.KING) | {Permission.FLY, Permission.BREATHE_FIRE}
```

As a safeguard that we didn't forget to cover all roles, we can add a simple assertion.

```py
from typing import assert_never

def get_permissions_for_role(role: Role) -> set[Permission]:
    match role:
        ...
        case _:
            assert_never(role)
```

Any modern Python type-checker will warn us if we forget to handle a role.
Another point: this is now a recursive function call and it will probably be on the hot path of our application. To optimize it, we can use `functools.cache` to memoize the results.

```py
from functools import cache

@cache
def get_permissions_for_role(role: Role) -> set[Permission]:
    ...
```

To check if a role has a specific permission, we can do something like this:

```py
from dataclasses import dataclass

@dataclass(frozen=True)
class User:
    username: str
    permissions: set[Permission]

def has_permission(user: User, permission: Permission) -> bool:
    return permission in user.permissions

alice = User(username="alice", permissions=get_permissions_for_role(Role.HERO))
bob = User(username="bob", permissions=get_permissions_for_role(Role.KING))

assert not has_permission(alice, Permission.USE_BOW), "Hero can't use bow"
assert has_permission(bob, Permission.CAST_SPELL), "King can cast spell"
```

## A user can be cursed or blessed

Suppose we get a new requirement: a user can be cursed. If a user is cursed, they lose the ability to `use_shield`.
Also, a user can be blessed. If a user is blessed, they gain the ability to `fly`. To implement these, let's define `curse` and `bless` functions:

```py
def curse(user: User) -> User:
    return User(
        username=user.username,
        permissions=user.permissions - {Permission.USE_SHIELD},
    )

def bless(user: User) -> User:
    return User(
        username=user.username,
        permissions=user.permissions | {Permission.FLY},
    )

cursed_bob = curse(bob)
assert not has_permission(
    cursed_bob,
    Permission.USE_SHIELD,
), "Cursed Bob can't use shield"

blessed_alice = bless(alice)
assert has_permission(blessed_alice, Permission.FLY), "Blessed Alice can fly"
```

## enum.Flag

So far, sets made sense. But if you look closely, permissions are just on/off switches. That’s exactly what a bitmask models.
Python’s `enum.Flag` gives us that representation out of the box — and it unlocks some neat tricks that sets can't do.

Because we used `auto` to define permission values, switching to `Flag` is as simple as changing the base class.

```py
from enum import Flag

class Permission(Flag):
    ...
```

Now we can get rid of the set literals when defining `get_permissions_for_role` and use the bitwise OR operator `|` instead of the set union operator.

```py
@cache
def get_permissions_for_role(role: Role) -> Permission:
    """
    The following diagram illustrates the permission lookup order; think of it
    like MRO rather than inheritance.

                    ┌──────────────┐
                    │ DRAGON LORD  │
                    └──────▲───────┘
                           │
                    ┌──────┴───────┐
                    │     KING     │
                    └──────▲───────┘
                           │
                           │
       ┌────────┐   ┌──────┴───────┐   ┌──────────┐
       │ ARCHER │   │ GUILD MASTER │   │  WIZARD  │
       └───▲────┘   └──────▲───────┘   └────▲─────┘
           │               │                │
           └───────────────┼────────────────┘
                    ┌──────┼───────┐
                    │     HERO     │
                    └──────────────┘

    """
    match role:
        case Role.HERO:
            return Permission.STRIKE | Permission.ENTER_DUNGEON
        case Role.ARCHER:
            return get_permissions_for_role(Role.HERO) | Permission.USE_BOW
        case Role.WIZARD:
            return (
                get_permissions_for_role(Role.HERO)
                | Permission.CAST_SPELL
                | Permission.BREW_POTION
            )
        case Role.GUILD_MASTER:
            return get_permissions_for_role(Role.HERO) | Permission.COLLECT_TAXES
        case Role.KING:
            return (
                get_permissions_for_role(Role.GUILD_MASTER)
                | get_permissions_for_role(Role.WIZARD)
                | get_permissions_for_role(Role.ARCHER)
                | Permission.ENTER_CASTLE
            )
        case Role.DRAGON_LORD:
            return (
                get_permissions_for_role(Role.KING)
                | Permission.FLY
                | Permission.BREATHE_FIRE
            )
        case _:
            assert_never(role)
```

We can simplify the `User` class by changing the type of `permissions` from `set[Permission]` to `Permission`.
This way, we can leverage bitwise operations directly in `bless` and `curse`.

```py
@dataclass(frozen=True)
class User:
    username: str
    permissions: Permission

def curse(user: User) -> User:
    return User(
        username=user.username,
        permissions=user.permissions & ~Permission.USE_SHIELD,
    )

def bless(user: User) -> User:
    return User(
        username=user.username,
        permissions=user.permissions | Permission.FLY,
    )

def has_permission(user: User, permission: Permission) -> bool:
    return (user.permissions & permission) == permission

alice = User(username="alice", permissions=get_permissions_for_role(Role.HERO))
bob = User(username="bob", permissions=get_permissions_for_role(Role.KING))

assert not has_permission(alice, Permission.USE_BOW), "Hero can't use bow"
assert has_permission(bob, Permission.CAST_SPELL), "King can cast spell"
```

## Performance Considerations

Although both bitwise operations and set operations have the same time complexity of `O(1)`, bitwise operations are generally faster and more memory efficient than set operations in low-level languages.
Bitwise operations have native machine instructions that can be executed in a single CPU cycle, while set operations involve more overhead due to the underlying data structures and hashing.
So a flags implementation will be faster, right? Actually, in CPython, no.

Surprisingly, in CPython, `set` operations are often faster than `enum.Flag`. That's because Python's `Flag` adds overhead:
it's not a bare integer but an object with validation, string representations, and safety checks.
So in Python, the reason to use `Flag` isn't raw performance: it's expressiveness, clarity, and avoiding duplication in hierarchical permissions.
If you were writing this in C or Rust, raw bitmasks would likely win hands down. But in Python, `Flag` is mostly about developer ergonomics rather than runtime efficiency.

```py
import timeit
from enum import Flag, IntFlag, auto

class AbilityFlag(Flag):
    STRIKE = auto()
    FLY = auto()
    INVISIBLE = auto()

class AbilityIntFlag(IntFlag):
    STRIKE = auto()
    FLY = auto()
    INVISIBLE = auto()

# sets
hero_set = {AbilityFlag.STRIKE, AbilityFlag.INVISIBLE}
extra_set = {AbilityFlag.FLY}

# flag
hero_flag = AbilityFlag.STRIKE | AbilityFlag.INVISIBLE
extra_flag = AbilityFlag.FLY

# intflag
hero_iflag = AbilityIntFlag.STRIKE | AbilityIntFlag.INVISIBLE
extra_iflag = AbilityIntFlag.FLY

# bitmask
STRIKE, FLY, INVISIBLE = 1, 2, 4
hero_mask = STRIKE | INVISIBLE
extra_mask = FLY

benchmarks = {
    "Set membership": "AbilityFlag.FLY in hero_set",
    "Flag membership": "(hero_flag & AbilityFlag.FLY) == AbilityFlag.FLY",
    "IntFlag membership": "(hero_iflag & AbilityIntFlag.FLY) == AbilityIntFlag.FLY",
    "Bitmask membership": "(hero_mask & FLY) == FLY",

    "Set negation": "AbilityFlag.FLY not in hero_set",
    "Flag negation": "not (hero_flag & AbilityFlag.FLY)",
    "IntFlag negation": "not (hero_iflag & AbilityIntFlag.FLY)",
    "Bitmask negation": "not (hero_mask & FLY)",

    "Set OR": "hero_set | extra_set",
    "Flag OR": "hero_flag | extra_flag",
    "IntFlag OR": "hero_iflag | extra_iflag",
    "Bitmask OR": "hero_mask | extra_mask",
}

results = {}
for name, stmt in benchmarks.items():
    t = timeit.timeit(stmt, globals=globals(), number=1_000_000)
    results[name] = t
```

On my `AMD Ryzen 5 5600H` CPU the results (1,000,000 iterations, CPython 3.13.5) were:

|     | Set    | Flag   | IntFlag | Bitmask |
| --- | ------ | ------ | ------- | ------- |
| ∈   | 0.0981 | 0.5640 | 0.6887  | 0.0258  |
| ~   | 0.0987 | 0.6075 | 0.6712  | 0.0241  |
| \|  | 0.0622 | 0.5187 | 0.6536  | 0.0230  |

So sets are about 5–6x faster than `Flag`, and `IntFlag` is slightly slower than `Flag`. Different [flag boundaries](https://docs.python.org/3/library/enum.html#enum.FlagBoundary) don't dramatically change the performance.

Here are results using different flag boundaries, where each `F-*` represents `class Permission(Flag, boundary=*)`:

|     | Set    | F-Strict | F-Conform | F-Eject | F-Keep | IntFlag | Bitmask |
| --- | ------ | -------- | --------- | ------- | ------ | ------- | ------- |
| ∈   | 0.051  | 0.292    | 0.289     | 0.286   | 0.282  | 0.347   | 0.012   |
| ~   | 0.050  | 0.310    | 0.304     | 0.306   | 0.310  | 0.333   | 0.012   |
| \|  | 0.0320 | 0.268    | 0.271     | 0.267   | 0.265  | 0.328   | 0.011   |
