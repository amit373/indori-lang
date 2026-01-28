# Arrays in IndoriLang
jama_re fruits = ["apple", "banana", "orange"];
jama_re numbers = [1, 2, 3, 4, 5];
jama_re empty = [];

bhiya_bol("First fruit: " + nikaal_re(fruits, 0));
bhiya_bol("Array length: " + ketlu_re(fruits));

# Array operations
# Note: Array methods like ghuma_map, chhaan_re, ghuma_reduce require functions
# which are not yet fully supported in IndoriLang syntax
# For now, use basic array access and length
bhiya_bol("Array operations demo");

# Note: Array modification should be done via assignment
# For now, arrays are immutable in IndoriLang
bhiya_bol("Array access: " + nikaal_re(fruits, 1));

# Check if array is empty
agar_re (ketlu_re(empty) == 0) {
  bhiya_bol("Array is empty");
} warna_re {
  bhiya_bol("Array has elements");
}
