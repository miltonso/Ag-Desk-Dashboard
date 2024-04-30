const API_BASE_URL = 'http://127.0.0.1:8000/';

export const fetchInventoryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}inventory/`);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw error;
  }
};

export const createInventoryItem = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}inventory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create inventory item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error;
  }
};

export const updateInventoryItem = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}inventory/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update inventory item.');
  }
  return await response.json();
};

export const deleteInventoryItem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}inventory/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete inventory item.');
    return {}; // Typically no content returned, but we resolve to an empty object
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
};
