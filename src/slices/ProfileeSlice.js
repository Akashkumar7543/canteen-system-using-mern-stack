import axios from 'axios';
export const fetchRecentOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/order/recent-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token if authentication is needed
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recent orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  };
  export const fetchRecentWallteOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/order/recent-user_wallte', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token if authentication is needed
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recent orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  };
  export const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/order/getallOrderUser', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token if authentication is needed
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recent orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  };
  export const fetchAllWallteOrders = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/order/getallWallteOrderUser', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token if authentication is needed
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recent orders');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  };
  export const fetchUserOrders = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/wallet/orders/66abc482da8a1ce069f0688e'); // Adjust the URL if necessary
        return response.data.orders;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching orders');
    }
};
