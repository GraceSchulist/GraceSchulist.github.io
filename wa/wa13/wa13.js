//PROBLEM 1
class Employee {
    constructor(firstName, department, designation, salary, raiseEligible, /*PROBLEM 6*/wfh) {
        this.firstName = firstName;
        this.department = department;
        this.designation = designation;
        this.salary = salary;
        this.raiseEligible = raiseEligible;
        this.wfh = wfh; //PROBLEM 6
    }
}

let sam = new Employee("Sam", "Tech", "Manager", 40000, true,/*PROBLEM 6*/true);
let mary = new Employee("Mary","Finance","Trainee",18500,true,/*PROBLEM 6*/false);
let bill = new Employee("Bill","HR","Executive",21200,false,/*PROBLEM 6*/false);

//PROBLEM 3
let anna = new Employee("Anna", "Tech", "Executive", 25600, false,/*PROBLEM 6*/true);

console.log(sam);
console.log(mary);
console.log(bill);

//PROBLEM 3
console.log(anna);

//PROBLEM 2
class Company {
    constructor(companyName, website, employees, wfh)
    {
        this.companyName = companyName;
        this.website = website;
        this.employees = employees;
        this.wfh = wfh;
    }
}

let techStarsCo = new Company("Tech Stars", "www.techstars.site", [sam, mary, bill,/*PROBLEM 3*/ anna],/*PROBLEM 6*/[anna, sam]);

console.log(techStarsCo);

//PROBLEM 4
function calcEmpSalary() {
    return sam.salary + mary.salary + bill.salary + anna.salary;
}

console.log(calcEmpSalary());

//PROBLEM 5
function isRaiseEligible(employee) {
    if (employee.raiseEligible === true) {
        employee.salary = employee.salary + (employee.salary * 0.1);
    }
    employee.raiseEligible = false;
    return employee.salary;
}
console.log(isRaiseEligible(sam));
console.log(isRaiseEligible(mary));
console.log(isRaiseEligible(bill));
console.log(isRaiseEligible(anna));


