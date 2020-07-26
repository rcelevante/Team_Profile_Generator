const Manager = require("../lib/Manager.js");
const Employee = require("../lib/Employee.js");

test("Can set office number via constructor argument", () => {
  const testValue = 100;
  const nMan = new Manager("Foo", 1, "abc@abc.com", testValue);
  expect(nMan.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const nMan = new Manager("Foo", 1, "abc@abc.com", 100);
  expect(nMan.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = 100;
  const nMan = new Manager("Foo", 1, "abc@abc.com", testValue);
  expect(nMan.getOfficeNumber()).toBe(testValue);
});