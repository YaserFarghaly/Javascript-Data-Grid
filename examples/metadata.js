let columns = [{
    name: 'product_id',
    label: 'Product Code',
    type: 'text',
    single_line: true,
    width: '9em',
    background: '#d3d3d345',
    required: true
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
    width: '7em',
    required: true

}, {
    label: 'Total',
    name: 'total',
    type: 'number',
    computed: true,
    width: '7em',
    read_only: true
}];