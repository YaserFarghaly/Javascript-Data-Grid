 ### What is it?
 
  A JavaScript data grid designed specifically for data manipulation in database applications such as master details forms.

----
### Dependency
#### No dependencies

***

## Installation

```html

    <link rel="stylesheet" href="dist/css/selim.data-grid-1.0.0.css">
    <script src="dist/js/selim.data-grid-1.0.0.js"></script>

```

## Quick start

1- Define metadata and grid options

```javascript
        let columns = [{
                name: 'product_id',     
                label: 'Product Code',  
                type: 'number',  // Data type is required int float integer all are type number
                width: '9em',
                background: '#d3d3d345'
            }, {
                name: 'product_name',
                label: 'Product Name',
                type: 'text',
                single_line: true,
                width: '20em'
            }, {
                name: 'price',
                label: 'Unit Price',
                type: 'number',
                width: '7em',
                step: 0.10

            }, {
                name: 'quantity',
                label: 'Quantity',
                type: 'number',
                width: '7em'

            }, {
                label: 'Total',
                name: 'total',
                type: 'number',
                computed: true,
                width: '7em'
            }
        ];


let data = [];
```


Create dataGrid instance

```javascript
        let myGrid = new selim.DataGrid(columns, data);
        myGrid.mount(document.body);
```
Click on the grid to activate it.

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/blob/main/other/grid-1.png "DataGrid attached to document body")

Now press shift key + i to insert new record.

![alt text](https://github.com/YaserFarghaly/Javascript-Data-Grid/blob/main/other/grid-2.png "Logo Title Text 1")

*dbleclick to edit or hit enter on activated cell*

Create call back to calculate Total

```javascript
      /**
      * @Override
      **/
       myGrid.callBack['post-edit'] = (value, column, dataRow) => {
       
            dataRow.total = dataRow.price * dataRow.quantity;
            
        };
        
```
Let's pass a row to the grid constructor

```javascript

 let data = [
 [1002, 'My favourite black tea', 23, 45.5]
 ];
 
 ```
 
 *Note that we did not provide value for total column because we defined it as a computed column*
 
 
 
 
![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/blob/main/other/grid-3.png "DataGrid attached to document body")

Now if we change the price or quantity total will be calculated according to the post-edit event.

But the total was not calculated when we populated the grid? we can add post-insert callback to have it done

```javascript
      /**
      * @Override
      **/
       myGrid.callBack['post-insert'] = (dataRow) => {
       
            dataRow.total = dataRow.price * dataRow.quantity;
            
        };
        
```


How about formating data? just define locale and locale options!       [for more details on Intl Object ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl "Intl Object")


```javascript

             {
                name: 'price',
                label: 'Unit Price',
                type: 'number',
                width: '7em',
                step: 0.10,
                locale: 'en-GB',
                options: { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }
            }

```

To remove grouping product code, just add  locale options

     

```javascript
          {
                name: 'product_id',     
                label: 'Product Code',  
                type: 'number',
                width: '9em',
                background: '#d3d3d345',
                options: { useGrouping: false }
            }

```

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/blob/main/other/grid-4.png "DataGrid attached to document body")

