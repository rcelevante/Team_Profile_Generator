const Employee = require("../lib/Employee.js");

    test("Employee instance", () => {
        const nEmp = new Employee();
        expect(typeof(nEmp)).toBe("object");
    });
  
    test("set name", () => {
        const name = "Roro";
        const nEmp = new Employee(name);
        expect(nEmp.name).toBe(name);
    });
  
    test("set id", () => {
        const testValue = 100;
        const nEmp = new Employee("Foo", testValue);
        expect(nEmp.id).toBe(testValue);
    });
  
    test("set email", () => {
        const testValue = "abc@abc.com";
        const nEmp = new Employee("Foo", 1, testValue);
        expect(nEmp.email).toBe(testValue);
    });
    
    test("get name", () => {
        const testValue = "Roro";
        const nEmp = new Employee(testValue);
        expect(nEmp.getName()).toBe(testValue);
    });
    
    test("get id", () => {
        const testValue = 100;
        const nEmp = new Employee("Foo", testValue);
        expect(nEmp.getId()).toBe(testValue);
    });
        
    test("get email", () => {
        const testValue = "abc@abc.com";
        const nEmp = new Employee("Foo", 1, testValue);
        expect(nEmp.getEmail()).toBe(testValue);
    });
    
    test("get the role of the employee", () => {
        const testValue = "Employee";
        const nEmp = new Employee("Roro", 1, "abc@abc.com");
        expect(nEmp.getRole()).toBe(testValue);
});
  