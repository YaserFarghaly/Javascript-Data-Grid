 ### What is it?
 
  A JavaScript data grid designed specifically for data manipulation in database applications such as master details forms.

----
### Dependency

None

----
### Compatibility
I did not test it on MS Internet explorer or Edge as I’m not a fan of Microsoft products. You can test it and it will be easy to amend if there is any issue

----

### Events
Events provide high level of flexibility for example you can allow conditional deleting,inserting or editing of a single cell or running ajax requests to populate lists based on user input. Available events
 
 - Pre-events
 
  Pre-events must return boolean value return false to deny operation, you can conditionally deny editing,inserting or deleting data row, returning true allows the user to  complete current operation.
 
 - Post-events
 
  Post-events can be used to calculate computed columns or look up data, for example we can look up product name from the database using product code from dataRow object and display it.
 
```javascript
 
     /**
      * @Override
      **/
       myGrid.callBack['post-insert'] = (dataRow) => {
       
          // Your code, ex. computed columns
          dataRow.total = dataRow.price * dataRow.quantity;
            
        };
 ```
----
### CSS
You can amend styles or if you are using Bootstrap you can pass classlist to the grid to apply Bootstrap styles.

----

### &#x1F534; WARNING: Javascript Math
Be carfull as javascript has some serious issues, so I recomend using library such as decimal.js for proper calculation of computed columns

------

### Contribution
Just contact me to improve or refactoring the grid and documentation.

----

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/wiki/other/demo-1.png "DataGrid attached to document body")


## 

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/wiki/other/design.png "DataGrid design")

## Custom viewer example
The purpose of column viewers is to provide full flexibility of how grid values are displayed it can be represented as a simple text, image or complex HTML code. The default viewers display values as plain text with formatting options defined in column metadata. The following example gives an idea of how easy to write a column viewer without learning any code just extend BaseColumnViewer class and override display() method, reference the container which is a div element and append whatever you want to represent values of columns or individual cell.

Ex. Simple example to display negative values in red color

```javascript
        class myViewer extends selim.base.BaseColumnViewer {
            constructor(column) {
                super(column); 
                
                /** 
                * @override 
                */
                this.display = () => {
                    let result = selim.validators.ValidateNumber(this.value,column);
                    // depending on column metadata a null value can be valid value if the column is not required
                    if (result.valid === true && this.value !== null) {
                       
                         this.container.style.color = this.value < 0 ? 'red':'inherit';
                         this.container.innerText = Intl.NumberFormat(this.locale, this.options).format(this.value);
                        
                    } else {
                        // invalid values will be displayed and highlighted
                        this.container.innerText = this.value;
                    }
                };
            }
        }
        
        // To override default viewer, define custome viewer in column metadata
        columns = [{
        name:'column-name',
        type:'number',
        viewer: myViewer,
        ...
        ...
        }];
```


-  [DataGrid Documentation](https://github.com/YaserFarghaly/Javascript-Data-Grid/wiki "Documentation link")


