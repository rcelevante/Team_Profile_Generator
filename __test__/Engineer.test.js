const Engineer = require("../lib/Engineer.js");

test("set GitHub", () => {
  const testValue = "GitHubUser";
  const nEng = new Engineer("Foo", 1, "abc@abc.com", testValue);
  expect(nEng.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const nEng = new Engineer("Foo", 1, "abc@abc.com", "GitHubUser");
  expect(nEng.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const nEng = new Engineer("Foo", 1, "abc@abc.com", testValue);
  expect(nEng.getGithub()).toBe(testValue);
});