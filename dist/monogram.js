/*!
 * @totatoti/monogram
 * @license MIT
 *
 * Dependencies:
 * core-js 3.6.5 | MIT
 * twgl.js 4.15.0 | MIT
 * crypto-js 4.0.0 | MIT
 * mathjs 7.0.0 | Apache-2.0
 * typed-function 1.1.1 |
 * decimal.js 10.2.0 | MIT
 * complex.js 2.0.11 | MIT OR GPL-2.0
 * fraction.js 4.0.12 | MIT OR GPL-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto')) :
	typeof define === 'function' && define.amd ? define(['exports', 'crypto'], factory) :
	(global = global || self, factory(global.monogram = {}, global.crypto$1));
}(this, (function (exports, crypto$1) { 'use strict';

	crypto$1 = crypto$1 && Object.prototype.hasOwnProperty.call(crypto$1, 'default') ? crypto$1['default'] : crypto$1;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

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
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
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
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
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
	var functionBindContext = function (fn, that, length) {
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
	    var boundFunction = functionBindContext(callbackfn, that, 3);
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

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $forEach = arrayIteration.forEach;



	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
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

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
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
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
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

	var defineProperty$2 = objectDefineProperty.f;








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
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
	    if (descriptors) defineProperty$2(C.prototype, 'size', {
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

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	// `Object.fromEntries` method
	// https://github.com/tc39/proposal-object-from-entries
	_export({ target: 'Object', stat: true }, {
	  fromEntries: function fromEntries(iterable) {
	    var obj = {};
	    iterate_1(iterable, function (k, v) {
	      createProperty(obj, k, v);
	    }, undefined, true);
	    return obj;
	  }
	});

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

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
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

	var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

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
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$1];
	var ObjectPrototype$1 = Object.prototype;
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

	if (!arrayBufferNative) {
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

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$1) {
	    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$1);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataViewPrototype.setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
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

	var defineProperty$4 = objectDefineProperty.f;





	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray$1 = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$2 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$2.isPrototypeOf;

	var TO_STRING_TAG$4 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
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

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$2) {
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
	  defineProperty$4(TypedArrayPrototype, TO_STRING_TAG$4, { get: function () {
	    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	  } });
	  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
	    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	}

	var arrayBufferViewCore = {
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

	/* eslint-disable no-new */



	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$2 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
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
	    mapfn = functionBindContext(mapfn, arguments[2], 2);
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
	    } else if (typedArrayConstructorsRequireWrappers) {
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
	var STRICT_METHOD$1 = arrayMethodIsStrict('lastIndexOf');
	// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
	var FORCED = NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$1;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
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

	var FORCED$1 = fails(function () {
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
	}, FORCED$1);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;

	var FORCED$2 = fails(function () {
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
	}, FORCED$2);

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

	var FORCED$3 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$3);

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

	/* @license twgl.js 4.15.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
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

		/*globals window, global, require*/

		/**
		 * CryptoJS core components.
		 */
		var CryptoJS = CryptoJS || (function (Math, undefined$1) {

		    var crypto;

		    // Native crypto from window (Browser)
		    if (typeof window !== 'undefined' && window.crypto) {
		        crypto = window.crypto;
		    }

		    // Native (experimental IE 11) crypto from window (Browser)
		    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
		        crypto = window.msCrypto;
		    }

		    // Native crypto from global (NodeJS)
		    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
		        crypto = commonjsGlobal.crypto;
		    }

		    // Native crypto import via require (NodeJS)
		    if (!crypto && typeof commonjsRequire === 'function') {
		        try {
		            crypto = crypto$1;
		        } catch (err) {}
		    }

		    /*
		     * Cryptographically secure pseudorandom number generator
		     *
		     * As Math.random() is cryptographically not safe to use
		     */
		    var cryptoSecureRandomInt = function () {
		        if (crypto) {
		            // Use getRandomValues method (Browser)
		            if (typeof crypto.getRandomValues === 'function') {
		                try {
		                    return crypto.getRandomValues(new Uint32Array(1))[0];
		                } catch (err) {}
		            }

		            // Use randomBytes method (NodeJS)
		            if (typeof crypto.randomBytes === 'function') {
		                try {
		                    return crypto.randomBytes(4).readInt32LE();
		                } catch (err) {}
		            }
		        }

		        throw new Error('Native crypto module could not be used to get secure random number.');
		    };

		    /*
		     * Local polyfill of Object.create

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

		            for (var i = 0; i < nBytes; i += 4) {
		                words.push(cryptoSecureRandomInt());
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
		            var processedWords;

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
		                processedWords = dataWords.splice(0, nWordsReady);
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
		                    var tMsw;
		                    var tLsw;

		                    // Shortcuts
		                    var lane = state[laneIndex];
		                    var laneMsw = lane.high;
		                    var laneLsw = lane.low;
		                    var rhoOffset = RHO_OFFSETS[laneIndex];

		                    // Rotate lanes
		                    if (rhoOffset < 32) {
		                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
		                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
		                    } else /* if (rhoOffset >= 32) */ {
		                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
		                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
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
		                lane.low  ^= roundConstant.low;
		            }
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

	var wellKnownSymbolWrapped = {
		f: f$6
	};

	var defineProperty$5 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var $forEach$2 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$2 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$4 = internalState.set;
	var getInternalState$3 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$3 = Object[PROTOTYPE$2];
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
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$3, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$3[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$3) {
	    nativeDefineProperty$1(ObjectPrototype$3, P, ObjectPrototypeDescriptor);
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
	  if (O === ObjectPrototype$3) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
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
	  if (this === ObjectPrototype$3 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$3 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
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
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$3;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$3, key))) {
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
	      if (this === ObjectPrototype$3) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$3, tag, { configurable: true, set: setter });
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

	  wellKnownSymbolWrapped.f = function (name) {
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
	      redefine(ObjectPrototype$3, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
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

	var defineProperty$6 = objectDefineProperty.f;


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
	  defineProperty$6(symbolPrototype, 'description', {
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
	var STRICT_METHOD$2 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$2 }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var defineProperty$7 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME$1 in FunctionPrototype)) {
	  defineProperty$7(FunctionPrototype, NAME$1, {
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
	    fingerprints.set('webdriver', new Attribute(String(window.navigator.webdriver), 1));
	    fingerprints.set('isnan_length', new Attribute(String(isNaN.toString().length), 1));
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

	var FORCED$4 = !nativeAcosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  || nativeAcosh(Infinity) != Infinity;

	// `Math.acosh` method
	// https://tc39.github.io/ecma262/#sec-math.acosh
	_export({ target: 'Math', stat: true, forced: FORCED$4 }, {
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

	var FORCED$5 = fails(function () {
	  return Math.sinh(-2e-17) != -2e-17;
	});

	// `Math.sinh` method
	// https://tc39.github.io/ecma262/#sec-math.sinh
	// V8 near Chromium 38 has a problem with very small numbers
	_export({ target: 'Math', stat: true, forced: FORCED$5 }, {
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

	var DEFAULT_CONFIG = {
	  // minimum relative difference between two compared values,
	  // used by all comparison functions
	  epsilon: 1e-12,
	  // type of default matrix output. Choose 'matrix' (default) or 'array'
	  matrix: 'Matrix',
	  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
	  number: 'number',
	  // number of significant digits in BigNumbers
	  precision: 64,
	  // predictable output type of functions. When true, output type depends only
	  // on the input types. When false (default), output type can vary depending
	  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
	  // predictable is false, and returns `NaN` when true.
	  predictable: false,
	  // random seed for seeded pseudo random number generation
	  // null = randomly seed
	  randomSeed: null
	};

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	// type checks for all known types
	//
	// note that:
	//
	// - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
	//   instanceof cannot be used because that would not allow to pass data from
	//   one instance of math.js to another since each has it's own instance of Unit.
	// - check the `isUnit` property via the constructor, so there will be no
	//   matches for "fake" instances like plain objects with a property `isUnit`.
	//   That is important for security reasons.
	// - It must not be possible to override the type checks used internally,
	//   for security reasons, so these functions are not exposed in the expression
	//   parser.
	function isNumber(x) {
	  return typeof x === 'number';
	}
	function isBigNumber(x) {
	  return x && x.constructor.prototype.isBigNumber === true || false;
	}
	function isComplex(x) {
	  return x && _typeof(x) === 'object' && Object.getPrototypeOf(x).isComplex === true || false;
	}
	function isFraction(x) {
	  return x && _typeof(x) === 'object' && Object.getPrototypeOf(x).isFraction === true || false;
	}
	function isUnit(x) {
	  return x && x.constructor.prototype.isUnit === true || false;
	}
	function isString(x) {
	  return typeof x === 'string';
	}
	var isArray$1 = Array.isArray;
	function isMatrix(x) {
	  return x && x.constructor.prototype.isMatrix === true || false;
	}
	/**
	 * Test whether a value is a collection: an Array or Matrix
	 * @param {*} x
	 * @returns {boolean} isCollection
	 */

	function isCollection(x) {
	  return Array.isArray(x) || isMatrix(x);
	}
	function isDenseMatrix(x) {
	  return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
	}
	function isSparseMatrix(x) {
	  return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
	}
	function isRange(x) {
	  return x && x.constructor.prototype.isRange === true || false;
	}
	function isIndex(x) {
	  return x && x.constructor.prototype.isIndex === true || false;
	}
	function isBoolean(x) {
	  return typeof x === 'boolean';
	}
	function isResultSet(x) {
	  return x && x.constructor.prototype.isResultSet === true || false;
	}
	function isHelp(x) {
	  return x && x.constructor.prototype.isHelp === true || false;
	}
	function isFunction(x) {
	  return typeof x === 'function';
	}
	function isDate(x) {
	  return x instanceof Date;
	}
	function isRegExp(x) {
	  return x instanceof RegExp;
	}
	function isObject$1(x) {
	  return !!(x && _typeof(x) === 'object' && x.constructor === Object && !isComplex(x) && !isFraction(x));
	}
	function isNull(x) {
	  return x === null;
	}
	function isUndefined(x) {
	  return x === undefined;
	}
	function isAccessorNode(x) {
	  return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isArrayNode(x) {
	  return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isAssignmentNode(x) {
	  return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isBlockNode(x) {
	  return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isConditionalNode(x) {
	  return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isConstantNode(x) {
	  return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isFunctionAssignmentNode(x) {
	  return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isFunctionNode(x) {
	  return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isIndexNode(x) {
	  return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isNode(x) {
	  return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isObjectNode(x) {
	  return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isOperatorNode(x) {
	  return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isParenthesisNode(x) {
	  return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isRangeNode(x) {
	  return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isSymbolNode(x) {
	  return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
	}
	function isChain(x) {
	  return x && x.constructor.prototype.isChain === true || false;
	}
	function typeOf(x) {
	  var t = _typeof(x);

	  if (t === 'object') {
	    // JavaScript types
	    if (x === null) return 'null';
	    if (Array.isArray(x)) return 'Array';
	    if (x instanceof Date) return 'Date';
	    if (x instanceof RegExp) return 'RegExp'; // math.js types

	    if (isBigNumber(x)) return 'BigNumber';
	    if (isComplex(x)) return 'Complex';
	    if (isFraction(x)) return 'Fraction';
	    if (isMatrix(x)) return 'Matrix';
	    if (isUnit(x)) return 'Unit';
	    if (isIndex(x)) return 'Index';
	    if (isRange(x)) return 'Range';
	    if (isResultSet(x)) return 'ResultSet';
	    if (isNode(x)) return x.type;
	    if (isChain(x)) return 'Chain';
	    if (isHelp(x)) return 'Help';
	    return 'Object';
	  }

	  if (t === 'function') return 'Function';
	  return t; // can be 'string', 'number', 'boolean', ...
	}

	function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
	/**
	 * Clone an object
	 *
	 *     clone(x)
	 *
	 * Can clone any primitive type, array, and object.
	 * If x has a function clone, this function will be invoked to clone the object.
	 *
	 * @param {*} x
	 * @return {*} clone
	 */

	function clone(x) {
	  var type = _typeof$1(x); // immutable primitive types


	  if (type === 'number' || type === 'string' || type === 'boolean' || x === null || x === undefined) {
	    return x;
	  } // use clone function of the object when available


	  if (typeof x.clone === 'function') {
	    return x.clone();
	  } // array


	  if (Array.isArray(x)) {
	    return x.map(function (value) {
	      return clone(value);
	    });
	  }

	  if (x instanceof Date) return new Date(x.valueOf());
	  if (isBigNumber(x)) return x; // bignumbers are immutable

	  if (x instanceof RegExp) throw new TypeError('Cannot clone ' + x); // TODO: clone a RegExp
	  // object

	  return mapObject(x, clone);
	}
	/**
	 * Apply map to all properties of an object
	 * @param {Object} object
	 * @param {function} callback
	 * @return {Object} Returns a copy of the object with mapped properties
	 */

	function mapObject(object, callback) {
	  var clone = {};

	  for (var key in object) {
	    if (hasOwnProperty$1(object, key)) {
	      clone[key] = callback(object[key]);
	    }
	  }

	  return clone;
	}
	/**
	 * Extend object a with the properties of object b
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 */

	function extend(a, b) {
	  for (var prop in b) {
	    if (hasOwnProperty$1(b, prop)) {
	      a[prop] = b[prop];
	    }
	  }

	  return a;
	}
	/**
	 * Deep test equality of all fields in two pairs of arrays or objects.
	 * Compares values and functions strictly (ie. 2 is not the same as '2').
	 * @param {Array | Object} a
	 * @param {Array | Object} b
	 * @returns {boolean}
	 */

	function deepStrictEqual(a, b) {
	  var prop, i, len;

	  if (Array.isArray(a)) {
	    if (!Array.isArray(b)) {
	      return false;
	    }

	    if (a.length !== b.length) {
	      return false;
	    }

	    for (i = 0, len = a.length; i < len; i++) {
	      if (!deepStrictEqual(a[i], b[i])) {
	        return false;
	      }
	    }

	    return true;
	  } else if (typeof a === 'function') {
	    return a === b;
	  } else if (a instanceof Object) {
	    if (Array.isArray(b) || !(b instanceof Object)) {
	      return false;
	    }

	    for (prop in a) {
	      // noinspection JSUnfilteredForInLoop
	      if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }

	    for (prop in b) {
	      // noinspection JSUnfilteredForInLoop
	      if (!(prop in a) || !deepStrictEqual(a[prop], b[prop])) {
	        return false;
	      }
	    }

	    return true;
	  } else {
	    return a === b;
	  }
	}
	/**
	 * A safe hasOwnProperty
	 * @param {Object} object
	 * @param {string} property
	 */

	function hasOwnProperty$1(object, property) {
	  return object && Object.hasOwnProperty.call(object, property);
	}
	/**
	 * Shallow version of pick, creating an object composed of the picked object properties
	 * but not for nested properties
	 * @param {Object} object
	 * @param {string[]} properties
	 * @return {Object}
	 */

	function pickShallow(object, properties) {
	  var copy = {};

	  for (var i = 0; i < properties.length; i++) {
	    var key = properties[i];
	    var value = object[key];

	    if (value !== undefined) {
	      copy[key] = value;
	    }
	  }

	  return copy;
	}

	var MATRIX_OPTIONS = ['Matrix', 'Array']; // valid values for option matrix

	var NUMBER_OPTIONS = ['number', 'BigNumber', 'Fraction']; // valid values for option number

	function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

	var config = /* #__PURE__ */function config(options) {
	  if (options) {
	    throw new Error('The global config is readonly. \n' + 'Please create a mathjs instance if you want to change the default configuration. \n' + 'Example:\n' + '\n' + '  import { create, all } from \'mathjs\';\n' + '  const mathjs = create(all);\n' + '  mathjs.config({ number: \'BigNumber\' });\n');
	  }

	  return Object.freeze(DEFAULT_CONFIG);
	};

	_extends(config, DEFAULT_CONFIG, {
	  MATRIX_OPTIONS: MATRIX_OPTIONS,
	  NUMBER_OPTIONS: NUMBER_OPTIONS
	});

	var typedFunction = createCommonjsModule(function (module, exports) {

	(function (root, factory) {
	  {
	    // OldNode. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like OldNode.
	    module.exports = factory();
	  }
	}(commonjsGlobal, function () {

	  function ok () {
	    return true;
	  }

	  function notOk () {
	    return false;
	  }

	  function undef () {
	    return undefined;
	  }

	  /**
	   * @typedef {{
	   *   params: Param[],
	   *   fn: function
	   * }} Signature
	   *
	   * @typedef {{
	   *   types: Type[],
	   *   restParam: boolean
	   * }} Param
	   *
	   * @typedef {{
	   *   name: string,
	   *   typeIndex: number,
	   *   test: function,
	   *   conversion?: ConversionDef,
	   *   conversionIndex: number,
	   * }} Type
	   *
	   * @typedef {{
	   *   from: string,
	   *   to: string,
	   *   convert: function (*) : *
	   * }} ConversionDef
	   *
	   * @typedef {{
	   *   name: string,
	   *   test: function(*) : boolean
	   * }} TypeDef
	   */

	  // create a new instance of typed-function
	  function create () {
	    // data type tests
	    var _types = [
	      { name: 'number',    test: function (x) { return typeof x === 'number' } },
	      { name: 'string',    test: function (x) { return typeof x === 'string' } },
	      { name: 'boolean',   test: function (x) { return typeof x === 'boolean' } },
	      { name: 'Function',  test: function (x) { return typeof x === 'function'} },
	      { name: 'Array',     test: Array.isArray },
	      { name: 'Date',      test: function (x) { return x instanceof Date } },
	      { name: 'RegExp',    test: function (x) { return x instanceof RegExp } },
	      { name: 'Object',    test: function (x) {
	        return typeof x === 'object' && x !== null && x.constructor === Object
	      }},
	      { name: 'null',      test: function (x) { return x === null } },
	      { name: 'undefined', test: function (x) { return x === undefined } }
	    ];

	    var anyType = {
	      name: 'any',
	      test: ok
	    };

	    // types which need to be ignored
	    var _ignore = [];

	    // type conversions
	    var _conversions = [];

	    // This is a temporary object, will be replaced with a typed function at the end
	    var typed = {
	      types: _types,
	      conversions: _conversions,
	      ignore: _ignore
	    };

	    /**
	     * Find the test function for a type
	     * @param {String} typeName
	     * @return {TypeDef} Returns the type definition when found,
	     *                    Throws a TypeError otherwise
	     */
	    function findTypeByName (typeName) {
	      var entry = findInArray(typed.types, function (entry) {
	        return entry.name === typeName;
	      });

	      if (entry) {
	        return entry;
	      }

	      if (typeName === 'any') { // special baked-in case 'any'
	        return anyType;
	      }

	      var hint = findInArray(typed.types, function (entry) {
	        return entry.name.toLowerCase() === typeName.toLowerCase();
	      });

	      throw new TypeError('Unknown type "' + typeName + '"' +
	          (hint ? ('. Did you mean "' + hint.name + '"?') : ''));
	    }

	    /**
	     * Find the index of a type definition. Handles special case 'any'
	     * @param {TypeDef} type
	     * @return {number}
	     */
	    function findTypeIndex(type) {
	      if (type === anyType) {
	        return 999;
	      }

	      return typed.types.indexOf(type);
	    }

	    /**
	     * Find a type that matches a value.
	     * @param {*} value
	     * @return {string} Returns the name of the first type for which
	     *                  the type test matches the value.
	     */
	    function findTypeName(value) {
	      var entry = findInArray(typed.types, function (entry) {
	        return entry.test(value);
	      });

	      if (entry) {
	        return entry.name;
	      }

	      throw new TypeError('Value has unknown type. Value: ' + value);
	    }

	    /**
	     * Find a specific signature from a (composed) typed function, for example:
	     *
	     *   typed.find(fn, ['number', 'string'])
	     *   typed.find(fn, 'number, string')
	     *
	     * Function find only only works for exact matches.
	     *
	     * @param {Function} fn                   A typed-function
	     * @param {string | string[]} signature   Signature to be found, can be
	     *                                        an array or a comma separated string.
	     * @return {Function}                     Returns the matching signature, or
	     *                                        throws an error when no signature
	     *                                        is found.
	     */
	    function find (fn, signature) {
	      if (!fn.signatures) {
	        throw new TypeError('Function is no typed-function');
	      }

	      // normalize input
	      var arr;
	      if (typeof signature === 'string') {
	        arr = signature.split(',');
	        for (var i = 0; i < arr.length; i++) {
	          arr[i] = arr[i].trim();
	        }
	      }
	      else if (Array.isArray(signature)) {
	        arr = signature;
	      }
	      else {
	        throw new TypeError('String array or a comma separated string expected');
	      }

	      var str = arr.join(',');

	      // find an exact match
	      var match = fn.signatures[str];
	      if (match) {
	        return match;
	      }

	      // TODO: extend find to match non-exact signatures

	      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
	    }

	    /**
	     * Convert a given value to another data type.
	     * @param {*} value
	     * @param {string} type
	     */
	    function convert (value, type) {
	      var from = findTypeName(value);

	      // check conversion is needed
	      if (type === from) {
	        return value;
	      }

	      for (var i = 0; i < typed.conversions.length; i++) {
	        var conversion = typed.conversions[i];
	        if (conversion.from === from && conversion.to === type) {
	          return conversion.convert(value);
	        }
	      }

	      throw new Error('Cannot convert from ' + from + ' to ' + type);
	    }
	    
	    /**
	     * Stringify parameters in a normalized way
	     * @param {Param[]} params
	     * @return {string}
	     */
	    function stringifyParams (params) {
	      return params
	          .map(function (param) {
	            var typeNames = param.types.map(getTypeName);

	            return (param.restParam ? '...' : '') + typeNames.join('|');
	          })
	          .join(',');
	    }

	    /**
	     * Parse a parameter, like "...number | boolean"
	     * @param {string} param
	     * @param {ConversionDef[]} conversions
	     * @return {Param} param
	     */
	    function parseParam (param, conversions) {
	      var restParam = param.indexOf('...') === 0;
	      var types = (!restParam)
	          ? param
	          : (param.length > 3)
	              ? param.slice(3)
	              : 'any';

	      var typeNames = types.split('|').map(trim)
	          .filter(notEmpty)
	          .filter(notIgnore);

	      var matchingConversions = filterConversions(conversions, typeNames);

	      var exactTypes = typeNames.map(function (typeName) {
	        var type = findTypeByName(typeName);

	        return {
	          name: typeName,
	          typeIndex: findTypeIndex(type),
	          test: type.test,
	          conversion: null,
	          conversionIndex: -1
	        };
	      });

	      var convertibleTypes = matchingConversions.map(function (conversion) {
	        var type = findTypeByName(conversion.from);

	        return {
	          name: conversion.from,
	          typeIndex: findTypeIndex(type),
	          test: type.test,
	          conversion: conversion,
	          conversionIndex: conversions.indexOf(conversion)
	        };
	      });

	      return {
	        types: exactTypes.concat(convertibleTypes),
	        restParam: restParam
	      };
	    }

	    /**
	     * Parse a signature with comma separated parameters,
	     * like "number | boolean, ...string"
	     * @param {string} signature
	     * @param {function} fn
	     * @param {ConversionDef[]} conversions
	     * @return {Signature | null} signature
	     */
	    function parseSignature (signature, fn, conversions) {
	      var params = [];

	      if (signature.trim() !== '') {
	        params = signature
	            .split(',')
	            .map(trim)
	            .map(function (param, index, array) {
	              var parsedParam = parseParam(param, conversions);

	              if (parsedParam.restParam && (index !== array.length - 1)) {
	                throw new SyntaxError('Unexpected rest parameter "' + param + '": ' +
	                    'only allowed for the last parameter');
	              }

	              return parsedParam;
	          });
	      }

	      if (params.some(isInvalidParam)) {
	        // invalid signature: at least one parameter has no types
	        // (they may have been filtered)
	        return null;
	      }

	      return {
	        params: params,
	        fn: fn
	      };
	    }

	    /**
	     * Test whether a set of params contains a restParam
	     * @param {Param[]} params
	     * @return {boolean} Returns true when the last parameter is a restParam
	     */
	    function hasRestParam(params) {
	      var param = last(params);
	      return param ? param.restParam : false;
	    }

	    /**
	     * Test whether a parameter contains conversions
	     * @param {Param} param
	     * @return {boolean} Returns true when at least one of the parameters
	     *                   contains a conversion.
	     */
	    function hasConversions(param) {
	      return param.types.some(function (type) {
	        return type.conversion != null;
	      });
	    }

	    /**
	     * Create a type test for a single parameter, which can have one or multiple
	     * types.
	     * @param {Param} param
	     * @return {function(x: *) : boolean} Returns a test function
	     */
	    function compileTest(param) {
	      if (!param || param.types.length === 0) {
	        // nothing to do
	        return ok;
	      }
	      else if (param.types.length === 1) {
	        return findTypeByName(param.types[0].name).test;
	      }
	      else if (param.types.length === 2) {
	        var test0 = findTypeByName(param.types[0].name).test;
	        var test1 = findTypeByName(param.types[1].name).test;
	        return function or(x) {
	          return test0(x) || test1(x);
	        }
	      }
	      else { // param.types.length > 2
	        var tests = param.types.map(function (type) {
	          return findTypeByName(type.name).test;
	        });
	        return function or(x) {
	          for (var i = 0; i < tests.length; i++) {
	            if (tests[i](x)) {
	              return true;
	            }
	          }
	          return false;
	        }
	      }
	    }

	    /**
	     * Create a test for all parameters of a signature
	     * @param {Param[]} params
	     * @return {function(args: Array<*>) : boolean}
	     */
	    function compileTests(params) {
	      var tests, test0, test1;

	      if (hasRestParam(params)) {
	        // variable arguments like '...number'
	        tests = initial(params).map(compileTest);
	        var varIndex = tests.length;
	        var lastTest = compileTest(last(params));
	        var testRestParam = function (args) {
	          for (var i = varIndex; i < args.length; i++) {
	            if (!lastTest(args[i])) {
	              return false;
	            }
	          }
	          return true;
	        };

	        return function testArgs(args) {
	          for (var i = 0; i < tests.length; i++) {
	            if (!tests[i](args[i])) {
	              return false;
	            }
	          }
	          return testRestParam(args) && (args.length >= varIndex + 1);
	        };
	      }
	      else {
	        // no variable arguments
	        if (params.length === 0) {
	          return function testArgs(args) {
	            return args.length === 0;
	          };
	        }
	        else if (params.length === 1) {
	          test0 = compileTest(params[0]);
	          return function testArgs(args) {
	            return test0(args[0]) && args.length === 1;
	          };
	        }
	        else if (params.length === 2) {
	          test0 = compileTest(params[0]);
	          test1 = compileTest(params[1]);
	          return function testArgs(args) {
	            return test0(args[0]) && test1(args[1]) && args.length === 2;
	          };
	        }
	        else { // arguments.length > 2
	          tests = params.map(compileTest);
	          return function testArgs(args) {
	            for (var i = 0; i < tests.length; i++) {
	              if (!tests[i](args[i])) {
	                return false;
	              }
	            }
	            return args.length === tests.length;
	          };
	        }
	      }
	    }

	    /**
	     * Find the parameter at a specific index of a signature.
	     * Handles rest parameters.
	     * @param {Signature} signature
	     * @param {number} index
	     * @return {Param | null} Returns the matching parameter when found,
	     *                        null otherwise.
	     */
	    function getParamAtIndex(signature, index) {
	      return index < signature.params.length
	          ? signature.params[index]
	          : hasRestParam(signature.params)
	              ? last(signature.params)
	              : null
	    }

	    /**
	     * Get all type names of a parameter
	     * @param {Signature} signature
	     * @param {number} index
	     * @param {boolean} excludeConversions
	     * @return {string[]} Returns an array with type names
	     */
	    function getExpectedTypeNames (signature, index, excludeConversions) {
	      var param = getParamAtIndex(signature, index);
	      var types = param
	          ? excludeConversions
	                  ? param.types.filter(isExactType)
	                  : param.types
	          : [];

	      return types.map(getTypeName);
	    }

	    /**
	     * Returns the name of a type
	     * @param {Type} type
	     * @return {string} Returns the type name
	     */
	    function getTypeName(type) {
	      return type.name;
	    }

	    /**
	     * Test whether a type is an exact type or conversion
	     * @param {Type} type
	     * @return {boolean} Returns true when
	     */
	    function isExactType(type) {
	      return type.conversion === null || type.conversion === undefined;
	    }

	    /**
	     * Helper function for creating error messages: create an array with
	     * all available types on a specific argument index.
	     * @param {Signature[]} signatures
	     * @param {number} index
	     * @return {string[]} Returns an array with available types
	     */
	    function mergeExpectedParams(signatures, index) {
	      var typeNames = uniq(flatMap(signatures, function (signature) {
	        return getExpectedTypeNames(signature, index, false);
	      }));

	      return (typeNames.indexOf('any') !== -1) ? ['any'] : typeNames;
	    }

	    /**
	     * Create
	     * @param {string} name             The name of the function
	     * @param {array.<*>} args          The actual arguments passed to the function
	     * @param {Signature[]} signatures  A list with available signatures
	     * @return {TypeError} Returns a type error with additional data
	     *                     attached to it in the property `data`
	     */
	    function createError(name, args, signatures) {
	      var err, expected;
	      var _name = name || 'unnamed';

	      // test for wrong type at some index
	      var matchingSignatures = signatures;
	      var index;
	      for (index = 0; index < args.length; index++) {
	        var nextMatchingDefs = matchingSignatures.filter(function (signature) {
	          var test = compileTest(getParamAtIndex(signature, index));
	          return (index < signature.params.length || hasRestParam(signature.params)) &&
	              test(args[index]);
	        });

	        if (nextMatchingDefs.length === 0) {
	          // no matching signatures anymore, throw error "wrong type"
	          expected = mergeExpectedParams(matchingSignatures, index);
	          if (expected.length > 0) {
	            var actualType = findTypeName(args[index]);

	            err = new TypeError('Unexpected type of argument in function ' + _name +
	                ' (expected: ' + expected.join(' or ') +
	                ', actual: ' + actualType + ', index: ' + index + ')');
	            err.data = {
	              category: 'wrongType',
	              fn: _name,
	              index: index,
	              actual: actualType,
	              expected: expected
	            };
	            return err;
	          }
	        }
	        else {
	          matchingSignatures = nextMatchingDefs;
	        }
	      }

	      // test for too few arguments
	      var lengths = matchingSignatures.map(function (signature) {
	        return hasRestParam(signature.params) ? Infinity : signature.params.length;
	      });
	      if (args.length < Math.min.apply(null, lengths)) {
	        expected = mergeExpectedParams(matchingSignatures, index);
	        err = new TypeError('Too few arguments in function ' + _name +
	            ' (expected: ' + expected.join(' or ') +
	            ', index: ' + args.length + ')');
	        err.data = {
	          category: 'tooFewArgs',
	          fn: _name,
	          index: args.length,
	          expected: expected
	        };
	        return err;
	      }

	      // test for too many arguments
	      var maxLength = Math.max.apply(null, lengths);
	      if (args.length > maxLength) {
	        err = new TypeError('Too many arguments in function ' + _name +
	            ' (expected: ' + maxLength + ', actual: ' + args.length + ')');
	        err.data = {
	          category: 'tooManyArgs',
	          fn: _name,
	          index: args.length,
	          expectedLength: maxLength
	        };
	        return err;
	      }

	      err = new TypeError('Arguments of type "' + args.join(', ') +
	          '" do not match any of the defined signatures of function ' + _name + '.');
	      err.data = {
	        category: 'mismatch',
	        actual: args.map(findTypeName)
	      };
	      return err;
	    }

	    /**
	     * Find the lowest index of all exact types of a parameter (no conversions)
	     * @param {Param} param
	     * @return {number} Returns the index of the lowest type in typed.types
	     */
	    function getLowestTypeIndex (param) {
	      var min = 999;

	      for (var i = 0; i < param.types.length; i++) {
	        if (isExactType(param.types[i])) {
	          min = Math.min(min, param.types[i].typeIndex);
	        }
	      }

	      return min;
	    }

	    /**
	     * Find the lowest index of the conversion of all types of the parameter
	     * having a conversion
	     * @param {Param} param
	     * @return {number} Returns the lowest index of the conversions of this type
	     */
	    function getLowestConversionIndex (param) {
	      var min = 999;

	      for (var i = 0; i < param.types.length; i++) {
	        if (!isExactType(param.types[i])) {
	          min = Math.min(min, param.types[i].conversionIndex);
	        }
	      }

	      return min;
	    }

	    /**
	     * Compare two params
	     * @param {Param} param1
	     * @param {Param} param2
	     * @return {number} returns a negative number when param1 must get a lower
	     *                  index than param2, a positive number when the opposite,
	     *                  or zero when both are equal
	     */
	    function compareParams (param1, param2) {
	      var c;

	      // compare having a rest parameter or not
	      c = param1.restParam - param2.restParam;
	      if (c !== 0) {
	        return c;
	      }

	      // compare having conversions or not
	      c = hasConversions(param1) - hasConversions(param2);
	      if (c !== 0) {
	        return c;
	      }

	      // compare the index of the types
	      c = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
	      if (c !== 0) {
	        return c;
	      }

	      // compare the index of any conversion
	      return getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
	    }

	    /**
	     * Compare two signatures
	     * @param {Signature} signature1
	     * @param {Signature} signature2
	     * @return {number} returns a negative number when param1 must get a lower
	     *                  index than param2, a positive number when the opposite,
	     *                  or zero when both are equal
	     */
	    function compareSignatures (signature1, signature2) {
	      var len = Math.min(signature1.params.length, signature2.params.length);
	      var i;
	      var c;

	      // compare whether the params have conversions at all or not
	      c = signature1.params.some(hasConversions) - signature2.params.some(hasConversions);
	      if (c !== 0) {
	        return c;
	      }

	      // next compare whether the params have conversions one by one
	      for (i = 0; i < len; i++) {
	        c = hasConversions(signature1.params[i]) - hasConversions(signature2.params[i]);
	        if (c !== 0) {
	          return c;
	        }
	      }

	      // compare the types of the params one by one
	      for (i = 0; i < len; i++) {
	        c = compareParams(signature1.params[i], signature2.params[i]);
	        if (c !== 0) {
	          return c;
	        }
	      }

	      // compare the number of params
	      return signature1.params.length - signature2.params.length;
	    }

	    /**
	     * Get params containing all types that can be converted to the defined types.
	     *
	     * @param {ConversionDef[]} conversions
	     * @param {string[]} typeNames
	     * @return {ConversionDef[]} Returns the conversions that are available
	     *                        for every type (if any)
	     */
	    function filterConversions(conversions, typeNames) {
	      var matches = {};

	      conversions.forEach(function (conversion) {
	        if (typeNames.indexOf(conversion.from) === -1 &&
	            typeNames.indexOf(conversion.to) !== -1 &&
	            !matches[conversion.from]) {
	          matches[conversion.from] = conversion;
	        }
	      });

	      return Object.keys(matches).map(function (from) {
	        return matches[from];
	      });
	    }

	    /**
	     * Preprocess arguments before calling the original function:
	     * - if needed convert the parameters
	     * - in case of rest parameters, move the rest parameters into an Array
	     * @param {Param[]} params
	     * @param {function} fn
	     * @return {function} Returns a wrapped function
	     */
	    function compileArgsPreprocessing(params, fn) {
	      var fnConvert = fn;

	      // TODO: can we make this wrapper function smarter/simpler?

	      if (params.some(hasConversions)) {
	        var restParam = hasRestParam(params);
	        var compiledConversions = params.map(compileArgConversion);

	        fnConvert = function convertArgs() {
	          var args = [];
	          var last = restParam ? arguments.length - 1 : arguments.length;
	          for (var i = 0; i < last; i++) {
	            args[i] = compiledConversions[i](arguments[i]);
	          }
	          if (restParam) {
	            args[last] = arguments[last].map(compiledConversions[last]);
	          }

	          return fn.apply(null, args);
	        };
	      }

	      var fnPreprocess = fnConvert;
	      if (hasRestParam(params)) {
	        var offset = params.length - 1;

	        fnPreprocess = function preprocessRestParams () {
	          return fnConvert.apply(null,
	              slice(arguments, 0, offset).concat([slice(arguments, offset)]));
	        };
	      }

	      return fnPreprocess;
	    }

	    /**
	     * Compile conversion for a parameter to the right type
	     * @param {Param} param
	     * @return {function} Returns the wrapped function that will convert arguments
	     *
	     */
	    function compileArgConversion(param) {
	      var test0, test1, conversion0, conversion1;
	      var tests = [];
	      var conversions = [];

	      param.types.forEach(function (type) {
	        if (type.conversion) {
	          tests.push(findTypeByName(type.conversion.from).test);
	          conversions.push(type.conversion.convert);
	        }
	      });

	      // create optimized conversion functions depending on the number of conversions
	      switch (conversions.length) {
	        case 0:
	          return function convertArg(arg) {
	            return arg;
	          }

	        case 1:
	          test0 = tests[0];
	          conversion0 = conversions[0];
	          return function convertArg(arg) {
	            if (test0(arg)) {
	              return conversion0(arg)
	            }
	            return arg;
	          }

	        case 2:
	          test0 = tests[0];
	          test1 = tests[1];
	          conversion0 = conversions[0];
	          conversion1 = conversions[1];
	          return function convertArg(arg) {
	            if (test0(arg)) {
	              return conversion0(arg)
	            }
	            if (test1(arg)) {
	              return conversion1(arg)
	            }
	            return arg;
	          }

	        default:
	          return function convertArg(arg) {
	            for (var i = 0; i < conversions.length; i++) {
	              if (tests[i](arg)) {
	                return conversions[i](arg);
	              }
	            }
	            return arg;
	          }
	      }
	    }

	    /**
	     * Convert an array with signatures into a map with signatures,
	     * where signatures with union types are split into separate signatures
	     *
	     * Throws an error when there are conflicting types
	     *
	     * @param {Signature[]} signatures
	     * @return {Object.<string, function>}  Returns a map with signatures
	     *                                      as key and the original function
	     *                                      of this signature as value.
	     */
	    function createSignaturesMap(signatures) {
	      var signaturesMap = {};
	      signatures.forEach(function (signature) {
	        if (!signature.params.some(hasConversions)) {
	          splitParams(signature.params, true).forEach(function (params) {
	            signaturesMap[stringifyParams(params)] = signature.fn;
	          });
	        }
	      });

	      return signaturesMap;
	    }

	    /**
	     * Split params with union types in to separate params.
	     *
	     * For example:
	     *
	     *     splitParams([['Array', 'Object'], ['string', 'RegExp'])
	     *     // returns:
	     *     // [
	     *     //   ['Array', 'string'],
	     *     //   ['Array', 'RegExp'],
	     *     //   ['Object', 'string'],
	     *     //   ['Object', 'RegExp']
	     *     // ]
	     *
	     * @param {Param[]} params
	     * @param {boolean} ignoreConversionTypes
	     * @return {Param[]}
	     */
	    function splitParams(params, ignoreConversionTypes) {
	      function _splitParams(params, index, types) {
	        if (index < params.length) {
	          var param = params[index];
	          var filteredTypes = ignoreConversionTypes
	              ? param.types.filter(isExactType)
	              : param.types;
	          var typeGroups;

	          if (param.restParam) {
	            // split the types of a rest parameter in two:
	            // one with only exact types, and one with exact types and conversions
	            var exactTypes = filteredTypes.filter(isExactType);
	            typeGroups = exactTypes.length < filteredTypes.length
	                ? [exactTypes, filteredTypes]
	                : [filteredTypes];

	          }
	          else {
	            // split all the types of a regular parameter into one type per group
	            typeGroups = filteredTypes.map(function (type) {
	              return [type]
	            });
	          }

	          // recurse over the groups with types
	          return flatMap(typeGroups, function (typeGroup) {
	            return _splitParams(params, index + 1, types.concat([typeGroup]));
	          });

	        }
	        else {
	          // we've reached the end of the parameters. Now build a new Param
	          var splittedParams = types.map(function (type, typeIndex) {
	            return {
	              types: type,
	              restParam: (typeIndex === params.length - 1) && hasRestParam(params)
	            }
	          });

	          return [splittedParams];
	        }
	      }

	      return _splitParams(params, 0, []);
	    }

	    /**
	     * Test whether two signatures have a conflicting signature
	     * @param {Signature} signature1
	     * @param {Signature} signature2
	     * @return {boolean} Returns true when the signatures conflict, false otherwise.
	     */
	    function hasConflictingParams(signature1, signature2) {
	      var ii = Math.max(signature1.params.length, signature2.params.length);

	      for (var i = 0; i < ii; i++) {
	        var typesNames1 = getExpectedTypeNames(signature1, i, true);
	        var typesNames2 = getExpectedTypeNames(signature2, i, true);

	        if (!hasOverlap(typesNames1, typesNames2)) {
	          return false;
	        }
	      }

	      var len1 = signature1.params.length;
	      var len2 = signature2.params.length;
	      var restParam1 = hasRestParam(signature1.params);
	      var restParam2 = hasRestParam(signature2.params);

	      return restParam1
	          ? restParam2 ? (len1 === len2) : (len2 >= len1)
	          : restParam2 ? (len1 >= len2)  : (len1 === len2)
	    }

	    /**
	     * Create a typed function
	     * @param {String} name               The name for the typed function
	     * @param {Object.<string, function>} signaturesMap
	     *                                    An object with one or
	     *                                    multiple signatures as key, and the
	     *                                    function corresponding to the
	     *                                    signature as value.
	     * @return {function}  Returns the created typed function.
	     */
	    function createTypedFunction(name, signaturesMap) {
	      if (Object.keys(signaturesMap).length === 0) {
	        throw new SyntaxError('No signatures provided');
	      }

	      // parse the signatures, and check for conflicts
	      var parsedSignatures = [];
	      Object.keys(signaturesMap)
	          .map(function (signature) {
	            return parseSignature(signature, signaturesMap[signature], typed.conversions);
	          })
	          .filter(notNull)
	          .forEach(function (parsedSignature) {
	            // check whether this parameter conflicts with already parsed signatures
	            var conflictingSignature = findInArray(parsedSignatures, function (s) {
	              return hasConflictingParams(s, parsedSignature)
	            });
	            if (conflictingSignature) {
	              throw new TypeError('Conflicting signatures "' +
	                  stringifyParams(conflictingSignature.params) + '" and "' +
	                  stringifyParams(parsedSignature.params) + '".');
	            }

	            parsedSignatures.push(parsedSignature);
	          });

	      // split and filter the types of the signatures, and then order them
	      var signatures = flatMap(parsedSignatures, function (parsedSignature) {
	        var params = parsedSignature ? splitParams(parsedSignature.params, false) : [];

	        return params.map(function (params) {
	          return {
	            params: params,
	            fn: parsedSignature.fn
	          };
	        });
	      }).filter(notNull);

	      signatures.sort(compareSignatures);

	      // we create a highly optimized checks for the first couple of signatures with max 2 arguments
	      var ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
	      var ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
	      var ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
	      var ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
	      var ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
	      var ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
	      var allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;

	      // compile the tests
	      var tests = signatures.map(function (signature) {
	        return compileTests(signature.params);
	      });

	      var test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
	      var test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
	      var test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
	      var test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
	      var test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
	      var test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;

	      var test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
	      var test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
	      var test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
	      var test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
	      var test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
	      var test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;

	      // compile the functions
	      var fns = signatures.map(function(signature) {
	        return compileArgsPreprocessing(signature.params, signature.fn)
	      });

	      var fn0 = ok0 ? fns[0] : undef;
	      var fn1 = ok1 ? fns[1] : undef;
	      var fn2 = ok2 ? fns[2] : undef;
	      var fn3 = ok3 ? fns[3] : undef;
	      var fn4 = ok4 ? fns[4] : undef;
	      var fn5 = ok5 ? fns[5] : undef;

	      var len0 = ok0 ? signatures[0].params.length : -1;
	      var len1 = ok1 ? signatures[1].params.length : -1;
	      var len2 = ok2 ? signatures[2].params.length : -1;
	      var len3 = ok3 ? signatures[3].params.length : -1;
	      var len4 = ok4 ? signatures[4].params.length : -1;
	      var len5 = ok5 ? signatures[5].params.length : -1;

	      // simple and generic, but also slow
	      var iStart = allOk ? 6 : 0;
	      var iEnd = signatures.length;
	      var generic = function generic() {

	        for (var i = iStart; i < iEnd; i++) {
	          if (tests[i](arguments)) {
	            return fns[i].apply(null, arguments);
	          }
	        }

	        throw createError(name, arguments, signatures);
	      };

	      // create the typed function
	      // fast, specialized version. Falls back to the slower, generic one if needed
	      var fn = function fn(arg0, arg1) {

	        if (arguments.length === len0 && test00(arg0) && test01(arg1)) { return fn0.apply(null, arguments); }
	        if (arguments.length === len1 && test10(arg0) && test11(arg1)) { return fn1.apply(null, arguments); }
	        if (arguments.length === len2 && test20(arg0) && test21(arg1)) { return fn2.apply(null, arguments); }
	        if (arguments.length === len3 && test30(arg0) && test31(arg1)) { return fn3.apply(null, arguments); }
	        if (arguments.length === len4 && test40(arg0) && test41(arg1)) { return fn4.apply(null, arguments); }
	        if (arguments.length === len5 && test50(arg0) && test51(arg1)) { return fn5.apply(null, arguments); }

	        return generic.apply(null, arguments);
	      };

	      // attach name the typed function
	      try {
	        Object.defineProperty(fn, 'name', {value: name});
	      }
	      catch (err) {
	        // old browsers do not support Object.defineProperty and some don't support setting the name property
	        // the function name is not essential for the functioning, it's mostly useful for debugging,
	        // so it's fine to have unnamed functions.
	      }

	      // attach signatures to the function
	      fn.signatures = createSignaturesMap(signatures);

	      return fn;
	    }

	    /**
	     * Test whether a type should be NOT be ignored
	     * @param {string} typeName
	     * @return {boolean}
	     */
	    function notIgnore(typeName) {
	      return typed.ignore.indexOf(typeName) === -1;
	    }

	    /**
	     * trim a string
	     * @param {string} str
	     * @return {string}
	     */
	    function trim(str) {
	      return str.trim();
	    }

	    /**
	     * Test whether a string is not empty
	     * @param {string} str
	     * @return {boolean}
	     */
	    function notEmpty(str) {
	      return !!str;
	    }

	    /**
	     * test whether a value is not strict equal to null
	     * @param {*} value
	     * @return {boolean}
	     */
	    function notNull(value) {
	      return value !== null;
	    }

	    /**
	     * Test whether a parameter has no types defined
	     * @param {Param} param
	     * @return {boolean}
	     */
	    function isInvalidParam (param) {
	      return param.types.length === 0;
	    }

	    /**
	     * Return all but the last items of an array
	     * @param {Array} arr
	     * @return {Array}
	     */
	    function initial(arr) {
	      return arr.slice(0, arr.length - 1);
	    }

	    /**
	     * return the last item of an array
	     * @param {Array} arr
	     * @return {*}
	     */
	    function last(arr) {
	      return arr[arr.length - 1];
	    }

	    /**
	     * Slice an array or function Arguments
	     * @param {Array | Arguments | IArguments} arr
	     * @param {number} start
	     * @param {number} [end]
	     * @return {Array}
	     */
	    function slice(arr, start, end) {
	      return Array.prototype.slice.call(arr, start, end);
	    }

	    /**
	     * Test whether an array contains some item
	     * @param {Array} array
	     * @param {*} item
	     * @return {boolean} Returns true if array contains item, false if not.
	     */
	    function contains(array, item) {
	      return array.indexOf(item) !== -1;
	    }

	    /**
	     * Test whether two arrays have overlapping items
	     * @param {Array} array1
	     * @param {Array} array2
	     * @return {boolean} Returns true when at least one item exists in both arrays
	     */
	    function hasOverlap(array1, array2) {
	      for (var i = 0; i < array1.length; i++) {
	        if (contains(array2, array1[i])) {
	          return true;
	        }
	      }

	      return false;
	    }

	    /**
	     * Return the first item from an array for which test(arr[i]) returns true
	     * @param {Array} arr
	     * @param {function} test
	     * @return {* | undefined} Returns the first matching item
	     *                         or undefined when there is no match
	     */
	    function findInArray(arr, test) {
	      for (var i = 0; i < arr.length; i++) {
	        if (test(arr[i])) {
	          return arr[i];
	        }
	      }
	      return undefined;
	    }

	    /**
	     * Filter unique items of an array with strings
	     * @param {string[]} arr
	     * @return {string[]}
	     */
	    function uniq(arr) {
	      var entries = {};
	      for (var i = 0; i < arr.length; i++) {
	        entries[arr[i]] = true;
	      }
	      return Object.keys(entries);
	    }

	    /**
	     * Flat map the result invoking a callback for every item in an array.
	     * https://gist.github.com/samgiles/762ee337dff48623e729
	     * @param {Array} arr
	     * @param {function} callback
	     * @return {Array}
	     */
	    function flatMap(arr, callback) {
	      return Array.prototype.concat.apply([], arr.map(callback));
	    }

	    /**
	     * Retrieve the function name from a set of typed functions,
	     * and check whether the name of all functions match (if given)
	     * @param {function[]} fns
	     */
	    function getName (fns) {
	      var name = '';

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];

	        // check whether the names are the same when defined
	        if ((typeof fn.signatures === 'object' || typeof fn.signature === 'string') && fn.name !== '') {
	          if (name === '') {
	            name = fn.name;
	          }
	          else if (name !== fn.name) {
	            var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
	            err.data = {
	              actual: fn.name,
	              expected: name
	            };
	            throw err;
	          }
	        }
	      }

	      return name;
	    }

	    // extract and merge all signatures of a list with typed functions
	    function extractSignatures(fns) {
	      var err;
	      var signaturesMap = {};

	      function validateUnique(_signature, _fn) {
	        if (signaturesMap.hasOwnProperty(_signature) && _fn !== signaturesMap[_signature]) {
	          err = new Error('Signature "' + _signature + '" is defined twice');
	          err.data = {signature: _signature};
	          throw err;
	          // else: both signatures point to the same function, that's fine
	        }
	      }

	      for (var i = 0; i < fns.length; i++) {
	        var fn = fns[i];

	        // test whether this is a typed-function
	        if (typeof fn.signatures === 'object') {
	          // merge the signatures
	          for (var signature in fn.signatures) {
	            if (fn.signatures.hasOwnProperty(signature)) {
	              validateUnique(signature, fn.signatures[signature]);
	              signaturesMap[signature] = fn.signatures[signature];
	            }
	          }
	        }
	        else if (typeof fn.signature === 'string') {
	          validateUnique(fn.signature, fn);
	          signaturesMap[fn.signature] = fn;
	        }
	        else {
	          err = new TypeError('Function is no typed-function (index: ' + i + ')');
	          err.data = {index: i};
	          throw err;
	        }
	      }

	      return signaturesMap;
	    }

	    typed = createTypedFunction('typed', {
	      'string, Object': createTypedFunction,
	      'Object': function (signaturesMap) {
	        // find existing name
	        var fns = [];
	        for (var signature in signaturesMap) {
	          if (signaturesMap.hasOwnProperty(signature)) {
	            fns.push(signaturesMap[signature]);
	          }
	        }
	        var name = getName(fns);
	        return createTypedFunction(name, signaturesMap);
	      },
	      '...Function': function (fns) {
	        return createTypedFunction(getName(fns), extractSignatures(fns));
	      },
	      'string, ...Function': function (name, fns) {
	        return createTypedFunction(name, extractSignatures(fns));
	      }
	    });

	    typed.create = create;
	    typed.types = _types;
	    typed.conversions = _conversions;
	    typed.ignore = _ignore;
	    typed.convert = convert;
	    typed.find = find;

	    /**
	     * add a type
	     * @param {{name: string, test: function}} type
	     * @param {boolean} [beforeObjectTest=true]
	     *                          If true, the new test will be inserted before
	     *                          the test with name 'Object' (if any), since
	     *                          tests for Object match Array and classes too.
	     */
	    typed.addType = function (type, beforeObjectTest) {
	      if (!type || typeof type.name !== 'string' || typeof type.test !== 'function') {
	        throw new TypeError('Object with properties {name: string, test: function} expected');
	      }

	      if (beforeObjectTest !== false) {
	        for (var i = 0; i < typed.types.length; i++) {
	          if (typed.types[i].name === 'Object') {
	            typed.types.splice(i, 0, type);
	            return
	          }
	        }
	      }

	      typed.types.push(type);
	    };

	    // add a conversion
	    typed.addConversion = function (conversion) {
	      if (!conversion
	          || typeof conversion.from !== 'string'
	          || typeof conversion.to !== 'string'
	          || typeof conversion.convert !== 'function') {
	        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
	      }

	      typed.conversions.push(conversion);
	    };

	    return typed;
	  }

	  return create();
	}));
	});

	/**
	 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
	 */

	/**
	 * Check if a number is integer
	 * @param {number | boolean} value
	 * @return {boolean} isInteger
	 */

	function isInteger(value) {
	  if (typeof value === 'boolean') {
	    return true;
	  }

	  return isFinite(value) ? value === Math.round(value) : false; // Note: we use ==, not ===, as we can have Booleans as well
	}
	/**
	 * Convert a number to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'engineering'    Always use engineering notation.
	 *                                          For example '123.4e+0' and '14.0e+6'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lowerExp` and `upperExp` bounds, and
	 *                                          uses exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential',
	 *                                          'engineering', and 'auto',
	 *                                          `precision` defines the total
	 *                                          number of significant digits returned.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point.
	 *                                          `precision` is undefined by default,
	 *                                          not rounding any digits.
	 *                     {number} lowerExp    Exponent determining the lower boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `-3`.
	 *                     {number} upperExp    Exponent determining the upper boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `5`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4)                                        // '6.4'
	 *    format(1240000)                                    // '1.24e6'
	 *    format(1/3)                                        // '0.3333333333333333'
	 *    format(1/3, 3)                                     // '0.333'
	 *    format(21385, 2)                                   // '21000'
	 *    format(12.071, {notation: 'fixed'})                // '12'
	 *    format(2.3,    {notation: 'fixed', precision: 2})  // '2.30'
	 *    format(52.8,   {notation: 'exponential'})          // '5.28e+1'
	 *    format(12345678, {notation: 'engineering'})        // '12.345678e+6'
	 *
	 * @param {number} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */

	function format(value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  } // handle special cases


	  if (value === Infinity) {
	    return 'Infinity';
	  } else if (value === -Infinity) {
	    return '-Infinity';
	  } else if (isNaN(value)) {
	    return 'NaN';
	  } // default values for options


	  var notation = 'auto';
	  var precision;

	  if (options) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    } // determine precision from options


	    if (isNumber(options)) {
	      precision = options;
	    } else if (isNumber(options.precision)) {
	      precision = options.precision;
	    }
	  } // handle the various notations


	  switch (notation) {
	    case 'fixed':
	      return toFixed(value, precision);

	    case 'exponential':
	      return toExponential(value, precision);

	    case 'engineering':
	      return toEngineering(value, precision);

	    case 'auto':
	      // remove trailing zeros after the decimal point
	      return toPrecision(value, precision, options && options).replace(/((\.\d*?)(0+))($|e)/, function () {
	        var digits = arguments[2];
	        var e = arguments[4];
	        return digits !== '.' ? digits + e : e;
	      });

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
	  }
	}
	/**
	 * Split a number into sign, coefficients, and exponent
	 * @param {number | string} value
	 * @return {SplitValue}
	 *              Returns an object containing sign, coefficients, and exponent
	 */

	function splitNumber(value) {
	  // parse the input value
	  var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);

	  if (!match) {
	    throw new SyntaxError('Invalid number ' + value);
	  }

	  var sign = match[1];
	  var digits = match[2];
	  var exponent = parseFloat(match[4] || '0');
	  var dot = digits.indexOf('.');
	  exponent += dot !== -1 ? dot - 1 : digits.length - 1;
	  var coefficients = digits.replace('.', '') // remove the dot (must be removed before removing leading zeros)
	  .replace(/^0*/, function (zeros) {
	    // remove leading zeros, add their count to the exponent
	    exponent -= zeros.length;
	    return '';
	  }).replace(/0*$/, '') // remove trailing zeros
	  .split('').map(function (d) {
	    return parseInt(d);
	  });

	  if (coefficients.length === 0) {
	    coefficients.push(0);
	    exponent++;
	  }

	  return {
	    sign: sign,
	    coefficients: coefficients,
	    exponent: exponent
	  };
	}
	/**
	 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
	 * @param {number | string} value
	 * @param {number} [precision]        Optional number of significant figures to return.
	 */

	function toEngineering(value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  }

	  var split = splitNumber(value);
	  var rounded = roundDigits(split, precision);
	  var e = rounded.exponent;
	  var c = rounded.coefficients; // find nearest lower multiple of 3 for exponent

	  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;

	  if (isNumber(precision)) {
	    // add zeroes to give correct sig figs
	    while (precision > c.length || e - newExp + 1 > c.length) {
	      c.push(0);
	    }
	  } else {
	    // concatenate coefficients with necessary zeros
	    // add zeros if necessary (for example: 1e+8 -> 100e+6)
	    var missingZeros = Math.abs(e - newExp) - (c.length - 1);

	    for (var i = 0; i < missingZeros; i++) {
	      c.push(0);
	    }
	  } // find difference in exponents


	  var expDiff = Math.abs(e - newExp);
	  var decimalIdx = 1; // push decimal index over by expDiff times

	  while (expDiff > 0) {
	    decimalIdx++;
	    expDiff--;
	  } // if all coefficient values are zero after the decimal point and precision is unset, don't add a decimal value.
	  // otherwise concat with the rest of the coefficients


	  var decimals = c.slice(decimalIdx).join('');
	  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? '.' + decimals : '';
	  var str = c.slice(0, decimalIdx).join('') + decimalVal + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
	  return rounded.sign + str;
	}
	/**
	 * Format a number with fixed notation.
	 * @param {number | string} value
	 * @param {number} [precision=undefined]  Optional number of decimals after the
	 *                                        decimal point. null by default.
	 */

	function toFixed(value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  }

	  var splitValue = splitNumber(value);
	  var rounded = typeof precision === 'number' ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
	  var c = rounded.coefficients;
	  var p = rounded.exponent + 1; // exponent may have changed
	  // append zeros if needed

	  var pp = p + (precision || 0);

	  if (c.length < pp) {
	    c = c.concat(zeros(pp - c.length));
	  } // prepend zeros if needed


	  if (p < 0) {
	    c = zeros(-p + 1).concat(c);
	    p = 1;
	  } // insert a dot if needed


	  if (p < c.length) {
	    c.splice(p, 0, p === 0 ? '0.' : '.');
	  }

	  return rounded.sign + c.join('');
	}
	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {number | string} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 */

	function toExponential(value, precision) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  } // round if needed, else create a clone


	  var split = splitNumber(value);
	  var rounded = precision ? roundDigits(split, precision) : split;
	  var c = rounded.coefficients;
	  var e = rounded.exponent; // append zeros if needed

	  if (c.length < precision) {
	    c = c.concat(zeros(precision - c.length));
	  } // format as `C.CCCe+EEE` or `C.CCCe-EEE`


	  var first = c.shift();
	  return rounded.sign + first + (c.length > 0 ? '.' + c.join('') : '') + 'e' + (e >= 0 ? '+' : '') + e;
	}
	/**
	 * Format a number with a certain precision
	 * @param {number | string} value
	 * @param {number} [precision=undefined] Optional number of digits.
	 * @param {{lowerExp: number | undefined, upperExp: number | undefined}} [options]
	 *                                       By default:
	 *                                         lowerExp = -3 (incl)
	 *                                         upper = +5 (excl)
	 * @return {string}
	 */

	function toPrecision(value, precision, options) {
	  if (isNaN(value) || !isFinite(value)) {
	    return String(value);
	  } // determine lower and upper bound for exponential notation.


	  var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
	  var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5;
	  var split = splitNumber(value);
	  var rounded = precision ? roundDigits(split, precision) : split;

	  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
	    // exponential notation
	    return toExponential(value, precision);
	  } else {
	    var c = rounded.coefficients;
	    var e = rounded.exponent; // append trailing zeros

	    if (c.length < precision) {
	      c = c.concat(zeros(precision - c.length));
	    } // append trailing zeros
	    // TODO: simplify the next statement


	    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0))); // prepend zeros

	    c = zeros(-e).concat(c);
	    var dot = e > 0 ? e : 0;

	    if (dot < c.length - 1) {
	      c.splice(dot + 1, 0, '.');
	    }

	    return rounded.sign + c.join('');
	  }
	}
	/**
	 * Round the number of digits of a number *
	 * @param {SplitValue} split       A value split with .splitNumber(value)
	 * @param {number} precision  A positive integer
	 * @return {SplitValue}
	 *              Returns an object containing sign, coefficients, and exponent
	 *              with rounded digits
	 */

	function roundDigits(split, precision) {
	  // create a clone
	  var rounded = {
	    sign: split.sign,
	    coefficients: split.coefficients,
	    exponent: split.exponent
	  };
	  var c = rounded.coefficients; // prepend zeros if needed

	  while (precision <= 0) {
	    c.unshift(0);
	    rounded.exponent++;
	    precision++;
	  }

	  if (c.length > precision) {
	    var removed = c.splice(precision, c.length - precision);

	    if (removed[0] >= 5) {
	      var i = precision - 1;
	      c[i]++;

	      while (c[i] === 10) {
	        c.pop();

	        if (i === 0) {
	          c.unshift(0);
	          rounded.exponent++;
	          i++;
	        }

	        i--;
	        c[i]++;
	      }
	    }
	  }

	  return rounded;
	}
	/**
	 * Create an array filled with zeros.
	 * @param {number} length
	 * @return {Array}
	 */

	function zeros(length) {
	  var arr = [];

	  for (var i = 0; i < length; i++) {
	    arr.push(0);
	  }

	  return arr;
	}
	/**
	 * Count the number of significant digits of a number.
	 *
	 * For example:
	 *   2.34 returns 3
	 *   0.0034 returns 2
	 *   120.5e+30 returns 4
	 *
	 * @param {number} value
	 * @return {number} digits   Number of significant digits
	 */


	function digits(value) {
	  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
	  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
	  .length;
	}
	/**
	 * Minimum number added to one that makes the result different than one
	 */

	var DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;
	/**
	 * Compares two floating point numbers.
	 * @param {number} x          First value to compare
	 * @param {number} y          Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	*/

	function nearlyEqual(x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon === null || epsilon === undefined) {
	    return x === y;
	  }

	  if (x === y) {
	    return true;
	  } // NaN


	  if (isNaN(x) || isNaN(y)) {
	    return false;
	  } // at this point x and y should be finite


	  if (isFinite(x) && isFinite(y)) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = Math.abs(x - y);

	    if (diff < DBL_EPSILON) {
	      return true;
	    } else {
	      // use relative error
	      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
	    }
	  } // Infinite and Number or negative Infinite and positive Infinite cases


	  return false;
	}

	/**
	 * Convert a BigNumber to a formatted string representation.
	 *
	 * Syntax:
	 *
	 *    format(value)
	 *    format(value, options)
	 *    format(value, precision)
	 *    format(value, fn)
	 *
	 * Where:
	 *
	 *    {number} value   The value to be formatted
	 *    {Object} options An object with formatting options. Available options:
	 *                     {string} notation
	 *                         Number notation. Choose from:
	 *                         'fixed'          Always use regular number notation.
	 *                                          For example '123.40' and '14000000'
	 *                         'exponential'    Always use exponential notation.
	 *                                          For example '1.234e+2' and '1.4e+7'
	 *                         'auto' (default) Regular number notation for numbers
	 *                                          having an absolute value between
	 *                                          `lower` and `upper` bounds, and uses
	 *                                          exponential notation elsewhere.
	 *                                          Lower bound is included, upper bound
	 *                                          is excluded.
	 *                                          For example '123.4' and '1.4e7'.
	 *                     {number} precision   A number between 0 and 16 to round
	 *                                          the digits of the number.
	 *                                          In case of notations 'exponential',
	 *                                          'engineering', and 'auto',
	 *                                          `precision` defines the total
	 *                                          number of significant digits returned.
	 *                                          In case of notation 'fixed',
	 *                                          `precision` defines the number of
	 *                                          significant digits after the decimal
	 *                                          point.
	 *                                          `precision` is undefined by default.
	 *                     {number} lowerExp    Exponent determining the lower boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `-3`.
	 *                     {number} upperExp    Exponent determining the upper boundary
	 *                                          for formatting a value with an exponent
	 *                                          when `notation='auto`.
	 *                                          Default value is `5`.
	 *    {Function} fn    A custom formatting function. Can be used to override the
	 *                     built-in notations. Function `fn` is called with `value` as
	 *                     parameter and must return a string. Is useful for example to
	 *                     format all values inside a matrix in a particular way.
	 *
	 * Examples:
	 *
	 *    format(6.4)                                        // '6.4'
	 *    format(1240000)                                    // '1.24e6'
	 *    format(1/3)                                        // '0.3333333333333333'
	 *    format(1/3, 3)                                     // '0.333'
	 *    format(21385, 2)                                   // '21000'
	 *    format(12e8, {notation: 'fixed'})                  // returns '1200000000'
	 *    format(2.3,    {notation: 'fixed', precision: 4})  // returns '2.3000'
	 *    format(52.8,   {notation: 'exponential'})          // returns '5.28e+1'
	 *    format(12400,  {notation: 'engineering'})          // returns '12.400e+3'
	 *
	 * @param {BigNumber} value
	 * @param {Object | Function | number} [options]
	 * @return {string} str The formatted value
	 */
	function format$1(value, options) {
	  if (typeof options === 'function') {
	    // handle format(value, fn)
	    return options(value);
	  } // handle special cases


	  if (!value.isFinite()) {
	    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
	  } // default values for options


	  var notation = 'auto';
	  var precision;

	  if (options !== undefined) {
	    // determine notation from options
	    if (options.notation) {
	      notation = options.notation;
	    } // determine precision from options


	    if (typeof options === 'number') {
	      precision = options;
	    } else if (options.precision) {
	      precision = options.precision;
	    }
	  } // handle the various notations


	  switch (notation) {
	    case 'fixed':
	      return toFixed$1(value, precision);

	    case 'exponential':
	      return toExponential$1(value, precision);

	    case 'engineering':
	      return toEngineering$1(value, precision);

	    case 'auto':
	      {
	        // determine lower and upper bound for exponential notation.
	        // TODO: implement support for upper and lower to be BigNumbers themselves
	        var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
	        var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5; // handle special case zero

	        if (value.isZero()) return '0'; // determine whether or not to output exponential notation

	        var str;
	        var rounded = value.toSignificantDigits(precision);
	        var exp = rounded.e;

	        if (exp >= lowerExp && exp < upperExp) {
	          // normal number notation
	          str = rounded.toFixed();
	        } else {
	          // exponential notation
	          str = toExponential$1(value, precision);
	        } // remove trailing zeros after the decimal point


	        return str.replace(/((\.\d*?)(0+))($|e)/, function () {
	          var digits = arguments[2];
	          var e = arguments[4];
	          return digits !== '.' ? digits + e : e;
	        });
	      }

	    default:
	      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
	  }
	}
	/**
	 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
	 * @param {BigNumber | string} value
	 * @param {number} [precision]        Optional number of significant figures to return.
	 */

	function toEngineering$1(value, precision) {
	  // find nearest lower multiple of 3 for exponent
	  var e = value.e;
	  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3; // find difference in exponents, and calculate the value without exponent

	  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
	  var valueStr = valueWithoutExp.toPrecision(precision);

	  if (valueStr.indexOf('e') !== -1) {
	    valueStr = valueWithoutExp.toString();
	  }

	  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
	}
	/**
	 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
	 * @param {BigNumber} value
	 * @param {number} [precision]  Number of digits in formatted output.
	 *                              If not provided, the maximum available digits
	 *                              is used.
	 * @returns {string} str
	 */

	function toExponential$1(value, precision) {
	  if (precision !== undefined) {
	    return value.toExponential(precision - 1); // Note the offset of one
	  } else {
	    return value.toExponential();
	  }
	}
	/**
	 * Format a number with fixed notation.
	 * @param {BigNumber} value
	 * @param {number} [precision=undefined] Optional number of decimals after the
	 *                                       decimal point. Undefined by default.
	 */

	function toFixed$1(value, precision) {
	  return value.toFixed(precision);
	}

	function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
	/**
	 * Format a value of any type into a string.
	 *
	 * Usage:
	 *     math.format(value)
	 *     math.format(value, precision)
	 *
	 * When value is a function:
	 *
	 * - When the function has a property `syntax`, it returns this
	 *   syntax description.
	 * - In other cases, a string `'function'` is returned.
	 *
	 * When `value` is an Object:
	 *
	 * - When the object contains a property `format` being a function, this
	 *   function is invoked as `value.format(options)` and the result is returned.
	 * - When the object has its own `toString` method, this method is invoked
	 *   and the result is returned.
	 * - In other cases the function will loop over all object properties and
	 *   return JSON object notation like '{"a": 2, "b": 3}'.
	 *
	 * Example usage:
	 *     math.format(2/7)                // '0.2857142857142857'
	 *     math.format(math.pi, 3)         // '3.14'
	 *     math.format(new Complex(2, 3))  // '2 + 3i'
	 *     math.format('hello')            // '"hello"'
	 *
	 * @param {*} value             Value to be stringified
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @return {string} str
	 */

	function format$2(value, options) {
	  if (typeof value === 'number') {
	    return format(value, options);
	  }

	  if (isBigNumber(value)) {
	    return format$1(value, options);
	  } // note: we use unsafe duck-typing here to check for Fractions, this is
	  // ok here since we're only invoking toString or concatenating its values


	  if (looksLikeFraction(value)) {
	    if (!options || options.fraction !== 'decimal') {
	      // output as ratio, like '1/3'
	      return value.s * value.n + '/' + value.d;
	    } else {
	      // output as decimal, like '0.(3)'
	      return value.toString();
	    }
	  }

	  if (Array.isArray(value)) {
	    return formatArray(value, options);
	  }

	  if (isString(value)) {
	    return '"' + value + '"';
	  }

	  if (typeof value === 'function') {
	    return value.syntax ? String(value.syntax) : 'function';
	  }

	  if (value && _typeof$2(value) === 'object') {
	    if (typeof value.format === 'function') {
	      return value.format(options);
	    } else if (value && value.toString(options) !== {}.toString()) {
	      // this object has a non-native toString method, use that one
	      return value.toString(options);
	    } else {
	      var entries = Object.keys(value).map(function (key) {
	        return '"' + key + '": ' + format$2(value[key], options);
	      });
	      return '{' + entries.join(', ') + '}';
	    }
	  }

	  return String(value);
	}
	/**
	 * Recursively format an n-dimensional matrix
	 * Example output: "[[1, 2], [3, 4]]"
	 * @param {Array} array
	 * @param {Object | number | Function} [options]  Formatting options. See
	 *                                                lib/utils/number:format for a
	 *                                                description of the available
	 *                                                options.
	 * @returns {string} str
	 */

	function formatArray(array, options) {
	  if (Array.isArray(array)) {
	    var str = '[';
	    var len = array.length;

	    for (var i = 0; i < len; i++) {
	      if (i !== 0) {
	        str += ', ';
	      }

	      str += formatArray(array[i], options);
	    }

	    str += ']';
	    return str;
	  } else {
	    return format$2(array, options);
	  }
	}
	/**
	 * Check whether a value looks like a Fraction (unsafe duck-type check)
	 * @param {*} value
	 * @return {boolean}
	 */


	function looksLikeFraction(value) {
	  return value && _typeof$2(value) === 'object' && typeof value.s === 'number' && typeof value.n === 'number' && typeof value.d === 'number' || false;
	}

	/**
	 * Create a range error with the message:
	 *     'Dimension mismatch (<actual size> != <expected size>)'
	 * @param {number | number[]} actual        The actual size
	 * @param {number | number[]} expected      The expected size
	 * @param {string} [relation='!=']          Optional relation between actual
	 *                                          and expected size: '!=', '<', etc.
	 * @extends RangeError
	 */
	function DimensionError(actual, expected, relation) {
	  if (!(this instanceof DimensionError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.actual = actual;
	  this.expected = expected;
	  this.relation = relation;
	  this.message = 'Dimension mismatch (' + (Array.isArray(actual) ? '[' + actual.join(', ') + ']' : actual) + ' ' + (this.relation || '!=') + ' ' + (Array.isArray(expected) ? '[' + expected.join(', ') + ']' : expected) + ')';
	  this.stack = new Error().stack;
	}
	DimensionError.prototype = new RangeError();
	DimensionError.prototype.constructor = RangeError;
	DimensionError.prototype.name = 'DimensionError';
	DimensionError.prototype.isDimensionError = true;

	/**
	 * Create a range error with the message:
	 *     'Index out of range (index < min)'
	 *     'Index out of range (index < max)'
	 *
	 * @param {number} index     The actual index
	 * @param {number} [min=0]   Minimum index (included)
	 * @param {number} [max]     Maximum index (excluded)
	 * @extends RangeError
	 */
	function IndexError(index, min, max) {
	  if (!(this instanceof IndexError)) {
	    throw new SyntaxError('Constructor must be called with the new operator');
	  }

	  this.index = index;

	  if (arguments.length < 3) {
	    this.min = 0;
	    this.max = min;
	  } else {
	    this.min = min;
	    this.max = max;
	  }

	  if (this.min !== undefined && this.index < this.min) {
	    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
	  } else if (this.max !== undefined && this.index >= this.max) {
	    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
	  } else {
	    this.message = 'Index out of range (' + this.index + ')';
	  }

	  this.stack = new Error().stack;
	}
	IndexError.prototype = new RangeError();
	IndexError.prototype.constructor = RangeError;
	IndexError.prototype.name = 'IndexError';
	IndexError.prototype.isIndexError = true;

	/**
	 * Calculate the size of a multi dimensional array.
	 * This function checks the size of the first entry, it does not validate
	 * whether all dimensions match. (use function `validate` for that)
	 * @param {Array} x
	 * @Return {Number[]} size
	 */

	function arraySize(x) {
	  var s = [];

	  while (Array.isArray(x)) {
	    s.push(x.length);
	    x = x[0];
	  }

	  return s;
	}
	/**
	 * Recursively validate whether each element in a multi dimensional array
	 * has a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @param {number} dim   Current dimension
	 * @throws DimensionError
	 * @private
	 */

	function _validate(array, size, dim) {
	  var i;
	  var len = array.length;

	  if (len !== size[dim]) {
	    throw new DimensionError(len, size[dim]);
	  }

	  if (dim < size.length - 1) {
	    // recursively validate each child array
	    var dimNext = dim + 1;

	    for (i = 0; i < len; i++) {
	      var child = array[i];

	      if (!Array.isArray(child)) {
	        throw new DimensionError(size.length - 1, size.length, '<');
	      }

	      _validate(array[i], size, dimNext);
	    }
	  } else {
	    // last dimension. none of the childs may be an array
	    for (i = 0; i < len; i++) {
	      if (Array.isArray(array[i])) {
	        throw new DimensionError(size.length + 1, size.length, '>');
	      }
	    }
	  }
	}
	/**
	 * Validate whether each element in a multi dimensional array has
	 * a size corresponding to the provided size array.
	 * @param {Array} array    Array to be validated
	 * @param {number[]} size  Array with the size of each dimension
	 * @throws DimensionError
	 */


	function validate(array, size) {
	  var isScalar = size.length === 0;

	  if (isScalar) {
	    // scalar
	    if (Array.isArray(array)) {
	      throw new DimensionError(array.length, 0);
	    }
	  } else {
	    // array
	    _validate(array, size, 0);
	  }
	}
	/**
	 * Test whether index is an integer number with index >= 0 and index < length
	 * when length is provided
	 * @param {number} index    Zero-based index
	 * @param {number} [length] Length of the array
	 */

	function validateIndex(index, length) {
	  if (!isNumber(index) || !isInteger(index)) {
	    throw new TypeError('Index must be an integer (value: ' + index + ')');
	  }

	  if (index < 0 || typeof length === 'number' && index >= length) {
	    throw new IndexError(index, length);
	  }
	}
	/**
	 * Resize a multi dimensional array. The resized array is returned.
	 * @param {Array} array         Array to be resized
	 * @param {Array.<number>} size Array with the size of each dimension
	 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
	 *                              zero by default. Specify for example `null`,
	 *                              to clearly see entries that are not explicitly
	 *                              set.
	 * @return {Array} array         The resized array
	 */

	function resize(array, size, defaultValue) {
	  // TODO: add support for scalars, having size=[] ?
	  // check the type of the arguments
	  if (!Array.isArray(array) || !Array.isArray(size)) {
	    throw new TypeError('Array expected');
	  }

	  if (size.length === 0) {
	    throw new Error('Resizing to scalar is not supported');
	  } // check whether size contains positive integers


	  size.forEach(function (value) {
	    if (!isNumber(value) || !isInteger(value) || value < 0) {
	      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format$2(size) + ')');
	    }
	  }); // recursively resize the array

	  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;

	  _resize(array, size, 0, _defaultValue);

	  return array;
	}
	/**
	 * Recursively resize a multi dimensional array
	 * @param {Array} array         Array to be resized
	 * @param {number[]} size       Array with the size of each dimension
	 * @param {number} dim          Current dimension
	 * @param {*} [defaultValue]    Value to be filled in in new entries,
	 *                              undefined by default.
	 * @private
	 */

	function _resize(array, size, dim, defaultValue) {
	  var i;
	  var elem;
	  var oldLen = array.length;
	  var newLen = size[dim];
	  var minLen = Math.min(oldLen, newLen); // apply new length

	  array.length = newLen;

	  if (dim < size.length - 1) {
	    // non-last dimension
	    var dimNext = dim + 1; // resize existing child arrays

	    for (i = 0; i < minLen; i++) {
	      // resize child array
	      elem = array[i];

	      if (!Array.isArray(elem)) {
	        elem = [elem]; // add a dimension

	        array[i] = elem;
	      }

	      _resize(elem, size, dimNext, defaultValue);
	    } // create new child arrays


	    for (i = minLen; i < newLen; i++) {
	      // get child array
	      elem = [];
	      array[i] = elem; // resize new child array

	      _resize(elem, size, dimNext, defaultValue);
	    }
	  } else {
	    // last dimension
	    // remove dimensions of existing values
	    for (i = 0; i < minLen; i++) {
	      while (Array.isArray(array[i])) {
	        array[i] = array[i][0];
	      }
	    } // fill new elements with the default value


	    for (i = minLen; i < newLen; i++) {
	      array[i] = defaultValue;
	    }
	  }
	}
	/**
	 * Re-shape a multi dimensional array to fit the specified dimensions
	 * @param {Array} array           Array to be reshaped
	 * @param {Array.<number>} sizes  List of sizes for each dimension
	 * @returns {Array}               Array whose data has been formatted to fit the
	 *                                specified dimensions
	 *
	 * @throws {DimensionError}       If the product of the new dimension sizes does
	 *                                not equal that of the old ones
	 */


	function reshape(array, sizes) {
	  var flatArray = flatten(array);
	  var newArray;

	  function product(arr) {
	    return arr.reduce(function (prev, curr) {
	      return prev * curr;
	    });
	  }

	  if (!Array.isArray(array) || !Array.isArray(sizes)) {
	    throw new TypeError('Array expected');
	  }

	  if (sizes.length === 0) {
	    throw new DimensionError(0, product(arraySize(array)), '!=');
	  }

	  var totalSize = 1;

	  for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) {
	    totalSize *= sizes[sizeIndex];
	  }

	  if (flatArray.length !== totalSize) {
	    throw new DimensionError(product(sizes), product(arraySize(array)), '!=');
	  }

	  try {
	    newArray = _reshape(flatArray, sizes);
	  } catch (e) {
	    if (e instanceof DimensionError) {
	      throw new DimensionError(product(sizes), product(arraySize(array)), '!=');
	    }

	    throw e;
	  }

	  return newArray;
	}
	/**
	 * Iteratively re-shape a multi dimensional array to fit the specified dimensions
	 * @param {Array} array           Array to be reshaped
	 * @param {Array.<number>} sizes  List of sizes for each dimension
	 * @returns {Array}               Array whose data has been formatted to fit the
	 *                                specified dimensions
	 */

	function _reshape(array, sizes) {
	  // testing if there are enough elements for the requested shape
	  var tmpArray = array;
	  var tmpArray2; // for each dimensions starting by the last one and ignoring the first one

	  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
	    var size = sizes[sizeIndex];
	    tmpArray2 = []; // aggregate the elements of the current tmpArray in elements of the requested size

	    var length = tmpArray.length / size;

	    for (var i = 0; i < length; i++) {
	      tmpArray2.push(tmpArray.slice(i * size, (i + 1) * size));
	    } // set it as the new tmpArray for the next loop turn or for return


	    tmpArray = tmpArray2;
	  }

	  return tmpArray;
	}
	/**
	 * Unsqueeze a multi dimensional array: add dimensions when missing
	 *
	 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
	 *
	 * @param {Array} array
	 * @param {number} dims       Desired number of dimensions of the array
	 * @param {number} [outer]    Number of outer dimensions to be added
	 * @param {Array} [size] Current size of array.
	 * @returns {Array} returns the array itself
	 * @private
	 */


	function unsqueeze(array, dims, outer, size) {
	  var s = size || arraySize(array); // unsqueeze outer dimensions

	  if (outer) {
	    for (var i = 0; i < outer; i++) {
	      array = [array];
	      s.unshift(1);
	    }
	  } // unsqueeze inner dimensions


	  array = _unsqueeze(array, dims, 0);

	  while (s.length < dims) {
	    s.push(1);
	  }

	  return array;
	}
	/**
	 * Recursively unsqueeze a multi dimensional array
	 * @param {Array} array
	 * @param {number} dims Required number of dimensions
	 * @param {number} dim  Current dimension
	 * @returns {Array | *} Returns the squeezed array
	 * @private
	 */

	function _unsqueeze(array, dims, dim) {
	  var i, ii;

	  if (Array.isArray(array)) {
	    var next = dim + 1;

	    for (i = 0, ii = array.length; i < ii; i++) {
	      array[i] = _unsqueeze(array[i], dims, next);
	    }
	  } else {
	    for (var d = dim; d < dims; d++) {
	      array = [array];
	    }
	  }

	  return array;
	}
	/**
	 * Flatten a multi dimensional array, put all elements in a one dimensional
	 * array
	 * @param {Array} array   A multi dimensional array
	 * @return {Array}        The flattened array (1 dimensional)
	 */


	function flatten(array) {
	  if (!Array.isArray(array)) {
	    // if not an array, return as is
	    return array;
	  }

	  var flat = [];
	  array.forEach(function callback(value) {
	    if (Array.isArray(value)) {
	      value.forEach(callback); // traverse through sub-arrays recursively
	    } else {
	      flat.push(value);
	    }
	  });
	  return flat;
	}
	/**
	 * Check the datatype of a given object
	 * This is a low level implementation that should only be used by
	 * parent Matrix classes such as SparseMatrix or DenseMatrix
	 * This method does not validate Array Matrix shape
	 * @param {Array} array
	 * @param {function} typeOf   Callback function to use to determine the type of a value
	 * @return string
	 */

	function getArrayDataType(array, typeOf) {
	  var type; // to hold type info

	  var length = 0; // to hold length value to ensure it has consistent sizes

	  for (var i = 0; i < array.length; i++) {
	    var item = array[i];
	    var isArray = Array.isArray(item); // Saving the target matrix row size

	    if (i === 0 && isArray) {
	      length = item.length;
	    } // If the current item is an array but the length does not equal the targetVectorSize


	    if (isArray && item.length !== length) {
	      return undefined;
	    }

	    var itemType = isArray ? getArrayDataType(item, typeOf) // recurse into a nested array
	    : typeOf(item);

	    if (type === undefined) {
	      type = itemType; // first item
	    } else if (type !== itemType) {
	      return 'mixed';
	    }
	  }

	  return type;
	}

	/**
	 * Create a factory function, which can be used to inject dependencies.
	 *
	 * The created functions are memoized, a consecutive call of the factory
	 * with the exact same inputs will return the same function instance.
	 * The memoized cache is exposed on `factory.cache` and can be cleared
	 * if needed.
	 *
	 * Example:
	 *
	 *     const name = 'log'
	 *     const dependencies = ['config', 'typed', 'divideScalar', 'Complex']
	 *
	 *     export const createLog = factory(name, dependencies, ({ typed, config, divideScalar, Complex }) => {
	 *       // ... create the function log here and return it
	 *     }
	 *
	 * @param {string} name           Name of the function to be created
	 * @param {string[]} dependencies The names of all required dependencies
	 * @param {function} create       Callback function called with an object with all dependencies
	 * @param {Object} [meta]         Optional object with meta information that will be attached
	 *                                to the created factory function as property `meta`.
	 * @returns {function}
	 */

	function factory(name, dependencies, create, meta) {
	  function assertAndCreate(scope) {
	    // we only pass the requested dependencies to the factory function
	    // to prevent functions to rely on dependencies that are not explicitly
	    // requested.
	    var deps = pickShallow(scope, dependencies.map(stripOptionalNotation));
	    assertDependencies(name, dependencies, scope);
	    return create(deps);
	  }

	  assertAndCreate.isFactory = true;
	  assertAndCreate.fn = name;
	  assertAndCreate.dependencies = dependencies.slice().sort();

	  if (meta) {
	    assertAndCreate.meta = meta;
	  }

	  return assertAndCreate;
	}
	/**
	 * Assert that all dependencies of a list with dependencies are available in the provided scope.
	 *
	 * Will throw an exception when there are dependencies missing.
	 *
	 * @param {string} name   Name for the function to be created. Used to generate a useful error message
	 * @param {string[]} dependencies
	 * @param {Object} scope
	 */

	function assertDependencies(name, dependencies, scope) {
	  var allDefined = dependencies.filter(function (dependency) {
	    return !isOptionalDependency(dependency);
	  }) // filter optionals
	  .every(function (dependency) {
	    return scope[dependency] !== undefined;
	  });

	  if (!allDefined) {
	    var missingDependencies = dependencies.filter(function (dependency) {
	      return scope[dependency] === undefined;
	    }); // TODO: create a custom error class for this, a MathjsError or something like that

	    throw new Error("Cannot create function \"".concat(name, "\", ") + "some dependencies are missing: ".concat(missingDependencies.map(function (d) {
	      return "\"".concat(d, "\"");
	    }).join(', '), "."));
	  }
	}
	function isOptionalDependency(dependency) {
	  return dependency && dependency[0] === '?';
	}
	function stripOptionalNotation(dependency) {
	  return dependency && dependency[0] === '?' ? dependency.slice(1) : dependency;
	}

	/**
	 * Create a typed-function which checks the types of the arguments and
	 * can match them against multiple provided signatures. The typed-function
	 * automatically converts inputs in order to find a matching signature.
	 * Typed functions throw informative errors in case of wrong input arguments.
	 *
	 * See the library [typed-function](https://github.com/josdejong/typed-function)
	 * for detailed documentation.
	 *
	 * Syntax:
	 *
	 *     math.typed(name, signatures) : function
	 *     math.typed(signatures) : function
	 *
	 * Examples:
	 *
	 *     // create a typed function with multiple types per argument (type union)
	 *     const fn2 = typed({
	 *       'number | boolean': function (b) {
	 *         return 'b is a number or boolean'
	 *       },
	 *       'string, number | boolean': function (a, b) {
	 *         return 'a is a string, b is a number or boolean'
	 *       }
	 *     })
	 *
	 *     // create a typed function with an any type argument
	 *     const log = typed({
	 *       'string, any': function (event, data) {
	 *         console.log('event: ' + event + ', data: ' + JSON.stringify(data))
	 *       }
	 *     })
	 *
	 * @param {string} [name]                          Optional name for the typed-function
	 * @param {Object<string, function>} signatures   Object with one or multiple function signatures
	 * @returns {function} The created typed-function.
	 */

	var _createTyped2 = function _createTyped() {
	  // initially, return the original instance of typed-function
	  // consecutively, return a new instance from typed.create.
	  _createTyped2 = typedFunction.create;
	  return typedFunction;
	};

	var dependencies = ['?BigNumber', '?Complex', '?DenseMatrix', '?Fraction'];
	/**
	 * Factory function for creating a new typed instance
	 * @param {Object} dependencies   Object with data types like Complex and BigNumber
	 * @returns {Function}
	 */

	var createTyped = /* #__PURE__ */factory('typed', dependencies, function createTyped(_ref) {
	  var BigNumber = _ref.BigNumber,
	      Complex = _ref.Complex,
	      DenseMatrix = _ref.DenseMatrix,
	      Fraction = _ref.Fraction;

	  // TODO: typed-function must be able to silently ignore signatures with unknown data types
	  // get a new instance of typed-function
	  var typed = _createTyped2(); // define all types. The order of the types determines in which order function
	  // arguments are type-checked (so for performance it's important to put the
	  // most used types first).


	  typed.types = [{
	    name: 'number',
	    test: isNumber
	  }, {
	    name: 'Complex',
	    test: isComplex
	  }, {
	    name: 'BigNumber',
	    test: isBigNumber
	  }, {
	    name: 'Fraction',
	    test: isFraction
	  }, {
	    name: 'Unit',
	    test: isUnit
	  }, {
	    name: 'string',
	    test: isString
	  }, {
	    name: 'Chain',
	    test: isChain
	  }, {
	    name: 'Array',
	    test: isArray$1
	  }, {
	    name: 'Matrix',
	    test: isMatrix
	  }, {
	    name: 'DenseMatrix',
	    test: isDenseMatrix
	  }, {
	    name: 'SparseMatrix',
	    test: isSparseMatrix
	  }, {
	    name: 'Range',
	    test: isRange
	  }, {
	    name: 'Index',
	    test: isIndex
	  }, {
	    name: 'boolean',
	    test: isBoolean
	  }, {
	    name: 'ResultSet',
	    test: isResultSet
	  }, {
	    name: 'Help',
	    test: isHelp
	  }, {
	    name: 'function',
	    test: isFunction
	  }, {
	    name: 'Date',
	    test: isDate
	  }, {
	    name: 'RegExp',
	    test: isRegExp
	  }, {
	    name: 'null',
	    test: isNull
	  }, {
	    name: 'undefined',
	    test: isUndefined
	  }, {
	    name: 'AccessorNode',
	    test: isAccessorNode
	  }, {
	    name: 'ArrayNode',
	    test: isArrayNode
	  }, {
	    name: 'AssignmentNode',
	    test: isAssignmentNode
	  }, {
	    name: 'BlockNode',
	    test: isBlockNode
	  }, {
	    name: 'ConditionalNode',
	    test: isConditionalNode
	  }, {
	    name: 'ConstantNode',
	    test: isConstantNode
	  }, {
	    name: 'FunctionNode',
	    test: isFunctionNode
	  }, {
	    name: 'FunctionAssignmentNode',
	    test: isFunctionAssignmentNode
	  }, {
	    name: 'IndexNode',
	    test: isIndexNode
	  }, {
	    name: 'Node',
	    test: isNode
	  }, {
	    name: 'ObjectNode',
	    test: isObjectNode
	  }, {
	    name: 'OperatorNode',
	    test: isOperatorNode
	  }, {
	    name: 'ParenthesisNode',
	    test: isParenthesisNode
	  }, {
	    name: 'RangeNode',
	    test: isRangeNode
	  }, {
	    name: 'SymbolNode',
	    test: isSymbolNode
	  }, {
	    name: 'Object',
	    test: isObject$1
	  } // order 'Object' last, it matches on other classes too
	  ];
	  typed.conversions = [{
	    from: 'number',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      if (!BigNumber) {
	        throwNoBignumber(x);
	      } // note: conversion from number to BigNumber can fail if x has >15 digits


	      if (digits(x) > 15) {
	        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
	      }

	      return new BigNumber(x);
	    }
	  }, {
	    from: 'number',
	    to: 'Complex',
	    convert: function convert(x) {
	      if (!Complex) {
	        throwNoComplex(x);
	      }

	      return new Complex(x, 0);
	    }
	  }, {
	    from: 'number',
	    to: 'string',
	    convert: function convert(x) {
	      return x + '';
	    }
	  }, {
	    from: 'BigNumber',
	    to: 'Complex',
	    convert: function convert(x) {
	      if (!Complex) {
	        throwNoComplex(x);
	      }

	      return new Complex(x.toNumber(), 0);
	    }
	  }, {
	    from: 'Fraction',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' + 'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
	    }
	  }, {
	    from: 'Fraction',
	    to: 'Complex',
	    convert: function convert(x) {
	      if (!Complex) {
	        throwNoComplex(x);
	      }

	      return new Complex(x.valueOf(), 0);
	    }
	  }, {
	    from: 'number',
	    to: 'Fraction',
	    convert: function convert(x) {
	      if (!Fraction) {
	        throwNoFraction(x);
	      }

	      var f = new Fraction(x);

	      if (f.valueOf() !== x) {
	        throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
	      }

	      return f;
	    }
	  }, {
	    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
	    //  from: 'Fraction',
	    //  to: 'number',
	    //  convert: function (x) {
	    //    return x.valueOf()
	    //  }
	    // }, {
	    from: 'string',
	    to: 'number',
	    convert: function convert(x) {
	      var n = Number(x);

	      if (isNaN(n)) {
	        throw new Error('Cannot convert "' + x + '" to a number');
	      }

	      return n;
	    }
	  }, {
	    from: 'string',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      if (!BigNumber) {
	        throwNoBignumber(x);
	      }

	      try {
	        return new BigNumber(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to BigNumber');
	      }
	    }
	  }, {
	    from: 'string',
	    to: 'Fraction',
	    convert: function convert(x) {
	      if (!Fraction) {
	        throwNoFraction(x);
	      }

	      try {
	        return new Fraction(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to Fraction');
	      }
	    }
	  }, {
	    from: 'string',
	    to: 'Complex',
	    convert: function convert(x) {
	      if (!Complex) {
	        throwNoComplex(x);
	      }

	      try {
	        return new Complex(x);
	      } catch (err) {
	        throw new Error('Cannot convert "' + x + '" to Complex');
	      }
	    }
	  }, {
	    from: 'boolean',
	    to: 'number',
	    convert: function convert(x) {
	      return +x;
	    }
	  }, {
	    from: 'boolean',
	    to: 'BigNumber',
	    convert: function convert(x) {
	      if (!BigNumber) {
	        throwNoBignumber(x);
	      }

	      return new BigNumber(+x);
	    }
	  }, {
	    from: 'boolean',
	    to: 'Fraction',
	    convert: function convert(x) {
	      if (!Fraction) {
	        throwNoFraction(x);
	      }

	      return new Fraction(+x);
	    }
	  }, {
	    from: 'boolean',
	    to: 'string',
	    convert: function convert(x) {
	      return String(x);
	    }
	  }, {
	    from: 'Array',
	    to: 'Matrix',
	    convert: function convert(array) {
	      if (!DenseMatrix) {
	        throwNoMatrix();
	      }

	      return new DenseMatrix(array);
	    }
	  }, {
	    from: 'Matrix',
	    to: 'Array',
	    convert: function convert(matrix) {
	      return matrix.valueOf();
	    }
	  }];
	  return typed;
	});

	function throwNoBignumber(x) {
	  throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
	}

	function throwNoComplex(x) {
	  throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
	}

	function throwNoMatrix() {
	  throw new Error('Cannot convert array into a Matrix: no class \'DenseMatrix\' provided');
	}

	function throwNoFraction(x) {
	  throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
	}

	/*
	 *  decimal.js v10.2.0
	 *  An arbitrary-precision Decimal type for JavaScript.
	 *  https://github.com/MikeMcl/decimal.js
	 *  Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
	 *  MIT Licence
	 */


	// -----------------------------------  EDITABLE DEFAULTS  ------------------------------------ //


	  // The maximum exponent magnitude.
	  // The limit on the value of `toExpNeg`, `toExpPos`, `minE` and `maxE`.
	var EXP_LIMIT = 9e15,                      // 0 to 9e15

	  // The limit on the value of `precision`, and on the value of the first argument to
	  // `toDecimalPlaces`, `toExponential`, `toFixed`, `toPrecision` and `toSignificantDigits`.
	  MAX_DIGITS = 1e9,                        // 0 to 1e9

	  // Base conversion alphabet.
	  NUMERALS = '0123456789abcdef',

	  // The natural logarithm of 10 (1025 digits).
	  LN10 = '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',

	  // Pi (1025 digits).
	  PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',


	  // The initial configuration properties of the Decimal constructor.
	  DEFAULTS = {

	    // These values must be integers within the stated ranges (inclusive).
	    // Most of these values can be changed at run-time using the `Decimal.config` method.

	    // The maximum number of significant digits of the result of a calculation or base conversion.
	    // E.g. `Decimal.config({ precision: 20 });`
	    precision: 20,                         // 1 to MAX_DIGITS

	    // The rounding mode used when rounding to `precision`.
	    //
	    // ROUND_UP         0 Away from zero.
	    // ROUND_DOWN       1 Towards zero.
	    // ROUND_CEIL       2 Towards +Infinity.
	    // ROUND_FLOOR      3 Towards -Infinity.
	    // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	    // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	    // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	    // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	    // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	    //
	    // E.g.
	    // `Decimal.rounding = 4;`
	    // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
	    rounding: 4,                           // 0 to 8

	    // The modulo mode used when calculating the modulus: a mod n.
	    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	    // The remainder (r) is calculated as: r = a - n * q.
	    //
	    // UP         0 The remainder is positive if the dividend is negative, else is negative.
	    // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
	    // FLOOR      3 The remainder has the same sign as the divisor (Python %).
	    // HALF_EVEN  6 The IEEE 754 remainder function.
	    // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
	    //
	    // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
	    // division (9) are commonly used for the modulus operation. The other rounding modes can also
	    // be used, but they may not give useful results.
	    modulo: 1,                             // 0 to 9

	    // The exponent value at and beneath which `toString` returns exponential notation.
	    // JavaScript numbers: -7
	    toExpNeg: -7,                          // 0 to -EXP_LIMIT

	    // The exponent value at and above which `toString` returns exponential notation.
	    // JavaScript numbers: 21
	    toExpPos:  21,                         // 0 to EXP_LIMIT

	    // The minimum exponent value, beneath which underflow to zero occurs.
	    // JavaScript numbers: -324  (5e-324)
	    minE: -EXP_LIMIT,                      // -1 to -EXP_LIMIT

	    // The maximum exponent value, above which overflow to Infinity occurs.
	    // JavaScript numbers: 308  (1.7976931348623157e+308)
	    maxE: EXP_LIMIT,                       // 1 to EXP_LIMIT

	    // Whether to use cryptographically-secure random number generation, if available.
	    crypto: false                          // true/false
	  },


	// ----------------------------------- END OF EDITABLE DEFAULTS ------------------------------- //


	  inexact, quadrant,
	  external = true,

	  decimalError = '[DecimalError] ',
	  invalidArgument = decimalError + 'Invalid argument: ',
	  precisionLimitExceeded = decimalError + 'Precision limit exceeded',
	  cryptoUnavailable = decimalError + 'crypto unavailable',

	  mathfloor = Math.floor,
	  mathpow = Math.pow,

	  isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
	  isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
	  isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
	  isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,

	  BASE = 1e7,
	  LOG_BASE = 7,
	  MAX_SAFE_INTEGER = 9007199254740991,

	  LN10_PRECISION = LN10.length - 1,
	  PI_PRECISION = PI.length - 1,

	  // Decimal.prototype object
	  P = { name: '[object Decimal]' };


	// Decimal prototype methods


	/*
	 *  absoluteValue             abs
	 *  ceil
	 *  comparedTo                cmp
	 *  cosine                    cos
	 *  cubeRoot                  cbrt
	 *  decimalPlaces             dp
	 *  dividedBy                 div
	 *  dividedToIntegerBy        divToInt
	 *  equals                    eq
	 *  floor
	 *  greaterThan               gt
	 *  greaterThanOrEqualTo      gte
	 *  hyperbolicCosine          cosh
	 *  hyperbolicSine            sinh
	 *  hyperbolicTangent         tanh
	 *  inverseCosine             acos
	 *  inverseHyperbolicCosine   acosh
	 *  inverseHyperbolicSine     asinh
	 *  inverseHyperbolicTangent  atanh
	 *  inverseSine               asin
	 *  inverseTangent            atan
	 *  isFinite
	 *  isInteger                 isInt
	 *  isNaN
	 *  isNegative                isNeg
	 *  isPositive                isPos
	 *  isZero
	 *  lessThan                  lt
	 *  lessThanOrEqualTo         lte
	 *  logarithm                 log
	 *  [maximum]                 [max]
	 *  [minimum]                 [min]
	 *  minus                     sub
	 *  modulo                    mod
	 *  naturalExponential        exp
	 *  naturalLogarithm          ln
	 *  negated                   neg
	 *  plus                      add
	 *  precision                 sd
	 *  round
	 *  sine                      sin
	 *  squareRoot                sqrt
	 *  tangent                   tan
	 *  times                     mul
	 *  toBinary
	 *  toDecimalPlaces           toDP
	 *  toExponential
	 *  toFixed
	 *  toFraction
	 *  toHexadecimal             toHex
	 *  toNearest
	 *  toNumber
	 *  toOctal
	 *  toPower                   pow
	 *  toPrecision
	 *  toSignificantDigits       toSD
	 *  toString
	 *  truncated                 trunc
	 *  valueOf                   toJSON
	 */


	/*
	 * Return a new Decimal whose value is the absolute value of this Decimal.
	 *
	 */
	P.absoluteValue = P.abs = function () {
	  var x = new this.constructor(this);
	  if (x.s < 0) x.s = 1;
	  return finalise(x);
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	 * direction of positive Infinity.
	 *
	 */
	P.ceil = function () {
	  return finalise(new this.constructor(this), this.e + 1, 2);
	};


	/*
	 * Return
	 *   1    if the value of this Decimal is greater than the value of `y`,
	 *  -1    if the value of this Decimal is less than the value of `y`,
	 *   0    if they have the same value,
	 *   NaN  if the value of either Decimal is NaN.
	 *
	 */
	P.comparedTo = P.cmp = function (y) {
	  var i, j, xdL, ydL,
	    x = this,
	    xd = x.d,
	    yd = (y = new x.constructor(y)).d,
	    xs = x.s,
	    ys = y.s;

	  // Either NaN or ±Infinity?
	  if (!xd || !yd) {
	    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
	  }

	  // Either zero?
	  if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;

	  // Signs differ?
	  if (xs !== ys) return xs;

	  // Compare exponents.
	  if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;

	  xdL = xd.length;
	  ydL = yd.length;

	  // Compare digit by digit.
	  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
	    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
	  }

	  // Compare lengths.
	  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
	};


	/*
	 * Return a new Decimal whose value is the cosine of the value in radians of this Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-1, 1]
	 *
	 * cos(0)         = 1
	 * cos(-0)        = 1
	 * cos(Infinity)  = NaN
	 * cos(-Infinity) = NaN
	 * cos(NaN)       = NaN
	 *
	 */
	P.cosine = P.cos = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.d) return new Ctor(NaN);

	  // cos(0) = cos(-0) = 1
	  if (!x.d[0]) return new Ctor(1);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	  Ctor.rounding = 1;

	  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
	};


	/*
	 *
	 * Return a new Decimal whose value is the cube root of the value of this Decimal, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 *  cbrt(0)  =  0
	 *  cbrt(-0) = -0
	 *  cbrt(1)  =  1
	 *  cbrt(-1) = -1
	 *  cbrt(N)  =  N
	 *  cbrt(-I) = -I
	 *  cbrt(I)  =  I
	 *
	 * Math.cbrt(x) = (x < 0 ? -Math.pow(-x, 1/3) : Math.pow(x, 1/3))
	 *
	 */
	P.cubeRoot = P.cbrt = function () {
	  var e, m, n, r, rep, s, sd, t, t3, t3plusx,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite() || x.isZero()) return new Ctor(x);
	  external = false;

	  // Initial estimate.
	  s = x.s * mathpow(x.s * x, 1 / 3);

	   // Math.cbrt underflow/overflow?
	   // Pass x to Math.pow as integer, then adjust the exponent of the result.
	  if (!s || Math.abs(s) == 1 / 0) {
	    n = digitsToString(x.d);
	    e = x.e;

	    // Adjust n exponent so it is a multiple of 3 away from x exponent.
	    if (s = (e - n.length + 1) % 3) n += (s == 1 || s == -2 ? '0' : '00');
	    s = mathpow(n, 1 / 3);

	    // Rarely, e may be one less than the result exponent value.
	    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));

	    if (s == 1 / 0) {
	      n = '5e' + e;
	    } else {
	      n = s.toExponential();
	      n = n.slice(0, n.indexOf('e') + 1) + e;
	    }

	    r = new Ctor(n);
	    r.s = x.s;
	  } else {
	    r = new Ctor(s.toString());
	  }

	  sd = (e = Ctor.precision) + 3;

	  // Halley's method.
	  // TODO? Compare Newton's method.
	  for (;;) {
	    t = r;
	    t3 = t.times(t).times(t);
	    t3plusx = t3.plus(x);
	    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);

	    // TODO? Replace with for-loop and checkRoundingDigits.
	    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	      n = n.slice(sd - 3, sd + 1);

	      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or 4999
	      // , i.e. approaching a rounding boundary, continue the iteration.
	      if (n == '9999' || !rep && n == '4999') {

	        // On the first iteration only, check to see if rounding up gives the exact result as the
	        // nines may infinitely repeat.
	        if (!rep) {
	          finalise(t, e + 1, 0);

	          if (t.times(t).times(t).eq(x)) {
	            r = t;
	            break;
	          }
	        }

	        sd += 4;
	        rep = 1;
	      } else {

	        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	        // If not, then there are further digits and m will be truthy.
	        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	          // Truncate to the first rounding digit.
	          finalise(r, e + 1, 1);
	          m = !r.times(r).times(r).eq(x);
	        }

	        break;
	      }
	    }
	  }

	  external = true;

	  return finalise(r, e, Ctor.rounding, m);
	};


	/*
	 * Return the number of decimal places of the value of this Decimal.
	 *
	 */
	P.decimalPlaces = P.dp = function () {
	  var w,
	    d = this.d,
	    n = NaN;

	  if (d) {
	    w = d.length - 1;
	    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;

	    // Subtract the number of trailing zeros of the last word.
	    w = d[w];
	    if (w) for (; w % 10 == 0; w /= 10) n--;
	    if (n < 0) n = 0;
	  }

	  return n;
	};


	/*
	 *  n / 0 = I
	 *  n / N = N
	 *  n / I = 0
	 *  0 / n = 0
	 *  0 / 0 = N
	 *  0 / N = N
	 *  0 / I = 0
	 *  N / n = N
	 *  N / 0 = N
	 *  N / N = N
	 *  N / I = N
	 *  I / n = I
	 *  I / 0 = I
	 *  I / N = N
	 *  I / I = N
	 *
	 * Return a new Decimal whose value is the value of this Decimal divided by `y`, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 */
	P.dividedBy = P.div = function (y) {
	  return divide(this, new this.constructor(y));
	};


	/*
	 * Return a new Decimal whose value is the integer part of dividing the value of this Decimal
	 * by the value of `y`, rounded to `precision` significant digits using rounding mode `rounding`.
	 *
	 */
	P.dividedToIntegerBy = P.divToInt = function (y) {
	  var x = this,
	    Ctor = x.constructor;
	  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
	};


	/*
	 * Return true if the value of this Decimal is equal to the value of `y`, otherwise return false.
	 *
	 */
	P.equals = P.eq = function (y) {
	  return this.cmp(y) === 0;
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number in the
	 * direction of negative Infinity.
	 *
	 */
	P.floor = function () {
	  return finalise(new this.constructor(this), this.e + 1, 3);
	};


	/*
	 * Return true if the value of this Decimal is greater than the value of `y`, otherwise return
	 * false.
	 *
	 */
	P.greaterThan = P.gt = function (y) {
	  return this.cmp(y) > 0;
	};


	/*
	 * Return true if the value of this Decimal is greater than or equal to the value of `y`,
	 * otherwise return false.
	 *
	 */
	P.greaterThanOrEqualTo = P.gte = function (y) {
	  var k = this.cmp(y);
	  return k == 1 || k === 0;
	};


	/*
	 * Return a new Decimal whose value is the hyperbolic cosine of the value in radians of this
	 * Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [1, Infinity]
	 *
	 * cosh(x) = 1 + x^2/2! + x^4/4! + x^6/6! + ...
	 *
	 * cosh(0)         = 1
	 * cosh(-0)        = 1
	 * cosh(Infinity)  = Infinity
	 * cosh(-Infinity) = Infinity
	 * cosh(NaN)       = NaN
	 *
	 *  x        time taken (ms)   result
	 * 1000      9                 9.8503555700852349694e+433
	 * 10000     25                4.4034091128314607936e+4342
	 * 100000    171               1.4033316802130615897e+43429
	 * 1000000   3817              1.5166076984010437725e+434294
	 * 10000000  abandoned after 2 minute wait
	 *
	 * TODO? Compare performance of cosh(x) = 0.5 * (exp(x) + exp(-x))
	 *
	 */
	P.hyperbolicCosine = P.cosh = function () {
	  var k, n, pr, rm, len,
	    x = this,
	    Ctor = x.constructor,
	    one = new Ctor(1);

	  if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
	  if (x.isZero()) return one;

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	  Ctor.rounding = 1;
	  len = x.d.length;

	  // Argument reduction: cos(4x) = 1 - 8cos^2(x) + 8cos^4(x) + 1
	  // i.e. cos(x) = 1 - cos^2(x/4)(8 - 8cos^2(x/4))

	  // Estimate the optimum number of times to use the argument reduction.
	  // TODO? Estimation reused from cosine() and may not be optimal here.
	  if (len < 32) {
	    k = Math.ceil(len / 3);
	    n = (1 / tinyPow(4, k)).toString();
	  } else {
	    k = 16;
	    n = '2.3283064365386962890625e-10';
	  }

	  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);

	  // Reverse argument reduction
	  var cosh2_x,
	    i = k,
	    d8 = new Ctor(8);
	  for (; i--;) {
	    cosh2_x = x.times(x);
	    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
	  }

	  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
	};


	/*
	 * Return a new Decimal whose value is the hyperbolic sine of the value in radians of this
	 * Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-Infinity, Infinity]
	 *
	 * sinh(x) = x + x^3/3! + x^5/5! + x^7/7! + ...
	 *
	 * sinh(0)         = 0
	 * sinh(-0)        = -0
	 * sinh(Infinity)  = Infinity
	 * sinh(-Infinity) = -Infinity
	 * sinh(NaN)       = NaN
	 *
	 * x        time taken (ms)
	 * 10       2 ms
	 * 100      5 ms
	 * 1000     14 ms
	 * 10000    82 ms
	 * 100000   886 ms            1.4033316802130615897e+43429
	 * 200000   2613 ms
	 * 300000   5407 ms
	 * 400000   8824 ms
	 * 500000   13026 ms          8.7080643612718084129e+217146
	 * 1000000  48543 ms
	 *
	 * TODO? Compare performance of sinh(x) = 0.5 * (exp(x) - exp(-x))
	 *
	 */
	P.hyperbolicSine = P.sinh = function () {
	  var k, pr, rm, len,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite() || x.isZero()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
	  Ctor.rounding = 1;
	  len = x.d.length;

	  if (len < 3) {
	    x = taylorSeries(Ctor, 2, x, x, true);
	  } else {

	    // Alternative argument reduction: sinh(3x) = sinh(x)(3 + 4sinh^2(x))
	    // i.e. sinh(x) = sinh(x/3)(3 + 4sinh^2(x/3))
	    // 3 multiplications and 1 addition

	    // Argument reduction: sinh(5x) = sinh(x)(5 + sinh^2(x)(20 + 16sinh^2(x)))
	    // i.e. sinh(x) = sinh(x/5)(5 + sinh^2(x/5)(20 + 16sinh^2(x/5)))
	    // 4 multiplications and 2 additions

	    // Estimate the optimum number of times to use the argument reduction.
	    k = 1.4 * Math.sqrt(len);
	    k = k > 16 ? 16 : k | 0;

	    x = x.times(1 / tinyPow(5, k));
	    x = taylorSeries(Ctor, 2, x, x, true);

	    // Reverse argument reduction
	    var sinh2_x,
	      d5 = new Ctor(5),
	      d16 = new Ctor(16),
	      d20 = new Ctor(20);
	    for (; k--;) {
	      sinh2_x = x.times(x);
	      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
	    }
	  }

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return finalise(x, pr, rm, true);
	};


	/*
	 * Return a new Decimal whose value is the hyperbolic tangent of the value in radians of this
	 * Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-1, 1]
	 *
	 * tanh(x) = sinh(x) / cosh(x)
	 *
	 * tanh(0)         = 0
	 * tanh(-0)        = -0
	 * tanh(Infinity)  = 1
	 * tanh(-Infinity) = -1
	 * tanh(NaN)       = NaN
	 *
	 */
	P.hyperbolicTangent = P.tanh = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite()) return new Ctor(x.s);
	  if (x.isZero()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + 7;
	  Ctor.rounding = 1;

	  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
	};


	/*
	 * Return a new Decimal whose value is the arccosine (inverse cosine) in radians of the value of
	 * this Decimal.
	 *
	 * Domain: [-1, 1]
	 * Range: [0, pi]
	 *
	 * acos(x) = pi/2 - asin(x)
	 *
	 * acos(0)       = pi/2
	 * acos(-0)      = pi/2
	 * acos(1)       = 0
	 * acos(-1)      = pi
	 * acos(1/2)     = pi/3
	 * acos(-1/2)    = 2*pi/3
	 * acos(|x| > 1) = NaN
	 * acos(NaN)     = NaN
	 *
	 */
	P.inverseCosine = P.acos = function () {
	  var halfPi,
	    x = this,
	    Ctor = x.constructor,
	    k = x.abs().cmp(1),
	    pr = Ctor.precision,
	    rm = Ctor.rounding;

	  if (k !== -1) {
	    return k === 0
	      // |x| is 1
	      ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0)
	      // |x| > 1 or x is NaN
	      : new Ctor(NaN);
	  }

	  if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);

	  // TODO? Special case acos(0.5) = pi/3 and acos(-0.5) = 2*pi/3

	  Ctor.precision = pr + 6;
	  Ctor.rounding = 1;

	  x = x.asin();
	  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return halfPi.minus(x);
	};


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic cosine in radians of the
	 * value of this Decimal.
	 *
	 * Domain: [1, Infinity]
	 * Range: [0, Infinity]
	 *
	 * acosh(x) = ln(x + sqrt(x^2 - 1))
	 *
	 * acosh(x < 1)     = NaN
	 * acosh(NaN)       = NaN
	 * acosh(Infinity)  = Infinity
	 * acosh(-Infinity) = NaN
	 * acosh(0)         = NaN
	 * acosh(-0)        = NaN
	 * acosh(1)         = 0
	 * acosh(-1)        = NaN
	 *
	 */
	P.inverseHyperbolicCosine = P.acosh = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
	  if (!x.isFinite()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
	  Ctor.rounding = 1;
	  external = false;

	  x = x.times(x).minus(1).sqrt().plus(x);

	  external = true;
	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return x.ln();
	};


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic sine in radians of the value
	 * of this Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-Infinity, Infinity]
	 *
	 * asinh(x) = ln(x + sqrt(x^2 + 1))
	 *
	 * asinh(NaN)       = NaN
	 * asinh(Infinity)  = Infinity
	 * asinh(-Infinity) = -Infinity
	 * asinh(0)         = 0
	 * asinh(-0)        = -0
	 *
	 */
	P.inverseHyperbolicSine = P.asinh = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite() || x.isZero()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
	  Ctor.rounding = 1;
	  external = false;

	  x = x.times(x).plus(1).sqrt().plus(x);

	  external = true;
	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return x.ln();
	};


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic tangent in radians of the
	 * value of this Decimal.
	 *
	 * Domain: [-1, 1]
	 * Range: [-Infinity, Infinity]
	 *
	 * atanh(x) = 0.5 * ln((1 + x) / (1 - x))
	 *
	 * atanh(|x| > 1)   = NaN
	 * atanh(NaN)       = NaN
	 * atanh(Infinity)  = NaN
	 * atanh(-Infinity) = NaN
	 * atanh(0)         = 0
	 * atanh(-0)        = -0
	 * atanh(1)         = Infinity
	 * atanh(-1)        = -Infinity
	 *
	 */
	P.inverseHyperbolicTangent = P.atanh = function () {
	  var pr, rm, wpr, xsd,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite()) return new Ctor(NaN);
	  if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  xsd = x.sd();

	  if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);

	  Ctor.precision = wpr = xsd - x.e;

	  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);

	  Ctor.precision = pr + 4;
	  Ctor.rounding = 1;

	  x = x.ln();

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return x.times(0.5);
	};


	/*
	 * Return a new Decimal whose value is the arcsine (inverse sine) in radians of the value of this
	 * Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-pi/2, pi/2]
	 *
	 * asin(x) = 2*atan(x/(1 + sqrt(1 - x^2)))
	 *
	 * asin(0)       = 0
	 * asin(-0)      = -0
	 * asin(1/2)     = pi/6
	 * asin(-1/2)    = -pi/6
	 * asin(1)       = pi/2
	 * asin(-1)      = -pi/2
	 * asin(|x| > 1) = NaN
	 * asin(NaN)     = NaN
	 *
	 * TODO? Compare performance of Taylor series.
	 *
	 */
	P.inverseSine = P.asin = function () {
	  var halfPi, k,
	    pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (x.isZero()) return new Ctor(x);

	  k = x.abs().cmp(1);
	  pr = Ctor.precision;
	  rm = Ctor.rounding;

	  if (k !== -1) {

	    // |x| is 1
	    if (k === 0) {
	      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
	      halfPi.s = x.s;
	      return halfPi;
	    }

	    // |x| > 1 or x is NaN
	    return new Ctor(NaN);
	  }

	  // TODO? Special case asin(1/2) = pi/6 and asin(-1/2) = -pi/6

	  Ctor.precision = pr + 6;
	  Ctor.rounding = 1;

	  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return x.times(2);
	};


	/*
	 * Return a new Decimal whose value is the arctangent (inverse tangent) in radians of the value
	 * of this Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-pi/2, pi/2]
	 *
	 * atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	 *
	 * atan(0)         = 0
	 * atan(-0)        = -0
	 * atan(1)         = pi/4
	 * atan(-1)        = -pi/4
	 * atan(Infinity)  = pi/2
	 * atan(-Infinity) = -pi/2
	 * atan(NaN)       = NaN
	 *
	 */
	P.inverseTangent = P.atan = function () {
	  var i, j, k, n, px, t, r, wpr, x2,
	    x = this,
	    Ctor = x.constructor,
	    pr = Ctor.precision,
	    rm = Ctor.rounding;

	  if (!x.isFinite()) {
	    if (!x.s) return new Ctor(NaN);
	    if (pr + 4 <= PI_PRECISION) {
	      r = getPi(Ctor, pr + 4, rm).times(0.5);
	      r.s = x.s;
	      return r;
	    }
	  } else if (x.isZero()) {
	    return new Ctor(x);
	  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
	    r = getPi(Ctor, pr + 4, rm).times(0.25);
	    r.s = x.s;
	    return r;
	  }

	  Ctor.precision = wpr = pr + 10;
	  Ctor.rounding = 1;

	  // TODO? if (x >= 1 && pr <= PI_PRECISION) atan(x) = halfPi * x.s - atan(1 / x);

	  // Argument reduction
	  // Ensure |x| < 0.42
	  // atan(x) = 2 * atan(x / (1 + sqrt(1 + x^2)))

	  k = Math.min(28, wpr / LOG_BASE + 2 | 0);

	  for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));

	  external = false;

	  j = Math.ceil(wpr / LOG_BASE);
	  n = 1;
	  x2 = x.times(x);
	  r = new Ctor(x);
	  px = x;

	  // atan(x) = x - x^3/3 + x^5/5 - x^7/7 + ...
	  for (; i !== -1;) {
	    px = px.times(x2);
	    t = r.minus(px.div(n += 2));

	    px = px.times(x2);
	    r = t.plus(px.div(n += 2));

	    if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--;);
	  }

	  if (k) r = r.times(2 << (k - 1));

	  external = true;

	  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
	};


	/*
	 * Return true if the value of this Decimal is a finite number, otherwise return false.
	 *
	 */
	P.isFinite = function () {
	  return !!this.d;
	};


	/*
	 * Return true if the value of this Decimal is an integer, otherwise return false.
	 *
	 */
	P.isInteger = P.isInt = function () {
	  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
	};


	/*
	 * Return true if the value of this Decimal is NaN, otherwise return false.
	 *
	 */
	P.isNaN = function () {
	  return !this.s;
	};


	/*
	 * Return true if the value of this Decimal is negative, otherwise return false.
	 *
	 */
	P.isNegative = P.isNeg = function () {
	  return this.s < 0;
	};


	/*
	 * Return true if the value of this Decimal is positive, otherwise return false.
	 *
	 */
	P.isPositive = P.isPos = function () {
	  return this.s > 0;
	};


	/*
	 * Return true if the value of this Decimal is 0 or -0, otherwise return false.
	 *
	 */
	P.isZero = function () {
	  return !!this.d && this.d[0] === 0;
	};


	/*
	 * Return true if the value of this Decimal is less than `y`, otherwise return false.
	 *
	 */
	P.lessThan = P.lt = function (y) {
	  return this.cmp(y) < 0;
	};


	/*
	 * Return true if the value of this Decimal is less than or equal to `y`, otherwise return false.
	 *
	 */
	P.lessThanOrEqualTo = P.lte = function (y) {
	  return this.cmp(y) < 1;
	};


	/*
	 * Return the logarithm of the value of this Decimal to the specified base, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * If no base is specified, return log[10](arg).
	 *
	 * log[base](arg) = ln(arg) / ln(base)
	 *
	 * The result will always be correctly rounded if the base of the log is 10, and 'almost always'
	 * otherwise:
	 *
	 * Depending on the rounding mode, the result may be incorrectly rounded if the first fifteen
	 * rounding digits are [49]99999999999999 or [50]00000000000000. In that case, the maximum error
	 * between the result and the correctly rounded result will be one ulp (unit in the last place).
	 *
	 * log[-b](a)       = NaN
	 * log[0](a)        = NaN
	 * log[1](a)        = NaN
	 * log[NaN](a)      = NaN
	 * log[Infinity](a) = NaN
	 * log[b](0)        = -Infinity
	 * log[b](-0)       = -Infinity
	 * log[b](-a)       = NaN
	 * log[b](1)        = 0
	 * log[b](Infinity) = Infinity
	 * log[b](NaN)      = NaN
	 *
	 * [base] {number|string|Decimal} The base of the logarithm.
	 *
	 */
	P.logarithm = P.log = function (base) {
	  var isBase10, d, denominator, k, inf, num, sd, r,
	    arg = this,
	    Ctor = arg.constructor,
	    pr = Ctor.precision,
	    rm = Ctor.rounding,
	    guard = 5;

	  // Default base is 10.
	  if (base == null) {
	    base = new Ctor(10);
	    isBase10 = true;
	  } else {
	    base = new Ctor(base);
	    d = base.d;

	    // Return NaN if base is negative, or non-finite, or is 0 or 1.
	    if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);

	    isBase10 = base.eq(10);
	  }

	  d = arg.d;

	  // Is arg negative, non-finite, 0 or 1?
	  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
	    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
	  }

	  // The result will have a non-terminating decimal expansion if base is 10 and arg is not an
	  // integer power of 10.
	  if (isBase10) {
	    if (d.length > 1) {
	      inf = true;
	    } else {
	      for (k = d[0]; k % 10 === 0;) k /= 10;
	      inf = k !== 1;
	    }
	  }

	  external = false;
	  sd = pr + guard;
	  num = naturalLogarithm(arg, sd);
	  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);

	  // The result will have 5 rounding digits.
	  r = divide(num, denominator, sd, 1);

	  // If at a rounding boundary, i.e. the result's rounding digits are [49]9999 or [50]0000,
	  // calculate 10 further digits.
	  //
	  // If the result is known to have an infinite decimal expansion, repeat this until it is clear
	  // that the result is above or below the boundary. Otherwise, if after calculating the 10
	  // further digits, the last 14 are nines, round up and assume the result is exact.
	  // Also assume the result is exact if the last 14 are zero.
	  //
	  // Example of a result that will be incorrectly rounded:
	  // log[1048576](4503599627370502) = 2.60000000000000009610279511444746...
	  // The above result correctly rounded using ROUND_CEIL to 1 decimal place should be 2.7, but it
	  // will be given as 2.6 as there are 15 zeros immediately after the requested decimal place, so
	  // the exact result would be assumed to be 2.6, which rounded using ROUND_CEIL to 1 decimal
	  // place is still 2.6.
	  if (checkRoundingDigits(r.d, k = pr, rm)) {

	    do {
	      sd += 10;
	      num = naturalLogarithm(arg, sd);
	      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
	      r = divide(num, denominator, sd, 1);

	      if (!inf) {

	        // Check for 14 nines from the 2nd rounding digit, as the first may be 4.
	        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
	          r = finalise(r, pr + 1, 0);
	        }

	        break;
	      }
	    } while (checkRoundingDigits(r.d, k += 10, rm));
	  }

	  external = true;

	  return finalise(r, pr, rm);
	};


	/*
	 * Return a new Decimal whose value is the maximum of the arguments and the value of this Decimal.
	 *
	 * arguments {number|string|Decimal}
	 *
	P.max = function () {
	  Array.prototype.push.call(arguments, this);
	  return maxOrMin(this.constructor, arguments, 'lt');
	};
	 */


	/*
	 * Return a new Decimal whose value is the minimum of the arguments and the value of this Decimal.
	 *
	 * arguments {number|string|Decimal}
	 *
	P.min = function () {
	  Array.prototype.push.call(arguments, this);
	  return maxOrMin(this.constructor, arguments, 'gt');
	};
	 */


	/*
	 *  n - 0 = n
	 *  n - N = N
	 *  n - I = -I
	 *  0 - n = -n
	 *  0 - 0 = 0
	 *  0 - N = N
	 *  0 - I = -I
	 *  N - n = N
	 *  N - 0 = N
	 *  N - N = N
	 *  N - I = N
	 *  I - n = I
	 *  I - 0 = I
	 *  I - N = N
	 *  I - I = N
	 *
	 * Return a new Decimal whose value is the value of this Decimal minus `y`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 */
	P.minus = P.sub = function (y) {
	  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd,
	    x = this,
	    Ctor = x.constructor;

	  y = new Ctor(y);

	  // If either is not finite...
	  if (!x.d || !y.d) {

	    // Return NaN if either is NaN.
	    if (!x.s || !y.s) y = new Ctor(NaN);

	    // Return y negated if x is finite and y is ±Infinity.
	    else if (x.d) y.s = -y.s;

	    // Return x if y is finite and x is ±Infinity.
	    // Return x if both are ±Infinity with different signs.
	    // Return NaN if both are ±Infinity with the same sign.
	    else y = new Ctor(y.d || x.s !== y.s ? x : NaN);

	    return y;
	  }

	  // If signs differ...
	  if (x.s != y.s) {
	    y.s = -y.s;
	    return x.plus(y);
	  }

	  xd = x.d;
	  yd = y.d;
	  pr = Ctor.precision;
	  rm = Ctor.rounding;

	  // If either is zero...
	  if (!xd[0] || !yd[0]) {

	    // Return y negated if x is zero and y is non-zero.
	    if (yd[0]) y.s = -y.s;

	    // Return x if y is zero and x is non-zero.
	    else if (xd[0]) y = new Ctor(x);

	    // Return zero if both are zero.
	    // From IEEE 754 (2008) 6.3: 0 - 0 = -0 - -0 = -0 when rounding to -Infinity.
	    else return new Ctor(rm === 3 ? -0 : 0);

	    return external ? finalise(y, pr, rm) : y;
	  }

	  // x and y are finite, non-zero numbers with the same sign.

	  // Calculate base 1e7 exponents.
	  e = mathfloor(y.e / LOG_BASE);
	  xe = mathfloor(x.e / LOG_BASE);

	  xd = xd.slice();
	  k = xe - e;

	  // If base 1e7 exponents differ...
	  if (k) {
	    xLTy = k < 0;

	    if (xLTy) {
	      d = xd;
	      k = -k;
	      len = yd.length;
	    } else {
	      d = yd;
	      e = xe;
	      len = xd.length;
	    }

	    // Numbers with massively different exponents would result in a very high number of
	    // zeros needing to be prepended, but this can be avoided while still ensuring correct
	    // rounding by limiting the number of zeros to `Math.ceil(pr / LOG_BASE) + 2`.
	    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;

	    if (k > i) {
	      k = i;
	      d.length = 1;
	    }

	    // Prepend zeros to equalise exponents.
	    d.reverse();
	    for (i = k; i--;) d.push(0);
	    d.reverse();

	  // Base 1e7 exponents equal.
	  } else {

	    // Check digits to determine which is the bigger number.

	    i = xd.length;
	    len = yd.length;
	    xLTy = i < len;
	    if (xLTy) len = i;

	    for (i = 0; i < len; i++) {
	      if (xd[i] != yd[i]) {
	        xLTy = xd[i] < yd[i];
	        break;
	      }
	    }

	    k = 0;
	  }

	  if (xLTy) {
	    d = xd;
	    xd = yd;
	    yd = d;
	    y.s = -y.s;
	  }

	  len = xd.length;

	  // Append zeros to `xd` if shorter.
	  // Don't add zeros to `yd` if shorter as subtraction only needs to start at `yd` length.
	  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;

	  // Subtract yd from xd.
	  for (i = yd.length; i > k;) {

	    if (xd[--i] < yd[i]) {
	      for (j = i; j && xd[--j] === 0;) xd[j] = BASE - 1;
	      --xd[j];
	      xd[i] += BASE;
	    }

	    xd[i] -= yd[i];
	  }

	  // Remove trailing zeros.
	  for (; xd[--len] === 0;) xd.pop();

	  // Remove leading zeros and adjust exponent accordingly.
	  for (; xd[0] === 0; xd.shift()) --e;

	  // Zero?
	  if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);

	  y.d = xd;
	  y.e = getBase10Exponent(xd, e);

	  return external ? finalise(y, pr, rm) : y;
	};


	/*
	 *   n % 0 =  N
	 *   n % N =  N
	 *   n % I =  n
	 *   0 % n =  0
	 *  -0 % n = -0
	 *   0 % 0 =  N
	 *   0 % N =  N
	 *   0 % I =  0
	 *   N % n =  N
	 *   N % 0 =  N
	 *   N % N =  N
	 *   N % I =  N
	 *   I % n =  N
	 *   I % 0 =  N
	 *   I % N =  N
	 *   I % I =  N
	 *
	 * Return a new Decimal whose value is the value of this Decimal modulo `y`, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 * The result depends on the modulo mode.
	 *
	 */
	P.modulo = P.mod = function (y) {
	  var q,
	    x = this,
	    Ctor = x.constructor;

	  y = new Ctor(y);

	  // Return NaN if x is ±Infinity or NaN, or y is NaN or ±0.
	  if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);

	  // Return x if y is ±Infinity or x is ±0.
	  if (!y.d || x.d && !x.d[0]) {
	    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
	  }

	  // Prevent rounding of intermediate calculations.
	  external = false;

	  if (Ctor.modulo == 9) {

	    // Euclidian division: q = sign(y) * floor(x / abs(y))
	    // result = x - q * y    where  0 <= result < abs(y)
	    q = divide(x, y.abs(), 0, 3, 1);
	    q.s *= y.s;
	  } else {
	    q = divide(x, y, 0, Ctor.modulo, 1);
	  }

	  q = q.times(y);

	  external = true;

	  return x.minus(q);
	};


	/*
	 * Return a new Decimal whose value is the natural exponential of the value of this Decimal,
	 * i.e. the base e raised to the power the value of this Decimal, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 */
	P.naturalExponential = P.exp = function () {
	  return naturalExponential(this);
	};


	/*
	 * Return a new Decimal whose value is the natural logarithm of the value of this Decimal,
	 * rounded to `precision` significant digits using rounding mode `rounding`.
	 *
	 */
	P.naturalLogarithm = P.ln = function () {
	  return naturalLogarithm(this);
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal negated, i.e. as if multiplied by
	 * -1.
	 *
	 */
	P.negated = P.neg = function () {
	  var x = new this.constructor(this);
	  x.s = -x.s;
	  return finalise(x);
	};


	/*
	 *  n + 0 = n
	 *  n + N = N
	 *  n + I = I
	 *  0 + n = n
	 *  0 + 0 = 0
	 *  0 + N = N
	 *  0 + I = I
	 *  N + n = N
	 *  N + 0 = N
	 *  N + N = N
	 *  N + I = N
	 *  I + n = I
	 *  I + 0 = I
	 *  I + N = N
	 *  I + I = I
	 *
	 * Return a new Decimal whose value is the value of this Decimal plus `y`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 */
	P.plus = P.add = function (y) {
	  var carry, d, e, i, k, len, pr, rm, xd, yd,
	    x = this,
	    Ctor = x.constructor;

	  y = new Ctor(y);

	  // If either is not finite...
	  if (!x.d || !y.d) {

	    // Return NaN if either is NaN.
	    if (!x.s || !y.s) y = new Ctor(NaN);

	    // Return x if y is finite and x is ±Infinity.
	    // Return x if both are ±Infinity with the same sign.
	    // Return NaN if both are ±Infinity with different signs.
	    // Return y if x is finite and y is ±Infinity.
	    else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);

	    return y;
	  }

	   // If signs differ...
	  if (x.s != y.s) {
	    y.s = -y.s;
	    return x.minus(y);
	  }

	  xd = x.d;
	  yd = y.d;
	  pr = Ctor.precision;
	  rm = Ctor.rounding;

	  // If either is zero...
	  if (!xd[0] || !yd[0]) {

	    // Return x if y is zero.
	    // Return y if y is non-zero.
	    if (!yd[0]) y = new Ctor(x);

	    return external ? finalise(y, pr, rm) : y;
	  }

	  // x and y are finite, non-zero numbers with the same sign.

	  // Calculate base 1e7 exponents.
	  k = mathfloor(x.e / LOG_BASE);
	  e = mathfloor(y.e / LOG_BASE);

	  xd = xd.slice();
	  i = k - e;

	  // If base 1e7 exponents differ...
	  if (i) {

	    if (i < 0) {
	      d = xd;
	      i = -i;
	      len = yd.length;
	    } else {
	      d = yd;
	      e = k;
	      len = xd.length;
	    }

	    // Limit number of zeros prepended to max(ceil(pr / LOG_BASE), len) + 1.
	    k = Math.ceil(pr / LOG_BASE);
	    len = k > len ? k + 1 : len + 1;

	    if (i > len) {
	      i = len;
	      d.length = 1;
	    }

	    // Prepend zeros to equalise exponents. Note: Faster to use reverse then do unshifts.
	    d.reverse();
	    for (; i--;) d.push(0);
	    d.reverse();
	  }

	  len = xd.length;
	  i = yd.length;

	  // If yd is longer than xd, swap xd and yd so xd points to the longer array.
	  if (len - i < 0) {
	    i = len;
	    d = yd;
	    yd = xd;
	    xd = d;
	  }

	  // Only start adding at yd.length - 1 as the further digits of xd can be left as they are.
	  for (carry = 0; i;) {
	    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
	    xd[i] %= BASE;
	  }

	  if (carry) {
	    xd.unshift(carry);
	    ++e;
	  }

	  // Remove trailing zeros.
	  // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	  for (len = xd.length; xd[--len] == 0;) xd.pop();

	  y.d = xd;
	  y.e = getBase10Exponent(xd, e);

	  return external ? finalise(y, pr, rm) : y;
	};


	/*
	 * Return the number of significant digits of the value of this Decimal.
	 *
	 * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
	 *
	 */
	P.precision = P.sd = function (z) {
	  var k,
	    x = this;

	  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);

	  if (x.d) {
	    k = getPrecision(x.d);
	    if (z && x.e + 1 > k) k = x.e + 1;
	  } else {
	    k = NaN;
	  }

	  return k;
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal rounded to a whole number using
	 * rounding mode `rounding`.
	 *
	 */
	P.round = function () {
	  var x = this,
	    Ctor = x.constructor;

	  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
	};


	/*
	 * Return a new Decimal whose value is the sine of the value in radians of this Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-1, 1]
	 *
	 * sin(x) = x - x^3/3! + x^5/5! - ...
	 *
	 * sin(0)         = 0
	 * sin(-0)        = -0
	 * sin(Infinity)  = NaN
	 * sin(-Infinity) = NaN
	 * sin(NaN)       = NaN
	 *
	 */
	P.sine = P.sin = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite()) return new Ctor(NaN);
	  if (x.isZero()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
	  Ctor.rounding = 1;

	  x = sine(Ctor, toLessThanHalfPi(Ctor, x));

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
	};


	/*
	 * Return a new Decimal whose value is the square root of this Decimal, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 *  sqrt(-n) =  N
	 *  sqrt(N)  =  N
	 *  sqrt(-I) =  N
	 *  sqrt(I)  =  I
	 *  sqrt(0)  =  0
	 *  sqrt(-0) = -0
	 *
	 */
	P.squareRoot = P.sqrt = function () {
	  var m, n, sd, r, rep, t,
	    x = this,
	    d = x.d,
	    e = x.e,
	    s = x.s,
	    Ctor = x.constructor;

	  // Negative/NaN/Infinity/zero?
	  if (s !== 1 || !d || !d[0]) {
	    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
	  }

	  external = false;

	  // Initial estimate.
	  s = Math.sqrt(+x);

	  // Math.sqrt underflow/overflow?
	  // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	  if (s == 0 || s == 1 / 0) {
	    n = digitsToString(d);

	    if ((n.length + e) % 2 == 0) n += '0';
	    s = Math.sqrt(n);
	    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);

	    if (s == 1 / 0) {
	      n = '1e' + e;
	    } else {
	      n = s.toExponential();
	      n = n.slice(0, n.indexOf('e') + 1) + e;
	    }

	    r = new Ctor(n);
	  } else {
	    r = new Ctor(s.toString());
	  }

	  sd = (e = Ctor.precision) + 3;

	  // Newton-Raphson iteration.
	  for (;;) {
	    t = r;
	    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);

	    // TODO? Replace with for-loop and checkRoundingDigits.
	    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
	      n = n.slice(sd - 3, sd + 1);

	      // The 4th rounding digit may be in error by -1 so if the 4 rounding digits are 9999 or
	      // 4999, i.e. approaching a rounding boundary, continue the iteration.
	      if (n == '9999' || !rep && n == '4999') {

	        // On the first iteration only, check to see if rounding up gives the exact result as the
	        // nines may infinitely repeat.
	        if (!rep) {
	          finalise(t, e + 1, 0);

	          if (t.times(t).eq(x)) {
	            r = t;
	            break;
	          }
	        }

	        sd += 4;
	        rep = 1;
	      } else {

	        // If the rounding digits are null, 0{0,4} or 50{0,3}, check for an exact result.
	        // If not, then there are further digits and m will be truthy.
	        if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	          // Truncate to the first rounding digit.
	          finalise(r, e + 1, 1);
	          m = !r.times(r).eq(x);
	        }

	        break;
	      }
	    }
	  }

	  external = true;

	  return finalise(r, e, Ctor.rounding, m);
	};


	/*
	 * Return a new Decimal whose value is the tangent of the value in radians of this Decimal.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-Infinity, Infinity]
	 *
	 * tan(0)         = 0
	 * tan(-0)        = -0
	 * tan(Infinity)  = NaN
	 * tan(-Infinity) = NaN
	 * tan(NaN)       = NaN
	 *
	 */
	P.tangent = P.tan = function () {
	  var pr, rm,
	    x = this,
	    Ctor = x.constructor;

	  if (!x.isFinite()) return new Ctor(NaN);
	  if (x.isZero()) return new Ctor(x);

	  pr = Ctor.precision;
	  rm = Ctor.rounding;
	  Ctor.precision = pr + 10;
	  Ctor.rounding = 1;

	  x = x.sin();
	  x.s = 1;
	  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);

	  Ctor.precision = pr;
	  Ctor.rounding = rm;

	  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
	};


	/*
	 *  n * 0 = 0
	 *  n * N = N
	 *  n * I = I
	 *  0 * n = 0
	 *  0 * 0 = 0
	 *  0 * N = N
	 *  0 * I = N
	 *  N * n = N
	 *  N * 0 = N
	 *  N * N = N
	 *  N * I = N
	 *  I * n = I
	 *  I * 0 = N
	 *  I * N = N
	 *  I * I = I
	 *
	 * Return a new Decimal whose value is this Decimal times `y`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 */
	P.times = P.mul = function (y) {
	  var carry, e, i, k, r, rL, t, xdL, ydL,
	    x = this,
	    Ctor = x.constructor,
	    xd = x.d,
	    yd = (y = new Ctor(y)).d;

	  y.s *= x.s;

	   // If either is NaN, ±Infinity or ±0...
	  if (!xd || !xd[0] || !yd || !yd[0]) {

	    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd

	      // Return NaN if either is NaN.
	      // Return NaN if x is ±0 and y is ±Infinity, or y is ±0 and x is ±Infinity.
	      ? NaN

	      // Return ±Infinity if either is ±Infinity.
	      // Return ±0 if either is ±0.
	      : !xd || !yd ? y.s / 0 : y.s * 0);
	  }

	  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
	  xdL = xd.length;
	  ydL = yd.length;

	  // Ensure xd points to the longer array.
	  if (xdL < ydL) {
	    r = xd;
	    xd = yd;
	    yd = r;
	    rL = xdL;
	    xdL = ydL;
	    ydL = rL;
	  }

	  // Initialise the result array with zeros.
	  r = [];
	  rL = xdL + ydL;
	  for (i = rL; i--;) r.push(0);

	  // Multiply!
	  for (i = ydL; --i >= 0;) {
	    carry = 0;
	    for (k = xdL + i; k > i;) {
	      t = r[k] + yd[i] * xd[k - i - 1] + carry;
	      r[k--] = t % BASE | 0;
	      carry = t / BASE | 0;
	    }

	    r[k] = (r[k] + carry) % BASE | 0;
	  }

	  // Remove trailing zeros.
	  for (; !r[--rL];) r.pop();

	  if (carry) ++e;
	  else r.shift();

	  y.d = r;
	  y.e = getBase10Exponent(r, e);

	  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
	};


	/*
	 * Return a string representing the value of this Decimal in base 2, round to `sd` significant
	 * digits using rounding mode `rm`.
	 *
	 * If the optional `sd` argument is present then return binary exponential notation.
	 *
	 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toBinary = function (sd, rm) {
	  return toStringBinary(this, 2, sd, rm);
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `dp`
	 * decimal places using rounding mode `rm` or `rounding` if `rm` is omitted.
	 *
	 * If `dp` is omitted, return a new Decimal whose value is the value of this Decimal.
	 *
	 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toDecimalPlaces = P.toDP = function (dp, rm) {
	  var x = this,
	    Ctor = x.constructor;

	  x = new Ctor(x);
	  if (dp === void 0) return x;

	  checkInt32(dp, 0, MAX_DIGITS);

	  if (rm === void 0) rm = Ctor.rounding;
	  else checkInt32(rm, 0, 8);

	  return finalise(x, dp + x.e + 1, rm);
	};


	/*
	 * Return a string representing the value of this Decimal in exponential notation rounded to
	 * `dp` fixed decimal places using rounding mode `rounding`.
	 *
	 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toExponential = function (dp, rm) {
	  var str,
	    x = this,
	    Ctor = x.constructor;

	  if (dp === void 0) {
	    str = finiteToString(x, true);
	  } else {
	    checkInt32(dp, 0, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);

	    x = finalise(new Ctor(x), dp + 1, rm);
	    str = finiteToString(x, true, dp + 1);
	  }

	  return x.isNeg() && !x.isZero() ? '-' + str : str;
	};


	/*
	 * Return a string representing the value of this Decimal in normal (fixed-point) notation to
	 * `dp` fixed decimal places and rounded using rounding mode `rm` or `rounding` if `rm` is
	 * omitted.
	 *
	 * As with JavaScript numbers, (-0).toFixed(0) is '0', but e.g. (-0.00001).toFixed(0) is '-0'.
	 *
	 * [dp] {number} Decimal places. Integer, 0 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
	 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
	 * (-0).toFixed(3) is '0.000'.
	 * (-0.5).toFixed(0) is '-0'.
	 *
	 */
	P.toFixed = function (dp, rm) {
	  var str, y,
	    x = this,
	    Ctor = x.constructor;

	  if (dp === void 0) {
	    str = finiteToString(x);
	  } else {
	    checkInt32(dp, 0, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);

	    y = finalise(new Ctor(x), dp + x.e + 1, rm);
	    str = finiteToString(y, false, dp + y.e + 1);
	  }

	  // To determine whether to add the minus sign look at the value before it was rounded,
	  // i.e. look at `x` rather than `y`.
	  return x.isNeg() && !x.isZero() ? '-' + str : str;
	};


	/*
	 * Return an array representing the value of this Decimal as a simple fraction with an integer
	 * numerator and an integer denominator.
	 *
	 * The denominator will be a positive non-zero value less than or equal to the specified maximum
	 * denominator. If a maximum denominator is not specified, the denominator will be the lowest
	 * value necessary to represent the number exactly.
	 *
	 * [maxD] {number|string|Decimal} Maximum denominator. Integer >= 1 and < Infinity.
	 *
	 */
	P.toFraction = function (maxD) {
	  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r,
	    x = this,
	    xd = x.d,
	    Ctor = x.constructor;

	  if (!xd) return new Ctor(x);

	  n1 = d0 = new Ctor(1);
	  d1 = n0 = new Ctor(0);

	  d = new Ctor(d1);
	  e = d.e = getPrecision(xd) - x.e - 1;
	  k = e % LOG_BASE;
	  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);

	  if (maxD == null) {

	    // d is 10**e, the minimum max-denominator needed.
	    maxD = e > 0 ? d : n1;
	  } else {
	    n = new Ctor(maxD);
	    if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
	    maxD = n.gt(d) ? (e > 0 ? d : n1) : n;
	  }

	  external = false;
	  n = new Ctor(digitsToString(xd));
	  pr = Ctor.precision;
	  Ctor.precision = e = xd.length * LOG_BASE * 2;

	  for (;;)  {
	    q = divide(n, d, 0, 1, 1);
	    d2 = d0.plus(q.times(d1));
	    if (d2.cmp(maxD) == 1) break;
	    d0 = d1;
	    d1 = d2;
	    d2 = n1;
	    n1 = n0.plus(q.times(d2));
	    n0 = d2;
	    d2 = d;
	    d = n.minus(q.times(d2));
	    n = d2;
	  }

	  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
	  n0 = n0.plus(d2.times(n1));
	  d0 = d0.plus(d2.times(d1));
	  n0.s = n1.s = x.s;

	  // Determine which fraction is closer to x, n0/d0 or n1/d1?
	  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1
	      ? [n1, d1] : [n0, d0];

	  Ctor.precision = pr;
	  external = true;

	  return r;
	};


	/*
	 * Return a string representing the value of this Decimal in base 16, round to `sd` significant
	 * digits using rounding mode `rm`.
	 *
	 * If the optional `sd` argument is present then return binary exponential notation.
	 *
	 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toHexadecimal = P.toHex = function (sd, rm) {
	  return toStringBinary(this, 16, sd, rm);
	};


	/*
	 * Returns a new Decimal whose value is the nearest multiple of `y` in the direction of rounding
	 * mode `rm`, or `Decimal.rounding` if `rm` is omitted, to the value of this Decimal.
	 *
	 * The return value will always have the same sign as this Decimal, unless either this Decimal
	 * or `y` is NaN, in which case the return value will be also be NaN.
	 *
	 * The return value is not affected by the value of `precision`.
	 *
	 * y {number|string|Decimal} The magnitude to round to a multiple of.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 * 'toNearest() rounding mode not an integer: {rm}'
	 * 'toNearest() rounding mode out of range: {rm}'
	 *
	 */
	P.toNearest = function (y, rm) {
	  var x = this,
	    Ctor = x.constructor;

	  x = new Ctor(x);

	  if (y == null) {

	    // If x is not finite, return x.
	    if (!x.d) return x;

	    y = new Ctor(1);
	    rm = Ctor.rounding;
	  } else {
	    y = new Ctor(y);
	    if (rm === void 0) {
	      rm = Ctor.rounding;
	    } else {
	      checkInt32(rm, 0, 8);
	    }

	    // If x is not finite, return x if y is not NaN, else NaN.
	    if (!x.d) return y.s ? x : y;

	    // If y is not finite, return Infinity with the sign of x if y is Infinity, else NaN.
	    if (!y.d) {
	      if (y.s) y.s = x.s;
	      return y;
	    }
	  }

	  // If y is not zero, calculate the nearest multiple of y to x.
	  if (y.d[0]) {
	    external = false;
	    x = divide(x, y, 0, rm, 1).times(y);
	    external = true;
	    finalise(x);

	  // If y is zero, return zero with the sign of x.
	  } else {
	    y.s = x.s;
	    x = y;
	  }

	  return x;
	};


	/*
	 * Return the value of this Decimal converted to a number primitive.
	 * Zero keeps its sign.
	 *
	 */
	P.toNumber = function () {
	  return +this;
	};


	/*
	 * Return a string representing the value of this Decimal in base 8, round to `sd` significant
	 * digits using rounding mode `rm`.
	 *
	 * If the optional `sd` argument is present then return binary exponential notation.
	 *
	 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toOctal = function (sd, rm) {
	  return toStringBinary(this, 8, sd, rm);
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal raised to the power `y`, rounded
	 * to `precision` significant digits using rounding mode `rounding`.
	 *
	 * ECMAScript compliant.
	 *
	 *   pow(x, NaN)                           = NaN
	 *   pow(x, ±0)                            = 1

	 *   pow(NaN, non-zero)                    = NaN
	 *   pow(abs(x) > 1, +Infinity)            = +Infinity
	 *   pow(abs(x) > 1, -Infinity)            = +0
	 *   pow(abs(x) == 1, ±Infinity)           = NaN
	 *   pow(abs(x) < 1, +Infinity)            = +0
	 *   pow(abs(x) < 1, -Infinity)            = +Infinity
	 *   pow(+Infinity, y > 0)                 = +Infinity
	 *   pow(+Infinity, y < 0)                 = +0
	 *   pow(-Infinity, odd integer > 0)       = -Infinity
	 *   pow(-Infinity, even integer > 0)      = +Infinity
	 *   pow(-Infinity, odd integer < 0)       = -0
	 *   pow(-Infinity, even integer < 0)      = +0
	 *   pow(+0, y > 0)                        = +0
	 *   pow(+0, y < 0)                        = +Infinity
	 *   pow(-0, odd integer > 0)              = -0
	 *   pow(-0, even integer > 0)             = +0
	 *   pow(-0, odd integer < 0)              = -Infinity
	 *   pow(-0, even integer < 0)             = +Infinity
	 *   pow(finite x < 0, finite non-integer) = NaN
	 *
	 * For non-integer or very large exponents pow(x, y) is calculated using
	 *
	 *   x^y = exp(y*ln(x))
	 *
	 * Assuming the first 15 rounding digits are each equally likely to be any digit 0-9, the
	 * probability of an incorrectly rounded result
	 * P([49]9{14} | [50]0{14}) = 2 * 0.2 * 10^-14 = 4e-15 = 1/2.5e+14
	 * i.e. 1 in 250,000,000,000,000
	 *
	 * If a result is incorrectly rounded the maximum error will be 1 ulp (unit in last place).
	 *
	 * y {number|string|Decimal} The power to which to raise this Decimal.
	 *
	 */
	P.toPower = P.pow = function (y) {
	  var e, k, pr, r, rm, s,
	    x = this,
	    Ctor = x.constructor,
	    yn = +(y = new Ctor(y));

	  // Either ±Infinity, NaN or ±0?
	  if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));

	  x = new Ctor(x);

	  if (x.eq(1)) return x;

	  pr = Ctor.precision;
	  rm = Ctor.rounding;

	  if (y.eq(1)) return finalise(x, pr, rm);

	  // y exponent
	  e = mathfloor(y.e / LOG_BASE);

	  // If y is a small integer use the 'exponentiation by squaring' algorithm.
	  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
	    r = intPow(Ctor, x, k, pr);
	    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
	  }

	  s = x.s;

	  // if x is negative
	  if (s < 0) {

	    // if y is not an integer
	    if (e < y.d.length - 1) return new Ctor(NaN);

	    // Result is positive if x is negative and the last digit of integer y is even.
	    if ((y.d[e] & 1) == 0) s = 1;

	    // if x.eq(-1)
	    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
	      x.s = s;
	      return x;
	    }
	  }

	  // Estimate result exponent.
	  // x^y = 10^e,  where e = y * log10(x)
	  // log10(x) = log10(x_significand) + x_exponent
	  // log10(x_significand) = ln(x_significand) / ln(10)
	  k = mathpow(+x, yn);
	  e = k == 0 || !isFinite(k)
	    ? mathfloor(yn * (Math.log('0.' + digitsToString(x.d)) / Math.LN10 + x.e + 1))
	    : new Ctor(k + '').e;

	  // Exponent estimate may be incorrect e.g. x: 0.999999999999999999, y: 2.29, e: 0, r.e: -1.

	  // Overflow/underflow?
	  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);

	  external = false;
	  Ctor.rounding = x.s = 1;

	  // Estimate the extra guard digits needed to ensure five correct rounding digits from
	  // naturalLogarithm(x). Example of failure without these extra digits (precision: 10):
	  // new Decimal(2.32456).pow('2087987436534566.46411')
	  // should be 1.162377823e+764914905173815, but is 1.162355823e+764914905173815
	  k = Math.min(12, (e + '').length);

	  // r = x^y = exp(y*ln(x))
	  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);

	  // r may be Infinity, e.g. (0.9999999999999999).pow(-1e+40)
	  if (r.d) {

	    // Truncate to the required precision plus five rounding digits.
	    r = finalise(r, pr + 5, 1);

	    // If the rounding digits are [49]9999 or [50]0000 increase the precision by 10 and recalculate
	    // the result.
	    if (checkRoundingDigits(r.d, pr, rm)) {
	      e = pr + 10;

	      // Truncate to the increased precision plus five rounding digits.
	      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);

	      // Check for 14 nines from the 2nd rounding digit (the first rounding digit may be 4 or 9).
	      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
	        r = finalise(r, pr + 1, 0);
	      }
	    }
	  }

	  r.s = s;
	  external = true;
	  Ctor.rounding = rm;

	  return finalise(r, pr, rm);
	};


	/*
	 * Return a string representing the value of this Decimal rounded to `sd` significant digits
	 * using rounding mode `rounding`.
	 *
	 * Return exponential notation if `sd` is less than the number of digits necessary to represent
	 * the integer part of the value in normal notation.
	 *
	 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 */
	P.toPrecision = function (sd, rm) {
	  var str,
	    x = this,
	    Ctor = x.constructor;

	  if (sd === void 0) {
	    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
	  } else {
	    checkInt32(sd, 1, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);

	    x = finalise(new Ctor(x), sd, rm);
	    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
	  }

	  return x.isNeg() && !x.isZero() ? '-' + str : str;
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal rounded to a maximum of `sd`
	 * significant digits using rounding mode `rm`, or to `precision` and `rounding` respectively if
	 * omitted.
	 *
	 * [sd] {number} Significant digits. Integer, 1 to MAX_DIGITS inclusive.
	 * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	 *
	 * 'toSD() digits out of range: {sd}'
	 * 'toSD() digits not an integer: {sd}'
	 * 'toSD() rounding mode not an integer: {rm}'
	 * 'toSD() rounding mode out of range: {rm}'
	 *
	 */
	P.toSignificantDigits = P.toSD = function (sd, rm) {
	  var x = this,
	    Ctor = x.constructor;

	  if (sd === void 0) {
	    sd = Ctor.precision;
	    rm = Ctor.rounding;
	  } else {
	    checkInt32(sd, 1, MAX_DIGITS);

	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);
	  }

	  return finalise(new Ctor(x), sd, rm);
	};


	/*
	 * Return a string representing the value of this Decimal.
	 *
	 * Return exponential notation if this Decimal has a positive exponent equal to or greater than
	 * `toExpPos`, or a negative exponent equal to or less than `toExpNeg`.
	 *
	 */
	P.toString = function () {
	  var x = this,
	    Ctor = x.constructor,
	    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	  return x.isNeg() && !x.isZero() ? '-' + str : str;
	};


	/*
	 * Return a new Decimal whose value is the value of this Decimal truncated to a whole number.
	 *
	 */
	P.truncated = P.trunc = function () {
	  return finalise(new this.constructor(this), this.e + 1, 1);
	};


	/*
	 * Return a string representing the value of this Decimal.
	 * Unlike `toString`, negative zero will include the minus sign.
	 *
	 */
	P.valueOf = P.toJSON = function () {
	  var x = this,
	    Ctor = x.constructor,
	    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);

	  return x.isNeg() ? '-' + str : str;
	};


	/*
	// Add aliases to match BigDecimal method names.
	// P.add = P.plus;
	P.subtract = P.minus;
	P.multiply = P.times;
	P.divide = P.div;
	P.remainder = P.mod;
	P.compareTo = P.cmp;
	P.negate = P.neg;
	 */


	// Helper functions for Decimal.prototype (P) and/or Decimal methods, and their callers.


	/*
	 *  digitsToString           P.cubeRoot, P.logarithm, P.squareRoot, P.toFraction, P.toPower,
	 *                           finiteToString, naturalExponential, naturalLogarithm
	 *  checkInt32               P.toDecimalPlaces, P.toExponential, P.toFixed, P.toNearest,
	 *                           P.toPrecision, P.toSignificantDigits, toStringBinary, random
	 *  checkRoundingDigits      P.logarithm, P.toPower, naturalExponential, naturalLogarithm
	 *  convertBase              toStringBinary, parseOther
	 *  cos                      P.cos
	 *  divide                   P.atanh, P.cubeRoot, P.dividedBy, P.dividedToIntegerBy,
	 *                           P.logarithm, P.modulo, P.squareRoot, P.tan, P.tanh, P.toFraction,
	 *                           P.toNearest, toStringBinary, naturalExponential, naturalLogarithm,
	 *                           taylorSeries, atan2, parseOther
	 *  finalise                 P.absoluteValue, P.atan, P.atanh, P.ceil, P.cos, P.cosh,
	 *                           P.cubeRoot, P.dividedToIntegerBy, P.floor, P.logarithm, P.minus,
	 *                           P.modulo, P.negated, P.plus, P.round, P.sin, P.sinh, P.squareRoot,
	 *                           P.tan, P.times, P.toDecimalPlaces, P.toExponential, P.toFixed,
	 *                           P.toNearest, P.toPower, P.toPrecision, P.toSignificantDigits,
	 *                           P.truncated, divide, getLn10, getPi, naturalExponential,
	 *                           naturalLogarithm, ceil, floor, round, trunc
	 *  finiteToString           P.toExponential, P.toFixed, P.toPrecision, P.toString, P.valueOf,
	 *                           toStringBinary
	 *  getBase10Exponent        P.minus, P.plus, P.times, parseOther
	 *  getLn10                  P.logarithm, naturalLogarithm
	 *  getPi                    P.acos, P.asin, P.atan, toLessThanHalfPi, atan2
	 *  getPrecision             P.precision, P.toFraction
	 *  getZeroString            digitsToString, finiteToString
	 *  intPow                   P.toPower, parseOther
	 *  isOdd                    toLessThanHalfPi
	 *  maxOrMin                 max, min
	 *  naturalExponential       P.naturalExponential, P.toPower
	 *  naturalLogarithm         P.acosh, P.asinh, P.atanh, P.logarithm, P.naturalLogarithm,
	 *                           P.toPower, naturalExponential
	 *  nonFiniteToString        finiteToString, toStringBinary
	 *  parseDecimal             Decimal
	 *  parseOther               Decimal
	 *  sin                      P.sin
	 *  taylorSeries             P.cosh, P.sinh, cos, sin
	 *  toLessThanHalfPi         P.cos, P.sin
	 *  toStringBinary           P.toBinary, P.toHexadecimal, P.toOctal
	 *  truncate                 intPow
	 *
	 *  Throws:                  P.logarithm, P.precision, P.toFraction, checkInt32, getLn10, getPi,
	 *                           naturalLogarithm, config, parseOther, random, Decimal
	 */


	function digitsToString(d) {
	  var i, k, ws,
	    indexOfLastWord = d.length - 1,
	    str = '',
	    w = d[0];

	  if (indexOfLastWord > 0) {
	    str += w;
	    for (i = 1; i < indexOfLastWord; i++) {
	      ws = d[i] + '';
	      k = LOG_BASE - ws.length;
	      if (k) str += getZeroString(k);
	      str += ws;
	    }

	    w = d[i];
	    ws = w + '';
	    k = LOG_BASE - ws.length;
	    if (k) str += getZeroString(k);
	  } else if (w === 0) {
	    return '0';
	  }

	  // Remove trailing zeros of last w.
	  for (; w % 10 === 0;) w /= 10;

	  return str + w;
	}


	function checkInt32(i, min, max) {
	  if (i !== ~~i || i < min || i > max) {
	    throw Error(invalidArgument + i);
	  }
	}


	/*
	 * Check 5 rounding digits if `repeating` is null, 4 otherwise.
	 * `repeating == null` if caller is `log` or `pow`,
	 * `repeating != null` if caller is `naturalLogarithm` or `naturalExponential`.
	 */
	function checkRoundingDigits(d, i, rm, repeating) {
	  var di, k, r, rd;

	  // Get the length of the first word of the array d.
	  for (k = d[0]; k >= 10; k /= 10) --i;

	  // Is the rounding digit in the first word of d?
	  if (--i < 0) {
	    i += LOG_BASE;
	    di = 0;
	  } else {
	    di = Math.ceil((i + 1) / LOG_BASE);
	    i %= LOG_BASE;
	  }

	  // i is the index (0 - 6) of the rounding digit.
	  // E.g. if within the word 3487563 the first rounding digit is 5,
	  // then i = 4, k = 1000, rd = 3487563 % 1000 = 563
	  k = mathpow(10, LOG_BASE - i);
	  rd = d[di] % k | 0;

	  if (repeating == null) {
	    if (i < 3) {
	      if (i == 0) rd = rd / 100 | 0;
	      else if (i == 1) rd = rd / 10 | 0;
	      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 50000 || rd == 0;
	    } else {
	      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) &&
	        (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 ||
	          (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
	    }
	  } else {
	    if (i < 4) {
	      if (i == 0) rd = rd / 1000 | 0;
	      else if (i == 1) rd = rd / 100 | 0;
	      else if (i == 2) rd = rd / 10 | 0;
	      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
	    } else {
	      r = ((repeating || rm < 4) && rd + 1 == k ||
	      (!repeating && rm > 3) && rd + 1 == k / 2) &&
	        (d[di + 1] / k / 1000 | 0) == mathpow(10, i - 3) - 1;
	    }
	  }

	  return r;
	}


	// Convert string of `baseIn` to an array of numbers of `baseOut`.
	// Eg. convertBase('255', 10, 16) returns [15, 15].
	// Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
	function convertBase(str, baseIn, baseOut) {
	  var j,
	    arr = [0],
	    arrL,
	    i = 0,
	    strL = str.length;

	  for (; i < strL;) {
	    for (arrL = arr.length; arrL--;) arr[arrL] *= baseIn;
	    arr[0] += NUMERALS.indexOf(str.charAt(i++));
	    for (j = 0; j < arr.length; j++) {
	      if (arr[j] > baseOut - 1) {
	        if (arr[j + 1] === void 0) arr[j + 1] = 0;
	        arr[j + 1] += arr[j] / baseOut | 0;
	        arr[j] %= baseOut;
	      }
	    }
	  }

	  return arr.reverse();
	}


	/*
	 * cos(x) = 1 - x^2/2! + x^4/4! - ...
	 * |x| < pi/2
	 *
	 */
	function cosine(Ctor, x) {
	  var k, y,
	    len = x.d.length;

	  // Argument reduction: cos(4x) = 8*(cos^4(x) - cos^2(x)) + 1
	  // i.e. cos(x) = 8*(cos^4(x/4) - cos^2(x/4)) + 1

	  // Estimate the optimum number of times to use the argument reduction.
	  if (len < 32) {
	    k = Math.ceil(len / 3);
	    y = (1 / tinyPow(4, k)).toString();
	  } else {
	    k = 16;
	    y = '2.3283064365386962890625e-10';
	  }

	  Ctor.precision += k;

	  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));

	  // Reverse argument reduction
	  for (var i = k; i--;) {
	    var cos2x = x.times(x);
	    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
	  }

	  Ctor.precision -= k;

	  return x;
	}


	/*
	 * Perform division in the specified base.
	 */
	var divide = (function () {

	  // Assumes non-zero x and k, and hence non-zero result.
	  function multiplyInteger(x, k, base) {
	    var temp,
	      carry = 0,
	      i = x.length;

	    for (x = x.slice(); i--;) {
	      temp = x[i] * k + carry;
	      x[i] = temp % base | 0;
	      carry = temp / base | 0;
	    }

	    if (carry) x.unshift(carry);

	    return x;
	  }

	  function compare(a, b, aL, bL) {
	    var i, r;

	    if (aL != bL) {
	      r = aL > bL ? 1 : -1;
	    } else {
	      for (i = r = 0; i < aL; i++) {
	        if (a[i] != b[i]) {
	          r = a[i] > b[i] ? 1 : -1;
	          break;
	        }
	      }
	    }

	    return r;
	  }

	  function subtract(a, b, aL, base) {
	    var i = 0;

	    // Subtract b from a.
	    for (; aL--;) {
	      a[aL] -= i;
	      i = a[aL] < b[aL] ? 1 : 0;
	      a[aL] = i * base + a[aL] - b[aL];
	    }

	    // Remove leading zeros.
	    for (; !a[0] && a.length > 1;) a.shift();
	  }

	  return function (x, y, pr, rm, dp, base) {
	    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0,
	      yL, yz,
	      Ctor = x.constructor,
	      sign = x.s == y.s ? 1 : -1,
	      xd = x.d,
	      yd = y.d;

	    // Either NaN, Infinity or 0?
	    if (!xd || !xd[0] || !yd || !yd[0]) {

	      return new Ctor(// Return NaN if either NaN, or both Infinity or 0.
	        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN :

	        // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
	        xd && xd[0] == 0 || !yd ? sign * 0 : sign / 0);
	    }

	    if (base) {
	      logBase = 1;
	      e = x.e - y.e;
	    } else {
	      base = BASE;
	      logBase = LOG_BASE;
	      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
	    }

	    yL = yd.length;
	    xL = xd.length;
	    q = new Ctor(sign);
	    qd = q.d = [];

	    // Result exponent may be one less than e.
	    // The digit array of a Decimal from toStringBinary may have trailing zeros.
	    for (i = 0; yd[i] == (xd[i] || 0); i++);

	    if (yd[i] > (xd[i] || 0)) e--;

	    if (pr == null) {
	      sd = pr = Ctor.precision;
	      rm = Ctor.rounding;
	    } else if (dp) {
	      sd = pr + (x.e - y.e) + 1;
	    } else {
	      sd = pr;
	    }

	    if (sd < 0) {
	      qd.push(1);
	      more = true;
	    } else {

	      // Convert precision in number of base 10 digits to base 1e7 digits.
	      sd = sd / logBase + 2 | 0;
	      i = 0;

	      // divisor < 1e7
	      if (yL == 1) {
	        k = 0;
	        yd = yd[0];
	        sd++;

	        // k is the carry.
	        for (; (i < xL || k) && sd--; i++) {
	          t = k * base + (xd[i] || 0);
	          qd[i] = t / yd | 0;
	          k = t % yd | 0;
	        }

	        more = k || i < xL;

	      // divisor >= 1e7
	      } else {

	        // Normalise xd and yd so highest order digit of yd is >= base/2
	        k = base / (yd[0] + 1) | 0;

	        if (k > 1) {
	          yd = multiplyInteger(yd, k, base);
	          xd = multiplyInteger(xd, k, base);
	          yL = yd.length;
	          xL = xd.length;
	        }

	        xi = yL;
	        rem = xd.slice(0, yL);
	        remL = rem.length;

	        // Add zeros to make remainder as long as divisor.
	        for (; remL < yL;) rem[remL++] = 0;

	        yz = yd.slice();
	        yz.unshift(0);
	        yd0 = yd[0];

	        if (yd[1] >= base / 2) ++yd0;

	        do {
	          k = 0;

	          // Compare divisor and remainder.
	          cmp = compare(yd, rem, yL, remL);

	          // If divisor < remainder.
	          if (cmp < 0) {

	            // Calculate trial digit, k.
	            rem0 = rem[0];
	            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	            // k will be how many times the divisor goes into the current remainder.
	            k = rem0 / yd0 | 0;

	            //  Algorithm:
	            //  1. product = divisor * trial digit (k)
	            //  2. if product > remainder: product -= divisor, k--
	            //  3. remainder -= product
	            //  4. if product was < remainder at 2:
	            //    5. compare new remainder and divisor
	            //    6. If remainder > divisor: remainder -= divisor, k++

	            if (k > 1) {
	              if (k >= base) k = base - 1;

	              // product = divisor * trial digit.
	              prod = multiplyInteger(yd, k, base);
	              prodL = prod.length;
	              remL = rem.length;

	              // Compare product and remainder.
	              cmp = compare(prod, rem, prodL, remL);

	              // product > remainder.
	              if (cmp == 1) {
	                k--;

	                // Subtract divisor from product.
	                subtract(prod, yL < prodL ? yz : yd, prodL, base);
	              }
	            } else {

	              // cmp is -1.
	              // If k is 0, there is no need to compare yd and rem again below, so change cmp to 1
	              // to avoid it. If k is 1 there is a need to compare yd and rem again below.
	              if (k == 0) cmp = k = 1;
	              prod = yd.slice();
	            }

	            prodL = prod.length;
	            if (prodL < remL) prod.unshift(0);

	            // Subtract product from remainder.
	            subtract(rem, prod, remL, base);

	            // If product was < previous remainder.
	            if (cmp == -1) {
	              remL = rem.length;

	              // Compare divisor and new remainder.
	              cmp = compare(yd, rem, yL, remL);

	              // If divisor < new remainder, subtract divisor from remainder.
	              if (cmp < 1) {
	                k++;

	                // Subtract divisor from remainder.
	                subtract(rem, yL < remL ? yz : yd, remL, base);
	              }
	            }

	            remL = rem.length;
	          } else if (cmp === 0) {
	            k++;
	            rem = [0];
	          }    // if cmp === 1, k will be 0

	          // Add the next digit, k, to the result array.
	          qd[i++] = k;

	          // Update the remainder.
	          if (cmp && rem[0]) {
	            rem[remL++] = xd[xi] || 0;
	          } else {
	            rem = [xd[xi]];
	            remL = 1;
	          }

	        } while ((xi++ < xL || rem[0] !== void 0) && sd--);

	        more = rem[0] !== void 0;
	      }

	      // Leading zero?
	      if (!qd[0]) qd.shift();
	    }

	    // logBase is 1 when divide is being used for base conversion.
	    if (logBase == 1) {
	      q.e = e;
	      inexact = more;
	    } else {

	      // To calculate q.e, first get the number of digits of qd[0].
	      for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
	      q.e = i + e * logBase - 1;

	      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
	    }

	    return q;
	  };
	})();


	/*
	 * Round `x` to `sd` significant digits using rounding mode `rm`.
	 * Check for over/under-flow.
	 */
	 function finalise(x, sd, rm, isTruncated) {
	  var digits, i, j, k, rd, roundUp, w, xd, xdi,
	    Ctor = x.constructor;

	  // Don't round if sd is null or undefined.
	  out: if (sd != null) {
	    xd = x.d;

	    // Infinity/NaN.
	    if (!xd) return x;

	    // rd: the rounding digit, i.e. the digit after the digit that may be rounded up.
	    // w: the word of xd containing rd, a base 1e7 number.
	    // xdi: the index of w within xd.
	    // digits: the number of digits of w.
	    // i: what would be the index of rd within w if all the numbers were 7 digits long (i.e. if
	    // they had leading zeros)
	    // j: if > 0, the actual index of rd within w (if < 0, rd is a leading zero).

	    // Get the length of the first word of the digits array xd.
	    for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
	    i = sd - digits;

	    // Is the rounding digit in the first word of xd?
	    if (i < 0) {
	      i += LOG_BASE;
	      j = sd;
	      w = xd[xdi = 0];

	      // Get the rounding digit at index j of w.
	      rd = w / mathpow(10, digits - j - 1) % 10 | 0;
	    } else {
	      xdi = Math.ceil((i + 1) / LOG_BASE);
	      k = xd.length;
	      if (xdi >= k) {
	        if (isTruncated) {

	          // Needed by `naturalExponential`, `naturalLogarithm` and `squareRoot`.
	          for (; k++ <= xdi;) xd.push(0);
	          w = rd = 0;
	          digits = 1;
	          i %= LOG_BASE;
	          j = i - LOG_BASE + 1;
	        } else {
	          break out;
	        }
	      } else {
	        w = k = xd[xdi];

	        // Get the number of digits of w.
	        for (digits = 1; k >= 10; k /= 10) digits++;

	        // Get the index of rd within w.
	        i %= LOG_BASE;

	        // Get the index of rd within w, adjusted for leading zeros.
	        // The number of leading zeros of w is given by LOG_BASE - digits.
	        j = i - LOG_BASE + digits;

	        // Get the rounding digit at index j of w.
	        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
	      }
	    }

	    // Are there any non-zero digits after the rounding digit?
	    isTruncated = isTruncated || sd < 0 ||
	      xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));

	    // The expression `w % mathpow(10, digits - j - 1)` returns all the digits of w to the right
	    // of the digit at (left-to-right) index j, e.g. if w is 908714 and j is 2, the expression
	    // will give 714.

	    roundUp = rm < 4
	      ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	      : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 &&

	        // Check whether the digit to the left of the rounding digit is odd.
	        ((i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10) & 1 ||
	          rm == (x.s < 0 ? 8 : 7));

	    if (sd < 1 || !xd[0]) {
	      xd.length = 0;
	      if (roundUp) {

	        // Convert sd to decimal places.
	        sd -= x.e + 1;

	        // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
	        x.e = -sd || 0;
	      } else {

	        // Zero.
	        xd[0] = x.e = 0;
	      }

	      return x;
	    }

	    // Remove excess digits.
	    if (i == 0) {
	      xd.length = xdi;
	      k = 1;
	      xdi--;
	    } else {
	      xd.length = xdi + 1;
	      k = mathpow(10, LOG_BASE - i);

	      // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	      // j > 0 means i > number of leading zeros of w.
	      xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
	    }

	    if (roundUp) {
	      for (;;) {

	        // Is the digit to be rounded up in the first word of xd?
	        if (xdi == 0) {

	          // i will be the length of xd[0] before k is added.
	          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
	          j = xd[0] += k;
	          for (k = 1; j >= 10; j /= 10) k++;

	          // if i != k the length has increased.
	          if (i != k) {
	            x.e++;
	            if (xd[0] == BASE) xd[0] = 1;
	          }

	          break;
	        } else {
	          xd[xdi] += k;
	          if (xd[xdi] != BASE) break;
	          xd[xdi--] = 0;
	          k = 1;
	        }
	      }
	    }

	    // Remove trailing zeros.
	    for (i = xd.length; xd[--i] === 0;) xd.pop();
	  }

	  if (external) {

	    // Overflow?
	    if (x.e > Ctor.maxE) {

	      // Infinity.
	      x.d = null;
	      x.e = NaN;

	    // Underflow?
	    } else if (x.e < Ctor.minE) {

	      // Zero.
	      x.e = 0;
	      x.d = [0];
	      // Ctor.underflow = true;
	    } // else Ctor.underflow = false;
	  }

	  return x;
	}


	function finiteToString(x, isExp, sd) {
	  if (!x.isFinite()) return nonFiniteToString(x);
	  var k,
	    e = x.e,
	    str = digitsToString(x.d),
	    len = str.length;

	  if (isExp) {
	    if (sd && (k = sd - len) > 0) {
	      str = str.charAt(0) + '.' + str.slice(1) + getZeroString(k);
	    } else if (len > 1) {
	      str = str.charAt(0) + '.' + str.slice(1);
	    }

	    str = str + (x.e < 0 ? 'e' : 'e+') + x.e;
	  } else if (e < 0) {
	    str = '0.' + getZeroString(-e - 1) + str;
	    if (sd && (k = sd - len) > 0) str += getZeroString(k);
	  } else if (e >= len) {
	    str += getZeroString(e + 1 - len);
	    if (sd && (k = sd - e - 1) > 0) str = str + '.' + getZeroString(k);
	  } else {
	    if ((k = e + 1) < len) str = str.slice(0, k) + '.' + str.slice(k);
	    if (sd && (k = sd - len) > 0) {
	      if (e + 1 === len) str += '.';
	      str += getZeroString(k);
	    }
	  }

	  return str;
	}


	// Calculate the base 10 exponent from the base 1e7 exponent.
	function getBase10Exponent(digits, e) {
	  var w = digits[0];

	  // Add the number of digits of the first word of the digits array.
	  for ( e *= LOG_BASE; w >= 10; w /= 10) e++;
	  return e;
	}


	function getLn10(Ctor, sd, pr) {
	  if (sd > LN10_PRECISION) {

	    // Reset global state in case the exception is caught.
	    external = true;
	    if (pr) Ctor.precision = pr;
	    throw Error(precisionLimitExceeded);
	  }
	  return finalise(new Ctor(LN10), sd, 1, true);
	}


	function getPi(Ctor, sd, rm) {
	  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
	  return finalise(new Ctor(PI), sd, rm, true);
	}


	function getPrecision(digits) {
	  var w = digits.length - 1,
	    len = w * LOG_BASE + 1;

	  w = digits[w];

	  // If non-zero...
	  if (w) {

	    // Subtract the number of trailing zeros of the last word.
	    for (; w % 10 == 0; w /= 10) len--;

	    // Add the number of digits of the first word.
	    for (w = digits[0]; w >= 10; w /= 10) len++;
	  }

	  return len;
	}


	function getZeroString(k) {
	  var zs = '';
	  for (; k--;) zs += '0';
	  return zs;
	}


	/*
	 * Return a new Decimal whose value is the value of Decimal `x` to the power `n`, where `n` is an
	 * integer of type number.
	 *
	 * Implements 'exponentiation by squaring'. Called by `pow` and `parseOther`.
	 *
	 */
	function intPow(Ctor, x, n, pr) {
	  var isTruncated,
	    r = new Ctor(1),

	    // Max n of 9007199254740991 takes 53 loop iterations.
	    // Maximum digits array length; leaves [28, 34] guard digits.
	    k = Math.ceil(pr / LOG_BASE + 4);

	  external = false;

	  for (;;) {
	    if (n % 2) {
	      r = r.times(x);
	      if (truncate(r.d, k)) isTruncated = true;
	    }

	    n = mathfloor(n / 2);
	    if (n === 0) {

	      // To ensure correct rounding when r.d is truncated, increment the last word if it is zero.
	      n = r.d.length - 1;
	      if (isTruncated && r.d[n] === 0) ++r.d[n];
	      break;
	    }

	    x = x.times(x);
	    truncate(x.d, k);
	  }

	  external = true;

	  return r;
	}


	function isOdd(n) {
	  return n.d[n.d.length - 1] & 1;
	}


	/*
	 * Handle `max` and `min`. `ltgt` is 'lt' or 'gt'.
	 */
	function maxOrMin(Ctor, args, ltgt) {
	  var y,
	    x = new Ctor(args[0]),
	    i = 0;

	  for (; ++i < args.length;) {
	    y = new Ctor(args[i]);
	    if (!y.s) {
	      x = y;
	      break;
	    } else if (x[ltgt](y)) {
	      x = y;
	    }
	  }

	  return x;
	}


	/*
	 * Return a new Decimal whose value is the natural exponential of `x` rounded to `sd` significant
	 * digits.
	 *
	 * Taylor/Maclaurin series.
	 *
	 * exp(x) = x^0/0! + x^1/1! + x^2/2! + x^3/3! + ...
	 *
	 * Argument reduction:
	 *   Repeat x = x / 32, k += 5, until |x| < 0.1
	 *   exp(x) = exp(x / 2^k)^(2^k)
	 *
	 * Previously, the argument was initially reduced by
	 * exp(x) = exp(r) * 10^k  where r = x - k * ln10, k = floor(x / ln10)
	 * to first put r in the range [0, ln10], before dividing by 32 until |x| < 0.1, but this was
	 * found to be slower than just dividing repeatedly by 32 as above.
	 *
	 * Max integer argument: exp('20723265836946413') = 6.3e+9000000000000000
	 * Min integer argument: exp('-20723265836946411') = 1.2e-9000000000000000
	 * (Math object integer min/max: Math.exp(709) = 8.2e+307, Math.exp(-745) = 5e-324)
	 *
	 *  exp(Infinity)  = Infinity
	 *  exp(-Infinity) = 0
	 *  exp(NaN)       = NaN
	 *  exp(±0)        = 1
	 *
	 *  exp(x) is non-terminating for any finite, non-zero x.
	 *
	 *  The result will always be correctly rounded.
	 *
	 */
	function naturalExponential(x, sd) {
	  var denominator, guard, j, pow, sum, t, wpr,
	    rep = 0,
	    i = 0,
	    k = 0,
	    Ctor = x.constructor,
	    rm = Ctor.rounding,
	    pr = Ctor.precision;

	  // 0/NaN/Infinity?
	  if (!x.d || !x.d[0] || x.e > 17) {

	    return new Ctor(x.d
	      ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0
	      : x.s ? x.s < 0 ? 0 : x : 0 / 0);
	  }

	  if (sd == null) {
	    external = false;
	    wpr = pr;
	  } else {
	    wpr = sd;
	  }

	  t = new Ctor(0.03125);

	  // while abs(x) >= 0.1
	  while (x.e > -2) {

	    // x = x / 2^5
	    x = x.times(t);
	    k += 5;
	  }

	  // Use 2 * log10(2^k) + 5 (empirically derived) to estimate the increase in precision
	  // necessary to ensure the first 4 rounding digits are correct.
	  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
	  wpr += guard;
	  denominator = pow = sum = new Ctor(1);
	  Ctor.precision = wpr;

	  for (;;) {
	    pow = finalise(pow.times(x), wpr, 1);
	    denominator = denominator.times(++i);
	    t = sum.plus(divide(pow, denominator, wpr, 1));

	    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	      j = k;
	      while (j--) sum = finalise(sum.times(sum), wpr, 1);

	      // Check to see if the first 4 rounding digits are [49]999.
	      // If so, repeat the summation with a higher precision, otherwise
	      // e.g. with precision: 18, rounding: 1
	      // exp(18.404272462595034083567793919843761) = 98372560.1229999999 (should be 98372560.123)
	      // `wpr - guard` is the index of first rounding digit.
	      if (sd == null) {

	        if (rep < 3 && checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	          Ctor.precision = wpr += 10;
	          denominator = pow = t = new Ctor(1);
	          i = 0;
	          rep++;
	        } else {
	          return finalise(sum, Ctor.precision = pr, rm, external = true);
	        }
	      } else {
	        Ctor.precision = pr;
	        return sum;
	      }
	    }

	    sum = t;
	  }
	}


	/*
	 * Return a new Decimal whose value is the natural logarithm of `x` rounded to `sd` significant
	 * digits.
	 *
	 *  ln(-n)        = NaN
	 *  ln(0)         = -Infinity
	 *  ln(-0)        = -Infinity
	 *  ln(1)         = 0
	 *  ln(Infinity)  = Infinity
	 *  ln(-Infinity) = NaN
	 *  ln(NaN)       = NaN
	 *
	 *  ln(n) (n != 1) is non-terminating.
	 *
	 */
	function naturalLogarithm(y, sd) {
	  var c, c0, denominator, e, numerator, rep, sum, t, wpr, x1, x2,
	    n = 1,
	    guard = 10,
	    x = y,
	    xd = x.d,
	    Ctor = x.constructor,
	    rm = Ctor.rounding,
	    pr = Ctor.precision;

	  // Is x negative or Infinity, NaN, 0 or 1?
	  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
	    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
	  }

	  if (sd == null) {
	    external = false;
	    wpr = pr;
	  } else {
	    wpr = sd;
	  }

	  Ctor.precision = wpr += guard;
	  c = digitsToString(xd);
	  c0 = c.charAt(0);

	  if (Math.abs(e = x.e) < 1.5e15) {

	    // Argument reduction.
	    // The series converges faster the closer the argument is to 1, so using
	    // ln(a^b) = b * ln(a),   ln(a) = ln(a^b) / b
	    // multiply the argument by itself until the leading digits of the significand are 7, 8, 9,
	    // 10, 11, 12 or 13, recording the number of multiplications so the sum of the series can
	    // later be divided by this number, then separate out the power of 10 using
	    // ln(a*10^b) = ln(a) + b*ln(10).

	    // max n is 21 (gives 0.9, 1.0 or 1.1) (9e15 / 21 = 4.2e14).
	    //while (c0 < 9 && c0 != 1 || c0 == 1 && c.charAt(1) > 1) {
	    // max n is 6 (gives 0.7 - 1.3)
	    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
	      x = x.times(y);
	      c = digitsToString(x.d);
	      c0 = c.charAt(0);
	      n++;
	    }

	    e = x.e;

	    if (c0 > 1) {
	      x = new Ctor('0.' + c);
	      e++;
	    } else {
	      x = new Ctor(c0 + '.' + c.slice(1));
	    }
	  } else {

	    // The argument reduction method above may result in overflow if the argument y is a massive
	    // number with exponent >= 1500000000000000 (9e15 / 6 = 1.5e15), so instead recall this
	    // function using ln(x*10^e) = ln(x) + e*ln(10).
	    t = getLn10(Ctor, wpr + 2, pr).times(e + '');
	    x = naturalLogarithm(new Ctor(c0 + '.' + c.slice(1)), wpr - guard).plus(t);
	    Ctor.precision = pr;

	    return sd == null ? finalise(x, pr, rm, external = true) : x;
	  }

	  // x1 is x reduced to a value near 1.
	  x1 = x;

	  // Taylor series.
	  // ln(y) = ln((1 + x)/(1 - x)) = 2(x + x^3/3 + x^5/5 + x^7/7 + ...)
	  // where x = (y - 1)/(y + 1)    (|x| < 1)
	  sum = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
	  x2 = finalise(x.times(x), wpr, 1);
	  denominator = 3;

	  for (;;) {
	    numerator = finalise(numerator.times(x2), wpr, 1);
	    t = sum.plus(divide(numerator, new Ctor(denominator), wpr, 1));

	    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
	      sum = sum.times(2);

	      // Reverse the argument reduction. Check that e is not 0 because, besides preventing an
	      // unnecessary calculation, -0 + 0 = +0 and to ensure correct rounding -0 needs to stay -0.
	      if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ''));
	      sum = divide(sum, new Ctor(n), wpr, 1);

	      // Is rm > 3 and the first 4 rounding digits 4999, or rm < 4 (or the summation has
	      // been repeated previously) and the first 4 rounding digits 9999?
	      // If so, restart the summation with a higher precision, otherwise
	      // e.g. with precision: 12, rounding: 1
	      // ln(135520028.6126091714265381533) = 18.7246299999 when it should be 18.72463.
	      // `wpr - guard` is the index of first rounding digit.
	      if (sd == null) {
	        if (checkRoundingDigits(sum.d, wpr - guard, rm, rep)) {
	          Ctor.precision = wpr += guard;
	          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
	          x2 = finalise(x.times(x), wpr, 1);
	          denominator = rep = 1;
	        } else {
	          return finalise(sum, Ctor.precision = pr, rm, external = true);
	        }
	      } else {
	        Ctor.precision = pr;
	        return sum;
	      }
	    }

	    sum = t;
	    denominator += 2;
	  }
	}


	// ±Infinity, NaN.
	function nonFiniteToString(x) {
	  // Unsigned.
	  return String(x.s * x.s / 0);
	}


	/*
	 * Parse the value of a new Decimal `x` from string `str`.
	 */
	function parseDecimal(x, str) {
	  var e, i, len;

	  // Decimal point?
	  if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	  // Exponential form?
	  if ((i = str.search(/e/i)) > 0) {

	    // Determine exponent.
	    if (e < 0) e = i;
	    e += +str.slice(i + 1);
	    str = str.substring(0, i);
	  } else if (e < 0) {

	    // Integer.
	    e = str.length;
	  }

	  // Determine leading zeros.
	  for (i = 0; str.charCodeAt(i) === 48; i++);

	  // Determine trailing zeros.
	  for (len = str.length; str.charCodeAt(len - 1) === 48; --len);
	  str = str.slice(i, len);

	  if (str) {
	    len -= i;
	    x.e = e = e - i - 1;
	    x.d = [];

	    // Transform base

	    // e is the base 10 exponent.
	    // i is where to slice str to get the first word of the digits array.
	    i = (e + 1) % LOG_BASE;
	    if (e < 0) i += LOG_BASE;

	    if (i < len) {
	      if (i) x.d.push(+str.slice(0, i));
	      for (len -= LOG_BASE; i < len;) x.d.push(+str.slice(i, i += LOG_BASE));
	      str = str.slice(i);
	      i = LOG_BASE - str.length;
	    } else {
	      i -= len;
	    }

	    for (; i--;) str += '0';
	    x.d.push(+str);

	    if (external) {

	      // Overflow?
	      if (x.e > x.constructor.maxE) {

	        // Infinity.
	        x.d = null;
	        x.e = NaN;

	      // Underflow?
	      } else if (x.e < x.constructor.minE) {

	        // Zero.
	        x.e = 0;
	        x.d = [0];
	        // x.constructor.underflow = true;
	      } // else x.constructor.underflow = false;
	    }
	  } else {

	    // Zero.
	    x.e = 0;
	    x.d = [0];
	  }

	  return x;
	}


	/*
	 * Parse the value of a new Decimal `x` from a string `str`, which is not a decimal value.
	 */
	function parseOther(x, str) {
	  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;

	  if (str === 'Infinity' || str === 'NaN') {
	    if (!+str) x.s = NaN;
	    x.e = NaN;
	    x.d = null;
	    return x;
	  }

	  if (isHex.test(str))  {
	    base = 16;
	    str = str.toLowerCase();
	  } else if (isBinary.test(str))  {
	    base = 2;
	  } else if (isOctal.test(str))  {
	    base = 8;
	  } else {
	    throw Error(invalidArgument + str);
	  }

	  // Is there a binary exponent part?
	  i = str.search(/p/i);

	  if (i > 0) {
	    p = +str.slice(i + 1);
	    str = str.substring(2, i);
	  } else {
	    str = str.slice(2);
	  }

	  // Convert `str` as an integer then divide the result by `base` raised to a power such that the
	  // fraction part will be restored.
	  i = str.indexOf('.');
	  isFloat = i >= 0;
	  Ctor = x.constructor;

	  if (isFloat) {
	    str = str.replace('.', '');
	    len = str.length;
	    i = len - i;

	    // log[10](16) = 1.2041... , log[10](88) = 1.9444....
	    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
	  }

	  xd = convertBase(str, base, BASE);
	  xe = xd.length - 1;

	  // Remove trailing zeros.
	  for (i = xe; xd[i] === 0; --i) xd.pop();
	  if (i < 0) return new Ctor(x.s * 0);
	  x.e = getBase10Exponent(xd, xe);
	  x.d = xd;
	  external = false;

	  // At what precision to perform the division to ensure exact conversion?
	  // maxDecimalIntegerPartDigitCount = ceil(log[10](b) * otherBaseIntegerPartDigitCount)
	  // log[10](2) = 0.30103, log[10](8) = 0.90309, log[10](16) = 1.20412
	  // E.g. ceil(1.2 * 3) = 4, so up to 4 decimal digits are needed to represent 3 hex int digits.
	  // maxDecimalFractionPartDigitCount = {Hex:4|Oct:3|Bin:1} * otherBaseFractionPartDigitCount
	  // Therefore using 4 * the number of digits of str will always be enough.
	  if (isFloat) x = divide(x, divisor, len * 4);

	  // Multiply by the binary exponent part if present.
	  if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
	  external = true;

	  return x;
	}


	/*
	 * sin(x) = x - x^3/3! + x^5/5! - ...
	 * |x| < pi/2
	 *
	 */
	function sine(Ctor, x) {
	  var k,
	    len = x.d.length;

	  if (len < 3) return taylorSeries(Ctor, 2, x, x);

	  // Argument reduction: sin(5x) = 16*sin^5(x) - 20*sin^3(x) + 5*sin(x)
	  // i.e. sin(x) = 16*sin^5(x/5) - 20*sin^3(x/5) + 5*sin(x/5)
	  // and  sin(x) = sin(x/5)(5 + sin^2(x/5)(16sin^2(x/5) - 20))

	  // Estimate the optimum number of times to use the argument reduction.
	  k = 1.4 * Math.sqrt(len);
	  k = k > 16 ? 16 : k | 0;

	  x = x.times(1 / tinyPow(5, k));
	  x = taylorSeries(Ctor, 2, x, x);

	  // Reverse argument reduction
	  var sin2_x,
	    d5 = new Ctor(5),
	    d16 = new Ctor(16),
	    d20 = new Ctor(20);
	  for (; k--;) {
	    sin2_x = x.times(x);
	    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
	  }

	  return x;
	}


	// Calculate Taylor series for `cos`, `cosh`, `sin` and `sinh`.
	function taylorSeries(Ctor, n, x, y, isHyperbolic) {
	  var j, t, u, x2,
	    pr = Ctor.precision,
	    k = Math.ceil(pr / LOG_BASE);

	  external = false;
	  x2 = x.times(x);
	  u = new Ctor(y);

	  for (;;) {
	    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
	    u = isHyperbolic ? y.plus(t) : y.minus(t);
	    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
	    t = u.plus(y);

	    if (t.d[k] !== void 0) {
	      for (j = k; t.d[j] === u.d[j] && j--;);
	      if (j == -1) break;
	    }

	    j = u;
	    u = y;
	    y = t;
	    t = j;
	  }

	  external = true;
	  t.d.length = k + 1;

	  return t;
	}


	// Exponent e must be positive and non-zero.
	function tinyPow(b, e) {
	  var n = b;
	  while (--e) n *= b;
	  return n;
	}


	// Return the absolute value of `x` reduced to less than or equal to half pi.
	function toLessThanHalfPi(Ctor, x) {
	  var t,
	    isNeg = x.s < 0,
	    pi = getPi(Ctor, Ctor.precision, 1),
	    halfPi = pi.times(0.5);

	  x = x.abs();

	  if (x.lte(halfPi)) {
	    quadrant = isNeg ? 4 : 1;
	    return x;
	  }

	  t = x.divToInt(pi);

	  if (t.isZero()) {
	    quadrant = isNeg ? 3 : 2;
	  } else {
	    x = x.minus(t.times(pi));

	    // 0 <= x < pi
	    if (x.lte(halfPi)) {
	      quadrant = isOdd(t) ? (isNeg ? 2 : 3) : (isNeg ? 4 : 1);
	      return x;
	    }

	    quadrant = isOdd(t) ? (isNeg ? 1 : 4) : (isNeg ? 3 : 2);
	  }

	  return x.minus(pi).abs();
	}


	/*
	 * Return the value of Decimal `x` as a string in base `baseOut`.
	 *
	 * If the optional `sd` argument is present include a binary exponent suffix.
	 */
	function toStringBinary(x, baseOut, sd, rm) {
	  var base, e, i, k, len, roundUp, str, xd, y,
	    Ctor = x.constructor,
	    isExp = sd !== void 0;

	  if (isExp) {
	    checkInt32(sd, 1, MAX_DIGITS);
	    if (rm === void 0) rm = Ctor.rounding;
	    else checkInt32(rm, 0, 8);
	  } else {
	    sd = Ctor.precision;
	    rm = Ctor.rounding;
	  }

	  if (!x.isFinite()) {
	    str = nonFiniteToString(x);
	  } else {
	    str = finiteToString(x);
	    i = str.indexOf('.');

	    // Use exponential notation according to `toExpPos` and `toExpNeg`? No, but if required:
	    // maxBinaryExponent = floor((decimalExponent + 1) * log[2](10))
	    // minBinaryExponent = floor(decimalExponent * log[2](10))
	    // log[2](10) = 3.321928094887362347870319429489390175864

	    if (isExp) {
	      base = 2;
	      if (baseOut == 16) {
	        sd = sd * 4 - 3;
	      } else if (baseOut == 8) {
	        sd = sd * 3 - 2;
	      }
	    } else {
	      base = baseOut;
	    }

	    // Convert the number as an integer then divide the result by its base raised to a power such
	    // that the fraction part will be restored.

	    // Non-integer.
	    if (i >= 0) {
	      str = str.replace('.', '');
	      y = new Ctor(1);
	      y.e = str.length - i;
	      y.d = convertBase(finiteToString(y), 10, base);
	      y.e = y.d.length;
	    }

	    xd = convertBase(str, 10, base);
	    e = len = xd.length;

	    // Remove trailing zeros.
	    for (; xd[--len] == 0;) xd.pop();

	    if (!xd[0]) {
	      str = isExp ? '0p+0' : '0';
	    } else {
	      if (i < 0) {
	        e--;
	      } else {
	        x = new Ctor(x);
	        x.d = xd;
	        x.e = e;
	        x = divide(x, y, sd, rm, 0, base);
	        xd = x.d;
	        e = x.e;
	        roundUp = inexact;
	      }

	      // The rounding digit, i.e. the digit after the digit that may be rounded up.
	      i = xd[sd];
	      k = base / 2;
	      roundUp = roundUp || xd[sd + 1] !== void 0;

	      roundUp = rm < 4
	        ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2))
	        : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 ||
	          rm === (x.s < 0 ? 8 : 7));

	      xd.length = sd;

	      if (roundUp) {

	        // Rounding up may mean the previous digit has to be rounded up and so on.
	        for (; ++xd[--sd] > base - 1;) {
	          xd[sd] = 0;
	          if (!sd) {
	            ++e;
	            xd.unshift(1);
	          }
	        }
	      }

	      // Determine trailing zeros.
	      for (len = xd.length; !xd[len - 1]; --len);

	      // E.g. [4, 11, 15] becomes 4bf.
	      for (i = 0, str = ''; i < len; i++) str += NUMERALS.charAt(xd[i]);

	      // Add binary exponent suffix?
	      if (isExp) {
	        if (len > 1) {
	          if (baseOut == 16 || baseOut == 8) {
	            i = baseOut == 16 ? 4 : 3;
	            for (--len; len % i; len++) str += '0';
	            xd = convertBase(str, base, baseOut);
	            for (len = xd.length; !xd[len - 1]; --len);

	            // xd[0] will always be be 1
	            for (i = 1, str = '1.'; i < len; i++) str += NUMERALS.charAt(xd[i]);
	          } else {
	            str = str.charAt(0) + '.' + str.slice(1);
	          }
	        }

	        str =  str + (e < 0 ? 'p' : 'p+') + e;
	      } else if (e < 0) {
	        for (; ++e;) str = '0' + str;
	        str = '0.' + str;
	      } else {
	        if (++e > len) for (e -= len; e-- ;) str += '0';
	        else if (e < len) str = str.slice(0, e) + '.' + str.slice(e);
	      }
	    }

	    str = (baseOut == 16 ? '0x' : baseOut == 2 ? '0b' : baseOut == 8 ? '0o' : '') + str;
	  }

	  return x.s < 0 ? '-' + str : str;
	}


	// Does not strip trailing zeros.
	function truncate(arr, len) {
	  if (arr.length > len) {
	    arr.length = len;
	    return true;
	  }
	}


	// Decimal methods


	/*
	 *  abs
	 *  acos
	 *  acosh
	 *  add
	 *  asin
	 *  asinh
	 *  atan
	 *  atanh
	 *  atan2
	 *  cbrt
	 *  ceil
	 *  clone
	 *  config
	 *  cos
	 *  cosh
	 *  div
	 *  exp
	 *  floor
	 *  hypot
	 *  ln
	 *  log
	 *  log2
	 *  log10
	 *  max
	 *  min
	 *  mod
	 *  mul
	 *  pow
	 *  random
	 *  round
	 *  set
	 *  sign
	 *  sin
	 *  sinh
	 *  sqrt
	 *  sub
	 *  tan
	 *  tanh
	 *  trunc
	 */


	/*
	 * Return a new Decimal whose value is the absolute value of `x`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function abs$4(x) {
	  return new this(x).abs();
	}


	/*
	 * Return a new Decimal whose value is the arccosine in radians of `x`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function acos(x) {
	  return new this(x).acos();
	}


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic cosine of `x`, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function acosh(x) {
	  return new this(x).acosh();
	}


	/*
	 * Return a new Decimal whose value is the sum of `x` and `y`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 * y {number|string|Decimal}
	 *
	 */
	function add(x, y) {
	  return new this(x).plus(y);
	}


	/*
	 * Return a new Decimal whose value is the arcsine in radians of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function asin(x) {
	  return new this(x).asin();
	}


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic sine of `x`, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function asinh$1(x) {
	  return new this(x).asinh();
	}


	/*
	 * Return a new Decimal whose value is the arctangent in radians of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function atan(x) {
	  return new this(x).atan();
	}


	/*
	 * Return a new Decimal whose value is the inverse of the hyperbolic tangent of `x`, rounded to
	 * `precision` significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function atanh(x) {
	  return new this(x).atanh();
	}


	/*
	 * Return a new Decimal whose value is the arctangent in radians of `y/x` in the range -pi to pi
	 * (inclusive), rounded to `precision` significant digits using rounding mode `rounding`.
	 *
	 * Domain: [-Infinity, Infinity]
	 * Range: [-pi, pi]
	 *
	 * y {number|string|Decimal} The y-coordinate.
	 * x {number|string|Decimal} The x-coordinate.
	 *
	 * atan2(±0, -0)               = ±pi
	 * atan2(±0, +0)               = ±0
	 * atan2(±0, -x)               = ±pi for x > 0
	 * atan2(±0, x)                = ±0 for x > 0
	 * atan2(-y, ±0)               = -pi/2 for y > 0
	 * atan2(y, ±0)                = pi/2 for y > 0
	 * atan2(±y, -Infinity)        = ±pi for finite y > 0
	 * atan2(±y, +Infinity)        = ±0 for finite y > 0
	 * atan2(±Infinity, x)         = ±pi/2 for finite x
	 * atan2(±Infinity, -Infinity) = ±3*pi/4
	 * atan2(±Infinity, +Infinity) = ±pi/4
	 * atan2(NaN, x) = NaN
	 * atan2(y, NaN) = NaN
	 *
	 */
	function atan2(y, x) {
	  y = new this(y);
	  x = new this(x);
	  var r,
	    pr = this.precision,
	    rm = this.rounding,
	    wpr = pr + 4;

	  // Either NaN
	  if (!y.s || !x.s) {
	    r = new this(NaN);

	  // Both ±Infinity
	  } else if (!y.d && !x.d) {
	    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
	    r.s = y.s;

	  // x is ±Infinity or y is ±0
	  } else if (!x.d || y.isZero()) {
	    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
	    r.s = y.s;

	  // y is ±Infinity or x is ±0
	  } else if (!y.d || x.isZero()) {
	    r = getPi(this, wpr, 1).times(0.5);
	    r.s = y.s;

	  // Both non-zero and finite
	  } else if (x.s < 0) {
	    this.precision = wpr;
	    this.rounding = 1;
	    r = this.atan(divide(y, x, wpr, 1));
	    x = getPi(this, wpr, 1);
	    this.precision = pr;
	    this.rounding = rm;
	    r = y.s < 0 ? r.minus(x) : r.plus(x);
	  } else {
	    r = this.atan(divide(y, x, wpr, 1));
	  }

	  return r;
	}


	/*
	 * Return a new Decimal whose value is the cube root of `x`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function cbrt(x) {
	  return new this(x).cbrt();
	}


	/*
	 * Return a new Decimal whose value is `x` rounded to an integer using `ROUND_CEIL`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function ceil$1(x) {
	  return finalise(x = new this(x), x.e + 1, 2);
	}


	/*
	 * Configure global settings for a Decimal constructor.
	 *
	 * `obj` is an object with one or more of the following properties,
	 *
	 *   precision  {number}
	 *   rounding   {number}
	 *   toExpNeg   {number}
	 *   toExpPos   {number}
	 *   maxE       {number}
	 *   minE       {number}
	 *   modulo     {number}
	 *   crypto     {boolean|number}
	 *   defaults   {true}
	 *
	 * E.g. Decimal.config({ precision: 20, rounding: 4 })
	 *
	 */
	function config$1(obj) {
	  if (!obj || typeof obj !== 'object') throw Error(decimalError + 'Object expected');
	  var i, p, v,
	    useDefaults = obj.defaults === true,
	    ps = [
	      'precision', 1, MAX_DIGITS,
	      'rounding', 0, 8,
	      'toExpNeg', -EXP_LIMIT, 0,
	      'toExpPos', 0, EXP_LIMIT,
	      'maxE', 0, EXP_LIMIT,
	      'minE', -EXP_LIMIT, 0,
	      'modulo', 0, 9
	    ];

	  for (i = 0; i < ps.length; i += 3) {
	    if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
	    if ((v = obj[p]) !== void 0) {
	      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
	      else throw Error(invalidArgument + p + ': ' + v);
	    }
	  }

	  if (p = 'crypto', useDefaults) this[p] = DEFAULTS[p];
	  if ((v = obj[p]) !== void 0) {
	    if (v === true || v === false || v === 0 || v === 1) {
	      if (v) {
	        if (typeof crypto != 'undefined' && crypto &&
	          (crypto.getRandomValues || crypto.randomBytes)) {
	          this[p] = true;
	        } else {
	          throw Error(cryptoUnavailable);
	        }
	      } else {
	        this[p] = false;
	      }
	    } else {
	      throw Error(invalidArgument + p + ': ' + v);
	    }
	  }

	  return this;
	}


	/*
	 * Return a new Decimal whose value is the cosine of `x`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function cos(x) {
	  return new this(x).cos();
	}


	/*
	 * Return a new Decimal whose value is the hyperbolic cosine of `x`, rounded to precision
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function cosh(x) {
	  return new this(x).cosh();
	}


	/*
	 * Create and return a Decimal constructor with the same configuration properties as this Decimal
	 * constructor.
	 *
	 */
	function clone$1(obj) {
	  var i, p, ps;

	  /*
	   * The Decimal constructor and exported function.
	   * Return a new Decimal instance.
	   *
	   * v {number|string|Decimal} A numeric value.
	   *
	   */
	  function Decimal(v) {
	    var e, i, t,
	      x = this;

	    // Decimal called without new.
	    if (!(x instanceof Decimal)) return new Decimal(v);

	    // Retain a reference to this Decimal constructor, and shadow Decimal.prototype.constructor
	    // which points to Object.
	    x.constructor = Decimal;

	    // Duplicate.
	    if (v instanceof Decimal) {
	      x.s = v.s;

	      if (external) {
	        if (!v.d || v.e > Decimal.maxE) {

	          // Infinity.
	          x.e = NaN;
	          x.d = null;
	        } else if (v.e < Decimal.minE) {

	          // Zero.
	          x.e = 0;
	          x.d = [0];
	        } else {
	          x.e = v.e;
	          x.d = v.d.slice();
	        }
	      } else {
	        x.e = v.e;
	        x.d = v.d ? v.d.slice() : v.d;
	      }

	      return;
	    }

	    t = typeof v;

	    if (t === 'number') {
	      if (v === 0) {
	        x.s = 1 / v < 0 ? -1 : 1;
	        x.e = 0;
	        x.d = [0];
	        return;
	      }

	      if (v < 0) {
	        v = -v;
	        x.s = -1;
	      } else {
	        x.s = 1;
	      }

	      // Fast path for small integers.
	      if (v === ~~v && v < 1e7) {
	        for (e = 0, i = v; i >= 10; i /= 10) e++;

	        if (external) {
	          if (e > Decimal.maxE) {
	            x.e = NaN;
	            x.d = null;
	          } else if (e < Decimal.minE) {
	            x.e = 0;
	            x.d = [0];
	          } else {
	            x.e = e;
	            x.d = [v];
	          }
	        } else {
	          x.e = e;
	          x.d = [v];
	        }

	        return;

	      // Infinity, NaN.
	      } else if (v * 0 !== 0) {
	        if (!v) x.s = NaN;
	        x.e = NaN;
	        x.d = null;
	        return;
	      }

	      return parseDecimal(x, v.toString());

	    } else if (t !== 'string') {
	      throw Error(invalidArgument + v);
	    }

	    // Minus sign?
	    if ((i = v.charCodeAt(0)) === 45) {
	      v = v.slice(1);
	      x.s = -1;
	    } else {
	      // Plus sign?
	      if (i === 43) v = v.slice(1);
	      x.s = 1;
	    }

	    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
	  }

	  Decimal.prototype = P;

	  Decimal.ROUND_UP = 0;
	  Decimal.ROUND_DOWN = 1;
	  Decimal.ROUND_CEIL = 2;
	  Decimal.ROUND_FLOOR = 3;
	  Decimal.ROUND_HALF_UP = 4;
	  Decimal.ROUND_HALF_DOWN = 5;
	  Decimal.ROUND_HALF_EVEN = 6;
	  Decimal.ROUND_HALF_CEIL = 7;
	  Decimal.ROUND_HALF_FLOOR = 8;
	  Decimal.EUCLID = 9;

	  Decimal.config = Decimal.set = config$1;
	  Decimal.clone = clone$1;
	  Decimal.isDecimal = isDecimalInstance;

	  Decimal.abs = abs$4;
	  Decimal.acos = acos;
	  Decimal.acosh = acosh;        // ES6
	  Decimal.add = add;
	  Decimal.asin = asin;
	  Decimal.asinh = asinh$1;        // ES6
	  Decimal.atan = atan;
	  Decimal.atanh = atanh;        // ES6
	  Decimal.atan2 = atan2;
	  Decimal.cbrt = cbrt;          // ES6
	  Decimal.ceil = ceil$1;
	  Decimal.cos = cos;
	  Decimal.cosh = cosh;          // ES6
	  Decimal.div = div;
	  Decimal.exp = exp$3;
	  Decimal.floor = floor$3;
	  Decimal.hypot = hypot;        // ES6
	  Decimal.ln = ln;
	  Decimal.log = log$5;
	  Decimal.log10 = log10;        // ES6
	  Decimal.log2 = log2;          // ES6
	  Decimal.max = max$1;
	  Decimal.min = min$4;
	  Decimal.mod = mod;
	  Decimal.mul = mul;
	  Decimal.pow = pow$2;
	  Decimal.random = random;
	  Decimal.round = round;
	  Decimal.sign = sign;          // ES6
	  Decimal.sin = sin;
	  Decimal.sinh = sinh;          // ES6
	  Decimal.sqrt = sqrt$2;
	  Decimal.sub = sub;
	  Decimal.tan = tan;
	  Decimal.tanh = tanh;          // ES6
	  Decimal.trunc = trunc;        // ES6

	  if (obj === void 0) obj = {};
	  if (obj) {
	    if (obj.defaults !== true) {
	      ps = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'];
	      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
	    }
	  }

	  Decimal.config(obj);

	  return Decimal;
	}


	/*
	 * Return a new Decimal whose value is `x` divided by `y`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 * y {number|string|Decimal}
	 *
	 */
	function div(x, y) {
	  return new this(x).div(y);
	}


	/*
	 * Return a new Decimal whose value is the natural exponential of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} The power to which to raise the base of the natural log.
	 *
	 */
	function exp$3(x) {
	  return new this(x).exp();
	}


	/*
	 * Return a new Decimal whose value is `x` round to an integer using `ROUND_FLOOR`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function floor$3(x) {
	  return finalise(x = new this(x), x.e + 1, 3);
	}


	/*
	 * Return a new Decimal whose value is the square root of the sum of the squares of the arguments,
	 * rounded to `precision` significant digits using rounding mode `rounding`.
	 *
	 * hypot(a, b, ...) = sqrt(a^2 + b^2 + ...)
	 *
	 * arguments {number|string|Decimal}
	 *
	 */
	function hypot() {
	  var i, n,
	    t = new this(0);

	  external = false;

	  for (i = 0; i < arguments.length;) {
	    n = new this(arguments[i++]);
	    if (!n.d) {
	      if (n.s) {
	        external = true;
	        return new this(1 / 0);
	      }
	      t = n;
	    } else if (t.d) {
	      t = t.plus(n.times(n));
	    }
	  }

	  external = true;

	  return t.sqrt();
	}


	/*
	 * Return true if object is a Decimal instance (where Decimal is any Decimal constructor),
	 * otherwise return false.
	 *
	 */
	function isDecimalInstance(obj) {
	  return obj instanceof Decimal || obj && obj.name === '[object Decimal]' || false;
	}


	/*
	 * Return a new Decimal whose value is the natural logarithm of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function ln(x) {
	  return new this(x).ln();
	}


	/*
	 * Return a new Decimal whose value is the log of `x` to the base `y`, or to base 10 if no base
	 * is specified, rounded to `precision` significant digits using rounding mode `rounding`.
	 *
	 * log[y](x)
	 *
	 * x {number|string|Decimal} The argument of the logarithm.
	 * y {number|string|Decimal} The base of the logarithm.
	 *
	 */
	function log$5(x, y) {
	  return new this(x).log(y);
	}


	/*
	 * Return a new Decimal whose value is the base 2 logarithm of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function log2(x) {
	  return new this(x).log(2);
	}


	/*
	 * Return a new Decimal whose value is the base 10 logarithm of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function log10(x) {
	  return new this(x).log(10);
	}


	/*
	 * Return a new Decimal whose value is the maximum of the arguments.
	 *
	 * arguments {number|string|Decimal}
	 *
	 */
	function max$1() {
	  return maxOrMin(this, arguments, 'lt');
	}


	/*
	 * Return a new Decimal whose value is the minimum of the arguments.
	 *
	 * arguments {number|string|Decimal}
	 *
	 */
	function min$4() {
	  return maxOrMin(this, arguments, 'gt');
	}


	/*
	 * Return a new Decimal whose value is `x` modulo `y`, rounded to `precision` significant digits
	 * using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 * y {number|string|Decimal}
	 *
	 */
	function mod(x, y) {
	  return new this(x).mod(y);
	}


	/*
	 * Return a new Decimal whose value is `x` multiplied by `y`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 * y {number|string|Decimal}
	 *
	 */
	function mul(x, y) {
	  return new this(x).mul(y);
	}


	/*
	 * Return a new Decimal whose value is `x` raised to the power `y`, rounded to precision
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} The base.
	 * y {number|string|Decimal} The exponent.
	 *
	 */
	function pow$2(x, y) {
	  return new this(x).pow(y);
	}


	/*
	 * Returns a new Decimal with a random value equal to or greater than 0 and less than 1, and with
	 * `sd`, or `Decimal.precision` if `sd` is omitted, significant digits (or less if trailing zeros
	 * are produced).
	 *
	 * [sd] {number} Significant digits. Integer, 0 to MAX_DIGITS inclusive.
	 *
	 */
	function random(sd) {
	  var d, e, k, n,
	    i = 0,
	    r = new this(1),
	    rd = [];

	  if (sd === void 0) sd = this.precision;
	  else checkInt32(sd, 1, MAX_DIGITS);

	  k = Math.ceil(sd / LOG_BASE);

	  if (!this.crypto) {
	    for (; i < k;) rd[i++] = Math.random() * 1e7 | 0;

	  // Browsers supporting crypto.getRandomValues.
	  } else if (crypto.getRandomValues) {
	    d = crypto.getRandomValues(new Uint32Array(k));

	    for (; i < k;) {
	      n = d[i];

	      // 0 <= n < 4294967296
	      // Probability n >= 4.29e9, is 4967296 / 4294967296 = 0.00116 (1 in 865).
	      if (n >= 4.29e9) {
	        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
	      } else {

	        // 0 <= n <= 4289999999
	        // 0 <= (n % 1e7) <= 9999999
	        rd[i++] = n % 1e7;
	      }
	    }

	  // Node.js supporting crypto.randomBytes.
	  } else if (crypto.randomBytes) {

	    // buffer
	    d = crypto.randomBytes(k *= 4);

	    for (; i < k;) {

	      // 0 <= n < 2147483648
	      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 0x7f) << 24);

	      // Probability n >= 2.14e9, is 7483648 / 2147483648 = 0.0035 (1 in 286).
	      if (n >= 2.14e9) {
	        crypto.randomBytes(4).copy(d, i);
	      } else {

	        // 0 <= n <= 2139999999
	        // 0 <= (n % 1e7) <= 9999999
	        rd.push(n % 1e7);
	        i += 4;
	      }
	    }

	    i = k / 4;
	  } else {
	    throw Error(cryptoUnavailable);
	  }

	  k = rd[--i];
	  sd %= LOG_BASE;

	  // Convert trailing digits to zeros according to sd.
	  if (k && sd) {
	    n = mathpow(10, LOG_BASE - sd);
	    rd[i] = (k / n | 0) * n;
	  }

	  // Remove trailing words which are zero.
	  for (; rd[i] === 0; i--) rd.pop();

	  // Zero?
	  if (i < 0) {
	    e = 0;
	    rd = [0];
	  } else {
	    e = -1;

	    // Remove leading words which are zero and adjust exponent accordingly.
	    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();

	    // Count the digits of the first word of rd to determine leading zeros.
	    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;

	    // Adjust the exponent for leading zeros of the first word of rd.
	    if (k < LOG_BASE) e -= LOG_BASE - k;
	  }

	  r.e = e;
	  r.d = rd;

	  return r;
	}


	/*
	 * Return a new Decimal whose value is `x` rounded to an integer using rounding mode `rounding`.
	 *
	 * To emulate `Math.round`, set rounding to 7 (ROUND_HALF_CEIL).
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function round(x) {
	  return finalise(x = new this(x), x.e + 1, this.rounding);
	}


	/*
	 * Return
	 *   1    if x > 0,
	 *  -1    if x < 0,
	 *   0    if x is 0,
	 *  -0    if x is -0,
	 *   NaN  otherwise
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function sign(x) {
	  x = new this(x);
	  return x.d ? (x.d[0] ? x.s : 0 * x.s) : x.s || NaN;
	}


	/*
	 * Return a new Decimal whose value is the sine of `x`, rounded to `precision` significant digits
	 * using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function sin(x) {
	  return new this(x).sin();
	}


	/*
	 * Return a new Decimal whose value is the hyperbolic sine of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function sinh(x) {
	  return new this(x).sinh();
	}


	/*
	 * Return a new Decimal whose value is the square root of `x`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function sqrt$2(x) {
	  return new this(x).sqrt();
	}


	/*
	 * Return a new Decimal whose value is `x` minus `y`, rounded to `precision` significant digits
	 * using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal}
	 * y {number|string|Decimal}
	 *
	 */
	function sub(x, y) {
	  return new this(x).sub(y);
	}


	/*
	 * Return a new Decimal whose value is the tangent of `x`, rounded to `precision` significant
	 * digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function tan(x) {
	  return new this(x).tan();
	}


	/*
	 * Return a new Decimal whose value is the hyperbolic tangent of `x`, rounded to `precision`
	 * significant digits using rounding mode `rounding`.
	 *
	 * x {number|string|Decimal} A value in radians.
	 *
	 */
	function tanh(x) {
	  return new this(x).tanh();
	}


	/*
	 * Return a new Decimal whose value is `x` truncated to an integer.
	 *
	 * x {number|string|Decimal}
	 *
	 */
	function trunc(x) {
	  return finalise(x = new this(x), x.e + 1, 1);
	}


	P[Symbol.for('nodejs.util.inspect.custom')] = P.toString;
	P[Symbol.toStringTag] = 'Decimal';

	// Create and configure initial Decimal constructor.
	var Decimal = clone$1(DEFAULTS);

	// Create the internal constants from their string values.
	LN10 = new Decimal(LN10);
	PI = new Decimal(PI);

	var name = 'BigNumber';
	var dependencies$1 = ['?on', 'config'];
	var createBigNumberClass = /* #__PURE__ */factory(name, dependencies$1, function (_ref) {
	  var on = _ref.on,
	      config = _ref.config;
	  var BigNumber = Decimal.clone({
	    precision: config.precision
	  });
	  /**
	   * Attach type information
	   */

	  BigNumber.prototype.type = 'BigNumber';
	  BigNumber.prototype.isBigNumber = true;
	  /**
	   * Get a JSON representation of a BigNumber containing
	   * type information
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "BigNumber", "value": "0.2"}`
	   */

	  BigNumber.prototype.toJSON = function () {
	    return {
	      mathjs: 'BigNumber',
	      value: this.toString()
	    };
	  };
	  /**
	   * Instantiate a BigNumber from a JSON object
	   * @param {Object} json  a JSON object structured as:
	   *                       `{"mathjs": "BigNumber", "value": "0.2"}`
	   * @return {BigNumber}
	   */


	  BigNumber.fromJSON = function (json) {
	    return new BigNumber(json.value);
	  };

	  if (on) {
	    // listen for changed in the configuration, automatically apply changed precision
	    on('config', function (curr, prev) {
	      if (curr.precision !== prev.precision) {
	        BigNumber.config({
	          precision: curr.precision
	        });
	      }
	    });
	  }

	  return BigNumber;
	}, {
	  isClass: true
	});

	var complex = createCommonjsModule(function (module, exports) {
	/**
	 * @license Complex.js v2.0.11 11/02/2016
	 *
	 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/

	/**
	 *
	 * This class allows the manipulation of complex numbers.
	 * You can pass a complex number in different formats. Either as object, double, string or two integer parameters.
	 *
	 * Object form
	 * { re: <real>, im: <imaginary> }
	 * { arg: <angle>, abs: <radius> }
	 * { phi: <angle>, r: <radius> }
	 *
	 * Array / Vector form
	 * [ real, imaginary ]
	 *
	 * Double form
	 * 99.3 - Single double value
	 *
	 * String form
	 * '23.1337' - Simple real number
	 * '15+3i' - a simple complex number
	 * '3-i' - a simple complex number
	 *
	 * Example:
	 *
	 * var c = new Complex('99.3+8i');
	 * c.mul({r: 3, i: 9}).div(4.9).sub(3, 2);
	 *
	 */

	(function(root) {

	  var cosh = function(x) {
	    return (Math.exp(x) + Math.exp(-x)) * 0.5;
	  };

	  var sinh = function(x) {
	    return (Math.exp(x) - Math.exp(-x)) * 0.5;
	  };

	  /**
	   * Calculates cos(x) - 1 using Taylor series if x is small.
	   *
	   * @param {number} x
	   * @returns {number} cos(x) - 1
	   */

	  var cosm1 = function(x) {
	    var limit = Math.PI/4;
	    if (x < -limit || x > limit) {
	      return (Math.cos(x) - 1.0);
	    }

	    var xx = x * x;
	    return xx *
	      (-0.5 + xx *
	        (1/24 + xx *
	          (-1/720 + xx *
	            (1/40320 + xx *
	              (-1/3628800 + xx *
	                (1/4790014600 + xx *
	                  (-1/87178291200 + xx *
	                    (1/20922789888000)
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	  };

	  var hypot = function(x, y) {

	    var a = Math.abs(x);
	    var b = Math.abs(y);

	    if (a < 3000 && b < 3000) {
	      return Math.sqrt(a * a + b * b);
	    }

	    if (a < b) {
	      a = b;
	      b = x / y;
	    } else {
	      b = y / x;
	    }
	    return a * Math.sqrt(1 + b * b);
	  };

	  var parser_exit = function() {
	    throw SyntaxError('Invalid Param');
	  };

	  /**
	   * Calculates log(sqrt(a^2+b^2)) in a way to avoid overflows
	   *
	   * @param {number} a
	   * @param {number} b
	   * @returns {number}
	   */
	  function logHypot(a, b) {

	    var _a = Math.abs(a);
	    var _b = Math.abs(b);

	    if (a === 0) {
	      return Math.log(_b);
	    }

	    if (b === 0) {
	      return Math.log(_a);
	    }

	    if (_a < 3000 && _b < 3000) {
	      return Math.log(a * a + b * b) * 0.5;
	    }

	    /* I got 4 ideas to compute this property without overflow:
	     *
	     * Testing 1000000 times with random samples for a,b ∈ [1, 1000000000] against a big decimal library to get an error estimate
	     *
	     * 1. Only eliminate the square root: (OVERALL ERROR: 3.9122483030951116e-11)

	     Math.log(a * a + b * b) / 2

	     *
	     *
	     * 2. Try to use the non-overflowing pythagoras: (OVERALL ERROR: 8.889760039210159e-10)

	     var fn = function(a, b) {
	     a = Math.abs(a);
	     b = Math.abs(b);
	     var t = Math.min(a, b);
	     a = Math.max(a, b);
	     t = t / a;

	     return Math.log(a) + Math.log(1 + t * t) / 2;
	     };

	     * 3. Abuse the identity cos(atan(y/x) = x / sqrt(x^2+y^2): (OVERALL ERROR: 3.4780178737037204e-10)

	     Math.log(a / Math.cos(Math.atan2(b, a)))

	     * 4. Use 3. and apply log rules: (OVERALL ERROR: 1.2014087502620896e-9)

	     Math.log(a) - Math.log(Math.cos(Math.atan2(b, a)))

	     */

	    return Math.log(a / Math.cos(Math.atan2(b, a)));
	  }

	  var parse = function(a, b) {

	    var z = {'re': 0, 'im': 0};

	    if (a === undefined || a === null) {
	      z['re'] =
	              z['im'] = 0;
	    } else if (b !== undefined) {
	      z['re'] = a;
	      z['im'] = b;
	    } else
	      switch (typeof a) {

	        case 'object':

	          if ('im' in a && 're' in a) {
	            z['re'] = a['re'];
	            z['im'] = a['im'];
	          } else if ('abs' in a && 'arg' in a) {
	            if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
	              return Complex['INFINITY'];
	            }
	            z['re'] = a['abs'] * Math.cos(a['arg']);
	            z['im'] = a['abs'] * Math.sin(a['arg']);
	          } else if ('r' in a && 'phi' in a) {
	            if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
	              return Complex['INFINITY'];
	            }
	            z['re'] = a['r'] * Math.cos(a['phi']);
	            z['im'] = a['r'] * Math.sin(a['phi']);
	          } else if (a.length === 2) { // Quick array check
	            z['re'] = a[0];
	            z['im'] = a[1];
	          } else {
	            parser_exit();
	          }
	          break;

	        case 'string':

	          z['im'] = /* void */
	                  z['re'] = 0;

	          var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
	          var plus = 1;
	          var minus = 0;

	          if (tokens === null) {
	            parser_exit();
	          }

	          for (var i = 0; i < tokens.length; i++) {

	            var c = tokens[i];

	            if (c === ' ' || c === '\t' || c === '\n') ; else if (c === '+') {
	              plus++;
	            } else if (c === '-') {
	              minus++;
	            } else if (c === 'i' || c === 'I') {

	              if (plus + minus === 0) {
	                parser_exit();
	              }

	              if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
	                z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
	                i++;
	              } else {
	                z['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
	              }
	              plus = minus = 0;

	            } else {

	              if (plus + minus === 0 || isNaN(c)) {
	                parser_exit();
	              }

	              if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
	                z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
	                i++;
	              } else {
	                z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
	              }
	              plus = minus = 0;
	            }
	          }

	          // Still something on the stack
	          if (plus + minus > 0) {
	            parser_exit();
	          }
	          break;

	        case 'number':
	          z['im'] = 0;
	          z['re'] = a;
	          break;

	        default:
	          parser_exit();
	      }

	    return z;
	  };

	  /**
	   * @constructor
	   * @returns {Complex}
	   */
	  function Complex(a, b) {

	    if (!(this instanceof Complex)) {
	      return new Complex(a, b);
	    }

	    var z = parse(a, b);

	    this['re'] = z['re'];
	    this['im'] = z['im'];
	  }

	  Complex.prototype = {

	    're': 0,
	    'im': 0,

	    /**
	     * Calculates the sign of a complex number, which is a normalized complex
	     *
	     * @returns {Complex}
	     */
	    'sign': function() {

	      var abs = this['abs']();

	      return new Complex(
	              this['re'] / abs,
	              this['im'] / abs);
	    },

	    /**
	     * Adds two complex numbers
	     *
	     * @returns {Complex}
	     */
	    'add': function(a, b) {

	      var z = new Complex(a, b);

	      // Infinity + Infinity = NaN
	      if (this['isInfinite']() && z['isInfinite']()) {
	        return Complex['NAN'];
	      }

	      // Infinity + z = Infinity { where z != Infinity }
	      if (this['isInfinite']() || z['isInfinite']()) {
	        return Complex['INFINITY'];
	      }

	      return new Complex(
	              this['re'] + z['re'],
	              this['im'] + z['im']);
	    },

	    /**
	     * Subtracts two complex numbers
	     *
	     * @returns {Complex}
	     */
	    'sub': function(a, b) {

	      var z = new Complex(a, b);

	      // Infinity - Infinity = NaN
	      if (this['isInfinite']() && z['isInfinite']()) {
	        return Complex['NAN'];
	      }

	      // Infinity - z = Infinity { where z != Infinity }
	      if (this['isInfinite']() || z['isInfinite']()) {
	        return Complex['INFINITY'];
	      }

	      return new Complex(
	              this['re'] - z['re'],
	              this['im'] - z['im']);
	    },

	    /**
	     * Multiplies two complex numbers
	     *
	     * @returns {Complex}
	     */
	    'mul': function(a, b) {

	      var z = new Complex(a, b);

	      // Infinity * 0 = NaN
	      if ((this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())) {
	        return Complex['NAN'];
	      }

	      // Infinity * z = Infinity { where z != 0 }
	      if (this['isInfinite']() || z['isInfinite']()) {
	        return Complex['INFINITY'];
	      }

	      // Short circuit for real values
	      if (z['im'] === 0 && this['im'] === 0) {
	        return new Complex(this['re'] * z['re'], 0);
	      }

	      return new Complex(
	              this['re'] * z['re'] - this['im'] * z['im'],
	              this['re'] * z['im'] + this['im'] * z['re']);
	    },

	    /**
	     * Divides two complex numbers
	     *
	     * @returns {Complex}
	     */
	    'div': function(a, b) {

	      var z = new Complex(a, b);

	      // 0 / 0 = NaN and Infinity / Infinity = NaN
	      if ((this['isZero']() && z['isZero']()) || (this['isInfinite']() && z['isInfinite']())) {
	        return Complex['NAN'];
	      }

	      // Infinity / 0 = Infinity
	      if (this['isInfinite']() || z['isZero']()) {
	        return Complex['INFINITY'];
	      }

	      // 0 / Infinity = 0
	      if (this['isZero']() || z['isInfinite']()) {
	        return Complex['ZERO'];
	      }

	      a = this['re'];
	      b = this['im'];

	      var c = z['re'];
	      var d = z['im'];
	      var t, x;

	      if (0 === d) {
	        // Divisor is real
	        return new Complex(a / c, b / c);
	      }

	      if (Math.abs(c) < Math.abs(d)) {

	        x = c / d;
	        t = c * x + d;

	        return new Complex(
	                (a * x + b) / t,
	                (b * x - a) / t);

	      } else {

	        x = d / c;
	        t = d * x + c;

	        return new Complex(
	                (a + b * x) / t,
	                (b - a * x) / t);
	      }
	    },

	    /**
	     * Calculate the power of two complex numbers
	     *
	     * @returns {Complex}
	     */
	    'pow': function(a, b) {

	      var z = new Complex(a, b);

	      a = this['re'];
	      b = this['im'];

	      if (z['isZero']()) {
	        return Complex['ONE'];
	      }

	      // If the exponent is real
	      if (z['im'] === 0) {

	        if (b === 0 && a >= 0) {

	          return new Complex(Math.pow(a, z['re']), 0);

	        } else if (a === 0) { // If base is fully imaginary

	          switch ((z['re'] % 4 + 4) % 4) {
	            case 0:
	              return new Complex(Math.pow(b, z['re']), 0);
	            case 1:
	              return new Complex(0, Math.pow(b, z['re']));
	            case 2:
	              return new Complex(-Math.pow(b, z['re']), 0);
	            case 3:
	              return new Complex(0, -Math.pow(b, z['re']));
	          }
	        }
	      }

	      /* I couldn't find a good formula, so here is a derivation and optimization
	       *
	       * z_1^z_2 = (a + bi)^(c + di)
	       *         = exp((c + di) * log(a + bi)
	       *         = pow(a^2 + b^2, (c + di) / 2) * exp(i(c + di)atan2(b, a))
	       * =>...
	       * Re = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * cos(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
	       * Im = (pow(a^2 + b^2, c / 2) * exp(-d * atan2(b, a))) * sin(d * log(a^2 + b^2) / 2 + c * atan2(b, a))
	       *
	       * =>...
	       * Re = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * cos(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
	       * Im = exp(c * log(sqrt(a^2 + b^2)) - d * atan2(b, a)) * sin(d * log(sqrt(a^2 + b^2)) + c * atan2(b, a))
	       *
	       * =>
	       * Re = exp(c * logsq2 - d * arg(z_1)) * cos(d * logsq2 + c * arg(z_1))
	       * Im = exp(c * logsq2 - d * arg(z_1)) * sin(d * logsq2 + c * arg(z_1))
	       *
	       */

	      if (a === 0 && b === 0 && z['re'] > 0 && z['im'] >= 0) {
	        return Complex['ZERO'];
	      }

	      var arg = Math.atan2(b, a);
	      var loh = logHypot(a, b);

	      a = Math.exp(z['re'] * loh - z['im'] * arg);
	      b = z['im'] * loh + z['re'] * arg;
	      return new Complex(
	              a * Math.cos(b),
	              a * Math.sin(b));
	    },

	    /**
	     * Calculate the complex square root
	     *
	     * @returns {Complex}
	     */
	    'sqrt': function() {

	      var a = this['re'];
	      var b = this['im'];
	      var r = this['abs']();

	      var re, im;

	      if (a >= 0) {

	        if (b === 0) {
	          return new Complex(Math.sqrt(a), 0);
	        }

	        re = 0.5 * Math.sqrt(2.0 * (r + a));
	      } else {
	        re = Math.abs(b) / Math.sqrt(2 * (r - a));
	      }

	      if (a <= 0) {
	        im = 0.5 * Math.sqrt(2.0 * (r - a));
	      } else {
	        im = Math.abs(b) / Math.sqrt(2 * (r + a));
	      }

	      return new Complex(re, b < 0 ? -im : im);
	    },

	    /**
	     * Calculate the complex exponent
	     *
	     * @returns {Complex}
	     */
	    'exp': function() {

	      var tmp = Math.exp(this['re']);

	      if (this['im'] === 0) ;
	      return new Complex(
	              tmp * Math.cos(this['im']),
	              tmp * Math.sin(this['im']));
	    },

	    /**
	     * Calculate the complex exponent and subtracts one.
	     *
	     * This may be more accurate than `Complex(x).exp().sub(1)` if
	     * `x` is small.
	     *
	     * @returns {Complex}
	     */
	    'expm1': function() {

	      /**
	       * exp(a + i*b) - 1
	       = exp(a) * (cos(b) + j*sin(b)) - 1
	       = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
	       */

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              Math.expm1(a) * Math.cos(b) + cosm1(b),
	              Math.exp(a) * Math.sin(b));
	    },

	    /**
	     * Calculate the natural log
	     *
	     * @returns {Complex}
	     */
	    'log': function() {

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              logHypot(a, b),
	              Math.atan2(b, a));
	    },

	    /**
	     * Calculate the magnitude of the complex number
	     *
	     * @returns {number}
	     */
	    'abs': function() {

	      return hypot(this['re'], this['im']);
	    },

	    /**
	     * Calculate the angle of the complex number
	     *
	     * @returns {number}
	     */
	    'arg': function() {

	      return Math.atan2(this['im'], this['re']);
	    },

	    /**
	     * Calculate the sine of the complex number
	     *
	     * @returns {Complex}
	     */
	    'sin': function() {

	      // sin(c) = (e^b - e^(-b)) / (2i)

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              Math.sin(a) * cosh(b),
	              Math.cos(a) * sinh(b));
	    },

	    /**
	     * Calculate the cosine
	     *
	     * @returns {Complex}
	     */
	    'cos': function() {

	      // cos(z) = (e^b + e^(-b)) / 2

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              Math.cos(a) * cosh(b),
	              -Math.sin(a) * sinh(b));
	    },

	    /**
	     * Calculate the tangent
	     *
	     * @returns {Complex}
	     */
	    'tan': function() {

	      // tan(c) = (e^(ci) - e^(-ci)) / (i(e^(ci) + e^(-ci)))

	      var a = 2 * this['re'];
	      var b = 2 * this['im'];
	      var d = Math.cos(a) + cosh(b);

	      return new Complex(
	              Math.sin(a) / d,
	              sinh(b) / d);
	    },

	    /**
	     * Calculate the cotangent
	     *
	     * @returns {Complex}
	     */
	    'cot': function() {

	      // cot(c) = i(e^(ci) + e^(-ci)) / (e^(ci) - e^(-ci))

	      var a = 2 * this['re'];
	      var b = 2 * this['im'];
	      var d = Math.cos(a) - cosh(b);

	      return new Complex(
	              -Math.sin(a) / d,
	              sinh(b) / d);
	    },

	    /**
	     * Calculate the secant
	     *
	     * @returns {Complex}
	     */
	    'sec': function() {

	      // sec(c) = 2 / (e^(ci) + e^(-ci))

	      var a = this['re'];
	      var b = this['im'];
	      var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);

	      return new Complex(
	              Math.cos(a) * cosh(b) / d,
	              Math.sin(a) * sinh(b) / d);
	    },

	    /**
	     * Calculate the cosecans
	     *
	     * @returns {Complex}
	     */
	    'csc': function() {

	      // csc(c) = 2i / (e^(ci) - e^(-ci))

	      var a = this['re'];
	      var b = this['im'];
	      var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);

	      return new Complex(
	              Math.sin(a) * cosh(b) / d,
	              -Math.cos(a) * sinh(b) / d);
	    },

	    /**
	     * Calculate the complex arcus sinus
	     *
	     * @returns {Complex}
	     */
	    'asin': function() {

	      // asin(c) = -i * log(ci + sqrt(1 - c^2))

	      var a = this['re'];
	      var b = this['im'];

	      var t1 = new Complex(
	              b * b - a * a + 1,
	              -2 * a * b)['sqrt']();

	      var t2 = new Complex(
	              t1['re'] - b,
	              t1['im'] + a)['log']();

	      return new Complex(t2['im'], -t2['re']);
	    },

	    /**
	     * Calculate the complex arcus cosinus
	     *
	     * @returns {Complex}
	     */
	    'acos': function() {

	      // acos(c) = i * log(c - i * sqrt(1 - c^2))

	      var a = this['re'];
	      var b = this['im'];

	      var t1 = new Complex(
	              b * b - a * a + 1,
	              -2 * a * b)['sqrt']();

	      var t2 = new Complex(
	              t1['re'] - b,
	              t1['im'] + a)['log']();

	      return new Complex(Math.PI / 2 - t2['im'], t2['re']);
	    },

	    /**
	     * Calculate the complex arcus tangent
	     *
	     * @returns {Complex}
	     */
	    'atan': function() {

	      // atan(c) = i / 2 log((i + x) / (i - x))

	      var a = this['re'];
	      var b = this['im'];

	      if (a === 0) {

	        if (b === 1) {
	          return new Complex(0, Infinity);
	        }

	        if (b === -1) {
	          return new Complex(0, -Infinity);
	        }
	      }

	      var d = a * a + (1.0 - b) * (1.0 - b);

	      var t1 = new Complex(
	              (1 - b * b - a * a) / d,
	              -2 * a / d).log();

	      return new Complex(-0.5 * t1['im'], 0.5 * t1['re']);
	    },

	    /**
	     * Calculate the complex arcus cotangent
	     *
	     * @returns {Complex}
	     */
	    'acot': function() {

	      // acot(c) = i / 2 log((c - i) / (c + i))

	      var a = this['re'];
	      var b = this['im'];

	      if (b === 0) {
	        return new Complex(Math.atan2(1, a), 0);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).atan()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).atan();
	    },

	    /**
	     * Calculate the complex arcus secant
	     *
	     * @returns {Complex}
	     */
	    'asec': function() {

	      // asec(c) = -i * log(1 / c + sqrt(1 - i / c^2))

	      var a = this['re'];
	      var b = this['im'];

	      if (a === 0 && b === 0) {
	        return new Complex(0, Infinity);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).acos()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).acos();
	    },

	    /**
	     * Calculate the complex arcus cosecans
	     *
	     * @returns {Complex}
	     */
	    'acsc': function() {

	      // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))

	      var a = this['re'];
	      var b = this['im'];

	      if (a === 0 && b === 0) {
	        return new Complex(Math.PI / 2, Infinity);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).asin()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).asin();
	    },

	    /**
	     * Calculate the complex sinh
	     *
	     * @returns {Complex}
	     */
	    'sinh': function() {

	      // sinh(c) = (e^c - e^-c) / 2

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              sinh(a) * Math.cos(b),
	              cosh(a) * Math.sin(b));
	    },

	    /**
	     * Calculate the complex cosh
	     *
	     * @returns {Complex}
	     */
	    'cosh': function() {

	      // cosh(c) = (e^c + e^-c) / 2

	      var a = this['re'];
	      var b = this['im'];

	      return new Complex(
	              cosh(a) * Math.cos(b),
	              sinh(a) * Math.sin(b));
	    },

	    /**
	     * Calculate the complex tanh
	     *
	     * @returns {Complex}
	     */
	    'tanh': function() {

	      // tanh(c) = (e^c - e^-c) / (e^c + e^-c)

	      var a = 2 * this['re'];
	      var b = 2 * this['im'];
	      var d = cosh(a) + Math.cos(b);

	      return new Complex(
	              sinh(a) / d,
	              Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex coth
	     *
	     * @returns {Complex}
	     */
	    'coth': function() {

	      // coth(c) = (e^c + e^-c) / (e^c - e^-c)

	      var a = 2 * this['re'];
	      var b = 2 * this['im'];
	      var d = cosh(a) - Math.cos(b);

	      return new Complex(
	              sinh(a) / d,
	              -Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex coth
	     *
	     * @returns {Complex}
	     */
	    'csch': function() {

	      // csch(c) = 2 / (e^c - e^-c)

	      var a = this['re'];
	      var b = this['im'];
	      var d = Math.cos(2 * b) - cosh(2 * a);

	      return new Complex(
	              -2 * sinh(a) * Math.cos(b) / d,
	              2 * cosh(a) * Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex sech
	     *
	     * @returns {Complex}
	     */
	    'sech': function() {

	      // sech(c) = 2 / (e^c + e^-c)

	      var a = this['re'];
	      var b = this['im'];
	      var d = Math.cos(2 * b) + cosh(2 * a);

	      return new Complex(
	              2 * cosh(a) * Math.cos(b) / d,
	              -2 * sinh(a) * Math.sin(b) / d);
	    },

	    /**
	     * Calculate the complex asinh
	     *
	     * @returns {Complex}
	     */
	    'asinh': function() {

	      // asinh(c) = log(c + sqrt(c^2 + 1))

	      var tmp = this['im'];
	      this['im'] = -this['re'];
	      this['re'] = tmp;
	      var res = this['asin']();

	      this['re'] = -this['im'];
	      this['im'] = tmp;
	      tmp = res['re'];

	      res['re'] = -res['im'];
	      res['im'] = tmp;
	      return res;
	    },

	    /**
	     * Calculate the complex asinh
	     *
	     * @returns {Complex}
	     */
	    'acosh': function() {

	      // acosh(c) = log(c + sqrt(c^2 - 1))

	      var res = this['acos']();
	      if (res['im'] <= 0) {
	        var tmp = res['re'];
	        res['re'] = -res['im'];
	        res['im'] = tmp;
	      } else {
	        var tmp = res['im'];
	        res['im'] = -res['re'];
	        res['re'] = tmp;
	      }
	      return res;
	    },

	    /**
	     * Calculate the complex atanh
	     *
	     * @returns {Complex}
	     */
	    'atanh': function() {

	      // atanh(c) = log((1+c) / (1-c)) / 2

	      var a = this['re'];
	      var b = this['im'];

	      var noIM = a > 1 && b === 0;
	      var oneMinus = 1 - a;
	      var onePlus = 1 + a;
	      var d = oneMinus * oneMinus + b * b;

	      var x = (d !== 0)
	              ? new Complex(
	                      (onePlus * oneMinus - b * b) / d,
	                      (b * oneMinus + onePlus * b) / d)
	              : new Complex(
	                      (a !== -1) ? (a / 0) : 0,
	                      (b !== 0) ? (b / 0) : 0);

	      var temp = x['re'];
	      x['re'] = logHypot(x['re'], x['im']) / 2;
	      x['im'] = Math.atan2(x['im'], temp) / 2;
	      if (noIM) {
	        x['im'] = -x['im'];
	      }
	      return x;
	    },

	    /**
	     * Calculate the complex acoth
	     *
	     * @returns {Complex}
	     */
	    'acoth': function() {

	      // acoth(c) = log((c+1) / (c-1)) / 2

	      var a = this['re'];
	      var b = this['im'];

	      if (a === 0 && b === 0) {
	        return new Complex(0, Math.PI / 2);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).atanh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).atanh();
	    },

	    /**
	     * Calculate the complex acsch
	     *
	     * @returns {Complex}
	     */
	    'acsch': function() {

	      // acsch(c) = log((1+sqrt(1+c^2))/c)

	      var a = this['re'];
	      var b = this['im'];

	      if (b === 0) {

	        return new Complex(
	                (a !== 0)
	                ? Math.log(a + Math.sqrt(a * a + 1))
	                : Infinity, 0);
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).asinh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).asinh();
	    },

	    /**
	     * Calculate the complex asech
	     *
	     * @returns {Complex}
	     */
	    'asech': function() {

	      // asech(c) = log((1+sqrt(1-c^2))/c)

	      var a = this['re'];
	      var b = this['im'];

	      if (this['isZero']()) {
	        return Complex['INFINITY'];
	      }

	      var d = a * a + b * b;
	      return (d !== 0)
	              ? new Complex(
	                      a / d,
	                      -b / d).acosh()
	              : new Complex(
	                      (a !== 0) ? a / 0 : 0,
	                      (b !== 0) ? -b / 0 : 0).acosh();
	    },

	    /**
	     * Calculate the complex inverse 1/z
	     *
	     * @returns {Complex}
	     */
	    'inverse': function() {

	      // 1 / 0 = Infinity and 1 / Infinity = 0
	      if (this['isZero']()) {
	        return Complex['INFINITY'];
	      }

	      if (this['isInfinite']()) {
	        return Complex['ZERO'];
	      }

	      var a = this['re'];
	      var b = this['im'];

	      var d = a * a + b * b;

	      return new Complex(a / d, -b / d);
	    },

	    /**
	     * Returns the complex conjugate
	     *
	     * @returns {Complex}
	     */
	    'conjugate': function() {

	      return new Complex(this['re'], -this['im']);
	    },

	    /**
	     * Gets the negated complex number
	     *
	     * @returns {Complex}
	     */
	    'neg': function() {

	      return new Complex(-this['re'], -this['im']);
	    },

	    /**
	     * Ceils the actual complex number
	     *
	     * @returns {Complex}
	     */
	    'ceil': function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.ceil(this['re'] * places) / places,
	              Math.ceil(this['im'] * places) / places);
	    },

	    /**
	     * Floors the actual complex number
	     *
	     * @returns {Complex}
	     */
	    'floor': function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.floor(this['re'] * places) / places,
	              Math.floor(this['im'] * places) / places);
	    },

	    /**
	     * Ceils the actual complex number
	     *
	     * @returns {Complex}
	     */
	    'round': function(places) {

	      places = Math.pow(10, places || 0);

	      return new Complex(
	              Math.round(this['re'] * places) / places,
	              Math.round(this['im'] * places) / places);
	    },

	    /**
	     * Compares two complex numbers
	     *
	     * **Note:** new Complex(Infinity).equals(Infinity) === false
	     *
	     * @returns {boolean}
	     */
	    'equals': function(a, b) {

	      var z = new Complex(a, b);

	      return Math.abs(z['re'] - this['re']) <= Complex['EPSILON'] &&
	              Math.abs(z['im'] - this['im']) <= Complex['EPSILON'];
	    },

	    /**
	     * Clones the actual object
	     *
	     * @returns {Complex}
	     */
	    'clone': function() {

	      return new Complex(this['re'], this['im']);
	    },

	    /**
	     * Gets a string of the actual complex number
	     *
	     * @returns {string}
	     */
	    'toString': function() {

	      var a = this['re'];
	      var b = this['im'];
	      var ret = '';

	      if (this['isNaN']()) {
	        return 'NaN';
	      }

	      if (this['isZero']()) {
	        return '0';
	      }

	      if (this['isInfinite']()) {
	        return 'Infinity';
	      }

	      if (a !== 0) {
	        ret += a;
	      }

	      if (b !== 0) {

	        if (a !== 0) {
	          ret += b < 0 ? ' - ' : ' + ';
	        } else if (b < 0) {
	          ret += '-';
	        }

	        b = Math.abs(b);

	        if (1 !== b) {
	          ret += b;
	        }
	        ret += 'i';
	      }

	      if (!ret)
	        return '0';

	      return ret;
	    },

	    /**
	     * Returns the actual number as a vector
	     *
	     * @returns {Array}
	     */
	    'toVector': function() {

	      return [this['re'], this['im']];
	    },

	    /**
	     * Returns the actual real value of the current object
	     *
	     * @returns {number|null}
	     */
	    'valueOf': function() {

	      if (this['im'] === 0) {
	        return this['re'];
	      }
	      return null;
	    },

	    /**
	     * Determines whether a complex number is not on the Riemann sphere.
	     *
	     * @returns {boolean}
	     */
	    'isNaN': function() {
	      return isNaN(this['re']) || isNaN(this['im']);
	    },

	    /**
	     * Determines whether or not a complex number is at the zero pole of the
	     * Riemann sphere.
	     *
	     * @returns {boolean}
	     */
	    'isZero': function() {
	      return (
	              (this['re'] === 0 || this['re'] === -0) &&
	              (this['im'] === 0 || this['im'] === -0)
	              );
	    },

	    /**
	     * Determines whether a complex number is not at the infinity pole of the
	     * Riemann sphere.
	     *
	     * @returns {boolean}
	     */
	    'isFinite': function() {
	      return isFinite(this['re']) && isFinite(this['im']);
	    },

	    /**
	     * Determines whether or not a complex number is at the infinity pole of the
	     * Riemann sphere.
	     *
	     * @returns {boolean}
	     */
	    'isInfinite': function() {
	      return !(this['isNaN']() || this['isFinite']());
	    }
	  };

	  Complex['ZERO'] = new Complex(0, 0);
	  Complex['ONE'] = new Complex(1, 0);
	  Complex['I'] = new Complex(0, 1);
	  Complex['PI'] = new Complex(Math.PI, 0);
	  Complex['E'] = new Complex(Math.E, 0);
	  Complex['INFINITY'] = new Complex(Infinity, Infinity);
	  Complex['NAN'] = new Complex(NaN, NaN);
	  Complex['EPSILON'] = 1e-16;

	  {
	    Object.defineProperty(exports, "__esModule", {'value': true});
	    Complex['default'] = Complex;
	    Complex['Complex'] = Complex;
	    module['exports'] = Complex;
	  }

	})();
	});

	var Complex = unwrapExports(complex);

	function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
	var name$1 = 'Complex';
	var dependencies$2 = [];
	var createComplexClass = /* #__PURE__ */factory(name$1, dependencies$2, function () {
	  /**
	   * Attach type information
	   */
	  Complex.prototype.type = 'Complex';
	  Complex.prototype.isComplex = true;
	  /**
	   * Get a JSON representation of the complex number
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Complex", "re": 2, "im": 3}`
	   */

	  Complex.prototype.toJSON = function () {
	    return {
	      mathjs: 'Complex',
	      re: this.re,
	      im: this.im
	    };
	  };
	  /*
	   * Return the value of the complex number in polar notation
	   * The angle phi will be set in the interval of [-pi, pi].
	   * @return {{r: number, phi: number}} Returns and object with properties r and phi.
	   */


	  Complex.prototype.toPolar = function () {
	    return {
	      r: this.abs(),
	      phi: this.arg()
	    };
	  };
	  /**
	   * Get a string representation of the complex number,
	   * with optional formatting options.
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @return {string} str
	   */


	  Complex.prototype.format = function (options) {
	    var str = '';
	    var im = this.im;
	    var re = this.re;
	    var strRe = format(this.re, options);
	    var strIm = format(this.im, options); // round either re or im when smaller than the configured precision

	    var precision = isNumber(options) ? options : options ? options.precision : null;

	    if (precision !== null) {
	      var epsilon = Math.pow(10, -precision);

	      if (Math.abs(re / im) < epsilon) {
	        re = 0;
	      }

	      if (Math.abs(im / re) < epsilon) {
	        im = 0;
	      }
	    }

	    if (im === 0) {
	      // real value
	      str = strRe;
	    } else if (re === 0) {
	      // purely complex value
	      if (im === 1) {
	        str = 'i';
	      } else if (im === -1) {
	        str = '-i';
	      } else {
	        str = strIm + 'i';
	      }
	    } else {
	      // complex value
	      if (im < 0) {
	        if (im === -1) {
	          str = strRe + ' - i';
	        } else {
	          str = strRe + ' - ' + strIm.substring(1) + 'i';
	        }
	      } else {
	        if (im === 1) {
	          str = strRe + ' + i';
	        } else {
	          str = strRe + ' + ' + strIm + 'i';
	        }
	      }
	    }

	    return str;
	  };
	  /**
	   * Create a complex number from polar coordinates
	   *
	   * Usage:
	   *
	   *     Complex.fromPolar(r: number, phi: number) : Complex
	   *     Complex.fromPolar({r: number, phi: number}) : Complex
	   *
	   * @param {*} args...
	   * @return {Complex}
	   */


	  Complex.fromPolar = function (args) {
	    switch (arguments.length) {
	      case 1:
	        {
	          var arg = arguments[0];

	          if (_typeof$3(arg) === 'object') {
	            return Complex(arg);
	          } else {
	            throw new TypeError('Input has to be an object with r and phi keys.');
	          }
	        }

	      case 2:
	        {
	          var r = arguments[0];
	          var phi = arguments[1];

	          if (isNumber(r)) {
	            if (isUnit(phi) && phi.hasBase('ANGLE')) {
	              // convert unit to a number in radians
	              phi = phi.toNumber('rad');
	            }

	            if (isNumber(phi)) {
	              return new Complex({
	                r: r,
	                phi: phi
	              });
	            }

	            throw new TypeError('Phi is not a number nor an angle unit.');
	          } else {
	            throw new TypeError('Radius r is not a number.');
	          }
	        }

	      default:
	        throw new SyntaxError('Wrong number of arguments in function fromPolar');
	    }
	  };

	  Complex.prototype.valueOf = Complex.prototype.toString;
	  /**
	   * Create a Complex number from a JSON object
	   * @param {Object} json  A JSON Object structured as
	   *                       {"mathjs": "Complex", "re": 2, "im": 3}
	   *                       All properties are optional, default values
	   *                       for `re` and `im` are 0.
	   * @return {Complex} Returns a new Complex number
	   */

	  Complex.fromJSON = function (json) {
	    return new Complex(json);
	  };
	  /**
	   * Compare two complex numbers, `a` and `b`:
	   *
	   * - Returns 1 when the real part of `a` is larger than the real part of `b`
	   * - Returns -1 when the real part of `a` is smaller than the real part of `b`
	   * - Returns 1 when the real parts are equal
	   *   and the imaginary part of `a` is larger than the imaginary part of `b`
	   * - Returns -1 when the real parts are equal
	   *   and the imaginary part of `a` is smaller than the imaginary part of `b`
	   * - Returns 0 when both real and imaginary parts are equal.
	   *
	   * @params {Complex} a
	   * @params {Complex} b
	   * @returns {number} Returns the comparison result: -1, 0, or 1
	   */


	  Complex.compare = function (a, b) {
	    if (a.re > b.re) {
	      return 1;
	    }

	    if (a.re < b.re) {
	      return -1;
	    }

	    if (a.im > b.im) {
	      return 1;
	    }

	    if (a.im < b.im) {
	      return -1;
	    }

	    return 0;
	  };

	  return Complex;
	}, {
	  isClass: true
	});

	var fraction = createCommonjsModule(function (module, exports) {
	/**
	 * @license Fraction.js v4.0.12 09/09/2015
	 * http://www.xarg.org/2014/03/rational-numbers-in-javascript/
	 *
	 * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 **/


	/**
	 *
	 * This class offers the possibility to calculate fractions.
	 * You can pass a fraction in different formats. Either as array, as double, as string or as an integer.
	 *
	 * Array/Object form
	 * [ 0 => <nominator>, 1 => <denominator> ]
	 * [ n => <nominator>, d => <denominator> ]
	 *
	 * Integer form
	 * - Single integer value
	 *
	 * Double form
	 * - Single double value
	 *
	 * String form
	 * 123.456 - a simple double
	 * 123/456 - a string fraction
	 * 123.'456' - a double with repeating decimal places
	 * 123.(456) - synonym
	 * 123.45'6' - a double with repeating last place
	 * 123.45(6) - synonym
	 *
	 * Example:
	 *
	 * var f = new Fraction("9.4'31'");
	 * f.mul([-4, 3]).div(4.9);
	 *
	 */

	(function(root) {

	  // Maximum search depth for cyclic rational numbers. 2000 should be more than enough.
	  // Example: 1/7 = 0.(142857) has 6 repeating decimal places.
	  // If MAX_CYCLE_LEN gets reduced, long cycles will not be detected and toString() only gets the first 10 digits
	  var MAX_CYCLE_LEN = 2000;

	  // Parsed data to avoid calling "new" all the time
	  var P = {
	    "s": 1,
	    "n": 0,
	    "d": 1
	  };

	  function createError(name) {

	    function errorConstructor() {
	      var temp = Error.apply(this, arguments);
	      temp['name'] = this['name'] = name;
	      this['stack'] = temp['stack'];
	      this['message'] = temp['message'];
	    }

	    /**
	     * Error constructor
	     *
	     * @constructor
	     */
	    function IntermediateInheritor() {}
	    IntermediateInheritor.prototype = Error.prototype;
	    errorConstructor.prototype = new IntermediateInheritor();

	    return errorConstructor;
	  }

	  var DivisionByZero = Fraction['DivisionByZero'] = createError('DivisionByZero');
	  var InvalidParameter = Fraction['InvalidParameter'] = createError('InvalidParameter');

	  function assign(n, s) {

	    if (isNaN(n = parseInt(n, 10))) {
	      throwInvalidParam();
	    }
	    return n * s;
	  }

	  function throwInvalidParam() {
	    throw new InvalidParameter();
	  }

	  var parse = function(p1, p2) {

	    var n = 0, d = 1, s = 1;
	    var v = 0, w = 0, x = 0, y = 1, z = 1;

	    var A = 0, B = 1;
	    var C = 1, D = 1;

	    var N = 10000000;
	    var M;

	    if (p1 === undefined || p1 === null) ; else if (p2 !== undefined) {
	      n = p1;
	      d = p2;
	      s = n * d;
	    } else
	      switch (typeof p1) {

	        case "object":
	        {
	          if ("d" in p1 && "n" in p1) {
	            n = p1["n"];
	            d = p1["d"];
	            if ("s" in p1)
	              n *= p1["s"];
	          } else if (0 in p1) {
	            n = p1[0];
	            if (1 in p1)
	              d = p1[1];
	          } else {
	            throwInvalidParam();
	          }
	          s = n * d;
	          break;
	        }
	        case "number":
	        {
	          if (p1 < 0) {
	            s = p1;
	            p1 = -p1;
	          }

	          if (p1 % 1 === 0) {
	            n = p1;
	          } else if (p1 > 0) { // check for != 0, scale would become NaN (log(0)), which converges really slow

	            if (p1 >= 1) {
	              z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
	              p1 /= z;
	            }

	            // Using Farey Sequences
	            // http://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

	            while (B <= N && D <= N) {
	              M = (A + C) / (B + D);

	              if (p1 === M) {
	                if (B + D <= N) {
	                  n = A + C;
	                  d = B + D;
	                } else if (D > B) {
	                  n = C;
	                  d = D;
	                } else {
	                  n = A;
	                  d = B;
	                }
	                break;

	              } else {

	                if (p1 > M) {
	                  A += C;
	                  B += D;
	                } else {
	                  C += A;
	                  D += B;
	                }

	                if (B > N) {
	                  n = C;
	                  d = D;
	                } else {
	                  n = A;
	                  d = B;
	                }
	              }
	            }
	            n *= z;
	          } else if (isNaN(p1) || isNaN(p2)) {
	            d = n = NaN;
	          }
	          break;
	        }
	        case "string":
	        {
	          B = p1.match(/\d+|./g);

	          if (B === null)
	            throwInvalidParam();

	          if (B[A] === '-') {// Check for minus sign at the beginning
	            s = -1;
	            A++;
	          } else if (B[A] === '+') {// Check for plus sign at the beginning
	            A++;
	          }

	          if (B.length === A + 1) { // Check if it's just a simple number "1234"
	            w = assign(B[A++], s);
	          } else if (B[A + 1] === '.' || B[A] === '.') { // Check if it's a decimal number

	            if (B[A] !== '.') { // Handle 0.5 and .5
	              v = assign(B[A++], s);
	            }
	            A++;

	            // Check for decimal places
	            if (A + 1 === B.length || B[A + 1] === '(' && B[A + 3] === ')' || B[A + 1] === "'" && B[A + 3] === "'") {
	              w = assign(B[A], s);
	              y = Math.pow(10, B[A].length);
	              A++;
	            }

	            // Check for repeating places
	            if (B[A] === '(' && B[A + 2] === ')' || B[A] === "'" && B[A + 2] === "'") {
	              x = assign(B[A + 1], s);
	              z = Math.pow(10, B[A + 1].length) - 1;
	              A += 3;
	            }

	          } else if (B[A + 1] === '/' || B[A + 1] === ':') { // Check for a simple fraction "123/456" or "123:456"
	            w = assign(B[A], s);
	            y = assign(B[A + 2], 1);
	            A += 3;
	          } else if (B[A + 3] === '/' && B[A + 1] === ' ') { // Check for a complex fraction "123 1/2"
	            v = assign(B[A], s);
	            w = assign(B[A + 2], s);
	            y = assign(B[A + 4], 1);
	            A += 5;
	          }

	          if (B.length <= A) { // Check for more tokens on the stack
	            d = y * z;
	            s = /* void */
	                    n = x + d * v + z * w;
	            break;
	          }

	          /* Fall through on error */
	        }
	        default:
	          throwInvalidParam();
	      }

	    if (d === 0) {
	      throw new DivisionByZero();
	    }

	    P["s"] = s < 0 ? -1 : 1;
	    P["n"] = Math.abs(n);
	    P["d"] = Math.abs(d);
	  };

	  function modpow(b, e, m) {

	    var r = 1;
	    for (; e > 0; b = (b * b) % m, e >>= 1) {

	      if (e & 1) {
	        r = (r * b) % m;
	      }
	    }
	    return r;
	  }


	  function cycleLen(n, d) {

	    for (; d % 2 === 0;
	            d /= 2) {
	    }

	    for (; d % 5 === 0;
	            d /= 5) {
	    }

	    if (d === 1) // Catch non-cyclic numbers
	      return 0;

	    // If we would like to compute really large numbers quicker, we could make use of Fermat's little theorem:
	    // 10^(d-1) % d == 1
	    // However, we don't need such large numbers and MAX_CYCLE_LEN should be the capstone,
	    // as we want to translate the numbers to strings.

	    var rem = 10 % d;
	    var t = 1;

	    for (; rem !== 1; t++) {
	      rem = rem * 10 % d;

	      if (t > MAX_CYCLE_LEN)
	        return 0; // Returning 0 here means that we don't print it as a cyclic number. It's likely that the answer is `d-1`
	    }
	    return t;
	  }


	     function cycleStart(n, d, len) {

	    var rem1 = 1;
	    var rem2 = modpow(10, len, d);

	    for (var t = 0; t < 300; t++) { // s < ~log10(Number.MAX_VALUE)
	      // Solve 10^s == 10^(s+t) (mod d)

	      if (rem1 === rem2)
	        return t;

	      rem1 = rem1 * 10 % d;
	      rem2 = rem2 * 10 % d;
	    }
	    return 0;
	  }

	  function gcd(a, b) {

	    if (!a)
	      return b;
	    if (!b)
	      return a;

	    while (1) {
	      a %= b;
	      if (!a)
	        return b;
	      b %= a;
	      if (!b)
	        return a;
	    }
	  }
	  /**
	   * Module constructor
	   *
	   * @constructor
	   * @param {number|Fraction=} a
	   * @param {number=} b
	   */
	  function Fraction(a, b) {

	    if (!(this instanceof Fraction)) {
	      return new Fraction(a, b);
	    }

	    parse(a, b);

	    if (Fraction['REDUCE']) {
	      a = gcd(P["d"], P["n"]); // Abuse a
	    } else {
	      a = 1;
	    }

	    this["s"] = P["s"];
	    this["n"] = P["n"] / a;
	    this["d"] = P["d"] / a;
	  }

	  /**
	   * Boolean global variable to be able to disable automatic reduction of the fraction
	   *
	   */
	  Fraction['REDUCE'] = 1;

	  Fraction.prototype = {

	    "s": 1,
	    "n": 0,
	    "d": 1,

	    /**
	     * Calculates the absolute value
	     *
	     * Ex: new Fraction(-4).abs() => 4
	     **/
	    "abs": function() {

	      return new Fraction(this["n"], this["d"]);
	    },

	    /**
	     * Inverts the sign of the current fraction
	     *
	     * Ex: new Fraction(-4).neg() => 4
	     **/
	    "neg": function() {

	      return new Fraction(-this["s"] * this["n"], this["d"]);
	    },

	    /**
	     * Adds two rational numbers
	     *
	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
	     **/
	    "add": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * this["n"] * P["d"] + P["s"] * this["d"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Subtracts two rational numbers
	     *
	     * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
	     **/
	    "sub": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * this["n"] * P["d"] - P["s"] * this["d"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Multiplies two rational numbers
	     *
	     * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
	     **/
	    "mul": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * P["s"] * this["n"] * P["n"],
	              this["d"] * P["d"]
	              );
	    },

	    /**
	     * Divides two rational numbers
	     *
	     * Ex: new Fraction("-17.(345)").inverse().div(3)
	     **/
	    "div": function(a, b) {

	      parse(a, b);
	      return new Fraction(
	              this["s"] * P["s"] * this["n"] * P["d"],
	              this["d"] * P["n"]
	              );
	    },

	    /**
	     * Clones the actual object
	     *
	     * Ex: new Fraction("-17.(345)").clone()
	     **/
	    "clone": function() {
	      return new Fraction(this);
	    },

	    /**
	     * Calculates the modulo of two rational numbers - a more precise fmod
	     *
	     * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
	     **/
	    "mod": function(a, b) {

	      if (isNaN(this['n']) || isNaN(this['d'])) {
	        return new Fraction(NaN);
	      }

	      if (a === undefined) {
	        return new Fraction(this["s"] * this["n"] % this["d"], 1);
	      }

	      parse(a, b);
	      if (0 === P["n"] && 0 === this["d"]) {
	        Fraction(0, 0); // Throw DivisionByZero
	      }

	      /*
	       * First silly attempt, kinda slow
	       *
	       return that["sub"]({
	       "n": num["n"] * Math.floor((this.n / this.d) / (num.n / num.d)),
	       "d": num["d"],
	       "s": this["s"]
	       });*/

	      /*
	       * New attempt: a1 / b1 = a2 / b2 * q + r
	       * => b2 * a1 = a2 * b1 * q + b1 * b2 * r
	       * => (b2 * a1 % a2 * b1) / (b1 * b2)
	       */
	      return new Fraction(
	              this["s"] * (P["d"] * this["n"]) % (P["n"] * this["d"]),
	              P["d"] * this["d"]
	              );
	    },

	    /**
	     * Calculates the fractional gcd of two rational numbers
	     *
	     * Ex: new Fraction(5,8).gcd(3,7) => 1/56
	     */
	    "gcd": function(a, b) {

	      parse(a, b);

	      // gcd(a / b, c / d) = gcd(a, c) / lcm(b, d)

	      return new Fraction(gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]), P["d"] * this["d"]);
	    },

	    /**
	     * Calculates the fractional lcm of two rational numbers
	     *
	     * Ex: new Fraction(5,8).lcm(3,7) => 15
	     */
	    "lcm": function(a, b) {

	      parse(a, b);

	      // lcm(a / b, c / d) = lcm(a, c) / gcd(b, d)

	      if (P["n"] === 0 && this["n"] === 0) {
	        return new Fraction;
	      }
	      return new Fraction(P["n"] * this["n"], gcd(P["n"], this["n"]) * gcd(P["d"], this["d"]));
	    },

	    /**
	     * Calculates the ceil of a rational number
	     *
	     * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
	     **/
	    "ceil": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Calculates the floor of a rational number
	     *
	     * Ex: new Fraction('4.(3)').floor() => (4 / 1)
	     **/
	    "floor": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Rounds a rational numbers
	     *
	     * Ex: new Fraction('4.(3)').round() => (4 / 1)
	     **/
	    "round": function(places) {

	      places = Math.pow(10, places || 0);

	      if (isNaN(this["n"]) || isNaN(this["d"])) {
	        return new Fraction(NaN);
	      }
	      return new Fraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
	    },

	    /**
	     * Gets the inverse of the fraction, means numerator and denumerator are exchanged
	     *
	     * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
	     **/
	    "inverse": function() {

	      return new Fraction(this["s"] * this["d"], this["n"]);
	    },

	    /**
	     * Calculates the fraction to some integer exponent
	     *
	     * Ex: new Fraction(-1,2).pow(-3) => -8
	     */
	    "pow": function(m) {

	      if (m < 0) {
	        return new Fraction(Math.pow(this['s'] * this["d"], -m), Math.pow(this["n"], -m));
	      } else {
	        return new Fraction(Math.pow(this['s'] * this["n"], m), Math.pow(this["d"], m));
	      }
	    },

	    /**
	     * Check if two rational numbers are the same
	     *
	     * Ex: new Fraction(19.6).equals([98, 5]);
	     **/
	    "equals": function(a, b) {

	      parse(a, b);
	      return this["s"] * this["n"] * P["d"] === P["s"] * P["n"] * this["d"]; // Same as compare() === 0
	    },

	    /**
	     * Check if two rational numbers are the same
	     *
	     * Ex: new Fraction(19.6).equals([98, 5]);
	     **/
	    "compare": function(a, b) {

	      parse(a, b);
	      var t = (this["s"] * this["n"] * P["d"] - P["s"] * P["n"] * this["d"]);
	      return (0 < t) - (t < 0);
	    },

	    "simplify": function(eps) {

	      // First naive implementation, needs improvement

	      if (isNaN(this['n']) || isNaN(this['d'])) {
	        return this;
	      }

	      var cont = this['abs']()['toContinued']();

	      eps = eps || 0.001;

	      function rec(a) {
	        if (a.length === 1)
	          return new Fraction(a[0]);
	        return rec(a.slice(1))['inverse']()['add'](a[0]);
	      }

	      for (var i = 0; i < cont.length; i++) {
	        var tmp = rec(cont.slice(0, i + 1));
	        if (tmp['sub'](this['abs']())['abs']().valueOf() < eps) {
	          return tmp['mul'](this['s']);
	        }
	      }
	      return this;
	    },

	    /**
	     * Check if two rational numbers are divisible
	     *
	     * Ex: new Fraction(19.6).divisible(1.5);
	     */
	    "divisible": function(a, b) {

	      parse(a, b);
	      return !(!(P["n"] * this["d"]) || ((this["n"] * P["d"]) % (P["n"] * this["d"])));
	    },

	    /**
	     * Returns a decimal representation of the fraction
	     *
	     * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
	     **/
	    'valueOf': function() {

	      return this["s"] * this["n"] / this["d"];
	    },

	    /**
	     * Returns a string-fraction representation of a Fraction object
	     *
	     * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
	     **/
	    'toFraction': function(excludeWhole) {

	      var whole, str = "";
	      var n = this["n"];
	      var d = this["d"];
	      if (this["s"] < 0) {
	        str += '-';
	      }

	      if (d === 1) {
	        str += n;
	      } else {

	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
	          str += whole;
	          str += " ";
	          n %= d;
	        }

	        str += n;
	        str += '/';
	        str += d;
	      }
	      return str;
	    },

	    /**
	     * Returns a latex representation of a Fraction object
	     *
	     * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
	     **/
	    'toLatex': function(excludeWhole) {

	      var whole, str = "";
	      var n = this["n"];
	      var d = this["d"];
	      if (this["s"] < 0) {
	        str += '-';
	      }

	      if (d === 1) {
	        str += n;
	      } else {

	        if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
	          str += whole;
	          n %= d;
	        }

	        str += "\\frac{";
	        str += n;
	        str += '}{';
	        str += d;
	        str += '}';
	      }
	      return str;
	    },

	    /**
	     * Returns an array of continued fraction elements
	     *
	     * Ex: new Fraction("7/8").toContinued() => [0,1,7]
	     */
	    'toContinued': function() {

	      var t;
	      var a = this['n'];
	      var b = this['d'];
	      var res = [];

	      if (isNaN(this['n']) || isNaN(this['d'])) {
	        return res;
	      }

	      do {
	        res.push(Math.floor(a / b));
	        t = a % b;
	        a = b;
	        b = t;
	      } while (a !== 1);

	      return res;
	    },

	    /**
	     * Creates a string representation of a fraction with all digits
	     *
	     * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
	     **/
	    'toString': function(dec) {

	      var g;
	      var N = this["n"];
	      var D = this["d"];

	      if (isNaN(N) || isNaN(D)) {
	        return "NaN";
	      }

	      if (!Fraction['REDUCE']) {
	        g = gcd(N, D);
	        N /= g;
	        D /= g;
	      }

	      dec = dec || 15; // 15 = decimal places when no repitation

	      var cycLen = cycleLen(N, D); // Cycle length
	      var cycOff = cycleStart(N, D, cycLen); // Cycle start

	      var str = this['s'] === -1 ? "-" : "";

	      str += N / D | 0;

	      N %= D;
	      N *= 10;

	      if (N)
	        str += ".";

	      if (cycLen) {

	        for (var i = cycOff; i--; ) {
	          str += N / D | 0;
	          N %= D;
	          N *= 10;
	        }
	        str += "(";
	        for (var i = cycLen; i--; ) {
	          str += N / D | 0;
	          N %= D;
	          N *= 10;
	        }
	        str += ")";
	      } else {
	        for (var i = dec; N && i--; ) {
	          str += N / D | 0;
	          N %= D;
	          N *= 10;
	        }
	      }
	      return str;
	    }
	  };

	  {
	    Object.defineProperty(exports, "__esModule", {'value': true});
	    Fraction['default'] = Fraction;
	    Fraction['Fraction'] = Fraction;
	    module['exports'] = Fraction;
	  }

	})();
	});

	var Fraction = unwrapExports(fraction);

	var name$2 = 'Fraction';
	var dependencies$3 = [];
	var createFractionClass = /* #__PURE__ */factory(name$2, dependencies$3, function () {
	  /**
	   * Attach type information
	   */
	  Fraction.prototype.type = 'Fraction';
	  Fraction.prototype.isFraction = true;
	  /**
	   * Get a JSON representation of a Fraction containing type information
	   * @returns {Object} Returns a JSON object structured as:
	   *                   `{"mathjs": "Fraction", "n": 3, "d": 8}`
	   */

	  Fraction.prototype.toJSON = function () {
	    return {
	      mathjs: 'Fraction',
	      n: this.s * this.n,
	      d: this.d
	    };
	  };
	  /**
	   * Instantiate a Fraction from a JSON object
	   * @param {Object} json  a JSON object structured as:
	   *                       `{"mathjs": "Fraction", "n": 3, "d": 8}`
	   * @return {BigNumber}
	   */


	  Fraction.fromJSON = function (json) {
	    return new Fraction(json);
	  };

	  return Fraction;
	}, {
	  isClass: true
	});

	var name$3 = 'Matrix';
	var dependencies$4 = [];
	var createMatrixClass = /* #__PURE__ */factory(name$3, dependencies$4, function () {
	  /**
	   * @constructor Matrix
	   *
	   * A Matrix is a wrapper around an Array. A matrix can hold a multi dimensional
	   * array. A matrix can be constructed as:
	   *
	   *     let matrix = math.matrix(data)
	   *
	   * Matrix contains the functions to resize, get and set values, get the size,
	   * clone the matrix and to convert the matrix to a vector, array, or scalar.
	   * Furthermore, one can iterate over the matrix using map and forEach.
	   * The internal Array of the Matrix can be accessed using the function valueOf.
	   *
	   * Example usage:
	   *
	   *     let matrix = math.matrix([[1, 2], [3, 4]])
	   *     matix.size()              // [2, 2]
	   *     matrix.resize([3, 2], 5)
	   *     matrix.valueOf()          // [[1, 2], [3, 4], [5, 5]]
	   *     matrix.subset([1,2])       // 3 (indexes are zero-based)
	   *
	   */
	  function Matrix() {
	    if (!(this instanceof Matrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }
	  }
	  /**
	   * Attach type information
	   */


	  Matrix.prototype.type = 'Matrix';
	  Matrix.prototype.isMatrix = true;
	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     const format = matrix.storage()   // retrieve storage format
	   *
	   * @return {string}           The storage format.
	   */

	  Matrix.prototype.storage = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke storage on a Matrix interface');
	  };
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     const format = matrix.datatype()    // retrieve matrix datatype
	   *
	   * @return {string}           The datatype.
	   */


	  Matrix.prototype.datatype = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke datatype on a Matrix interface');
	  };
	  /**
	   * Create a new Matrix With the type of the current matrix instance
	   * @param {Array | Object} data
	   * @param {string} [datatype]
	   */


	  Matrix.prototype.create = function (data, datatype) {
	    throw new Error('Cannot invoke create on a Matrix interface');
	  };
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     const subset = matrix.subset(index)               // retrieve subset
	   *     const value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */


	  Matrix.prototype.subset = function (index, replacement, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke subset on a Matrix interface');
	  };
	  /**
	   * Get a single element from the matrix.
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */


	  Matrix.prototype.get = function (index) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke get on a Matrix interface');
	  };
	  /**
	   * Replace a single element in the matrix.
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {Matrix} self
	   */


	  Matrix.prototype.set = function (index, value, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke set on a Matrix interface');
	  };
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */


	  Matrix.prototype.resize = function (size, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke resize on a Matrix interface');
	  };
	  /**
	   * Reshape the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (reshape in place).
	   *
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {boolean} [copy]          Return a reshaped copy of the matrix
	   *
	   * @return {Matrix}                 The reshaped matrix
	   */


	  Matrix.prototype.reshape = function (size, defaultValue) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke reshape on a Matrix interface');
	  };
	  /**
	   * Create a clone of the matrix
	   * @return {Matrix} clone
	   */


	  Matrix.prototype.clone = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke clone on a Matrix interface');
	  };
	  /**
	   * Retrieve the size of the matrix.
	   * @returns {number[]} size
	   */


	  Matrix.prototype.size = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke size on a Matrix interface');
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   *
	   * @return {Matrix} matrix
	   */


	  Matrix.prototype.map = function (callback, skipZeros) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke map on a Matrix interface');
	  };
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */


	  Matrix.prototype.forEach = function (callback) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke forEach on a Matrix interface');
	  };
	  /**
	   * Create an Array with a copy of the data of the Matrix
	   * @returns {Array} array
	   */


	  Matrix.prototype.toArray = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toArray on a Matrix interface');
	  };
	  /**
	   * Get the primitive value of the Matrix: a multidimensional array
	   * @returns {Array} array
	   */


	  Matrix.prototype.valueOf = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke valueOf on a Matrix interface');
	  };
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */


	  Matrix.prototype.format = function (options) {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke format on a Matrix interface');
	  };
	  /**
	   * Get a string representation of the matrix
	   * @returns {string} str
	   */


	  Matrix.prototype.toString = function () {
	    // must be implemented by each of the Matrix implementations
	    throw new Error('Cannot invoke toString on a Matrix interface');
	  };

	  return Matrix;
	}, {
	  isClass: true
	});

	var name$4 = 'DenseMatrix';
	var dependencies$5 = ['Matrix'];
	var createDenseMatrixClass = /* #__PURE__ */factory(name$4, dependencies$5, function (_ref) {
	  var Matrix = _ref.Matrix;

	  /**
	   * Dense Matrix implementation. A regular, dense matrix, supporting multi-dimensional matrices. This is the default matrix type.
	   * @class DenseMatrix
	   */
	  function DenseMatrix(data, datatype) {
	    if (!(this instanceof DenseMatrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    if (datatype && !isString(datatype)) {
	      throw new Error('Invalid datatype: ' + datatype);
	    }

	    if (isMatrix(data)) {
	      // check data is a DenseMatrix
	      if (data.type === 'DenseMatrix') {
	        // clone data & size
	        this._data = clone(data._data);
	        this._size = clone(data._size);
	        this._datatype = datatype || data._datatype;
	      } else {
	        // build data from existing matrix
	        this._data = data.toArray();
	        this._size = data.size();
	        this._datatype = datatype || data._datatype;
	      }
	    } else if (data && isArray$1(data.data) && isArray$1(data.size)) {
	      // initialize fields from JSON representation
	      this._data = data.data;
	      this._size = data.size; // verify the dimensions of the array

	      validate(this._data, this._size);
	      this._datatype = datatype || data.datatype;
	    } else if (isArray$1(data)) {
	      // replace nested Matrices with Arrays
	      this._data = preprocess(data); // get the dimensions of the array

	      this._size = arraySize(this._data); // verify the dimensions of the array, TODO: compute size while processing array

	      validate(this._data, this._size); // data type unknown

	      this._datatype = datatype;
	    } else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
	    } else {
	      // nothing provided
	      this._data = [];
	      this._size = [0];
	      this._datatype = datatype;
	    }
	  }

	  DenseMatrix.prototype = new Matrix();
	  /**
	   * Create a new DenseMatrix
	   */

	  DenseMatrix.prototype.createDenseMatrix = function (data, datatype) {
	    return new DenseMatrix(data, datatype);
	  };
	  /**
	   * Attach type information
	   */


	  DenseMatrix.prototype.type = 'DenseMatrix';
	  DenseMatrix.prototype.isDenseMatrix = true;
	  /**
	   * Get the matrix type
	   *
	   * Usage:
	   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
	   *
	   * @memberOf DenseMatrix
	   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
	   */

	  DenseMatrix.prototype.getDataType = function () {
	    return getArrayDataType(this._data, typeOf);
	  };
	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     const format = matrix.storage()  // retrieve storage format
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The storage format.
	   */


	  DenseMatrix.prototype.storage = function () {
	    return 'dense';
	  };
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     const format = matrix.datatype()   // retrieve matrix datatype
	   *
	   * @memberof DenseMatrix
	   * @return {string}           The datatype.
	   */


	  DenseMatrix.prototype.datatype = function () {
	    return this._datatype;
	  };
	  /**
	   * Create a new DenseMatrix
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {string} [datatype]
	   */


	  DenseMatrix.prototype.create = function (data, datatype) {
	    return new DenseMatrix(data, datatype);
	  };
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     const subset = matrix.subset(index)               // retrieve subset
	   *     const value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @memberof DenseMatrix
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */


	  DenseMatrix.prototype.subset = function (index, replacement, defaultValue) {
	    switch (arguments.length) {
	      case 1:
	        return _get(this, index);
	      // intentional fall through

	      case 2:
	      case 3:
	        return _set(this, index, replacement, defaultValue);

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };
	  /**
	   * Get a single element from the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */


	  DenseMatrix.prototype.get = function (index) {
	    if (!isArray$1(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length !== this._size.length) {
	      throw new DimensionError(index.length, this._size.length);
	    } // check index


	    for (var x = 0; x < index.length; x++) {
	      validateIndex(index[x], this._size[x]);
	    }

	    var data = this._data;

	    for (var i = 0, ii = index.length; i < ii; i++) {
	      var indexI = index[i];
	      validateIndex(indexI, data.length);
	      data = data[indexI];
	    }

	    return data;
	  };
	  /**
	   * Replace a single element in the matrix.
	   * @memberof DenseMatrix
	   * @param {number[]} index   Zero-based index
	   * @param {*} value
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be left undefined.
	   * @return {DenseMatrix} self
	   */


	  DenseMatrix.prototype.set = function (index, value, defaultValue) {
	    if (!isArray$1(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length < this._size.length) {
	      throw new DimensionError(index.length, this._size.length, '<');
	    }

	    var i, ii, indexI; // enlarge matrix when needed

	    var size = index.map(function (i) {
	      return i + 1;
	    });

	    _fit(this, size, defaultValue); // traverse over the dimensions


	    var data = this._data;

	    for (i = 0, ii = index.length - 1; i < ii; i++) {
	      indexI = index[i];
	      validateIndex(indexI, data.length);
	      data = data[indexI];
	    } // set new value


	    indexI = index[index.length - 1];
	    validateIndex(indexI, data.length);
	    data[indexI] = value;
	    return this;
	  };
	  /**
	   * Get a submatrix of this matrix
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index   Zero-based index
	   * @private
	   */


	  function _get(matrix, index) {
	    if (!isIndex(index)) {
	      throw new TypeError('Invalid index');
	    }

	    var isScalar = index.isScalar();

	    if (isScalar) {
	      // return a scalar
	      return matrix.get(index.min());
	    } else {
	      // validate dimensions
	      var size = index.size();

	      if (size.length !== matrix._size.length) {
	        throw new DimensionError(size.length, matrix._size.length);
	      } // validate if any of the ranges in the index is out of range


	      var min = index.min();
	      var max = index.max();

	      for (var i = 0, ii = matrix._size.length; i < ii; i++) {
	        validateIndex(min[i], matrix._size[i]);
	        validateIndex(max[i], matrix._size[i]);
	      } // retrieve submatrix
	      // TODO: more efficient when creating an empty matrix and setting _data and _size manually


	      return new DenseMatrix(_getSubmatrix(matrix._data, index, size.length, 0), matrix._datatype);
	    }
	  }
	  /**
	   * Recursively get a submatrix of a multi dimensional matrix.
	   * Index is not checked for correct number or length of dimensions.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim    Current dimension
	   * @return {Array} submatrix
	   * @private
	   */


	  function _getSubmatrix(data, index, dims, dim) {
	    var last = dim === dims - 1;
	    var range = index.dimension(dim);

	    if (last) {
	      return range.map(function (i) {
	        validateIndex(i, data.length);
	        return data[i];
	      }).valueOf();
	    } else {
	      return range.map(function (i) {
	        validateIndex(i, data.length);
	        var child = data[i];
	        return _getSubmatrix(child, index, dims, dim + 1);
	      }).valueOf();
	    }
	  }
	  /**
	   * Replace a submatrix in this matrix
	   * Indexes are zero-based.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix
	   * @param {Index} index
	   * @param {DenseMatrix | Array | *} submatrix
	   * @param {*} defaultValue          Default value, filled in on new entries when
	   *                                  the matrix is resized.
	   * @return {DenseMatrix} matrix
	   * @private
	   */


	  function _set(matrix, index, submatrix, defaultValue) {
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    } // get index size and check whether the index contains a single value


	    var iSize = index.size();
	    var isScalar = index.isScalar(); // calculate the size of the submatrix, and convert it into an Array if needed

	    var sSize;

	    if (isMatrix(submatrix)) {
	      sSize = submatrix.size();
	      submatrix = submatrix.valueOf();
	    } else {
	      sSize = arraySize(submatrix);
	    }

	    if (isScalar) {
	      // set a scalar
	      // check whether submatrix is a scalar
	      if (sSize.length !== 0) {
	        throw new TypeError('Scalar expected');
	      }

	      matrix.set(index.min(), submatrix, defaultValue);
	    } else {
	      // set a submatrix
	      // validate dimensions
	      if (iSize.length < matrix._size.length) {
	        throw new DimensionError(iSize.length, matrix._size.length, '<');
	      }

	      if (sSize.length < iSize.length) {
	        // calculate number of missing outer dimensions
	        var i = 0;
	        var outer = 0;

	        while (iSize[i] === 1 && sSize[i] === 1) {
	          i++;
	        }

	        while (iSize[i] === 1) {
	          outer++;
	          i++;
	        } // unsqueeze both outer and inner dimensions


	        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
	      } // check whether the size of the submatrix matches the index size


	      if (!deepStrictEqual(iSize, sSize)) {
	        throw new DimensionError(iSize, sSize, '>');
	      } // enlarge matrix when needed


	      var size = index.max().map(function (i) {
	        return i + 1;
	      });

	      _fit(matrix, size, defaultValue); // insert the sub matrix


	      var dims = iSize.length;
	      var dim = 0;

	      _setSubmatrix(matrix._data, index, submatrix, dims, dim);
	    }

	    return matrix;
	  }
	  /**
	   * Replace a submatrix of a multi dimensional matrix.
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @param {Index} index
	   * @param {Array} submatrix
	   * @param {number} dims   Total number of dimensions
	   * @param {number} dim
	   * @private
	   */


	  function _setSubmatrix(data, index, submatrix, dims, dim) {
	    var last = dim === dims - 1;
	    var range = index.dimension(dim);

	    if (last) {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);
	        data[dataIndex] = submatrix[subIndex[0]];
	      });
	    } else {
	      range.forEach(function (dataIndex, subIndex) {
	        validateIndex(dataIndex);

	        _setSubmatrix(data[dataIndex], index, submatrix[subIndex[0]], dims, dim + 1);
	      });
	    }
	  }
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @memberof DenseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */


	  DenseMatrix.prototype.resize = function (size, defaultValue, copy) {
	    // validate arguments
	    if (!isArray$1(size)) {
	      throw new TypeError('Array expected');
	    } // matrix to resize


	    var m = copy ? this.clone() : this; // resize matrix

	    return _resize(m, size, defaultValue);
	  };

	  function _resize(matrix, size, defaultValue) {
	    // check size
	    if (size.length === 0) {
	      // first value in matrix
	      var v = matrix._data; // go deep

	      while (isArray$1(v)) {
	        v = v[0];
	      }

	      return v;
	    } // resize matrix


	    matrix._size = size.slice(0); // copy the array

	    matrix._data = resize(matrix._data, matrix._size, defaultValue); // return matrix

	    return matrix;
	  }
	  /**
	   * Reshape the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (reshape in place).
	   *
	   * NOTE: This might be better suited to copy by default, instead of modifying
	   *       in place. For now, it operates in place to remain consistent with
	   *       resize().
	   *
	   * @memberof DenseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {boolean} [copy]          Return a reshaped copy of the matrix
	   *
	   * @return {Matrix}                 The reshaped matrix
	   */


	  DenseMatrix.prototype.reshape = function (size, copy) {
	    var m = copy ? this.clone() : this;
	    m._data = reshape(m._data, size);
	    m._size = size.slice(0);
	    return m;
	  };
	  /**
	   * Enlarge the matrix when it is smaller than given size.
	   * If the matrix is larger or equal sized, nothing is done.
	   * @memberof DenseMatrix
	   * @param {DenseMatrix} matrix           The matrix to be resized
	   * @param {number[]} size
	   * @param {*} defaultValue          Default value, filled in on new entries.
	   * @private
	   */


	  function _fit(matrix, size, defaultValue) {
	    var // copy the array
	    newSize = matrix._size.slice(0);

	    var changed = false; // add dimensions when needed

	    while (newSize.length < size.length) {
	      newSize.push(0);
	      changed = true;
	    } // enlarge size when needed


	    for (var i = 0, ii = size.length; i < ii; i++) {
	      if (size[i] > newSize[i]) {
	        newSize[i] = size[i];
	        changed = true;
	      }
	    }

	    if (changed) {
	      // resize only when size is changed
	      _resize(matrix, newSize, defaultValue);
	    }
	  }
	  /**
	   * Create a clone of the matrix
	   * @memberof DenseMatrix
	   * @return {DenseMatrix} clone
	   */


	  DenseMatrix.prototype.clone = function () {
	    var m = new DenseMatrix({
	      data: clone(this._data),
	      size: clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };
	  /**
	   * Retrieve the size of the matrix.
	   * @memberof DenseMatrix
	   * @returns {number[]} size
	   */


	  DenseMatrix.prototype.size = function () {
	    return this._size.slice(0); // return a clone of _size
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   *
	   * @return {DenseMatrix} matrix
	   */


	  DenseMatrix.prototype.map = function (callback) {
	    // matrix instance
	    var me = this;

	    var recurse = function recurse(value, index) {
	      if (isArray$1(value)) {
	        return value.map(function (child, i) {
	          return recurse(child, index.concat(i));
	        });
	      } else {
	        return callback(value, index, me);
	      }
	    }; // determine the new datatype when the original matrix has datatype defined
	    // TODO: should be done in matrix constructor instead


	    var data = recurse(this._data, []);
	    var datatype = this._datatype !== undefined ? getArrayDataType(data, typeOf) : undefined;
	    return new DenseMatrix(data, datatype);
	  };
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @memberof DenseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   */


	  DenseMatrix.prototype.forEach = function (callback) {
	    // matrix instance
	    var me = this;

	    var recurse = function recurse(value, index) {
	      if (isArray$1(value)) {
	        value.forEach(function (child, i) {
	          recurse(child, index.concat(i));
	        });
	      } else {
	        callback(value, index, me);
	      }
	    };

	    recurse(this._data, []);
	  };
	  /**
	   * Create an Array with a copy of the data of the DenseMatrix
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */


	  DenseMatrix.prototype.toArray = function () {
	    return clone(this._data);
	  };
	  /**
	   * Get the primitive value of the DenseMatrix: a multidimensional array
	   * @memberof DenseMatrix
	   * @returns {Array} array
	   */


	  DenseMatrix.prototype.valueOf = function () {
	    return this._data;
	  };
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @memberof DenseMatrix
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */


	  DenseMatrix.prototype.format = function (options) {
	    return format$2(this._data, options);
	  };
	  /**
	   * Get a string representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {string} str
	   */


	  DenseMatrix.prototype.toString = function () {
	    return format$2(this._data);
	  };
	  /**
	   * Get a JSON representation of the matrix
	   * @memberof DenseMatrix
	   * @returns {Object}
	   */


	  DenseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'DenseMatrix',
	      data: this._data,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };
	  /**
	   * Get the kth Matrix diagonal.
	   *
	   * @memberof DenseMatrix
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
	   *
	   * @returns {Matrix}                     The matrix with the diagonal values.
	   */


	  DenseMatrix.prototype.diagonal = function (k) {
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows & columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // number diagonal values

	    var n = Math.min(rows - kSub, columns - kSuper); // x is a matrix get diagonal from matrix

	    var data = []; // loop rows

	    for (var i = 0; i < n; i++) {
	      data[i] = this._data[i + kSub][i + kSuper];
	    } // create DenseMatrix


	    return new DenseMatrix({
	      data: data,
	      size: [n],
	      datatype: this._datatype
	    });
	  };
	  /**
	   * Create a diagonal matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {Array} size                     The matrix size.
	   * @param {number | Matrix | Array } value The values for the diagonal.
	   * @param {number | BigNumber} [k=0]       The kth diagonal where the vector will be filled in.
	   * @param {number} [defaultValue]          The default value for non-diagonal
	   * @param {string} [datatype]              The datatype for the diagonal
	   *
	   * @returns {DenseMatrix}
	   */


	  DenseMatrix.diagonal = function (size, value, k, defaultValue) {
	    if (!isArray$1(size)) {
	      throw new TypeError('Array expected, size parameter');
	    }

	    if (size.length !== 2) {
	      throw new Error('Only two dimensions matrix are supported');
	    } // map size & validate


	    size = size.map(function (s) {
	      // check it is a big number
	      if (isBigNumber(s)) {
	        // convert it
	        s = s.toNumber();
	      } // validate arguments


	      if (!isNumber(s) || !isInteger(s) || s < 1) {
	        throw new Error('Size values must be positive integers');
	      }

	      return s;
	    }); // validate k if any

	    if (k) {
	      // convert BigNumber to a number
	      if (isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows and columns

	    var rows = size[0];
	    var columns = size[1]; // number of non-zero items

	    var n = Math.min(rows - kSub, columns - kSuper); // value extraction function

	    var _value; // check value


	    if (isArray$1(value)) {
	      // validate array
	      if (value.length !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid value array length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value[i];
	      };
	    } else if (isMatrix(value)) {
	      // matrix size
	      var ms = value.size(); // validate matrix

	      if (ms.length !== 1 || ms[0] !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid matrix length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value.get([i]);
	      };
	    } else {
	      // define function
	      _value = function _value() {
	        // return value
	        return value;
	      };
	    } // discover default value if needed


	    if (!defaultValue) {
	      // check first value in array
	      defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) // trick to create a BigNumber with value zero
	      : 0;
	    } // empty array


	    var data = []; // check we need to resize array

	    if (size.length > 0) {
	      // resize array
	      data = resize(data, size, defaultValue); // fill diagonal

	      for (var d = 0; d < n; d++) {
	        data[d + kSub][d + kSuper] = _value(d);
	      }
	    } // create DenseMatrix


	    return new DenseMatrix({
	      data: data,
	      size: [rows, columns]
	    });
	  };
	  /**
	   * Generate a matrix from a JSON object
	   * @memberof DenseMatrix
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "DenseMatrix", data: [], size: []}`,
	   *                       where mathjs is optional
	   * @returns {DenseMatrix}
	   */


	  DenseMatrix.fromJSON = function (json) {
	    return new DenseMatrix(json);
	  };
	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @memberof DenseMatrix
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */


	  DenseMatrix.prototype.swapRows = function (i, j) {
	    // check index
	    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
	      throw new Error('Row index must be positive integers');
	    } // check dimensions


	    if (this._size.length !== 2) {
	      throw new Error('Only two dimensional matrix is supported');
	    } // validate index


	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[0]); // swap rows

	    DenseMatrix._swapRows(i, j, this._data); // return current instance


	    return this;
	  };
	  /**
	   * Swap rows i and j in Dense Matrix data structure.
	   *
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   * @param {Array} data     Matrix data
	   */


	  DenseMatrix._swapRows = function (i, j, data) {
	    // swap values i <-> j
	    var vi = data[i];
	    data[i] = data[j];
	    data[j] = vi;
	  };
	  /**
	   * Preprocess data, which can be an Array or DenseMatrix with nested Arrays and
	   * Matrices. Replaces all nested Matrices with Arrays
	   * @memberof DenseMatrix
	   * @param {Array} data
	   * @return {Array} data
	   */


	  function preprocess(data) {
	    for (var i = 0, ii = data.length; i < ii; i++) {
	      var elem = data[i];

	      if (isArray$1(elem)) {
	        data[i] = preprocess(elem);
	      } else if (elem && elem.isMatrix === true) {
	        data[i] = preprocess(elem.valueOf());
	      }
	    }

	    return data;
	  }

	  return DenseMatrix;
	}, {
	  isClass: true
	});

	/**
	 * Test whether an array contains collections
	 * @param {Array} array
	 * @returns {boolean} Returns true when the array contains one or multiple
	 *                    collections (Arrays or Matrices). Returns false otherwise.
	 */

	function containsCollections(array) {
	  for (var i = 0; i < array.length; i++) {
	    if (isCollection(array[i])) {
	      return true;
	    }
	  }

	  return false;
	}
	/**
	 * Recursively loop over all elements in a given multi dimensional array
	 * and invoke the callback on each of the elements.
	 * @param {Array | Matrix} array
	 * @param {Function} callback     The callback method is invoked with one
	 *                                parameter: the current element in the array
	 */

	function deepForEach(array, callback) {
	  if (isMatrix(array)) {
	    array = array.valueOf();
	  }

	  for (var i = 0, ii = array.length; i < ii; i++) {
	    var value = array[i];

	    if (Array.isArray(value)) {
	      deepForEach(value, callback);
	    } else {
	      callback(value);
	    }
	  }
	}
	/**
	 * Execute the callback function element wise for each element in array and any
	 * nested array
	 * Returns an array with the results
	 * @param {Array | Matrix} array
	 * @param {Function} callback   The callback is called with two parameters:
	 *                              value1 and value2, which contain the current
	 *                              element of both arrays.
	 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	 *
	 * @return {Array | Matrix} res
	 */

	function deepMap(array, callback, skipZeros) {
	  if (array && typeof array.map === 'function') {
	    // TODO: replace array.map with a for loop to improve performance
	    return array.map(function (x) {
	      return deepMap(x, callback);
	    });
	  } else {
	    return callback(array);
	  }
	}
	/**
	 * Reduce a given matrix or array to a new matrix or
	 * array with one less dimension, applying the given
	 * callback in the selected dimension.
	 * @param {Array | Matrix} mat
	 * @param {number} dim
	 * @param {Function} callback
	 * @return {Array | Matrix} res
	 */

	function reduce(mat, dim, callback) {
	  var size = Array.isArray(mat) ? arraySize(mat) : mat.size();

	  if (dim < 0 || dim >= size.length) {
	    // TODO: would be more clear when throwing a DimensionError here
	    throw new IndexError(dim, size.length);
	  }

	  if (isMatrix(mat)) {
	    return mat.create(_reduce(mat.valueOf(), dim, callback));
	  } else {
	    return _reduce(mat, dim, callback);
	  }
	}
	/**
	 * Recursively reduce a matrix
	 * @param {Array} mat
	 * @param {number} dim
	 * @param {Function} callback
	 * @returns {Array} ret
	 * @private
	 */

	function _reduce(mat, dim, callback) {
	  var i, ret, val, tran;

	  if (dim <= 0) {
	    if (!Array.isArray(mat[0])) {
	      val = mat[0];

	      for (i = 1; i < mat.length; i++) {
	        val = callback(val, mat[i]);
	      }

	      return val;
	    } else {
	      tran = _switch(mat);
	      ret = [];

	      for (i = 0; i < tran.length; i++) {
	        ret[i] = _reduce(tran[i], dim - 1, callback);
	      }

	      return ret;
	    }
	  } else {
	    ret = [];

	    for (i = 0; i < mat.length; i++) {
	      ret[i] = _reduce(mat[i], dim - 1, callback);
	    }

	    return ret;
	  }
	}
	/**
	 * Transpose a matrix
	 * @param {Array} mat
	 * @returns {Array} ret
	 * @private
	 */


	function _switch(mat) {
	  var I = mat.length;
	  var J = mat[0].length;
	  var i, j;
	  var ret = [];

	  for (j = 0; j < J; j++) {
	    var tmp = [];

	    for (i = 0; i < I; i++) {
	      tmp.push(mat[i][j]);
	    }

	    ret.push(tmp);
	  }

	  return ret;
	} // TODO: document function scatter

	var name$5 = 'isInteger';
	var dependencies$6 = ['typed'];
	var createIsInteger = /* #__PURE__ */factory(name$5, dependencies$6, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Test whether a value is an integer number.
	   * The function supports `number`, `BigNumber`, and `Fraction`.
	   *
	   * The function is evaluated element-wise in case of Array or Matrix input.
	   *
	   * Syntax:
	   *
	   *     math.isInteger(x)
	   *
	   * Examples:
	   *
	   *    math.isInteger(2)                     // returns true
	   *    math.isInteger(0)                     // returns true
	   *    math.isInteger(0.5)                   // returns false
	   *    math.isInteger(math.bignumber(500))   // returns true
	   *    math.isInteger(math.fraction(4))      // returns true
	   *    math.isInteger('3')                   // returns true
	   *    math.isInteger([3, 0.5, -2])          // returns [true, false, true]
	   *    math.isInteger(math.complex('2-4i')   // throws an error
	   *
	   * See also:
	   *
	   *    isNumeric, isPositive, isNegative, isZero
	   *
	   * @param {number | BigNumber | Fraction | Array | Matrix} x   Value to be tested
	   * @return {boolean}  Returns true when `x` contains a numeric, integer value.
	   *                    Throws an error in case of an unknown data type.
	   */
	  var isInteger$1 = typed(name$5, {
	    number: isInteger,
	    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
	    BigNumber: function BigNumber(x) {
	      return x.isInt();
	    },
	    Fraction: function Fraction(x) {
	      return x.d === 1 && isFinite(x.n);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, isInteger$1);
	    }
	  });
	  return isInteger$1;
	});

	var n1 = 'number';
	var n2 = 'number, number';
	function absNumber(a) {
	  return Math.abs(a);
	}
	absNumber.signature = n1;
	function addNumber(a, b) {
	  return a + b;
	}
	addNumber.signature = n2;
	function multiplyNumber(a, b) {
	  return a * b;
	}
	multiplyNumber.signature = n2;
	function unaryMinusNumber(x) {
	  return -x;
	}
	unaryMinusNumber.signature = n1;

	var n1$1 = 'number';
	function isNaNNumber(x) {
	  return Number.isNaN(x);
	}
	isNaNNumber.signature = n1$1;

	var name$6 = 'isNaN';
	var dependencies$7 = ['typed'];
	var createIsNaN = /* #__PURE__ */factory(name$6, dependencies$7, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Test whether a value is NaN (not a number).
	   * The function supports types `number`, `BigNumber`, `Fraction`, `Unit` and `Complex`.
	   *
	   * The function is evaluated element-wise in case of Array or Matrix input.
	   *
	   * Syntax:
	   *
	   *     math.isNaN(x)
	   *
	   * Examples:
	   *
	   *    math.isNaN(3)                     // returns false
	   *    math.isNaN(NaN)                   // returns true
	   *    math.isNaN(0)                     // returns false
	   *    math.isNaN(math.bignumber(NaN))   // returns true
	   *    math.isNaN(math.bignumber(0))     // returns false
	   *    math.isNaN(math.fraction(-2, 5))  // returns false
	   *    math.isNaN('-2')                  // returns false
	   *    math.isNaN([2, 0, -3, NaN]')      // returns [false, false, false, true]
	   *
	   * See also:
	   *
	   *    isNumeric, isNegative, isPositive, isZero, isInteger
	   *
	   * @param {number | BigNumber | Fraction | Unit | Array | Matrix} x  Value to be tested
	   * @return {boolean}  Returns true when `x` is NaN.
	   *                    Throws an error in case of an unknown data type.
	   */
	  return typed(name$6, {
	    number: isNaNNumber,
	    BigNumber: function BigNumber(x) {
	      return x.isNaN();
	    },
	    Fraction: function Fraction(x) {
	      return false;
	    },
	    Complex: function Complex(x) {
	      return x.isNaN();
	    },
	    Unit: function Unit(x) {
	      return Number.isNaN(x.value);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, Number.isNaN);
	    }
	  });
	});

	/**
	 * Compares two BigNumbers.
	 * @param {BigNumber} x       First value to compare
	 * @param {BigNumber} y       Second value to compare
	 * @param {number} [epsilon]  The maximum relative difference between x and y
	 *                            If epsilon is undefined or null, the function will
	 *                            test whether x and y are exactly equal.
	 * @return {boolean} whether the two numbers are nearly equal
	 */
	function nearlyEqual$1(x, y, epsilon) {
	  // if epsilon is null or undefined, test whether x and y are exactly equal
	  if (epsilon === null || epsilon === undefined) {
	    return x.eq(y);
	  } // use "==" operator, handles infinities


	  if (x.eq(y)) {
	    return true;
	  } // NaN


	  if (x.isNaN() || y.isNaN()) {
	    return false;
	  } // at this point x and y should be finite


	  if (x.isFinite() && y.isFinite()) {
	    // check numbers are very close, needed when comparing numbers near zero
	    var diff = x.minus(y).abs();

	    if (diff.isZero()) {
	      return true;
	    } else {
	      // use relative error
	      var max = x.constructor.max(x.abs(), y.abs());
	      return diff.lte(max.times(epsilon));
	    }
	  } // Infinite and Number or negative Infinite and positive Infinite cases


	  return false;
	}

	/**
	 * Test whether two complex values are equal provided a given epsilon.
	 * Does not use or change the global Complex.EPSILON setting
	 * @param {Complex} x
	 * @param {Complex} y
	 * @param {number} epsilon
	 * @returns {boolean}
	 */

	function complexEquals(x, y, epsilon) {
	  return nearlyEqual(x.re, y.re, epsilon) && nearlyEqual(x.im, y.im, epsilon);
	}

	var name$7 = 'equalScalar';
	var dependencies$8 = ['typed', 'config'];
	var createEqualScalar = /* #__PURE__ */factory(name$7, dependencies$8, function (_ref) {
	  var typed = _ref.typed,
	      config = _ref.config;

	  /**
	   * Test whether two scalar values are nearly equal.
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
	   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
	   * @private
	   */
	  var equalScalar = typed(name$7, {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x === y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.eq(y) || nearlyEqual$1(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.equals(y);
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return complexEquals(x, y, config.epsilon);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return equalScalar(x.value, y.value);
	    }
	  });
	  return equalScalar;
	});
	var createEqualScalarNumber = factory(name$7, ['typed', 'config'], function (_ref2) {
	  var typed = _ref2.typed,
	      config = _ref2.config;
	  return typed(name$7, {
	    'number, number': function numberNumber(x, y) {
	      return nearlyEqual(x, y, config.epsilon);
	    }
	  });
	});

	var name$8 = 'SparseMatrix';
	var dependencies$9 = ['typed', 'equalScalar', 'Matrix'];
	var createSparseMatrixClass = /* #__PURE__ */factory(name$8, dependencies$9, function (_ref) {
	  var typed = _ref.typed,
	      equalScalar = _ref.equalScalar,
	      Matrix = _ref.Matrix;

	  /**
	   * Sparse Matrix implementation. This type implements a Compressed Column Storage format
	   * for sparse matrices.
	   * @class SparseMatrix
	   */
	  function SparseMatrix(data, datatype) {
	    if (!(this instanceof SparseMatrix)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    }

	    if (datatype && !isString(datatype)) {
	      throw new Error('Invalid datatype: ' + datatype);
	    }

	    if (isMatrix(data)) {
	      // create from matrix
	      _createFromMatrix(this, data, datatype);
	    } else if (data && isArray$1(data.index) && isArray$1(data.ptr) && isArray$1(data.size)) {
	      // initialize fields
	      this._values = data.values;
	      this._index = data.index;
	      this._ptr = data.ptr;
	      this._size = data.size;
	      this._datatype = datatype || data.datatype;
	    } else if (isArray$1(data)) {
	      // create from array
	      _createFromArray(this, data, datatype);
	    } else if (data) {
	      // unsupported type
	      throw new TypeError('Unsupported type of data (' + typeOf(data) + ')');
	    } else {
	      // nothing provided
	      this._values = [];
	      this._index = [];
	      this._ptr = [0];
	      this._size = [0, 0];
	      this._datatype = datatype;
	    }
	  }

	  function _createFromMatrix(matrix, source, datatype) {
	    // check matrix type
	    if (source.type === 'SparseMatrix') {
	      // clone arrays
	      matrix._values = source._values ? clone(source._values) : undefined;
	      matrix._index = clone(source._index);
	      matrix._ptr = clone(source._ptr);
	      matrix._size = clone(source._size);
	      matrix._datatype = datatype || source._datatype;
	    } else {
	      // build from matrix data
	      _createFromArray(matrix, source.valueOf(), datatype || source._datatype);
	    }
	  }

	  function _createFromArray(matrix, data, datatype) {
	    // initialize fields
	    matrix._values = [];
	    matrix._index = [];
	    matrix._ptr = [];
	    matrix._datatype = datatype; // discover rows & columns, do not use math.size() to avoid looping array twice

	    var rows = data.length;
	    var columns = 0; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0;

	    if (isString(datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar; // convert 0 to the same datatype

	      zero = typed.convert(0, datatype);
	    } // check we have rows (empty array)


	    if (rows > 0) {
	      // column index
	      var j = 0;

	      do {
	        // store pointer to values index
	        matrix._ptr.push(matrix._index.length); // loop rows


	        for (var i = 0; i < rows; i++) {
	          // current row
	          var row = data[i]; // check row is an array

	          if (isArray$1(row)) {
	            // update columns if needed (only on first column)
	            if (j === 0 && columns < row.length) {
	              columns = row.length;
	            } // check row has column


	            if (j < row.length) {
	              // value
	              var v = row[j]; // check value != 0

	              if (!eq(v, zero)) {
	                // store value
	                matrix._values.push(v); // index


	                matrix._index.push(i);
	              }
	            }
	          } else {
	            // update columns if needed (only on first column)
	            if (j === 0 && columns < 1) {
	              columns = 1;
	            } // check value != 0 (row is a scalar)


	            if (!eq(row, zero)) {
	              // store value
	              matrix._values.push(row); // index


	              matrix._index.push(i);
	            }
	          }
	        } // increment index


	        j++;
	      } while (j < columns);
	    } // store number of values in ptr


	    matrix._ptr.push(matrix._index.length); // size


	    matrix._size = [rows, columns];
	  }

	  SparseMatrix.prototype = new Matrix();
	  /**
	   * Create a new SparseMatrix
	   */

	  SparseMatrix.prototype.createSparseMatrix = function (data, datatype) {
	    return new SparseMatrix(data, datatype);
	  };
	  /**
	   * Attach type information
	   */


	  SparseMatrix.prototype.type = 'SparseMatrix';
	  SparseMatrix.prototype.isSparseMatrix = true;
	  /**
	   * Get the matrix type
	   *
	   * Usage:
	   *    const matrixType = matrix.getDataType()  // retrieves the matrix type
	   *
	   * @memberOf SparseMatrix
	   * @return {string}   type information; if multiple types are found from the Matrix, it will return "mixed"
	   */

	  SparseMatrix.prototype.getDataType = function () {
	    return getArrayDataType(this._values, typeOf);
	  };
	  /**
	   * Get the storage format used by the matrix.
	   *
	   * Usage:
	   *     const format = matrix.storage()   // retrieve storage format
	   *
	   * @memberof SparseMatrix
	   * @return {string}           The storage format.
	   */


	  SparseMatrix.prototype.storage = function () {
	    return 'sparse';
	  };
	  /**
	   * Get the datatype of the data stored in the matrix.
	   *
	   * Usage:
	   *     const format = matrix.datatype()    // retrieve matrix datatype
	   *
	   * @memberof SparseMatrix
	   * @return {string}           The datatype.
	   */


	  SparseMatrix.prototype.datatype = function () {
	    return this._datatype;
	  };
	  /**
	   * Create a new SparseMatrix
	   * @memberof SparseMatrix
	   * @param {Array} data
	   * @param {string} [datatype]
	   */


	  SparseMatrix.prototype.create = function (data, datatype) {
	    return new SparseMatrix(data, datatype);
	  };
	  /**
	   * Get the matrix density.
	   *
	   * Usage:
	   *     const density = matrix.density()                   // retrieve matrix density
	   *
	   * @memberof SparseMatrix
	   * @return {number}           The matrix density.
	   */


	  SparseMatrix.prototype.density = function () {
	    // rows & columns
	    var rows = this._size[0];
	    var columns = this._size[1]; // calculate density

	    return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
	  };
	  /**
	   * Get a subset of the matrix, or replace a subset of the matrix.
	   *
	   * Usage:
	   *     const subset = matrix.subset(index)               // retrieve subset
	   *     const value = matrix.subset(index, replacement)   // replace subset
	   *
	   * @memberof SparseMatrix
	   * @param {Index} index
	   * @param {Array | Matrix | *} [replacement]
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be filled with zeros.
	   */


	  SparseMatrix.prototype.subset = function (index, replacement, defaultValue) {
	    // check it is a pattern matrix
	    if (!this._values) {
	      throw new Error('Cannot invoke subset on a Pattern only matrix');
	    } // check arguments


	    switch (arguments.length) {
	      case 1:
	        return _getsubset(this, index);
	      // intentional fall through

	      case 2:
	      case 3:
	        return _setsubset(this, index, replacement, defaultValue);

	      default:
	        throw new SyntaxError('Wrong number of arguments');
	    }
	  };

	  function _getsubset(matrix, idx) {
	    // check idx
	    if (!isIndex(idx)) {
	      throw new TypeError('Invalid index');
	    }

	    var isScalar = idx.isScalar();

	    if (isScalar) {
	      // return a scalar
	      return matrix.get(idx.min());
	    } // validate dimensions


	    var size = idx.size();

	    if (size.length !== matrix._size.length) {
	      throw new DimensionError(size.length, matrix._size.length);
	    } // vars


	    var i, ii, k, kk; // validate if any of the ranges in the index is out of range

	    var min = idx.min();
	    var max = idx.max();

	    for (i = 0, ii = matrix._size.length; i < ii; i++) {
	      validateIndex(min[i], matrix._size[i]);
	      validateIndex(max[i], matrix._size[i]);
	    } // matrix arrays


	    var mvalues = matrix._values;
	    var mindex = matrix._index;
	    var mptr = matrix._ptr; // rows & columns dimensions for result matrix

	    var rows = idx.dimension(0);
	    var columns = idx.dimension(1); // workspace & permutation vector

	    var w = [];
	    var pv = []; // loop rows in resulting matrix

	    rows.forEach(function (i, r) {
	      // update permutation vector
	      pv[i] = r[0]; // mark i in workspace

	      w[i] = true;
	    }); // result matrix arrays

	    var values = mvalues ? [] : undefined;
	    var index = [];
	    var ptr = []; // loop columns in result matrix

	    columns.forEach(function (j) {
	      // update ptr
	      ptr.push(index.length); // loop values in column j

	      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
	        // row
	        i = mindex[k]; // check row is in result matrix

	        if (w[i] === true) {
	          // push index
	          index.push(pv[i]); // check we need to process values

	          if (values) {
	            values.push(mvalues[k]);
	          }
	        }
	      }
	    }); // update ptr

	    ptr.push(index.length); // return matrix

	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: size,
	      datatype: matrix._datatype
	    });
	  }

	  function _setsubset(matrix, index, submatrix, defaultValue) {
	    // check index
	    if (!index || index.isIndex !== true) {
	      throw new TypeError('Invalid index');
	    } // get index size and check whether the index contains a single value


	    var iSize = index.size();
	    var isScalar = index.isScalar(); // calculate the size of the submatrix, and convert it into an Array if needed

	    var sSize;

	    if (isMatrix(submatrix)) {
	      // submatrix size
	      sSize = submatrix.size(); // use array representation

	      submatrix = submatrix.toArray();
	    } else {
	      // get submatrix size (array, scalar)
	      sSize = arraySize(submatrix);
	    } // check index is a scalar


	    if (isScalar) {
	      // verify submatrix is a scalar
	      if (sSize.length !== 0) {
	        throw new TypeError('Scalar expected');
	      } // set value


	      matrix.set(index.min(), submatrix, defaultValue);
	    } else {
	      // validate dimensions, index size must be one or two dimensions
	      if (iSize.length !== 1 && iSize.length !== 2) {
	        throw new DimensionError(iSize.length, matrix._size.length, '<');
	      } // check submatrix and index have the same dimensions


	      if (sSize.length < iSize.length) {
	        // calculate number of missing outer dimensions
	        var i = 0;
	        var outer = 0;

	        while (iSize[i] === 1 && sSize[i] === 1) {
	          i++;
	        }

	        while (iSize[i] === 1) {
	          outer++;
	          i++;
	        } // unsqueeze both outer and inner dimensions


	        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
	      } // check whether the size of the submatrix matches the index size


	      if (!deepStrictEqual(iSize, sSize)) {
	        throw new DimensionError(iSize, sSize, '>');
	      } // offsets


	      var x0 = index.min()[0];
	      var y0 = index.min()[1]; // submatrix rows and columns

	      var m = sSize[0];
	      var n = sSize[1]; // loop submatrix

	      for (var x = 0; x < m; x++) {
	        // loop columns
	        for (var y = 0; y < n; y++) {
	          // value at i, j
	          var v = submatrix[x][y]; // invoke set (zero value will remove entry from matrix)

	          matrix.set([x + x0, y + y0], v, defaultValue);
	        }
	      }
	    }

	    return matrix;
	  }
	  /**
	   * Get a single element from the matrix.
	   * @memberof SparseMatrix
	   * @param {number[]} index   Zero-based index
	   * @return {*} value
	   */


	  SparseMatrix.prototype.get = function (index) {
	    if (!isArray$1(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length !== this._size.length) {
	      throw new DimensionError(index.length, this._size.length);
	    } // check it is a pattern matrix


	    if (!this._values) {
	      throw new Error('Cannot invoke get on a Pattern only matrix');
	    } // row and column


	    var i = index[0];
	    var j = index[1]; // check i, j are valid

	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[1]); // find value index

	    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index); // check k is prior to next column k and it is in the correct row


	    if (k < this._ptr[j + 1] && this._index[k] === i) {
	      return this._values[k];
	    }

	    return 0;
	  };
	  /**
	   * Replace a single element in the matrix.
	   * @memberof SparseMatrix
	   * @param {number[]} index   Zero-based index
	   * @param {*} v
	   * @param {*} [defaultValue]        Default value, filled in on new entries when
	   *                                  the matrix is resized. If not provided,
	   *                                  new matrix elements will be set to zero.
	   * @return {SparseMatrix} self
	   */


	  SparseMatrix.prototype.set = function (index, v, defaultValue) {
	    if (!isArray$1(index)) {
	      throw new TypeError('Array expected');
	    }

	    if (index.length !== this._size.length) {
	      throw new DimensionError(index.length, this._size.length);
	    } // check it is a pattern matrix


	    if (!this._values) {
	      throw new Error('Cannot invoke set on a Pattern only matrix');
	    } // row and column


	    var i = index[0];
	    var j = index[1]; // rows & columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0;

	    if (isString(this._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [this._datatype, this._datatype]) || equalScalar; // convert 0 to the same datatype

	      zero = typed.convert(0, this._datatype);
	    } // check we need to resize matrix


	    if (i > rows - 1 || j > columns - 1) {
	      // resize matrix
	      _resize(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue); // update rows & columns


	      rows = this._size[0];
	      columns = this._size[1];
	    } // check i, j are valid


	    validateIndex(i, rows);
	    validateIndex(j, columns); // find value index

	    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index); // check k is prior to next column k and it is in the correct row


	    if (k < this._ptr[j + 1] && this._index[k] === i) {
	      // check value != 0
	      if (!eq(v, zero)) {
	        // update value
	        this._values[k] = v;
	      } else {
	        // remove value from matrix
	        _remove(k, j, this._values, this._index, this._ptr);
	      }
	    } else {
	      // insert value @ (i, j)
	      _insert(k, i, j, v, this._values, this._index, this._ptr);
	    }

	    return this;
	  };

	  function _getValueIndex(i, top, bottom, index) {
	    // check row is on the bottom side
	    if (bottom - top === 0) {
	      return bottom;
	    } // loop rows [top, bottom[


	    for (var r = top; r < bottom; r++) {
	      // check we found value index
	      if (index[r] === i) {
	        return r;
	      }
	    } // we did not find row


	    return top;
	  }

	  function _remove(k, j, values, index, ptr) {
	    // remove value @ k
	    values.splice(k, 1);
	    index.splice(k, 1); // update pointers

	    for (var x = j + 1; x < ptr.length; x++) {
	      ptr[x]--;
	    }
	  }

	  function _insert(k, i, j, v, values, index, ptr) {
	    // insert value
	    values.splice(k, 0, v); // update row for k

	    index.splice(k, 0, i); // update column pointers

	    for (var x = j + 1; x < ptr.length; x++) {
	      ptr[x]++;
	    }
	  }
	  /**
	   * Resize the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (resize in place).
	   *
	   * @memberof SparseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {*} [defaultValue=0]      Default value, filled in on new entries.
	   *                                  If not provided, the matrix elements will
	   *                                  be filled with zeros.
	   * @param {boolean} [copy]          Return a resized copy of the matrix
	   *
	   * @return {Matrix}                 The resized matrix
	   */


	  SparseMatrix.prototype.resize = function (size, defaultValue, copy) {
	    // validate arguments
	    if (!isArray$1(size)) {
	      throw new TypeError('Array expected');
	    }

	    if (size.length !== 2) {
	      throw new Error('Only two dimensions matrix are supported');
	    } // check sizes


	    size.forEach(function (value) {
	      if (!isNumber(value) || !isInteger(value) || value < 0) {
	        throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format$2(size) + ')');
	      }
	    }); // matrix to resize

	    var m = copy ? this.clone() : this; // resize matrix

	    return _resize(m, size[0], size[1], defaultValue);
	  };

	  function _resize(matrix, rows, columns, defaultValue) {
	    // value to insert at the time of growing matrix
	    var value = defaultValue || 0; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0;

	    if (isString(matrix._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar; // convert 0 to the same datatype

	      zero = typed.convert(0, matrix._datatype); // convert value to the same datatype

	      value = typed.convert(value, matrix._datatype);
	    } // should we insert the value?


	    var ins = !eq(value, zero); // old columns and rows

	    var r = matrix._size[0];
	    var c = matrix._size[1];
	    var i, j, k; // check we need to increase columns

	    if (columns > c) {
	      // loop new columns
	      for (j = c; j < columns; j++) {
	        // update matrix._ptr for current column
	        matrix._ptr[j] = matrix._values.length; // check we need to insert matrix._values

	        if (ins) {
	          // loop rows
	          for (i = 0; i < r; i++) {
	            // add new matrix._values
	            matrix._values.push(value); // update matrix._index


	            matrix._index.push(i);
	          }
	        }
	      } // store number of matrix._values in matrix._ptr


	      matrix._ptr[columns] = matrix._values.length;
	    } else if (columns < c) {
	      // truncate matrix._ptr
	      matrix._ptr.splice(columns + 1, c - columns); // truncate matrix._values and matrix._index


	      matrix._values.splice(matrix._ptr[columns], matrix._values.length);

	      matrix._index.splice(matrix._ptr[columns], matrix._index.length);
	    } // update columns


	    c = columns; // check we need to increase rows

	    if (rows > r) {
	      // check we have to insert values
	      if (ins) {
	        // inserts
	        var n = 0; // loop columns

	        for (j = 0; j < c; j++) {
	          // update matrix._ptr for current column
	          matrix._ptr[j] = matrix._ptr[j] + n; // where to insert matrix._values

	          k = matrix._ptr[j + 1] + n; // pointer

	          var p = 0; // loop new rows, initialize pointer

	          for (i = r; i < rows; i++, p++) {
	            // add value
	            matrix._values.splice(k + p, 0, value); // update matrix._index


	            matrix._index.splice(k + p, 0, i); // increment inserts


	            n++;
	          }
	        } // store number of matrix._values in matrix._ptr


	        matrix._ptr[c] = matrix._values.length;
	      }
	    } else if (rows < r) {
	      // deletes
	      var d = 0; // loop columns

	      for (j = 0; j < c; j++) {
	        // update matrix._ptr for current column
	        matrix._ptr[j] = matrix._ptr[j] - d; // where matrix._values start for next column

	        var k0 = matrix._ptr[j];
	        var k1 = matrix._ptr[j + 1] - d; // loop matrix._index

	        for (k = k0; k < k1; k++) {
	          // row
	          i = matrix._index[k]; // check we need to delete value and matrix._index

	          if (i > rows - 1) {
	            // remove value
	            matrix._values.splice(k, 1); // remove item from matrix._index


	            matrix._index.splice(k, 1); // increase deletes


	            d++;
	          }
	        }
	      } // update matrix._ptr for current column


	      matrix._ptr[j] = matrix._values.length;
	    } // update matrix._size


	    matrix._size[0] = rows;
	    matrix._size[1] = columns; // return matrix

	    return matrix;
	  }
	  /**
	   * Reshape the matrix to the given size. Returns a copy of the matrix when
	   * `copy=true`, otherwise return the matrix itself (reshape in place).
	   *
	   * NOTE: This might be better suited to copy by default, instead of modifying
	   *       in place. For now, it operates in place to remain consistent with
	   *       resize().
	   *
	   * @memberof SparseMatrix
	   * @param {number[]} size           The new size the matrix should have.
	   * @param {boolean} [copy]          Return a reshaped copy of the matrix
	   *
	   * @return {Matrix}                 The reshaped matrix
	   */


	  SparseMatrix.prototype.reshape = function (size, copy) {
	    // validate arguments
	    if (!isArray$1(size)) {
	      throw new TypeError('Array expected');
	    }

	    if (size.length !== 2) {
	      throw new Error('Sparse matrices can only be reshaped in two dimensions');
	    } // check sizes


	    size.forEach(function (value) {
	      if (!isNumber(value) || !isInteger(value) || value < 0) {
	        throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + format$2(size) + ')');
	      }
	    }); // m * n must not change

	    if (this._size[0] * this._size[1] !== size[0] * size[1]) {
	      throw new Error('Reshaping sparse matrix will result in the wrong number of elements');
	    } // matrix to reshape


	    var m = copy ? this.clone() : this; // return unchanged if the same shape

	    if (this._size[0] === size[0] && this._size[1] === size[1]) {
	      return m;
	    } // Convert to COO format (generate a column index)


	    var colIndex = [];

	    for (var i = 0; i < m._ptr.length; i++) {
	      for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
	        colIndex.push(i);
	      }
	    } // Clone the values array


	    var values = m._values.slice(); // Clone the row index array


	    var rowIndex = m._index.slice(); // Transform the (row, column) indices


	    for (var _i = 0; _i < m._index.length; _i++) {
	      var r1 = rowIndex[_i];
	      var c1 = colIndex[_i];
	      var flat = r1 * m._size[1] + c1;
	      colIndex[_i] = flat % size[1];
	      rowIndex[_i] = Math.floor(flat / size[1]);
	    } // Now reshaping is supposed to preserve the row-major order, BUT these sparse matrices are stored
	    // in column-major order, so we have to reorder the value array now. One option is to use a multisort,
	    // sorting several arrays based on some other array.
	    // OR, we could easily just:
	    // 1. Remove all values from the matrix


	    m._values.length = 0;
	    m._index.length = 0;
	    m._ptr.length = size[1] + 1;
	    m._size = size.slice();

	    for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
	      m._ptr[_i2] = 0;
	    } // 2. Re-insert all elements in the proper order (simplified code from SparseMatrix.prototype.set)
	    // This step is probably the most time-consuming


	    for (var h = 0; h < values.length; h++) {
	      var _i3 = rowIndex[h];
	      var _j = colIndex[h];
	      var v = values[h];

	      var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);

	      _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
	    } // The value indices are inserted out of order, but apparently that's... still OK?


	    return m;
	  };
	  /**
	   * Create a clone of the matrix
	   * @memberof SparseMatrix
	   * @return {SparseMatrix} clone
	   */


	  SparseMatrix.prototype.clone = function () {
	    var m = new SparseMatrix({
	      values: this._values ? clone(this._values) : undefined,
	      index: clone(this._index),
	      ptr: clone(this._ptr),
	      size: clone(this._size),
	      datatype: this._datatype
	    });
	    return m;
	  };
	  /**
	   * Retrieve the size of the matrix.
	   * @memberof SparseMatrix
	   * @returns {number[]} size
	   */


	  SparseMatrix.prototype.size = function () {
	    return this._size.slice(0); // copy the Array
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on
	   * each entry of the matrix.
	   * @memberof SparseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   *
	   * @return {SparseMatrix} matrix
	   */


	  SparseMatrix.prototype.map = function (callback, skipZeros) {
	    // check it is a pattern matrix
	    if (!this._values) {
	      throw new Error('Cannot invoke map on a Pattern only matrix');
	    } // matrix instance


	    var me = this; // rows and columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // invoke callback

	    var invoke = function invoke(v, i, j) {
	      // invoke callback
	      return callback(v, [i, j], me);
	    }; // invoke _map


	    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
	  };
	  /**
	   * Create a new matrix with the results of the callback function executed on the interval
	   * [minRow..maxRow, minColumn..maxColumn].
	   */


	  function _map(matrix, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
	    // result arrays
	    var values = [];
	    var index = [];
	    var ptr = []; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0;

	    if (isString(matrix._datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [matrix._datatype, matrix._datatype]) || equalScalar; // convert 0 to the same datatype

	      zero = typed.convert(0, matrix._datatype);
	    } // invoke callback


	    var invoke = function invoke(v, x, y) {
	      // invoke callback
	      v = callback(v, x, y); // check value != 0

	      if (!eq(v, zero)) {
	        // store value
	        values.push(v); // index

	        index.push(x);
	      }
	    }; // loop columns


	    for (var j = minColumn; j <= maxColumn; j++) {
	      // store pointer to values index
	      ptr.push(values.length); // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]

	      var k0 = matrix._ptr[j];
	      var k1 = matrix._ptr[j + 1];

	      if (skipZeros) {
	        // loop k within [k0, k1[
	        for (var k = k0; k < k1; k++) {
	          // row index
	          var i = matrix._index[k]; // check i is in range

	          if (i >= minRow && i <= maxRow) {
	            // value @ k
	            invoke(matrix._values[k], i - minRow, j - minColumn);
	          }
	        }
	      } else {
	        // create a cache holding all defined values
	        var _values = {};

	        for (var _k = k0; _k < k1; _k++) {
	          var _i4 = matrix._index[_k];
	          _values[_i4] = matrix._values[_k];
	        } // loop over all rows (indexes can be unordered so we can't use that),
	        // and either read the value or zero


	        for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
	          var value = _i5 in _values ? _values[_i5] : 0;
	          invoke(value, _i5 - minRow, j - minColumn);
	        }
	      }
	    } // store number of values in ptr


	    ptr.push(values.length); // return sparse matrix

	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
	    });
	  }
	  /**
	   * Execute a callback function on each entry of the matrix.
	   * @memberof SparseMatrix
	   * @param {Function} callback   The callback function is invoked with three
	   *                              parameters: the value of the element, the index
	   *                              of the element, and the Matrix being traversed.
	   * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
	   */


	  SparseMatrix.prototype.forEach = function (callback, skipZeros) {
	    // check it is a pattern matrix
	    if (!this._values) {
	      throw new Error('Cannot invoke forEach on a Pattern only matrix');
	    } // matrix instance


	    var me = this; // rows and columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1];

	      if (skipZeros) {
	        // loop k within [k0, k1[
	        for (var k = k0; k < k1; k++) {
	          // row index
	          var i = this._index[k]; // value @ k

	          callback(this._values[k], [i, j], me);
	        }
	      } else {
	        // create a cache holding all defined values
	        var values = {};

	        for (var _k2 = k0; _k2 < k1; _k2++) {
	          var _i6 = this._index[_k2];
	          values[_i6] = this._values[_k2];
	        } // loop over all rows (indexes can be unordered so we can't use that),
	        // and either read the value or zero


	        for (var _i7 = 0; _i7 < rows; _i7++) {
	          var value = _i7 in values ? values[_i7] : 0;
	          callback(value, [_i7, j], me);
	        }
	      }
	    }
	  };
	  /**
	   * Create an Array with a copy of the data of the SparseMatrix
	   * @memberof SparseMatrix
	   * @returns {Array} array
	   */


	  SparseMatrix.prototype.toArray = function () {
	    return _toArray(this._values, this._index, this._ptr, this._size, true);
	  };
	  /**
	   * Get the primitive value of the SparseMatrix: a two dimensions array
	   * @memberof SparseMatrix
	   * @returns {Array} array
	   */


	  SparseMatrix.prototype.valueOf = function () {
	    return _toArray(this._values, this._index, this._ptr, this._size, false);
	  };

	  function _toArray(values, index, ptr, size, copy) {
	    // rows and columns
	    var rows = size[0];
	    var columns = size[1]; // result

	    var a = []; // vars

	    var i, j; // initialize array

	    for (i = 0; i < rows; i++) {
	      a[i] = [];

	      for (j = 0; j < columns; j++) {
	        a[i][j] = 0;
	      }
	    } // loop columns


	    for (j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = ptr[j];
	      var k1 = ptr[j + 1]; // loop k within [k0, k1[

	      for (var k = k0; k < k1; k++) {
	        // row index
	        i = index[k]; // set value (use one for pattern matrix)

	        a[i][j] = values ? copy ? clone(values[k]) : values[k] : 1;
	      }
	    }

	    return a;
	  }
	  /**
	   * Get a string representation of the matrix, with optional formatting options.
	   * @memberof SparseMatrix
	   * @param {Object | number | Function} [options]  Formatting options. See
	   *                                                lib/utils/number:format for a
	   *                                                description of the available
	   *                                                options.
	   * @returns {string} str
	   */


	  SparseMatrix.prototype.format = function (options) {
	    // rows and columns
	    var rows = this._size[0];
	    var columns = this._size[1]; // density

	    var density = this.density(); // rows & columns

	    var str = 'Sparse Matrix [' + format$2(rows, options) + ' x ' + format$2(columns, options) + '] density: ' + format$2(density, options) + '\n'; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1]; // loop k within [k0, k1[

	      for (var k = k0; k < k1; k++) {
	        // row index
	        var i = this._index[k]; // append value

	        str += '\n    (' + format$2(i, options) + ', ' + format$2(j, options) + ') ==> ' + (this._values ? format$2(this._values[k], options) : 'X');
	      }
	    }

	    return str;
	  };
	  /**
	   * Get a string representation of the matrix
	   * @memberof SparseMatrix
	   * @returns {string} str
	   */


	  SparseMatrix.prototype.toString = function () {
	    return format$2(this.toArray());
	  };
	  /**
	   * Get a JSON representation of the matrix
	   * @memberof SparseMatrix
	   * @returns {Object}
	   */


	  SparseMatrix.prototype.toJSON = function () {
	    return {
	      mathjs: 'SparseMatrix',
	      values: this._values,
	      index: this._index,
	      ptr: this._ptr,
	      size: this._size,
	      datatype: this._datatype
	    };
	  };
	  /**
	   * Get the kth Matrix diagonal.
	   *
	   * @memberof SparseMatrix
	   * @param {number | BigNumber} [k=0]     The kth diagonal where the vector will retrieved.
	   *
	   * @returns {Matrix}                     The matrix vector with the diagonal values.
	   */


	  SparseMatrix.prototype.diagonal = function (k) {
	    // validate k if any
	    if (k) {
	      // convert BigNumber to a number
	      if (isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows & columns

	    var rows = this._size[0];
	    var columns = this._size[1]; // number diagonal values

	    var n = Math.min(rows - kSub, columns - kSuper); // diagonal arrays

	    var values = [];
	    var index = [];
	    var ptr = []; // initial ptr value

	    ptr[0] = 0; // loop columns

	    for (var j = kSuper; j < columns && values.length < n; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = this._ptr[j];
	      var k1 = this._ptr[j + 1]; // loop x within [k0, k1[

	      for (var x = k0; x < k1; x++) {
	        // row index
	        var i = this._index[x]; // check row

	        if (i === j - kSuper + kSub) {
	          // value on this column
	          values.push(this._values[x]); // store row

	          index[values.length - 1] = i - kSub; // exit loop

	          break;
	        }
	      }
	    } // close ptr


	    ptr.push(values.length); // return matrix

	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [n, 1]
	    });
	  };
	  /**
	   * Generate a matrix from a JSON object
	   * @memberof SparseMatrix
	   * @param {Object} json  An object structured like
	   *                       `{"mathjs": "SparseMatrix", "values": [], "index": [], "ptr": [], "size": []}`,
	   *                       where mathjs is optional
	   * @returns {SparseMatrix}
	   */


	  SparseMatrix.fromJSON = function (json) {
	    return new SparseMatrix(json);
	  };
	  /**
	   * Create a diagonal matrix.
	   *
	   * @memberof SparseMatrix
	   * @param {Array} size                       The matrix size.
	   * @param {number | Array | Matrix } value   The values for the diagonal.
	   * @param {number | BigNumber} [k=0]         The kth diagonal where the vector will be filled in.
	   * @param {number} [defaultValue]            The default value for non-diagonal
	   * @param {string} [datatype]                The Matrix datatype, values must be of this datatype.
	   *
	   * @returns {SparseMatrix}
	   */


	  SparseMatrix.diagonal = function (size, value, k, defaultValue, datatype) {
	    if (!isArray$1(size)) {
	      throw new TypeError('Array expected, size parameter');
	    }

	    if (size.length !== 2) {
	      throw new Error('Only two dimensions matrix are supported');
	    } // map size & validate


	    size = size.map(function (s) {
	      // check it is a big number
	      if (isBigNumber(s)) {
	        // convert it
	        s = s.toNumber();
	      } // validate arguments


	      if (!isNumber(s) || !isInteger(s) || s < 1) {
	        throw new Error('Size values must be positive integers');
	      }

	      return s;
	    }); // validate k if any

	    if (k) {
	      // convert BigNumber to a number
	      if (isBigNumber(k)) {
	        k = k.toNumber();
	      } // is must be an integer


	      if (!isNumber(k) || !isInteger(k)) {
	        throw new TypeError('The parameter k must be an integer number');
	      }
	    } else {
	      // default value
	      k = 0;
	    } // equal signature to use


	    var eq = equalScalar; // zero value

	    var zero = 0;

	    if (isString(datatype)) {
	      // find signature that matches (datatype, datatype)
	      eq = typed.find(equalScalar, [datatype, datatype]) || equalScalar; // convert 0 to the same datatype

	      zero = typed.convert(0, datatype);
	    }

	    var kSuper = k > 0 ? k : 0;
	    var kSub = k < 0 ? -k : 0; // rows and columns

	    var rows = size[0];
	    var columns = size[1]; // number of non-zero items

	    var n = Math.min(rows - kSub, columns - kSuper); // value extraction function

	    var _value; // check value


	    if (isArray$1(value)) {
	      // validate array
	      if (value.length !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid value array length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value[i];
	      };
	    } else if (isMatrix(value)) {
	      // matrix size
	      var ms = value.size(); // validate matrix

	      if (ms.length !== 1 || ms[0] !== n) {
	        // number of values in array must be n
	        throw new Error('Invalid matrix length');
	      } // define function


	      _value = function _value(i) {
	        // return value @ i
	        return value.get([i]);
	      };
	    } else {
	      // define function
	      _value = function _value() {
	        // return value
	        return value;
	      };
	    } // create arrays


	    var values = [];
	    var index = [];
	    var ptr = []; // loop items

	    for (var j = 0; j < columns; j++) {
	      // number of rows with value
	      ptr.push(values.length); // diagonal index

	      var i = j - kSuper; // check we need to set diagonal value

	      if (i >= 0 && i < n) {
	        // get value @ i
	        var v = _value(i); // check for zero


	        if (!eq(v, zero)) {
	          // column
	          index.push(i + kSub); // add value

	          values.push(v);
	        }
	      }
	    } // last value should be number of values


	    ptr.push(values.length); // create SparseMatrix

	    return new SparseMatrix({
	      values: values,
	      index: index,
	      ptr: ptr,
	      size: [rows, columns]
	    });
	  };
	  /**
	   * Swap rows i and j in Matrix.
	   *
	   * @memberof SparseMatrix
	   * @param {number} i       Matrix row index 1
	   * @param {number} j       Matrix row index 2
	   *
	   * @return {Matrix}        The matrix reference
	   */


	  SparseMatrix.prototype.swapRows = function (i, j) {
	    // check index
	    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
	      throw new Error('Row index must be positive integers');
	    } // check dimensions


	    if (this._size.length !== 2) {
	      throw new Error('Only two dimensional matrix is supported');
	    } // validate index


	    validateIndex(i, this._size[0]);
	    validateIndex(j, this._size[0]); // swap rows

	    SparseMatrix._swapRows(i, j, this._size[1], this._values, this._index, this._ptr); // return current instance


	    return this;
	  };
	  /**
	   * Loop rows with data in column j.
	   *
	   * @param {number} j            Column
	   * @param {Array} values        Matrix values
	   * @param {Array} index         Matrix row indeces
	   * @param {Array} ptr           Matrix column pointers
	   * @param {Function} callback   Callback function invoked for every row in column j
	   */


	  SparseMatrix._forEachRow = function (j, values, index, ptr, callback) {
	    // indeces for column j
	    var k0 = ptr[j];
	    var k1 = ptr[j + 1]; // loop

	    for (var k = k0; k < k1; k++) {
	      // invoke callback
	      callback(index[k], values[k]);
	    }
	  };
	  /**
	   * Swap rows x and y in Sparse Matrix data structures.
	   *
	   * @param {number} x         Matrix row index 1
	   * @param {number} y         Matrix row index 2
	   * @param {number} columns   Number of columns in matrix
	   * @param {Array} values     Matrix values
	   * @param {Array} index      Matrix row indeces
	   * @param {Array} ptr        Matrix column pointers
	   */


	  SparseMatrix._swapRows = function (x, y, columns, values, index, ptr) {
	    // loop columns
	    for (var j = 0; j < columns; j++) {
	      // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]
	      var k0 = ptr[j];
	      var k1 = ptr[j + 1]; // find value index @ x

	      var kx = _getValueIndex(x, k0, k1, index); // find value index @ x


	      var ky = _getValueIndex(y, k0, k1, index); // check both rows exist in matrix


	      if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
	        // swap values (check for pattern matrix)
	        if (values) {
	          var v = values[kx];
	          values[kx] = values[ky];
	          values[ky] = v;
	        } // next column


	        continue;
	      } // check x row exist & no y row


	      if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
	        // value @ x (check for pattern matrix)
	        var vx = values ? values[kx] : undefined; // insert value @ y

	        index.splice(ky, 0, y);

	        if (values) {
	          values.splice(ky, 0, vx);
	        } // remove value @ x (adjust array index if needed)


	        index.splice(ky <= kx ? kx + 1 : kx, 1);

	        if (values) {
	          values.splice(ky <= kx ? kx + 1 : kx, 1);
	        } // next column


	        continue;
	      } // check y row exist & no x row


	      if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
	        // value @ y (check for pattern matrix)
	        var vy = values ? values[ky] : undefined; // insert value @ x

	        index.splice(kx, 0, x);

	        if (values) {
	          values.splice(kx, 0, vy);
	        } // remove value @ y (adjust array index if needed)


	        index.splice(kx <= ky ? ky + 1 : ky, 1);

	        if (values) {
	          values.splice(kx <= ky ? ky + 1 : ky, 1);
	        }
	      }
	    }
	  };

	  return SparseMatrix;
	}, {
	  isClass: true
	});

	var name$9 = 'number';
	var dependencies$a = ['typed'];
	var createNumber = /* #__PURE__ */factory(name$9, dependencies$a, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Create a number or convert a string, boolean, or unit to a number.
	   * When value is a matrix, all elements will be converted to number.
	   *
	   * Syntax:
	   *
	   *    math.number(value)
	   *    math.number(unit, valuelessUnit)
	   *
	   * Examples:
	   *
	   *    math.number(2)                         // returns number 2
	   *    math.number('7.2')                     // returns number 7.2
	   *    math.number(true)                      // returns number 1
	   *    math.number([true, false, true, true]) // returns [1, 0, 1, 1]
	   *    math.number(math.unit('52cm'), 'm')    // returns 0.52
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, matrix, string, unit
	   *
	   * @param {string | number | BigNumber | Fraction | boolean | Array | Matrix | Unit | null} [value]  Value to be converted
	   * @param {Unit | string} [valuelessUnit] A valueless unit, used to convert a unit to a number
	   * @return {number | Array | Matrix} The created number
	   */
	  var number = typed('number', {
	    '': function _() {
	      return 0;
	    },
	    number: function number(x) {
	      return x;
	    },
	    string: function string(x) {
	      if (x === 'NaN') return NaN;
	      var num = Number(x);

	      if (isNaN(num)) {
	        throw new SyntaxError('String "' + x + '" is no valid number');
	      }

	      return num;
	    },
	    BigNumber: function BigNumber(x) {
	      return x.toNumber();
	    },
	    Fraction: function Fraction(x) {
	      return x.valueOf();
	    },
	    Unit: function Unit(x) {
	      throw new Error('Second argument with valueless unit expected');
	    },
	    "null": function _null(x) {
	      return 0;
	    },
	    'Unit, string | Unit': function UnitStringUnit(unit, valuelessUnit) {
	      return unit.toNumber(valuelessUnit);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, number);
	    }
	  }); // reviver function to parse a JSON object like:
	  //
	  //     {"mathjs":"number","value":"2.3"}
	  //
	  // into a number 2.3

	  number.fromJSON = function (json) {
	    return parseFloat(json.value);
	  };

	  return number;
	});

	var name$a = 'bignumber';
	var dependencies$b = ['typed', 'BigNumber'];
	var createBignumber = /* #__PURE__ */factory(name$a, dependencies$b, function (_ref) {
	  var typed = _ref.typed,
	      BigNumber = _ref.BigNumber;

	  /**
	   * Create a BigNumber, which can store numbers with arbitrary precision.
	   * When a matrix is provided, all elements will be converted to BigNumber.
	   *
	   * Syntax:
	   *
	   *    math.bignumber(x)
	   *
	   * Examples:
	   *
	   *    0.1 + 0.2                                  // returns number 0.30000000000000004
	   *    math.bignumber(0.1) + math.bignumber(0.2)  // returns BigNumber 0.3
	   *
	   *
	   *    7.2e500                                    // returns number Infinity
	   *    math.bignumber('7.2e500')                  // returns BigNumber 7.2e500
	   *
	   * See also:
	   *
	   *    boolean, complex, index, matrix, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix | boolean | null} [value]  Value for the big number,
	   *                                                    0 by default.
	   * @returns {BigNumber} The created bignumber
	   */
	  var bignumber = typed('bignumber', {
	    '': function _() {
	      return new BigNumber(0);
	    },
	    number: function number(x) {
	      // convert to string to prevent errors in case of >15 digits
	      return new BigNumber(x + '');
	    },
	    string: function string(x) {
	      return new BigNumber(x);
	    },
	    BigNumber: function BigNumber(x) {
	      // we assume a BigNumber is immutable
	      return x;
	    },
	    Fraction: function Fraction(x) {
	      return new BigNumber(x.n).div(x.d).times(x.s);
	    },
	    "null": function _null(x) {
	      return new BigNumber(0);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, bignumber);
	    }
	  });
	  return bignumber;
	});

	var name$b = 'fraction';
	var dependencies$c = ['typed', 'Fraction'];
	var createFraction = /* #__PURE__ */factory(name$b, dependencies$c, function (_ref) {
	  var typed = _ref.typed,
	      Fraction = _ref.Fraction;

	  /**
	   * Create a fraction convert a value to a fraction.
	   *
	   * Syntax:
	   *     math.fraction(numerator, denominator)
	   *     math.fraction({n: numerator, d: denominator})
	   *     math.fraction(matrix: Array | Matrix)         Turn all matrix entries
	   *                                                   into fractions
	   *
	   * Examples:
	   *
	   *     math.fraction(1, 3)
	   *     math.fraction('2/3')
	   *     math.fraction({n: 2, d: 3})
	   *     math.fraction([0.2, 0.25, 1.25])
	   *
	   * See also:
	   *
	   *    bignumber, number, string, unit
	   *
	   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
	   *            Arguments specifying the numerator and denominator of
	   *            the fraction
	   * @return {Fraction | Array | Matrix} Returns a fraction
	   */
	  var fraction = typed('fraction', {
	    number: function number(x) {
	      if (!isFinite(x) || isNaN(x)) {
	        throw new Error(x + ' cannot be represented as a fraction');
	      }

	      return new Fraction(x);
	    },
	    string: function string(x) {
	      return new Fraction(x);
	    },
	    'number, number': function numberNumber(numerator, denominator) {
	      return new Fraction(numerator, denominator);
	    },
	    "null": function _null(x) {
	      return new Fraction(0);
	    },
	    BigNumber: function BigNumber(x) {
	      return new Fraction(x.toString());
	    },
	    Fraction: function Fraction(x) {
	      return x; // fractions are immutable
	    },
	    Object: function Object(x) {
	      return new Fraction(x);
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, fraction);
	    }
	  });
	  return fraction;
	});

	var name$c = 'matrix';
	var dependencies$d = ['typed', 'Matrix', 'DenseMatrix', 'SparseMatrix'];
	var createMatrix = /* #__PURE__ */factory(name$c, dependencies$d, function (_ref) {
	  var typed = _ref.typed,
	      Matrix = _ref.Matrix,
	      DenseMatrix = _ref.DenseMatrix,
	      SparseMatrix = _ref.SparseMatrix;

	  /**
	   * Create a Matrix. The function creates a new `math.Matrix` object from
	   * an `Array`. A Matrix has utility functions to manipulate the data in the
	   * matrix, like getting the size and getting or setting values in the matrix.
	   * Supported storage formats are 'dense' and 'sparse'.
	   *
	   * Syntax:
	   *
	   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
	   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
	   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
	   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
	   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
	   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
	   *
	   * Examples:
	   *
	   *    let m = math.matrix([[1, 2], [3, 4]])
	   *    m.size()                        // Array [2, 2]
	   *    m.resize([3, 2], 5)
	   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
	   *    m.get([1, 0])                    // number 3
	   *
	   * See also:
	   *
	   *    bignumber, boolean, complex, index, number, string, unit, sparse
	   *
	   * @param {Array | Matrix} [data]    A multi dimensional array
	   * @param {string} [format]          The Matrix storage format
	   *
	   * @return {Matrix} The created matrix
	   */
	  return typed(name$c, {
	    '': function _() {
	      return _create([]);
	    },
	    string: function string(format) {
	      return _create([], format);
	    },
	    'string, string': function stringString(format, datatype) {
	      return _create([], format, datatype);
	    },
	    Array: function Array(data) {
	      return _create(data);
	    },
	    Matrix: function Matrix(data) {
	      return _create(data, data.storage());
	    },
	    'Array | Matrix, string': _create,
	    'Array | Matrix, string, string': _create
	  });
	  /**
	   * Create a new Matrix with given storage format
	   * @param {Array} data
	   * @param {string} [format]
	   * @param {string} [datatype]
	   * @returns {Matrix} Returns a new Matrix
	   * @private
	   */

	  function _create(data, format, datatype) {
	    // get storage format constructor
	    if (format === 'dense' || format === 'default' || format === undefined) {
	      return new DenseMatrix(data, datatype);
	    }

	    if (format === 'sparse') {
	      return new SparseMatrix(data, datatype);
	    }

	    throw new TypeError('Unknown matrix type ' + JSON.stringify(format) + '.');
	  }
	});

	var name$d = 'unaryMinus';
	var dependencies$e = ['typed'];
	var createUnaryMinus = /* #__PURE__ */factory(name$d, dependencies$e, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Inverse the sign of a value, apply a unary minus operation.
	   *
	   * For matrices, the function is evaluated element wise. Boolean values and
	   * strings will be converted to a number. For complex numbers, both real and
	   * complex value are inverted.
	   *
	   * Syntax:
	   *
	   *    math.unaryMinus(x)
	   *
	   * Examples:
	   *
	   *    math.unaryMinus(3.5)      // returns -3.5
	   *    math.unaryMinus(-4.2)     // returns 4.2
	   *
	   * See also:
	   *
	   *    add, subtract, unaryPlus
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Number to be inverted.
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
	   */
	  var unaryMinus = typed(name$d, {
	    number: unaryMinusNumber,
	    Complex: function Complex(x) {
	      return x.neg();
	    },
	    BigNumber: function BigNumber(x) {
	      return x.neg();
	    },
	    Fraction: function Fraction(x) {
	      return x.neg();
	    },
	    Unit: function Unit(x) {
	      var res = x.clone();
	      res.value = unaryMinus(x.value);
	      return res;
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since unaryMinus(0) = 0
	      return deepMap(x, unaryMinus);
	    } // TODO: add support for string

	  });
	  return unaryMinus;
	});

	var name$e = 'abs';
	var dependencies$f = ['typed'];
	var createAbs = /* #__PURE__ */factory(name$e, dependencies$f, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Calculate the absolute value of a number. For matrices, the function is
	   * evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.abs(x)
	   *
	   * Examples:
	   *
	   *    math.abs(3.5)                // returns number 3.5
	   *    math.abs(-4.2)               // returns number 4.2
	   *
	   *    math.abs([3, -5, -1, 0, 2])  // returns Array [3, 5, 1, 0, 2]
	   *
	   * See also:
	   *
	   *    sign
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix | Unit} x
	   *            A number or matrix for which to get the absolute value
	   * @return {number | BigNumber | Fraction | Complex | Array | Matrix | Unit}
	   *            Absolute value of `x`
	   */
	  var abs = typed(name$e, {
	    number: absNumber,
	    Complex: function Complex(x) {
	      return x.abs();
	    },
	    BigNumber: function BigNumber(x) {
	      return x.abs();
	    },
	    Fraction: function Fraction(x) {
	      return x.abs();
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since abs(0) = 0
	      return deepMap(x, abs);
	    },
	    Unit: function Unit(x) {
	      return x.abs();
	    }
	  });
	  return abs;
	});

	var name$f = 'apply';
	var dependencies$g = ['typed', 'isInteger'];
	var createApply = /* #__PURE__ */factory(name$f, dependencies$g, function (_ref) {
	  var typed = _ref.typed,
	      isInteger = _ref.isInteger;

	  /**
	   * Apply a function that maps an array to a scalar
	   * along a given axis of a matrix or array.
	   * Returns a new matrix or array with one less dimension than the input.
	   *
	   * Syntax:
	   *
	   *     math.apply(A, dim, callback)
	   *
	   * Where:
	   *
	   * - `dim: number` is a zero-based dimension over which to concatenate the matrices.
	   *
	   * Examples:
	   *
	   *    const A = [[1, 2], [3, 4]]
	   *    const sum = math.sum
	   *
	   *    math.apply(A, 0, sum)             // returns [4, 6]
	   *    math.apply(A, 1, sum)             // returns [3, 7]
	   *
	   * See also:
	   *
	   *    map, filter, forEach
	   *
	   * @param {Array | Matrix} array   The input Matrix
	   * @param {number} dim             The dimension along which the callback is applied
	   * @param {Function} callback      The callback function that is applied. This Function
	   *                                 should take an array or 1-d matrix as an input and
	   *                                 return a number.
	   * @return {Array | Matrix} res    The residual matrix with the function applied over some dimension.
	   */
	  var apply = typed(name$f, {
	    'Array | Matrix, number | BigNumber, function': function ArrayMatrixNumberBigNumberFunction(mat, dim, callback) {
	      if (!isInteger(dim)) {
	        throw new TypeError('Integer number expected for dimension');
	      }

	      var size = Array.isArray(mat) ? arraySize(mat) : mat.size();

	      if (dim < 0 || dim >= size.length) {
	        throw new IndexError(dim, size.length);
	      }

	      if (isMatrix(mat)) {
	        return mat.create(_apply(mat.valueOf(), dim, callback));
	      } else {
	        return _apply(mat, dim, callback);
	      }
	    }
	  });
	  return apply;
	});
	/**
	 * Recursively reduce a matrix
	 * @param {Array} mat
	 * @param {number} dim
	 * @param {Function} callback
	 * @returns {Array} ret
	 * @private
	 */

	function _apply(mat, dim, callback) {
	  var i, ret, tran;

	  if (dim <= 0) {
	    if (!Array.isArray(mat[0])) {
	      return callback(mat);
	    } else {
	      tran = _switch$1(mat);
	      ret = [];

	      for (i = 0; i < tran.length; i++) {
	        ret[i] = _apply(tran[i], dim - 1, callback);
	      }

	      return ret;
	    }
	  } else {
	    ret = [];

	    for (i = 0; i < mat.length; i++) {
	      ret[i] = _apply(mat[i], dim - 1, callback);
	    }

	    return ret;
	  }
	}
	/**
	 * Transpose a matrix
	 * @param {Array} mat
	 * @returns {Array} ret
	 * @private
	 */


	function _switch$1(mat) {
	  var I = mat.length;
	  var J = mat[0].length;
	  var i, j;
	  var ret = [];

	  for (j = 0; j < J; j++) {
	    var tmp = [];

	    for (i = 0; i < I; i++) {
	      tmp.push(mat[i][j]);
	    }

	    ret.push(tmp);
	  }

	  return ret;
	}

	var name$g = 'addScalar';
	var dependencies$h = ['typed'];
	var createAddScalar = /* #__PURE__ */factory(name$g, dependencies$h, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Add two scalar values, `x + y`.
	   * This function is meant for internal use: it is used by the public function
	   * `add`
	   *
	   * This function does not support collections (Array or Matrix).
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to add
	   * @param  {number | BigNumber | Fraction | Complex} y          Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit}     Sum of `x` and `y`
	   * @private
	   */
	  var addScalar = typed(name$g, {
	    'number, number': addNumber,
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.add(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.plus(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.add(y);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (x.value === null || x.value === undefined) throw new Error('Parameter x contains a unit with undefined value');
	      if (y.value === null || y.value === undefined) throw new Error('Parameter y contains a unit with undefined value');
	      if (!x.equalBase(y)) throw new Error('Units do not match');
	      var res = x.clone();
	      res.value = addScalar(res.value, y.value);
	      res.fixPrefix = false;
	      return res;
	    }
	  });
	  return addScalar;
	});

	var name$h = 'algorithm01';
	var dependencies$i = ['typed'];
	var createAlgorithm01 = /* #__PURE__ */factory(name$h, dependencies$i, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Iterates over SparseMatrix nonzero items and invokes the callback function f(Dij, Sij).
	   * Callback function invoked NNZ times (number of nonzero items in SparseMatrix).
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  Dij          ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (S)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */
	  return function algorithm1(denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype; // sparse matrix arrays

	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // sparse matrix cannot be a Pattern matrix


	    if (!bvalues) {
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // process data types

	    var dt = typeof adt === 'string' && adt === bdt ? adt : undefined; // callback function

	    var cf = dt ? typed.find(callback, [dt, dt]) : callback; // vars

	    var i, j; // result (DenseMatrix)

	    var cdata = []; // initialize c

	    for (i = 0; i < rows; i++) {
	      cdata[i] = [];
	    } // workspace


	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns in b

	    for (j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1; // values in column j

	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k]; // update workspace

	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]); // mark i as updated

	        w[i] = mark;
	      } // loop rows


	      for (i = 0; i < rows; i++) {
	        // check row is in workspace
	        if (w[i] === mark) {
	          // c[i][j] was already calculated
	          cdata[i][j] = x[i];
	        } else {
	          // item does not exist in S
	          cdata[i][j] = adata[i][j];
	        }
	      }
	    } // return dense matrix


	    return denseMatrix.createDenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$i = 'algorithm04';
	var dependencies$j = ['typed', 'equalScalar'];
	var createAlgorithm04 = /* #__PURE__ */factory(name$i, dependencies$j, function (_ref) {
	  var typed = _ref.typed,
	      equalScalar = _ref.equalScalar;

	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MAX(NNZA, NNZB) times
	   *
	   *
	   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 && B(i,j) !== 0
	   * C(i,j) = ┤  A(i,j)       ; A(i,j) !== 0
	   *          └  B(i,j)       ; B(i,j) !== 0
	   *
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */
	  return function algorithm04(a, b, callback) {
	    // sparse matrix arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = avalues && bvalues ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // workspace

	    var xa = avalues && bvalues ? [] : undefined;
	    var xb = avalues && bvalues ? [] : undefined; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // vars

	    var i, j, k, k0, k1; // loop columns

	    for (j = 0; j < columns; j++) {
	      // update cptr
	      cptr[j] = cindex.length; // columns mark

	      var mark = j + 1; // loop A(:,j)

	      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = aindex[k]; // update c

	        cindex.push(i); // update workspace

	        wa[i] = mark; // check we need to process values

	        if (xa) {
	          xa[i] = avalues[k];
	        }
	      } // loop B(:,j)


	      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        i = bindex[k]; // check row exists in A

	        if (wa[i] === mark) {
	          // update record in xa @ i
	          if (xa) {
	            // invoke callback
	            var v = cf(xa[i], bvalues[k]); // check for zero

	            if (!eq(v, zero)) {
	              // update workspace
	              xa[i] = v;
	            } else {
	              // remove mark (index will be removed later)
	              wa[i] = null;
	            }
	          }
	        } else {
	          // update c
	          cindex.push(i); // update workspace

	          wb[i] = mark; // check we need to process values

	          if (xb) {
	            xb[i] = bvalues[k];
	          }
	        }
	      } // check we need to process values (non pattern matrix)


	      if (xa && xb) {
	        // initialize first index in j
	        k = cptr[j]; // loop index in j

	        while (k < cindex.length) {
	          // row
	          i = cindex[k]; // check workspace has value @ i

	          if (wa[i] === mark) {
	            // push value (Aij != 0 || (Aij != 0 && Bij != 0))
	            cvalues[k] = xa[i]; // increment pointer

	            k++;
	          } else if (wb[i] === mark) {
	            // push value (bij != 0)
	            cvalues[k] = xb[i]; // increment pointer

	            k++;
	          } else {
	            // remove index @ k
	            cindex.splice(k, 1);
	          }
	        }
	      }
	    } // update cptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return a.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$j = 'algorithm10';
	var dependencies$k = ['typed', 'DenseMatrix'];
	var createAlgorithm10 = /* #__PURE__ */factory(name$j, dependencies$k, function (_ref) {
	  var typed = _ref.typed,
	      DenseMatrix = _ref.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked NZ times (number of nonzero items in S).
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  b          ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */
	  return function algorithm10(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cdata = []; // workspaces

	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k]; // update workspace

	        x[r] = avalues[k];
	        w[r] = mark;
	      } // loop rows


	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        } // check sparse matrix has a value @ i,j


	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        } else {
	          // dense matrix value @ i, j
	          cdata[i][j] = b;
	        }
	      }
	    } // return dense matrix


	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$k = 'algorithm13';
	var dependencies$l = ['typed'];
	var createAlgorithm13 = /* #__PURE__ */factory(name$k, dependencies$l, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, Bij..z).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, Bij..z)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Matrix}   b                 The DenseMatrix instance (B)
	   * @param {Function} callback          The f(Aij..z,Bij..z) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97658658
	   */
	  return function algorithm13(a, b, callback) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b arrays

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // c arrays

	    var csize = []; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // validate each one of the dimension sizes


	    for (var s = 0; s < asize.length; s++) {
	      // must match
	      if (asize[s] !== bsize[s]) {
	        throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	      } // update dimension in c


	      csize[s] = asize[s];
	    } // datatype


	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // populate cdata, iterate through dimensions


	    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : []; // c matrix

	    return a.createDenseMatrix({
	      data: cdata,
	      size: csize,
	      datatype: dt
	    });
	  }; // recursive function

	  function _iterate(f, level, s, n, av, bv) {
	    // initialize array for this level
	    var cv = []; // check we reach the last level

	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = f(av[i], bv[i]);
	      }
	    } else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
	      }
	    }

	    return cv;
	  }
	});

	var name$l = 'algorithm14';
	var dependencies$m = ['typed'];
	var createAlgorithm14 = /* #__PURE__ */factory(name$l, dependencies$m, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Iterates over DenseMatrix items and invokes the callback function f(Aij..z, b).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j,...z) = f(Aij..z, b)
	   *
	   * @param {Matrix}   a                 The DenseMatrix instance (A)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij..z,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Aij..z)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97659042
	   */
	  return function algorithm14(a, b, callback, inverse) {
	    // a arrays
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // populate cdata, iterate through dimensions


	    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : []; // c matrix

	    return a.createDenseMatrix({
	      data: cdata,
	      size: clone(asize),
	      datatype: dt
	    });
	  }; // recursive function

	  function _iterate(f, level, s, n, av, bv, inverse) {
	    // initialize array for this level
	    var cv = []; // check we reach the last level

	    if (level === s.length - 1) {
	      // loop arrays in last level
	      for (var i = 0; i < n; i++) {
	        // invoke callback and store value
	        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
	      }
	    } else {
	      // iterate current level
	      for (var j = 0; j < n; j++) {
	        // iterate next level
	        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
	      }
	    }

	    return cv;
	  }
	});

	var name$m = 'algorithm11';
	var dependencies$n = ['typed', 'equalScalar'];
	var createAlgorithm11 = /* #__PURE__ */factory(name$m, dependencies$n, function (_ref) {
	  var typed = _ref.typed,
	      equalScalar = _ref.equalScalar;

	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked NZ times (number of nonzero items in S).
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  0          ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */
	  return function algorithm11(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // initialize ptr
	      cptr[j] = cindex.length; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var i = aindex[k]; // invoke callback

	        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b); // check value is zero

	        if (!eq(v, zero)) {
	          // push index & value
	          cindex.push(i);
	          cvalues.push(v);
	        }
	      }
	    } // update ptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return s.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$n = 'algorithm03';
	var dependencies$o = ['typed'];
	var createAlgorithm03 = /* #__PURE__ */factory(name$n, dependencies$o, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Iterates over SparseMatrix items and invokes the callback function f(Dij, Sij).
	   * Callback function invoked M*N times.
	   *
	   *
	   *          ┌  f(Dij, Sij)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  f(Dij, 0)    ; otherwise
	   *
	   *
	   * @param {Matrix}   denseMatrix       The DenseMatrix instance (D)
	   * @param {Matrix}   sparseMatrix      The SparseMatrix instance (C)
	   * @param {Function} callback          The f(Dij,Sij) operation to invoke, where Dij = DenseMatrix(i,j) and Sij = SparseMatrix(i,j)
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(Sij,Dij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97477571
	   */
	  return function algorithm03(denseMatrix, sparseMatrix, callback, inverse) {
	    // dense matrix arrays
	    var adata = denseMatrix._data;
	    var asize = denseMatrix._size;
	    var adt = denseMatrix._datatype; // sparse matrix arrays

	    var bvalues = sparseMatrix._values;
	    var bindex = sparseMatrix._index;
	    var bptr = sparseMatrix._ptr;
	    var bsize = sparseMatrix._size;
	    var bdt = sparseMatrix._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // sparse matrix cannot be a Pattern matrix


	    if (!bvalues) {
	      throw new Error('Cannot perform operation on Dense Matrix and Pattern Sparse Matrix');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result (DenseMatrix)


	    var cdata = []; // initialize dense matrix

	    for (var z = 0; z < rows; z++) {
	      // initialize row
	      cdata[z] = [];
	    } // workspace


	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns in b

	    for (var j = 0; j < columns; j++) {
	      // column mark
	      var mark = j + 1; // values in column j

	      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var i = bindex[k]; // update workspace

	        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
	        w[i] = mark;
	      } // process workspace


	      for (var y = 0; y < rows; y++) {
	        // check we have a calculated value for current row
	        if (w[y] === mark) {
	          // use calculated value
	          cdata[y][j] = x[y];
	        } else {
	          // calculate value
	          cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
	        }
	      }
	    } // return dense matrix


	    return denseMatrix.createDenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$o = 'algorithm05';
	var dependencies$p = ['typed', 'equalScalar'];
	var createAlgorithm05 = /* #__PURE__ */factory(name$o, dependencies$p, function (_ref) {
	  var typed = _ref.typed,
	      equalScalar = _ref.equalScalar;

	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B nonzero items and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MAX(NNZA, NNZB) times
	   *
	   *
	   *          ┌  f(Aij, Bij)  ; A(i,j) !== 0 || B(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  0            ; otherwise
	   *
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    SparseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */
	  return function algorithm05(a, b, callback) {
	    // sparse matrix arrays
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // equal signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // find signature that matches (dt, dt)

	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cvalues = avalues && bvalues ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // workspaces

	    var xa = cvalues ? [] : undefined;
	    var xb = cvalues ? [] : undefined; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // vars

	    var i, j, k, k1; // loop columns

	    for (j = 0; j < columns; j++) {
	      // update cptr
	      cptr[j] = cindex.length; // columns mark

	      var mark = j + 1; // loop values A(:,j)

	      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
	        // row
	        i = aindex[k]; // push index

	        cindex.push(i); // update workspace

	        wa[i] = mark; // check we need to process values

	        if (xa) {
	          xa[i] = avalues[k];
	        }
	      } // loop values B(:,j)


	      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
	        // row
	        i = bindex[k]; // check row existed in A

	        if (wa[i] !== mark) {
	          // push index
	          cindex.push(i);
	        } // update workspace


	        wb[i] = mark; // check we need to process values

	        if (xb) {
	          xb[i] = bvalues[k];
	        }
	      } // check we need to process values (non pattern matrix)


	      if (cvalues) {
	        // initialize first index in j
	        k = cptr[j]; // loop index in j

	        while (k < cindex.length) {
	          // row
	          i = cindex[k]; // marks

	          var wai = wa[i];
	          var wbi = wb[i]; // check Aij or Bij are nonzero

	          if (wai === mark || wbi === mark) {
	            // matrix values @ i,j
	            var va = wai === mark ? xa[i] : zero;
	            var vb = wbi === mark ? xb[i] : zero; // Cij

	            var vc = cf(va, vb); // check for zero

	            if (!eq(vc, zero)) {
	              // push value
	              cvalues.push(vc); // increment pointer

	              k++;
	            } else {
	              // remove value @ i, do not increment pointer
	              cindex.splice(k, 1);
	            }
	          }
	        }
	      }
	    } // update cptr


	    cptr[columns] = cindex.length; // return sparse matrix

	    return a.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$p = 'algorithm12';
	var dependencies$q = ['typed', 'DenseMatrix'];
	var createAlgorithm12 = /* #__PURE__ */factory(name$p, dependencies$q, function (_ref) {
	  var typed = _ref.typed,
	      DenseMatrix = _ref.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix S nonzero items and invokes the callback function f(Sij, b).
	   * Callback function invoked MxN times.
	   *
	   *
	   *          ┌  f(Sij, b)  ; S(i,j) !== 0
	   * C(i,j) = ┤
	   *          └  f(0, b)    ; otherwise
	   *
	   *
	   * @param {Matrix}   s                 The SparseMatrix instance (S)
	   * @param {Scalar}   b                 The Scalar value
	   * @param {Function} callback          The f(Aij,b) operation to invoke
	   * @param {boolean}  inverse           A true value indicates callback should be invoked f(b,Sij)
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * https://github.com/josdejong/mathjs/pull/346#issuecomment-97626813
	   */
	  return function algorithm12(s, b, callback, inverse) {
	    // sparse matrix arrays
	    var avalues = s._values;
	    var aindex = s._index;
	    var aptr = s._ptr;
	    var asize = s._size;
	    var adt = s._datatype; // sparse matrix cannot be a Pattern matrix

	    if (!avalues) {
	      throw new Error('Cannot perform operation on Pattern Sparse Matrix and Scalar value');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string') {
	      // datatype
	      dt = adt; // convert b to the same datatype

	      b = typed.convert(b, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // result arrays


	    var cdata = []; // workspaces

	    var x = []; // marks indicating we have a value in x for a given column

	    var w = []; // loop columns

	    for (var j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // values in j

	      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
	        // row
	        var r = aindex[k]; // update workspace

	        x[r] = avalues[k];
	        w[r] = mark;
	      } // loop rows


	      for (var i = 0; i < rows; i++) {
	        // initialize C on first column
	        if (j === 0) {
	          // create row array
	          cdata[i] = [];
	        } // check sparse matrix has a value @ i,j


	        if (w[i] === mark) {
	          // invoke callback, update C
	          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
	        } else {
	          // dense matrix value @ i, j
	          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
	        }
	      }
	    } // return dense matrix


	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };
	});

	var name$q = 'multiplyScalar';
	var dependencies$r = ['typed'];
	var createMultiplyScalar = /* #__PURE__ */factory(name$q, dependencies$r, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Multiply two scalar values, `x * y`.
	   * This function is meant for internal use: it is used by the public function
	   * `multiply`
	   *
	   * This function does not support collections (Array or Matrix).
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   First value to multiply
	   * @param  {number | BigNumber | Fraction | Complex} y          Second value to multiply
	   * @return {number | BigNumber | Fraction | Complex | Unit}     Multiplication of `x` and `y`
	   * @private
	   */
	  var multiplyScalar = typed('multiplyScalar', {
	    'number, number': multiplyNumber,
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.mul(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.times(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.mul(y);
	    },
	    'number | Fraction | BigNumber | Complex, Unit': function numberFractionBigNumberComplexUnit(x, y) {
	      var res = y.clone();
	      res.value = res.value === null ? res._normalize(x) : multiplyScalar(res.value, x);
	      return res;
	    },
	    'Unit, number | Fraction | BigNumber | Complex': function UnitNumberFractionBigNumberComplex(x, y) {
	      var res = x.clone();
	      res.value = res.value === null ? res._normalize(y) : multiplyScalar(res.value, y);
	      return res;
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      return x.multiply(y);
	    }
	  });
	  return multiplyScalar;
	});

	var name$r = 'multiply';
	var dependencies$s = ['typed', 'matrix', 'addScalar', 'multiplyScalar', 'equalScalar', 'dot'];
	var createMultiply = /* #__PURE__ */factory(name$r, dependencies$s, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      addScalar = _ref.addScalar,
	      multiplyScalar = _ref.multiplyScalar,
	      equalScalar = _ref.equalScalar,
	      dot = _ref.dot;
	  var algorithm11 = createAlgorithm11({
	    typed: typed,
	    equalScalar: equalScalar
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Multiply two or more values, `x * y`.
	   * For matrices, the matrix product is calculated.
	   *
	   * Syntax:
	   *
	   *    math.multiply(x, y)
	   *    math.multiply(x, y, z, ...)
	   *
	   * Examples:
	   *
	   *    math.multiply(4, 5.2)        // returns number 20.8
	   *    math.multiply(2, 3, 4)       // returns number 24
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(4, 1)
	   *    math.multiply(a, b)          // returns Complex 5 + 14i
	   *
	   *    const c = [[1, 2], [4, 3]]
	   *    const d = [[1, 2, 3], [3, -4, 7]]
	   *    math.multiply(c, d)          // returns Array [[7, -6, 17], [13, -4, 33]]
	   *
	   *    const e = math.unit('2.1 km')
	   *    math.multiply(3, e)          // returns Unit 6.3 km
	   *
	   * See also:
	   *
	   *    divide, prod, cross, dot
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to multiply
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to multiply
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Multiplication of `x` and `y`
	   */

	  var multiply = typed(name$r, extend({
	    // we extend the signatures of multiplyScalar with signatures dealing with matrices
	    'Array, Array': function ArrayArray(x, y) {
	      // check dimensions
	      _validateMatrixDimensions(arraySize(x), arraySize(y)); // use dense matrix implementation


	      var m = multiply(matrix(x), matrix(y)); // return array or scalar

	      return isMatrix(m) ? m.valueOf() : m;
	    },
	    'Matrix, Matrix': function MatrixMatrix(x, y) {
	      // dimensions
	      var xsize = x.size();
	      var ysize = y.size(); // check dimensions

	      _validateMatrixDimensions(xsize, ysize); // process dimensions


	      if (xsize.length === 1) {
	        // process y dimensions
	        if (ysize.length === 1) {
	          // Vector * Vector
	          return _multiplyVectorVector(x, y, xsize[0]);
	        } // Vector * Matrix


	        return _multiplyVectorMatrix(x, y);
	      } // process y dimensions


	      if (ysize.length === 1) {
	        // Matrix * Vector
	        return _multiplyMatrixVector(x, y);
	      } // Matrix * Matrix


	      return _multiplyMatrixMatrix(x, y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use Matrix * Matrix implementation
	      return multiply(x, matrix(y));
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use Matrix * Matrix implementation
	      return multiply(matrix(x, y.storage()), y);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm11(x, y, multiplyScalar, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, multiplyScalar, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm11(y, x, multiplyScalar, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, multiplyScalar, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, multiplyScalar, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, multiplyScalar, true).valueOf();
	    },
	    'any, any': multiplyScalar,
	    'any, any, ...any': function anyAnyAny(x, y, rest) {
	      var result = multiply(x, y);

	      for (var i = 0; i < rest.length; i++) {
	        result = multiply(result, rest[i]);
	      }

	      return result;
	    }
	  }, multiplyScalar.signatures));

	  function _validateMatrixDimensions(size1, size2) {
	    // check left operand dimensions
	    switch (size1.length) {
	      case 1:
	        // check size2
	        switch (size2.length) {
	          case 1:
	            // Vector x Vector
	            if (size1[0] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Vectors must have the same length');
	            }

	            break;

	          case 2:
	            // Vector x Matrix
	            if (size1[0] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Vector length (' + size1[0] + ') must match Matrix rows (' + size2[0] + ')');
	            }

	            break;

	          default:
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
	        }

	        break;

	      case 2:
	        // check size2
	        switch (size2.length) {
	          case 1:
	            // Matrix x Vector
	            if (size1[1] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Matrix columns (' + size1[1] + ') must match Vector length (' + size2[0] + ')');
	            }

	            break;

	          case 2:
	            // Matrix x Matrix
	            if (size1[1] !== size2[0]) {
	              // throw error
	              throw new RangeError('Dimension mismatch in multiplication. Matrix A columns (' + size1[1] + ') must match Matrix B rows (' + size2[0] + ')');
	            }

	            break;

	          default:
	            throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix B has ' + size2.length + ' dimensions)');
	        }

	        break;

	      default:
	        throw new Error('Can only multiply a 1 or 2 dimensional matrix (Matrix A has ' + size1.length + ' dimensions)');
	    }
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (N)
	   * @param {Matrix} b            Dense Vector   (N)
	   *
	   * @return {number}             Scalar value
	   */


	  function _multiplyVectorVector(a, b, n) {
	    // check empty vector
	    if (n === 0) {
	      throw new Error('Cannot multiply two empty vectors');
	    }

	    return dot(a, b);
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (M)
	   * @param {Matrix} b            Matrix         (MxN)
	   *
	   * @return {Matrix}             Dense Vector   (N)
	   */


	  function _multiplyVectorMatrix(a, b) {
	    // process storage
	    if (b.storage() !== 'dense') {
	      throw new Error('Support for SparseMatrix not implemented');
	    }

	    return _multiplyVectorDenseMatrix(a, b);
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Dense Vector   (M)
	   * @param {Matrix} b            Dense Matrix   (MxN)
	   *
	   * @return {Matrix}             Dense Vector   (N)
	   */


	  function _multiplyVectorDenseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // rows & columns

	    var alength = asize[0];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix columns

	    for (var j = 0; j < bcolumns; j++) {
	      // sum (do not initialize it with zero)
	      var sum = mf(adata[0], bdata[0][j]); // loop vector

	      for (var i = 1; i < alength; i++) {
	        // multiply & accumulate
	        sum = af(sum, mf(adata[i], bdata[i][j]));
	      }

	      c[j] = sum;
	    } // return matrix


	    return a.createDenseMatrix({
	      data: c,
	      size: [bcolumns],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Matrix         (MxN)
	   * @param {Matrix} b            Dense Vector   (N)
	   *
	   * @return {Matrix}             Dense Vector   (M)
	   */


	  var _multiplyMatrixVector = typed('_multiplyMatrixVector', {
	    'DenseMatrix, any': _multiplyDenseMatrixVector,
	    'SparseMatrix, any': _multiplySparseMatrixVector
	  });
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            Matrix         (MxN)
	   * @param {Matrix} b            Matrix         (NxC)
	   *
	   * @return {Matrix}             Matrix         (MxC)
	   */


	  var _multiplyMatrixMatrix = typed('_multiplyMatrixMatrix', {
	    'DenseMatrix, DenseMatrix': _multiplyDenseMatrixDenseMatrix,
	    'DenseMatrix, SparseMatrix': _multiplyDenseMatrixSparseMatrix,
	    'SparseMatrix, DenseMatrix': _multiplySparseMatrixDenseMatrix,
	    'SparseMatrix, SparseMatrix': _multiplySparseMatrixSparseMatrix
	  });
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix  (MxN)
	   * @param {Matrix} b            Dense Vector (N)
	   *
	   * @return {Matrix}             Dense Vector (M)
	   */


	  function _multiplyDenseMatrixVector(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = asize[0];
	    var acolumns = asize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix a rows

	    for (var i = 0; i < arows; i++) {
	      // current row
	      var row = adata[i]; // sum (do not initialize it with zero)

	      var sum = mf(row[0], bdata[0]); // loop matrix a columns

	      for (var j = 1; j < acolumns; j++) {
	        // multiply & accumulate
	        sum = af(sum, mf(row[j], bdata[j]));
	      }

	      c[i] = sum;
	    } // return matrix


	    return a.createDenseMatrix({
	      data: c,
	      size: [arows],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix    (MxN)
	   * @param {Matrix} b            DenseMatrix    (NxC)
	   *
	   * @return {Matrix}             DenseMatrix    (MxC)
	   */


	  function _multiplyDenseMatrixDenseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b dense

	    var bdata = b._data;
	    var bsize = b._size;
	    var bdt = b._datatype; // rows & columns

	    var arows = asize[0];
	    var acolumns = asize[1];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var c = []; // loop matrix a rows

	    for (var i = 0; i < arows; i++) {
	      // current row
	      var row = adata[i]; // initialize row array

	      c[i] = []; // loop matrix b columns

	      for (var j = 0; j < bcolumns; j++) {
	        // sum (avoid initializing sum to zero)
	        var sum = mf(row[0], bdata[0][j]); // loop matrix a columns

	        for (var x = 1; x < acolumns; x++) {
	          // multiply & accumulate
	          sum = af(sum, mf(row[x], bdata[x][j]));
	        }

	        c[i][j] = sum;
	      }
	    } // return matrix


	    return a.createDenseMatrix({
	      data: c,
	      size: [arows, bcolumns],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            DenseMatrix    (MxN)
	   * @param {Matrix} b            SparseMatrix   (NxC)
	   *
	   * @return {Matrix}             SparseMatrix   (MxC)
	   */


	  function _multiplyDenseMatrixSparseMatrix(a, b) {
	    // a dense
	    var adata = a._data;
	    var asize = a._size;
	    var adt = a._datatype; // b sparse

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bsize = b._size;
	    var bdt = b._datatype; // validate b matrix

	    if (!bvalues) {
	      throw new Error('Cannot multiply Dense Matrix times Pattern only Matrix');
	    } // rows & columns


	    var arows = asize[0];
	    var bcolumns = bsize[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // result


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = b.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // indeces in column jb

	      var kb0 = bptr[jb];
	      var kb1 = bptr[jb + 1]; // do not process column jb if no data exists

	      if (kb1 > kb0) {
	        // last row mark processed
	        var last = 0; // loop a rows

	        for (var i = 0; i < arows; i++) {
	          // column mark
	          var mark = i + 1; // C[i, jb]

	          var cij = void 0; // values in b column j

	          for (var kb = kb0; kb < kb1; kb++) {
	            // row
	            var ib = bindex[kb]; // check value has been initialized

	            if (last !== mark) {
	              // first value in column jb
	              cij = mf(adata[i][ib], bvalues[kb]); // update mark

	              last = mark;
	            } else {
	              // accumulate value
	              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
	            }
	          } // check column has been processed and value != 0


	          if (last === mark && !eq(cij, zero)) {
	            // push row & value
	            cindex.push(i);
	            cvalues.push(cij);
	          }
	        }
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix    (MxN)
	   * @param {Matrix} b            Dense Vector (N)
	   *
	   * @return {Matrix}             SparseMatrix    (M, 1)
	   */


	  function _multiplySparseMatrixVector(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // validate a matrix

	    if (!avalues) {
	      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
	    } // b dense


	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var brows = b._size[0]; // result

	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // workspace


	    var x = []; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // update ptr

	    cptr[0] = 0; // rows in b

	    for (var ib = 0; ib < brows; ib++) {
	      // b[ib]
	      var vbi = bdata[ib]; // check b[ib] != 0, avoid loops

	      if (!eq(vbi, zero)) {
	        // A values & index in ib column
	        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	          // a row
	          var ia = aindex[ka]; // check value exists in current j

	          if (!w[ia]) {
	            // ia is new entry in j
	            w[ia] = true; // add i to pattern of C

	            cindex.push(ia); // x(ia) = A

	            x[ia] = mf(vbi, avalues[ka]);
	          } else {
	            // i exists in C already
	            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
	          }
	        }
	      }
	    } // copy values from x to column jb of c


	    for (var p1 = cindex.length, p = 0; p < p1; p++) {
	      // row
	      var ic = cindex[p]; // copy value

	      cvalues[p] = x[ic];
	    } // update ptr


	    cptr[1] = cindex.length; // return sparse matrix

	    return a.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, 1],
	      datatype: dt
	    });
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix      (MxN)
	   * @param {Matrix} b            DenseMatrix       (NxC)
	   *
	   * @return {Matrix}             SparseMatrix      (MxC)
	   */


	  function _multiplySparseMatrixDenseMatrix(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // validate a matrix

	    if (!avalues) {
	      throw new Error('Cannot multiply Pattern only Matrix times Dense Matrix');
	    } // b dense


	    var bdata = b._data;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var brows = b._size[0];
	    var bcolumns = b._size[1]; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // equalScalar signature to use

	    var eq = equalScalar; // zero value

	    var zero = 0; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	      eq = typed.find(equalScalar, [dt, dt]); // convert 0 to the same datatype

	      zero = typed.convert(0, dt);
	    } // result


	    var cvalues = [];
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = a.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // workspace

	    var x = []; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // mark in workspace for current column

	      var mark = jb + 1; // rows in jb

	      for (var ib = 0; ib < brows; ib++) {
	        // b[ib, jb]
	        var vbij = bdata[ib][jb]; // check b[ib, jb] != 0, avoid loops

	        if (!eq(vbij, zero)) {
	          // A values & index in ib column
	          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // a row
	            var ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia); // x(ia) = A

	              x[ia] = mf(vbij, avalues[ka]);
	            } else {
	              // i exists in C already
	              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
	            }
	          }
	        }
	      } // copy values from x to column jb of c


	      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
	        // row
	        var ic = cindex[p]; // copy value

	        cvalues[p] = x[ic];
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }
	  /**
	   * C = A * B
	   *
	   * @param {Matrix} a            SparseMatrix      (MxN)
	   * @param {Matrix} b            SparseMatrix      (NxC)
	   *
	   * @return {Matrix}             SparseMatrix      (MxC)
	   */


	  function _multiplySparseMatrixSparseMatrix(a, b) {
	    // a sparse
	    var avalues = a._values;
	    var aindex = a._index;
	    var aptr = a._ptr;
	    var adt = a._datatype; // b sparse

	    var bvalues = b._values;
	    var bindex = b._index;
	    var bptr = b._ptr;
	    var bdt = b._datatype; // rows & columns

	    var arows = a._size[0];
	    var bcolumns = b._size[1]; // flag indicating both matrices (a & b) contain data

	    var values = avalues && bvalues; // datatype

	    var dt; // addScalar signature to use

	    var af = addScalar; // multiplyScalar signature to use

	    var mf = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      // datatype
	      dt = adt; // find signatures that matches (dt, dt)

	      af = typed.find(addScalar, [dt, dt]);
	      mf = typed.find(multiplyScalar, [dt, dt]);
	    } // result


	    var cvalues = values ? [] : undefined;
	    var cindex = [];
	    var cptr = []; // c matrix

	    var c = a.createSparseMatrix({
	      values: cvalues,
	      index: cindex,
	      ptr: cptr,
	      size: [arows, bcolumns],
	      datatype: dt
	    }); // workspace

	    var x = values ? [] : undefined; // vector with marks indicating a value x[i] exists in a given column

	    var w = []; // variables

	    var ka, ka0, ka1, kb, kb0, kb1, ia, ib; // loop b columns

	    for (var jb = 0; jb < bcolumns; jb++) {
	      // update ptr
	      cptr[jb] = cindex.length; // mark in workspace for current column

	      var mark = jb + 1; // B values & index in j

	      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
	        // b row
	        ib = bindex[kb]; // check we need to process values

	        if (values) {
	          // loop values in a[:,ib]
	          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // row
	            ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia); // x(ia) = A

	              x[ia] = mf(bvalues[kb], avalues[ka]);
	            } else {
	              // i exists in C already
	              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
	            }
	          }
	        } else {
	          // loop values in a[:,ib]
	          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
	            // row
	            ia = aindex[ka]; // check value exists in current j

	            if (w[ia] !== mark) {
	              // ia is new entry in j
	              w[ia] = mark; // add i to pattern of C

	              cindex.push(ia);
	            }
	          }
	        }
	      } // check we need to process matrix values (pattern matrix)


	      if (values) {
	        // copy values from x to column jb of c
	        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
	          // row
	          var ic = cindex[p]; // copy value

	          cvalues[p] = x[ic];
	        }
	      }
	    } // update ptr


	    cptr[bcolumns] = cindex.length; // return sparse matrix

	    return c;
	  }

	  return multiply;
	});

	var name$s = 'sqrt';
	var dependencies$t = ['config', 'typed', 'Complex'];
	var createSqrt = /* #__PURE__ */factory(name$s, dependencies$t, function (_ref) {
	  var config = _ref.config,
	      typed = _ref.typed,
	      Complex = _ref.Complex;

	  /**
	   * Calculate the square root of a value.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.sqrt(x)
	   *
	   * Examples:
	   *
	   *    math.sqrt(25)                // returns 5
	   *    math.square(5)               // returns 25
	   *    math.sqrt(-4)                // returns Complex 2i
	   *
	   * See also:
	   *
	   *    square, multiply, cube, cbrt, sqrtm
	   *
	   * @param {number | BigNumber | Complex | Array | Matrix | Unit} x
	   *            Value for which to calculate the square root.
	   * @return {number | BigNumber | Complex | Array | Matrix | Unit}
	   *            Returns the square root of `x`
	   */
	  var sqrt = typed('sqrt', {
	    number: _sqrtNumber,
	    Complex: function Complex(x) {
	      return x.sqrt();
	    },
	    BigNumber: function BigNumber(x) {
	      if (!x.isNegative() || config.predictable) {
	        return x.sqrt();
	      } else {
	        // negative value -> downgrade to number to do complex value computation
	        return _sqrtNumber(x.toNumber());
	      }
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      // deep map collection, skip zeros since sqrt(0) = 0
	      return deepMap(x, sqrt);
	    },
	    Unit: function Unit(x) {
	      // Someday will work for complex units when they are implemented
	      return x.pow(0.5);
	    }
	  });
	  /**
	   * Calculate sqrt for a number
	   * @param {number} x
	   * @returns {number | Complex} Returns the square root of x
	   * @private
	   */

	  function _sqrtNumber(x) {
	    if (isNaN(x)) {
	      return NaN;
	    } else if (x >= 0 || config.predictable) {
	      return Math.sqrt(x);
	    } else {
	      return new Complex(x, 0).sqrt();
	    }
	  }

	  return sqrt;
	});

	var name$t = 'subtract';
	var dependencies$u = ['typed', 'matrix', 'equalScalar', 'addScalar', 'unaryMinus', 'DenseMatrix'];
	var createSubtract = /* #__PURE__ */factory(name$t, dependencies$u, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      equalScalar = _ref.equalScalar,
	      addScalar = _ref.addScalar,
	      unaryMinus = _ref.unaryMinus,
	      DenseMatrix = _ref.DenseMatrix;
	  // TODO: split function subtract in two: subtract and subtractScalar
	  var algorithm01 = createAlgorithm01({
	    typed: typed
	  });
	  var algorithm03 = createAlgorithm03({
	    typed: typed
	  });
	  var algorithm05 = createAlgorithm05({
	    typed: typed,
	    equalScalar: equalScalar
	  });
	  var algorithm10 = createAlgorithm10({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm13 = createAlgorithm13({
	    typed: typed
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Subtract two values, `x - y`.
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.subtract(x, y)
	   *
	   * Examples:
	   *
	   *    math.subtract(5.3, 2)        // returns number 3.3
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(4, 1)
	   *    math.subtract(a, b)          // returns Complex -2 + 2i
	   *
	   *    math.subtract([5, 7, 4], 4)  // returns Array [1, 3, 0]
	   *
	   *    const c = math.unit('2.1 km')
	   *    const d = math.unit('500m')
	   *    math.subtract(c, d)          // returns Unit 1.6 km
	   *
	   * See also:
	   *
	   *    add
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x
	   *            Initial value
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y
	   *            Value to subtract from `x`
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
	   *            Subtraction of `x` and `y`
	   */

	  var subtract = typed(name$t, {
	    'number, number': function numberNumber(x, y) {
	      return x - y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.sub(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.minus(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.sub(y);
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (x.value === null) {
	        throw new Error('Parameter x contains a unit with undefined value');
	      }

	      if (y.value === null) {
	        throw new Error('Parameter y contains a unit with undefined value');
	      }

	      if (!x.equalBase(y)) {
	        throw new Error('Units do not match');
	      }

	      var res = x.clone();
	      res.value = subtract(res.value, y.value);
	      res.fixPrefix = false;
	      return res;
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm05(x, y, subtract);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm03(y, x, subtract, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm01(x, y, subtract, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      checkEqualDimensions(x, y);
	      return algorithm13(x, y, subtract);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return subtract(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return subtract(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return subtract(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm10(x, unaryMinus(y), addScalar);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, subtract);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm10(y, x, subtract, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, subtract, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, subtract, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, subtract, true).valueOf();
	    }
	  });
	  return subtract;
	});
	/**
	 * Check whether matrix x and y have the same number of dimensions.
	 * Throws a DimensionError when dimensions are not equal
	 * @param {Matrix} x
	 * @param {Matrix} y
	 */

	function checkEqualDimensions(x, y) {
	  var xsize = x.size();
	  var ysize = y.size();

	  if (xsize.length !== ysize.length) {
	    throw new DimensionError(xsize.length, ysize.length);
	  }
	}

	var name$u = 'algorithm07';
	var dependencies$v = ['typed', 'DenseMatrix'];
	var createAlgorithm07 = /* #__PURE__ */factory(name$u, dependencies$v, function (_ref) {
	  var typed = _ref.typed,
	      DenseMatrix = _ref.DenseMatrix;

	  /**
	   * Iterates over SparseMatrix A and SparseMatrix B items (zero and nonzero) and invokes the callback function f(Aij, Bij).
	   * Callback function invoked MxN times.
	   *
	   * C(i,j) = f(Aij, Bij)
	   *
	   * @param {Matrix}   a                 The SparseMatrix instance (A)
	   * @param {Matrix}   b                 The SparseMatrix instance (B)
	   * @param {Function} callback          The f(Aij,Bij) operation to invoke
	   *
	   * @return {Matrix}                    DenseMatrix (C)
	   *
	   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
	   */
	  return function algorithm07(a, b, callback) {
	    // sparse matrix arrays
	    var asize = a._size;
	    var adt = a._datatype; // sparse matrix arrays

	    var bsize = b._size;
	    var bdt = b._datatype; // validate dimensions

	    if (asize.length !== bsize.length) {
	      throw new DimensionError(asize.length, bsize.length);
	    } // check rows & columns


	    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
	      throw new RangeError('Dimension mismatch. Matrix A (' + asize + ') must match Matrix B (' + bsize + ')');
	    } // rows & columns


	    var rows = asize[0];
	    var columns = asize[1]; // datatype

	    var dt; // zero value

	    var zero = 0; // callback signature to use

	    var cf = callback; // process data types

	    if (typeof adt === 'string' && adt === bdt) {
	      // datatype
	      dt = adt; // convert 0 to the same datatype

	      zero = typed.convert(0, dt); // callback

	      cf = typed.find(callback, [dt, dt]);
	    } // vars


	    var i, j; // result arrays

	    var cdata = []; // initialize c

	    for (i = 0; i < rows; i++) {
	      cdata[i] = [];
	    } // workspaces


	    var xa = [];
	    var xb = []; // marks indicating we have a value in x for a given column

	    var wa = [];
	    var wb = []; // loop columns

	    for (j = 0; j < columns; j++) {
	      // columns mark
	      var mark = j + 1; // scatter the values of A(:,j) into workspace

	      _scatter(a, j, wa, xa, mark); // scatter the values of B(:,j) into workspace


	      _scatter(b, j, wb, xb, mark); // loop rows


	      for (i = 0; i < rows; i++) {
	        // matrix values @ i,j
	        var va = wa[i] === mark ? xa[i] : zero;
	        var vb = wb[i] === mark ? xb[i] : zero; // invoke callback

	        cdata[i][j] = cf(va, vb);
	      }
	    } // return dense matrix


	    return new DenseMatrix({
	      data: cdata,
	      size: [rows, columns],
	      datatype: dt
	    });
	  };

	  function _scatter(m, j, w, x, mark) {
	    // a arrays
	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // loop values in column j

	    for (var k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
	      // row
	      var i = index[k]; // update workspace

	      w[i] = mark;
	      x[i] = values[k];
	    }
	  }
	});

	var name$v = 'conj';
	var dependencies$w = ['typed'];
	var createConj = /* #__PURE__ */factory(name$v, dependencies$w, function (_ref) {
	  var typed = _ref.typed;

	  /**
	   * Compute the complex conjugate of a complex value.
	   * If `x = a+bi`, the complex conjugate of `x` is `a - bi`.
	   *
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.conj(x)
	   *
	   * Examples:
	   *
	   *    math.conj(math.complex('2 + 3i'))  // returns Complex 2 - 3i
	   *    math.conj(math.complex('2 - 3i'))  // returns Complex 2 + 3i
	   *    math.conj(math.complex('-5.2i'))  // returns Complex 5.2i
	   *
	   * See also:
	   *
	   *    re, im, arg, abs
	   *
	   * @param {number | BigNumber | Complex | Array | Matrix} x
	   *            A complex number or array with complex numbers
	   * @return {number | BigNumber | Complex | Array | Matrix}
	   *            The complex conjugate of x
	   */
	  var conj = typed(name$v, {
	    number: function number(x) {
	      return x;
	    },
	    BigNumber: function BigNumber(x) {
	      return x;
	    },
	    Complex: function Complex(x) {
	      return x.conjugate();
	    },
	    'Array | Matrix': function ArrayMatrix(x) {
	      return deepMap(x, conj);
	    }
	  });
	  return conj;
	});

	var name$w = 'identity';
	var dependencies$x = ['typed', 'config', 'matrix', 'BigNumber', 'DenseMatrix', 'SparseMatrix'];
	var createIdentity = /* #__PURE__ */factory(name$w, dependencies$x, function (_ref) {
	  var typed = _ref.typed,
	      config = _ref.config,
	      matrix = _ref.matrix,
	      BigNumber = _ref.BigNumber,
	      DenseMatrix = _ref.DenseMatrix,
	      SparseMatrix = _ref.SparseMatrix;

	  /**
	   * Create a 2-dimensional identity matrix with size m x n or n x n.
	   * The matrix has ones on the diagonal and zeros elsewhere.
	   *
	   * Syntax:
	   *
	   *    math.identity(n)
	   *    math.identity(n, format)
	   *    math.identity(m, n)
	   *    math.identity(m, n, format)
	   *    math.identity([m, n])
	   *    math.identity([m, n], format)
	   *
	   * Examples:
	   *
	   *    math.identity(3)                    // returns [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	   *    math.identity(3, 2)                 // returns [[1, 0], [0, 1], [0, 0]]
	   *
	   *    const A = [[1, 2, 3], [4, 5, 6]]
	   *    math.identity(math.size(A))         // returns [[1, 0, 0], [0, 1, 0]]
	   *
	   * See also:
	   *
	   *    diag, ones, zeros, size, range
	   *
	   * @param {...number | Matrix | Array} size   The size for the matrix
	   * @param {string} [format]                   The Matrix storage format
	   *
	   * @return {Matrix | Array | number} A matrix with ones on the diagonal.
	   */
	  return typed(name$w, {
	    '': function _() {
	      return config.matrix === 'Matrix' ? matrix([]) : [];
	    },
	    string: function string(format) {
	      return matrix(format);
	    },
	    'number | BigNumber': function numberBigNumber(rows) {
	      return _identity(rows, rows, config.matrix === 'Matrix' ? 'dense' : undefined);
	    },
	    'number | BigNumber, string': function numberBigNumberString(rows, format) {
	      return _identity(rows, rows, format);
	    },
	    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(rows, cols) {
	      return _identity(rows, cols, config.matrix === 'Matrix' ? 'dense' : undefined);
	    },
	    'number | BigNumber, number | BigNumber, string': function numberBigNumberNumberBigNumberString(rows, cols, format) {
	      return _identity(rows, cols, format);
	    },
	    Array: function Array(size) {
	      return _identityVector(size);
	    },
	    'Array, string': function ArrayString(size, format) {
	      return _identityVector(size, format);
	    },
	    Matrix: function Matrix(size) {
	      return _identityVector(size.valueOf(), size.storage());
	    },
	    'Matrix, string': function MatrixString(size, format) {
	      return _identityVector(size.valueOf(), format);
	    }
	  });

	  function _identityVector(size, format) {
	    switch (size.length) {
	      case 0:
	        return format ? matrix(format) : [];

	      case 1:
	        return _identity(size[0], size[0], format);

	      case 2:
	        return _identity(size[0], size[1], format);

	      default:
	        throw new Error('Vector containing two values expected');
	    }
	  }
	  /**
	   * Create an identity matrix
	   * @param {number | BigNumber} rows
	   * @param {number | BigNumber} cols
	   * @param {string} [format]
	   * @returns {Matrix}
	   * @private
	   */


	  function _identity(rows, cols, format) {
	    // BigNumber constructor with the right precision
	    var Big = isBigNumber(rows) || isBigNumber(cols) ? BigNumber : null;
	    if (isBigNumber(rows)) rows = rows.toNumber();
	    if (isBigNumber(cols)) cols = cols.toNumber();

	    if (!isInteger(rows) || rows < 1) {
	      throw new Error('Parameters in function identity must be positive integers');
	    }

	    if (!isInteger(cols) || cols < 1) {
	      throw new Error('Parameters in function identity must be positive integers');
	    }

	    var one = Big ? new BigNumber(1) : 1;
	    var defaultValue = Big ? new Big(0) : 0;
	    var size = [rows, cols]; // check we need to return a matrix

	    if (format) {
	      // create diagonal matrix (use optimized implementation for storage format)
	      if (format === 'sparse') {
	        return SparseMatrix.diagonal(size, one, 0, defaultValue);
	      }

	      if (format === 'dense') {
	        return DenseMatrix.diagonal(size, one, 0, defaultValue);
	      }

	      throw new TypeError("Unknown matrix type \"".concat(format, "\""));
	    } // create and resize array


	    var res = resize([], size, defaultValue); // fill in ones on the diagonal

	    var minimum = rows < cols ? rows : cols; // fill diagonal

	    for (var d = 0; d < minimum; d++) {
	      res[d][d] = one;
	    }

	    return res;
	  }
	});

	function noBignumber() {
	  throw new Error('No "bignumber" implementation available');
	}
	function noFraction() {
	  throw new Error('No "fraction" implementation available');
	}
	function noMatrix() {
	  throw new Error('No "matrix" implementation available');
	}

	var name$x = 'size';
	var dependencies$y = ['typed', 'config', '?matrix'];
	var createSize = /* #__PURE__ */factory(name$x, dependencies$y, function (_ref) {
	  var typed = _ref.typed,
	      config = _ref.config,
	      matrix = _ref.matrix;

	  /**
	   * Calculate the size of a matrix or scalar.
	   *
	   * Syntax:
	   *
	   *     math.size(x)
	   *
	   * Examples:
	   *
	   *     math.size(2.3)                  // returns []
	   *     math.size('hello world')        // returns [11]
	   *
	   *     const A = [[1, 2, 3], [4, 5, 6]]
	   *     math.size(A)                    // returns [2, 3]
	   *     math.size(math.range(1,6))      // returns [5]
	   *
	   * See also:
	   *
	   *     resize, squeeze, subset
	   *
	   * @param {boolean | number | Complex | Unit | string | Array | Matrix} x  A matrix
	   * @return {Array | Matrix} A vector with size of `x`.
	   */
	  return typed(name$x, {
	    Matrix: function Matrix(x) {
	      return x.create(x.size());
	    },
	    Array: arraySize,
	    string: function string(x) {
	      return config.matrix === 'Array' ? [x.length] : matrix([x.length]);
	    },
	    'number | Complex | BigNumber | Unit | boolean | null': function numberComplexBigNumberUnitBooleanNull(x) {
	      // scalar
	      return config.matrix === 'Array' ? [] : matrix ? matrix([]) : noMatrix();
	    }
	  });
	});

	/**
	 * Improve error messages for statistics functions. Errors are typically
	 * thrown in an internally used function like larger, causing the error
	 * not to mention the function (like max) which is actually used by the user.
	 *
	 * @param {Error} err
	 * @param {String} fnName
	 * @param {*} [value]
	 * @return {Error}
	 */

	function improveErrorMessage(err, fnName, value) {
	  // TODO: add information with the index (also needs transform in expression parser)
	  var details;

	  if (String(err).indexOf('Unexpected type') !== -1) {
	    details = arguments.length > 2 ? ' (type: ' + typeOf(value) + ', value: ' + JSON.stringify(value) + ')' : ' (type: ' + err.data.actual + ')';
	    return new TypeError('Cannot calculate ' + fnName + ', unexpected type of argument' + details);
	  }

	  if (String(err).indexOf('complex numbers') !== -1) {
	    details = arguments.length > 2 ? ' (type: ' + typeOf(value) + ', value: ' + JSON.stringify(value) + ')' : '';
	    return new TypeError('Cannot calculate ' + fnName + ', no ordering relation is defined for complex numbers' + details);
	  }

	  return err;
	}

	var name$y = 'numeric';
	var dependencies$z = ['number', '?bignumber', '?fraction'];
	var createNumeric = /* #__PURE__ */factory(name$y, dependencies$z, function (_ref) {
	  var _number = _ref.number,
	      bignumber = _ref.bignumber,
	      fraction = _ref.fraction;
	  var validInputTypes = {
	    string: true,
	    number: true,
	    BigNumber: true,
	    Fraction: true
	  }; // Load the conversion functions for each output type

	  var validOutputTypes = {
	    number: function number(x) {
	      return _number(x);
	    },
	    BigNumber: bignumber ? function (x) {
	      return bignumber(x);
	    } : noBignumber,
	    Fraction: fraction ? function (x) {
	      return fraction(x);
	    } : noFraction
	  };
	  /**
	   * Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.
	   *
	   * Syntax:
	   *
	   *    math.numeric(x)
	   *
	   * Examples:
	   *
	   *    math.numeric('4')                           // returns number 4
	   *    math.numeric('4', 'number')                 // returns number 4
	   *    math.numeric('4', 'BigNumber')              // returns BigNumber 4
	   *    math.numeric('4', 'Fraction')               // returns Fraction 4
	   *    math.numeric(4, 'Fraction')                 // returns Fraction 4
	   *    math.numeric(math.fraction(2, 5), 'number') // returns number 0.4
	   *
	   * See also:
	   *
	   *    number, fraction, bignumber, string, format
	   *
	   * @param {string | number | BigNumber | Fraction } value
	   *              A numeric value or a string containing a numeric value
	   * @param {string} outputType
	   *              Desired numeric output type.
	   *              Available values: 'number', 'BigNumber', or 'Fraction'
	   * @return {number | BigNumber | Fraction}
	   *              Returns an instance of the numeric in the requested type
	   */

	  return function numeric(value, outputType) {
	    var inputType = typeOf(value);

	    if (!(inputType in validInputTypes)) {
	      throw new TypeError('Cannot convert ' + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(', '));
	    }

	    if (!(outputType in validOutputTypes)) {
	      throw new TypeError('Cannot convert ' + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(', '));
	    }

	    if (outputType === inputType) {
	      return value;
	    } else {
	      return validOutputTypes[outputType](value);
	    }
	  };
	});

	var name$z = 'divideScalar';
	var dependencies$A = ['typed', 'numeric'];
	var createDivideScalar = /* #__PURE__ */factory(name$z, dependencies$A, function (_ref) {
	  var typed = _ref.typed,
	      numeric = _ref.numeric;

	  /**
	   * Divide two scalar values, `x / y`.
	   * This function is meant for internal use: it is used by the public functions
	   * `divide` and `inv`.
	   *
	   * This function does not support collections (Array or Matrix).
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit} x   Numerator
	   * @param  {number | BigNumber | Fraction | Complex} y          Denominator
	   * @return {number | BigNumber | Fraction | Complex | Unit}     Quotient, `x / y`
	   * @private
	   */
	  var divideScalar = typed(name$z, {
	    'number, number': function numberNumber(x, y) {
	      return x / y;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      return x.div(y);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.div(y);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.div(y);
	    },
	    'Unit, number | Fraction | BigNumber': function UnitNumberFractionBigNumber(x, y) {
	      var res = x.clone(); // TODO: move the divide function to Unit.js, it uses internals of Unit

	      var one = numeric(1, typeOf(y));
	      res.value = divideScalar(res.value === null ? res._normalize(one) : res.value, y);
	      return res;
	    },
	    'number | Fraction | BigNumber, Unit': function numberFractionBigNumberUnit(x, y) {
	      var res = y.clone();
	      res = res.pow(-1); // TODO: move the divide function to Unit.js, it uses internals of Unit

	      var one = numeric(1, typeOf(x));
	      res.value = divideScalar(x, y.value === null ? y._normalize(one) : y.value);
	      return res;
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      return x.divide(y);
	    }
	  });
	  return divideScalar;
	});

	var name$A = 'smaller';
	var dependencies$B = ['typed', 'config', 'matrix', 'DenseMatrix'];
	var createSmaller = /* #__PURE__ */factory(name$A, dependencies$B, function (_ref) {
	  var typed = _ref.typed,
	      config = _ref.config,
	      matrix = _ref.matrix,
	      DenseMatrix = _ref.DenseMatrix;
	  var algorithm03 = createAlgorithm03({
	    typed: typed
	  });
	  var algorithm07 = createAlgorithm07({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm12 = createAlgorithm12({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm13 = createAlgorithm13({
	    typed: typed
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Test whether value x is smaller than y.
	   *
	   * The function returns true when x is smaller than y and the relative
	   * difference between x and y is smaller than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   * Strings are compared by their numerical value.
	   *
	   * Syntax:
	   *
	   *    math.smaller(x, y)
	   *
	   * Examples:
	   *
	   *    math.smaller(2, 3)            // returns true
	   *    math.smaller(5, 2 * 2)        // returns false
	   *
	   *    const a = math.unit('5 cm')
	   *    const b = math.unit('2 inch')
	   *    math.smaller(a, b)            // returns true
	   *
	   * See also:
	   *
	   *    equal, unequal, smallerEq, smaller, smallerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
	   */

	  var smaller = typed(name$A, {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x < y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x < y && !nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.lt(y) && !nearlyEqual$1(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.compare(y) === -1;
	    },
	    'Complex, Complex': function ComplexComplex(x, y) {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return smaller(x.value, y.value);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm07(x, y, smaller);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm03(y, x, smaller, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm03(x, y, smaller, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, smaller);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return smaller(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return smaller(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm12(x, y, smaller, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, smaller, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm12(y, x, smaller, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, smaller, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, smaller, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, smaller, true).valueOf();
	    }
	  });
	  return smaller;
	});

	var name$B = 'larger';
	var dependencies$C = ['typed', 'config', 'matrix', 'DenseMatrix'];
	var createLarger = /* #__PURE__ */factory(name$B, dependencies$C, function (_ref) {
	  var typed = _ref.typed,
	      config = _ref.config,
	      matrix = _ref.matrix,
	      DenseMatrix = _ref.DenseMatrix;
	  var algorithm03 = createAlgorithm03({
	    typed: typed
	  });
	  var algorithm07 = createAlgorithm07({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm12 = createAlgorithm12({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm13 = createAlgorithm13({
	    typed: typed
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Test whether value x is larger than y.
	   *
	   * The function returns true when x is larger than y and the relative
	   * difference between x and y is larger than the configured epsilon. The
	   * function cannot be used to compare values smaller than approximately 2.22e-16.
	   *
	   * For matrices, the function is evaluated element wise.
	   * Strings are compared by their numerical value.
	   *
	   * Syntax:
	   *
	   *    math.larger(x, y)
	   *
	   * Examples:
	   *
	   *    math.larger(2, 3)             // returns false
	   *    math.larger(5, 2 + 2)         // returns true
	   *
	   *    const a = math.unit('5 cm')
	   *    const b = math.unit('2 inch')
	   *    math.larger(a, b)             // returns false
	   *
	   * See also:
	   *
	   *    equal, unequal, smaller, smallerEq, largerEq, compare
	   *
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
	   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
	   * @return {boolean | Array | Matrix} Returns true when the x is larger than y, else returns false
	   */

	  var larger = typed(name$B, {
	    'boolean, boolean': function booleanBoolean(x, y) {
	      return x > y;
	    },
	    'number, number': function numberNumber(x, y) {
	      return x > y && !nearlyEqual(x, y, config.epsilon);
	    },
	    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
	      return x.gt(y) && !nearlyEqual$1(x, y, config.epsilon);
	    },
	    'Fraction, Fraction': function FractionFraction(x, y) {
	      return x.compare(y) === 1;
	    },
	    'Complex, Complex': function ComplexComplex() {
	      throw new TypeError('No ordering relation is defined for complex numbers');
	    },
	    'Unit, Unit': function UnitUnit(x, y) {
	      if (!x.equalBase(y)) {
	        throw new Error('Cannot compare units with different base');
	      }

	      return larger(x.value, y.value);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm07(x, y, larger);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm03(y, x, larger, true);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm03(x, y, larger, false);
	    },
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, larger);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return larger(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return larger(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return larger(x, matrix(y));
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm12(x, y, larger, false);
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, larger, false);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm12(y, x, larger, true);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, larger, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, larger, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, larger, true).valueOf();
	    }
	  });
	  return larger;
	});

	var name$C = 'FibonacciHeap';
	var dependencies$D = ['smaller', 'larger'];
	var createFibonacciHeapClass = /* #__PURE__ */factory(name$C, dependencies$D, function (_ref) {
	  var smaller = _ref.smaller,
	      larger = _ref.larger;
	  var oneOverLogPhi = 1.0 / Math.log((1.0 + Math.sqrt(5.0)) / 2.0);
	  /**
	   * Fibonacci Heap implementation, used interally for Matrix math.
	   * @class FibonacciHeap
	   * @constructor FibonacciHeap
	   */

	  function FibonacciHeap() {
	    if (!(this instanceof FibonacciHeap)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    } // initialize fields


	    this._minimum = null;
	    this._size = 0;
	  }
	  /**
	   * Attach type information
	   */


	  FibonacciHeap.prototype.type = 'FibonacciHeap';
	  FibonacciHeap.prototype.isFibonacciHeap = true;
	  /**
	   * Inserts a new data element into the heap. No heap consolidation is
	   * performed at this time, the new node is simply inserted into the root
	   * list of this heap. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */

	  FibonacciHeap.prototype.insert = function (key, value) {
	    // create node
	    var node = {
	      key: key,
	      value: value,
	      degree: 0
	    }; // check we have a node in the minimum

	    if (this._minimum) {
	      // minimum node
	      var minimum = this._minimum; // update left & right of node

	      node.left = minimum;
	      node.right = minimum.right;
	      minimum.right = node;
	      node.right.left = node; // update minimum node in heap if needed

	      if (smaller(key, minimum.key)) {
	        // node has a smaller key, use it as minimum
	        this._minimum = node;
	      }
	    } else {
	      // set left & right
	      node.left = node;
	      node.right = node; // this is the first node

	      this._minimum = node;
	    } // increment number of nodes in heap


	    this._size++; // return node

	    return node;
	  };
	  /**
	   * Returns the number of nodes in heap. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */


	  FibonacciHeap.prototype.size = function () {
	    return this._size;
	  };
	  /**
	   * Removes all elements from this heap.
	   * @memberof FibonacciHeap
	   */


	  FibonacciHeap.prototype.clear = function () {
	    this._minimum = null;
	    this._size = 0;
	  };
	  /**
	   * Returns true if the heap is empty, otherwise false.
	   * @memberof FibonacciHeap
	   */


	  FibonacciHeap.prototype.isEmpty = function () {
	    return this._size === 0;
	  };
	  /**
	   * Extracts the node with minimum key from heap. Amortized running
	   * time: O(log n).
	   * @memberof FibonacciHeap
	   */


	  FibonacciHeap.prototype.extractMinimum = function () {
	    // node to remove
	    var node = this._minimum; // check we have a minimum

	    if (node === null) {
	      return node;
	    } // current minimum


	    var minimum = this._minimum; // get number of children

	    var numberOfChildren = node.degree; // pointer to the first child

	    var x = node.child; // for each child of node do...

	    while (numberOfChildren > 0) {
	      // store node in right side
	      var tempRight = x.right; // remove x from child list

	      x.left.right = x.right;
	      x.right.left = x.left; // add x to root list of heap

	      x.left = minimum;
	      x.right = minimum.right;
	      minimum.right = x;
	      x.right.left = x; // set Parent[x] to null

	      x.parent = null;
	      x = tempRight;
	      numberOfChildren--;
	    } // remove node from root list of heap


	    node.left.right = node.right;
	    node.right.left = node.left; // update minimum

	    if (node === node.right) {
	      // empty
	      minimum = null;
	    } else {
	      // update minimum
	      minimum = node.right; // we need to update the pointer to the root with minimum key

	      minimum = _findMinimumNode(minimum, this._size);
	    } // decrement size of heap


	    this._size--; // update minimum

	    this._minimum = minimum; // return node

	    return node;
	  };
	  /**
	   * Removes a node from the heap given the reference to the node. The trees
	   * in the heap will be consolidated, if necessary. This operation may fail
	   * to remove the correct element if there are nodes with key value -Infinity.
	   * Running time: O(log n) amortized.
	   * @memberof FibonacciHeap
	   */


	  FibonacciHeap.prototype.remove = function (node) {
	    // decrease key value
	    this._minimum = _decreaseKey(this._minimum, node, -1); // remove the smallest

	    this.extractMinimum();
	  };
	  /**
	   * Decreases the key value for a heap node, given the new value to take on.
	   * The structure of the heap may be changed and will not be consolidated.
	   * Running time: O(1) amortized.
	   * @memberof FibonacciHeap
	   */


	  function _decreaseKey(minimum, node, key) {
	    // set node key
	    node.key = key; // get parent node

	    var parent = node.parent;

	    if (parent && smaller(node.key, parent.key)) {
	      // remove node from parent
	      _cut(minimum, node, parent); // remove all nodes from parent to the root parent


	      _cascadingCut(minimum, parent);
	    } // update minimum node if needed


	    if (smaller(node.key, minimum.key)) {
	      minimum = node;
	    } // return minimum


	    return minimum;
	  }
	  /**
	   * The reverse of the link operation: removes node from the child list of parent.
	   * This method assumes that min is non-null. Running time: O(1).
	   * @memberof FibonacciHeap
	   */


	  function _cut(minimum, node, parent) {
	    // remove node from parent children and decrement Degree[parent]
	    node.left.right = node.right;
	    node.right.left = node.left;
	    parent.degree--; // reset y.child if necessary

	    if (parent.child === node) {
	      parent.child = node.right;
	    } // remove child if degree is 0


	    if (parent.degree === 0) {
	      parent.child = null;
	    } // add node to root list of heap


	    node.left = minimum;
	    node.right = minimum.right;
	    minimum.right = node;
	    node.right.left = node; // set parent[node] to null

	    node.parent = null; // set mark[node] to false

	    node.mark = false;
	  }
	  /**
	   * Performs a cascading cut operation. This cuts node from its parent and then
	   * does the same for its parent, and so on up the tree.
	   * Running time: O(log n); O(1) excluding the recursion.
	   * @memberof FibonacciHeap
	   */


	  function _cascadingCut(minimum, node) {
	    // store parent node
	    var parent = node.parent; // if there's a parent...

	    if (!parent) {
	      return;
	    } // if node is unmarked, set it marked


	    if (!node.mark) {
	      node.mark = true;
	    } else {
	      // it's marked, cut it from parent
	      _cut(minimum, node, parent); // cut its parent as well


	      _cascadingCut(parent);
	    }
	  }
	  /**
	   * Make the first node a child of the second one. Running time: O(1) actual.
	   * @memberof FibonacciHeap
	   */


	  var _linkNodes = function _linkNodes(node, parent) {
	    // remove node from root list of heap
	    node.left.right = node.right;
	    node.right.left = node.left; // make node a Child of parent

	    node.parent = parent;

	    if (!parent.child) {
	      parent.child = node;
	      node.right = node;
	      node.left = node;
	    } else {
	      node.left = parent.child;
	      node.right = parent.child.right;
	      parent.child.right = node;
	      node.right.left = node;
	    } // increase degree[parent]


	    parent.degree++; // set mark[node] false

	    node.mark = false;
	  };

	  function _findMinimumNode(minimum, size) {
	    // to find trees of the same degree efficiently we use an array of length O(log n) in which we keep a pointer to one root of each degree
	    var arraySize = Math.floor(Math.log(size) * oneOverLogPhi) + 1; // create list with initial capacity

	    var array = new Array(arraySize); // find the number of root nodes.

	    var numRoots = 0;
	    var x = minimum;

	    if (x) {
	      numRoots++;
	      x = x.right;

	      while (x !== minimum) {
	        numRoots++;
	        x = x.right;
	      }
	    } // vars


	    var y; // For each node in root list do...

	    while (numRoots > 0) {
	      // access this node's degree..
	      var d = x.degree; // get next node

	      var next = x.right; // check if there is a node already in array with the same degree

	      while (true) {
	        // get node with the same degree is any
	        y = array[d];

	        if (!y) {
	          break;
	        } // make one node with the same degree a child of the other, do this based on the key value.


	        if (larger(x.key, y.key)) {
	          var temp = y;
	          y = x;
	          x = temp;
	        } // make y a child of x


	        _linkNodes(y, x); // we have handled this degree, go to next one.


	        array[d] = null;
	        d++;
	      } // save this node for later when we might encounter another of the same degree.


	      array[d] = x; // move forward through list.

	      x = next;
	      numRoots--;
	    } // Set min to null (effectively losing the root list) and reconstruct the root list from the array entries in array[].


	    minimum = null; // loop nodes in array

	    for (var i = 0; i < arraySize; i++) {
	      // get current node
	      y = array[i];

	      if (!y) {
	        continue;
	      } // check if we have a linked list


	      if (minimum) {
	        // First remove node from root list.
	        y.left.right = y.right;
	        y.right.left = y.left; // now add to root list, again.

	        y.left = minimum;
	        y.right = minimum.right;
	        minimum.right = y;
	        y.right.left = y; // check if this is a new min.

	        if (smaller(y.key, minimum.key)) {
	          minimum = y;
	        }
	      } else {
	        minimum = y;
	      }
	    }

	    return minimum;
	  }

	  return FibonacciHeap;
	}, {
	  isClass: true
	});

	var name$D = 'Spa';
	var dependencies$E = ['addScalar', 'equalScalar', 'FibonacciHeap'];
	var createSpaClass = /* #__PURE__ */factory(name$D, dependencies$E, function (_ref) {
	  var addScalar = _ref.addScalar,
	      equalScalar = _ref.equalScalar,
	      FibonacciHeap = _ref.FibonacciHeap;

	  /**
	   * An ordered Sparse Accumulator is a representation for a sparse vector that includes a dense array
	   * of the vector elements and an ordered list of non-zero elements.
	   */
	  function Spa() {
	    if (!(this instanceof Spa)) {
	      throw new SyntaxError('Constructor must be called with the new operator');
	    } // allocate vector, TODO use typed arrays


	    this._values = [];
	    this._heap = new FibonacciHeap();
	  }
	  /**
	   * Attach type information
	   */


	  Spa.prototype.type = 'Spa';
	  Spa.prototype.isSpa = true;
	  /**
	   * Set the value for index i.
	   *
	   * @param {number} i                       The index
	   * @param {number | BigNumber | Complex}   The value at index i
	   */

	  Spa.prototype.set = function (i, v) {
	    // check we have a value @ i
	    if (!this._values[i]) {
	      // insert in heap
	      var node = this._heap.insert(i, v); // set the value @ i


	      this._values[i] = node;
	    } else {
	      // update the value @ i
	      this._values[i].value = v;
	    }
	  };

	  Spa.prototype.get = function (i) {
	    var node = this._values[i];

	    if (node) {
	      return node.value;
	    }

	    return 0;
	  };

	  Spa.prototype.accumulate = function (i, v) {
	    // node @ i
	    var node = this._values[i];

	    if (!node) {
	      // insert in heap
	      node = this._heap.insert(i, v); // initialize value

	      this._values[i] = node;
	    } else {
	      // accumulate value
	      node.value = addScalar(node.value, v);
	    }
	  };

	  Spa.prototype.forEach = function (from, to, callback) {
	    // references
	    var heap = this._heap;
	    var values = this._values; // nodes

	    var nodes = []; // node with minimum key, save it

	    var node = heap.extractMinimum();

	    if (node) {
	      nodes.push(node);
	    } // extract nodes from heap (ordered)


	    while (node && node.key <= to) {
	      // check it is in range
	      if (node.key >= from) {
	        // check value is not zero
	        if (!equalScalar(node.value, 0)) {
	          // invoke callback
	          callback(node.key, node.value, this);
	        }
	      } // extract next node, save it


	      node = heap.extractMinimum();

	      if (node) {
	        nodes.push(node);
	      }
	    } // reinsert all nodes in heap


	    for (var i = 0; i < nodes.length; i++) {
	      // current node
	      var n = nodes[i]; // insert node in heap

	      node = heap.insert(n.key, n.value); // update values

	      values[node.key] = node;
	    }
	  };

	  Spa.prototype.swap = function (i, j) {
	    // node @ i and j
	    var nodei = this._values[i];
	    var nodej = this._values[j]; // check we need to insert indeces

	    if (!nodei && nodej) {
	      // insert in heap
	      nodei = this._heap.insert(i, nodej.value); // remove from heap

	      this._heap.remove(nodej); // set values


	      this._values[i] = nodei;
	      this._values[j] = undefined;
	    } else if (nodei && !nodej) {
	      // insert in heap
	      nodej = this._heap.insert(j, nodei.value); // remove from heap

	      this._heap.remove(nodei); // set values


	      this._values[j] = nodej;
	      this._values[i] = undefined;
	    } else if (nodei && nodej) {
	      // swap values
	      var v = nodei.value;
	      nodei.value = nodej.value;
	      nodej.value = v;
	    }
	  };

	  return Spa;
	}, {
	  isClass: true
	});

	var name$E = 'add';
	var dependencies$F = ['typed', 'matrix', 'addScalar', 'equalScalar', 'DenseMatrix', 'SparseMatrix'];
	var createAdd = /* #__PURE__ */factory(name$E, dependencies$F, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      addScalar = _ref.addScalar,
	      equalScalar = _ref.equalScalar,
	      DenseMatrix = _ref.DenseMatrix,
	      SparseMatrix = _ref.SparseMatrix;
	  var algorithm01 = createAlgorithm01({
	    typed: typed
	  });
	  var algorithm04 = createAlgorithm04({
	    typed: typed,
	    equalScalar: equalScalar
	  });
	  var algorithm10 = createAlgorithm10({
	    typed: typed,
	    DenseMatrix: DenseMatrix
	  });
	  var algorithm13 = createAlgorithm13({
	    typed: typed
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Add two or more values, `x + y`.
	   * For matrices, the function is evaluated element wise.
	   *
	   * Syntax:
	   *
	   *    math.add(x, y)
	   *    math.add(x, y, z, ...)
	   *
	   * Examples:
	   *
	   *    math.add(2, 3)               // returns number 5
	   *    math.add(2, 3, 4)            // returns number 9
	   *
	   *    const a = math.complex(2, 3)
	   *    const b = math.complex(-4, 1)
	   *    math.add(a, b)               // returns Complex -2 + 4i
	   *
	   *    math.add([1, 2, 3], 4)       // returns Array [5, 6, 7]
	   *
	   *    const c = math.unit('5 cm')
	   *    const d = math.unit('2.1 mm')
	   *    math.add(c, d)               // returns Unit 52.1 mm
	   *
	   *    math.add("2.3", "4")         // returns number 6.3
	   *
	   * See also:
	   *
	   *    subtract, sum
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x First value to add
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Second value to add
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Sum of `x` and `y`
	   */

	  var add = typed(name$E, extend({
	    // we extend the signatures of addScalar with signatures dealing with matrices
	    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
	      return algorithm13(x, y, addScalar);
	    },
	    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
	      return algorithm01(x, y, addScalar, false);
	    },
	    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
	      return algorithm01(y, x, addScalar, true);
	    },
	    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
	      return algorithm04(x, y, addScalar);
	    },
	    'Array, Array': function ArrayArray(x, y) {
	      // use matrix implementation
	      return add(matrix(x), matrix(y)).valueOf();
	    },
	    'Array, Matrix': function ArrayMatrix(x, y) {
	      // use matrix implementation
	      return add(matrix(x), y);
	    },
	    'Matrix, Array': function MatrixArray(x, y) {
	      // use matrix implementation
	      return add(x, matrix(y));
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, addScalar, false);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm10(x, y, addScalar, false);
	    },
	    'any, DenseMatrix': function anyDenseMatrix(x, y) {
	      return algorithm14(y, x, addScalar, true);
	    },
	    'any, SparseMatrix': function anySparseMatrix(x, y) {
	      return algorithm10(y, x, addScalar, true);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, addScalar, false).valueOf();
	    },
	    'any, Array': function anyArray(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(y), x, addScalar, true).valueOf();
	    },
	    'any, any': addScalar,
	    'any, any, ...any': function anyAnyAny(x, y, rest) {
	      var result = add(x, y);

	      for (var i = 0; i < rest.length; i++) {
	        result = add(result, rest[i]);
	      }

	      return result;
	    }
	  }, addScalar.signatures));
	  return add;
	});

	var name$F = 'dot';
	var dependencies$G = ['typed', 'addScalar', 'multiplyScalar', 'conj', 'size'];
	var createDot = /* #__PURE__ */factory(name$F, dependencies$G, function (_ref) {
	  var typed = _ref.typed,
	      addScalar = _ref.addScalar,
	      multiplyScalar = _ref.multiplyScalar,
	      conj = _ref.conj,
	      size = _ref.size;

	  /**
	   * Calculate the dot product of two vectors. The dot product of
	   * `A = [a1, a2, ..., an]` and `B = [b1, b2, ..., bn]` is defined as:
	   *
	   *    dot(A, B) = conj(a1) * b1 + conj(a2) * b2 + ... + conj(an) * bn
	   *
	   * Syntax:
	   *
	   *    math.dot(x, y)
	   *
	   * Examples:
	   *
	   *    math.dot([2, 4, 1], [2, 2, 3])       // returns number 15
	   *    math.multiply([2, 4, 1], [2, 2, 3])  // returns number 15
	   *
	   * See also:
	   *
	   *    multiply, cross
	   *
	   * @param  {Array | Matrix} x     First vector
	   * @param  {Array | Matrix} y     Second vector
	   * @return {number}               Returns the dot product of `x` and `y`
	   */
	  return typed(name$F, {
	    'Array | DenseMatrix, Array | DenseMatrix': _denseDot,
	    'SparseMatrix, SparseMatrix': _sparseDot
	  });

	  function _validateDim(x, y) {
	    var xSize = _size(x);

	    var ySize = _size(y);

	    var xLen, yLen;

	    if (xSize.length === 1) {
	      xLen = xSize[0];
	    } else if (xSize.length === 2 && xSize[1] === 1) {
	      xLen = xSize[0];
	    } else {
	      throw new RangeError('Expected a column vector, instead got a matrix of size (' + xSize.join(', ') + ')');
	    }

	    if (ySize.length === 1) {
	      yLen = ySize[0];
	    } else if (ySize.length === 2 && ySize[1] === 1) {
	      yLen = ySize[0];
	    } else {
	      throw new RangeError('Expected a column vector, instead got a matrix of size (' + ySize.join(', ') + ')');
	    }

	    if (xLen !== yLen) throw new RangeError('Vectors must have equal length (' + xLen + ' != ' + yLen + ')');
	    if (xLen === 0) throw new RangeError('Cannot calculate the dot product of empty vectors');
	    return xLen;
	  }

	  function _denseDot(a, b) {
	    var N = _validateDim(a, b);

	    var adata = isMatrix(a) ? a._data : a;
	    var adt = isMatrix(a) ? a._datatype : undefined;
	    var bdata = isMatrix(b) ? b._data : b;
	    var bdt = isMatrix(b) ? b._datatype : undefined; // are these 2-dimensional column vectors? (as opposed to 1-dimensional vectors)

	    var aIsColumn = _size(a).length === 2;
	    var bIsColumn = _size(b).length === 2;
	    var add = addScalar;
	    var mul = multiplyScalar; // process data types

	    if (adt && bdt && adt === bdt && typeof adt === 'string') {
	      var dt = adt; // find signatures that matches (dt, dt)

	      add = typed.find(addScalar, [dt, dt]);
	      mul = typed.find(multiplyScalar, [dt, dt]);
	    } // both vectors 1-dimensional


	    if (!aIsColumn && !bIsColumn) {
	      var c = mul(conj(adata[0]), bdata[0]);

	      for (var i = 1; i < N; i++) {
	        c = add(c, mul(conj(adata[i]), bdata[i]));
	      }

	      return c;
	    } // a is 1-dim, b is column


	    if (!aIsColumn && bIsColumn) {
	      var _c = mul(conj(adata[0]), bdata[0][0]);

	      for (var _i = 1; _i < N; _i++) {
	        _c = add(_c, mul(conj(adata[_i]), bdata[_i][0]));
	      }

	      return _c;
	    } // a is column, b is 1-dim


	    if (aIsColumn && !bIsColumn) {
	      var _c2 = mul(conj(adata[0][0]), bdata[0]);

	      for (var _i2 = 1; _i2 < N; _i2++) {
	        _c2 = add(_c2, mul(conj(adata[_i2][0]), bdata[_i2]));
	      }

	      return _c2;
	    } // both vectors are column


	    if (aIsColumn && bIsColumn) {
	      var _c3 = mul(conj(adata[0][0]), bdata[0][0]);

	      for (var _i3 = 1; _i3 < N; _i3++) {
	        _c3 = add(_c3, mul(conj(adata[_i3][0]), bdata[_i3][0]));
	      }

	      return _c3;
	    }
	  }

	  function _sparseDot(x, y) {
	    _validateDim(x, y);

	    var xindex = x._index;
	    var xvalues = x._values;
	    var yindex = y._index;
	    var yvalues = y._values; // TODO optimize add & mul using datatype

	    var c = 0;
	    var add = addScalar;
	    var mul = multiplyScalar;
	    var i = 0;
	    var j = 0;

	    while (i < xindex.length && j < yindex.length) {
	      var I = xindex[i];
	      var J = yindex[j];

	      if (I < J) {
	        i++;
	        continue;
	      }

	      if (I > J) {
	        j++;
	        continue;
	      }

	      if (I === J) {
	        c = add(c, mul(xvalues[i], yvalues[j]));
	        i++;
	        j++;
	      }
	    }

	    return c;
	  } // TODO remove this once #1771 is fixed


	  function _size(x) {
	    return isMatrix(x) ? x.size() : size(x);
	  }
	});

	var name$G = 'lup';
	var dependencies$H = ['typed', 'matrix', 'abs', 'addScalar', 'divideScalar', 'multiplyScalar', 'subtract', 'larger', 'equalScalar', 'unaryMinus', 'DenseMatrix', 'SparseMatrix', 'Spa'];
	var createLup = /* #__PURE__ */factory(name$G, dependencies$H, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      abs = _ref.abs,
	      addScalar = _ref.addScalar,
	      divideScalar = _ref.divideScalar,
	      multiplyScalar = _ref.multiplyScalar,
	      subtract = _ref.subtract,
	      larger = _ref.larger,
	      equalScalar = _ref.equalScalar,
	      unaryMinus = _ref.unaryMinus,
	      DenseMatrix = _ref.DenseMatrix,
	      SparseMatrix = _ref.SparseMatrix,
	      Spa = _ref.Spa;

	  /**
	   * Calculate the Matrix LU decomposition with partial pivoting. Matrix `A` is decomposed in two matrices (`L`, `U`) and a
	   * row permutation vector `p` where `A[p,:] = L * U`
	   *
	   * Syntax:
	   *
	   *    math.lup(A)
	   *
	   * Example:
	   *
	   *    const m = [[2, 1], [1, 4]]
	   *    const r = math.lup(m)
	   *    // r = {
	   *    //   L: [[1, 0], [0.5, 1]],
	   *    //   U: [[2, 1], [0, 3.5]],
	   *    //   P: [0, 1]
	   *    // }
	   *
	   * See also:
	   *
	   *    slu, lsolve, lusolve, usolve
	   *
	   * @param {Matrix | Array} A    A two dimensional matrix or array for which to get the LUP decomposition.
	   *
	   * @return {{L: Array | Matrix, U: Array | Matrix, P: Array.<number>}} The lower triangular matrix, the upper triangular matrix and the permutation matrix.
	   */
	  return typed(name$G, {
	    DenseMatrix: function DenseMatrix(m) {
	      return _denseLUP(m);
	    },
	    SparseMatrix: function SparseMatrix(m) {
	      return _sparseLUP(m);
	    },
	    Array: function Array(a) {
	      // create dense matrix from array
	      var m = matrix(a); // lup, use matrix implementation

	      var r = _denseLUP(m); // result


	      return {
	        L: r.L.valueOf(),
	        U: r.U.valueOf(),
	        p: r.p
	      };
	    }
	  });

	  function _denseLUP(m) {
	    // rows & columns
	    var rows = m._size[0];
	    var columns = m._size[1]; // minimum rows and columns

	    var n = Math.min(rows, columns); // matrix array, clone original data

	    var data = clone(m._data); // l matrix arrays

	    var ldata = [];
	    var lsize = [rows, n]; // u matrix arrays

	    var udata = [];
	    var usize = [n, columns]; // vars

	    var i, j, k; // permutation vector

	    var p = [];

	    for (i = 0; i < rows; i++) {
	      p[i] = i;
	    } // loop columns


	    for (j = 0; j < columns; j++) {
	      // skip first column in upper triangular matrix
	      if (j > 0) {
	        // loop rows
	        for (i = 0; i < rows; i++) {
	          // min i,j
	          var min = Math.min(i, j); // v[i, j]

	          var s = 0; // loop up to min

	          for (k = 0; k < min; k++) {
	            // s = l[i, k] - data[k, j]
	            s = addScalar(s, multiplyScalar(data[i][k], data[k][j]));
	          }

	          data[i][j] = subtract(data[i][j], s);
	        }
	      } // row with larger value in cvector, row >= j


	      var pi = j;
	      var pabsv = 0;
	      var vjj = 0; // loop rows

	      for (i = j; i < rows; i++) {
	        // data @ i, j
	        var v = data[i][j]; // absolute value

	        var absv = abs(v); // value is greater than pivote value

	        if (larger(absv, pabsv)) {
	          // store row
	          pi = i; // update max value

	          pabsv = absv; // value @ [j, j]

	          vjj = v;
	        }
	      } // swap rows (j <-> pi)


	      if (j !== pi) {
	        // swap values j <-> pi in p
	        p[j] = [p[pi], p[pi] = p[j]][0]; // swap j <-> pi in data

	        DenseMatrix._swapRows(j, pi, data);
	      } // check column is in lower triangular matrix


	      if (j < rows) {
	        // loop rows (lower triangular matrix)
	        for (i = j + 1; i < rows; i++) {
	          // value @ i, j
	          var vij = data[i][j];

	          if (!equalScalar(vij, 0)) {
	            // update data
	            data[i][j] = divideScalar(data[i][j], vjj);
	          }
	        }
	      }
	    } // loop columns


	    for (j = 0; j < columns; j++) {
	      // loop rows
	      for (i = 0; i < rows; i++) {
	        // initialize row in arrays
	        if (j === 0) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i] = [];
	          } // L


	          ldata[i] = [];
	        } // check we are in the upper triangular matrix


	        if (i < j) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i][j] = data[i][j];
	          } // check column exists in lower triangular matrix


	          if (j < rows) {
	            // L
	            ldata[i][j] = 0;
	          }

	          continue;
	        } // diagonal value


	        if (i === j) {
	          // check row exists in upper triangular matrix
	          if (i < columns) {
	            // U
	            udata[i][j] = data[i][j];
	          } // check column exists in lower triangular matrix


	          if (j < rows) {
	            // L
	            ldata[i][j] = 1;
	          }

	          continue;
	        } // check row exists in upper triangular matrix


	        if (i < columns) {
	          // U
	          udata[i][j] = 0;
	        } // check column exists in lower triangular matrix


	        if (j < rows) {
	          // L
	          ldata[i][j] = data[i][j];
	        }
	      }
	    } // l matrix


	    var l = new DenseMatrix({
	      data: ldata,
	      size: lsize
	    }); // u matrix

	    var u = new DenseMatrix({
	      data: udata,
	      size: usize
	    }); // p vector

	    var pv = [];

	    for (i = 0, n = p.length; i < n; i++) {
	      pv[p[i]] = i;
	    } // return matrices


	    return {
	      L: l,
	      U: u,
	      p: pv,
	      toString: function toString() {
	        return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\nP: ' + this.p;
	      }
	    };
	  }

	  function _sparseLUP(m) {
	    // rows & columns
	    var rows = m._size[0];
	    var columns = m._size[1]; // minimum rows and columns

	    var n = Math.min(rows, columns); // matrix arrays (will not be modified, thanks to permutation vector)

	    var values = m._values;
	    var index = m._index;
	    var ptr = m._ptr; // l matrix arrays

	    var lvalues = [];
	    var lindex = [];
	    var lptr = [];
	    var lsize = [rows, n]; // u matrix arrays

	    var uvalues = [];
	    var uindex = [];
	    var uptr = [];
	    var usize = [n, columns]; // vars

	    var i, j, k; // permutation vectors, (current index -> original index) and (original index -> current index)

	    var pvCo = [];
	    var pvOc = [];

	    for (i = 0; i < rows; i++) {
	      pvCo[i] = i;
	      pvOc[i] = i;
	    } // swap indices in permutation vectors (condition x < y)!


	    var swapIndeces = function swapIndeces(x, y) {
	      // find pv indeces getting data from x and y
	      var kx = pvOc[x];
	      var ky = pvOc[y]; // update permutation vector current -> original

	      pvCo[kx] = y;
	      pvCo[ky] = x; // update permutation vector original -> current

	      pvOc[x] = ky;
	      pvOc[y] = kx;
	    }; // loop columns


	    var _loop = function _loop() {
	      // sparse accumulator
	      var spa = new Spa(); // check lower triangular matrix has a value @ column j

	      if (j < rows) {
	        // update ptr
	        lptr.push(lvalues.length); // first value in j column for lower triangular matrix

	        lvalues.push(1);
	        lindex.push(j);
	      } // update ptr


	      uptr.push(uvalues.length); // k0 <= k < k1 where k0 = _ptr[j] && k1 = _ptr[j+1]

	      var k0 = ptr[j];
	      var k1 = ptr[j + 1]; // copy column j into sparse accumulator

	      for (k = k0; k < k1; k++) {
	        // row
	        i = index[k]; // copy column values into sparse accumulator (use permutation vector)

	        spa.set(pvCo[i], values[k]);
	      } // skip first column in upper triangular matrix


	      if (j > 0) {
	        // loop rows in column j (above diagonal)
	        spa.forEach(0, j - 1, function (k, vkj) {
	          // loop rows in column k (L)
	          SparseMatrix._forEachRow(k, lvalues, lindex, lptr, function (i, vik) {
	            // check row is below k
	            if (i > k) {
	              // update spa value
	              spa.accumulate(i, unaryMinus(multiplyScalar(vik, vkj)));
	            }
	          });
	        });
	      } // row with larger value in spa, row >= j


	      var pi = j;
	      var vjj = spa.get(j);
	      var pabsv = abs(vjj); // loop values in spa (order by row, below diagonal)

	      spa.forEach(j + 1, rows - 1, function (x, v) {
	        // absolute value
	        var absv = abs(v); // value is greater than pivote value

	        if (larger(absv, pabsv)) {
	          // store row
	          pi = x; // update max value

	          pabsv = absv; // value @ [j, j]

	          vjj = v;
	        }
	      }); // swap rows (j <-> pi)

	      if (j !== pi) {
	        // swap values j <-> pi in L
	        SparseMatrix._swapRows(j, pi, lsize[1], lvalues, lindex, lptr); // swap values j <-> pi in U


	        SparseMatrix._swapRows(j, pi, usize[1], uvalues, uindex, uptr); // swap values in spa


	        spa.swap(j, pi); // update permutation vector (swap values @ j, pi)

	        swapIndeces(j, pi);
	      } // loop values in spa (order by row)


	      spa.forEach(0, rows - 1, function (x, v) {
	        // check we are above diagonal
	        if (x <= j) {
	          // update upper triangular matrix
	          uvalues.push(v);
	          uindex.push(x);
	        } else {
	          // update value
	          v = divideScalar(v, vjj); // check value is non zero

	          if (!equalScalar(v, 0)) {
	            // update lower triangular matrix
	            lvalues.push(v);
	            lindex.push(x);
	          }
	        }
	      });
	    };

	    for (j = 0; j < columns; j++) {
	      _loop();
	    } // update ptrs


	    uptr.push(uvalues.length);
	    lptr.push(lvalues.length); // return matrices

	    return {
	      L: new SparseMatrix({
	        values: lvalues,
	        index: lindex,
	        ptr: lptr,
	        size: lsize
	      }),
	      U: new SparseMatrix({
	        values: uvalues,
	        index: uindex,
	        ptr: uptr,
	        size: usize
	      }),
	      p: pvCo,
	      toString: function toString() {
	        return 'L: ' + this.L.toString() + '\nU: ' + this.U.toString() + '\nP: ' + this.p;
	      }
	    };
	  }
	});

	var name$H = 'det';
	var dependencies$I = ['typed', 'matrix', 'subtract', 'multiply', 'unaryMinus', 'lup'];
	var createDet = /* #__PURE__ */factory(name$H, dependencies$I, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      subtract = _ref.subtract,
	      multiply = _ref.multiply,
	      unaryMinus = _ref.unaryMinus,
	      lup = _ref.lup;

	  /**
	   * Calculate the determinant of a matrix.
	   *
	   * Syntax:
	   *
	   *    math.det(x)
	   *
	   * Examples:
	   *
	   *    math.det([[1, 2], [3, 4]]) // returns -2
	   *
	   *    const A = [
	   *      [-2, 2, 3],
	   *      [-1, 1, 3],
	   *      [2, 0, -1]
	   *    ]
	   *    math.det(A) // returns 6
	   *
	   * See also:
	   *
	   *    inv
	   *
	   * @param {Array | Matrix} x  A matrix
	   * @return {number} The determinant of `x`
	   */
	  return typed(name$H, {
	    any: function any(x) {
	      return clone(x);
	    },
	    'Array | Matrix': function det(x) {
	      var size;

	      if (isMatrix(x)) {
	        size = x.size();
	      } else if (Array.isArray(x)) {
	        x = matrix(x);
	        size = x.size();
	      } else {
	        // a scalar
	        size = [];
	      }

	      switch (size.length) {
	        case 0:
	          // scalar
	          return clone(x);

	        case 1:
	          // vector
	          if (size[0] === 1) {
	            return clone(x.valueOf()[0]);
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
	          }

	        case 2:
	          {
	            // two dimensional array
	            var rows = size[0];
	            var cols = size[1];

	            if (rows === cols) {
	              return _det(x.clone().valueOf(), rows);
	            } else {
	              throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
	            }
	          }

	        default:
	          // multi dimensional array
	          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format$2(size) + ')');
	      }
	    }
	  });
	  /**
	   * Calculate the determinant of a matrix
	   * @param {Array[]} matrix  A square, two dimensional matrix
	   * @param {number} rows     Number of rows of the matrix (zero-based)
	   * @param {number} cols     Number of columns of the matrix (zero-based)
	   * @returns {number} det
	   * @private
	   */

	  function _det(matrix, rows, cols) {
	    if (rows === 1) {
	      // this is a 1 x 1 matrix
	      return clone(matrix[0][0]);
	    } else if (rows === 2) {
	      // this is a 2 x 2 matrix
	      // the determinant of [a11,a12;a21,a22] is det = a11*a22-a21*a12
	      return subtract(multiply(matrix[0][0], matrix[1][1]), multiply(matrix[1][0], matrix[0][1]));
	    } else {
	      // Compute the LU decomposition
	      var decomp = lup(matrix); // The determinant is the product of the diagonal entries of U (and those of L, but they are all 1)

	      var det = decomp.U[0][0];

	      for (var _i = 1; _i < rows; _i++) {
	        det = multiply(det, decomp.U[_i][_i]);
	      } // The determinant will be multiplied by 1 or -1 depending on the parity of the permutation matrix.
	      // This can be determined by counting the cycles. This is roughly a linear time algorithm.


	      var evenCycles = 0;
	      var i = 0;
	      var visited = [];

	      while (true) {
	        while (visited[i]) {
	          i++;
	        }

	        if (i >= rows) break;
	        var j = i;
	        var cycleLen = 0;

	        while (!visited[decomp.p[j]]) {
	          visited[decomp.p[j]] = true;
	          j = decomp.p[j];
	          cycleLen++;
	        }

	        if (cycleLen % 2 === 0) {
	          evenCycles++;
	        }
	      }

	      return evenCycles % 2 === 0 ? det : unaryMinus(det);
	    }
	  }
	});

	var name$I = 'inv';
	var dependencies$J = ['typed', 'matrix', 'divideScalar', 'addScalar', 'multiply', 'unaryMinus', 'det', 'identity', 'abs'];
	var createInv = /* #__PURE__ */factory(name$I, dependencies$J, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      divideScalar = _ref.divideScalar,
	      addScalar = _ref.addScalar,
	      multiply = _ref.multiply,
	      unaryMinus = _ref.unaryMinus,
	      det = _ref.det,
	      identity = _ref.identity,
	      abs = _ref.abs;

	  /**
	   * Calculate the inverse of a square matrix.
	   *
	   * Syntax:
	   *
	   *     math.inv(x)
	   *
	   * Examples:
	   *
	   *     math.inv([[1, 2], [3, 4]])  // returns [[-2, 1], [1.5, -0.5]]
	   *     math.inv(4)                 // returns 0.25
	   *     1 / 4                       // returns 0.25
	   *
	   * See also:
	   *
	   *     det, transpose
	   *
	   * @param {number | Complex | Array | Matrix} x     Matrix to be inversed
	   * @return {number | Complex | Array | Matrix} The inverse of `x`.
	   */
	  return typed(name$I, {
	    'Array | Matrix': function ArrayMatrix(x) {
	      var size = isMatrix(x) ? x.size() : arraySize(x);

	      switch (size.length) {
	        case 1:
	          // vector
	          if (size[0] === 1) {
	            if (isMatrix(x)) {
	              return matrix([divideScalar(1, x.valueOf()[0])]);
	            } else {
	              return [divideScalar(1, x[0])];
	            }
	          } else {
	            throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
	          }

	        case 2:
	          // two dimensional array
	          {
	            var rows = size[0];
	            var cols = size[1];

	            if (rows === cols) {
	              if (isMatrix(x)) {
	                return matrix(_inv(x.valueOf(), rows, cols), x.storage());
	              } else {
	                // return an Array
	                return _inv(x, rows, cols);
	              }
	            } else {
	              throw new RangeError('Matrix must be square ' + '(size: ' + format$2(size) + ')');
	            }
	          }

	        default:
	          // multi dimensional array
	          throw new RangeError('Matrix must be two dimensional ' + '(size: ' + format$2(size) + ')');
	      }
	    },
	    any: function any(x) {
	      // scalar
	      return divideScalar(1, x); // FIXME: create a BigNumber one when configured for bignumbers
	    }
	  });
	  /**
	   * Calculate the inverse of a square matrix
	   * @param {Array[]} mat     A square matrix
	   * @param {number} rows     Number of rows
	   * @param {number} cols     Number of columns, must equal rows
	   * @return {Array[]} inv    Inverse matrix
	   * @private
	   */

	  function _inv(mat, rows, cols) {
	    var r, s, f, value, temp;

	    if (rows === 1) {
	      // this is a 1 x 1 matrix
	      value = mat[0][0];

	      if (value === 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }

	      return [[divideScalar(1, value)]];
	    } else if (rows === 2) {
	      // this is a 2 x 2 matrix
	      var d = det(mat);

	      if (d === 0) {
	        throw Error('Cannot calculate inverse, determinant is zero');
	      }

	      return [[divideScalar(mat[1][1], d), divideScalar(unaryMinus(mat[0][1]), d)], [divideScalar(unaryMinus(mat[1][0]), d), divideScalar(mat[0][0], d)]];
	    } else {
	      // this is a matrix of 3 x 3 or larger
	      // calculate inverse using gauss-jordan elimination
	      //      https://en.wikipedia.org/wiki/Gaussian_elimination
	      //      http://mathworld.wolfram.com/MatrixInverse.html
	      //      http://math.uww.edu/~mcfarlat/inverse.htm
	      // make a copy of the matrix (only the arrays, not of the elements)
	      var A = mat.concat();

	      for (r = 0; r < rows; r++) {
	        A[r] = A[r].concat();
	      } // create an identity matrix which in the end will contain the
	      // matrix inverse


	      var B = identity(rows).valueOf(); // loop over all columns, and perform row reductions

	      for (var c = 0; c < cols; c++) {
	        // Pivoting: Swap row c with row r, where row r contains the largest element A[r][c]
	        var ABig = abs(A[c][c]);
	        var rBig = c;
	        r = c + 1;

	        while (r < rows) {
	          if (abs(A[r][c]) > ABig) {
	            ABig = abs(A[r][c]);
	            rBig = r;
	          }

	          r++;
	        }

	        if (ABig === 0) {
	          throw Error('Cannot calculate inverse, determinant is zero');
	        }

	        r = rBig;

	        if (r !== c) {
	          temp = A[c];
	          A[c] = A[r];
	          A[r] = temp;
	          temp = B[c];
	          B[c] = B[r];
	          B[r] = temp;
	        } // eliminate non-zero values on the other rows at column c


	        var Ac = A[c];
	        var Bc = B[c];

	        for (r = 0; r < rows; r++) {
	          var Ar = A[r];
	          var Br = B[r];

	          if (r !== c) {
	            // eliminate value at column c and row r
	            if (Ar[c] !== 0) {
	              f = divideScalar(unaryMinus(Ar[c]), Ac[c]); // add (f * row c) to row r to eliminate the value
	              // at column c

	              for (s = c; s < cols; s++) {
	                Ar[s] = addScalar(Ar[s], multiply(f, Ac[s]));
	              }

	              for (s = 0; s < cols; s++) {
	                Br[s] = addScalar(Br[s], multiply(f, Bc[s]));
	              }
	            }
	          } else {
	            // normalize value at Acc to 1,
	            // divide each value on row r with the value at Acc
	            f = Ac[c];

	            for (s = c; s < cols; s++) {
	              Ar[s] = divideScalar(Ar[s], f);
	            }

	            for (s = 0; s < cols; s++) {
	              Br[s] = divideScalar(Br[s], f);
	            }
	          }
	        }
	      }

	      return B;
	    }
	  }
	});

	var name$J = 'divide';
	var dependencies$K = ['typed', 'matrix', 'multiply', 'equalScalar', 'divideScalar', 'inv'];
	var createDivide = /* #__PURE__ */factory(name$J, dependencies$K, function (_ref) {
	  var typed = _ref.typed,
	      matrix = _ref.matrix,
	      multiply = _ref.multiply,
	      equalScalar = _ref.equalScalar,
	      divideScalar = _ref.divideScalar,
	      inv = _ref.inv;
	  var algorithm11 = createAlgorithm11({
	    typed: typed,
	    equalScalar: equalScalar
	  });
	  var algorithm14 = createAlgorithm14({
	    typed: typed
	  });
	  /**
	   * Divide two values, `x / y`.
	   * To divide matrices, `x` is multiplied with the inverse of `y`: `x * inv(y)`.
	   *
	   * Syntax:
	   *
	   *    math.divide(x, y)
	   *
	   * Examples:
	   *
	   *    math.divide(2, 3)            // returns number 0.6666666666666666
	   *
	   *    const a = math.complex(5, 14)
	   *    const b = math.complex(4, 1)
	   *    math.divide(a, b)            // returns Complex 2 + 3i
	   *
	   *    const c = [[7, -6], [13, -4]]
	   *    const d = [[1, 2], [4, 3]]
	   *    math.divide(c, d)            // returns Array [[-9, 4], [-11, 6]]
	   *
	   *    const e = math.unit('18 km')
	   *    math.divide(e, 4.5)          // returns Unit 4 km
	   *
	   * See also:
	   *
	   *    multiply
	   *
	   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x   Numerator
	   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} y          Denominator
	   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                      Quotient, `x / y`
	   */

	  return typed('divide', extend({
	    // we extend the signatures of divideScalar with signatures dealing with matrices
	    'Array | Matrix, Array | Matrix': function ArrayMatrixArrayMatrix(x, y) {
	      // TODO: implement matrix right division using pseudo inverse
	      // https://www.mathworks.nl/help/matlab/ref/mrdivide.html
	      // https://www.gnu.org/software/octave/doc/interpreter/Arithmetic-Ops.html
	      // https://stackoverflow.com/questions/12263932/how-does-gnu-octave-matrix-division-work-getting-unexpected-behaviour
	      return multiply(x, inv(y));
	    },
	    'DenseMatrix, any': function DenseMatrixAny(x, y) {
	      return algorithm14(x, y, divideScalar, false);
	    },
	    'SparseMatrix, any': function SparseMatrixAny(x, y) {
	      return algorithm11(x, y, divideScalar, false);
	    },
	    'Array, any': function ArrayAny(x, y) {
	      // use matrix implementation
	      return algorithm14(matrix(x), y, divideScalar, false).valueOf();
	    },
	    'any, Array | Matrix': function anyArrayMatrix(x, y) {
	      return multiply(x, inv(y));
	    }
	  }, divideScalar.signatures));
	});

	var name$K = 'mean';
	var dependencies$L = ['typed', 'add', 'divide'];
	var createMean = /* #__PURE__ */factory(name$K, dependencies$L, function (_ref) {
	  var typed = _ref.typed,
	      add = _ref.add,
	      divide = _ref.divide;

	  /**
	   * Compute the mean value of matrix or a list with values.
	   * In case of a multi dimensional array, the mean of the flattened array
	   * will be calculated. When `dim` is provided, the maximum over the selected
	   * dimension will be calculated. Parameter `dim` is zero-based.
	   *
	   * Syntax:
	   *
	   *     math.mean(a, b, c, ...)
	   *     math.mean(A)
	   *     math.mean(A, dim)
	   *
	   * Examples:
	   *
	   *     math.mean(2, 1, 4, 3)                     // returns 2.5
	   *     math.mean([1, 2.7, 3.2, 4])               // returns 2.725
	   *
	   *     math.mean([[2, 5], [6, 3], [1, 7]], 0)    // returns [3, 5]
	   *     math.mean([[2, 5], [6, 3], [1, 7]], 1)    // returns [3.5, 4.5, 4]
	   *
	   * See also:
	   *
	   *     median, min, max, sum, prod, std, variance
	   *
	   * @param {... *} args  A single matrix or or multiple scalar values
	   * @return {*} The mean of all values
	   */
	  return typed(name$K, {
	    // mean([a, b, c, d, ...])
	    'Array | Matrix': _mean,
	    // mean([a, b, c, d, ...], dim)
	    'Array | Matrix, number | BigNumber': _nmeanDim,
	    // mean(a, b, c, d, ...)
	    '...': function _(args) {
	      if (containsCollections(args)) {
	        throw new TypeError('Scalar values expected in function mean');
	      }

	      return _mean(args);
	    }
	  });
	  /**
	   * Calculate the mean value in an n-dimensional array, returning a
	   * n-1 dimensional array
	   * @param {Array} array
	   * @param {number} dim
	   * @return {number} mean
	   * @private
	   */

	  function _nmeanDim(array, dim) {
	    try {
	      var sum = reduce(array, dim, add);
	      var s = Array.isArray(array) ? arraySize(array) : array.size();
	      return divide(sum, s[dim]);
	    } catch (err) {
	      throw improveErrorMessage(err, 'mean');
	    }
	  }
	  /**
	   * Recursively calculate the mean value in an n-dimensional array
	   * @param {Array} array
	   * @return {number} mean
	   * @private
	   */


	  function _mean(array) {
	    var sum;
	    var num = 0;
	    deepForEach(array, function (value) {
	      try {
	        sum = sum === undefined ? value : add(sum, value);
	        num++;
	      } catch (err) {
	        throw improveErrorMessage(err, 'mean', value);
	      }
	    });

	    if (num === 0) {
	      throw new Error('Cannot calculate the mean of an empty array');
	    }

	    return divide(sum, num);
	  }
	});

	var DEFAULT_NORMALIZATION = 'unbiased';
	var name$L = 'variance';
	var dependencies$M = ['typed', 'add', 'subtract', 'multiply', 'divide', 'apply', 'isNaN'];
	var createVariance = /* #__PURE__ */factory(name$L, dependencies$M, function (_ref) {
	  var typed = _ref.typed,
	      add = _ref.add,
	      subtract = _ref.subtract,
	      multiply = _ref.multiply,
	      divide = _ref.divide,
	      apply = _ref.apply,
	      isNaN = _ref.isNaN;

	  /**
	   * Compute the variance of a matrix or a  list with values.
	   * In case of a (multi dimensional) array or matrix, the variance over all
	   * elements will be calculated.
	   *
	   * Additionally, it is possible to compute the variance along the rows
	   * or columns of a matrix by specifying the dimension as the second argument.
	   *
	   * Optionally, the type of normalization can be specified as the final
	   * parameter. The parameter `normalization` can be one of the following values:
	   *
	   * - 'unbiased' (default) The sum of squared errors is divided by (n - 1)
	   * - 'uncorrected'        The sum of squared errors is divided by n
	   * - 'biased'             The sum of squared errors is divided by (n + 1)
	   *
	   *
	   * Note that older browser may not like the variable name `var`. In that
	   * case, the function can be called as `math['var'](...)` instead of
	   * `math.var(...)`.
	   *
	   * Syntax:
	   *
	   *     math.variance(a, b, c, ...)
	   *     math.variance(A)
	   *     math.variance(A, normalization)
	   *     math.variance(A, dimension)
	   *     math.variance(A, dimension, normalization)
	   *
	   * Examples:
	   *
	   *     math.variance(2, 4, 6)                     // returns 4
	   *     math.variance([2, 4, 6, 8])                // returns 6.666666666666667
	   *     math.variance([2, 4, 6, 8], 'uncorrected') // returns 5
	   *     math.variance([2, 4, 6, 8], 'biased')      // returns 4
	   *
	   *     math.variance([[1, 2, 3], [4, 5, 6]])      // returns 3.5
	   *     math.variance([[1, 2, 3], [4, 6, 8]], 0)   // returns [4.5, 8, 12.5]
	   *     math.variance([[1, 2, 3], [4, 6, 8]], 1)   // returns [1, 4]
	   *     math.variance([[1, 2, 3], [4, 6, 8]], 1, 'biased') // returns [0.5, 2]
	   *
	   * See also:
	   *
	   *    mean, median, max, min, prod, std, sum
	   *
	   * @param {Array | Matrix} array
	   *                        A single matrix or or multiple scalar values
	   * @param {string} [normalization='unbiased']
	   *                        Determines how to normalize the variance.
	   *                        Choose 'unbiased' (default), 'uncorrected', or 'biased'.
	   * @param dimension {number | BigNumber}
	   *                        Determines the axis to compute the variance for a matrix
	   * @return {*} The variance
	   */
	  return typed(name$L, {
	    // variance([a, b, c, d, ...])
	    'Array | Matrix': function ArrayMatrix(array) {
	      return _var(array, DEFAULT_NORMALIZATION);
	    },
	    // variance([a, b, c, d, ...], normalization)
	    'Array | Matrix, string': _var,
	    // variance([a, b, c, c, ...], dim)
	    'Array | Matrix, number | BigNumber': function ArrayMatrixNumberBigNumber(array, dim) {
	      return _varDim(array, dim, DEFAULT_NORMALIZATION);
	    },
	    // variance([a, b, c, c, ...], dim, normalization)
	    'Array | Matrix, number | BigNumber, string': _varDim,
	    // variance(a, b, c, d, ...)
	    '...': function _(args) {
	      return _var(args, DEFAULT_NORMALIZATION);
	    }
	  });
	  /**
	   * Recursively calculate the variance of an n-dimensional array
	   * @param {Array} array
	   * @param {string} normalization
	   *                        Determines how to normalize the variance:
	   *                        - 'unbiased'    The sum of squared errors is divided by (n - 1)
	   *                        - 'uncorrected' The sum of squared errors is divided by n
	   *                        - 'biased'      The sum of squared errors is divided by (n + 1)
	   * @return {number | BigNumber} variance
	   * @private
	   */

	  function _var(array, normalization) {
	    var sum = 0;
	    var num = 0;

	    if (array.length === 0) {
	      throw new SyntaxError('Function variance requires one or more parameters (0 provided)');
	    } // calculate the mean and number of elements


	    deepForEach(array, function (value) {
	      try {
	        sum = add(sum, value);
	        num++;
	      } catch (err) {
	        throw improveErrorMessage(err, 'variance', value);
	      }
	    });
	    if (num === 0) throw new Error('Cannot calculate variance of an empty array');
	    var mean = divide(sum, num); // calculate the variance

	    sum = 0;
	    deepForEach(array, function (value) {
	      var diff = subtract(value, mean);
	      sum = add(sum, multiply(diff, diff));
	    });

	    if (isNaN(sum)) {
	      return sum;
	    }

	    switch (normalization) {
	      case 'uncorrected':
	        return divide(sum, num);

	      case 'biased':
	        return divide(sum, num + 1);

	      case 'unbiased':
	        {
	          var zero = isBigNumber(sum) ? sum.mul(0) : 0;
	          return num === 1 ? zero : divide(sum, num - 1);
	        }

	      default:
	        throw new Error('Unknown normalization "' + normalization + '". ' + 'Choose "unbiased" (default), "uncorrected", or "biased".');
	    }
	  }

	  function _varDim(array, dim, normalization) {
	    try {
	      if (array.length === 0) {
	        throw new SyntaxError('Function variance requires one or more parameters (0 provided)');
	      }

	      return apply(array, dim, function (x) {
	        return _var(x, normalization);
	      });
	    } catch (err) {
	      throw improveErrorMessage(err, 'variance');
	    }
	  }
	});

	var name$M = 'std';
	var dependencies$N = ['typed', 'sqrt', 'variance'];
	var createStd = /* #__PURE__ */factory(name$M, dependencies$N, function (_ref) {
	  var typed = _ref.typed,
	      sqrt = _ref.sqrt,
	      variance = _ref.variance;

	  /**
	   * Compute the standard deviation of a matrix or a  list with values.
	   * The standard deviations is defined as the square root of the variance:
	   * `std(A) = sqrt(variance(A))`.
	   * In case of a (multi dimensional) array or matrix, the standard deviation
	   * over all elements will be calculated by default, unless an axis is specified
	   * in which case the standard deviation will be computed along that axis.
	   *
	   * Additionally, it is possible to compute the standard deviation along the rows
	   * or columns of a matrix by specifying the dimension as the second argument.
	   *
	   * Optionally, the type of normalization can be specified as the final
	   * parameter. The parameter `normalization` can be one of the following values:
	   *
	   * - 'unbiased' (default) The sum of squared errors is divided by (n - 1)
	   * - 'uncorrected'        The sum of squared errors is divided by n
	   * - 'biased'             The sum of squared errors is divided by (n + 1)
	   *
	   *
	   * Syntax:
	   *
	   *     math.std(a, b, c, ...)
	   *     math.std(A)
	   *     math.std(A, normalization)
	   *     math.std(A, dimension)
	   *     math.std(A, dimension, normalization)
	   *
	   * Examples:
	   *
	   *     math.std(2, 4, 6)                     // returns 2
	   *     math.std([2, 4, 6, 8])                // returns 2.581988897471611
	   *     math.std([2, 4, 6, 8], 'uncorrected') // returns 2.23606797749979
	   *     math.std([2, 4, 6, 8], 'biased')      // returns 2
	   *
	   *     math.std([[1, 2, 3], [4, 5, 6]])      // returns 1.8708286933869707
	   *     math.std([[1, 2, 3], [4, 6, 8]], 0)    // returns [2.1213203435596424, 2.8284271247461903, 3.5355339059327378]
	   *     math.std([[1, 2, 3], [4, 6, 8]], 1)    // returns [1, 2]
	   *     math.std([[1, 2, 3], [4, 6, 8]], 1, 'biased') // returns [0.7071067811865476, 1.4142135623730951]
	   *
	   * See also:
	   *
	   *    mean, median, max, min, prod, sum, variance
	   *
	   * @param {Array | Matrix} array
	   *                        A single matrix or or multiple scalar values
	   * @param {string} [normalization='unbiased']
	   *                        Determines how to normalize the variance.
	   *                        Choose 'unbiased' (default), 'uncorrected', or 'biased'.
	   * @param dimension {number | BigNumber}
	   *                        Determines the axis to compute the standard deviation for a matrix
	   * @return {*} The standard deviation
	   */
	  return typed(name$M, {
	    // std([a, b, c, d, ...])
	    'Array | Matrix': _std,
	    // std([a, b, c, d, ...], normalization)
	    'Array | Matrix, string': _std,
	    // std([a, b, c, c, ...], dim)
	    'Array | Matrix, number | BigNumber': _std,
	    // std([a, b, c, c, ...], dim, normalization)
	    'Array | Matrix, number | BigNumber, string': _std,
	    // std(a, b, c, d, ...)
	    '...': function _(args) {
	      return _std(args);
	    }
	  });

	  function _std(array, normalization) {
	    if (array.length === 0) {
	      throw new SyntaxError('Function std requires one or more parameters (0 provided)');
	    }

	    try {
	      return sqrt(variance.apply(null, arguments));
	    } catch (err) {
	      if (err instanceof TypeError && err.message.indexOf(' variance') !== -1) {
	        throw new TypeError(err.message.replace(' variance', ' std'));
	      } else {
	        throw err;
	      }
	    }
	  }
	});

	/**
	 * THIS FILE IS AUTO-GENERATED
	 * DON'T MAKE CHANGES HERE
	 */
	var Complex$1 = /* #__PURE__ */createComplexClass({});
	var BigNumber = /* #__PURE__ */createBigNumberClass({
	  config: config
	});
	var Matrix = /* #__PURE__ */createMatrixClass({});
	var Fraction$1 = /* #__PURE__ */createFractionClass({});
	var DenseMatrix = /* #__PURE__ */createDenseMatrixClass({
	  Matrix: Matrix
	});
	var typed = /* #__PURE__ */createTyped({
	  BigNumber: BigNumber,
	  Complex: Complex$1,
	  DenseMatrix: DenseMatrix,
	  Fraction: Fraction$1
	});
	var isInteger$1 = /* #__PURE__ */createIsInteger({
	  typed: typed
	});
	var isNaN$1 = /* #__PURE__ */createIsNaN({
	  typed: typed
	});
	var equalScalar = /* #__PURE__ */createEqualScalar({
	  config: config,
	  typed: typed
	});
	var number = /* #__PURE__ */createNumber({
	  typed: typed
	});
	var apply = /* #__PURE__ */createApply({
	  isInteger: isInteger$1,
	  typed: typed
	});
	var multiplyScalar = /* #__PURE__ */createMultiplyScalar({
	  typed: typed
	});
	var fraction$1 = /* #__PURE__ */createFraction({
	  Fraction: Fraction$1,
	  typed: typed
	});
	var unaryMinus = /* #__PURE__ */createUnaryMinus({
	  typed: typed
	});
	var addScalar = /* #__PURE__ */createAddScalar({
	  typed: typed
	});
	var sqrt$3 = /* #__PURE__ */createSqrt({
	  Complex: Complex$1,
	  config: config,
	  typed: typed
	});
	var conj = /* #__PURE__ */createConj({
	  typed: typed
	});
	var SparseMatrix = /* #__PURE__ */createSparseMatrixClass({
	  Matrix: Matrix,
	  equalScalar: equalScalar,
	  typed: typed
	});
	var matrix = /* #__PURE__ */createMatrix({
	  DenseMatrix: DenseMatrix,
	  Matrix: Matrix,
	  SparseMatrix: SparseMatrix,
	  typed: typed
	});
	var identity$1 = /* #__PURE__ */createIdentity({
	  BigNumber: BigNumber,
	  DenseMatrix: DenseMatrix,
	  SparseMatrix: SparseMatrix,
	  config: config,
	  matrix: matrix,
	  typed: typed
	});
	var size = /* #__PURE__ */createSize({
	  matrix: matrix,
	  config: config,
	  typed: typed
	});
	var smaller = /* #__PURE__ */createSmaller({
	  DenseMatrix: DenseMatrix,
	  config: config,
	  matrix: matrix,
	  typed: typed
	});
	var larger = /* #__PURE__ */createLarger({
	  DenseMatrix: DenseMatrix,
	  config: config,
	  matrix: matrix,
	  typed: typed
	});
	var FibonacciHeap = /* #__PURE__ */createFibonacciHeapClass({
	  larger: larger,
	  smaller: smaller
	});
	var add$1 = /* #__PURE__ */createAdd({
	  DenseMatrix: DenseMatrix,
	  SparseMatrix: SparseMatrix,
	  addScalar: addScalar,
	  equalScalar: equalScalar,
	  matrix: matrix,
	  typed: typed
	});
	var dot = /* #__PURE__ */createDot({
	  addScalar: addScalar,
	  conj: conj,
	  multiplyScalar: multiplyScalar,
	  size: size,
	  typed: typed
	});
	var abs$5 = /* #__PURE__ */createAbs({
	  typed: typed
	});
	var multiply = /* #__PURE__ */createMultiply({
	  addScalar: addScalar,
	  dot: dot,
	  equalScalar: equalScalar,
	  matrix: matrix,
	  multiplyScalar: multiplyScalar,
	  typed: typed
	});
	var Spa = /* #__PURE__ */createSpaClass({
	  FibonacciHeap: FibonacciHeap,
	  addScalar: addScalar,
	  equalScalar: equalScalar
	});
	var bignumber = /* #__PURE__ */createBignumber({
	  BigNumber: BigNumber,
	  typed: typed
	});
	var numeric = /* #__PURE__ */createNumeric({
	  bignumber: bignumber,
	  fraction: fraction$1,
	  number: number
	});
	var subtract$1 = /* #__PURE__ */createSubtract({
	  DenseMatrix: DenseMatrix,
	  addScalar: addScalar,
	  equalScalar: equalScalar,
	  matrix: matrix,
	  typed: typed,
	  unaryMinus: unaryMinus
	});
	var divideScalar = /* #__PURE__ */createDivideScalar({
	  numeric: numeric,
	  typed: typed
	});
	var lup = /* #__PURE__ */createLup({
	  DenseMatrix: DenseMatrix,
	  Spa: Spa,
	  SparseMatrix: SparseMatrix,
	  abs: abs$5,
	  addScalar: addScalar,
	  divideScalar: divideScalar,
	  equalScalar: equalScalar,
	  larger: larger,
	  matrix: matrix,
	  multiplyScalar: multiplyScalar,
	  subtract: subtract$1,
	  typed: typed,
	  unaryMinus: unaryMinus
	});
	var det = /* #__PURE__ */createDet({
	  lup: lup,
	  matrix: matrix,
	  multiply: multiply,
	  subtract: subtract$1,
	  typed: typed,
	  unaryMinus: unaryMinus
	});
	var inv = /* #__PURE__ */createInv({
	  abs: abs$5,
	  addScalar: addScalar,
	  det: det,
	  divideScalar: divideScalar,
	  identity: identity$1,
	  matrix: matrix,
	  multiply: multiply,
	  typed: typed,
	  unaryMinus: unaryMinus
	});
	var divide$1 = /* #__PURE__ */createDivide({
	  divideScalar: divideScalar,
	  equalScalar: equalScalar,
	  inv: inv,
	  matrix: matrix,
	  multiply: multiply,
	  typed: typed
	});
	var mean = /* #__PURE__ */createMean({
	  add: add$1,
	  divide: divide$1,
	  typed: typed
	});
	var variance = /* #__PURE__ */createVariance({
	  add: add$1,
	  apply: apply,
	  divide: divide$1,
	  isNaN: isNaN$1,
	  multiply: multiply,
	  subtract: subtract$1,
	  typed: typed
	});
	var std = /* #__PURE__ */createStd({
	  sqrt: sqrt$3,
	  typed: typed,
	  variance: variance
	});

	var Mouse =
	/** @class */
	function () {
	  function Mouse() {
	    var _this = this;

	    this.countX = 0;
	    this.countY = 0;
	    this.clickPos = new Array();
	    this.maxSpeedX = 0;
	    this.maxSpeedY = 0;
	    this.maxSpeed = 0;
	    this.samplingSpeedX = new Array();
	    this.samplingSpeedY = new Array();
	    this.stdSpeedX = 0.0;
	    this.stdSpeedY = 0.0;
	    this.avgSpeedX = 0.0;
	    this.avgSpeedY = 0.0;
	    this.startTimeStamp = performance.now();
	    this.prevX = 0;
	    this.prevY = 0;
	    this.lastScrollPos = 0;
	    window.addEventListener('click', function (event) {
	      var clickPos = event.pageX.toString() + ':' + event.pageY.toString() + ':' + (performance.now() - _this.startTimeStamp).toString();

	      _this.clickPos.push(clickPos);
	    });
	    window.addEventListener('mousemove', function (event) {
	      var scrollPos = 0;

	      if (document != null && document.scrollingElement != null) {
	        scrollPos = document.scrollingElement.scrollTop;
	      }

	      if (scrollPos === _this.lastScrollPos) {
	        if (Math.abs(event.pageX - _this.prevX) > 0) {
	          _this.samplingSpeedX[_this.countX++ % Mouse.SAMPLING_SIZE] = Math.abs(event.pageX - _this.prevX);
	          _this.avgSpeedX = mean(_this.samplingSpeedX);
	          _this.stdSpeedX = std(_this.samplingSpeedX);
	        }

	        if (Math.abs(event.pageY - _this.prevY) > 0) {
	          _this.samplingSpeedY[_this.countY++ % Mouse.SAMPLING_SIZE] = Math.abs(event.pageY - _this.prevY);
	          _this.avgSpeedY = mean(_this.samplingSpeedY);
	          _this.stdSpeedY = std(_this.samplingSpeedY);
	        }

	        if (Math.abs(event.pageX - _this.prevX) > _this.maxSpeedX && _this.prevX !== 0) {
	          _this.maxSpeedX = Math.abs(event.pageX - _this.prevX);
	        }

	        if (Math.abs(event.pageY - _this.prevY) > _this.maxSpeedY && _this.prevY !== 0) {
	          _this.maxSpeedY = Math.abs(event.pageY - _this.prevY);
	        }

	        if (Math.max(_this.maxSpeedX, _this.maxSpeedY) > _this.maxSpeed) {
	          _this.maxSpeed = Math.max(_this.maxSpeedX, _this.maxSpeedY);
	        }
	      }

	      _this.prevX = event.pageX;
	      _this.prevY = event.pageY;
	      _this.lastScrollPos = scrollPos;
	    });
	  }

	  Mouse.prototype.fingerprint = function (fingerprints) {
	    fingerprints.set('mouse_click_pos', new Attribute(String(this.clickPos.toString()), 1));
	    fingerprints.set('mouse_max_speed_x', new Attribute(String(this.maxSpeedX), 1));
	    fingerprints.set('mouse_max_speed_y', new Attribute(String(this.maxSpeedY), 1));
	    fingerprints.set('mouse_max_speed', new Attribute(String(this.maxSpeed), 1));
	    fingerprints.set('mouse_avg_speed_x', new Attribute(String(this.avgSpeedX), 1));
	    fingerprints.set('mouse_avg_speed_y', new Attribute(String(this.avgSpeedY), 1));
	    fingerprints.set('mouse_std_speed_x', new Attribute(String(this.stdSpeedX), 1));
	    fingerprints.set('mouse_std_speed_y', new Attribute(String(this.stdSpeedY), 1));
	    return fingerprints;
	  };

	  Mouse.SAMPLING_SIZE = 120;
	  return Mouse;
	}();

	var Monogram =
	/** @class */
	function () {
	  function Monogram() {
	    var _this = this;

	    this.clientFingerprint = new Map();
	    this.clientFingerprint = new Webgl().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Canvas().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Browser().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new NavigationTiming().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Screen().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new Audio().fingerprint(this.clientFingerprint);
	    this.clientFingerprint = new MathFP().fingerprint(this.clientFingerprint);
	    this.mouse = new Mouse();
	    window.addEventListener('click', function () {
	      _this.clientFingerprint = _this.mouse.fingerprint(_this.clientFingerprint);
	    });
	    window.addEventListener('mousemove', function () {
	      _this.clientFingerprint = _this.mouse.fingerprint(_this.clientFingerprint);
	    });
	  }

	  Monogram.prototype.json = function () {
	    return JSON.stringify(Object.fromEntries(this.clientFingerprint));
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
