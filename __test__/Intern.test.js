const Intern = require("../lib/Intern.js");

test("set school", () => {
  const testValue = "UCLA";
  const nInt = new Intern("Foo", 1, "abc@abc.com", testValue);
  expect(nInt.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const nInt = new Intern("Foo", 1, "abc@abc.com", "UCLA");
  expect(nInt.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UCLA";
  const nInt = new Intern("Foo", 1, "abc@abc.com", testValue);
  expect(nInt.getSchool()).toBe(testValue);
});