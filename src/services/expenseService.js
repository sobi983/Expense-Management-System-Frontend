import axios from 'axios';

// Axios instance to configure base URL and common settings
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/v1',  // Set the base URL for all API calls
    headers: {
        'Content-Type': 'application/json',
    },
});

// Login User
export function loginUser(creds) {
    return apiClient.post('/signin', creds)
        .then(response => {
            return response.data; // Return response data, typically user info or token
        })
        .catch(error => {
            handleApiError(error);
        });
}

// Create Expense
export function createExpense(expenseData) {
    const token = localStorage.getItem('jwtToken');
    return apiClient.post('/createExpense', expenseData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return created expense data
        })
        .catch(error => {
            handleApiError(error);
        });
}

// Edit Expense
export function editExpense(expenseId, expenseData) {
    const token = localStorage.getItem('jwtToken');
    return apiClient.put(`/editExpense?id=${expenseId}`, expenseData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return updated expense data
        })
        .catch(error => {
            handleApiError(error);
        });
}

// Delete Expense
export function deleteExpense(expenseId) {
    const token = localStorage.getItem('jwtToken');
    return apiClient.delete(`/deleteExpense?id=${expenseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return confirmation of deleted expense
        })
        .catch(error => {
            handleApiError(error);
        });
}

// Get Single Expense
export function getExpense(expenseId) {
    const token = localStorage.getItem('jwtToken');

    return apiClient.get('/getExpense', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return the requested expense data
        })
        .catch(error => {
            // Handle the error and return an error object
            return handleApiError(error);
        });
}

// Get All Expenses
export function getAllExpenses() {
    const token = localStorage.getItem('jwtToken');

    return apiClient.get('/getAllExpenses', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return all expenses data
        })
        .catch(error => {
            handleApiError(error);
        });
}

export function validateJWT() {
    const token = localStorage.getItem('jwtToken');
    return apiClient.get('/validate', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response.data; // Return all expenses data
        })
        .catch(error => {
            handleApiError(error);
        });
}

// Generic function to handle API errors
function handleApiError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        return {
            status: error.response.status,
            message: error.response.data.message || 'Unknown error',
        };
    } else if (error.request) {
        // The request was made but no response was received
        return {
            status: null,
            message: 'No response received from the server',
        };
    } else {
        // Something happened in setting up the request that triggered an error
        return {
            status: null,
            message: `Request setup error: ${error.message}`,
        };
    }
}

