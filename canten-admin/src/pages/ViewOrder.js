import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orders);
  console.log('orderState:', orderState); // Log orderState to check its structure

  const columns = [
    { title: "SNo", dataIndex: "key" },
    { title: "Product Name", dataIndex: "namee" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Count", dataIndex: "count" },
    { title: "Color", dataIndex: "color" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    },
  ];

  const data1 = orderState.map((order, index) => ({
    key: index + 1,
    namee: order.products[0].product.title, // Adjust as per your data structure
    brand: order.products[0].product.brand, // Adjust as per your data structure
    count: order.products.reduce((acc, product) => acc + product.count, 0), // Sum counts of all products
    color: order.products[0].product.color, // Adjust as per your data structure
    amount: order.paymentIntent.amount,
    date: order.createdAt,
  }));

  console.log('data1:', data1); // Log data1 to check if it's correctly populated

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
