# Conditionals in IndoriLang
kaam age laa_re 18;

agar_re (age >= 18) {
  bhiya_bol("Bilkul adult ho re!");
} warna_re {
  bhiya_bol("Abhi baccha hai!");
}

agar_re (age >= 18 ane_re age <= 25) {
  bhiya_bol("College time!");
} warna_re {
  agar_re (age > 25) {
    bhiya_bol("Job time!");
  }
}

# Complex condition
kaam weather laa_re "sunny";

agar_re (weather == "sunny" ane_re age > 18) {
  bhiya_bol("Perfect day for outing!");
} warna_re {
  bhiya_bol("Better stay home!");
}
