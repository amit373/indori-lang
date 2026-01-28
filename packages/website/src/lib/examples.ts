export interface Example {
  name: string;
  code: string;
}

export const examples: Example[] = [
  {
    name: 'Hello World',
    code: `# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");
poha_time();`,
  },
  {
    name: 'Variables & Math',
    code: `# Variables and arithmetic operations
kaam x laa_re 10;
kaam y laa_re 20;
kaam sum laa_re x + y;

bhiya_bol("Sum: " + sum);
bhiya_bol("Product: " + (x * y));`,
  },
  {
    name: 'Conditionals',
    code: `# If-else statements
kaam age laa_re 18;

agar_re (age >= 18) {
  bhiya_bol("Bilkul adult ho re!");
} warna_re {
  bhiya_bol("Abhi baccha hai!");
}

agar_re (age >= 18 ane_re age <= 25) {
  bhiya_bol("College time!");
}`,
  },
  {
    name: 'Loops',
    code: `# While and for loops
kaam i laa_re 0;

jabtak_re (i < 5) {
  bhiya_bol("Count: " + i);
  i = i + 1;
}

# For loop
kaam j laa_re 0;
ghuma_re (j; j < 3; j = j + 1) {
  bhiya_bol("For loop: " + j);
}

# Do-while example
kaam k laa_re 0;
jabtak_re_kar {
  bhiya_bol("Do-while: " + k);
  k = k + 1;
} (k < 2);`,
  },
  {
    name: 'Arrays & Objects',
    code: `# Arrays and objects
jama_re fruits = ["apple", "banana", "orange"];
naksha_re person = {
  naam: "Raju",
  age: 25,
  city: "Indore"
};

bhiya_bol("First fruit: " + nikaal_re(fruits, 0));
bhiya_bol("Array length: " + ketlu_re(fruits));
bhiya_bol("Person name: " + dikha_re(person, "naam"));

badal_re(person, "age", 26);
bhiya_bol("Updated age: " + dikha_re(person, "age"));`,
  },
  {
    name: 'Functions',
    code: `# Function definitions and calls
bhiya_ka greet(name) {
  de_re "Ram Ram " + name + "!";
}

bhiya_ka add(a, b) {
  de_re a + b;
}

bhiya_ka factorial(n) {
  agar_re (n <= 1) {
    de_re 1;
  }
  de_re n * factorial(n - 1);
}

bhiya_bol(greet("bhiya"));
bhiya_bol("5 + 3 = " + add(5, 3));
bhiya_bol("Factorial of 5 = " + factorial(5));`,
  },
  {
    name: 'Error Handling',
    code: `# Try-catch-finally blocks
bhiya_try {
  kaam x laa_re 10;
  kaam y laa_re 0;
  bhiya_bol("Result: " + (x / y));
} bhiya_catch(e) {
  bhiya_gadbad("Error caught: " + e);
} bhiya_finally {
  bhiya_bol("This always runs!");
}`,
  },
  {
    name: 'Easter Eggs',
    code: `# Fun IndoriLang Easter eggs
poha_time();
jalebi_mode();
bhiya_bol("This will have jalebi emoji!");
rajwada_mode();
bhiya_bol("This will have rajwada emoji!");
sarafa_night();`,
  },
  {
    name: 'Complex Program',
    code: `# Complete program showcasing all features
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
sarafa_night();`,
  },
];
