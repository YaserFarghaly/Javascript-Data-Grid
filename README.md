 ### What is it?
 
  A JavaScript data grid designed specifically for data manipulation in database applications such as master details forms.

----
### Dependency
#### No dependencies

***

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/wiki/other/demo-1.png "DataGrid attached to document body")


## 

![Grid](https://github.com/YaserFarghaly/Javascript-Data-Grid/wiki/other/design.png "DataGrid design")

## Custom viewer example
The purpose of column viewers is to provide full flexibility of how grid values will be displayed it can be simple text, image or complex HTML code. The default viewers display values as plain text with formatting options defined in column metadata. The following example gives an idea of how easy to write a column viewer without learning the grid code.

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


