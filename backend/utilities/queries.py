from storage.db import create_connection

def fetch_data_from_table(table_name, criteria=None):
    connection = create_connection()
    if connection is None:
        return None
    cursor = connection.cursor(dictionary=True)
    query = f"SELECT * FROM {table_name} ORDER BY {criteria} ASC" if criteria else f"SELECT * FROM {table_name}"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return results

# CRUD Operations for 'customers' table

def get_customer_by_id(customer_id):
    return fetch_data_from_table('customers', criteria=f"id = {customer_id}")

def create_customer(customer_data):
    try:
        connection = create_connection()
        if connection is None:
            return None

        cursor = connection.cursor()
        query = """
            INSERT INTO customers 
            (`first_name`, `last_name`, `email`, `phone`, `address`, `city`, `country`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            customer_data.get("first_name"),
            customer_data.get("last_name"),
            customer_data.get("email"),
            customer_data.get("phone"),
            customer_data.get("address"),
            customer_data.get("city"),
            customer_data.get("country")
        ))
        connection.commit()
        new_id = cursor.lastrowid
        cursor.close()
        connection.close()

        return {"id": new_id, **customer_data}

    except Exception as e:
        print(f"Error inserting customer: {e}")
        return None



def update_customer(customer_id, customer_data):
    connection = create_connection()
    if connection is None:
        return None
    cursor = connection.cursor()
    query = "UPDATE customers SET first_name = %s, last_name = %s, email = %s, phone = %s, address = %s, city = %s, country = %s WHERE customer_id = %s"
    cursor.execute(query, (customer_data['first_name'], customer_data['last_name'], customer_data['email'], customer_data['phone'], customer_data['address'], customer_data['city'], customer_data['country'], customer_id))
    connection.commit()
    cursor.close()
    connection.close()
    return {"id": customer_id, **customer_data}

def delete_customer(customer_id):
    connection = create_connection()
    if connection is None:
        return None
    cursor = connection.cursor()
    query = "DELETE FROM customers WHERE customer_id = %s"
    cursor.execute(query, (customer_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return {"id": customer_id}