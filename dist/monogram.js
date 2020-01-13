/*!
 * @totatoti/monogram
 * @license MIT
 *
 * Dependencies:
 * core-js 3.6.1 | MIT
 * tslib 1.10.0 | Apache-2.0
 * twgl.js 4.14.1 | MIT
 * crypto-js 3.1.9-1 | MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.monogram = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.1',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime;

	// `Date.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
	    defineProperty(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$1 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$1 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$1(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$1(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$1(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var TO_STRING$1 = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING$1];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  if (CollectionPrototype$1) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
	    }
	    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	function __read(o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	}

	function __spread() {
	    for (var ar = [], i = 0; i < arguments.length; i++)
	        ar = ar.concat(__read(arguments[i]));
	    return ar;
	}

	var defineProperty$2 = objectDefineProperty.f;





	var DataView = global_1.DataView;
	var DataViewPrototype = DataView && DataView.prototype;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray$1 = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$1 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$1.isPrototypeOf;

	var TO_STRING_TAG$4 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	var NATIVE_ARRAY_BUFFER = !!(global_1.ArrayBuffer && DataView);
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  } throw TypeError('Target is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }
	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;
	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];
	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }
	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  if (!global_1[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$1) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$4)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$2(TypedArrayPrototype, TO_STRING_TAG$4, { get: function () {
	    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	  } });
	  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
	    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	}

	// WebKit bug - the same parent prototype for typed arrays and data view
	if (NATIVE_ARRAY_BUFFER && objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype$1) {
	  objectSetPrototypeOf(DataViewPrototype, ObjectPrototype$1);
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	// `ToIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-toindex
	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity$1 = 1 / 0;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$1 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = new Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare
	  if (number != number || number === Infinity$1) {
	    // eslint-disable-next-line no-self-compare
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$1(log(number) / LN2);
	    if (number * (c = pow(2, -exponent)) < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity$1 : Infinity$1;
	  } else {
	    mantissa = mantissa + pow(2, mantissaLength);
	    exponent = exponent - eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	// `Array.prototype.fill` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	var arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var NATIVE_ARRAY_BUFFER$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER;








	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var defineProperty$3 = objectDefineProperty.f;




	var getInternalState$2 = internalState.get;
	var setInternalState$3 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var RangeError$1 = global_1.RangeError;

	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter = function (Constructor, key) {
	  defineProperty$3(Constructor[PROTOTYPE$1], key, { get: function () { return getInternalState$2(this)[key]; } });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$2(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$2(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$2(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$2(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER$1) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$3(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$2(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$3(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });
	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }

	  redefineAll($DataView[PROTOTYPE$1], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new NativeArrayBuffer(); // eslint-disable-line no-new
	    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
	    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };
	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer[PROTOTYPE$1];
	    for (var keys$1 = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys$1.length > j;) {
	      if (!((key = keys$1[j++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
	      }
	    }
	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataView[PROTOTYPE$1].setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE$1], {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var SPECIES$2 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var ArrayBuffer$1 = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer$1.prototype.slice;

	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer$1(2).slice(1, undefined).byteLength;
	});

	// `ArrayBuffer.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
	_export({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice !== undefined && end === undefined) {
	      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
	    }
	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new (speciesConstructor(this, ArrayBuffer$1))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;
	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    } return result;
	  }
	});

	/* eslint-disable no-new */



	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$2 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;

	var typedArraysConstructorsRequiresWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator, next;
	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    O = [];
	    while (!(step = next.call(iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bindContext(mapfn, arguments[2], 2);
	  }
	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);
	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }
	  return result;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {


















	var getOwnPropertyNames = objectGetOwnPropertyNames.f;

	var forEach = arrayIteration.forEach;






	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var round = Math.round;
	var RangeError = global_1.RangeError;
	var ArrayBuffer = arrayBuffer.ArrayBuffer;
	var DataView = arrayBuffer.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	var TypedArray = arrayBufferViewCore.TypedArray;
	var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	var isTypedArray = arrayBufferViewCore.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var fromList = function (C, list) {
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var addGetter = function (it, key) {
	  nativeDefineProperty(it, key, { get: function () {
	    return getInternalState(this)[key];
	  } });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && typeof key != 'symbol'
	    && key in target
	    && String(+key) == String(key);
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  return isTypedArrayIndex(target, key = toPrimitive(key, true))
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
	    && isObject(descriptor)
	    && has(descriptor, 'value')
	    && !has(descriptor, 'get')
	    && !has(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!has(descriptor, 'writable') || descriptor.writable)
	    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};

	if (descriptors) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	    objectDefineProperty.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype, 'buffer');
	    addGetter(TypedArrayPrototype, 'byteOffset');
	    addGetter(TypedArrayPrototype, 'byteLength');
	    addGetter(TypedArrayPrototype, 'length');
	  }

	  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  module.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+$/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState(that);
	      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	    } else if (typedArraysConstructorsRequiresWrappers) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    _export({
	      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else module.exports = function () { /* empty */ };
	});

	// `Uint8Array` constructor
	// https://tc39.github.io/ecma262/#sec-typedarray-objects
	typedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$2 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$2((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start /* , end */) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every = arrayIteration.every;

	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$2('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter = arrayIteration.filter;


	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$4('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	});

	var $find = arrayIteration.find;

	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$5('find', function find(predicate /* , thisArg */) {
	  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$6('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach$1 = arrayIteration.forEach;

	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$7('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach$1(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;

	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$8('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf = arrayIncludes.indexOf;

	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$6 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$6];

	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
	  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME);
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$a(ITERATOR$6, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join;

	// `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var min$3 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf');

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$3(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map = arrayIteration.map;


	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
	  return $map(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$3 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
	};

	var $reduce = arrayReduce.left;

	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$e('reduce', function reduce(callbackfn /* , initialValue */) {
	  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;

	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$2 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = floor$2(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

	var FORCED = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$h('set', function set(arrayLike /* , offset */) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, FORCED);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;

	var FORCED$1 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$1);

	var $some = arrayIteration.some;

	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$j('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort;

	// `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});

	var FORCED$2 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$2);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;



	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;

	if (fails(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var Attribute =
	/** @class */
	function () {
	  function Attribute(value, version) {
	    this.value = value;
	    this.version = version;
	  }

	  return Attribute;
	}();

	/* @license twgl.js 4.14.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
	Available via the MIT license.
	see: http://github.com/greggman/twgl.js for details */
	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	/**
	 *
	 * Vec3 math math functions.
	 *
	 * Almost all functions take an optional `dst` argument. If it is not passed in the
	 * functions will create a new Vec3. In other words you can do this
	 *
	 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
	 *
	 * or
	 *
	 *     var v = v3.create();
	 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
	 *
	 * The first style is often easier but depending on where it's used it generates garbage where
	 * as there is almost never allocation with the second style.
	 *
	 * It is always save to pass any vector as the destination. So for example
	 *
	 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
	 *
	 * @module twgl/v3
	 */

	let VecType = Float32Array;

	/**
	 * Creates a vec3; may be called with x, y, z to set initial values.
	 * @param {number} [x] Initial x value.
	 * @param {number} [y] Initial y value.
	 * @param {number} [z] Initial z value.
	 * @return {module:twgl/v3.Vec3} the created vector
	 * @memberOf module:twgl/v3
	 */
	function create(x, y, z) {
	  const dst = new VecType(3);
	  if (x) {
	    dst[0] = x;
	  }
	  if (y) {
	    dst[1] = y;
	  }
	  if (z) {
	    dst[2] = z;
	  }
	  return dst;
	}

	/**
	 * Subtracts two vectors.
	 * @param {module:twgl/v3.Vec3} a Operand vector.
	 * @param {module:twgl/v3.Vec3} b Operand vector.
	 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
	 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
	 * @memberOf module:twgl/v3
	 */
	function subtract(a, b, dst) {
	  dst = dst || new VecType(3);

	  dst[0] = a[0] - b[0];
	  dst[1] = a[1] - b[1];
	  dst[2] = a[2] - b[2];

	  return dst;
	}

	/**
	 * Computes the cross product of two vectors; assumes both vectors have
	 * three entries.
	 * @param {module:twgl/v3.Vec3} a Operand vector.
	 * @param {module:twgl/v3.Vec3} b Operand vector.
	 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
	 * @return {module:twgl/v3.Vec3} The vector of a cross b.
	 * @memberOf module:twgl/v3
	 */
	function cross(a, b, dst) {
	  dst = dst || new VecType(3);

	  const t1 = a[2] * b[0] - a[0] * b[2];
	  const t2 = a[0] * b[1] - a[1] * b[0];
	  dst[0] = a[1] * b[2] - a[2] * b[1];
	  dst[1] = t1;
	  dst[2] = t2;

	  return dst;
	}

	/**
	 * Divides a vector by its Euclidean length and returns the quotient.
	 * @param {module:twgl/v3.Vec3} a The vector.
	 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
	 * @return {module:twgl/v3.Vec3} The normalized vector.
	 * @memberOf module:twgl/v3
	 */
	function normalize$1(a, dst) {
	  dst = dst || new VecType(3);

	  const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
	  const len = Math.sqrt(lenSq);
	  if (len > 0.00001) {
	    dst[0] = a[0] / len;
	    dst[1] = a[1] / len;
	    dst[2] = a[2] / len;
	  } else {
	    dst[0] = 0;
	    dst[1] = 0;
	    dst[2] = 0;
	  }

	  return dst;
	}

	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	/**
	 * 4x4 Matrix math math functions.
	 *
	 * Almost all functions take an optional `dst` argument. If it is not passed in the
	 * functions will create a new matrix. In other words you can do this
	 *
	 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
	 *
	 * or
	 *
	 *     const mat = m4.create();
	 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
	 *
	 * The first style is often easier but depending on where it's used it generates garbage where
	 * as there is almost never allocation with the second style.
	 *
	 * It is always save to pass any matrix as the destination. So for example
	 *
	 *     const mat = m4.identity();
	 *     const trans = m4.translation([1, 2, 3]);
	 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
	 *
	 * @module twgl/m4
	 */
	let MatType = Float32Array;

	/**
	 * A JavaScript array with 16 values or a Float32Array with 16 values.
	 * When created by the library will create the default type which is `Float32Array`
	 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
	 * @typedef {(number[]|Float32Array)} Mat4
	 * @memberOf module:twgl/m4
	 */

	/**
	 * Sets the type this library creates for a Mat4
	 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
	 * @return {constructor} previous constructor for Mat4
	 * @memberOf module:twgl/m4
	 */
	function setDefaultType$1(ctor) {
	  const oldType = MatType;
	  MatType = ctor;
	  return oldType;
	}

	/**
	 * Negates a matrix.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} -m.
	 * @memberOf module:twgl/m4
	 */
	function negate$1(m, dst) {
	  dst = dst || new MatType(16);

	  dst[ 0] = -m[ 0];
	  dst[ 1] = -m[ 1];
	  dst[ 2] = -m[ 2];
	  dst[ 3] = -m[ 3];
	  dst[ 4] = -m[ 4];
	  dst[ 5] = -m[ 5];
	  dst[ 6] = -m[ 6];
	  dst[ 7] = -m[ 7];
	  dst[ 8] = -m[ 8];
	  dst[ 9] = -m[ 9];
	  dst[10] = -m[10];
	  dst[11] = -m[11];
	  dst[12] = -m[12];
	  dst[13] = -m[13];
	  dst[14] = -m[14];
	  dst[15] = -m[15];

	  return dst;
	}

	/**
	 * Copies a matrix.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} A copy of m.
	 * @memberOf module:twgl/m4
	 */
	function copy$1(m, dst) {
	  dst = dst || new MatType(16);

	  dst[ 0] = m[ 0];
	  dst[ 1] = m[ 1];
	  dst[ 2] = m[ 2];
	  dst[ 3] = m[ 3];
	  dst[ 4] = m[ 4];
	  dst[ 5] = m[ 5];
	  dst[ 6] = m[ 6];
	  dst[ 7] = m[ 7];
	  dst[ 8] = m[ 8];
	  dst[ 9] = m[ 9];
	  dst[10] = m[10];
	  dst[11] = m[11];
	  dst[12] = m[12];
	  dst[13] = m[13];
	  dst[14] = m[14];
	  dst[15] = m[15];

	  return dst;
	}

	/**
	 * Creates an n-by-n identity matrix.
	 *
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
	 * @memberOf module:twgl/m4
	 */
	function identity(dst) {
	  dst = dst || new MatType(16);

	  dst[ 0] = 1;
	  dst[ 1] = 0;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = 1;
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = 0;
	  dst[ 9] = 0;
	  dst[10] = 1;
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Takes the transpose of a matrix.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The transpose of m.
	 * @memberOf module:twgl/m4
	 */
	 function transpose(m, dst) {
	  dst = dst || new MatType(16);
	  if (dst === m) {
	    let t;

	    t = m[1];
	    m[1] = m[4];
	    m[4] = t;

	    t = m[2];
	    m[2] = m[8];
	    m[8] = t;

	    t = m[3];
	    m[3] = m[12];
	    m[12] = t;

	    t = m[6];
	    m[6] = m[9];
	    m[9] = t;

	    t = m[7];
	    m[7] = m[13];
	    m[13] = t;

	    t = m[11];
	    m[11] = m[14];
	    m[14] = t;
	    return dst;
	  }

	  const m00 = m[0 * 4 + 0];
	  const m01 = m[0 * 4 + 1];
	  const m02 = m[0 * 4 + 2];
	  const m03 = m[0 * 4 + 3];
	  const m10 = m[1 * 4 + 0];
	  const m11 = m[1 * 4 + 1];
	  const m12 = m[1 * 4 + 2];
	  const m13 = m[1 * 4 + 3];
	  const m20 = m[2 * 4 + 0];
	  const m21 = m[2 * 4 + 1];
	  const m22 = m[2 * 4 + 2];
	  const m23 = m[2 * 4 + 3];
	  const m30 = m[3 * 4 + 0];
	  const m31 = m[3 * 4 + 1];
	  const m32 = m[3 * 4 + 2];
	  const m33 = m[3 * 4 + 3];

	  dst[ 0] = m00;
	  dst[ 1] = m10;
	  dst[ 2] = m20;
	  dst[ 3] = m30;
	  dst[ 4] = m01;
	  dst[ 5] = m11;
	  dst[ 6] = m21;
	  dst[ 7] = m31;
	  dst[ 8] = m02;
	  dst[ 9] = m12;
	  dst[10] = m22;
	  dst[11] = m32;
	  dst[12] = m03;
	  dst[13] = m13;
	  dst[14] = m23;
	  dst[15] = m33;

	  return dst;
	}

	/**
	 * Computes the inverse of a 4-by-4 matrix.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The inverse of m.
	 * @memberOf module:twgl/m4
	 */
	function inverse(m, dst) {
	  dst = dst || new MatType(16);

	  const m00 = m[0 * 4 + 0];
	  const m01 = m[0 * 4 + 1];
	  const m02 = m[0 * 4 + 2];
	  const m03 = m[0 * 4 + 3];
	  const m10 = m[1 * 4 + 0];
	  const m11 = m[1 * 4 + 1];
	  const m12 = m[1 * 4 + 2];
	  const m13 = m[1 * 4 + 3];
	  const m20 = m[2 * 4 + 0];
	  const m21 = m[2 * 4 + 1];
	  const m22 = m[2 * 4 + 2];
	  const m23 = m[2 * 4 + 3];
	  const m30 = m[3 * 4 + 0];
	  const m31 = m[3 * 4 + 1];
	  const m32 = m[3 * 4 + 2];
	  const m33 = m[3 * 4 + 3];
	  const tmp_0  = m22 * m33;
	  const tmp_1  = m32 * m23;
	  const tmp_2  = m12 * m33;
	  const tmp_3  = m32 * m13;
	  const tmp_4  = m12 * m23;
	  const tmp_5  = m22 * m13;
	  const tmp_6  = m02 * m33;
	  const tmp_7  = m32 * m03;
	  const tmp_8  = m02 * m23;
	  const tmp_9  = m22 * m03;
	  const tmp_10 = m02 * m13;
	  const tmp_11 = m12 * m03;
	  const tmp_12 = m20 * m31;
	  const tmp_13 = m30 * m21;
	  const tmp_14 = m10 * m31;
	  const tmp_15 = m30 * m11;
	  const tmp_16 = m10 * m21;
	  const tmp_17 = m20 * m11;
	  const tmp_18 = m00 * m31;
	  const tmp_19 = m30 * m01;
	  const tmp_20 = m00 * m21;
	  const tmp_21 = m20 * m01;
	  const tmp_22 = m00 * m11;
	  const tmp_23 = m10 * m01;

	  const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
	      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
	  const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
	      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
	  const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
	      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
	  const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
	      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

	  const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

	  dst[ 0] = d * t0;
	  dst[ 1] = d * t1;
	  dst[ 2] = d * t2;
	  dst[ 3] = d * t3;
	  dst[ 4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
	          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
	  dst[ 5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
	          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
	  dst[ 6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
	          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
	  dst[ 7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
	          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
	  dst[ 8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
	          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
	  dst[ 9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
	          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
	  dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
	          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
	  dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
	          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
	  dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
	          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
	  dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
	          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
	  dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
	          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
	  dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
	          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

	  return dst;
	}

	/**
	 * Multiplies two 4-by-4 matrices with a on the left and b on the right
	 * @param {module:twgl/m4.Mat4} a The matrix on the left.
	 * @param {module:twgl/m4.Mat4} b The matrix on the right.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
	 * @memberOf module:twgl/m4
	 */
	function multiply$1(a, b, dst) {
	  dst = dst || new MatType(16);

	  const a00 = a[0];
	  const a01 = a[1];
	  const a02 = a[2];
	  const a03 = a[3];
	  const a10 = a[ 4 + 0];
	  const a11 = a[ 4 + 1];
	  const a12 = a[ 4 + 2];
	  const a13 = a[ 4 + 3];
	  const a20 = a[ 8 + 0];
	  const a21 = a[ 8 + 1];
	  const a22 = a[ 8 + 2];
	  const a23 = a[ 8 + 3];
	  const a30 = a[12 + 0];
	  const a31 = a[12 + 1];
	  const a32 = a[12 + 2];
	  const a33 = a[12 + 3];
	  const b00 = b[0];
	  const b01 = b[1];
	  const b02 = b[2];
	  const b03 = b[3];
	  const b10 = b[ 4 + 0];
	  const b11 = b[ 4 + 1];
	  const b12 = b[ 4 + 2];
	  const b13 = b[ 4 + 3];
	  const b20 = b[ 8 + 0];
	  const b21 = b[ 8 + 1];
	  const b22 = b[ 8 + 2];
	  const b23 = b[ 8 + 3];
	  const b30 = b[12 + 0];
	  const b31 = b[12 + 1];
	  const b32 = b[12 + 2];
	  const b33 = b[12 + 3];

	  dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
	  dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
	  dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
	  dst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
	  dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
	  dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
	  dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
	  dst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
	  dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
	  dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
	  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
	  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
	  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
	  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
	  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
	  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

	  return dst;
	}

	/**
	 * Sets the translation component of a 4-by-4 matrix to the given
	 * vector.
	 * @param {module:twgl/m4.Mat4} a The matrix.
	 * @param {module:twgl/v3.Vec3} v The vector.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The matrix with translation set.
	 * @memberOf module:twgl/m4
	 */
	function setTranslation(a, v, dst) {
	  dst = dst || identity();
	  if (a !== dst) {
	    dst[ 0] = a[ 0];
	    dst[ 1] = a[ 1];
	    dst[ 2] = a[ 2];
	    dst[ 3] = a[ 3];
	    dst[ 4] = a[ 4];
	    dst[ 5] = a[ 5];
	    dst[ 6] = a[ 6];
	    dst[ 7] = a[ 7];
	    dst[ 8] = a[ 8];
	    dst[ 9] = a[ 9];
	    dst[10] = a[10];
	    dst[11] = a[11];
	  }
	  dst[12] = v[0];
	  dst[13] = v[1];
	  dst[14] = v[2];
	  dst[15] = 1;
	  return dst;
	}

	/**
	 * Returns the translation component of a 4-by-4 matrix as a vector with 3
	 * entries.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
	 * @return {module:twgl/v3.Vec3} The translation component of m.
	 * @memberOf module:twgl/m4
	 */
	function getTranslation(m, dst) {
	  dst = dst || create();
	  dst[0] = m[12];
	  dst[1] = m[13];
	  dst[2] = m[14];
	  return dst;
	}

	/**
	 * Returns an axis of a 4x4 matrix as a vector with 3 entries
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
	 * @return {module:twgl/v3.Vec3} [dst] vector.
	 * @return {module:twgl/v3.Vec3} The axis component of m.
	 * @memberOf module:twgl/m4
	 */
	function getAxis(m, axis, dst) {
	  dst = dst || create();
	  const off = axis * 4;
	  dst[0] = m[off + 0];
	  dst[1] = m[off + 1];
	  dst[2] = m[off + 2];
	  return dst;
	}

	/**
	 * Sets an axis of a 4x4 matrix as a vector with 3 entries
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} v the axis vector
	 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
	 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The matrix with axis set.
	 * @memberOf module:twgl/m4
	 */
	function setAxis(a, v, axis, dst) {
	  if (dst !== a) {
	    dst = copy$1(a, dst);
	  }
	  const off = axis * 4;
	  dst[off + 0] = v[0];
	  dst[off + 1] = v[1];
	  dst[off + 2] = v[2];
	  return dst;
	}

	/**
	 * Computes a 4-by-4 perspective transformation matrix given the angular height
	 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
	 * arguments define a frustum extending in the negative z direction.  The given
	 * angle is the vertical angle of the frustum, and the horizontal angle is
	 * determined to produce the given aspect ratio.  The arguments near and far are
	 * the distances to the near and far clipping planes.  Note that near and far
	 * are not z coordinates, but rather they are distances along the negative
	 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
	 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
	 * from 0 to 1 in the z dimension.
	 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
	 * @param {number} aspect The aspect ratio width / height.
	 * @param {number} zNear The depth (negative z coordinate)
	 *     of the near clipping plane.
	 * @param {number} zFar The depth (negative z coordinate)
	 *     of the far clipping plane.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The perspective matrix.
	 * @memberOf module:twgl/m4
	 */
	function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
	  dst = dst || new MatType(16);

	  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
	  const rangeInv = 1.0 / (zNear - zFar);

	  dst[0]  = f / aspect;
	  dst[1]  = 0;
	  dst[2]  = 0;
	  dst[3]  = 0;

	  dst[4]  = 0;
	  dst[5]  = f;
	  dst[6]  = 0;
	  dst[7]  = 0;

	  dst[8]  = 0;
	  dst[9]  = 0;
	  dst[10] = (zNear + zFar) * rangeInv;
	  dst[11] = -1;

	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = zNear * zFar * rangeInv * 2;
	  dst[15] = 0;

	  return dst;
	}

	/**
	 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
	 * bottom, and top dimensions of the near clipping plane as well as the
	 * near and far clipping plane distances.
	 * @param {number} left Left side of the near clipping plane viewport.
	 * @param {number} right Right side of the near clipping plane viewport.
	 * @param {number} bottom Bottom of the near clipping plane viewport.
	 * @param {number} top Top of the near clipping plane viewport.
	 * @param {number} near The depth (negative z coordinate)
	 *     of the near clipping plane.
	 * @param {number} far The depth (negative z coordinate)
	 *     of the far clipping plane.
	 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The perspective matrix.
	 * @memberOf module:twgl/m4
	 */
	function ortho(left, right, bottom, top, near, far, dst) {
	  dst = dst || new MatType(16);

	  dst[0]  = 2 / (right - left);
	  dst[1]  = 0;
	  dst[2]  = 0;
	  dst[3]  = 0;

	  dst[4]  = 0;
	  dst[5]  = 2 / (top - bottom);
	  dst[6]  = 0;
	  dst[7]  = 0;

	  dst[8]  = 0;
	  dst[9]  = 0;
	  dst[10] = 2 / (near - far);
	  dst[11] = 0;

	  dst[12] = (right + left) / (left - right);
	  dst[13] = (top + bottom) / (bottom - top);
	  dst[14] = (far + near) / (near - far);
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Computes a 4-by-4 perspective transformation matrix given the left, right,
	 * top, bottom, near and far clipping planes. The arguments define a frustum
	 * extending in the negative z direction. The arguments near and far are the
	 * distances to the near and far clipping planes. Note that near and far are not
	 * z coordinates, but rather they are distances along the negative z-axis. The
	 * matrix generated sends the viewing frustum to the unit box. We assume a unit
	 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
	 * dimension.
	 * @param {number} left The x coordinate of the left plane of the box.
	 * @param {number} right The x coordinate of the right plane of the box.
	 * @param {number} bottom The y coordinate of the bottom plane of the box.
	 * @param {number} top The y coordinate of the right plane of the box.
	 * @param {number} near The negative z coordinate of the near plane of the box.
	 * @param {number} far The negative z coordinate of the far plane of the box.
	 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
	 * @memberOf module:twgl/m4
	 */
	function frustum(left, right, bottom, top, near, far, dst) {
	  dst = dst || new MatType(16);

	  const dx = (right - left);
	  const dy = (top - bottom);
	  const dz = (near - far);

	  dst[ 0] = 2 * near / dx;
	  dst[ 1] = 0;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = 2 * near / dy;
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = (left + right) / dx;
	  dst[ 9] = (top + bottom) / dy;
	  dst[10] = far / dz;
	  dst[11] = -1;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = near * far / dz;
	  dst[15] = 0;

	  return dst;
	}

	let xAxis;
	let yAxis;
	let zAxis;

	/**
	 * Computes a 4-by-4 look-at transformation.
	 *
	 * This is a matrix which positions the camera itself. If you want
	 * a view matrix (a matrix which moves things in front of the camera)
	 * take the inverse of this.
	 *
	 * @param {module:twgl/v3.Vec3} eye The position of the eye.
	 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
	 * @param {module:twgl/v3.Vec3} up A vector pointing up.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The look-at matrix.
	 * @memberOf module:twgl/m4
	 */
	function lookAt(eye, target, up, dst) {
	  dst = dst || new MatType(16);

	  xAxis = xAxis || create();
	  yAxis = yAxis || create();
	  zAxis = zAxis || create();

	  normalize$1(
	      subtract(eye, target, zAxis), zAxis);
	  normalize$1(cross(up, zAxis, xAxis), xAxis);
	  normalize$1(cross(zAxis, xAxis, yAxis), yAxis);

	  dst[ 0] = xAxis[0];
	  dst[ 1] = xAxis[1];
	  dst[ 2] = xAxis[2];
	  dst[ 3] = 0;
	  dst[ 4] = yAxis[0];
	  dst[ 5] = yAxis[1];
	  dst[ 6] = yAxis[2];
	  dst[ 7] = 0;
	  dst[ 8] = zAxis[0];
	  dst[ 9] = zAxis[1];
	  dst[10] = zAxis[2];
	  dst[11] = 0;
	  dst[12] = eye[0];
	  dst[13] = eye[1];
	  dst[14] = eye[2];
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which translates by the given vector v.
	 * @param {module:twgl/v3.Vec3} v The vector by
	 *     which to translate.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The translation matrix.
	 * @memberOf module:twgl/m4
	 */
	function translation(v, dst) {
	  dst = dst || new MatType(16);

	  dst[ 0] = 1;
	  dst[ 1] = 0;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = 1;
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = 0;
	  dst[ 9] = 0;
	  dst[10] = 1;
	  dst[11] = 0;
	  dst[12] = v[0];
	  dst[13] = v[1];
	  dst[14] = v[2];
	  dst[15] = 1;
	  return dst;
	}

	/**
	 * Translates the given 4-by-4 matrix by the given vector v.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} v The vector by
	 *     which to translate.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The translated matrix.
	 * @memberOf module:twgl/m4
	 */
	function translate(m, v, dst) {
	  dst = dst || new MatType(16);

	  const v0 = v[0];
	  const v1 = v[1];
	  const v2 = v[2];
	  const m00 = m[0];
	  const m01 = m[1];
	  const m02 = m[2];
	  const m03 = m[3];
	  const m10 = m[1 * 4 + 0];
	  const m11 = m[1 * 4 + 1];
	  const m12 = m[1 * 4 + 2];
	  const m13 = m[1 * 4 + 3];
	  const m20 = m[2 * 4 + 0];
	  const m21 = m[2 * 4 + 1];
	  const m22 = m[2 * 4 + 2];
	  const m23 = m[2 * 4 + 3];
	  const m30 = m[3 * 4 + 0];
	  const m31 = m[3 * 4 + 1];
	  const m32 = m[3 * 4 + 2];
	  const m33 = m[3 * 4 + 3];

	  if (m !== dst) {
	    dst[ 0] = m00;
	    dst[ 1] = m01;
	    dst[ 2] = m02;
	    dst[ 3] = m03;
	    dst[ 4] = m10;
	    dst[ 5] = m11;
	    dst[ 6] = m12;
	    dst[ 7] = m13;
	    dst[ 8] = m20;
	    dst[ 9] = m21;
	    dst[10] = m22;
	    dst[11] = m23;
	  }

	  dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
	  dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
	  dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
	  dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotation matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotationX(angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[ 0] = 1;
	  dst[ 1] = 0;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = c;
	  dst[ 6] = s;
	  dst[ 7] = 0;
	  dst[ 8] = 0;
	  dst[ 9] = -s;
	  dst[10] = c;
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Rotates the given 4-by-4 matrix around the x-axis by the given
	 * angle.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotated matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotateX(m, angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const m10 = m[4];
	  const m11 = m[5];
	  const m12 = m[6];
	  const m13 = m[7];
	  const m20 = m[8];
	  const m21 = m[9];
	  const m22 = m[10];
	  const m23 = m[11];
	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[4]  = c * m10 + s * m20;
	  dst[5]  = c * m11 + s * m21;
	  dst[6]  = c * m12 + s * m22;
	  dst[7]  = c * m13 + s * m23;
	  dst[8]  = c * m20 - s * m10;
	  dst[9]  = c * m21 - s * m11;
	  dst[10] = c * m22 - s * m12;
	  dst[11] = c * m23 - s * m13;

	  if (m !== dst) {
	    dst[ 0] = m[ 0];
	    dst[ 1] = m[ 1];
	    dst[ 2] = m[ 2];
	    dst[ 3] = m[ 3];
	    dst[12] = m[12];
	    dst[13] = m[13];
	    dst[14] = m[14];
	    dst[15] = m[15];
	  }

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotation matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotationY(angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[ 0] = c;
	  dst[ 1] = 0;
	  dst[ 2] = -s;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = 1;
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = s;
	  dst[ 9] = 0;
	  dst[10] = c;
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Rotates the given 4-by-4 matrix around the y-axis by the given
	 * angle.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotated matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotateY(m, angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const m00 = m[0 * 4 + 0];
	  const m01 = m[0 * 4 + 1];
	  const m02 = m[0 * 4 + 2];
	  const m03 = m[0 * 4 + 3];
	  const m20 = m[2 * 4 + 0];
	  const m21 = m[2 * 4 + 1];
	  const m22 = m[2 * 4 + 2];
	  const m23 = m[2 * 4 + 3];
	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[ 0] = c * m00 - s * m20;
	  dst[ 1] = c * m01 - s * m21;
	  dst[ 2] = c * m02 - s * m22;
	  dst[ 3] = c * m03 - s * m23;
	  dst[ 8] = c * m20 + s * m00;
	  dst[ 9] = c * m21 + s * m01;
	  dst[10] = c * m22 + s * m02;
	  dst[11] = c * m23 + s * m03;

	  if (m !== dst) {
	    dst[ 4] = m[ 4];
	    dst[ 5] = m[ 5];
	    dst[ 6] = m[ 6];
	    dst[ 7] = m[ 7];
	    dst[12] = m[12];
	    dst[13] = m[13];
	    dst[14] = m[14];
	    dst[15] = m[15];
	  }

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotation matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotationZ(angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[ 0] = c;
	  dst[ 1] = s;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = -s;
	  dst[ 5] = c;
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = 0;
	  dst[ 9] = 0;
	  dst[10] = 1;
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Rotates the given 4-by-4 matrix around the z-axis by the given
	 * angle.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotated matrix.
	 * @memberOf module:twgl/m4
	 */
	function rotateZ(m, angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  const m00 = m[0 * 4 + 0];
	  const m01 = m[0 * 4 + 1];
	  const m02 = m[0 * 4 + 2];
	  const m03 = m[0 * 4 + 3];
	  const m10 = m[1 * 4 + 0];
	  const m11 = m[1 * 4 + 1];
	  const m12 = m[1 * 4 + 2];
	  const m13 = m[1 * 4 + 3];
	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);

	  dst[ 0] = c * m00 + s * m10;
	  dst[ 1] = c * m01 + s * m11;
	  dst[ 2] = c * m02 + s * m12;
	  dst[ 3] = c * m03 + s * m13;
	  dst[ 4] = c * m10 - s * m00;
	  dst[ 5] = c * m11 - s * m01;
	  dst[ 6] = c * m12 - s * m02;
	  dst[ 7] = c * m13 - s * m03;

	  if (m !== dst) {
	    dst[ 8] = m[ 8];
	    dst[ 9] = m[ 9];
	    dst[10] = m[10];
	    dst[11] = m[11];
	    dst[12] = m[12];
	    dst[13] = m[13];
	    dst[14] = m[14];
	    dst[15] = m[15];
	  }

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which rotates around the given axis by the given
	 * angle.
	 * @param {module:twgl/v3.Vec3} axis The axis
	 *     about which to rotate.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
	 *     around the axis.
	 * @memberOf module:twgl/m4
	 */
	function axisRotation(axis, angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  let x = axis[0];
	  let y = axis[1];
	  let z = axis[2];
	  const n = Math.sqrt(x * x + y * y + z * z);
	  x /= n;
	  y /= n;
	  z /= n;
	  const xx = x * x;
	  const yy = y * y;
	  const zz = z * z;
	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);
	  const oneMinusCosine = 1 - c;

	  dst[ 0] = xx + (1 - xx) * c;
	  dst[ 1] = x * y * oneMinusCosine + z * s;
	  dst[ 2] = x * z * oneMinusCosine - y * s;
	  dst[ 3] = 0;
	  dst[ 4] = x * y * oneMinusCosine - z * s;
	  dst[ 5] = yy + (1 - yy) * c;
	  dst[ 6] = y * z * oneMinusCosine + x * s;
	  dst[ 7] = 0;
	  dst[ 8] = x * z * oneMinusCosine + y * s;
	  dst[ 9] = y * z * oneMinusCosine - x * s;
	  dst[10] = zz + (1 - zz) * c;
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Rotates the given 4-by-4 matrix around the given axis by the
	 * given angle.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} axis The axis
	 *     about which to rotate.
	 * @param {number} angleInRadians The angle by which to rotate (in radians).
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The rotated matrix.
	 * @memberOf module:twgl/m4
	 */
	function axisRotate(m, axis, angleInRadians, dst) {
	  dst = dst || new MatType(16);

	  let x = axis[0];
	  let y = axis[1];
	  let z = axis[2];
	  const n = Math.sqrt(x * x + y * y + z * z);
	  x /= n;
	  y /= n;
	  z /= n;
	  const xx = x * x;
	  const yy = y * y;
	  const zz = z * z;
	  const c = Math.cos(angleInRadians);
	  const s = Math.sin(angleInRadians);
	  const oneMinusCosine = 1 - c;

	  const r00 = xx + (1 - xx) * c;
	  const r01 = x * y * oneMinusCosine + z * s;
	  const r02 = x * z * oneMinusCosine - y * s;
	  const r10 = x * y * oneMinusCosine - z * s;
	  const r11 = yy + (1 - yy) * c;
	  const r12 = y * z * oneMinusCosine + x * s;
	  const r20 = x * z * oneMinusCosine + y * s;
	  const r21 = y * z * oneMinusCosine - x * s;
	  const r22 = zz + (1 - zz) * c;

	  const m00 = m[0];
	  const m01 = m[1];
	  const m02 = m[2];
	  const m03 = m[3];
	  const m10 = m[4];
	  const m11 = m[5];
	  const m12 = m[6];
	  const m13 = m[7];
	  const m20 = m[8];
	  const m21 = m[9];
	  const m22 = m[10];
	  const m23 = m[11];

	  dst[ 0] = r00 * m00 + r01 * m10 + r02 * m20;
	  dst[ 1] = r00 * m01 + r01 * m11 + r02 * m21;
	  dst[ 2] = r00 * m02 + r01 * m12 + r02 * m22;
	  dst[ 3] = r00 * m03 + r01 * m13 + r02 * m23;
	  dst[ 4] = r10 * m00 + r11 * m10 + r12 * m20;
	  dst[ 5] = r10 * m01 + r11 * m11 + r12 * m21;
	  dst[ 6] = r10 * m02 + r11 * m12 + r12 * m22;
	  dst[ 7] = r10 * m03 + r11 * m13 + r12 * m23;
	  dst[ 8] = r20 * m00 + r21 * m10 + r22 * m20;
	  dst[ 9] = r20 * m01 + r21 * m11 + r22 * m21;
	  dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
	  dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

	  if (m !== dst) {
	    dst[12] = m[12];
	    dst[13] = m[13];
	    dst[14] = m[14];
	    dst[15] = m[15];
	  }

	  return dst;
	}

	/**
	 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
	 * the corresponding entry in the given vector; assumes the vector has three
	 * entries.
	 * @param {module:twgl/v3.Vec3} v A vector of
	 *     three entries specifying the factor by which to scale in each dimension.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The scaling matrix.
	 * @memberOf module:twgl/m4
	 */
	function scaling(v, dst) {
	  dst = dst || new MatType(16);

	  dst[ 0] = v[0];
	  dst[ 1] = 0;
	  dst[ 2] = 0;
	  dst[ 3] = 0;
	  dst[ 4] = 0;
	  dst[ 5] = v[1];
	  dst[ 6] = 0;
	  dst[ 7] = 0;
	  dst[ 8] = 0;
	  dst[ 9] = 0;
	  dst[10] = v[2];
	  dst[11] = 0;
	  dst[12] = 0;
	  dst[13] = 0;
	  dst[14] = 0;
	  dst[15] = 1;

	  return dst;
	}

	/**
	 * Scales the given 4-by-4 matrix in each dimension by an amount
	 * given by the corresponding entry in the given vector; assumes the vector has
	 * three entries.
	 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
	 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
	 *     factor by which to scale in each dimension.
	 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
	 * @return {module:twgl/m4.Mat4} The scaled matrix.
	 * @memberOf module:twgl/m4
	 */
	function scale(m, v, dst) {
	  dst = dst || new MatType(16);

	  const v0 = v[0];
	  const v1 = v[1];
	  const v2 = v[2];

	  dst[ 0] = v0 * m[0 * 4 + 0];
	  dst[ 1] = v0 * m[0 * 4 + 1];
	  dst[ 2] = v0 * m[0 * 4 + 2];
	  dst[ 3] = v0 * m[0 * 4 + 3];
	  dst[ 4] = v1 * m[1 * 4 + 0];
	  dst[ 5] = v1 * m[1 * 4 + 1];
	  dst[ 6] = v1 * m[1 * 4 + 2];
	  dst[ 7] = v1 * m[1 * 4 + 3];
	  dst[ 8] = v2 * m[2 * 4 + 0];
	  dst[ 9] = v2 * m[2 * 4 + 1];
	  dst[10] = v2 * m[2 * 4 + 2];
	  dst[11] = v2 * m[2 * 4 + 3];

	  if (m !== dst) {
	    dst[12] = m[12];
	    dst[13] = m[13];
	    dst[14] = m[14];
	    dst[15] = m[15];
	  }

	  return dst;
	}

	/**
	 * Takes a 4-by-4 matrix and a vector with 3 entries,
	 * interprets the vector as a point, transforms that point by the matrix, and
	 * returns the result as a vector with 3 entries.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} v The point.
	 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
	 * @return {module:twgl/v3.Vec3} The transformed point.
	 * @memberOf module:twgl/m4
	 */
	function transformPoint(m, v, dst) {
	  dst = dst || create();
	  const v0 = v[0];
	  const v1 = v[1];
	  const v2 = v[2];
	  const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

	  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
	  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
	  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

	  return dst;
	}

	/**
	 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
	 * direction, transforms that direction by the matrix, and returns the result;
	 * assumes the transformation of 3-dimensional space represented by the matrix
	 * is parallel-preserving, i.e. any combination of rotation, scaling and
	 * translation, but not a perspective distortion. Returns a vector with 3
	 * entries.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} v The direction.
	 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
	 * @return {module:twgl/v3.Vec3} The transformed direction.
	 * @memberOf module:twgl/m4
	 */
	function transformDirection(m, v, dst) {
	  dst = dst || create();

	  const v0 = v[0];
	  const v1 = v[1];
	  const v2 = v[2];

	  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
	  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
	  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

	  return dst;
	}

	/**
	 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
	 * as a normal to a surface, and computes a vector which is normal upon
	 * transforming that surface by the matrix. The effect of this function is the
	 * same as transforming v (as a direction) by the inverse-transpose of m.  This
	 * function assumes the transformation of 3-dimensional space represented by the
	 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
	 * translation, but not a perspective distortion.  Returns a vector with 3
	 * entries.
	 * @param {module:twgl/m4.Mat4} m The matrix.
	 * @param {module:twgl/v3.Vec3} v The normal.
	 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
	 * @return {module:twgl/v3.Vec3} The transformed normal.
	 * @memberOf module:twgl/m4
	 */
	function transformNormal(m, v, dst) {
	  dst = dst || create();
	  const mi = inverse(m);
	  const v0 = v[0];
	  const v1 = v[1];
	  const v2 = v[2];

	  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
	  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
	  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

	  return dst;
	}

	var m4 = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  axisRotate: axisRotate,
	  axisRotation: axisRotation,
	  copy: copy$1,
	  frustum: frustum,
	  getAxis: getAxis,
	  getTranslation: getTranslation,
	  identity: identity,
	  inverse: inverse,
	  lookAt: lookAt,
	  multiply: multiply$1,
	  negate: negate$1,
	  ortho: ortho,
	  perspective: perspective,
	  rotateX: rotateX,
	  rotateY: rotateY,
	  rotateZ: rotateZ,
	  rotationX: rotationX,
	  rotationY: rotationY,
	  rotationZ: rotationZ,
	  scale: scale,
	  scaling: scaling,
	  setAxis: setAxis,
	  setDefaultType: setDefaultType$1,
	  setTranslation: setTranslation,
	  transformDirection: transformDirection,
	  transformNormal: transformNormal,
	  transformPoint: transformPoint,
	  translate: translate,
	  translation: translation,
	  transpose: transpose
	});

	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	/* DataType */
	const BYTE                           = 0x1400;
	const UNSIGNED_BYTE                  = 0x1401;
	const SHORT                          = 0x1402;
	const UNSIGNED_SHORT                 = 0x1403;
	const INT                            = 0x1404;
	const UNSIGNED_INT                   = 0x1405;
	const FLOAT                          = 0x1406;

	/**
	 * Get the GL type for a typedArray
	 * @param {ArrayBufferView} typedArray a typedArray
	 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
	 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
	 * @memberOf module:twgl/typedArray
	 */
	function getGLTypeForTypedArray(typedArray) {
	  if (typedArray instanceof Int8Array)         { return BYTE; }           // eslint-disable-line
	  if (typedArray instanceof Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
	  if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
	  if (typedArray instanceof Int16Array)        { return SHORT; }          // eslint-disable-line
	  if (typedArray instanceof Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
	  if (typedArray instanceof Int32Array)        { return INT; }            // eslint-disable-line
	  if (typedArray instanceof Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
	  if (typedArray instanceof Float32Array)      { return FLOAT; }          // eslint-disable-line
	  throw new Error('unsupported typed array type');
	}

	/**
	 * Get the GL type for a typedArray type
	 * @param {ArrayBufferView} typedArrayType a typedArray constructor
	 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
	 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
	 * @memberOf module:twgl/typedArray
	 */
	function getGLTypeForTypedArrayType(typedArrayType) {
	  if (typedArrayType === Int8Array)         { return BYTE; }           // eslint-disable-line
	  if (typedArrayType === Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
	  if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
	  if (typedArrayType === Int16Array)        { return SHORT; }          // eslint-disable-line
	  if (typedArrayType === Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
	  if (typedArrayType === Int32Array)        { return INT; }            // eslint-disable-line
	  if (typedArrayType === Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
	  if (typedArrayType === Float32Array)      { return FLOAT; }          // eslint-disable-line
	  throw new Error('unsupported typed array type');
	}

	const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
	  ? function isArrayBufferOrSharedArrayBuffer(a) {
	    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
	  }
	  : function isArrayBuffer(a) {
	    return a && a.buffer && a.buffer instanceof ArrayBuffer;
	  };

	function error(...args) {
	  console.error(...args);
	}

	function isBuffer(gl, t) {
	  return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
	}

	function isShader(gl, t) {
	  return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
	}

	function isTexture(gl, t) {
	  return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
	}

	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	const STATIC_DRAW                  = 0x88e4;
	const ARRAY_BUFFER$1                 = 0x8892;
	const ELEMENT_ARRAY_BUFFER         = 0x8893;
	const BUFFER_SIZE                  = 0x8764;

	const BYTE$1                         = 0x1400;
	const UNSIGNED_BYTE$1                = 0x1401;
	const SHORT$1                        = 0x1402;
	const UNSIGNED_SHORT$1               = 0x1403;
	const INT$1                          = 0x1404;
	const UNSIGNED_INT$1                 = 0x1405;
	const FLOAT$1                        = 0x1406;
	const defaults = {
	  attribPrefix: "",
	};

	function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
	  gl.bindBuffer(type, buffer);
	  gl.bufferData(type, array, drawType || STATIC_DRAW);
	}

	/**
	 * Given typed array creates a WebGLBuffer and copies the typed array
	 * into it.
	 *
	 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
	 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
	 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
	 * @return {WebGLBuffer} the created WebGLBuffer
	 * @memberOf module:twgl/attributes
	 */
	function createBufferFromTypedArray(gl, typedArray, type, drawType) {
	  if (isBuffer(gl, typedArray)) {
	    return typedArray;
	  }
	  type = type || ARRAY_BUFFER$1;
	  const buffer = gl.createBuffer();
	  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
	  return buffer;
	}

	function isIndices(name) {
	  return name === "indices";
	}

	// This is really just a guess. Though I can't really imagine using
	// anything else? Maybe for some compression?
	function getNormalizationForTypedArray(typedArray) {
	  if (typedArray instanceof Int8Array)    { return true; }  // eslint-disable-line
	  if (typedArray instanceof Uint8Array)   { return true; }  // eslint-disable-line
	  return false;
	}

	// This is really just a guess. Though I can't really imagine using
	// anything else? Maybe for some compression?
	function getNormalizationForTypedArrayType(typedArrayType) {
	  if (typedArrayType === Int8Array)    { return true; }  // eslint-disable-line
	  if (typedArrayType === Uint8Array)   { return true; }  // eslint-disable-line
	  return false;
	}

	function getArray(array) {
	  return array.length ? array : array.data;
	}

	const texcoordRE = /coord|texture/i;
	const colorRE = /color|colour/i;

	function guessNumComponentsFromName(name, length) {
	  let numComponents;
	  if (texcoordRE.test(name)) {
	    numComponents = 2;
	  } else if (colorRE.test(name)) {
	    numComponents = 4;
	  } else {
	    numComponents = 3;  // position, normals, indices ...
	  }

	  if (length % numComponents > 0) {
	    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
	  }

	  return numComponents;
	}

	function getNumComponents(array, arrayName) {
	  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
	}

	function makeTypedArray(array, name) {
	  if (isArrayBuffer(array)) {
	    return array;
	  }

	  if (isArrayBuffer(array.data)) {
	    return array.data;
	  }

	  if (Array.isArray(array)) {
	    array = {
	      data: array,
	    };
	  }

	  let Type = array.type;
	  if (!Type) {
	    if (isIndices(name)) {
	      Type = Uint16Array;
	    } else {
	      Type = Float32Array;
	    }
	  }
	  return new Type(array.data);
	}

	/**
	 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
	 * for the attribute.
	 *
	 * @typedef {Object} AttribInfo
	 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
	 *    disabled and set to this constant value and all other values will be ignored.
	 * @property {number} [numComponents] the number of components for this attribute.
	 * @property {number} [size] synonym for `numComponents`.
	 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
	 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
	 * @property {number} [offset] offset into buffer in bytes. Default = 0
	 * @property {number} [stride] the stride in bytes per element. Default = 0
	 * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
	 *    where as anything else = do call it with this value
	 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
	 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
	 * @memberOf module:twgl
	 */

	/**
	 * Use this type of array spec when TWGL can't guess the type or number of components of an array
	 * @typedef {Object} FullArraySpec
	 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
	 *    disabled and set to this constant value and all other values will be ignored.
	 * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
	 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
	 *    If `coord` is in the name assumes `numComponents = 2`.
	 *    If `color` is in the name assumes `numComponents = 4`.
	 *    otherwise assumes `numComponents = 3`
	 * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
	 * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
	 * @property {number} [size] synonym for `numComponents`.
	 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
	 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
	 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
	 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
	 *    where as anything else = do call it with this value
	 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
	 * @property {string} [name] synonym for `attrib`.
	 * @property {string} [attribName] synonym for `attrib`.
	 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
	 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
	 *    to provide this. Example:
	 *
	 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
	 *           position: [1, 2, 3, ... ],
	 *         });
	 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
	 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
	 *         });
	 *
	 * @memberOf module:twgl
	 */

	/**
	 * An individual array in {@link module:twgl.Arrays}
	 *
	 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
	 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
	 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
	 *
	 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
	 * @memberOf module:twgl
	 */

	/**
	 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
	 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
	 *
	 *     Bare JavaScript Arrays
	 *
	 *         var arrays = {
	 *            position: [-1, 1, 0],
	 *            normal: [0, 1, 0],
	 *            ...
	 *         }
	 *
	 *     Bare TypedArrays
	 *
	 *         var arrays = {
	 *            position: new Float32Array([-1, 1, 0]),
	 *            color: new Uint8Array([255, 128, 64, 255]),
	 *            ...
	 *         }
	 *
	 * *   Will guess at `numComponents` if not specified based on name.
	 *
	 *     If `coord` is in the name assumes `numComponents = 2`
	 *
	 *     If `color` is in the name assumes `numComponents = 4`
	 *
	 *     otherwise assumes `numComponents = 3`
	 *
	 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
	 *
	 *     var arrays = {
	 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
	 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
	 *     };
	 *
	 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
	 * @memberOf module:twgl
	 */


	/**
	 * Creates a set of attribute data and WebGLBuffers from set of arrays
	 *
	 * Given
	 *
	 *      var arrays = {
	 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
	 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
	 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
	 *      };
	 *
	 * returns something like
	 *
	 *      var attribs = {
	 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
	 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
	 *      };
	 *
	 * notes:
	 *
	 * *   Arrays can take various forms
	 *
	 *     Bare JavaScript Arrays
	 *
	 *         var arrays = {
	 *            position: [-1, 1, 0],
	 *            normal: [0, 1, 0],
	 *            ...
	 *         }
	 *
	 *     Bare TypedArrays
	 *
	 *         var arrays = {
	 *            position: new Float32Array([-1, 1, 0]),
	 *            color: new Uint8Array([255, 128, 64, 255]),
	 *            ...
	 *         }
	 *
	 * *   Will guess at `numComponents` if not specified based on name.
	 *
	 *     If `coord` is in the name assumes `numComponents = 2`
	 *
	 *     If `color` is in the name assumes `numComponents = 4`
	 *
	 *     otherwise assumes `numComponents = 3`
	 *
	 * @param {WebGLRenderingContext} gl The webgl rendering context.
	 * @param {module:twgl.Arrays} arrays The arrays
	 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
	 *   This lets you share buffers. Any arrays you supply will override
	 *   the buffers from srcBufferInfo.
	 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
	 * @memberOf module:twgl/attributes
	 */
	function createAttribsFromArrays(gl, arrays) {
	  const attribs = {};
	  Object.keys(arrays).forEach(function(arrayName) {
	    if (!isIndices(arrayName)) {
	      const array = arrays[arrayName];
	      const attribName = array.attrib || array.name || array.attribName || (defaults.attribPrefix + arrayName);
	      if (array.value) {
	        if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) {
	          throw new Error('array.value is not array or typedarray');
	        }
	        attribs[attribName] = {
	          value: array.value,
	        };
	      } else {
	        let buffer;
	        let type;
	        let normalization;
	        let numComponents;
	        if (array.buffer && array.buffer instanceof WebGLBuffer) {
	          buffer = array.buffer;
	          numComponents = array.numComponents || array.size;
	          type = array.type;
	          normalization = array.normalize;
	        } else if (typeof array === "number" || typeof array.data === "number") {
	          const numValues = array.data || array;
	          const arrayType = array.type || Float32Array;
	          const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
	          type = getGLTypeForTypedArrayType(arrayType);
	          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
	          numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
	          buffer = gl.createBuffer();
	          gl.bindBuffer(ARRAY_BUFFER$1, buffer);
	          gl.bufferData(ARRAY_BUFFER$1, numBytes, array.drawType || STATIC_DRAW);
	        } else {
	          const typedArray = makeTypedArray(array, arrayName);
	          buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
	          type = getGLTypeForTypedArray(typedArray);
	          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
	          numComponents = getNumComponents(array, arrayName);
	        }
	        attribs[attribName] = {
	          buffer:        buffer,
	          numComponents: numComponents,
	          type:          type,
	          normalize:     normalization,
	          stride:        array.stride || 0,
	          offset:        array.offset || 0,
	          divisor:       array.divisor === undefined ? undefined : array.divisor,
	          drawType:      array.drawType,
	        };
	      }
	    }
	  });
	  gl.bindBuffer(ARRAY_BUFFER$1, null);
	  return attribs;
	}

	function getBytesPerValueForGLType(gl, type) {
	  if (type === BYTE$1)           return 1;  // eslint-disable-line
	  if (type === UNSIGNED_BYTE$1)  return 1;  // eslint-disable-line
	  if (type === SHORT$1)          return 2;  // eslint-disable-line
	  if (type === UNSIGNED_SHORT$1) return 2;  // eslint-disable-line
	  if (type === INT$1)            return 4;  // eslint-disable-line
	  if (type === UNSIGNED_INT$1)   return 4;  // eslint-disable-line
	  if (type === FLOAT$1)          return 4;  // eslint-disable-line
	  return 0;
	}

	// Tries to get the number of elements from a set of arrays.
	const positionKeys = ['position', 'positions', 'a_position'];

	function getNumElementsFromAttributes(gl, attribs) {
	  let key;
	  let ii;
	  for (ii = 0; ii < positionKeys.length; ++ii) {
	    key = positionKeys[ii];
	    if (key in attribs) {
	      break;
	    }
	    key = defaults.attribPrefix + key;
	    if (key in attribs) {
	      break;
	    }
	  }
	  if (ii === positionKeys.length) {
	    key = Object.keys(attribs)[0];
	  }
	  const attrib = attribs[key];
	  gl.bindBuffer(ARRAY_BUFFER$1, attrib.buffer);
	  const numBytes = gl.getBufferParameter(ARRAY_BUFFER$1, BUFFER_SIZE);
	  gl.bindBuffer(ARRAY_BUFFER$1, null);

	  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
	  const totalElements = numBytes / bytesPerValue;
	  const numComponents = attrib.numComponents || attrib.size;
	  // TODO: check stride
	  const numElements = totalElements / numComponents;
	  if (numElements % 1 !== 0) {
	    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
	  }
	  return numElements;
	}

	/**
	 * @typedef {Object} BufferInfo
	 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
	 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
	 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
	 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
	 * @memberOf module:twgl
	 */

	/**
	 * Creates a BufferInfo from an object of arrays.
	 *
	 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
	 * {@link module:twgl:drawBufferInfo}.
	 *
	 * Given an object like
	 *
	 *     var arrays = {
	 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
	 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
	 *     };
	 *
	 *  Creates an BufferInfo like this
	 *
	 *     bufferInfo = {
	 *       numElements: 4,        // or whatever the number of elements is
	 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
	 *       attribs: {
	 *         position: { buffer: WebGLBuffer, numComponents: 3, },
	 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
	 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
	 *       },
	 *     };
	 *
	 *  The properties of arrays can be JavaScript arrays in which case the number of components
	 *  will be guessed.
	 *
	 *     var arrays = {
	 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
	 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
	 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
	 *        indices:  [0, 1, 2, 1, 2, 3],
	 *     };
	 *
	 *  They can also be TypedArrays
	 *
	 *     var arrays = {
	 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
	 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
	 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
	 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
	 *     };
	 *
	 *  Or AugmentedTypedArrays
	 *
	 *     var positions = createAugmentedTypedArray(3, 4);
	 *     var texcoords = createAugmentedTypedArray(2, 4);
	 *     var normals   = createAugmentedTypedArray(3, 4);
	 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
	 *
	 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
	 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
	 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
	 *     indices.push([0, 1, 2, 1, 2, 3]);
	 *
	 *     var arrays = {
	 *        position: positions,
	 *        texcoord: texcoords,
	 *        normal:   normals,
	 *        indices:  indices,
	 *     };
	 *
	 * For the last example it is equivalent to
	 *
	 *     var bufferInfo = {
	 *       attribs: {
	 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
	 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
	 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
	 *       },
	 *       indices: gl.createBuffer(),
	 *       numElements: 6,
	 *     };
	 *
	 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
	 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
	 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
	 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
	 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
	 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
	 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
	 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
	 *
	 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	 * @param {module:twgl.Arrays} arrays Your data
	 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
	 *        buffer info to start from. WebGLBuffers etc specified
	 *        in the srcBufferInfo will be used in a new BufferInfo
	 *        with any arrays specified overriding the ones in
	 *        srcBufferInfo.
	 * @return {module:twgl.BufferInfo} A BufferInfo
	 * @memberOf module:twgl/attributes
	 */
	function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
	  const newAttribs = createAttribsFromArrays(gl, arrays);
	  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
	  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
	  const indices = arrays.indices;
	  if (indices) {
	    const newIndices = makeTypedArray(indices, "indices");
	    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
	    bufferInfo.numElements = newIndices.length;
	    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
	  } else if (!bufferInfo.numElements) {
	    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
	  }

	  return bufferInfo;
	}

	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	/**
	 * Gets the gl version as a number
	 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	 * @return {number} version of gl
	 * @private
	 */
	//function getVersionAsNumber(gl) {
	//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
	//}

	/**
	 * Check if context is WebGL 2.0
	 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
	 * @return {bool} true if it's WebGL 2.0
	 * @memberOf module:twgl
	 */
	function isWebGL2(gl) {
	  // This is the correct check but it's slow
	  //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
	  // This might also be the correct check but I'm assuming it's slow-ish
	  // return gl instanceof WebGL2RenderingContext;
	  return !!gl.texStorage2D;
	}

	/*
	 * Copyright 2019 Gregg Tavares
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a
	 * copy of this software and associated documentation files (the "Software"),
	 * to deal in the Software without restriction, including without limitation
	 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the
	 * Software is furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
	 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	 * DEALINGS IN THE SOFTWARE.
	 */

	/**
	 * Low level shader program related functions
	 *
	 * You should generally not need to use these functions. They are provided
	 * for those cases where you're doing something out of the ordinary
	 * and you need lower level access.
	 *
	 * For backward compatibility they are available at both `twgl.programs` and `twgl`
	 * itself
	 *
	 * See {@link module:twgl} for core functions
	 *
	 * @module twgl/programs
	 */

	const error$1 = error;
	function getElementById(id) {
	  return (typeof document !== 'undefined' && document.getElementById)
	      ? document.getElementById(id)
	      : null;
	}

	const TEXTURE0                       = 0x84c0;

	const ARRAY_BUFFER$1$1                   = 0x8892;
	const ELEMENT_ARRAY_BUFFER$1           = 0x8893;

	const COMPILE_STATUS                 = 0x8b81;
	const LINK_STATUS                    = 0x8b82;
	const FRAGMENT_SHADER                = 0x8b30;
	const VERTEX_SHADER                  = 0x8b31;
	const SEPARATE_ATTRIBS               = 0x8c8d;

	const ACTIVE_UNIFORMS                = 0x8b86;
	const ACTIVE_ATTRIBUTES              = 0x8b89;
	const TRANSFORM_FEEDBACK_VARYINGS    = 0x8c83;
	const ACTIVE_UNIFORM_BLOCKS          = 0x8a36;
	const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER   = 0x8a44;
	const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
	const UNIFORM_BLOCK_DATA_SIZE                     = 0x8a40;
	const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES        = 0x8a43;

	const FLOAT$3                         = 0x1406;
	const FLOAT_VEC2                    = 0x8B50;
	const FLOAT_VEC3                    = 0x8B51;
	const FLOAT_VEC4                    = 0x8B52;
	const INT$3                           = 0x1404;
	const INT_VEC2                      = 0x8B53;
	const INT_VEC3                      = 0x8B54;
	const INT_VEC4                      = 0x8B55;
	const BOOL                          = 0x8B56;
	const BOOL_VEC2                     = 0x8B57;
	const BOOL_VEC3                     = 0x8B58;
	const BOOL_VEC4                     = 0x8B59;
	const FLOAT_MAT2                    = 0x8B5A;
	const FLOAT_MAT3                    = 0x8B5B;
	const FLOAT_MAT4                    = 0x8B5C;
	const SAMPLER_2D                    = 0x8B5E;
	const SAMPLER_CUBE                  = 0x8B60;
	const SAMPLER_3D                    = 0x8B5F;
	const SAMPLER_2D_SHADOW             = 0x8B62;
	const FLOAT_MAT2x3                  = 0x8B65;
	const FLOAT_MAT2x4                  = 0x8B66;
	const FLOAT_MAT3x2                  = 0x8B67;
	const FLOAT_MAT3x4                  = 0x8B68;
	const FLOAT_MAT4x2                  = 0x8B69;
	const FLOAT_MAT4x3                  = 0x8B6A;
	const SAMPLER_2D_ARRAY              = 0x8DC1;
	const SAMPLER_2D_ARRAY_SHADOW       = 0x8DC4;
	const SAMPLER_CUBE_SHADOW           = 0x8DC5;
	const UNSIGNED_INT$3                  = 0x1405;
	const UNSIGNED_INT_VEC2             = 0x8DC6;
	const UNSIGNED_INT_VEC3             = 0x8DC7;
	const UNSIGNED_INT_VEC4             = 0x8DC8;
	const INT_SAMPLER_2D                = 0x8DCA;
	const INT_SAMPLER_3D                = 0x8DCB;
	const INT_SAMPLER_CUBE              = 0x8DCC;
	const INT_SAMPLER_2D_ARRAY          = 0x8DCF;
	const UNSIGNED_INT_SAMPLER_2D       = 0x8DD2;
	const UNSIGNED_INT_SAMPLER_3D       = 0x8DD3;
	const UNSIGNED_INT_SAMPLER_CUBE     = 0x8DD4;
	const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;

	const TEXTURE_2D$1                    = 0x0DE1;
	const TEXTURE_CUBE_MAP$1              = 0x8513;
	const TEXTURE_3D$1                    = 0x806F;
	const TEXTURE_2D_ARRAY$1              = 0x8C1A;

	const typeMap = {};

	/**
	 * Returns the corresponding bind point for a given sampler type
	 */
	function getBindPointForSamplerType(gl, type) {
	  return typeMap[type].bindPoint;
	}

	// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
	// this code could be a lot smaller but that is sadly really slow (T_T)

	function floatSetter(gl, location) {
	  return function(v) {
	    gl.uniform1f(location, v);
	  };
	}

	function floatArraySetter(gl, location) {
	  return function(v) {
	    gl.uniform1fv(location, v);
	  };
	}

	function floatVec2Setter(gl, location) {
	  return function(v) {
	    gl.uniform2fv(location, v);
	  };
	}

	function floatVec3Setter(gl, location) {
	  return function(v) {
	    gl.uniform3fv(location, v);
	  };
	}

	function floatVec4Setter(gl, location) {
	  return function(v) {
	    gl.uniform4fv(location, v);
	  };
	}

	function intSetter(gl, location) {
	  return function(v) {
	    gl.uniform1i(location, v);
	  };
	}

	function intArraySetter(gl, location) {
	  return function(v) {
	    gl.uniform1iv(location, v);
	  };
	}

	function intVec2Setter(gl, location) {
	  return function(v) {
	    gl.uniform2iv(location, v);
	  };
	}

	function intVec3Setter(gl, location) {
	  return function(v) {
	    gl.uniform3iv(location, v);
	  };
	}

	function intVec4Setter(gl, location) {
	  return function(v) {
	    gl.uniform4iv(location, v);
	  };
	}

	function uintSetter(gl, location) {
	  return function(v) {
	    gl.uniform1ui(location, v);
	  };
	}

	function uintArraySetter(gl, location) {
	  return function(v) {
	    gl.uniform1uiv(location, v);
	  };
	}

	function uintVec2Setter(gl, location) {
	  return function(v) {
	    gl.uniform2uiv(location, v);
	  };
	}

	function uintVec3Setter(gl, location) {
	  return function(v) {
	    gl.uniform3uiv(location, v);
	  };
	}

	function uintVec4Setter(gl, location) {
	  return function(v) {
	    gl.uniform4uiv(location, v);
	  };
	}

	function floatMat2Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix2fv(location, false, v);
	  };
	}

	function floatMat3Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix3fv(location, false, v);
	  };
	}

	function floatMat4Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix4fv(location, false, v);
	  };
	}

	function floatMat23Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix2x3fv(location, false, v);
	  };
	}

	function floatMat32Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix3x2fv(location, false, v);
	  };
	}

	function floatMat24Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix2x4fv(location, false, v);
	  };
	}

	function floatMat42Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix4x2fv(location, false, v);
	  };
	}

	function floatMat34Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix3x4fv(location, false, v);
	  };
	}

	function floatMat43Setter(gl, location) {
	  return function(v) {
	    gl.uniformMatrix4x3fv(location, false, v);
	  };
	}

	function samplerSetter(gl, type, unit, location) {
	  const bindPoint = getBindPointForSamplerType(gl, type);
	  return isWebGL2(gl) ? function(textureOrPair) {
	    let texture;
	    let sampler;
	    if (isTexture(gl, textureOrPair)) {
	      texture = textureOrPair;
	      sampler = null;
	    } else {
	      texture = textureOrPair.texture;
	      sampler = textureOrPair.sampler;
	    }
	    gl.uniform1i(location, unit);
	    gl.activeTexture(TEXTURE0 + unit);
	    gl.bindTexture(bindPoint, texture);
	    gl.bindSampler(unit, sampler);
	  } : function(texture) {
	    gl.uniform1i(location, unit);
	    gl.activeTexture(TEXTURE0 + unit);
	    gl.bindTexture(bindPoint, texture);
	  };
	}

	function samplerArraySetter(gl, type, unit, location, size) {
	  const bindPoint = getBindPointForSamplerType(gl, type);
	  const units = new Int32Array(size);
	  for (let ii = 0; ii < size; ++ii) {
	    units[ii] = unit + ii;
	  }

	  return isWebGL2(gl) ? function(textures) {
	    gl.uniform1iv(location, units);
	    textures.forEach(function(textureOrPair, index) {
	      gl.activeTexture(TEXTURE0 + units[index]);
	      let texture;
	      let sampler;
	      if (isTexture(gl, textureOrPair)) {
	        texture = textureOrPair;
	        sampler = null;
	      } else {
	        texture = textureOrPair.texture;
	        sampler = textureOrPair.sampler;
	      }
	      gl.bindSampler(unit, sampler);
	      gl.bindTexture(bindPoint, texture);
	    });
	  } : function(textures) {
	    gl.uniform1iv(location, units);
	    textures.forEach(function(texture, index) {
	      gl.activeTexture(TEXTURE0 + units[index]);
	      gl.bindTexture(bindPoint, texture);
	    });
	  };
	}

	typeMap[FLOAT$3]                         = { Type: Float32Array, size:  4, setter: floatSetter,      arraySetter: floatArraySetter, };
	typeMap[FLOAT_VEC2]                    = { Type: Float32Array, size:  8, setter: floatVec2Setter,  };
	typeMap[FLOAT_VEC3]                    = { Type: Float32Array, size: 12, setter: floatVec3Setter,  };
	typeMap[FLOAT_VEC4]                    = { Type: Float32Array, size: 16, setter: floatVec4Setter,  };
	typeMap[INT$3]                           = { Type: Int32Array,   size:  4, setter: intSetter,        arraySetter: intArraySetter, };
	typeMap[INT_VEC2]                      = { Type: Int32Array,   size:  8, setter: intVec2Setter,    };
	typeMap[INT_VEC3]                      = { Type: Int32Array,   size: 12, setter: intVec3Setter,    };
	typeMap[INT_VEC4]                      = { Type: Int32Array,   size: 16, setter: intVec4Setter,    };
	typeMap[UNSIGNED_INT$3]                  = { Type: Uint32Array,  size:  4, setter: uintSetter,       arraySetter: uintArraySetter, };
	typeMap[UNSIGNED_INT_VEC2]             = { Type: Uint32Array,  size:  8, setter: uintVec2Setter,   };
	typeMap[UNSIGNED_INT_VEC3]             = { Type: Uint32Array,  size: 12, setter: uintVec3Setter,   };
	typeMap[UNSIGNED_INT_VEC4]             = { Type: Uint32Array,  size: 16, setter: uintVec4Setter,   };
	typeMap[BOOL]                          = { Type: Uint32Array,  size:  4, setter: intSetter,        arraySetter: intArraySetter, };
	typeMap[BOOL_VEC2]                     = { Type: Uint32Array,  size:  8, setter: intVec2Setter,    };
	typeMap[BOOL_VEC3]                     = { Type: Uint32Array,  size: 12, setter: intVec3Setter,    };
	typeMap[BOOL_VEC4]                     = { Type: Uint32Array,  size: 16, setter: intVec4Setter,    };
	typeMap[FLOAT_MAT2]                    = { Type: Float32Array, size: 16, setter: floatMat2Setter,  };
	typeMap[FLOAT_MAT3]                    = { Type: Float32Array, size: 36, setter: floatMat3Setter,  };
	typeMap[FLOAT_MAT4]                    = { Type: Float32Array, size: 64, setter: floatMat4Setter,  };
	typeMap[FLOAT_MAT2x3]                  = { Type: Float32Array, size: 24, setter: floatMat23Setter, };
	typeMap[FLOAT_MAT2x4]                  = { Type: Float32Array, size: 32, setter: floatMat24Setter, };
	typeMap[FLOAT_MAT3x2]                  = { Type: Float32Array, size: 24, setter: floatMat32Setter, };
	typeMap[FLOAT_MAT3x4]                  = { Type: Float32Array, size: 48, setter: floatMat34Setter, };
	typeMap[FLOAT_MAT4x2]                  = { Type: Float32Array, size: 32, setter: floatMat42Setter, };
	typeMap[FLOAT_MAT4x3]                  = { Type: Float32Array, size: 48, setter: floatMat43Setter, };
	typeMap[SAMPLER_2D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
	typeMap[SAMPLER_CUBE]                  = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
	typeMap[SAMPLER_3D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
	typeMap[SAMPLER_2D_SHADOW]             = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
	typeMap[SAMPLER_2D_ARRAY]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
	typeMap[SAMPLER_2D_ARRAY_SHADOW]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
	typeMap[SAMPLER_CUBE_SHADOW]           = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
	typeMap[INT_SAMPLER_2D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
	typeMap[INT_SAMPLER_3D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
	typeMap[INT_SAMPLER_CUBE]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
	typeMap[INT_SAMPLER_2D_ARRAY]          = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
	typeMap[UNSIGNED_INT_SAMPLER_2D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
	typeMap[UNSIGNED_INT_SAMPLER_3D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
	typeMap[UNSIGNED_INT_SAMPLER_CUBE]     = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
	typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };

	function floatAttribSetter(gl, index) {
	  return function(b) {
	    if (b.value) {
	      gl.disableVertexAttribArray(index);
	      switch (b.value.length) {
	        case 4:
	          gl.vertexAttrib4fv(index, b.value);
	          break;
	        case 3:
	          gl.vertexAttrib3fv(index, b.value);
	          break;
	        case 2:
	          gl.vertexAttrib2fv(index, b.value);
	          break;
	        case 1:
	          gl.vertexAttrib1fv(index, b.value);
	          break;
	        default:
	          throw new Error('the length of a float constant value must be between 1 and 4!');
	      }
	    } else {
	      gl.bindBuffer(ARRAY_BUFFER$1$1, b.buffer);
	      gl.enableVertexAttribArray(index);
	      gl.vertexAttribPointer(
	          index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
	      if (b.divisor !== undefined) {
	        gl.vertexAttribDivisor(index, b.divisor);
	      }
	    }
	  };
	}

	function intAttribSetter(gl, index) {
	  return function(b) {
	    if (b.value) {
	      gl.disableVertexAttribArray(index);
	      if (b.value.length === 4) {
	        gl.vertexAttrib4iv(index, b.value);
	      } else {
	        throw new Error('The length of an integer constant value must be 4!');
	      }
	    } else {
	      gl.bindBuffer(ARRAY_BUFFER$1$1, b.buffer);
	      gl.enableVertexAttribArray(index);
	      gl.vertexAttribIPointer(
	          index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
	      if (b.divisor !== undefined) {
	        gl.vertexAttribDivisor(index, b.divisor);
	      }
	    }
	  };
	}

	function uintAttribSetter(gl, index) {
	  return function(b) {
	    if (b.value) {
	      gl.disableVertexAttribArray(index);
	      if (b.value.length === 4) {
	        gl.vertexAttrib4uiv(index, b.value);
	      } else {
	        throw new Error('The length of an unsigned integer constant value must be 4!');
	      }
	    } else {
	      gl.bindBuffer(ARRAY_BUFFER$1$1, b.buffer);
	      gl.enableVertexAttribArray(index);
	      gl.vertexAttribIPointer(
	          index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
	      if (b.divisor !== undefined) {
	        gl.vertexAttribDivisor(index, b.divisor);
	      }
	    }
	  };
	}

	function matAttribSetter(gl, index, typeInfo) {
	  const defaultSize = typeInfo.size;
	  const count = typeInfo.count;

	  return function(b) {
	    gl.bindBuffer(ARRAY_BUFFER$1$1, b.buffer);
	    const numComponents = b.size || b.numComponents || defaultSize;
	    const size = numComponents / count;
	    const type = b.type || FLOAT$3;
	    const typeInfo = typeMap[type];
	    const stride = typeInfo.size * numComponents;
	    const normalize = b.normalize || false;
	    const offset = b.offset || 0;
	    const rowOffset = stride / count;
	    for (let i = 0; i < count; ++i) {
	      gl.enableVertexAttribArray(index + i);
	      gl.vertexAttribPointer(
	          index + i, size, type, normalize, stride, offset + rowOffset * i);
	      if (b.divisor !== undefined) {
	        gl.vertexAttribDivisor(index + i, b.divisor);
	      }
	    }
	  };
	}



	const attrTypeMap = {};
	attrTypeMap[FLOAT$3]             = { size:  4, setter: floatAttribSetter, };
	attrTypeMap[FLOAT_VEC2]        = { size:  8, setter: floatAttribSetter, };
	attrTypeMap[FLOAT_VEC3]        = { size: 12, setter: floatAttribSetter, };
	attrTypeMap[FLOAT_VEC4]        = { size: 16, setter: floatAttribSetter, };
	attrTypeMap[INT$3]               = { size:  4, setter: intAttribSetter,   };
	attrTypeMap[INT_VEC2]          = { size:  8, setter: intAttribSetter,   };
	attrTypeMap[INT_VEC3]          = { size: 12, setter: intAttribSetter,   };
	attrTypeMap[INT_VEC4]          = { size: 16, setter: intAttribSetter,   };
	attrTypeMap[UNSIGNED_INT$3]      = { size:  4, setter: uintAttribSetter,  };
	attrTypeMap[UNSIGNED_INT_VEC2] = { size:  8, setter: uintAttribSetter,  };
	attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter,  };
	attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter,  };
	attrTypeMap[BOOL]              = { size:  4, setter: intAttribSetter,   };
	attrTypeMap[BOOL_VEC2]         = { size:  8, setter: intAttribSetter,   };
	attrTypeMap[BOOL_VEC3]         = { size: 12, setter: intAttribSetter,   };
	attrTypeMap[BOOL_VEC4]         = { size: 16, setter: intAttribSetter,   };
	attrTypeMap[FLOAT_MAT2]        = { size:  4, setter: matAttribSetter,   count: 2, };
	attrTypeMap[FLOAT_MAT3]        = { size:  9, setter: matAttribSetter,   count: 3, };
	attrTypeMap[FLOAT_MAT4]        = { size: 16, setter: matAttribSetter,   count: 4, };

	/**
	 * Error Callback
	 * @callback ErrorCallback
	 * @param {string} msg error message.
	 * @param {number} [lineOffset] amount to add to line number
	 * @memberOf module:twgl
	 */

	function addLineNumbers(src, lineOffset) {
	  lineOffset = lineOffset || 0;
	  ++lineOffset;

	  return src.split("\n").map(function(line, ndx) {
	    return (ndx + lineOffset) + ": " + line;
	  }).join("\n");
	}

	const spaceRE = /^[ \t]*\n/;

	/**
	 * Loads a shader.
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @param {string} shaderSource The shader source.
	 * @param {number} shaderType The type of shader.
	 * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
	 * @return {WebGLShader} The created shader.
	 * @private
	 */
	function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
	  const errFn = opt_errorCallback || error$1;
	  // Create the shader object
	  const shader = gl.createShader(shaderType);

	  // Remove the first end of line because WebGL 2.0 requires
	  // #version 300 es
	  // as the first line. No whitespace allowed before that line
	  // so
	  //
	  // <script>
	  // #version 300 es
	  // </script>
	  //
	  // Has one line before it which is invalid according to GLSL ES 3.00
	  //
	  let lineOffset = 0;
	  if (spaceRE.test(shaderSource)) {
	    lineOffset = 1;
	    shaderSource = shaderSource.replace(spaceRE, '');
	  }

	  // Load the shader source
	  gl.shaderSource(shader, shaderSource);

	  // Compile the shader
	  gl.compileShader(shader);

	  // Check the compile status
	  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
	  if (!compiled) {
	    // Something went wrong during compilation; get the error
	    const lastError = gl.getShaderInfoLog(shader);
	    errFn(addLineNumbers(shaderSource, lineOffset) + "\n*** Error compiling shader: " + lastError);
	    gl.deleteShader(shader);
	    return null;
	  }

	  return shader;
	}

	/**
	 * @typedef {Object} ProgramOptions
	 * @property {function(string)} [errorCallback] callback for errors
	 * @property {Object.<string,number>} [attribLocations] a attribute name to location map
	 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
	 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
	 *   you can pass an array of names.
	 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
	 * @memberOf module:twgl
	 */

	/**
	 * Gets the program options based on all these optional arguments
	 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
	 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
	 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
	 *        on error. If you want something else pass an callback. It's passed an error message.
	 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
	 * @private
	 */
	function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
	  let transformFeedbackVaryings;
	  let transformFeedbackMode;
	  if (typeof opt_locations === 'function') {
	    opt_errorCallback = opt_locations;
	    opt_locations = undefined;
	  }
	  if (typeof opt_attribs === 'function') {
	    opt_errorCallback = opt_attribs;
	    opt_attribs = undefined;
	  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
	    // If we have an errorCallback we can just return this object
	    // Otherwise we need to construct one with default errorCallback
	    if (opt_attribs.errorCallback) {
	      return opt_attribs;
	    }
	    const opt = opt_attribs;
	    opt_errorCallback = opt.errorCallback;
	    opt_attribs = opt.attribLocations;
	    transformFeedbackVaryings = opt.transformFeedbackVaryings;
	    transformFeedbackMode = opt.transformFeedbackMode;
	  }

	  const options = {
	    errorCallback: opt_errorCallback || error$1,
	    transformFeedbackVaryings: transformFeedbackVaryings,
	    transformFeedbackMode: transformFeedbackMode,
	  };

	  if (opt_attribs) {
	    let attribLocations = {};
	    if (Array.isArray(opt_attribs)) {
	      opt_attribs.forEach(function(attrib,  ndx) {
	        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
	      });
	    } else {
	      attribLocations = opt_attribs;
	    }
	    options.attribLocations = attribLocations;
	  }

	  return options;
	}

	const defaultShaderType = [
	  "VERTEX_SHADER",
	  "FRAGMENT_SHADER",
	];

	function getShaderTypeFromScriptType(gl, scriptType) {
	  if (scriptType.indexOf("frag") >= 0) {
	    return FRAGMENT_SHADER;
	  } else if (scriptType.indexOf("vert") >= 0) {
	    return VERTEX_SHADER;
	  }
	  return undefined;
	}

	function deleteShaders(gl, shaders) {
	  shaders.forEach(function(shader) {
	    gl.deleteShader(shader);
	  });
	}

	/**
	 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
	 * program and calls useProgram.
	 *
	 * NOTE: There are 4 signatures for this function
	 *
	 *     twgl.createProgram(gl, [vs, fs], options);
	 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
	 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
	 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
	 *
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
	 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
	 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
	 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
	 *        on error. If you want something else pass an callback. It's passed an error message.
	 * @return {WebGLProgram?} the created program or null if error.
	 * @memberOf module:twgl/programs
	 */
	function createProgram(
	    gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
	  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
	  const realShaders = [];
	  const newShaders = [];
	  for (let ndx = 0; ndx < shaders.length; ++ndx) {
	    let shader = shaders[ndx];
	    if (typeof (shader) === 'string') {
	      const elem = getElementById(shader);
	      const src = elem ? elem.text : shader;
	      let type = gl[defaultShaderType[ndx]];
	      if (elem && elem.type) {
	        type = getShaderTypeFromScriptType(gl, elem.type) || type;
	      }
	      shader = loadShader(gl, src, type, progOptions.errorCallback);
	      newShaders.push(shader);
	    }
	    if (isShader(gl, shader)) {
	      realShaders.push(shader);
	    }
	  }

	  if (realShaders.length !== shaders.length) {
	    progOptions.errorCallback("not enough shaders for program");
	    deleteShaders(gl, newShaders);
	    return null;
	  }

	  const program = gl.createProgram();
	  realShaders.forEach(function(shader) {
	    gl.attachShader(program, shader);
	  });
	  if (progOptions.attribLocations) {
	    Object.keys(progOptions.attribLocations).forEach(function(attrib) {
	      gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
	    });
	  }
	  let varyings = progOptions.transformFeedbackVaryings;
	  if (varyings) {
	    if (varyings.attribs) {
	      varyings = varyings.attribs;
	    }
	    if (!Array.isArray(varyings)) {
	      varyings = Object.keys(varyings);
	    }
	    gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
	  }
	  gl.linkProgram(program);

	  // Check the link status
	  const linked = gl.getProgramParameter(program, LINK_STATUS);
	  if (!linked) {
	    // something went wrong with the link
	    const lastError = gl.getProgramInfoLog(program);
	    progOptions.errorCallback("Error in program linking:" + lastError);

	    gl.deleteProgram(program);
	    deleteShaders(gl, newShaders);
	    return null;
	  }
	  return program;
	}

	/**
	 * Creates a program from 2 sources.
	 *
	 * NOTE: There are 4 signatures for this function
	 *
	 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
	 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
	 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
	 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
	 *
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	 *        to use.
	 * @param {string[]} shaderSources Array of sources for the
	 *        shaders. The first is assumed to be the vertex shader,
	 *        the second the fragment shader.
	 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
	 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
	 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
	 *        on error. If you want something else pass an callback. It's passed an error message.
	 * @return {WebGLProgram?} the created program or null if error.
	 * @memberOf module:twgl/programs
	 */
	function createProgramFromSources(
	    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
	  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
	  const shaders = [];
	  for (let ii = 0; ii < shaderSources.length; ++ii) {
	    const shader = loadShader(
	        gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
	    if (!shader) {
	      return null;
	    }
	    shaders.push(shader);
	  }
	  return createProgram(gl, shaders, progOptions);
	}

	/**
	 * Returns true if attribute/uniform is a reserved/built in
	 *
	 * It makes no sense to me why GL returns these because it's
	 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
	 * with names that start with `gl_` (and `webgl_` in WebGL)
	 *
	 * I can only assume they are there because they might count
	 * when computing the number of uniforms/attributes used when you want to
	 * know if you are near the limit. That doesn't really make sense
	 * to me but the fact that these get returned are in the spec.
	 *
	 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
	 *    `gl.getActiveAttrib`.
	 * @return {bool} true if it's reserved
	 * @private
	 */
	function isBuiltIn(info) {
	  const name = info.name;
	  return name.startsWith("gl_") || name.startsWith("webgl_");
	}

	/**
	 * Creates setter functions for all uniforms of a shader
	 * program.
	 *
	 * @see {@link module:twgl.setUniforms}
	 *
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @param {WebGLProgram} program the program to create setters for.
	 * @returns {Object.<string, function>} an object with a setter by name for each uniform
	 * @memberOf module:twgl/programs
	 */
	function createUniformSetters(gl, program) {
	  let textureUnit = 0;

	  /**
	   * Creates a setter for a uniform of the given program with it's
	   * location embedded in the setter.
	   * @param {WebGLProgram} program
	   * @param {WebGLUniformInfo} uniformInfo
	   * @returns {function} the created setter.
	   */
	  function createUniformSetter(program, uniformInfo) {
	    const location = gl.getUniformLocation(program, uniformInfo.name);
	    const isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");
	    const type = uniformInfo.type;
	    const typeInfo = typeMap[type];
	    if (!typeInfo) {
	      throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
	    }
	    let setter;
	    if (typeInfo.bindPoint) {
	      // it's a sampler
	      const unit = textureUnit;
	      textureUnit += uniformInfo.size;
	      if (isArray) {
	        setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
	      } else {
	        setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
	      }
	    } else {
	      if (typeInfo.arraySetter && isArray) {
	        setter = typeInfo.arraySetter(gl, location);
	      } else {
	        setter = typeInfo.setter(gl, location);
	      }
	    }
	    setter.location = location;
	    return setter;
	  }

	  const uniformSetters = { };
	  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);

	  for (let ii = 0; ii < numUniforms; ++ii) {
	    const uniformInfo = gl.getActiveUniform(program, ii);
	    if (isBuiltIn(uniformInfo)) {
	        continue;
	    }
	    let name = uniformInfo.name;
	    // remove the array suffix.
	    if (name.substr(-3) === "[0]") {
	      name = name.substr(0, name.length - 3);
	    }
	    const setter = createUniformSetter(program, uniformInfo);
	    uniformSetters[name] = setter;
	  }
	  return uniformSetters;
	}

	/**
	 * @typedef {Object} TransformFeedbackInfo
	 * @property {number} index index of transform feedback
	 * @property {number} type GL type
	 * @property {number} size 1 - 4
	 * @memberOf module:twgl
	 */

	/**
	 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @param {WebGLProgram} program an existing WebGLProgram.
	 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
	 * @memberOf module:twgl
	 */
	function createTransformFeedbackInfo(gl, program) {
	  const info = {};
	  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
	  for (let ii = 0; ii < numVaryings; ++ii) {
	    const varying = gl.getTransformFeedbackVarying(program, ii);
	    info[varying.name] = {
	      index: ii,
	      type: varying.type,
	      size: varying.size,
	    };
	  }
	  return info;
	}

	/**
	 * @typedef {Object} UniformData
	 * @property {number} type The WebGL type enum for this uniform
	 * @property {number} size The number of elements for this uniform
	 * @property {number} blockNdx The block index this uniform appears in
	 * @property {number} offset The byte offset in the block for this uniform's value
	 * @memberOf module:twgl
	 */

	/**
	 * The specification for one UniformBlockObject
	 *
	 * @typedef {Object} BlockSpec
	 * @property {number} index The index of the block.
	 * @property {number} size The size in bytes needed for the block
	 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
	 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
	 * @property {bool} usedByVertexShader Self explanatory
	 * @property {bool} usedByFragmentShader Self explanatory
	 * @property {bool} used Self explanatory
	 * @memberOf module:twgl
	 */

	/**
	 * A `UniformBlockSpec` represents the data needed to create and bind
	 * UniformBlockObjects for a given program
	 *
	 * @typedef {Object} UniformBlockSpec
	 * @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
	 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
	 * @memberOf module:twgl
	 */

	/**
	 * Creates a UniformBlockSpec for the given program.
	 *
	 * A UniformBlockSpec represents the data needed to create and bind
	 * UniformBlockObjects
	 *
	 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
	 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
	 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
	 * @memberOf module:twgl/programs
	 */
	function createUniformBlockSpecFromProgram(gl, program) {
	  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
	  const uniformData = [];
	  const uniformIndices = [];

	  for (let ii = 0; ii < numUniforms; ++ii) {
	    uniformIndices.push(ii);
	    uniformData.push({});
	    const uniformInfo = gl.getActiveUniform(program, ii);
	    if (isBuiltIn(uniformInfo)) {
	      break;
	    }
	    // REMOVE [0]?
	    uniformData[ii].name = uniformInfo.name;
	  }

	  [
	    [ "UNIFORM_TYPE", "type" ],
	    [ "UNIFORM_SIZE", "size" ],  // num elements
	    [ "UNIFORM_BLOCK_INDEX", "blockNdx" ],
	    [ "UNIFORM_OFFSET", "offset", ],
	  ].forEach(function(pair) {
	    const pname = pair[0];
	    const key = pair[1];
	    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
	      uniformData[ndx][key] = value;
	    });
	  });

	  const blockSpecs = {};

	  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
	  for (let ii = 0; ii < numUniformBlocks; ++ii) {
	    const name = gl.getActiveUniformBlockName(program, ii);
	    const blockSpec = {
	      index: ii,
	      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
	      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
	      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
	      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
	    };
	    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
	    blockSpecs[name] = blockSpec;
	  }

	  return {
	    blockSpecs: blockSpecs,
	    uniformData: uniformData,
	  };
	}

	/**
	 * Set uniforms and binds related textures.
	 *
	 * example:
	 *
	 *     const programInfo = createProgramInfo(
	 *         gl, ["some-vs", "some-fs"]);
	 *
	 *     const tex1 = gl.createTexture();
	 *     const tex2 = gl.createTexture();
	 *
	 *     ... assume we setup the textures with data ...
	 *
	 *     const uniforms = {
	 *       u_someSampler: tex1,
	 *       u_someOtherSampler: tex2,
	 *       u_someColor: [1,0,0,1],
	 *       u_somePosition: [0,1,1],
	 *       u_someMatrix: [
	 *         1,0,0,0,
	 *         0,1,0,0,
	 *         0,0,1,0,
	 *         0,0,0,0,
	 *       ],
	 *     };
	 *
	 *     gl.useProgram(program);
	 *
	 * This will automatically bind the textures AND set the
	 * uniforms.
	 *
	 *     twgl.setUniforms(programInfo, uniforms);
	 *
	 * For the example above it is equivalent to
	 *
	 *     var texUnit = 0;
	 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
	 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
	 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
	 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
	 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
	 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
	 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
	 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
	 *     gl.uniformMatrix4fv(u_someMatrix, false, [
	 *         1,0,0,0,
	 *         0,1,0,0,
	 *         0,0,1,0,
	 *         0,0,0,0,
	 *       ]);
	 *
	 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
	 *
	 *     const uniforms = {
	 *       u_someSampler: tex1,
	 *       u_someOtherSampler: tex2,
	 *     };
	 *
	 *     const moreUniforms {
	 *       u_someColor: [1,0,0,1],
	 *       u_somePosition: [0,1,1],
	 *       u_someMatrix: [
	 *         1,0,0,0,
	 *         0,1,0,0,
	 *         0,0,1,0,
	 *         0,0,0,0,
	 *       ],
	 *     };
	 *
	 *     twgl.setUniforms(programInfo, uniforms);
	 *     twgl.setUniforms(programInfo, moreUniforms);
	 *
	 * You can also add WebGLSamplers to uniform samplers as in
	 *
	 *     const uniforms = {
	 *       u_someSampler: {
	 *         texture: someWebGLTexture,
	 *         sampler: someWebGLSampler,
	 *       },
	 *     };
	 *
	 * In which case both the sampler and texture will be bound to the
	 * same unit.
	 *
	 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
	 *        `createUniformSetters`.
	 * @param {Object.<string, ?>} values an object with values for the
	 *        uniforms.
	 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
	 *
	 *     const sharedUniforms = {
	 *       u_fogNear: 10,
	 *       u_projection: ...
	 *       ...
	 *     };
	 *
	 *     const localUniforms = {
	 *       u_world: ...
	 *       u_diffuseColor: ...
	 *     };
	 *
	 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
	 *
	 *     // is the same as
	 *
	 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
	 *
	 *     // is the same as
	 *
	 *     twgl.setUniforms(programInfo, sharedUniforms);
	 *     twgl.setUniforms(programInfo, localUniforms};
	 *
	 * @memberOf module:twgl/programs
	 */
	function setUniforms(setters, values) {  // eslint-disable-line
	  const actualSetters = setters.uniformSetters || setters;
	  const numArgs = arguments.length;
	  for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
	    const values = arguments[aNdx];
	    if (Array.isArray(values)) {
	      const numValues = values.length;
	      for (let ii = 0; ii < numValues; ++ii) {
	        setUniforms(actualSetters, values[ii]);
	      }
	    } else {
	      for (const name in values) {
	        const setter = actualSetters[name];
	        if (setter) {
	          setter(values[name]);
	        }
	      }
	    }
	  }
	}

	/**
	 * Creates setter functions for all attributes of a shader
	 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
	 *
	 * @see {@link module:twgl.setAttributes} for example
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
	 * @param {WebGLProgram} program the program to create setters for.
	 * @return {Object.<string, function>} an object with a setter for each attribute by name.
	 * @memberOf module:twgl/programs
	 */
	function createAttributeSetters(gl, program) {
	  const attribSetters = {
	  };

	  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
	  for (let ii = 0; ii < numAttribs; ++ii) {
	    const attribInfo = gl.getActiveAttrib(program, ii);
	    if (isBuiltIn(attribInfo)) {
	        continue;
	    }
	    const index = gl.getAttribLocation(program, attribInfo.name);
	    const typeInfo = attrTypeMap[attribInfo.type];
	    const setter = typeInfo.setter(gl, index, typeInfo);
	    setter.location = index;
	    attribSetters[attribInfo.name] = setter;
	  }

	  return attribSetters;
	}

	/**
	 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
	 *
	 * Example:
	 *
	 *     const program = createProgramFromScripts(
	 *         gl, ["some-vs", "some-fs");
	 *
	 *     const attribSetters = createAttributeSetters(program);
	 *
	 *     const positionBuffer = gl.createBuffer();
	 *     const texcoordBuffer = gl.createBuffer();
	 *
	 *     const attribs = {
	 *       a_position: {buffer: positionBuffer, numComponents: 3},
	 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
	 *     };
	 *
	 *     gl.useProgram(program);
	 *
	 * This will automatically bind the buffers AND set the
	 * attributes.
	 *
	 *     setAttributes(attribSetters, attribs);
	 *
	 * Properties of attribs. For each attrib you can add
	 * properties:
	 *
	 * *   type: the type of data in the buffer. Default = gl.FLOAT
	 * *   normalize: whether or not to normalize the data. Default = false
	 * *   stride: the stride. Default = 0
	 * *   offset: offset into the buffer. Default = 0
	 * *   divisor: the divisor for instances. Default = undefined
	 *
	 * For example if you had 3 value float positions, 2 value
	 * float texcoord and 4 value uint8 colors you'd setup your
	 * attribs like this
	 *
	 *     const attribs = {
	 *       a_position: {buffer: positionBuffer, numComponents: 3},
	 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
	 *       a_color: {
	 *         buffer: colorBuffer,
	 *         numComponents: 4,
	 *         type: gl.UNSIGNED_BYTE,
	 *         normalize: true,
	 *       },
	 *     };
	 *
	 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
	 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
	 * @memberOf module:twgl/programs
	 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
	 */
	function setAttributes(setters, buffers) {
	  for (const name in buffers) {
	    const setter = setters[name];
	    if (setter) {
	      setter(buffers[name]);
	    }
	  }
	}

	/**
	 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
	 *
	 * Example:
	 *
	 *     const programInfo = createProgramInfo(
	 *         gl, ["some-vs", "some-fs");
	 *
	 *     const arrays = {
	 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
	 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
	 *     };
	 *
	 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
	 *
	 *     gl.useProgram(programInfo.program);
	 *
	 * This will automatically bind the buffers AND set the
	 * attributes.
	 *
	 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
	 *
	 * For the example above it is equivalent to
	 *
	 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	 *     gl.enableVertexAttribArray(a_positionLocation);
	 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
	 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
	 *     gl.enableVertexAttribArray(a_texcoordLocation);
	 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
	 *
	 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
	 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
	 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
	 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
	 * @memberOf module:twgl/programs
	 */
	function setBuffersAndAttributes(gl, programInfo, buffers) {
	  if (buffers.vertexArrayObject) {
	    gl.bindVertexArray(buffers.vertexArrayObject);
	  } else {
	    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
	    if (buffers.indices) {
	      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
	    }
	  }
	}

	/**
	 * @typedef {Object} ProgramInfo
	 * @property {WebGLProgram} program A shader program
	 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
	 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
	 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
	 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
	 * @memberOf module:twgl
	 */

	/**
	 * Creates a ProgramInfo from an existing program.
	 *
	 * A ProgramInfo contains
	 *
	 *     programInfo = {
	 *        program: WebGLProgram,
	 *        uniformSetters: object of setters as returned from createUniformSetters,
	 *        attribSetters: object of setters as returned from createAttribSetters,
	 *     }
	 *
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	 *        to use.
	 * @param {WebGLProgram} program an existing WebGLProgram.
	 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
	 * @memberOf module:twgl/programs
	 */
	function createProgramInfoFromProgram(gl, program) {
	  const uniformSetters = createUniformSetters(gl, program);
	  const attribSetters = createAttributeSetters(gl, program);
	  const programInfo = {
	    program: program,
	    uniformSetters: uniformSetters,
	    attribSetters: attribSetters,
	  };

	  if (isWebGL2(gl)) {
	    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
	    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
	  }

	  return programInfo;
	}

	/**
	 * Creates a ProgramInfo from 2 sources.
	 *
	 * A ProgramInfo contains
	 *
	 *     programInfo = {
	 *        program: WebGLProgram,
	 *        uniformSetters: object of setters as returned from createUniformSetters,
	 *        attribSetters: object of setters as returned from createAttribSetters,
	 *     }
	 *
	 * NOTE: There are 4 signatures for this function
	 *
	 *     twgl.createProgramInfo(gl, [vs, fs], options);
	 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
	 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
	 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
	 *
	 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
	 *        to use.
	 * @param {string[]} shaderSources Array of sources for the
	 *        shaders or ids. The first is assumed to be the vertex shader,
	 *        the second the fragment shader.
	 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
	 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
	 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
	 *        on error. If you want something else pass an callback. It's passed an error message.
	 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
	 * @memberOf module:twgl/programs
	 */
	function createProgramInfo(
	    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
	  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
	  let good = true;
	  shaderSources = shaderSources.map(function(source) {
	    // Lets assume if there is no \n it's an id
	    if (source.indexOf("\n") < 0) {
	      const script = getElementById(source);
	      if (!script) {
	        progOptions.errorCallback("no element with id: " + source);
	        good = false;
	      } else {
	        source = script.text;
	      }
	    }
	    return source;
	  });
	  if (!good) {
	    return null;
	  }
	  const program = createProgramFromSources(gl, shaderSources, progOptions);
	  if (!program) {
	    return null;
	  }
	  return createProgramInfoFromProgram(gl, program);
	}

	var core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory();
		}
	}(commonjsGlobal, function () {

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined$1) {
		    /*
		     * Local polyfil of Object.create
		     */
		    var create = Object.create || (function () {
		        function F() {}
		        return function (obj) {
		            var subtype;

		            F.prototype = obj;

		            subtype = new F();

		            F.prototype = null;

		            return subtype;
		        };
		    }());

		    /**
		     * CryptoJS namespace.
		     */
		    var C = {};

		    /**
		     * Library namespace.
		     */
		    var C_lib = C.lib = {};

		    /**
		     * Base object for prototypal inheritance.
		     */
		    var Base = C_lib.Base = (function () {


		        return {
		            /**
		             * Creates a new object that inherits from this object.
		             *
		             * @param {Object} overrides Properties to copy into the new object.
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         field: 'value',
		             *
		             *         method: function () {
		             *         }
		             *     });
		             */
		            extend: function (overrides) {
		                // Spawn
		                var subtype = create(this);

		                // Augment
		                if (overrides) {
		                    subtype.mixIn(overrides);
		                }

		                // Create default initializer
		                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
		                    subtype.init = function () {
		                        subtype.$super.init.apply(this, arguments);
		                    };
		                }

		                // Initializer's prototype is the subtype object
		                subtype.init.prototype = subtype;

		                // Reference supertype
		                subtype.$super = this;

		                return subtype;
		            },

		            /**
		             * Extends this object and runs the init method.
		             * Arguments to create() will be passed to init().
		             *
		             * @return {Object} The new object.
		             *
		             * @static
		             *
		             * @example
		             *
		             *     var instance = MyType.create();
		             */
		            create: function () {
		                var instance = this.extend();
		                instance.init.apply(instance, arguments);

		                return instance;
		            },

		            /**
		             * Initializes a newly created object.
		             * Override this method to add some logic when your objects are created.
		             *
		             * @example
		             *
		             *     var MyType = CryptoJS.lib.Base.extend({
		             *         init: function () {
		             *             // ...
		             *         }
		             *     });
		             */
		            init: function () {
		            },

		            /**
		             * Copies properties into this object.
		             *
		             * @param {Object} properties The properties to mix in.
		             *
		             * @example
		             *
		             *     MyType.mixIn({
		             *         field: 'value'
		             *     });
		             */
		            mixIn: function (properties) {
		                for (var propertyName in properties) {
		                    if (properties.hasOwnProperty(propertyName)) {
		                        this[propertyName] = properties[propertyName];
		                    }
		                }

		                // IE won't copy toString using the loop above
		                if (properties.hasOwnProperty('toString')) {
		                    this.toString = properties.toString;
		                }
		            },

		            /**
		             * Creates a copy of this object.
		             *
		             * @return {Object} The clone.
		             *
		             * @example
		             *
		             *     var clone = instance.clone();
		             */
		            clone: function () {
		                return this.init.prototype.extend(this);
		            }
		        };
		    }());

		    /**
		     * An array of 32-bit words.
		     *
		     * @property {Array} words The array of 32-bit words.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var WordArray = C_lib.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of 32-bit words.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.create();
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
		         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 4;
		            }
		        },

		        /**
		         * Converts this word array to a string.
		         *
		         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
		         *
		         * @return {string} The stringified word array.
		         *
		         * @example
		         *
		         *     var string = wordArray + '';
		         *     var string = wordArray.toString();
		         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
		         */
		        toString: function (encoder) {
		            return (encoder || Hex).stringify(this);
		        },

		        /**
		         * Concatenates a word array to this word array.
		         *
		         * @param {WordArray} wordArray The word array to append.
		         *
		         * @return {WordArray} This word array.
		         *
		         * @example
		         *
		         *     wordArray1.concat(wordArray2);
		         */
		        concat: function (wordArray) {
		            // Shortcuts
		            var thisWords = this.words;
		            var thatWords = wordArray.words;
		            var thisSigBytes = this.sigBytes;
		            var thatSigBytes = wordArray.sigBytes;

		            // Clamp excess bits
		            this.clamp();

		            // Concat
		            if (thisSigBytes % 4) {
		                // Copy one byte at a time
		                for (var i = 0; i < thatSigBytes; i++) {
		                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
		                }
		            } else {
		                // Copy one word at a time
		                for (var i = 0; i < thatSigBytes; i += 4) {
		                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
		                }
		            }
		            this.sigBytes += thatSigBytes;

		            // Chainable
		            return this;
		        },

		        /**
		         * Removes insignificant bits.
		         *
		         * @example
		         *
		         *     wordArray.clamp();
		         */
		        clamp: function () {
		            // Shortcuts
		            var words = this.words;
		            var sigBytes = this.sigBytes;

		            // Clamp
		            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
		            words.length = Math.ceil(sigBytes / 4);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = wordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone.words = this.words.slice(0);

		            return clone;
		        },

		        /**
		         * Creates a word array filled with random bytes.
		         *
		         * @param {number} nBytes The number of random bytes to generate.
		         *
		         * @return {WordArray} The random word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.lib.WordArray.random(16);
		         */
		        random: function (nBytes) {
		            var words = [];

		            var r = (function (m_w) {
		                var m_w = m_w;
		                var m_z = 0x3ade68b1;
		                var mask = 0xffffffff;

		                return function () {
		                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
		                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
		                    var result = ((m_z << 0x10) + m_w) & mask;
		                    result /= 0x100000000;
		                    result += 0.5;
		                    return result * (Math.random() > .5 ? 1 : -1);
		                }
		            });

		            for (var i = 0, rcache; i < nBytes; i += 4) {
		                var _r = r((rcache || Math.random()) * 0x100000000);

		                rcache = _r() * 0x3ade67b7;
		                words.push((_r() * 0x100000000) | 0);
		            }

		            return new WordArray.init(words, nBytes);
		        }
		    });

		    /**
		     * Encoder namespace.
		     */
		    var C_enc = C.enc = {};

		    /**
		     * Hex encoding strategy.
		     */
		    var Hex = C_enc.Hex = {
		        /**
		         * Converts a word array to a hex string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The hex string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var hexChars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                hexChars.push((bite >>> 4).toString(16));
		                hexChars.push((bite & 0x0f).toString(16));
		            }

		            return hexChars.join('');
		        },

		        /**
		         * Converts a hex string to a word array.
		         *
		         * @param {string} hexStr The hex string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
		         */
		        parse: function (hexStr) {
		            // Shortcut
		            var hexStrLength = hexStr.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < hexStrLength; i += 2) {
		                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
		            }

		            return new WordArray.init(words, hexStrLength / 2);
		        }
		    };

		    /**
		     * Latin1 encoding strategy.
		     */
		    var Latin1 = C_enc.Latin1 = {
		        /**
		         * Converts a word array to a Latin1 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The Latin1 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            // Shortcuts
		            var words = wordArray.words;
		            var sigBytes = wordArray.sigBytes;

		            // Convert
		            var latin1Chars = [];
		            for (var i = 0; i < sigBytes; i++) {
		                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
		                latin1Chars.push(String.fromCharCode(bite));
		            }

		            return latin1Chars.join('');
		        },

		        /**
		         * Converts a Latin1 string to a word array.
		         *
		         * @param {string} latin1Str The Latin1 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
		         */
		        parse: function (latin1Str) {
		            // Shortcut
		            var latin1StrLength = latin1Str.length;

		            // Convert
		            var words = [];
		            for (var i = 0; i < latin1StrLength; i++) {
		                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
		            }

		            return new WordArray.init(words, latin1StrLength);
		        }
		    };

		    /**
		     * UTF-8 encoding strategy.
		     */
		    var Utf8 = C_enc.Utf8 = {
		        /**
		         * Converts a word array to a UTF-8 string.
		         *
		         * @param {WordArray} wordArray The word array.
		         *
		         * @return {string} The UTF-8 string.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
		         */
		        stringify: function (wordArray) {
		            try {
		                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
		            } catch (e) {
		                throw new Error('Malformed UTF-8 data');
		            }
		        },

		        /**
		         * Converts a UTF-8 string to a word array.
		         *
		         * @param {string} utf8Str The UTF-8 string.
		         *
		         * @return {WordArray} The word array.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
		         */
		        parse: function (utf8Str) {
		            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
		        }
		    };

		    /**
		     * Abstract buffered block algorithm template.
		     *
		     * The property blockSize must be implemented in a concrete subtype.
		     *
		     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
		     */
		    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
		        /**
		         * Resets this block algorithm's data buffer to its initial state.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm.reset();
		         */
		        reset: function () {
		            // Initial values
		            this._data = new WordArray.init();
		            this._nDataBytes = 0;
		        },

		        /**
		         * Adds new data to this block algorithm's buffer.
		         *
		         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
		         *
		         * @example
		         *
		         *     bufferedBlockAlgorithm._append('data');
		         *     bufferedBlockAlgorithm._append(wordArray);
		         */
		        _append: function (data) {
		            // Convert string to WordArray, else assume WordArray already
		            if (typeof data == 'string') {
		                data = Utf8.parse(data);
		            }

		            // Append
		            this._data.concat(data);
		            this._nDataBytes += data.sigBytes;
		        },

		        /**
		         * Processes available data blocks.
		         *
		         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
		         *
		         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
		         *
		         * @return {WordArray} The processed data.
		         *
		         * @example
		         *
		         *     var processedData = bufferedBlockAlgorithm._process();
		         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
		         */
		        _process: function (doFlush) {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var dataSigBytes = data.sigBytes;
		            var blockSize = this.blockSize;
		            var blockSizeBytes = blockSize * 4;

		            // Count blocks ready
		            var nBlocksReady = dataSigBytes / blockSizeBytes;
		            if (doFlush) {
		                // Round up to include partial blocks
		                nBlocksReady = Math.ceil(nBlocksReady);
		            } else {
		                // Round down to include only full blocks,
		                // less the number of blocks that must remain in the buffer
		                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
		            }

		            // Count words ready
		            var nWordsReady = nBlocksReady * blockSize;

		            // Count bytes ready
		            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

		            // Process blocks
		            if (nWordsReady) {
		                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
		                    // Perform concrete-algorithm logic
		                    this._doProcessBlock(dataWords, offset);
		                }

		                // Remove processed words
		                var processedWords = dataWords.splice(0, nWordsReady);
		                data.sigBytes -= nBytesReady;
		            }

		            // Return processed words
		            return new WordArray.init(processedWords, nBytesReady);
		        },

		        /**
		         * Creates a copy of this object.
		         *
		         * @return {Object} The clone.
		         *
		         * @example
		         *
		         *     var clone = bufferedBlockAlgorithm.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);
		            clone._data = this._data.clone();

		            return clone;
		        },

		        _minBufferSize: 0
		    });

		    /**
		     * Abstract hasher template.
		     *
		     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
		     */
		    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
		        /**
		         * Configuration options.
		         */
		        cfg: Base.extend(),

		        /**
		         * Initializes a newly created hasher.
		         *
		         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
		         *
		         * @example
		         *
		         *     var hasher = CryptoJS.algo.SHA256.create();
		         */
		        init: function (cfg) {
		            // Apply config defaults
		            this.cfg = this.cfg.extend(cfg);

		            // Set initial values
		            this.reset();
		        },

		        /**
		         * Resets this hasher to its initial state.
		         *
		         * @example
		         *
		         *     hasher.reset();
		         */
		        reset: function () {
		            // Reset data buffer
		            BufferedBlockAlgorithm.reset.call(this);

		            // Perform concrete-hasher logic
		            this._doReset();
		        },

		        /**
		         * Updates this hasher with a message.
		         *
		         * @param {WordArray|string} messageUpdate The message to append.
		         *
		         * @return {Hasher} This hasher.
		         *
		         * @example
		         *
		         *     hasher.update('message');
		         *     hasher.update(wordArray);
		         */
		        update: function (messageUpdate) {
		            // Append
		            this._append(messageUpdate);

		            // Update the hash
		            this._process();

		            // Chainable
		            return this;
		        },

		        /**
		         * Finalizes the hash computation.
		         * Note that the finalize operation is effectively a destructive, read-once operation.
		         *
		         * @param {WordArray|string} messageUpdate (Optional) A final message update.
		         *
		         * @return {WordArray} The hash.
		         *
		         * @example
		         *
		         *     var hash = hasher.finalize();
		         *     var hash = hasher.finalize('message');
		         *     var hash = hasher.finalize(wordArray);
		         */
		        finalize: function (messageUpdate) {
		            // Final message update
		            if (messageUpdate) {
		                this._append(messageUpdate);
		            }

		            // Perform concrete-hasher logic
		            var hash = this._doFinalize();

		            return hash;
		        },

		        blockSize: 512/32,

		        /**
		         * Creates a shortcut function to a hasher's object interface.
		         *
		         * @param {Hasher} hasher The hasher to create a helper for.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
		         */
		        _createHelper: function (hasher) {
		            return function (message, cfg) {
		                return new hasher.init(cfg).finalize(message);
		            };
		        },

		        /**
		         * Creates a shortcut function to the HMAC's object interface.
		         *
		         * @param {Hasher} hasher The hasher to use in this HMAC helper.
		         *
		         * @return {Function} The shortcut function.
		         *
		         * @static
		         *
		         * @example
		         *
		         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
		         */
		        _createHmacHelper: function (hasher) {
		            return function (message, key) {
		                return new C_algo.HMAC.init(hasher, key).finalize(message);
		            };
		        }
		    });

		    /**
		     * Algorithm namespace.
		     */
		    var C_algo = C.algo = {};

		    return C;
		}(Math));


		return CryptoJS;

	}));
	});

	var x64Core = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (undefined$1) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var Base = C_lib.Base;
		    var X32WordArray = C_lib.WordArray;

		    /**
		     * x64 namespace.
		     */
		    var C_x64 = C.x64 = {};

		    /**
		     * A 64-bit word.
		     */
		    var X64Word = C_x64.Word = Base.extend({
		        /**
		         * Initializes a newly created 64-bit word.
		         *
		         * @param {number} high The high 32 bits.
		         * @param {number} low The low 32 bits.
		         *
		         * @example
		         *
		         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
		         */
		        init: function (high, low) {
		            this.high = high;
		            this.low = low;
		        }

		        /**
		         * Bitwise NOTs this word.
		         *
		         * @return {X64Word} A new x64-Word object after negating.
		         *
		         * @example
		         *
		         *     var negated = x64Word.not();
		         */
		        // not: function () {
		            // var high = ~this.high;
		            // var low = ~this.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ANDs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to AND with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ANDing.
		         *
		         * @example
		         *
		         *     var anded = x64Word.and(anotherX64Word);
		         */
		        // and: function (word) {
		            // var high = this.high & word.high;
		            // var low = this.low & word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise ORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to OR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after ORing.
		         *
		         * @example
		         *
		         *     var ored = x64Word.or(anotherX64Word);
		         */
		        // or: function (word) {
		            // var high = this.high | word.high;
		            // var low = this.low | word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Bitwise XORs this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to XOR with this word.
		         *
		         * @return {X64Word} A new x64-Word object after XORing.
		         *
		         * @example
		         *
		         *     var xored = x64Word.xor(anotherX64Word);
		         */
		        // xor: function (word) {
		            // var high = this.high ^ word.high;
		            // var low = this.low ^ word.low;

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the left.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftL(25);
		         */
		        // shiftL: function (n) {
		            // if (n < 32) {
		                // var high = (this.high << n) | (this.low >>> (32 - n));
		                // var low = this.low << n;
		            // } else {
		                // var high = this.low << (n - 32);
		                // var low = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Shifts this word n bits to the right.
		         *
		         * @param {number} n The number of bits to shift.
		         *
		         * @return {X64Word} A new x64-Word object after shifting.
		         *
		         * @example
		         *
		         *     var shifted = x64Word.shiftR(7);
		         */
		        // shiftR: function (n) {
		            // if (n < 32) {
		                // var low = (this.low >>> n) | (this.high << (32 - n));
		                // var high = this.high >>> n;
		            // } else {
		                // var low = this.high >>> (n - 32);
		                // var high = 0;
		            // }

		            // return X64Word.create(high, low);
		        // },

		        /**
		         * Rotates this word n bits to the left.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotL(25);
		         */
		        // rotL: function (n) {
		            // return this.shiftL(n).or(this.shiftR(64 - n));
		        // },

		        /**
		         * Rotates this word n bits to the right.
		         *
		         * @param {number} n The number of bits to rotate.
		         *
		         * @return {X64Word} A new x64-Word object after rotating.
		         *
		         * @example
		         *
		         *     var rotated = x64Word.rotR(7);
		         */
		        // rotR: function (n) {
		            // return this.shiftR(n).or(this.shiftL(64 - n));
		        // },

		        /**
		         * Adds this word with the passed word.
		         *
		         * @param {X64Word} word The x64-Word to add with this word.
		         *
		         * @return {X64Word} A new x64-Word object after adding.
		         *
		         * @example
		         *
		         *     var added = x64Word.add(anotherX64Word);
		         */
		        // add: function (word) {
		            // var low = (this.low + word.low) | 0;
		            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
		            // var high = (this.high + word.high + carry) | 0;

		            // return X64Word.create(high, low);
		        // }
		    });

		    /**
		     * An array of 64-bit words.
		     *
		     * @property {Array} words The array of CryptoJS.x64.Word objects.
		     * @property {number} sigBytes The number of significant bytes in this word array.
		     */
		    var X64WordArray = C_x64.WordArray = Base.extend({
		        /**
		         * Initializes a newly created word array.
		         *
		         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
		         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
		         *
		         * @example
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create();
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ]);
		         *
		         *     var wordArray = CryptoJS.x64.WordArray.create([
		         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
		         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
		         *     ], 10);
		         */
		        init: function (words, sigBytes) {
		            words = this.words = words || [];

		            if (sigBytes != undefined$1) {
		                this.sigBytes = sigBytes;
		            } else {
		                this.sigBytes = words.length * 8;
		            }
		        },

		        /**
		         * Converts this 64-bit word array to a 32-bit word array.
		         *
		         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
		         *
		         * @example
		         *
		         *     var x32WordArray = x64WordArray.toX32();
		         */
		        toX32: function () {
		            // Shortcuts
		            var x64Words = this.words;
		            var x64WordsLength = x64Words.length;

		            // Convert
		            var x32Words = [];
		            for (var i = 0; i < x64WordsLength; i++) {
		                var x64Word = x64Words[i];
		                x32Words.push(x64Word.high);
		                x32Words.push(x64Word.low);
		            }

		            return X32WordArray.create(x32Words, this.sigBytes);
		        },

		        /**
		         * Creates a copy of this word array.
		         *
		         * @return {X64WordArray} The clone.
		         *
		         * @example
		         *
		         *     var clone = x64WordArray.clone();
		         */
		        clone: function () {
		            var clone = Base.clone.call(this);

		            // Clone "words" array
		            var words = clone.words = this.words.slice(0);

		            // Clone each X64Word object
		            var wordsLength = words.length;
		            for (var i = 0; i < wordsLength; i++) {
		                words[i] = words[i].clone();
		            }

		            return clone;
		        }
		    });
		}());


		return CryptoJS;

	}));
	});

	var sha3 = createCommonjsModule(function (module, exports) {
	(function (root, factory, undef) {
		{
			// CommonJS
			module.exports = exports = factory(core, x64Core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		(function (Math) {
		    // Shortcuts
		    var C = CryptoJS;
		    var C_lib = C.lib;
		    var WordArray = C_lib.WordArray;
		    var Hasher = C_lib.Hasher;
		    var C_x64 = C.x64;
		    var X64Word = C_x64.Word;
		    var C_algo = C.algo;

		    // Constants tables
		    var RHO_OFFSETS = [];
		    var PI_INDEXES  = [];
		    var ROUND_CONSTANTS = [];

		    // Compute Constants
		    (function () {
		        // Compute rho offset constants
		        var x = 1, y = 0;
		        for (var t = 0; t < 24; t++) {
		            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

		            var newX = y % 5;
		            var newY = (2 * x + 3 * y) % 5;
		            x = newX;
		            y = newY;
		        }

		        // Compute pi index constants
		        for (var x = 0; x < 5; x++) {
		            for (var y = 0; y < 5; y++) {
		                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
		            }
		        }

		        // Compute round constants
		        var LFSR = 0x01;
		        for (var i = 0; i < 24; i++) {
		            var roundConstantMsw = 0;
		            var roundConstantLsw = 0;

		            for (var j = 0; j < 7; j++) {
		                if (LFSR & 0x01) {
		                    var bitPosition = (1 << j) - 1;
		                    if (bitPosition < 32) {
		                        roundConstantLsw ^= 1 << bitPosition;
		                    } else /* if (bitPosition >= 32) */ {
		                        roundConstantMsw ^= 1 << (bitPosition - 32);
		                    }
		                }

		                // Compute next LFSR
		                if (LFSR & 0x80) {
		                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
		                    LFSR = (LFSR << 1) ^ 0x71;
		                } else {
		                    LFSR <<= 1;
		                }
		            }

		            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
		        }
		    }());

		    // Reusable objects for temporary values
		    var T = [];
		    (function () {
		        for (var i = 0; i < 25; i++) {
		            T[i] = X64Word.create();
		        }
		    }());

		    /**
		     * SHA-3 hash algorithm.
		     */
		    var SHA3 = C_algo.SHA3 = Hasher.extend({
		        /**
		         * Configuration options.
		         *
		         * @property {number} outputLength
		         *   The desired number of bits in the output hash.
		         *   Only values permitted are: 224, 256, 384, 512.
		         *   Default: 512
		         */
		        cfg: Hasher.cfg.extend({
		            outputLength: 512
		        }),

		        _doReset: function () {
		            var state = this._state = [];
		            for (var i = 0; i < 25; i++) {
		                state[i] = new X64Word.init();
		            }

		            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
		        },

		        _doProcessBlock: function (M, offset) {
		            // Shortcuts
		            var state = this._state;
		            var nBlockSizeLanes = this.blockSize / 2;

		            // Absorb
		            for (var i = 0; i < nBlockSizeLanes; i++) {
		                // Shortcuts
		                var M2i  = M[offset + 2 * i];
		                var M2i1 = M[offset + 2 * i + 1];

		                // Swap endian
		                M2i = (
		                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
		                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
		                );
		                M2i1 = (
		                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
		                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
		                );

		                // Absorb message into state
		                var lane = state[i];
		                lane.high ^= M2i1;
		                lane.low  ^= M2i;
		            }

		            // Rounds
		            for (var round = 0; round < 24; round++) {
		                // Theta
		                for (var x = 0; x < 5; x++) {
		                    // Mix column lanes
		                    var tMsw = 0, tLsw = 0;
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        tMsw ^= lane.high;
		                        tLsw ^= lane.low;
		                    }

		                    // Temporary values
		                    var Tx = T[x];
		                    Tx.high = tMsw;
		                    Tx.low  = tLsw;
		                }
		                for (var x = 0; x < 5; x++) {
		                    // Shortcuts
		                    var Tx4 = T[(x + 4) % 5];
		                    var Tx1 = T[(x + 1) % 5];
		                    var Tx1Msw = Tx1.high;
		                    var Tx1Lsw = Tx1.low;

		                    // Mix surrounding columns
		                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
		                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
		                    for (var y = 0; y < 5; y++) {
		                        var lane = state[x + 5 * y];
		                        lane.high ^= tMsw;
		                        lane.low  ^= tLsw;
		                    }
		                }

		                // Rho Pi
		                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];

		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
		                    }

		                    // Transpose lanes
		                    var TPiLane = T[PI_INDEXES[laneIndex]];
		                    TPiLane.high = tMsw;
		                    TPiLane.low  = tLsw;
		                }

		                // Rho pi at x = y = 0
		                var T0 = T[0];
		                var state0 = state[0];
		                T0.high = state0.high;
		                T0.low  = state0.low;

		                // Chi
		                for (var x = 0; x < 5; x++) {
		                    for (var y = 0; y < 5; y++) {
		                        // Shortcuts
		                        var laneIndex = x + 5 * y;
		                        var lane = state[laneIndex];
		                        var TLane = T[laneIndex];
		                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
		                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

		                        // Mix rows
		                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
		                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
		                    }
		                }

		                // Iota
		                var lane = state[0];
		                var roundConstant = ROUND_CONSTANTS[round];
		                lane.high ^= roundConstant.high;
		                lane.low  ^= roundConstant.low;	            }
		        },

		        _doFinalize: function () {
		            // Shortcuts
		            var data = this._data;
		            var dataWords = data.words;
		            var nBitsTotal = this._nDataBytes * 8;
		            var nBitsLeft = data.sigBytes * 8;
		            var blockSizeBits = this.blockSize * 32;

		            // Add padding
		            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
		            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
		            data.sigBytes = dataWords.length * 4;

		            // Hash final blocks
		            this._process();

		            // Shortcuts
		            var state = this._state;
		            var outputLengthBytes = this.cfg.outputLength / 8;
		            var outputLengthLanes = outputLengthBytes / 8;

		            // Squeeze
		            var hashWords = [];
		            for (var i = 0; i < outputLengthLanes; i++) {
		                // Shortcuts
		                var lane = state[i];
		                var laneMsw = lane.high;
		                var laneLsw = lane.low;

		                // Swap endian
		                laneMsw = (
		                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
		                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
		                );
		                laneLsw = (
		                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
		                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
		                );

		                // Squeeze state to retrieve hash
		                hashWords.push(laneLsw);
		                hashWords.push(laneMsw);
		            }

		            // Return final computed hash
		            return new WordArray.init(hashWords, outputLengthBytes);
		        },

		        clone: function () {
		            var clone = Hasher.clone.call(this);

		            var state = clone._state = this._state.slice(0);
		            for (var i = 0; i < 25; i++) {
		                state[i] = state[i].clone();
		            }

		            return clone;
		        }
		    });

		    /**
		     * Shortcut function to the hasher's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     *
		     * @return {WordArray} The hash.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hash = CryptoJS.SHA3('message');
		     *     var hash = CryptoJS.SHA3(wordArray);
		     */
		    C.SHA3 = Hasher._createHelper(SHA3);

		    /**
		     * Shortcut function to the HMAC's object interface.
		     *
		     * @param {WordArray|string} message The message to hash.
		     * @param {WordArray|string} key The secret key.
		     *
		     * @return {WordArray} The HMAC.
		     *
		     * @static
		     *
		     * @example
		     *
		     *     var hmac = CryptoJS.HmacSHA3(message, key);
		     */
		    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		}(Math));


		return CryptoJS.SHA3;

	}));
	});

	var encHex = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
		{
			// CommonJS
			module.exports = exports = factory(core);
		}
	}(commonjsGlobal, function (CryptoJS) {

		return CryptoJS.enc.Hex;

	}));
	});

	var Webgl =
	/** @class */
	function () {
	  function Webgl() {}

	  Webgl.prototype.fingerprint = function (fingerprints) {
	    var width = 200;
	    var height = 200;
	    var canvasElement = document.createElement('canvas');
	    canvasElement.hidden = true;
	    var canvas = document.body.appendChild(canvasElement);
	    canvas.width = width;
	    canvas.height = height;
	    var ctx = canvas.getContext('webgl2', {
	      preserveDrawingBuffer: true
	    }) || canvas.getContext('experimental-webgl2', {
	      preserveDrawingBuffer: true
	    }) || canvas.getContext('webgl', {
	      preserveDrawingBuffer: true
	    }) || canvas.getContext('experimental-webgl', {
	      preserveDrawingBuffer: true
	    });

	    if (ctx != null) {
	      var debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');

	      if (debugInfo != null) {
	        fingerprints.set('webgl_unmasked_vendor', new Attribute(ctx.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL), 1));
	        fingerprints.set('webgl_unmasked_renderer', new Attribute(ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL), 1));
	      }

	      fingerprints.set('webgl_shader_language_version', new Attribute(ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION), 1));
	      fingerprints.set('webgl_vendor', new Attribute(ctx.getParameter(ctx.VENDOR), 1));
	      fingerprints.set('webgl_version', new Attribute(ctx.getParameter(ctx.VERSION), 1));
	      fingerprints.set('webgl_renderer', new Attribute(ctx.getParameter(ctx.RENDERER), 1));
	      var webglHash = this.webglHash(ctx, width, height);

	      if (webglHash != null) {
	        fingerprints.set('webgl_hash', new Attribute(webglHash, 1));
	      }
	    }

	    document.body.removeChild(canvasElement);
	    return fingerprints;
	  };

	  Webgl.prototype.webglHash = function (ctx, width, height) {
	    var vs = "\nattribute vec3 position;\nattribute vec4 color;\nuniform mat4 worldViewProjection;\nvarying vec4 vColor;\n\nvoid main(void){\n  vColor = color;\n  gl_Position = worldViewProjection * vec4(position, 1.0);\n}\n";
	    var fs = "\nprecision mediump float;\nvarying vec4 vColor;\n\nvoid main(void){\n  gl_FragColor = vColor;\n}\n";
	    var programInfo = createProgramInfo(ctx, [vs, fs]);

	    if (programInfo != null) {
	      var arrays = {
	        position: [1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0],
	        color: [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
	        indices: [0, 1, 2, 1, 2, 3]
	      };
	      var bufferInfo = createBufferInfoFromArrays(ctx, arrays);
	      ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	      ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
	      var m4$1 = m4;
	      var projection = m4$1.perspective(30 * Math.PI / 180, width / height, 0.01, 100);
	      var eye = [-2, -2, -3.5];
	      var target = [0, 0, 0];
	      var up = [0, 1, 0];
	      var camera = m4$1.lookAt(eye, target, up);
	      var view = m4$1.inverse(camera);
	      var viewProjection = m4$1.multiply(projection, view);
	      var world = m4$1.rotationY(0);
	      var uniforms = {
	        worldViewProjection: m4$1.multiply(viewProjection, world)
	      };
	      ctx.useProgram(programInfo.program);
	      setBuffersAndAttributes(ctx, programInfo, bufferInfo);
	      setUniforms(programInfo, uniforms);
	      ctx.drawElements(ctx.TRIANGLES, bufferInfo.numElements, ctx.UNSIGNED_SHORT, 0);
	      ctx.flush();
	      var n = new Uint8Array(width * height * 4);
	      ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n);
	      var hex = '';

	      for (var i = 0; i < n.byteLength; i++) {
	        hex += n[i].toString(16);
	      }

	      var hash = sha3(hex, {
	        outputLength: 512
	      });
	      return hash.toString(encHex);
	    }

	    return null;
	  };

	  return Webgl;
	}();

	var Canvas =
	/** @class */
	function () {
	  function Canvas() {}

	  Canvas.prototype.fingerprint = function (fingerprints) {
	    var width = 500;
	    var height = 80;
	    var canvasElement = document.createElement('canvas');
	    canvasElement.hidden = true;
	    var canvas = document.body.appendChild(canvasElement);
	    canvas.width = width;
	    canvas.height = height;
	    var ctx = canvas.getContext('2d');

	    if (ctx != null) {
	      this.render(ctx);
	      var hash = sha3(canvas.toDataURL(), {
	        outputLength: 512
	      });
	      fingerprints.set('canvas_hash', new Attribute(hash.toString(encHex), 1));
	    }

	    document.body.removeChild(canvasElement);
	    return fingerprints;
	  };

	  Canvas.prototype.render = function (ctx) {
	    var canvasFont = '20px unknown-font-' + Math.floor(Math.random() * 10000).toString();
	    ctx.beginPath();
	    ctx.font = canvasFont;
	    ctx.fillStyle = '#ff0000';
	    ctx.fillText('😀🍇abcdefghijklmnopqrstuvwxyz0123456789', 0, 30);
	    ctx.strokeStyle = '#00ff00';
	    ctx.strokeText('😀🍇abcdefghijklmnopqrstuvwxyz0123456789', 0, 60);
	    ctx.globalCompositeOperation = 'lighter';
	    ctx.fillStyle = '#aaaaaa';
	    ctx.fillRect(100, 0, 100, 80);
	  };

	  return Canvas;
	}();

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$5
	};

	var f$6 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$6
	};

	var defineProperty$4 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var $forEach$2 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$2 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$4 = internalState.set;
	var getInternalState$3 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$2 = Object[PROTOTYPE$2];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$2, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
	    nativeDefineProperty$1(ObjectPrototype$2, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$2]);
	  setInternalState$4(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$2(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$2 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$2 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$2, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$2) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$2, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return getInternalState$3(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$2], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$3(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype$2, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$2(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$2][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$5 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$5(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var nativeJoin = [].join;

	var ES3_STRINGS = indexedObject != Object;
	var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD$1 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var defineProperty$6 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME$1 in FunctionPrototype)) {
	  defineProperty$6(FunctionPrototype, NAME$1, {
	    configurable: true,
	    get: function () {
	      try {
	        return FunctionPrototypeToString.call(this).match(nameRE)[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var Browser =
	/** @class */
	function () {
	  function Browser() {}

	  Browser.prototype.fingerprint = function (fingerprints) {
	    fingerprints.set('timezone', new Attribute(String(new Date().getTimezoneOffset()), 1));
	    fingerprints.set('user_agent', new Attribute(window.navigator.userAgent, 1));
	    fingerprints.set('platform', new Attribute(navigator.platform, 1));
	    fingerprints.set('languages', new Attribute(window.navigator.languages.join(','), 1));
	    fingerprints.set('cookie_enabled', new Attribute(String(navigator.cookieEnabled), 1));
	    fingerprints.set('plugin_list_hash', new Attribute(this.pluginListHash(), 1));
	    return fingerprints;
	  };

	  Browser.prototype.pluginListHash = function () {
	    var plugin = '';
	    var pluginLength = navigator.plugins.length == null ? 0 : navigator.plugins.length;

	    for (var i = 0; i < pluginLength; i++) {
	      plugin += navigator.plugins[i].name == null ? '' : navigator.plugins[i].name;
	      plugin += navigator.plugins[i].filename == null ? '' : navigator.plugins[i].filename;
	      plugin += navigator.plugins[i].description == null ? '' : navigator.plugins[i].description;
	    }

	    var hash = sha3(plugin, {
	      outputLength: 512
	    });
	    return hash.toString(encHex);
	  };

	  return Browser;
	}();

	var NavigationTiming =
	/** @class */
	function () {
	  function NavigationTiming() {}

	  NavigationTiming.prototype.fingerprint = function (fingerprints) {
	    var timing = window.performance.timing;
	    fingerprints.set('redirect', new Attribute(String(timing.redirectEnd - timing.redirectStart), 1));
	    fingerprints.set('app_cache', new Attribute(String(timing.domainLookupStart - timing.fetchStart), 1));
	    fingerprints.set('dns', new Attribute(String(timing.domainLookupEnd - timing.domainLookupStart), 1));
	    fingerprints.set('tcp', new Attribute(String(timing.connectEnd - timing.connectStart), 1));
	    fingerprints.set('request', new Attribute(String(timing.responseStart - timing.requestStart), 1));
	    fingerprints.set('response', new Attribute(String(timing.responseEnd - timing.responseStart), 1));
	    return fingerprints;
	  };

	  return NavigationTiming;
	}();

	var Screen =
	/** @class */
	function () {
	  function Screen() {}

	  Screen.prototype.fingerprint = function (fingerprints) {
	    fingerprints.set('screen_width', new Attribute(String(window.screen.width), 1));
	    fingerprints.set('screen_height', new Attribute(String(window.screen.height), 1));
	    fingerprints.set('screen_avail_width', new Attribute(String(window.screen.availWidth), 1));
	    fingerprints.set('screen_avail_height', new Attribute(String(window.screen.availHeight), 1));
	    fingerprints.set('screen_color_depth', new Attribute(String(window.screen.colorDepth), 1));
	    fingerprints.set('screen_pixel_depth', new Attribute(String(window.screen.pixelDepth), 1));
	    fingerprints.set('screen_orientation_angle', new Attribute(String(window.screen.orientation.angle), 1));
	    fingerprints.set('screen_orientation_type', new Attribute(String(window.screen.orientation.type), 1));
	    fingerprints.set('screen_device_pixel_ratio', new Attribute(String(window.devicePixelRatio), 1));
	    fingerprints.set('screen_inner_width', new Attribute(String(window.innerWidth), 1));
	    fingerprints.set('screen_inner_height', new Attribute(String(window.innerHeight), 1));
	    return fingerprints;
	  };

	  return Screen;
	}();

	var Audio =
	/** @class */
	function () {
	  function Audio() {}

	  Audio.prototype.fingerprint = function (fingerprints) {
	    var audioCtx = new AudioContext();

	    if (audioCtx != null) {
	      fingerprints.set('audio_state', new Attribute(String(audioCtx.state), 1));
	      fingerprints.set('audio_sample_rate', new Attribute(String(audioCtx.sampleRate), 1));
	      fingerprints.set('audio_base_latency', new Attribute(String(audioCtx.baseLatency), 1));
	      var destination = audioCtx.destination;
	      fingerprints.set('audio_destination_max_channel_count', new Attribute(String(destination.maxChannelCount), 1));
	      fingerprints.set('audio_destination_number_of_inputs', new Attribute(String(destination.numberOfInputs), 1));
	      fingerprints.set('audio_destination_number_of_outputs', new Attribute(String(destination.numberOfOutputs), 1));
	      fingerprints.set('audio_destination_channel_count', new Attribute(String(destination.channelCount), 1));
	      fingerprints.set('audio_destination_channel_count_mode', new Attribute(String(destination.channelCountMode), 1));
	      fingerprints.set('audio_destination_channel_interpretation', new Attribute(String(destination.channelInterpretation), 1));
	      var analyser = audioCtx.createAnalyser();
	      fingerprints.set('audio_analyser_fft_size', new Attribute(String(analyser.fftSize), 1));
	      fingerprints.set('audio_analyser_frequency_bin_count', new Attribute(String(analyser.frequencyBinCount), 1));
	      fingerprints.set('audio_analyser_min_decibels', new Attribute(String(analyser.minDecibels), 1));
	      fingerprints.set('audio_analyser_max_decibels', new Attribute(String(analyser.maxDecibels), 1));
	      fingerprints.set('audio_analyser_smoothing_time_constant', new Attribute(String(analyser.smoothingTimeConstant), 1));
	      fingerprints.set('audio_analyser_number_of_inputs', new Attribute(String(analyser.numberOfInputs), 1));
	      fingerprints.set('audio_analyser_number_of_outputs', new Attribute(String(analyser.numberOfOutputs), 1));
	      fingerprints.set('audio_analyser_channel_count', new Attribute(String(analyser.channelCount), 1));
	      fingerprints.set('audio_analyser_channel_count_mode', new Attribute(String(analyser.channelCountMode), 1));
	      fingerprints.set('audio_analyser_channel_interpretation', new Attribute(String(analyser.channelInterpretation), 1));
	    }

	    return fingerprints;
	  };

	  return Audio;
	}();

	var log$1 = Math.log;

	// `Math.log1p` method implementation
	// https://tc39.github.io/ecma262/#sec-math.log1p
	var mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log$1(1 + x);
	};

	var nativeAcosh = Math.acosh;
	var log$2 = Math.log;
	var sqrt = Math.sqrt;
	var LN2$1 = Math.LN2;

	var FORCED$3 = !nativeAcosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  || nativeAcosh(Infinity) != Infinity;

	// `Math.acosh` method
	// https://tc39.github.io/ecma262/#sec-math.acosh
	_export({ target: 'Math', stat: true, forced: FORCED$3 }, {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? log$2(x) + LN2$1
	      : mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	var nativeAsinh = Math.asinh;
	var log$3 = Math.log;
	var sqrt$1 = Math.sqrt;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log$3(x + sqrt$1(x * x + 1));
	}

	// `Math.asinh` method
	// https://tc39.github.io/ecma262/#sec-math.asinh
	// Tor Browser bug: Math.asinh(0) -> -0
	_export({ target: 'Math', stat: true, forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0) }, {
	  asinh: asinh
	});

	var nativeAtanh = Math.atanh;
	var log$4 = Math.log;

	// `Math.atanh` method
	// https://tc39.github.io/ecma262/#sec-math.atanh
	// Tor Browser bug: Math.atanh(-0) -> 0
	_export({ target: 'Math', stat: true, forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0) }, {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : log$4((1 + x) / (1 - x)) / 2;
	  }
	});

	// `Math.sign` method implementation
	// https://tc39.github.io/ecma262/#sec-math.sign
	var mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	var abs$1 = Math.abs;
	var pow$1 = Math.pow;

	// `Math.cbrt` method
	// https://tc39.github.io/ecma262/#sec-math.cbrt
	_export({ target: 'Math', stat: true }, {
	  cbrt: function cbrt(x) {
	    return mathSign(x = +x) * pow$1(abs$1(x), 1 / 3);
	  }
	});

	var nativeExpm1 = Math.expm1;
	var exp = Math.exp;

	// `Math.expm1` method implementation
	// https://tc39.github.io/ecma262/#sec-math.expm1
	var mathExpm1 = (!nativeExpm1
	  // Old FF bug
	  || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || nativeExpm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	} : nativeExpm1;

	var nativeCosh = Math.cosh;
	var abs$2 = Math.abs;
	var E = Math.E;

	// `Math.cosh` method
	// https://tc39.github.io/ecma262/#sec-math.cosh
	_export({ target: 'Math', stat: true, forced: !nativeCosh || nativeCosh(710) === Infinity }, {
	  cosh: function cosh(x) {
	    var t = mathExpm1(abs$2(x) - 1) + 1;
	    return (t + 1 / (t * E * E)) * (E / 2);
	  }
	});

	// `Math.expm1` method
	// https://tc39.github.io/ecma262/#sec-math.expm1
	_export({ target: 'Math', stat: true, forced: mathExpm1 != Math.expm1 }, { expm1: mathExpm1 });

	// `Math.log1p` method
	// https://tc39.github.io/ecma262/#sec-math.log1p
	_export({ target: 'Math', stat: true }, { log1p: mathLog1p });

	var abs$3 = Math.abs;
	var exp$1 = Math.exp;
	var E$1 = Math.E;

	var FORCED$4 = fails(function () {
	  return Math.sinh(-2e-17) != -2e-17;
	});

	// `Math.sinh` method
	// https://tc39.github.io/ecma262/#sec-math.sinh
	// V8 near Chromium 38 has a problem with very small numbers
	_export({ target: 'Math', stat: true, forced: FORCED$4 }, {
	  sinh: function sinh(x) {
	    return abs$3(x = +x) < 1 ? (mathExpm1(x) - mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (E$1 / 2);
	  }
	});

	var exp$2 = Math.exp;

	// `Math.tanh` method
	// https://tc39.github.io/ecma262/#sec-math.tanh
	_export({ target: 'Math', stat: true }, {
	  tanh: function tanh(x) {
	    var a = mathExpm1(x = +x);
	    var b = mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	var MathFP =
	/** @class */
	function () {
	  function MathFP() {}

	  MathFP.prototype.fingerprint = function (fingerprints) {
	    fingerprints.set('math_asinh', new Attribute(String(Math.asinh(1)), 1));
	    fingerprints.set('math_acosh', new Attribute(String(Math.acosh(1e300)), 1));
	    fingerprints.set('math_atanh', new Attribute(String(Math.atanh(0.5)), 1));
	    fingerprints.set('math_expm1', new Attribute(String(Math.expm1(1)), 1));
	    fingerprints.set('math_cbrt', new Attribute(String(Math.cbrt(100)), 1));
	    fingerprints.set('math_log1p', new Attribute(String(Math.log1p(10)), 1));
	    fingerprints.set('math_sinh', new Attribute(String(Math.sinh(1)), 1));
	    fingerprints.set('math_cosh', new Attribute(String(Math.cosh(10)), 1));
	    fingerprints.set('math_tanh', new Attribute(String(Math.tanh(1)), 1));
	    return fingerprints;
	  };

	  return MathFP;
	}();

	var Monogram =
	/** @class */
	function () {
	  function Monogram() {
	    this.clientFingerprint = new Map();
	    this.clientFingerprint = new Webgl().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Canvas().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Browser().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new NavigationTiming().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Screen().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Audio().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new MathFP().fingerprint(this.clientFingerprint);
	  }

	  Monogram.prototype.json = function () {
	    return JSON.stringify(__spread(this.clientFingerprint));
	  };

	  Monogram.prototype.data = function () {
	    return this.clientFingerprint;
	  };

	  Monogram.prototype.hash = function (useData) {
	    var _this = this;

	    var raw = '';
	    useData.forEach(function (key) {
	      var feature = _this.clientFingerprint.get(key);

	      if (feature != null) {
	        raw += feature.value;
	      }
	    });
	    var hash = sha3(raw, {
	      outputLength: 512
	    });
	    return hash.toString(encHex);
	  };

	  return Monogram;
	}();

	exports.Monogram = Monogram;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
