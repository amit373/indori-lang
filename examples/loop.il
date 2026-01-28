# Loops in IndoriLang
kaam i laa_re 0;

# While loop
jabtak_re (i < 5) {
  bhiya_bol("While count: " + i);
  i = i + 1;
}

# For loop
kaam j laa_re 0;
ghuma_re (j; j < 3; j = j + 1) {
  bhiya_bol("For count: " + j);
}

# Do-while loop
kaam k laa_re 0;
jabtak_re_kar {
  bhiya_bol("Do-while count: " + k);
  k = k + 1;
} (k < 2);

# Nested loops
bhiya_bol("Nested loops example:");
kaam x laa_re 1;
ghuma_re (x; x <= 2; x = x + 1) {
  kaam y laa_re 1;
  jabtak_re (y <= 3) {
    bhiya_bol(x + " x " + y + " = " + (x * y));
    y = y + 1;
  }
}
