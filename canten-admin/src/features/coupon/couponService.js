import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { toast } from 'react-toastify';
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);

  return response.data;
};

const createCoupons = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);

  return response.data;
};
const updateCoupon = async (coupon) => {
  try {
    const response = await axios.put(
      `${base_url}coupon/${coupon.id}`,
      {
        name: coupon.couponData.name,
        expiry: coupon.couponData.expiry,
        discount: coupon.couponData.discount,
      },
      config
    );
    
    toast.success('Coupon updated successfully!');
    return response.data;
  } catch (error) {
    // Handle error scenarios if needed
    console.error('Error updating coupon:', error);
    throw error; // Optionally re-throw the error for higher level handling
  }
};

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);

  return response.data;
};
const couponService = {
  getCoupons,
  createCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;
