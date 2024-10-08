import React from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import Sidebar from '../components/Sidebar';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  
  return  (
    <div className="flex m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Sidebar />
    <div className="w-5/6">
      <Header category="Page" title="Customers" />
      <GridComponent 
        dataSource={customersData} 
        enableHover={false}
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  </div>
  )
};

export default Customers;
