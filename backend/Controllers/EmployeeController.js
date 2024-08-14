const { json } = require("body-parser");
const EmployeeModel = require("../Models/Employee");

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        console.log("Employe data = " + body);
        const emp = new EmployeeModel(body);
        await emp.save();
        res.status(201)
            .json({
                message: "Employee created",
                success: true,
            })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {

        // Pagination and Seach
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const skip = (page - 1) * limit;
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i'
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

        const emps = await EmployeeModel.find(searchCriteria).skip(skip).limit(limit).sort({ createdDate: -1 });

        const totalPages = Math.ceil(totalEmployees / limit); 
        res.status(200)
            .json({
                message: "Employee list",
                success: true,
                data: {
                    employees : emps,
                    pagination : {
                        totalEmployees,
                        currentPage : page,
                        totalPages,
                        pageSize : limit
                    }
                }
            })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err
        })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Details',
                success: true,
                data: emp
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        await EmployeeModel.deleteOne({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Deleted Successfully',
                success: true
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;


        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200)
            .json({
                message: 'Employee Updated Successfully',
                success: true,
                data: updatedEmployee
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
}