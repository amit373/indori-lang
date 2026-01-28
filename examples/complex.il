# Complete IndoriLang program showcasing all features
jama_re numbers = [1, 2, 3, 4, 5];
jama_re doubled = [];
jama_re evens = [];
kaam sum laa_re 0;

# Array operations
# Note: Array methods with functions are not yet fully supported
# Using basic array operations instead
bhiya_bol("Array operations demo");

bhiya_bol("Original numbers: " + numbers);
bhiya_bol("Doubled: " + doubled);
bhiya_bol("Even numbers: " + evens);
bhiya_bol("Sum: " + sum);

# Object manipulation
naksha_re student = {
  naam: "Amit",
  marks: [85, 90, 78],
  pass: bilkul_sahi
};

agar_re (dikha_re(student, "pass")) {
  bhiya_bol(dikha_re(student, "naam") + " passed with marks: " + dikha_re(student, "marks"));
}

# Function definitions
bhiya_ka greet(name) {
  de_re "Ram Ram " + name + " bhiya!";
}

bhiya_ka factorial(n) {
  agar_re (n <= 1) {
    de_re 1;
  }
  de_re n * factorial(n - 1);
}

bhiya_ka isAdult(age) {
  de_re age >= 18;
}

# Function calls
bhiya_bol(greet("Indore"));
bhiya_bol("Factorial of 5 = " + factorial(5));

# Complex conditionals
kaam userAge laa_re 20;
kaam hasLicense laa_re bilkul_sahi;

agar_re (isAdult(userAge) ane_re hasLicense) {
  bhiya_bol("Can drive car!");
} warna_re {
  agar_re (isAdult(userAge) ane_re nako_re hasLicense) {
    bhiya_bol("Need license to drive!");
  } warna_re {
    bhiya_bol("Too young to drive!");
  }
}

# Error handling
bhiya_try {
  kaam x laa_re 10;
  kaam y laa_re 0;
  bhiya_bol("Division result: " + (x / y));
} bhiya_catch(e) {
  bhiya_gadbad("Caught error: Division by zero!");
} bhiya_finally {
  bhiya_bol("Error handling complete!");
}

# Easter eggs
poha_time();
jalebi_mode();
bhiya_bol("This message has jalebi decoration!");
rajwada_mode();
bhiya_bol("This message has rajwada decoration!");

# Final message
bhiya_bol("Program executed successfully!");
sarafa_night();
