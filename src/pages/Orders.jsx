import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import Sidebar from "../components/Sidebar";

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="flex m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Sidebar />
      <div className="w-5/6">
        <Header category="Page" title="Orders" />
        <GridComponent
        id='gridComp'
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
        </GridComponent>
      </div>
    </div>
  );
};

export default Orders;
