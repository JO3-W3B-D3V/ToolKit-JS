/**
 * @todo a lot.... from documentation to completing the code to testing the code... Etc. 
 */


ToolKit = ToolKit || {};

ToolKit.OQS = function () {
  if (ToolKit.OQS.instance != null) {
    return ToolKit.OQS.instance;
  }

  var databases = {};
  var tables = {};
  var current = {};

  var updateCurrent = function (db) {
    current = db;
  };

  var validateStringName = function (name) {
    if (typeof name != "string" || name.lenght < 1) {
      throw new Error("Invalid data type, please provide a string.");
    }
  };

  var publicObject = {
    createDB : function (name) {
      validateStringName(name);

      if (db[name] == null) {
        databases[name] = {
          name: name,
          tables: {}
        };

      } else {
        throw new Error(name + " Is an existing database already.");
      }

      return current;
    },



    changeDB: function (name) {
      validateStringName(name);

      if (current[name] != null) {
        updateCurrent(current[name]);
      } else {
        throw new Error("No such database exists.");
      }

      return current;
    },



    dropDB: function (name) {
      validateStringName(name);

      if (databases[name] != null) {
        delete databases[name];
      }

      return current;
    },

    getDB: function (name) {
      validateStringName(name);
      if (databases[name] != null) {
        return databases[name];
      } else {
        return null;
      }
    },

    wipeDB: function (name) {
      validateStringName(name);

      if (databases[name] != null) {
        databases[name].tables = {};
      }

      return current;
    },

    cloneDB: function (name, newName) {
      validateStringName(name);
      publicObject.createDB(newName);
      var db = publicObject.getDB(name);
      var newDB = publicObject.getDB(newName);
      var clone = JSON.parse(JSON.stringify(db));
      newDB.tables = clone.tables; // name will remain different
    },

    createTable: function (name) {
      if (current.tables[name] == null) {
        current.tables[name] = {name: name, cols: {}, records: []};
      } else {
        throw new Error("A table with the name '" + name +
          "' already exists within the current database, have you" +
          " considered changing the db?");
      }
    },

    getTable: function (name) {
      validateStringName(name);

      if (current.tables[name] != null) {
        return current.tables[name];
      } else {
        return null;
      }
    },

    dropTable: function (name) {
      validateStringName(name);

      if (current.tables[name] != null) {
        delete current.tables[name];
      }

      return current;
    },


    wipeTable: function (name) {
      validateStringName(name);

      if (current.tables[name] != null) {
        current.tables[name] = {name: name, cols: {}, records: []};
      }

      return current;
    },

    cloneTable: function (name) {
      validateStringName(name);

      if (current.tables[name] != null) {
        // TODO
      } else {
        throw new Error("No such table with the name '" + name +
          "' exists within the current database, have you considered" +
          " changing db?");
      }
    }

  };


  ToolKit.OQS.instance = publicObject;
  return ToolKit.OQS.instance;
};
