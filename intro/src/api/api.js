// Use this to catch all api endpoints from the backend flask app
// running on 127.0.0.1:5000
const BASE_URL = 'http://127.0.0.1:5000'
// const BASE_URL = 'http://172.22.109.155:5000'

const fetch_home_page = async () => {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    return data;
}

const fetch_username = async () => {
    const response = await fetch(`${BASE_URL}/user`)
    const data = await response.json()
    return data
}

const fetch_server_details = async () => {
    const response = await fetch(`${BASE_URL}/info`);
    const data = await response.json();
    return data;
}

const fetch_system_info = async () => {
    const response = await fetch(`${BASE_URL}/system`);
    const data = await response.json();
    return data;
}

const fetch_customers = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const data = await response.json();
    return data;
}

// Handle data submission
const submit_form_data = async (formData) => {
    const response = await fetch(`${BASE_URL}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    return result;
};

const fetch_submissions = async () => {
    const response = await fetch(`${BASE_URL}/submissions`);
    const data = await response.json();
    return data;
};



// Database related fetch functions
const fetch_customers_data = async () => {
    const response = await fetch(`${BASE_URL}/data/customers`);
    const data = await response.json();
    return data;
};

// CRUD operations for customers can be added here
// e.g., createCustomer, updateCustomer, deleteCustomer

const createCustomer = async (customerData) => {
    const response = await fetch(`${BASE_URL}/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    });
    const data = await response.json();
    return data;
};

const updateCustomer = async (customerId, customerData) => {
    const response = await fetch(`${BASE_URL}/customer/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    });
    const data = await response.json();
    return data;
};

const deleteCustomer = async (customerId) => {
    const response = await fetch(`${BASE_URL}/customer/${customerId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
};

export {
    fetch_home_page,
    fetch_server_details,
    fetch_customers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    fetch_system_info,
    fetch_username,
    submit_form_data,
    fetch_submissions,
    fetch_customers_data
};