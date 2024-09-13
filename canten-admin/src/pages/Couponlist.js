import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteACoupon, getAllCoupon } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = couponState.map((coupon, index) => ({
    key: index + 1,
    name: coupon.name,
    discount: coupon.discount,
    expiry: new Date(coupon.expiry).toLocaleString(),
    action: (
      <>
        <Link to={`/admin/coupon/${coupon._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(coupon._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCoupon = async (id) => {
    try {
      await dispatch(deleteACoupon(id)).unwrap();
      toast.success("Coupon deleted successfully!");
      setOpen(false);
      dispatch(getAllCoupon());
    } catch (error) {
      toast.error("Failed to delete coupon!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCoupon(couponId)}
        title="Are you sure you want to delete this Coupon?"
      />
      <ToastContainer />
    </div>
  );
};

export default Couponlist;
