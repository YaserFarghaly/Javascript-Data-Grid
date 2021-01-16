const selim = {};
Object.defineProperty(selim, "base", {
    value: {},
    writable: false
});

Object.defineProperty(selim, "const", {
    value: {},
    writable: false
});

Object.defineProperty(selim, "utils", {
    value: {},
    writable: false
});

Object.defineProperty(selim, "callBack", {
    value: {},
    writable: false
});

Object.defineProperty(selim, "viewers", {
    value: {},
    writable: false
});

Object.defineProperty(selim, 'validators', {
    value: {},
    writable: false
});

Object.defineProperty(selim, "editors", {
    value: {},
    writable: false
});

Object.defineProperty(selim, "$c", {
    value: function(tag) {
        return document.createElement(tag);
    },
    writable: false
});

Object.defineProperty(selim, "$g", {
    value: function(id) {
        return document.getElementById(id);
    },
    writable: false
});

Object.defineProperty(selim, "data", {
    value: {},
    writable: true
});


selim.data.optionsList = [
    { text: 'Product 2', value: 'Product2' },
    { text: 'Product 3', value: 'Product3' },
    { text: 'Product 4', value: 'Product4' }
]; selim.utils.getClass = (cname, context) => {
     let namespaces = cname.split(".");
     let name = namespaces.pop();
     namespaces.forEach(element => {
         context = context[element];
     });

     if ((!context || !context[name])) {
         return undefined;
     };

     return context[name];

 };

 selim.utils.execute = (function_name, context, ...args) => {

     let namespaces = function_name.split(".");
     let name = namespaces.pop();
     namespaces.forEach(element => {
         context = context[element];

     });

     if ((!context || !context[name])) {
         return undefined;
     };
     return context[name].apply(context, args);
 };

 selim.utils.isNumber = (value) => {

     if (typeof value === 'string') {
         return false;
     }
     if (value === '' || value === null || value === true || value === false || isNaN(value)) {
         return false;
     }
     if (value.constructor && value.constructor.name === 'Date') {
         return false;
     }

     return true;
 };

 selim.utils.removeChilds = (ele) => {

     while (ele.childNodes.length > 0) {
         ele.removeChild(ele.childNodes[0]);
     }

 };

 selim.utils.isDate = (value) => {

     if (value instanceof Date) {
         return true;
     }
     return false;

 };


 Object.defineProperty(selim.utils, 'MONTHS', {
     value: {
         JAN: 1,
         FEB: 2,
         MAR: 3,
         APR: 4,
         MAY: 5,
         JUN: 6,
         JUL: 7,
         AUG: 8,
         SEP: 9,
         OCT: 10,
         NOV: 11,
         DEC: 12
     },
     writable: false
 });

 selim.utils.MonthToNumber = (name) => {
     if (name) {
         name = name.trim().substr(0, 3).toUpperCase();
         return MONTHS[name] ? MONTHS[name] : null;
     }
     return null;
 };


 selim.utils.GetControlKyes = (options, event) => {

     let key = null;
     key = event.shiftKey ? 'shift+' + event.code : null;
     key = key === null && event.altKey ? 'alt+' + event.code : key;
     key = key === null && event.ctrlKey ? 'ctrl+' + event.code : key;
     key = key === null ? event.code : key;

     let found = false;
     if (options.delete_key) {
         found = options.delete_key.split('|').find(element => element === key);
         if (found) return 'delete';
     }

     if (options.insert_key) {
         found = options.insert_key.split('|').find(element => element === key);
         if (found) return 'insert';
     }

     if (options.unselect_key) {
         found = options.unselect_key.split('|').find(element => element === key);
         if (found) return 'unselect';
     }

     return null;

 };


 selim.utils.getDateString = (date) => {

     let month = (date.getMonth() + 1);
     month = month < 9 ? ('0' + month) : (month + '');
     let day = date.getDate();
     day = day < 9 ? ('0' + day) : day;
     return date.getFullYear() + '-' + month + '-' + day;
 };

 selim.utils.formatDate = (date, locale, options) => {

     if (date === null)
         return null;

     console.log(locale + ' ' + options);

     return new Intl.DateTimeFormat(locale, options).format(date);

 };

 selim.utils.compairText = (a, b, locale, options) => {
     return Intl.Collator(locale, options).compare(a, b);
 };

 selim.utils.compairNumber = (a, b) => {

     if (a === null) return 1;
     if (b === null) return -1;
     if (a === null && b === null) return 0;
     if (a > b)
         return 1;
     if (a < b)
         return -1;

     return 0;
 };

 selim.utils.compairBoolean = (a, b) => {
     if (a > b)
         return 1;
     if (a < b)
         return -1;

     return 0;
 };

 selim.utils.ParseISO8601 = (dateString) => {

     let date = new Date(dateString);

     if (date == 'Invalid Date' || (date.constructor && date.constructor.name !== 'Date')) {
         console.error('Invalid Date string: ' + dateString);
         return null;
     }

     return date;

 };

 selim.utils.ParseUnixDate = (integer) => {

     let len = 13 - ('' + integer).length;
     integer = len > 0 ? integer * Math.pow(10, len) : integer;
     str = integer < 0 ? integer * 10 : integer;
     let date = new Date(str);
     if (date == 'Invalid Date' || (date.constructor && date.constructor.name !== 'Date')) {
         console.error('Invalid Date string: ' + integer);
         return null;
     }
     return date;
 };


 selim.utils.getKeyCode = (event) => {

     let key = event.code || event.key;
     if (key.length === 1) {
         return 'Key' + key.toUpperCase();
     }

     return key;
 };
 /**
  * 
  * @param {String} dateString  default format YYYY-MM-DD
  */
 selim.utils.ParseDate = (dateString, separator, format) => {
     dateString = separator === ' ' ? dateString.replace(/\s\s+/g, ' ') : dateString;
     if (!format)
         format = "YYYY-MM-DD";
     if (!separator)
         separator = '-';
     let parts = dateString.split(separator);
     let identifiers = format.split('-');
     let day = parts[identifiers.indexOf('DD')];
     let month = parts[identifiers.indexOf('MM')];
     let year = parts[identifiers.indexOf('YYYY')];
     let date = null;
     month = (isNaN(month)) ? MonthToNumber(month) : month;
     date = new Date(year, month - 1, day);
     if (date == 'Invalid Date') {
         console.error('Invalid date string ' + dateString);
         return null;
     }

     return date;

 };   Object.defineProperty(selim.base, 'BaseEditor', {

       value: class BaseEditor {
           /**
            *  This is the base class for column editors classes
            *  DON'T WRITE CODE HERE
            *  Create your own column editor by extending this class,
            *  You must override init(cell, dataRow, callBack) method and call callBack() method
            *  when users finish editing
            */
           constructor(column) {

               this.dismissed = false;

               Object.defineProperty(this, 'container', {
                   value: selim.$c('div'),
                   writable: false

               });

               this.container.className = "editor";

               this.classList = this.container.classList;

               if (column.v_align) {
                   this.container.style.alignItems = column.v_align === 'center' ? column.v_align : 'flex-' + column.v_align;
               }

               if (column.h_align) {
                   this.container.style.justifyContent = column.h_align === 'center' ? column.h_align : 'flex-' + column.h_align;
               }


               let handelKeyDown = (event) => {
                   if (event.code === 'Escape') {
                       this.escaped();

                   }
               };

               let handleClick = (event) => {
                   event.stopPropagation();

               };

               Object.defineProperty(this, 'dismiss', {
                   value: (callBack) => {
                       if (this.dismissed === true) return;
                       this.dismissed = true;
                       this.container.removeEventListener('keydown', handelKeyDown);
                       this.container.removeEventListener('click', handleClick);
                       callBack(this);
                   },
                   writable: false
               });


               this.container.addEventListener('keydown', handelKeyDown);


               /**
                * 
                * @param {selim.DataRow} dataRow 
                * @param {function} callBack 
                */
               this.init = (dataRow, callBack) => {

               };

           }
       },
       writable: false
   });


   Object.defineProperty(selim.base, 'BaseColumnViewer', {

       value: class BaseColumnViewer {

           /**
            *  This class is the base class of any ColumnViewer class
            *  DON'T CHANGE CODE HERE, BUT YOU CAN EXTEND & OVERRIDE
            *  
            */
           constructor(column) {

               let _container = selim.$c('div');
               let _value = null;
               let _display = _container.style.display;
               this.classList = _container.classList;
               this.locale = column.locale ? column.locale : navigator.language;
               this.options = column.options ? column.options : {};
               _container.className = 'viewer flex-fill';
               _container.style.width = 'initial';
               _container.style.wordBreak = 'break-all';
               if (column.nowrap === true) {
                   _container.style.whiteSpace = 'nowrap'
                   _container.style.width = 'inherit';
                   _container.style.height = 'inherit';
                   _container.style.overflow = 'hidden';

               }




               Object.defineProperty(this, 'container', {
                   get() {
                       return _container
                   },
               });

               Object.defineProperty(this, 'classList', {
                   get() {
                       return _container.classList;
                   },
               });

               Object.defineProperty(this, 'style', {
                   get() {
                       return _container.style;
                   },
               });


               Object.defineProperty(this, 'value', {
                   get() {
                       return _value;
                   },
                   set(value) {
                       _value = value;
                       this.display();
                   }
               });


               this.display = () => {
                   _container.innerText = _value;

               };

               /**
                * 
                * @param {boolean} value 
                */
               this.hide = value => {
                   if (value === true) {
                       _display = _container.style.display;
                       _container.style.display = 'none';
                   } else {
                       _container.style.display = _display;

                   }

               };

               /**
                * 
                * @param {HTMLElement} ele 
                */
               this.mount = ele => {
                   ele.appendChild(this.container);
               }

           }

       },
       writable: false
   });

   Object.defineProperty(selim.base, 'BaseDataTable', {

       /**
        *  this class is the base class of selim.DataGrid class
        *  DON'T WRITE CODE HERE 
        *  instead override its methods as shown below
        */

       value: class BaseDataTable {
           constructor() {

               let self = this;

               Object.defineProperty(this, 'callBack', {
                   value: {},
                   writable: false
               });

               /**
                * @param {Object} defaultRowValues
                * @returns {boolean} false to prevent insert operation
                */
               this.callBack['pre-insert'] = defaultRowValues => {
                   /**
                    *  Don't write code here , instead overide this method.
                    *  this method will be called whenever the user attempts to insert a new row,
                    *  you can modify the default value for each column or to prevent the 
                    *  user from inserting a new row by returrning false
                    *  Ex.
                    *      var dataTable = new selim.DataTable(columns,data);
                    * 
                    *                       
                    *      override
                    *    
                    *      dataTable.callBack['pre-insert] = defaultRowValues => {
                    *           
                    *       // you code  here
                    * 
                    *       Ex.
                    *          defaultRowValues.total = defaultRowValues.quantity * defaultRowValues.price;
                    *     
                    *          PS.  When performing calculations consider numeric precision issues of Java Script
                    *          
                    *          return true;  // returning false will prevent row insertion              
                    *      }
                    * 
                    *  */

                   return true;
               };

               this.callBack['pre-edit'] = (column, dataRow) => {
                   return true;
               };

               this.callBack['post-edit'] = (value, column, dataRow) => {

               };

               this.onMethod = (src) => {};

               let postInsert = () => {};

               /**
                * @param {selim.DataRow} dataRow
                */

               Object.defineProperty(this.callBack, 'post-insert', {

                   get() { return postInsert },

                   set(clbk) {
                       postInsert = clbk;
                       self.onMethod('post-insert');

                   }

               });




               /**
                * @param {selim.DataRow} dataRow
                * @returns {boolean} false to prevent delete operation
                */
               this.callBack['pre-delete'] = dataRow => {
                   /**
                    * Don't write code here
                    * */

                   return true;
               };

           }

       },
       writable: false
   });


   selim.EventRegister = class {

       constructor() {
           let subs = [];
           let types = [];

           let dispatch = function(event) {
               subs.forEach(sub => {
                   if (Object.is(event.target, sub.target) && event.type === sub.type)
                       sub.execute(event);
               });
           };


           let createListener = (type) => {
               if (types.find(event_type => event_type === type) !== undefined) {
                   return;
               }
               document.addEventListener(type, dispatch);
               types.push(type);
           };

           this.add = (target, event_type, fun) => {
               createListener(event_type);
               subs.push({
                   target: target,
                   type: event_type,
                   execute: fun
               });
           };

       }
   }; selim.validators.validate = (value, column) => {


     if ((column.required === true) && (value === null)) {

         return { valid: false, msg: 'Value required' };
     }

     switch (column.type) {
         case 'text':
             return selim.validators.validateText(value, column);

         case 'number':
             return selim.validators.ValidateNumber(value, column);
         case 'date':
             return selim.validators.ValidateDate(value, column);

         case 'selector':
             return selim.validators.validateBoolean(value, column);

         case 'boolean':
             return selim.validators.validateBoolean(value, column);
         default:
             return { valid: true, msg: '' };
     }
 };

 selim.validators.IsValidDataType = (value, column) => {

     if ((value === null) && (column.required !== true)) {
         return true;
     }

     switch (column.type) {

         case 'selector':
             return value === true || value === false;
         case 'number':
             return selim.utils.isNumber(value);
         case 'text':
             return typeof value === 'string';
         case 'date':
             return value.constructor && value.constructor.name === 'Date';
         case 'boolean':
             return value === true || value === false;

     }
     return false;
 };


 selim.validators.validateText = (value, column) => {

     let result = { valid: false, msg: '' };


     if ((typeof value !== 'string') && (value !== null)) {
         result.msg = 'Value is not string';
         return result;
     }
     if ((column.max !== undefined) && (value.length > column.max)) {
         result.msg = 'Maximum length is ' + column.max;
         return result;
     }

     if ((column.min !== undefined) && (value.length < column.min)) {
         result.msg = 'Minimum length is ' + column.min;
         return result;
     }

     if (column.in)
         if (Array.isArray(column.in)) {

             if (column.in.find(ele => ele === value) === undefined) {
                 result.msg = 'Value not in list';
                 return result;
             }
         } else {
             throw 'Valid list is not array [ column name: ' + column.name;
         }

     result.valid = true;
     return result;
 };

 selim.validators.validateBoolean = (value, column) => {
     let result = { valid: false, msg: '' };

     if ((column.required === true) && (value === null)) {
         result.msg = 'Value required';
         return result;
     }

     if ((value !== true) && (value !== false)) {
         result.msg = 'Value is not boolean';
         return result;
     }

     result.valid = true;
     return result;
 };

 selim.validators.ValidateNumber = (value, column) => {

     let result = { valid: false, msg: '' };

     if ((column.required === true) && (value === null)) {
         result.msg = 'Value required';
         return result;
     }

     if (value === null) {
         result.valid = true;
         return result;
     }


     if (selim.utils.isNumber(value) !== true) {
         result.msg = 'Value is not a number ';
         return result;
     }
     if ((column.max !== undefined) && (value !== null) && (value > column.max)) {
         result.msg = 'Maximum value is ' + column.max;
         return result;
     }
     if ((column.min !== undefined) && (value !== null) && (value < column.min)) {
         result.msg = 'Minimum value is ' + column.min;
         return result;
     }


     if (column.in)
         if (Array.isArray(column.in)) {

             if (column.in.find(ele => ele === value) === undefined) {
                 result.msg = 'Value not in list';
                 return result;
             }
         } else {
             throw 'Valid list is not array [ column name: ' + column.name;
         }

     result.valid = true;
     return result;

 };


 selim.validators.ValidateDate = (value, column) => {

     let result = { valid: false, msg: '' };

     if ((column.required === true) && (value === null)) {
         result.msg = 'Value required';

         return result;
     }
     if (value === null) {
         result.valid = true;
         return result;
     }

     if (!selim.utils.isDate(value)) {
         result.msg = ' Invalid date ';
         return result;
     }

     if (column.max) {
         let max = column.max instanceof Date ? column.max : selim.utils.ParseDate(column.max);
         if (!max instanceof Date) {
             throw 'Invalid date value';
             return;
         }

         if (value.getTime() > max.getTime()) {
             result.msg = ' Value is greater than maximum value ';
             return result;
         }
     }

     if (column.min) {
         let min = column.max instanceof Date ? column.min : selim.utils.ParseDate(column.min);
         if (!min instanceof Date) {
             throw 'Invalid date value';
             return;
         }

         if (value.getTime() < min.getTime()) {
             result.msg = ' Value is less than minimum value ';
             return result;
         }
     }
     if (column.in)
         if (Array.isArray(column.in)) {

             if (column.in.find(ele => {
                     if (ele.getTime() !== value.getTime())
                         return undefined;
                     else return value;
                 }) === undefined) {
                 result.msg = 'Value not in list';
                 return result;
             }
         } else {
             throw 'Valid list is not array [ column name: ' + column.name;
         }
     result.valid = true;
     return result;


 };


 selim.validators.ValidateGridOptions = (options) => {

     if (options === undefined) {
         options = {};
     }



     if (options.read_only === undefined) {
         options.read_only = false;
     }

     if (!options.hasOwnProperty('locale'))
         options.locale = navigator.language;

     if (!options.hasOwnProperty('input_date_separator'))
         options.input_date_separator = '-';

     if (!options.hasOwnProperty('input_date_format'))
         options.input_date_format = 'YYYY-DD-MM';


     if (!options.hasOwnProperty('insert_key'))
         options.insert_key = 'shift+KeyI';

     if (!options.hasOwnProperty('delete_key'))
         options.delete_key = 'shift+KeyD|Delete';

     if (!options.hasOwnProperty('unselect_key'))
         options.unselect_key = 'shift+KeyU';

     options.dml_out = options.dml_out || 'min';


 };

 selim.validators.validateMetaData = (columns, options) => {

     let types = ['text', 'number', 'date', 'boolean', 'selector'];
     let cols = columns.slice();
     cols.forEach((column, index) => {
         column.name = column.name || 'column' + index;
         column.label = column.label || 'Column ' + index;


         if (column.type) {
             if (types.find(ele => ele === column.type) === undefined) {
                 let type = column.type;
                 if (selim.const.NumericDataTypes.find(ele => ele === type.trim().toUpperCase()) !== undefined) {
                     column.user_type = type;
                     column.type = 'number';

                 } else {
                     console.error('Invalid data type: ' + '  ' + column.type);
                     return false;
                 }

             } else {
                 column.type = column.type.trim().toLowerCase();
             }
         } else {
             throw 'Undefined column type, column name:' + column.name
         }

         column.locale = column.locale || options.locale;
         try {
             column.locale = Intl.getCanonicalLocales(column.locale);
         } catch (error) {
             console.warn('Invalid locale value');
             column.locale = navigator.language;
         }


         column.output_date_locale = column.output_date_locale || options.output_date_locale;

         column.output_date_options = column.output_date_options || options.output_date_options;

     });


     let selector = {
         name: 'row_selector',
         type: 'selector',
         label: options.selector_label || '',
         default: false,
         sortable: true,
         width: '40px',
         h_align: 'center',
         v_align: 'middle',
         display: false
     };

     if (options.selector === true) {
         selector.display = true;
         if (options.selector_start === true) {
             cols.unshift(selector);
         } else {
             cols.push(selector);
         }
     } else {
         cols.unshift(selector);
     }
     return cols;
 };selim.const.NumericDataTypes = ['INT', 'INTEGER', 'TINYINT', 'SMALLINT', 'MEDIUMINT', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL'];


selim.DataModel = class DataModel {

    constructor(columns, data, options) {

        let _data = [];
        let updated = [];
        let rowId = 1000;
        let offset = 2;

        for (let x = 0; x < data.length; x++) {
            let row = [rowId, 'n'];
            let cellValue = null;
            let pos = 0;

            for (let i = 0; i < columns.length; i++) {

                if (columns[i].computed !== true && columns[i].name !== 'row_selector') {
                    cellValue = Array.isArray(data[x]) ? data[x][i - pos] :
                        data[x][columns[i].name];
                    cellValue = cellValue === undefined ? null : cellValue;
                    if (columns[i].type === 'date' && cellValue !==
                        null && cellValue.constructor && cellValue.constructor.name !== 'Date') {
                        if (options.input_date_format === 'iso8601') {

                            cellValue = selim.utils.ParseISO8601(cellValue);

                        } else if (options.input_date_format === 'integer') {

                            cellValue = selim.utils.ParseUnixDate(cellValue);

                        } else
                            cellValue = selim.utils.ParseDate(cellValue, options.input_date_separator,
                                options.input_date_format);
                    }

                } else {

                    pos++;
                    cellValue = columns[i].name === 'row_selector' ? false : null;
                }
                row.push(cellValue);
            }

            _data.push(row);
            rowId++;
        }

        /**
         * 
         * @param {Obiect} _row 
         * @returns row position
         */

        this.insert = _row => {
            let row = [rowId, 'i'];
            for (let x = 0; x < columns.length; x++) {
                row.push(_row[columns[x].name]);
            }
            _data.push(row);
            rowId++;
            return _data.length - 1;
        };

        this.max = (index) => {

            index += 2;
            let max = null;
            _data.forEach(Row => {

                if (columns[index - 2].type === 'date') {
                    max = max === null || max.getTime() < Row[index].getTime() ? Row[index] : max;
                } else
                    max = max === null || max < Row[index] ? Row[index] : max;
            });
            return max;
        };

        this.min = (index) => {
            index += offset;
            let min = null;
            _data.forEach(Row => {

                if (columns[index - 2].type === 'date') {
                    min = min === null || min.getTime() < Row[index].getTime() ? Row[index] : min;
                } else
                    min = min === null || min > Row[index] ? Row[index] : min;
            });
            return min;
        };




        /**
         * @returns default row values
         */
        this.getDefaultRow = () => {
            let defaultRowValues = {};
            for (let x = 0; x < columns.length; x++) {
                defaultRowValues[columns[x].name] = columns[x].default !== undefined ?
                    columns[x].default : null;
            }
            return defaultRowValues;
        };

        /**
         * @returns{Array} data array
         */
        this.getData = () => {
            return _data;
        };



        /**
         * @returns {Array} updated rows
         */
        this.getUpdated = () => {
            return updated;
        };

        /**
         * 
         * @param {number} index  // row index
         */
        this.delete = index => {
            if (_data[index][1] == 'n')
                _data[index][1] = 'd';
            else if (_data[index][1] == 'i')
                _data[index][1] = 'x';
            else if (_data[index][1] == 'u') {
                _data[index][1] = 'd';
            }
        };

        this.commit = () => {

            for (let x = 0; x < _data.length; x++) {
                if (_data[x][1] === 'u' || _data[x][1] === 'i') _data[x][1] = 'n';
                if (_data[x][1] === 'd' || _data[x][1] === 'x') {
                    _data = _data.splice(x, 1);
                    x = x > 0 ? x - 1 : 0;
                }
                updated = [];

            }
        };

        let getRowChanges = (row, urow, all, computed) => {

            let original = updated.find(ele => ele[0] === row[0]);
            let x = offset;
            let flag = 0;
            columns.forEach(column => {
                if (column.type !== 'selector' && !(column.db === false)) {
                    let equal = column.type === 'date' ? row[x].getTime() !== original[x].getTime() : row[x] !== original[x];
                    if (equal || all === true) {
                        if (column.type === 'date' && row[x] !== null)
                            urow[column.name] = new Intl.DateTimeFormat(column.output_date_locale,
                                column.output_date_options).format(row[x]);
                        else
                            urow[column.name] = row[x];

                        flag = 1;

                    } else if (column.primary_key === true) {
                        if (column.type === 'date' && row[x] !== null)
                            urow[column.name] = new Intl.DateTimeFormat(column.output_date_locale,
                                column.output_date_options).format(row[x]);
                        else
                            urow[column.name] = row[x];
                    }
                }
                x++;
            });

            return flag;


        };

        this.getChangedRows = (operation, all, computed) => {
            let Rows = [];
            _data.forEach(row => {
                let jr = {};
                let x = offset;
                if (row[1] === 'i') {
                    jr[operation] = 'insert';
                    columns.forEach(column => {
                        if (column.type !== 'selector' && !(column.db === false)) {
                            if (column.type === 'date' && row[x] !== null) {
                                jr[column.name] = new Intl.DateTimeFormat(column.output_date_locale,
                                    column.output_date_options).format(row[x]);
                            } else {
                                jr[column.name] = row[x];
                            }
                        }
                        x++;
                    });
                    Rows.push(jr);
                } else if (row[1] === 'd') {
                    jr[operation] = 'delete';
                    columns.forEach(column => {
                        if (column.type !== 'selector' && !(column.db === false)) {
                            if (column.primary_key === true || all === true) {
                                if (column.type === 'date' && row[x] !== null)
                                    jr[column.name] = new Intl.DateTimeFormat(column.output_date_locale,
                                        column.output_date_options).format(row[x]);
                                else
                                    jr[column.name] = row[x];
                            }
                        }
                        x++;
                    });
                    Rows.push(jr);
                } else if (row[1] === 'u') {
                    jr[operation] = 'update';
                    if (getRowChanges(row, jr, all, computed) === 1)
                        Rows.push(jr);
                }

            });
            return Rows;
        };

        /**
         * 
         * @param {number} x // column indexrowId
         * @param {number} y // row index
         * @param {*} value 
         */
        this.setValue = (x, y, value, populating) => {
            if (_data[y][1] === 'n' && populating !== true && columns[x].type !== 'selector') {
                _data[y][1] = 'u';
                updated.push(_data[y].map(x => x));
            }
            _data[y][x + offset] = value;
        };

        /**
         * 
         * @param {number} y  // row index
         */
        this.getRowId = (y) => {
            return _data[y][0];
        };

        /**
         * 
         * @param {number} x  column index
         * @param {number} y  row number
         */
        this.getValue = (x, y) => {
            return _data[y][x + offset];
        };


        /**
         * 
         * @param {number} columnIndex 
         * @param {number} asc  1 asc || -1 desc
         */

        this.sort = (columnIndex, asc) => {
            let items = [columnIndex];
            let order = [];
            let result = null;
            let direction = null;
            let columnType = null;

            _data.sort((a, b) => {

                direction = (asc === true) ? 1 : -1;

                if (columns[columnIndex].hasOwnProperty('extended_sort')) {
                    for (let x = 0; x < columns[columnIndex].extended_sort.length; x++) {
                        items.push(Math.abs(columns[columnIndex].extended_sort[x]));
                        order.push(columns[columnIndex].extended_sort[x] < 0 ? -1 : 1);
                    }
                }

                for (let x = 0; x < items.length; x++) {

                    if (order.length > 0)
                        direction = (x > 0) ? order[x - 1] : direction;
                    columnType = columns[items[x]].type;

                    if (columnType === 'number') {
                        result = selim.utils.compairNumber(a[items[x] + offset], b[items[x] + offset]);

                    } else if (columnType === 'text') {
                        result = selim.utils.compairText(a[items[x] + offset], b[items[x] + offset]);

                    } else if (columnType === 'date') {
                        result = selim.utils.compairNumber(a[items[x] + offset] === null ? null : a[items[x] + offset].valueOf(), b[items[x] + offset] === null ? null : b[items[x] + offset].valueOf());

                    } else if (columnType === 'boolean' || columnType === 'selector') {
                        result = selim.utils.compairBoolean(a[items[x] + offset] === null ? null : a[items[x] + offset].valueOf(), b[items[x] + offset] === null ? null : b[items[x] + offset].valueOf());

                    } else {
                        console.error('Unknown column type!');
                        return 0;
                    }

                    if (result > 0)
                        return direction;
                    else if (result < 0)
                        return -1 * direction;
                }
                return 0;
            });

        };
    }

    get data() {
        return this.getData();
    };

}; selim.viewers.NumberViewer = class extends selim.base.BaseColumnViewer {

     constructor(column) {

         super(column);

         /**
          * @override
          */
         this.display = () => {

             let result = selim.validators.ValidateNumber(this.value, column);
             if (result.valid === true && this.value !== null) {
                 this.container.innerText = Intl.NumberFormat(this.locale, this.options).format(this.value);
             } else {

                 this.container.innerText = this.value;

             }

         };

     }
 };


 selim.viewers.DateViewer = class extends selim.base.BaseColumnViewer {

     constructor(column) {

         super(column);

         /**
          * @override
          */
         this.display = () => {
             if (this.value != null) {
                 this.container.innerText = new Intl.DateTimeFormat(this.locale, this.options).format(this.value).toString();
             } else
                 this.container.innerText = this.value;
         };
     }
 };


 selim.viewers.DefaultViewer = class extends selim.base.BaseColumnViewer {

     constructor(column) {
         super(column);

         /**
          * @override
          */
         this.display = () => {
             this.container.innerText = this.value;
         };
     }
 };

 selim.viewers.SelectViewer = class extends selim.base.BaseColumnViewer {

     constructor(column, dataRow) {
         super(column);
         let input = selim.$c('input');
         input.type = 'checkbox';
         input.className = 'editor-control';
         this.container.classList.add('selector');
         this.container.appendChild(input);

         input.addEventListener('click', event => {
             event.stopPropagation();
             dataRow[column.name] = input.checked;
             dataRow.selected = input.checked;
         });

         /**
          * @override
          */
         this.display = () => {
             input.checked = this.value;
         };
     }
 };


 selim.viewers.BooleanViewer = class extends selim.base.BaseColumnViewer {

     constructor(column) {
         super(column);

         let box = selim.$c('div');
         this.container.appendChild(box);
         this.container.style.display = 'flex';
         this.container.style.justifyContent = 'center';

         /**
          * @override
          */
         this.display = () => {

             if (this.value === true) {
                 box.innerHTML = '✓';
                 box.style.fontWight = 'bolder';
                 box.style.color = 'green';
             } else if (this.value === false) {
                 box.innerHTML = '✗';
                 box.style.color = 'red';
             }
         };

     }
 }; selim.editors.DefaultEditor = class DefaultEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('input');
         input.type = 'text';
         input.className = 'editor-control';
         this.container.appendChild(input);

         this.init = (dataRow, callBack) => {
             input.value = dataRow[column.name];
             input.focus();

             let setValue = () => {
                 dataRow[column.name] = input.value;
                 this.dismiss(callBack);
             };

             input.addEventListener('focusout', event => {
                 if (this.dismissed) return;
                 setValue();
             });

             input.addEventListener('keydown', event => {
                 event.stopPropagation();

                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue();
                 }
             });

             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.TextEditor = class TextEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('textArea');
         this.container.appendChild(input);

         input.style.zIndex = '999999';

         this.init = (dataRow, callBack) => {
             input.value = dataRow[column.name];
             input.focus();

             let setValue = (value) => {
                 dataRow[column.name] = value === undefined ? input.value.trim() : value;
                 this.dismiss(callBack);
             };

             input.addEventListener('focusout', event => {
                 if (this.dismissed === true) return;
                 setValue();
             });

             input.addEventListener('keydown', event => {
                 event.stopPropagation();

                 if (selim.utils.getKeyCode(event) === 'Delete') {
                     setValue(null);
                 }
             });


             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.SingleLineEditor = class TextEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('input');
         input.type = 'text';
         input.className = "editor-control";

         this.container.appendChild(input);

         this.init = (dataRow, callBack) => {
             input.value = dataRow[column.name];
             input.focus();

             let setValue = (value) => {
                 dataRow[column.name] = value === undefined ? input.value.trim() : value;
                 this.dismiss(callBack);
             };

             input.addEventListener('focusout', event => {
                 if (this.dismissed === true) return;
                 setValue();
             });

             input.addEventListener('keydown', event => {
                 event.stopPropagation();

                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue();
                 }
                 if (selim.utils.getKeyCode(event) === 'Delete') {
                     setValue(null);
                 }
             });


             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.BooleanEditor = class BooleanEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('input');
         let wrapper = selim.$c('div');
         input.setAttribute('type', 'checkbox');
         wrapper.appendChild(input);
         this.container.appendChild(wrapper);
         input.style.width = '1.2em';
         input.style.height = '1.2em';
         this.init = (dataRow, callBack) => {

             input.checked = dataRow[column.name];
             input.focus();

             let setValue = () => {
                 dataRow[column.name] = input.checked;
                 this.dismiss(callBack);
             };

             input.addEventListener('focusout', event => {
                 if (this.dismissed) return;
                 setValue();
             });

             input.addEventListener('keydown', event => {
                 event.stopPropagation();

                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue();
                 }
             });

             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.OptionsEditor = class TextEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('select');
         this.container.appendChild(input);
         input.className = "editor-control";

         if (column.dataList) {
             let option = null;
             for (let x = 0; x < column.dataList.length; x++) {
                 if (Array.isArray(column.dataList[0])) {
                     option = new Option(column.dataList[x][0], column.dataList[x][1]);
                 } else {
                     option = new Option(column.dataList[x].text, column.dataList[x].value);
                 }
                 input.add(option);
             }
         }

         if (column.selectedIndex) {
             input.selectedIndex = column.selectedIndex;
         }

         this.init = (dataRow, callBack) => {
             input.value = dataRow[column.name];
             input.focus();

             let setValue = () => {
                 if (input.selectedIndex > -1) {
                     try {
                         if (column.mapping) {
                             if (column.mapping.value)
                                 dataRow[column.mapping.value] = input.value;
                             if (column.mapping.text)
                                 dataRow[column.mapping.text] = input.options[input.selectedIndex].text;
                         } else {
                             dataRow[column.name] = input.value;
                         }
                     } catch (error) { console.error('Mapping error: '); }
                 }
                 this.dismiss(callBack);
             };

             input.addEventListener('focusout', event => {
                 if (this.dismissed) return;
                 setValue();
             });

             input.addEventListener('keydown', event => {
                 event.stopPropagation();
                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue();
                 }
             });

             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.NumberEditor = class NumberEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('input');
         input.type = 'number';
         input.className = "editor-control";
         this.container.appendChild(input);

         if (column.step) {

             input.setAttribute('step', column.step);
         }
         if (column.max) {
             input.max = column.max;
         }
         if (column.min) {
             input.min = column.min;
         }

         this.init = (dataRow, callBack) => {

             input.value = dataRow[column.name];
             input.focus();

             let setValue = (value) => {
                 value = value === undefined ? input.value : value;
                 if (value === '') {
                     this.dismiss(callBack);
                     return;
                 }

                 dataRow[column.name] = value === null ? null : Number(value);
                 this.dismiss(callBack);
             };

             input.addEventListener('keydown', event => {
                 event.stopPropagation();
                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue(input.value);
                 } else if (selim.utils.getKeyCode(event) === 'Delete') {
                     input.value = null;
                     setValue(null);
                 }
             });

             input.addEventListener('focusout', event => {
                 if (this.dismissed) return;
                 setValue(input.value);

             });

             this.escaped = () => {
                 this.dismiss(callBack);
             }
         };
     }
 };

 selim.editors.DateEditor = class DateEditor extends selim.base.BaseEditor {

     constructor(column) {
         super(column);
         let input = selim.$c('input');
         input.type = 'date';
         input.className = 'editor-control';
         this.container.appendChild(input);

         if (column.max) {
             input.setAttribute('max', column.max);
         }

         if (column.min) {
             input.setAttribute('min', column.min);
         }

         this.init = (dataRow, callBack) => {

             if (dataRow[column.name] !== null && dataRow[column.name].constructor && dataRow[column.name].constructor.name === 'Date')
                 input.value = selim.utils.getDateString(dataRow[column.name]);
             input.focus();

             let setValue = (value) => {
                 let date = value === undefined ? selim.utils.ParseDate(input.value, '-', 'YYYY-MM-DD') : value;
                 dataRow[column.name] = date;
                 this.dismiss(callBack);
             };

             input.addEventListener('keydown', event => {
                 event.stopPropagation();

                 if (this.dismissed === true) return;
                 if (selim.utils.getKeyCode(event) === 'Enter') {
                     setValue();
                 }
                 if (selim.utils.getKeyCode(event) === 'Delete') {
                     setValue(null);
                 }
             });

             input.addEventListener('focusout', event => {
                 if (this.dismissed) return;
                 setValue();
             });

             this.escaped = () => {
                 this.dismiss(callBack);
             }

         };
     }
 };selim.ViewerFactory = (column, dataRow) => {

    let viewer = null;

    if (column.viewer) {
        if (typeof column.viewer === 'string') {
            console.error('Unexpected string : ' + column.viewer);
            return null;
        }

        viewer = new column.viewer(column);

        if (!(viewer instanceof selim.base.BaseColumnViewer)) {
            throw "Viewer is not instance of  BaseColumnViewer";
        }

    } else {

        switch (column.type) {
            case 'number':
                viewer = new selim.viewers.NumberViewer(column, dataRow);
                break;
            case 'date':
                viewer = new selim.viewers.DateViewer(column, dataRow);
                break;
            case 'selector':
                viewer = new selim.viewers.SelectViewer(column, dataRow);
                break;
            case 'boolean':
                viewer = new selim.viewers.BooleanViewer(column, dataRow);
                break;
            default:
                viewer = new selim.viewers.DefaultViewer(column, dataRow);
        }
    }
    return viewer;
};

selim.EditorFactory = (column) => {

    let editor = null;

    if (column.editor) {
        if (typeof column.editor === 'string') {
            throw 'Unexpected string : ' + column.editor;
        }

        editor = new column.editor(column);
        if (!(editor instanceof selim.base.BaseEditor)) {
            throw "Viewer is not instance of  BaseEditor";
        }
    } else {
        switch (column.type) {
            case 'text':
                if (column.single_line === true) {
                    editor = new selim.editors.SingleLineEditor(column);
                } else {
                    editor = new selim.editors.TextEditor(column);
                }
                break;
            case 'date':
                editor = new selim.editors.DateEditor(column);
                break;
            case 'number':
                editor = new selim.editors.NumberEditor(column);
                break;
            case 'boolean':
                editor = new selim.editors.BooleanEditor(column);
                break;
            default:
                editor = new selim.editors.DefaultEditor(column);

        }
    }
    if (editor === null)
        console.error('No editor found for ' + column.name)

    return editor;
};

selim.GridCell = class GridCell {

    constructor(column, dataColumnIndex, dataRow, register) {

        let _value = null;
        let _cell = selim.$c('td');
        let _background = column.background || _cell.style.backgroundColor;
        let _userBackground = null;
        _cell.style.position = 'relative';
        _cell.tabIndex = 0;
        _cell.style.width = column.width || 'auto';

        if (column.type === 'selector') {
            _cell.style.width = column.width || '2em';
            _cell.style.backgroundColor = 'lightgray';

        }

        Object.defineProperty(this, 'viewer', {
            value: selim.ViewerFactory(column, dataRow),
            writable: false
        });

        this.viewer.setBackground = (background) => {
            _background = background;
        }


        Object.defineProperty(this, 'columnName', {
            get() {
                return column.name;
            }
        });

        Object.defineProperty(this, 'value', {
            get() {
                return _value;
            },
            set(Value) {
                _value = Value;
                this.viewer.value = _value;
            }
        });

        this.focus = () => {
            _cell.focus();
        };

        this.appendChild = (ele) => {
            _cell.appendChild(ele);
        };

        this.removeChild = (ele) => {
            _cell.removeChild(ele);
        };

        this.getColumnIndex = () => {
            return dataColumnIndex;
        };

        this.getColumnName = () => {
            return column.name;
        };

        this.validate = () => {

            let result = null;
            let validator = column.validator || dataRow.dataGrid.options.validator;
            if (validator !== undefined) {
                if (validator.constructor.name === 'Function') {
                    result = new validator(this.value, column);
                } else throw 'Validator is not a function [column name: ' + column.name + ']';

                if (result === null) {
                    throw 'Error validation class';
                }
                if ((result.valid === true) && (selim.validators.IsValidDataType(this.value, column) !== true)) {

                    result.valid = false;
                    result.msg = 'Invalid data type expected ' + column.type;
                }

            } else {

                result = selim.validators.validate(this.value, column);

            }

            if (result.valid !== true) {
                _cell.classList.add('error-cell');
                _cell.title = result.msg;
            } else {
                _cell.classList.remove('error-cell');

                _cell.style.backgroundColor = _userBackground != null ? _userBackground : _background;
                _cell.title = '';
            }
            return result;
        };

        let callback = (editor) => {
            try {
                _cell.removeChild(editor.container);
            } catch (er) {}

            this.viewer.hide(false);
            dataRow.dataGrid.state.editing = false;
            dataRow.dataGrid.callBack['post-edit'](
                dataRow.dataGrid.getValue(this.getColumnIndex(), dataRow.dataRowIndex),
                column, dataRow);
            _cell.focus();
        };

        this.showEditor = (event) => {

            if (dataRow.dataGrid.state.editing === true || column.type === 'selector') {
                dataRow.dataGrid.state.editing = false;
                return;
            }

            if (dataRow.dataGrid.callBack['pre-edit'](column, dataRow) !== true) {
                return;
            }

            if (column.read_only === true || (column.read_only !== false &&
                    dataRow.dataGrid.options.read_only === true)) {
                return;
            }
            let editor = selim.EditorFactory(column);

            if (editor !== null) {
                dataRow.dataGrid.state.editing = true;
                this.viewer.hide(true);
                this.appendChild(editor.container);
                editor.init(dataRow, callback);
            }

        };

        let keyHandler = (event) => {
            if (event.code === 'Enter') {
                this.showEditor();

            } else if (column.type === 'selector' &&
                (event.code === 'Space' || event.code === 'Enter')) {
                this.value = !this.value;
                dataRow.selected = this.value;
            }
        }



        register.add(_cell, 'keydown', keyHandler);
        register.add(_cell, dataRow.dataGrid.options.edit_on || 'dblclick', this.showEditor);
        //register.add(this.viewer.container, dataRow.dataGrid.options.edit_on || 'dblclick', this.showEditor);

        this.mount = (ele) => {
            ele.appendChild(_cell);
        };

        if (column.v_align) {
            _cell.style.verticalAlign = column.v_align;
        }

        if (column.h_align) {
            _cell.style.textAlign = column.h_align;
        }

        this.viewer.mount(_cell);

        Object.freeze(this);
    }
};

selim.GridRow = class GridRow {

    constructor(columns, data, dataGrid, dataIndex, register, dataModel) {

        let _row = selim.$c('tr');
        let _cells = [];
        let _selected = false;

        Object.defineProperty(this, 'dataGrid', {
            get() {
                return dataGrid;
            }
        });

        Object.defineProperty(this, 'columns', {
            value: columns,
            writable: false
        });

        if (dataGrid.options.selector !== true) {
            _row.addEventListener('click', event => {

                if (dataGrid.key !== 'KeyS') {
                    dataGrid.unSelectAll();
                } else
                    event.stopPropagation();

                this.selected = (dataGrid.key === 'KeyS' && _selected === true) ? false : true;
            });
        }
        Object.defineProperty(this, 'dataRowIndex', {
            value: dataIndex,
            writable: false
        });

        Object.defineProperty(this, 'selected', {
            get() {
                return _selected;
            },
            set(value) {
                _selected = value;

                if (this.hasOwnProperty('row_selector')) {
                    this.row_selector = _selected;
                }
                dataGrid.selectRow(_row.rowIndex, value);
            }

        });

        Object.defineProperty(this, 'classList', {
            get() {
                return _row.classList;
            }
        });


        this.mount = ele => {
            ele.appendChild(_row);
        };

        this.focus = (index) => {
            _cells[index].focus();
        };

        columns.forEach((column, index) => {

            let cell = new selim.GridCell(column, index, this, register);
            _cells.push(cell);
            cell.value = data[index + 2];
            cell.validate(data[index + 2]);
            if (column.display !== false)
                cell.mount(_row);

            Object.defineProperty(this, cell.getColumnName(), {
                get() {
                    return cell.value;
                },
                set(value) {
                    cell.value = value;
                    if (cell.validate().valid === true) {
                        dataModel.setValue(cell.getColumnIndex(), dataIndex, value, dataGrid.state.populate);
                    }
                }
            });
        });

        Object.freeze(this);
    }
};

selim.DataGrid = class DataGrid extends selim.base.BaseDataTable {

    /**
     * 
     * @param {Array} columns [{},{},...]
     * @param {Array} data [[value, ... ],[value, ...],...] || [{column: value, ...},{column: value, ..},...]
     * @param {Object} options {option:value,...}
     */
    constructor(columns, data, options = {}) {

        super();
        /**
         * First validate metadata
         */
        selim.validators.ValidateGridOptions(options);
        let _columns = selim.validators.validateMetaData(columns, options);
        if (_columns === false) {
            /**
             * Critical errors in metadata .... stop here
             */
            return;
        };

        let _state = { editing: false, populate: false };
        /**
         * Create new data model for our grid
         */
        let _data_model = new selim.DataModel(_columns, data, options);
        let _table = selim.$c('table');
        let _container = selim.$c('div');

        let _gridRows = null;
        let _key = null;
        let _register = new selim.EventRegister();

        _table.createTHead();
        _table.tHead.insertRow();
        _table.createTBody();
        _container.tabIndex = -1;

        this.print_model = () => {
            console.log(_data_model.data);
        };

        this.getValue = (x, y) => {
            return _data_model.getValue(x, y);
        }

        this.getChanges = (dml, all, computed) => {
            if (dml === undefined || typeof dml !== 'string') {
                dml = 'dml';
            }
            let json = _data_model.getChangedRows(dml, all, computed);


            return json;
        }

        _container.className = 'outline gridContainer';
        _table.className = "data-grid";

        Object.defineProperty(this, 'container', {
            get() {
                return _container;
            }
        });

        Object.defineProperty(this, 'className', {
            set(value) {
                _table.className = value;;
            },
            get() {
                return _table.className;
            }
        });

        Object.defineProperty(this, 'classList', {
            get() {
                return _table.classList;
            }
        });

        Object.defineProperty(this, 'options', {
            get() { return options; }
        });

        Object.freeze(this.options);

        Object.defineProperty(this, 'columns', {
            value: _columns,
            writable: false
        });

        Object.freeze(this.columns);

        Object.defineProperty(this, 'key', {
            get() {
                return _key;
            }
        });

        Object.defineProperty(this, 'state', {
            get() {
                return _state;
            }
        });

        window.addEventListener("keydown", event => {
            if (document.activeElement.hasOwnProperty('preventScroll'))
                if (document.activeElement.preventScroll === true) {
                    event.preventDefault();
                }

        });

        _container.addEventListener("keyup", event => {
            _key = null;
        });


        this.insertRow = () => {
            let defaultValues = _data_model.getDefaultRow();
            if (this.callBack['pre-insert'](defaultValues) === true) {
                let index = _data_model.insert(defaultValues);
                createGridRows(_data_model.data);
                let dataRow = _gridRows.find(e => e.dataRowIndex === index);
                this.callBack['post-insert'](dataRow);
                dataRow.focus(this.options.selector === true && this.options.selector_start !== true ? 0 : 1);
            }
        };

        this.deleteSelected = () => {
            this.getSelectedRows().forEach(row => {
                if (this.callBack['pre-delete'](row) === true) {
                    _data_model.delete(row.dataRowIndex);
                    clearGridRows();
                    createGridRows(_data_model.data);

                } else {
                    console.error('Could not delete row');
                }
            });
        };


        /**
         * Listen to keydown events
         */
        _container.addEventListener("keydown", event => {
            _key = selim.utils.getKeyCode(event);
            if (this.state.editing === true) {
                return;
            }

            setActiveCell(event);

            if (!(options.delete_key || options.insert_key || options.unselect_key)) {
                return;
            }

            let action = selim.utils.GetControlKyes(this.options, event);
            switch (action) {
                case "insert":
                    this.insertRow();
                    break;
                case "unselect":
                    this.unSelectAll();
                    break;
                case 'delete':
                    this.deleteSelected();
            }
        });

        this.commit = () => {
            _data_model.commit();
        };

        let setActiveCell = (event) => {
            let code = selim.utils.getKeyCode(event);
            let ele = document.activeElement;
            if (ele.tagName !== 'TD') {
                return;
            }

            //    event.preventDefault();

            let row = ele.parentNode;
            let columnCount = row.childNodes.length;
            let currentColumn = ele.cellIndex;
            let rowCount = row.parentNode.childNodes.length;
            let currentRow = row.rowIndex - 1;

            switch (code) {
                case 'ArrowRight':
                    currentColumn += 1;
                    break;
                case 'ArrowLeft':
                    currentColumn -= 1;
                    break;
                case 'ArrowDown':
                    currentRow += 1;
                    break;
                case 'ArrowUp':
                    currentRow -= 1;
                    break;
                case 'Home':
                    currentColumn = 0;
                    break;
                case 'End':
                    currentColumn = columnCount - 1;
                    break;
            }

            if (currentRow > rowCount - 1 || currentRow < 0 ||
                currentColumn > columnCount - 1 || currentColumn < 0) {
                return;
            }

            row.parentNode.childNodes[currentRow].childNodes[currentColumn].focus();

        };

        let getColumnIndex = (column) => {
            for (let x = 0; x < _columns.length; x++) {
                if (_columns[x].name === column) {
                    return x;
                }
            }

            return -1;
        };

        this.max = (column) => {

            let index = getColumnIndex(column);
            if (index < 0)
                return undefined;
            return _data_model.max(index);
        };

        this.min = (column) => {

            let index = getColumnIndex(column);
            if (index < 0)
                return undefined;
            return _data_model.min(index);
        };


        this.onMethod = (src) => {
            if (src === "post-insert") {
                clearGridRows();
                createGridRows(_data_model.data);
            }
        };


        let createHeaders = () => {
            let onclick = (headerCell) => {
                _data_model.sort(headerCell.cellIndex, !headerCell.isAsc());
                headerCell.setAsc(!headerCell.isAsc());
                clearGridRows();
                createGridRows(_data_model.data);
            };

            this.columns.forEach((column, index) => {
                let headerCell = new selim.HeaderCell(column, index, onclick);
                if (column.display !== false) {
                    headerCell.mount(_table.tHead.rows[0]);
                }
            });
        };

        /**
         * 
         * @param {Array} rows data array // [[],[],....]
         * 
         */
        let createGridRows = rows => {

            this.state.populate = true;
            let _dataIndex = 0;
            _gridRows = [];
            _register = new selim.EventRegister();
            clearGridRows();

            rows.forEach(row => {
                if (row[1] === 'd' || row[1] === 'x') {
                    _dataIndex++;
                } else {
                    let dataRow = new selim.GridRow(this.columns, row, this, _dataIndex, _register, _data_model);
                    _gridRows.push(dataRow);
                    _dataIndex++;
                    dataRow.mount(_table.tBodies[0]);
                    dataRow.selected = dataRow.row_selector ? dataRow.row_selector : false;
                    this.callBack['post-insert'](dataRow);
                }
            });
            this.state.populate = false;

        };

        let clearGridRows = () => {
            selim.utils.removeChilds(_table.tBodies[0]);
        };

        let clearHeaders = event => {
            selim.utils.removeChilds(_table.tHead.rows[0]);

        };


        let fillGrid = () => {
            clearHeaders();
            clearGridRows();
            createHeaders();
            createGridRows(_data_model.data);

        };

        /**
         * 
         * @param {number} index  Row index
         * @param {boolean} value 
         */

        this.selectRow = (index, value) => {
            if (value !== true) {
                _gridRows[index - 1].classList.remove('selectedRow');
            } else {
                _gridRows[index - 1].classList.add('selectedRow');
            }

        };

        /**
         * Unselect selected rows
         */

        this.unSelectAll = () => {
            _gridRows.forEach(dataRow => {
                dataRow.selected = false;
            });
        };

        /**
         * @returns{Array} returns array of selected rows
         */

        this.getSelectedRows = () => {
            let selectedRows = [];
            _gridRows.forEach(dataRow => {
                if (dataRow.selected === true)
                    selectedRows.push(dataRow);
            });
            return selectedRows;
        };

        this.mount = (ele) => {
            ele.appendChild(_container);
        };

        _container.appendChild(_table);

        fillGrid();
    }

    get selectedRows() {
        return this.getSelectedRows();
    };

    get preventScroll() {
        return true;
    }

};selim.HeaderCell = class HeaderCell {
    constructor(column, cellIndex, clicked) {

        let cell = selim.$c('td');
        let _icon = selim.$c('div');
        let _container = selim.$c('div');
        let _text = selim.$c('div');
        let asc = false;


        Object.defineProperty(this, 'cellIndex', {
            value: cellIndex,
            writable: false
        });

        cell.style.width = column.width || 'auto';
        cell.style.maxWidth = column.width || 'auto';



        _container.className = 'header-container';
        _text.className = 'exp';
        _text.innerText = column.label;
        _icon.style.cursor = 'default';
        _container.appendChild(_text);

        if (column.sortable !== false) {
            _icon.className = 'icon';
            _icon.innerHTML = ' ⌃ ';
            _icon.style.display = 'block';
            _icon.onclick = event => {
                clicked(this);
            };
            _container.appendChild(_icon);
        }
        let b = selim.$c('div');
        cell.appendChild(_container);

        // Methods
        this.mount = ele => ele.appendChild(cell);

        this.isAsc = () => {
            return asc;
        };

        this.setAsc = bool => {
            asc = bool;
            this.setSortIcon();
        };

        this.setSortIcon = () => {
            if (_icon.innerHTML == ' ⌄ ')
                _icon.innerHTML = ' ⌃ ';

            else {
                _icon.innerHTML = ' ⌄ ';
            }
        }
    }

    get componentName() {
        return 'data-table';
    }



}