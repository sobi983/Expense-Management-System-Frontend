import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { getExpense, getAllExpenses, createExpense, deleteExpense, editExpense } from '../../services/expenseService';
import useUserStore from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
    date: Yup.date().required('Date is required'),
    category: Yup.string().required('Category is required'),
});

const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [role, setRole] = useState('');
    const { userData } = useUserStore();
    const navigate = useNavigate();

    // Predefined categories
    const categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Others'];

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));  // mui responsiveness
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Async function to check the role of the user and calling it accordingly, I am using useCallback hook for the memorisation of the function. Optimisation! 
    const fetchExpenses = useCallback(async () => {
        try {
            const fetchFunction = role === 'user' ? getExpense : getAllExpenses;
            const response = await fetchFunction();
            if (response?.status) {
                setExpenses(response.message);
            } else {
                console.error('Error while fetching data:', response);
            }
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    }, [role]);

    // Verifying the session token 
    useEffect(() => {
        const sessionStatus = localStorage.getItem('jwtToken');
        if (sessionStatus) {
            setRole(userData?.role);
        } else {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (role) {
            fetchExpenses();
        }
    }, [role, fetchExpenses]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditingId(null);
    };

    // This method is reposible for creating and updating the expenses
    const handleSave = async (values, { setSubmitting }) => {
        try {
            const expenseData = {
                description: values.description,
                amount: values.amount,
                expense_date: values.date,
                category: values.category,
            };

            if (isEditing) {
                // When editing, pass the `editingId` and updated data to the `editExpense` API
                const response = await editExpense(editingId, expenseData); // Pass the editingId here

                if (response?.status) {
                    // Update the local state to reflect the changes
                    setExpenses(expenses.map((expense) =>
                        expense.id === editingId ? { ...expense, ...expenseData } : expense
                    ));
                    console.log('Expense updated successfully');
                } else {
                    console.error('Failed to update expense:', response?.message || 'Unknown error');
                }
            } else {
                // When adding a new expense, call `createExpense`
                const response = await createExpense(expenseData);
                if (response?.status) {
                    // Add the new expense to the state
                    setExpenses([...expenses, response.data]);
                } else {
                    console.error('Failed to create expense:', response?.message || 'Unknown error');
                }
            }
        } catch (error) {
            console.error('Error occurred while saving expense:', error);
        } finally {
            setSubmitting(false);
            handleClose();
        }
    };

    // This will open the modal for the editing
    const handleEdit = (expense) => {
        setIsEditing(true);
        setEditingId(expense.id);
        handleOpen();
    };

    const handleDelete = (id) => {
        // Make the API call to delete the expense
        deleteExpense(id)  // Assuming deleteExpense takes the ID as an argument
            .then((response) => {
                if (response?.status) {
                    // If the deletion is successful, update the state to remove the deleted expense
                    setExpenses(expenses.filter((expense) => expense.id !== id));
                } else {
                    console.error('Failed to delete expense:', response?.message || 'Unknown error');
                }
            })
            .catch((err) => {
                console.error('Error occurred while deleting expense:', err);
            });
    };


    const columns = [
        { field: 'category', headerName: 'Category', flex: 0.5, minWidth: 100 },
        { field: 'description', headerName: 'Description', flex: 1, minWidth: 150 },
        { field: 'amount', headerName: 'Amount (SAR)', flex: 0.5, minWidth: 100 },
        { field: 'expense_date', headerName: 'Date', flex: 0.5, minWidth: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <div className="flex items-center justify-center gap-2 h-full">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        //Added framer mothion for the animation
        <motion.div
            className="p-4 sm:p-6 bg-gray-100 min-h-screen flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Expense Tracker</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{ marginBottom: '1rem', width: '10rem' }}

            >
                Add Expense
            </Button>

            <div className="table-container">
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                />
            </div>

            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
                <Formik
                    initialValues={{
                        description: isEditing ? expenses.find((e) => e.id === editingId).description : '',
                        amount: isEditing ? expenses.find((e) => e.id === editingId).amount : '',
                        date: isEditing ? expenses.find((e) => e.id === editingId).expense_date : '',
                        category: isEditing ? expenses.find((e) => e.id === editingId).category : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="dialog-content">
                            <DialogContent>
                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    margin="dense"
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                                <Field
                                    as={TextField}
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    error={touched.amount && Boolean(errors.amount)}
                                    helperText={touched.amount && errors.amount}
                                />
                                <Field
                                    as={TextField}
                                    name="date"
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.date && Boolean(errors.date)}
                                    helperText={touched.date && errors.date}
                                />
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="category-label"
                                        name="category"
                                        label="Category"
                                        error={touched.category && Boolean(errors.category)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </motion.div>

    );
};

export default ExpensePage;
