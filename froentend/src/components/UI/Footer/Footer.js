import { DetailsRow, mergeStyleSets } from '@fluentui/react';
import React from 'react'


const classNames = mergeStyleSets({
    header: {
      margin: 0,
    },
    row: {
      flex: '0 0 auto',
    },
  });

  const columns = Array.from({ length: 6 }).map((item, index) => ({
    key: 'column' + (index + 1),
    name: 'Test ' + (index + 1),
    fieldName: 'test' + (index + 1),
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  }));


  const footerItem={
    key: 'footer',
    test1: 'Footer 1',
    test2: 'Footer 2',
    test3: 'Footer 3',
    test4: 'Footer 4',
    test5: 'Footer 5',
    test6: 'Footer 6',
  };
  



const Footer = () => {
    
      return (
        <div className={classNames.row}>
          <DetailsRow
            columns={columns}
            item={footerItem}
            itemIndex={-1}
          />
        </div>
      );
}

export default Footer


