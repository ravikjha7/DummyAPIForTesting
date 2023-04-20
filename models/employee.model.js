const path = require('path');
const filename = path.join(__dirname, '../data/employees.json');
let employees = require(filename);
const { v4: uuidv4 } = require('uuid');
const helper = require('../helpers/helper.js');

function getEmployees() {
    // console.log(filename);
    return new Promise((resolve, reject) => {
        resolve(employees)
    })
}

function getEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(employees, id)
        .then(employee => resolve(employee))
        .catch(err => reject(err))
    })
}

function addEmployee(newEmployee) {
    return new Promise((resolve, reject) => {
        const id = uuidv4();

        newEmployee = { ...id, ...newEmployee };

        var employee = { 
            "id": id,
            "name": newEmployee.name,
            "city": newEmployee.city
        }
        employees.push(employee)
        helper.writeJSONFile(filename, employees)
        resolve(employee)
    })
}

function updatePost(id, newEmployee) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(employees, id)
        .then(employee => {
            const index = employees.findIndex(e => e.id == employee.id)
            id = { id: employee.id }
            employees[index] = { ...id, ...newEmployee }
            helper.writeJSONFile(filename, employees)
            resolve(employees[index])
        })
        .catch(err => reject(err))
    })
}

function deleteEmployee(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(employees, id)
        .then(() => {

            let deletedEmployee;
            let newEmployees = [];

            for(var i = 0; i < employees.length; i++) {
                if(employees[i].id !== id) newEmployees.push(employees[i]);
                else deletedEmployee = employees[i];
            }

            helper.writeJSONFile(filename, newEmployees)
            resolve(deletedEmployee)
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    addEmployee,
    getEmployee,
    getEmployees,
    updatePost,
    deleteEmployee
}