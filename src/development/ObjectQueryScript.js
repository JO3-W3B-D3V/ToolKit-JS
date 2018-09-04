/**
 * @author    Joseph Evans <joeevs196@gmail.com>
 * @version   1.0.0
 * @desc      The purpose of this code is to simulate SQL like logic
 *            with an array of object's, essentially, here you can query specific
 *            columns, or you can query all column, etc. I would personally
 *            suggest that you query against all columns, as from a
 *            computational complexity theory perspective, it's faster. The
 *            reason behind creating such code was to further reduce the number
 *            of http requests, and to also allow for some form of searching and
 *            sorting within the front end while offline. It could be possible
 *            to use a technology such as local storage to store the client's
 *            data and then possibly sync the clients data with a back end of
 *            some sort once the client is online again. Initially this was not
 *            designed to work with hybrid applications, however as this is a
 *            much better, cleaner and more compressed implementation compared to
 *            the half finished initial implementation which you can find below.
 *            However, I see little reason why this couldn't possibly work as a
 *            part of a hybrid web application. Again, if one decides to go down
 *            the path of using this technology for hybrid web applications, I
 *            strongly suggest you keep the amount of data sent to this technology
 *            lower simply because there may be some mobile device(s) that are
 *            morbidly slow. Having said that though, with the initial version it
 *            was capable of handeling 1,000,000 records, while that is an
 *            unrealistic amount of data to pass to the client's machine, I simply
 *            did such a test to ensure that the sheer size of data wasn't too
 *            much of an impact.
 * @copyright Joseph Evans(c) 2018
 * @todo      Consider implementing joins from table to table, etc.
 * @todo      Test the code in a great amount of detail, fix any bugs, etc.
 * @see       https://github.com/JO3-W3B-D3V/OQS
 *
 */


var ToolKit = ToolKit || {};

/**
 * @public
 * @function OQS
 * @return   {Object}
 * @desc     The purpose of this class is to simply implement a singleton
 *           design pattern ans allow ofr SQL like logic to be run within the
 *           client's browser, this will handle small - medium size data sets.
 */
ToolKit.OQS = function () {
  if (ToolKit.OQS.instance != null) {
    return ToolKit.OQS.instance;
  }

  var databases = {};
  var tables = {};
  var current = {};


  /**
   * @private
   * @function updateCurrent
   * @param    {Object}
   * @desc     The purpose of this method is to simply update the
   *           current database.
   */
  var updateCurrent = function (db) {
    var required = ["name", "tables"];
    var types = ["string", "object"];

    if (typeof db != "object") {
      throw new Error("The provided parameter is not a database.");
    } else {
      for (var i = 0, s = required.length; i < s; i ++) {
        var prop = db[required[i]];
        var type = types[i];

        if (prop == null || typeof prop != type) {
          throw new Error("The provided parameter is not a database.");
        }
      }
    }

    current = db;
  };


  /**
   * @private
   * @function validateString
   * @param    {String} name
   * @desc     The purpose of this method is to simply allow for
   *           safety checking that any string parameter is valid.
   */
  var validateString = function (name) {
    if (typeof name != "string" || name.lenght < 1) {
      throw new Error("Invalid data type, please provide a string.");
    }
  };


  /**
   * @private
   * @function validateInt
   * @param    {Integer} int
   * @desc     The purpose of this method is to simply ensure that a
   *            numeric value is of type int.
   */
  var validateInt = function (int) {
    var errMessage = "Invalid integer provided.";

    try {
      if (int === parseInt(int, 10)) {
        // success so return null
        return null;
      } else {
        throw new Error(errMessage);
      }
    } catch (NonNumericException) {

      /**
       * @ignore
       * @desc   The reason as to why this is actually here is simply
       *         because the user may provide a string therefore the parse
       *         int method may fail and throw it's own error(s).
       */
      throw new Error(errMessage);
    }
  };


  /**
   * @ignore
   * @public
   * @desc   The purpose behind this object is to simply wrap all of the
   *         methods together, unlike the original implementation, this
   *         approach allows for some private properties.
   */
  var publicObject = {


    /**
     * @public
     * @function createDB
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this
     */
    createDB : function (name) {
      validateString(name);

      if (databases[name] == null) {
        databases[name] = {
          name: name,
          tables: {}
        };

        current = databases[name];
      } else {
        throw new Error(name + " Is an existing database already.");
      }

      return publicObject;
    },


    /**
     * @public
     * @function changeDB
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is simple, it will allow the
     *           developer to change the 'current' database object, this way
     *           the developer can target a specific table within a specific
     *           database, as an example.
     */
    changeDB: function (name) {
      validateString(name);

      if (current[name] != null) {
        updateCurrent(current[name]);
      } else {
        throw new Error("No such database exists.");
      }

      return current;
    },


    /**
     * @public
     * @function dropDB
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is to simply allow a developer
     *           to drop a database object, essentially deleting it and
     *           everything within it.
     */
    dropDB: function (name) {
      validateString(name);

      if (databases[name] != null) {
        delete databases[name];
      }

      return publicObject;
    },


    /**
     * @public
     * @function getDB
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is to allow a developer to
     *           retrieve a database object, if no such database exists then
     *           this method will simply return null.
     */
    getDB: function (name) {
      validateString(name);

      if (databases[name] != null) {
        return databases[name];
      } else {
        return null;
      }
    },


    /**
     * @public
     * @function wipeDB
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is to simply remove all of
     *           the tables within the database that one may be
     *           trying to target.
     */
    wipeDB: function (name) {
      validateString(name);

      if (databases[name] != null) {
        databases[name].tables = {};
      }

      return publicObject;
    },


    /**
     * @public
     * @function clobeDB
     * @param    {String} name
     * @param    {String} newName
     * @return   {Object}
     * @desc     The purpose of this method is to allow a developer
     *           to make a backup of an entier database to a new/empty
     *           database.
     */
    cloneDB: function (name, newName) {
      validateString(name);
      publicObject.createDB(newName);
      var db = publicObject.getDB(name);
      var newDB = publicObject.getDB(newName);
      var clone = JSON.parse(JSON.stringify(db));
      newDB.tables = clone.tables; // name will remain different
      return publicObject;
    },


    /**
     * @public
     * @function createTable
     * @param    {String} name
     * @desc     The purpose of this method is to simply create a table within
     *           the currently selected database.
     */
    createTable: function (name) {
      validateString(name);
      if (current.tables[name] == null) {
        current.tables[name] = {name: name, cols: {}, records: []};
        var tbl = current.tables[name];


        /**
         * @private
         * @function addColumn
         * @param    {String} columnName
         * @desc     The purpose of this method is to simply be able to add a
         *           column to the given table.
         */
        var addColumn  = function (columnName) {
          validateString(columnName);
          var val = columnName.replace(new RegExp(" ","g"), "")
                      .replace(new RegExp('"',"g"), "")
                      .replace(new RegExp("'","g"), "")
                      .toLowerCase()
                      .toString(); // just for safe measures
          if (tbl.cols[val] == null) {
            tbl.cols[val] = val;
          } else {
            throw new Error("You cannot have a duplicated column name within " +
                            "the same table.");
          }
          return {addColumn: addColumn};
        };


        return {addColumn: addColumn};
      } else {
        throw new Error("A table with the name '" + name +
          "' already exists within the current database, have you" +
          " considered changing the db?");
      }
    },


    /**
     * @public
     * @function getTable
     * @param    {String} name
     * @return   {Object||Null}
     * @desc     The purpose of this method is to simply get a table from the
     *           current database
     */
    getTable: function (name) {
      validateString(name);

      if (current.tables[name] != null) {
        return current.tables[name];
      } else {
        return null;
      }
    },


    /**
     * @public
     * @function dropTable
     * @param    {String} name
     * @desc     The purpose of this method is to simply allow a developer
     *           to drop a table from the currently selected database.
     */
    dropTable: function (name) {
      validateString(name);

      if (current.tables[name] != null) {
        delete current.tables[name];
      }

      return publicObject;
    },


    /**
     * @public
     * @function wipeTable
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is to allow a developer to erase
     *           all data from a given table.
     */
    wipeTable: function (name) {
      validateString(name);

      if (current.tables[name] != null) {
        current.tables[name] = {name: name, cols: {}, records: []};
      }

      return publicObject;
    },


    /**
     * @public
     * @function cloneTable
     * @param    {String}
     * @desc     The purpose of this method is to allow a developer to
     *           make a copy of a table within the current database.
     */
    cloneTable: function (name) {
      validateString(name);

      if (current.tables[name] != null) {
        var obj = {};


        /**
         * @private
         * @function to
         * @param    {String} tbl
         * @desc     The purpose of this method is to specify the new name that
         *           you'd like to assign to the cloned table.
         */
        obj.to = function (tbl) {
          if (tbl == name) {
            throw new Error("You cannot have the same name(s) for a cloned " +
                            "table within the same database.");
          }

          var newTBL = publicObject.createTable(tbl);

          if (newTBL != null) {
            var oldTBL = publicObject.getTable(name);

            for (var i in oldTBL.cols) {
              var col = oldTBL.cols[i].toString();
              newTBL.addColumn(col);
            }

            var clonedRecords = JSON.parse(JSON.stringify(oldTBL.records));
            newTBL.records = clonedRecords;
          }

          obj = null;
          return publicObject;
        };

        return obj;
      } else {
        throw new Error("No such table with the name '" + name +
          "' exists within the current database, have you considered" +
          " changing db?");
      }
    },


    /**
     * @public
     * @function cloneTableTo
     * @param    {String} table
     * @param    {String} selectedDB
     * @param    {String} targetDB
     * @return   {Object}
     * @desc     The purpose of this method is to simply clone a table from
     *           one database to another.
     */
    cloneTableTo : function (table, selectedDB, targetDB) {
      validateString(table);
      validateString(selectedDB);
      validateString(targetDB);

      publicObject.changeDB(selectedDB);
      var cloneTable = JSON.parse(JSON.stringify(publicObject.getTable(table)));
      var db = publicObject.getDB(targetDB);
      db.tables[cloneTable.name] = cloneTable;
    },


    /**
     * @public
     * @function insertInto
     * @param    {String} name
     * @return   {Object}
     * @desc     The purpose of this method is to simply allow a developer
     *           to insert data into the targeted table object.
     */
    insertInto : function (name) {
      validateString(name);
      var table = current.tables[name];
      var obj = {};


      /**
       * @private
       * @function setData
       * @param    {Object} data
       * @return   {Object}
       * @desc     The purpose of this method is to allow a user to
       *           set the data that they'd like to insert into a table.
       */
      obj.setData = function (data) {
        if (data.length != null) {
          for (var i = 0, s = data.length; i < s; i ++) {
            table.records.push(data[i]);
          }
        } else {
          table.records.push(data);
        }

        return publicObject
      };


      return obj;
    },


    /**
     * @public
     * @function select
     * @param    {String} selectKey
     * @return   {Object}
     * @desc     The purpose of this method is to allow the developer to specify
     *           what data they would like to query from a given table.
     */
    select : function (selectKey) {
      validateString(selectKey);
      var obj = {};
      var key = selectKey;
      var results = [];
      var offset = 0;
      var limit = null;
      var tbl = {};
      var cols = [];


      /**
       * @private
       * @function getResults
       * @return   {Array}
       * @desc     The purpose of this method is to simply allow a developer to
       *           extract the results of a query via this simple method.
       */
      var getResults = function () {
        try {
          delete obj.getResults;
        } catch (Exception) {
          // do nothing here
        }
        return results;
      };


      /**
       * @private
       * @function orderBy
       * @param    {String} col
       * @param    {String} order
       * @return   {Object}
       * @desc     The purpose of this method is to simply order the results
       *           in a specific fashion.
       */
      var orderBy = function (col, order) {
        validateString(col);
        validateString(order);

        order = order.toLowerCase();
        if (order != "asc" && order != "desc") {
          throw new Error("Unkown order of " + order);
        } else if (tbl.cols[col] == null) {
          throw new Error("Unkown column with the name of " + col);
        }

        if (order == "asc") {
          results.sort(function (a, b) {
            var r1 = a[col];
            var r2 = b[col];

            if (r1 > r2) {
              return 1;
            } else if (r1 < r2) {
              return -1;
            } else {
              return 0;
            }
          });
        } else if (order == "desc") {
          results.sort(function (a, b) {
            var r1 = a[col];
            var r2 = b[col];

            if (r1 > r2) {
              return -1;
            } else if (r1 < r2) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        try {
          delete obj.delete;
          delete obj.orderBy;
        } catch (Exception) {
          // do nothing here
        }
      };


      /**
       * @private
       * @function del
       * @param    {Array} records
       * @return  {Object}
       * @desc     The purpose of this method is to simply delete 'x' records
       *           from the currently targeted table.
       */
      var del = function () {
        // TODO
        var tblData = tbl.recrods;
        var clonedResults = JSON.parse(JSON.stringify(results));
        var deleteResults = [];

        for (var i = 0, s = tblData.length; i < s; i ++) {
          try {
            var record = tblData[i];
            var cloned = clonedResults[i];

            for (var x in record) {
              var col = record[x];
              var clonedCol = cloned[x];

              if (cold != clonedCol) {
                deleteResults.push(record);
              }
            }
          } catch (OutOfBoundsException) {
            break;
          }

          // update the tbale's records property
          tbl.records = deleteResults;
        }

        try {
          delete obj.delete;
          delete obj.orderBy;
        } catch (Exception) {
          // do nothing here
        }
      };

      /**
       * @private
       * @function where
       * @param    {String} query
       * @return   {Object}
       * @desc     The purpose of this method is to essentially
       *           execute the query, specifying which results you would
       *           like to obtain.
       */
      var where = function (query) {
        validateString(query);
        query = query.toString().toLowerCase();

        var queryResults = [];
        var test = query.toString().toLowerCase().split(" ");
        var max = limit || results.length;
        var switches = [
          {key:"not", value:"!"},
          {key:"and", value:"&&"},
          {key:"or", value:"||"},
          {key:"gt", value:">"},
          {key:"lt", value:"<"},
          {key:"gte", value:">="},
          {key:"lte", value:"<="},
          {key:"eq", value:"=="}
        ];


        /**
         * @ignore
         * @desc   The purpose of this code is to format the string
         *         so that it can be compiled as expected, essentially
         *         this is like a precompiler.
         */
        for (var i = 0, s = test.length; i < s; i ++) {
          var queryColumn = test[i].toLowerCase();
          if (tbl.cols[queryColumn] != null) {
            var reg = new RegExp("\\b" + queryColumn + "\\b", "g");
            var re = "row['" + queryColumn + "']";
            query = query.toLowerCase().replace(reg, re);
          }
        }


        /**
         * @ignore
         * @desc   The purpose of this code is to further format the string
         *         this is essentially an additional precompiler, only this
         *         code will focus on logical operations.
         */
        for (var i = 0, s = switches.length; i < s; i ++) {
          var switchObject = switches[i];
          var objKey = switchObject.key;
          var objValue = switchObject.value;
          query = query.replace(new RegExp("\\b" + objKey + "\\b", "g"), objValue);
        }


        /**
         * @ignore
         * @desc   The purpose of this code is to essentially compile the above
         *         code allowing us to query the selected table.
         */
        if (key == "*") {
          for (var i = offset; i < max; i ++) {
            var row = results[i];

            if (eval(query)) {
              queryResults.push(row);
            }
          }
        } else {
          var tempCols = cols.reverse();

          for (var i = offset; i < max; i ++) {
            var row = results[i];

            if (eval(query)) {
              var item = {};
              for (var j = tempCols.length - 1; j > -1; j --) {
                var col = tempCols[j];
                item[col] = row[col];
              }

              queryResults.push(item);
            }
          }
        }

        // update the results value
        results = queryResults;

        try {
          delete obj.where;
        } catch (Exception) {
          // do nothing here
        }

        obj.delete = del;
        obj.orderBy = orderBy;

        return obj;
      };


      /**
       * @private
       * @function limit
       * @param    {Integer} int
       * @desc     The prupose of this method is to simply specify the limit
       *           that you'd like to set on the query.
       */
      obj.limit = function (int) {
        validateInt(int);

        if (int < 0) {
          throw new Error("The limit must be at least of size 1.");
        } else if (int < offset) {
          throw new Error("You cannot set the limit value ot be less than " +
                          "the offset value.");
        }

        limit = int;
      };


      /**
       * @private
       * @function offset
       * @param    {Integer} int
       * @desc     The purpose of this method is to set the offset, specifying
       *           where you'd liek to start in the results, essentially.
       */
      obj.offset = function (int) {
        validateInt(int);
        if (limit != null) {
          if (int > limit) {
            throw new Error("You cannot have an offset that's a larger numeric " +
                            "value than the limit value.");
          }
        }

        offset = int;
      };


      /**
       * @private
       * @function from
       * @param    {String} tableName
       * @desc     The purpose of this method is to
       */
      obj.from = function (tableName) {
        validateString(tableName);
        tbl = current.tables[tableName];
        var max = limit || tbl.records.length;

        if (key == "*") {
          for (var i = offset; i < max; i ++) {
            results.push(tbl.records[i]);
            console.log(tbl.records[i]);
          }
        } else {
          cols = key.split(",");
          var records = tbl.records;

          for (var i = offset; i < max; i ++) {
            var record = records[i];
            var item = {};

            for (var j = 0, z = cols.length; j < z; j++) {
              var recordKey = cols[i];
              var recordValue = record[recordKey];
              item[recordKey] = recordValue;
            }

            results.push(item);
          }
        }

        delete obj.from;
        obj.getResults = getResults;
        obj.where = where;
        return obj;
      };


      return obj;
    }
  };


  ToolKit.OQS.instance = publicObject;
  return ToolKit.OQS.instance;
};


/**
 * @ignore
 * @desc   This is a meer test, and a demo to show how you could
 *         implement OQS in your own front end application.
 */
 /*
  var sql = new ToolKit.OQS();
  sql.createDB("test");
  sql.createTable("test_table").addColumn("id").addColumn("age").addColumn("name");

  var data = [];

  for (var i = 0; i < 100; i ++) {
    var names = ["jack", "joe", "mollie", "chloe", "michelle", "stacy", "sam"];
    var randomData = {};
    var randomAge = Math.floor(Math.random() * Math.floor(120));
    var randomName = names[Math.floor(Math.random() * names.length)];
    randomData.age = randomAge;
    randomData.name = randomName;
    randomData.id = i;
    data.push(randomData);
  }

  sql.insertInto("test_table").setData(data);

  var qry = sql.select("*").from("test_table").where("age GT 10").getResults();
  console.log(data);
  console.log(qry);
*/
