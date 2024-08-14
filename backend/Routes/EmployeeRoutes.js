const { createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    deleteEmployeeById, 
    updateEmployeeById } = require('../Controllers/EmployeeController');
const { createEmployeeValidation } = require('../Middlewares/CreateEmployeeValidation');

const routes = require('express').Router();

routes.get('/', getAllEmployees);
routes.get('/:id', getEmployeeById);
routes.delete('/:id', deleteEmployeeById)
routes.put('/:id', createEmployeeValidation, updateEmployeeById)
routes.post('/employees', createEmployeeValidation, createEmployee);

module.exports = routes;