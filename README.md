 ### What is it?
 
  A JavaScript data grid designed specifically for data manipulation in database applications such as master details forms.

----
### Dependency
#### No dependencies
------

## Installation

```html

    <link rel="stylesheet" href="dist/css/selim.data-grid-1.0.0.css">
    <script src="dist/js/selim.data-grid-1.0.0.js"></script>

```

## Usage

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
```
