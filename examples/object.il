# Objects in IndoriLang
naksha_re person = {
  naam: "Raju",
  age: 25,
  city: "Indore",
  hobbies: ["coding", "music", "travel"],
  student: bilkul_sahi
};

naksha_re empty = {};

bhiya_bol("Person name: " + dikha_re(person, "naam"));
bhiya_bol("Person age: " + dikha_re(person, "age"));
bhiya_bol("Person city: " + dikha_re(person, "city"));

# Modify object properties
badal_re(person, "age", 26);
bhiya_bol("Updated age: " + dikha_re(person, "age"));

badal_re(person, "email", "raju@indore.com");
bhiya_bol("Added email: " + dikha_re(person, "email"));

# Check property existence
agar_re (dikha_re(person, "student")) {
  bhiya_bol("Person is a student");
}

agar_re (nako_re dikha_re(empty, "naam")) {
  bhiya_bol("Empty object has no name property");
}

# Nested objects
naksha_re company = {
  naam: "IndoriTech",
  address: {
    street: "MG Road",
    city: "Indore",
    pincode: 452001
  },
  employees: [
    { naam: "Amit", role: "Developer" },
    { naam: "Priya", role: "Designer" }
  ]
};

bhiya_bol("Company city: " + dikha_re(dikha_re(company, "address"), "city"));
bhiya_bol("First employee: " + dikha_re(nikaal_re(dikha_re(company, "employees"), 0), "naam"));
