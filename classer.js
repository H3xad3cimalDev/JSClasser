function loopArray(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array [i]);
  }
}

// simple util function to add OOP into this ECMA 5 engine
var ____classified__class_id_count = {};
var ____classified__class_cache = [];
var ____classified__instance_cache = [];
function isClass(o) {
  if (typeof(o) != "object") throw "Not an object: " + o;
  return ____classified__class_cache.indexOf(o) != -1;
}

function isInstance(o) {
  if (typeof(o) != "object") throw "Not an object: " + o;
  return ____classified__instance_cache.indexOf(o) != -1;
}

var __non_overwriten_data_extends = ["name", "__inherits", "new", "toString", "extend", "abstract", "__class", "super"];
function Class(className, params) {
  if (className == undefined) {
    className = "?";
  }
  
  if (typeof(className) != "string") throw "className: " + className + "  isn't a string";
  
  var classObject = {};
  
  classObject.name = className;
  classObject.__inherits = [];
  
  if (params != undefined) {
    if (typeof(params) != "object") throw "params: " + params + "  isn't a object.";
    
    loopArray(Object.keys(params), function(key) {
      classObject[key] = params[key];
    });
  }
  
  // adding methods
  classObject.new = function(param, shouldInit) {
    if (shouldInit == undefined) shouldInit = true;
    var instance = {};
    
    // copying class info
    loopArray(Object.keys(classObject), function(key) {
      if (key == "new") {
        return;
      }
      
      instance[key] = classObject[key];
    });
    
    // class iding
    if (____classified__class_id_count[classObject.name]) {
      var lastId = ____classified__class_id_count[classObject.name];
      instance.__classId = lastId + 1;
      ____classified__class_id_count[classObject.name] = lastId + 1;
    } else {
      ____classified__class_id_count[classObject.name] = 0;
      instance.__classId = 0;
    }
    
    // some data
    instance.class = classObject;

    // running init
    if (instance.init && shouldInit) {
      instance.init(param);
      instance.init = function() {
        throw "Can't call 'init' in already initialized object.";
      };
    }
    
    // extra funcs
    instance.instanceOf = function(o) {
        if (!isClass(o)) throw "Not a valid Class";
        return this.class == o || classObject.__inherits.indexOf(o) != -1;
    };

    instance.cast = function(o) {
        if (!isClass(o)) throw "Not a valid Class";
        if (classObject.__inherits.indexOf(o) == -1) throw "Not inherited";
        var newO = o.new({}, false);
        loopArray(Object.keys(newO), function(item) {
            if (__non_overwriten_data_extends.indexOf(item) != -1) return;
            newO[item] = instance[item];
        });

        return newO;
    };

    ____classified__instance_cache.push(instance);
    return instance;
  };
  
  classObject.toString = function() {
    return "class '" + this.name + "' (classId: " + this.__classId + ")";
  };
  
  classObject.extend = function(extendClassName, extendParams) {
    var newClassObject = Class(extendClassName, extendParams);
    loopArray(Object.keys(classObject), function(key) {
      if (__non_overwriten_data_extends.indexOf(key) != -1) {
        return;
      }
      
      newClassObject[key] = classObject[key];
    });
    newClassObject.__inherits.push(classObject);
    newClassObject.super = classObject;
    return newClassObject;
  };
  
  classObject.abstract = function() {
    delete classObject.new;
    if (classObject.init) delete classObject.init;
  };
  
  ____classified__class_cache.push(classObject);
  return classObject;
}
