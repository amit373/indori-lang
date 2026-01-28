# IndoriLang - Supported JavaScript Features

This document lists all JavaScript features currently supported in IndoriLang v1.0.

## ✅ Supported Features

### **Data Types & Literals**
- ✅ **Numbers** (integers only - no decimals)
- ✅ **Strings** (single or double quotes)
- ✅ **Booleans** (`bilkul_sahi` = true, `ghapla_hai` = false)
- ✅ **Arrays** (declaration and literal syntax)
- ✅ **Objects** (declaration and literal syntax with properties)
- ✅ **null/undefined** (implicitly supported via object property access)

### **Variables**
- ✅ Variable declaration (`kaam x laa_re value;`)
- ✅ Variable assignment (`x = newValue;`)
- ✅ Variable reassignment

### **Operators**

#### Arithmetic Operators
- ✅ Addition (`+`)
- ✅ Subtraction (`-`)
- ✅ Multiplication (`*`)
- ✅ Division (`/`)
- ✅ Increment (`++`)
- ✅ Decrement (`--`)

#### Comparison Operators
- ✅ Equal (`==`)
- ✅ Not Equal (`!=`)
- ✅ Less Than (`<`)
- ✅ Less Than or Equal (`<=`)
- ✅ Greater Than (`>`)
- ✅ Greater Than or Equal (`>=`)

#### Logical Operators
- ✅ AND (`ane_re`)
- ✅ OR (`ya_re`)
- ✅ NOT (`nako_re` - unary operator)

#### Assignment Operators
- ✅ Assignment (`=`)

### **Control Flow**

#### Conditionals
- ✅ If statement (`agar_re`)
- ✅ Else statement (`warna_re`)
- ✅ Nested if/else

#### Loops
- ✅ While loop (`jabtak_re`)
- ✅ For loop (`ghuma_re`)
- ✅ Do-while loop (`jabtak_re_kar`)
- ✅ Nested loops

### **Functions**
- ✅ Function declaration (`bhiya_ka`)
- ✅ Function parameters
- ✅ Return statement (`de_re`)
- ✅ Function calls
- ✅ Recursive functions

### **Arrays**
- ✅ Array declaration (`jama_re`)
- ✅ Array literals `[1, 2, 3]`
- ✅ Array access via index (`nikaal_re(arr, index)`)
- ✅ Array length (`ketlu_re(arr)`)
- ✅ Array methods (runtime helpers):
  - `ghuma_map(arr, fn)` - map
  - `chhaan_re(arr, fn)` - filter
  - `ghuma_reduce(arr, fn, init)` - reduce
- ⚠️ **Note**: Array methods require function callbacks, but arrow functions are not yet supported in IndoriLang syntax

### **Objects**
- ✅ Object declaration (`naksha_re`)
- ✅ Object literals `{ key: value }`
- ✅ Property access (`dikha_re(obj, "key")`)
- ✅ Property assignment (`badal_re(obj, "key", value)`)
- ✅ Nested objects
- ✅ Objects with array properties
- ✅ Objects with object properties

### **Error Handling**
- ✅ Try-catch (`bhiya_try` / `bhiya_catch`)
- ✅ Finally block (`bhiya_finally`)
- ✅ Catch parameter

### **Console & Output**
- ✅ `console.log` (`bhiya_bol`)
- ✅ `console.warn` (`bhiya_chitav`)
- ✅ `console.error` (`bhiya_gadbad`)
- ✅ `alert()` (`bhiya_suna`)

### **Expressions**
- ✅ Binary expressions (arithmetic, comparison)
- ✅ Unary expressions (NOT, negation)
- ✅ Logical expressions (AND, OR)
- ✅ Assignment expressions
- ✅ Call expressions (function calls)
- ✅ Member expressions (property access, array indexing)
- ✅ Array expressions
- ✅ Object expressions
- ✅ Parenthesized expressions

### **Comments**
- ✅ Single-line comments (`# comment`)

### **Special Features**
- ✅ Async sleep function (`ruk_re(ms)`)
- ✅ Easter eggs:
  - `poha_time()` - Poha time message
  - `jalebi_mode()` - Decorates logs with 🍬
  - `rajwada_mode()` - Decorates logs with 👑
  - `sarafa_night()` - Alert message

## ❌ Not Supported (Yet)

### **Modern JavaScript Features**
- ❌ Arrow functions (`=>`)
- ❌ Template literals (backticks)
- ❌ Destructuring
- ❌ Spread operator (`...`)
- ❌ Rest parameters
- ❌ Default parameters
- ❌ Optional chaining (`?.`)
- ❌ Nullish coalescing (`??`)

### **Advanced Features**
- ❌ Classes
- ❌ Modules (import/export)
- ❌ Async/await (only `ruk_re` for sleep)
- ❌ Promises (except via runtime helpers)
- ❌ Generators
- ❌ Iterators
- ❌ Symbols
- ❌ Proxies
- ❌ WeakMap/WeakSet

### **Operators**
- ❌ Modulo (`%`)
- ❌ Exponentiation (`**`)
- ❌ Bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`)
- ❌ Strict equality (`===`, `!==`)
- ❌ Ternary operator (`? :`)
- ❌ Typeof
- ❌ Instanceof
- ❌ In operator
- ❌ Delete operator

### **Data Types**
- ❌ Decimals/Floats (only integers)
- ❌ BigInt
- ❌ Date objects
- ❌ RegExp
- ❌ Typed arrays

### **Control Flow**
- ❌ Switch statements
- ❌ Break/Continue
- ❌ Labels
- ❌ For-in loops
- ❌ For-of loops

### **Other**
- ❌ Variable scoping (`let`, `const` - only function scope)
- ❌ Hoisting behavior
- ❌ `this` keyword
- ❌ `new` keyword
- ❌ `super` keyword
- ❌ `with` statement
- ❌ `debugger` statement
- ❌ `use strict`

## 📊 Feature Count Summary

### Supported: ~35-40 Core Features
- **Data Types**: 6 (number, string, boolean, array, object, null/undefined)
- **Operators**: 13 (arithmetic, comparison, logical, assignment)
- **Control Flow**: 7 (if, else, while, for, do-while, try-catch-finally)
- **Functions**: 4 (declaration, parameters, return, calls)
- **Arrays**: 6 (declaration, access, length, map, filter, reduce)
- **Objects**: 3 (declaration, property access, property assignment)
- **Expressions**: 8 (binary, unary, logical, assignment, call, member, array, object)
- **Console**: 4 (log, warn, error, alert)
- **Special**: 5 (sleep, easter eggs)

### Not Supported: ~50+ Modern Features
- Modern ES6+ features
- Advanced operators
- Classes and OOP
- Modules
- Advanced control flow

## 🎯 Coverage Estimate

IndoriLang currently supports approximately **40-45%** of core JavaScript features, focusing on:
- ✅ Basic imperative programming
- ✅ Functions and recursion
- ✅ Arrays and objects
- ✅ Control flow
- ✅ Error handling

It's designed as a **fun, educational language** with Indori slang, not a full JavaScript replacement. The focus is on teaching programming concepts in an entertaining way!
