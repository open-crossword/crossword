(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.bS.aZ === region.ch.aZ)
	{
		return 'on line ' + region.bS.aZ;
	}
	return 'on lines ' + region.bS.aZ + ' through ' + region.ch.aZ;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d_,
		impl.eW,
		impl.eR,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.cj.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done(elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done(elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.cj.b, xhr)); });
		elm$core$Maybe$isJust(request.O) && _Http_track(router, xhr, request.O.a);

		try {
			xhr.open(request.H, request.df, true);
		} catch (e) {
			return done(elm$http$Http$BadUrl_(request.df));
		}

		_Http_configureRequest(xhr, request);

		request.b7.a && xhr.setRequestHeader('Content-Type', request.b7.a);
		xhr.send(request.b7.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.B; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.J.a || 0;
	xhr.responseType = request.cj.d;
	xhr.withCredentials = request.aw;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? elm$http$Http$GoodStatus_ : elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		df: xhr.responseURL,
		c6: xhr.status,
		eQ: xhr.statusText,
		B: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return elm$core$Dict$empty;
	}

	var headers = elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(elm$core$Dict$update, key, function(oldValue) {
				return elm$core$Maybe$Just(elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Sending({
			eP: event.loaded,
			bR: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2(elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, elm$http$Http$Receiving({
			eD: event.loaded,
			bR: event.lengthComputable ? elm$core$Maybe$Just(event.total) : elm$core$Maybe$Nothing
		}))));
	});
}



// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		ad: func(record.ad),
		bT: record.bT,
		bQ: record.bQ
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.ad;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bT;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bQ) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d_,
		impl.eW,
		impl.eR,
		function(sendToApp, initialModel) {
			var view = impl.eY;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.d_,
		impl.eW,
		impl.eR,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.a2 && impl.a2(sendToApp)
			var view = impl.eY;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.b7);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eU) && (_VirtualDom_doc.title = title = doc.eU);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.ev;
	var onUrlRequest = impl.ew;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		a2: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cR === next.cR
							&& curr.cr === next.cr
							&& curr.cL.a === next.cL.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		d_: function(flags)
		{
			return A3(impl.d_, flags, _Browser_getUrl(), key);
		},
		eY: impl.eY,
		eW: impl.eW,
		eR: impl.eR
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { dV: 'hidden', du: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dV: 'mozHidden', du: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dV: 'msHidden', du: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dV: 'webkitHidden', du: 'webkitvisibilitychange' }
		: { dV: 'hidden', du: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		c$: _Browser_getScene(),
		di: {
			bC: _Browser_window.pageXOffset,
			bD: _Browser_window.pageYOffset,
			w: _Browser_doc.documentElement.clientWidth,
			Q: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		w: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		Q: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			c$: {
				w: node.scrollWidth,
				Q: node.scrollHeight
			},
			di: {
				bC: node.scrollLeft,
				bD: node.scrollTop,
				w: node.clientWidth,
				Q: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			c$: _Browser_getScene(),
			di: {
				bC: x,
				bD: y,
				w: _Browser_doc.documentElement.clientWidth,
				Q: _Browser_doc.documentElement.clientHeight
			},
			dL: {
				bC: x + rect.left,
				bD: y + rect.top,
				w: rect.width,
				Q: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}

var author$project$Main$ChangedUrl = function (a) {
	return {$: 2, a: a};
};
var author$project$Main$ClickedLink = function (a) {
	return {$: 4, a: a};
};
var author$project$Main$Redirect = {$: 0};
var author$project$Main$About = function (a) {
	return {$: 4, a: a};
};
var author$project$Main$Game = function (a) {
	return {$: 3, a: a};
};
var author$project$Main$GotAboutMsg = function (a) {
	return {$: 7, a: a};
};
var author$project$Main$GotGameMsg = function (a) {
	return {$: 6, a: a};
};
var author$project$Main$GotHomeMsg = function (a) {
	return {$: 5, a: a};
};
var author$project$Main$Home = function (a) {
	return {$: 2, a: a};
};
var author$project$Main$NotFound = {$: 1};
var author$project$Main$toSession = function (_n0) {
	var session = _n0.ag;
	return session;
};
var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.o) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.r),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.r);
		} else {
			var treeLen = builder.o * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.t) : builder.t;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.o);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.r) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.r);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{t: nodeList, o: (len / elm$core$Array$branchFactor) | 0, r: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Page$About$init = function (session) {
	return _Utils_Tuple2(
		{},
		elm$core$Platform$Cmd$none);
};
var author$project$Data$Puzzle$Id$PuzzleId = elm$core$Basics$identity;
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Data$Puzzle$Id$fromString = function (s) {
	return s;
};
var author$project$BundledPuzzles$bundledId = function (i) {
	return author$project$Data$Puzzle$Id$fromString(
		'bundled_' + elm$core$String$fromInt(i));
};
var author$project$Data$Direction$Across = 0;
var author$project$Data$Direction$Down = 1;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Data$Grid$get = F2(
	function (_n0, _n1) {
		var x = _n0.a;
		var y = _n0.b;
		var grid = _n1;
		return ((x >= 0) && ((y >= 0) && ((_Utils_cmp(x, grid.w) < 0) && (_Utils_cmp(y, grid.Q) < 0)))) ? A2(
			elm$core$Maybe$andThen,
			elm$core$Basics$identity,
			A2(elm$core$Array$get, x + (y * grid.w), grid.x)) : elm$core$Maybe$Nothing;
	});
var author$project$Data$Grid$pointToIndex = F2(
	function (_n0, _n1) {
		var x = _n0.a;
		var y = _n0.b;
		var grid = _n1;
		return x + (y * grid.w);
	});
var author$project$Data$OneOrTwo$One = function (a) {
	return {$: 0, a: a};
};
var author$project$Data$OneOrTwo$Two = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Data$Puzzle$AcrossStart = 0;
var author$project$Data$Puzzle$ClueId = F2(
	function (direction, number) {
		return {z: direction, en: number};
	});
var author$project$Data$Puzzle$DownStart = 1;
var author$project$Data$Puzzle$Shaded = {$: 0};
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Puzzle$Format$Xd$isShaded = A2(
	elm$core$Basics$composeR,
	elm$core$Maybe$map(
		function (cell_) {
			return _Utils_eq(cell_, author$project$Data$Puzzle$Shaded);
		}),
	elm$core$Maybe$withDefault(true));
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var author$project$Puzzle$Format$Xd$oneOrTwoMerge = F2(
	function (left, right) {
		var onlyInOne = F3(
			function (key, value, acc) {
				return A3(elm$core$Dict$insert, key, value, acc);
			});
		var inBoth = F4(
			function (key, value1, value2, acc) {
				var _n0 = _Utils_Tuple2(value1, value2);
				if ((!_n0.a.$) && (!_n0.b.$)) {
					var clueId1 = _n0.a.a;
					var clueId2 = _n0.b.a;
					return A3(
						elm$core$Dict$insert,
						key,
						A2(author$project$Data$OneOrTwo$Two, clueId1, clueId2),
						acc);
				} else {
					var a = _n0.a;
					var b = _n0.b;
					return A3(elm$core$Dict$insert, key, a, acc);
				}
			});
		return A6(elm$core$Dict$merge, onlyInOne, inBoth, onlyInOne, left, right, elm$core$Dict$empty);
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var author$project$Puzzle$Format$Xd$annotateWord = F2(
	function (grid_, wordStart) {
		var oneOrTwoUpdate = F2(
			function (newClueId, maybeOneOrTwo) {
				if (!maybeOneOrTwo.$) {
					if (!maybeOneOrTwo.a.$) {
						var clueId = maybeOneOrTwo.a.a;
						return elm$core$Maybe$Just(
							A2(author$project$Data$OneOrTwo$Two, clueId, newClueId));
					} else {
						var _n5 = maybeOneOrTwo.a;
						var clueId = _n5.a;
						return elm$core$Maybe$Just(
							A2(author$project$Data$OneOrTwo$Two, clueId, newClueId));
					}
				} else {
					return elm$core$Maybe$Just(
						author$project$Data$OneOrTwo$One(newClueId));
				}
			});
		var recurse = F2(
			function (direction, point) {
				var x = point.a;
				var y = point.b;
				var _n0 = _Utils_Tuple2(
					direction,
					author$project$Puzzle$Format$Xd$isShaded(
						A2(author$project$Data$Grid$get, point, grid_)));
				if (_n0.b) {
					return elm$core$Dict$empty;
				} else {
					switch (_n0.a) {
						case 0:
							var _n1 = _n0.a;
							return A3(
								elm$core$Dict$update,
								A2(author$project$Data$Grid$pointToIndex, point, grid_),
								oneOrTwoUpdate(
									A2(author$project$Data$Puzzle$ClueId, 0, wordStart.dy)),
								A2(
									recurse,
									0,
									_Utils_Tuple2(x + 1, y)));
						case 1:
							var _n2 = _n0.a;
							return A3(
								elm$core$Dict$update,
								A2(author$project$Data$Grid$pointToIndex, point, grid_),
								oneOrTwoUpdate(
									A2(author$project$Data$Puzzle$ClueId, 1, wordStart.dy)),
								A2(
									recurse,
									1,
									_Utils_Tuple2(x, y + 1)));
						default:
							var _n3 = _n0.a;
							return A2(
								author$project$Puzzle$Format$Xd$oneOrTwoMerge,
								A2(
									recurse,
									1,
									_Utils_Tuple2(x, y)),
								A2(
									recurse,
									0,
									_Utils_Tuple2(x, y)));
					}
				}
			});
		return A2(recurse, wordStart.z, wordStart.br);
	});
var author$project$Puzzle$Format$Xd$annotate = F3(
	function (grid_, wordStarts_, clues_) {
		return A3(
			elm$core$List$foldl,
			A2(
				elm$core$Basics$composeR,
				author$project$Puzzle$Format$Xd$annotateWord(grid_),
				author$project$Puzzle$Format$Xd$oneOrTwoMerge),
			elm$core$Dict$empty,
			wordStarts_);
	});
var author$project$Data$Direction$toString = function (direction) {
	if (!direction) {
		return 'A';
	} else {
		return 'D';
	}
};
var author$project$Data$Puzzle$clueIdToIndex = function (_n0) {
	var direction = _n0.z;
	var number = _n0.en;
	return _Utils_ap(
		author$project$Data$Direction$toString(direction),
		elm$core$String$fromInt(number));
};
var elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {cd: col, dB: contextStack, cO: problem, eI: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var elm$parser$Parser$Advanced$chompUntil = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$findSubString, str, s.c, s.eI, s.cd, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A4(elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.g)) : A3(
			elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.c, newOffset) < 0,
			0,
			{cd: newCol, g: s.g, h: s.h, c: newOffset, eI: newRow, a: s.a});
	};
};
var elm$parser$Parser$chompUntil = function (str) {
	return elm$parser$Parser$Advanced$chompUntil(
		elm$parser$Parser$toToken(str));
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3(elm$core$String$slice, s0.c, s1.c, s0.a),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var author$project$Puzzle$Format$Xd$readUntil = function (stoppingPoint) {
	return elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(0),
			elm$parser$Parser$chompUntil(stoppingPoint)));
};
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.c, offset) < 0,
					0,
					{cd: col, g: s0.g, h: s0.h, c: offset, eI: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.c, s.eI, s.cd, s);
	};
};
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var elm$parser$Parser$spaces = elm$parser$Parser$Advanced$spaces;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$core$Basics$not = _Basics_not;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.eI, s.cd, x, s.g));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.c, s.eI, s.cd, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cd: newCol, g: s.g, h: s.h, c: newOffset, eI: newRow, a: s.a});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Puzzle$Format$Xd$clueAnswer = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(elm$core$Basics$identity),
				elm$parser$Parser$spaces),
			elm$parser$Parser$symbol('~')),
		elm$parser$Parser$spaces),
	author$project$Puzzle$Format$Xd$readUntil('\n'));
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var author$project$Puzzle$Format$Xd$maybeToParserOrError = F2(
	function (label, maybe) {
		if (!maybe.$) {
			var x = maybe.a;
			return elm$parser$Parser$succeed(x);
		} else {
			return elm$parser$Parser$problem(label);
		}
	});
var elm$core$String$toInt = _String_toInt;
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var author$project$Puzzle$Format$Xd$clueIndex = function () {
	var relaxedInt = A2(
		elm$parser$Parser$andThen,
		author$project$Puzzle$Format$Xd$maybeToParserOrError('Expected int'),
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(elm$core$String$toInt),
			elm$parser$Parser$getChompedString(
				elm$parser$Parser$chompWhile(elm$core$Char$isDigit))));
	var helper = F2(
		function (prefix, buildClueId) {
			return A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(buildClueId),
					elm$parser$Parser$symbol(prefix)),
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						relaxedInt,
						elm$parser$Parser$symbol('.')),
					elm$parser$Parser$spaces));
		});
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				helper,
				'A',
				elm$core$Tuple$pair(0)),
				A2(
				helper,
				'D',
				elm$core$Tuple$pair(1))
			]));
}();
var author$project$Puzzle$Format$Xd$clueText = author$project$Puzzle$Format$Xd$readUntil(' ~');
var author$project$Puzzle$Format$Xd$clueLine = function () {
	var buildClue = F3(
		function (_n0, txt, answer) {
			var direction = _n0.a;
			var number = _n0.b;
			return {
				dn: answer,
				dw: txt,
				bh: A2(author$project$Data$Puzzle$ClueId, direction, number)
			};
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(buildClue),
				author$project$Puzzle$Format$Xd$clueIndex),
			author$project$Puzzle$Format$Xd$clueText),
		author$project$Puzzle$Format$Xd$clueAnswer);
}();
var elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var author$project$Puzzle$Format$Xd$loopUntil = F2(
	function (endToken, body) {
		var helper = function (revStmts) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$map,
						function (_n0) {
							return elm$parser$Parser$Done(
								elm$core$List$reverse(revStmts));
						},
						elm$parser$Parser$symbol(endToken)),
						body(
						elm$parser$Parser$succeed(
							function (pair) {
								return elm$parser$Parser$Loop(
									A2(elm$core$List$cons, pair, revStmts));
							}))
					]));
		};
		return A2(elm$parser$Parser$loop, _List_Nil, helper);
	});
var author$project$Puzzle$Format$Xd$cluesList = function () {
	var helper = function (x) {
		return A2(
			elm$parser$Parser$keeper,
			A2(elm$parser$Parser$ignorer, x, elm$parser$Parser$spaces),
			author$project$Puzzle$Format$Xd$clueLine);
	};
	return A2(author$project$Puzzle$Format$Xd$loopUntil, '\n\n\n', helper);
}();
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var author$project$Puzzle$Format$Xd$cluesDict = A2(
	elm$parser$Parser$map,
	function (clues) {
		return elm$core$Dict$fromList(
			A2(
				elm$core$List$map,
				function (clue) {
					return _Utils_Tuple2(
						author$project$Data$Puzzle$clueIdToIndex(clue.bh),
						clue);
				},
				clues));
	},
	author$project$Puzzle$Format$Xd$cluesList);
var author$project$Data$Grid$Grid = elm$core$Basics$identity;
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{t: nodeList, o: nodeListSize, r: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var author$project$Data$Grid$fromList = F3(
	function (w, h, list) {
		return ((w >= 0) && ((h >= 0) && _Utils_eq(
			elm$core$List$length(list),
			w * h))) ? elm$core$Maybe$Just(
			{
				x: elm$core$Array$fromList(
					A2(elm$core$List$map, elm$core$Maybe$Just, list)),
				Q: h,
				w: w
			}) : elm$core$Maybe$Nothing;
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var author$project$Data$Grid$from2DList = function (rows) {
	var width_ = function (r) {
		if (!r.b) {
			return elm$core$Maybe$Just(0);
		} else {
			if (!r.b.b) {
				var a = r.a;
				return elm$core$Maybe$Just(
					elm$core$List$length(a));
			} else {
				var x = r.a;
				var xs = r.b;
				return _Utils_eq(
					elm$core$Maybe$Just(
						elm$core$List$length(x)),
					width_(xs)) ? elm$core$Maybe$Just(
					elm$core$List$length(x)) : elm$core$Maybe$Nothing;
			}
		}
	};
	var rowLengths = A2(elm$core$List$map, elm$core$List$length, rows);
	var height_ = function (r) {
		return elm$core$Maybe$Just(
			elm$core$List$length(r));
	};
	var _n1 = _Utils_Tuple2(
		width_(rows),
		height_(rows));
	if ((!_n1.a.$) && (!_n1.b.$)) {
		var w = _n1.a.a;
		var h = _n1.b.a;
		return A3(
			author$project$Data$Grid$fromList,
			w,
			h,
			elm$core$List$concat(rows));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Data$Puzzle$Letter = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.c, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cd: 1, g: s.g, h: s.h, c: s.c + 1, eI: s.eI + 1, a: s.a}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cd: s.cd + 1, g: s.g, h: s.h, c: newOffset, eI: s.eI, a: s.a}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var author$project$Puzzle$Format$Xd$character = A2(
	elm$parser$Parser$map,
	elm$core$Tuple$first,
	A2(
		elm$parser$Parser$andThen,
		author$project$Puzzle$Format$Xd$maybeToParserOrError('No character found!'),
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(elm$core$String$uncons),
			elm$parser$Parser$getChompedString(
				elm$parser$Parser$chompIf(elm$core$Char$isAlphaNum)))));
var author$project$Puzzle$Format$Xd$cell = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			function (x) {
				return author$project$Data$Puzzle$Letter(x);
			},
			author$project$Puzzle$Format$Xd$character),
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(author$project$Data$Puzzle$Shaded),
			elm$parser$Parser$symbol('#'))
		]));
var author$project$Puzzle$Format$Xd$line = A2(
	author$project$Puzzle$Format$Xd$loopUntil,
	'\n',
	function (x) {
		return A2(elm$parser$Parser$keeper, x, author$project$Puzzle$Format$Xd$cell);
	});
var author$project$Puzzle$Format$Xd$grid = function () {
	var rawGrid = A2(
		elm$parser$Parser$andThen,
		author$project$Puzzle$Format$Xd$maybeToParserOrError('ran into a problem trying to parse the grid'),
		A2(
			elm$parser$Parser$map,
			author$project$Data$Grid$from2DList,
			A2(
				author$project$Puzzle$Format$Xd$loopUntil,
				'\n\n',
				function (x) {
					return A2(elm$parser$Parser$keeper, x, author$project$Puzzle$Format$Xd$line);
				})));
	return rawGrid;
}();
var author$project$Puzzle$Format$Xd$dictToMetadata = function (dict) {
	return {
		dq: A2(elm$core$Dict$get, 'Author', dict),
		dC: A2(elm$core$Dict$get, 'Date', dict),
		dK: A2(elm$core$Dict$get, 'Editor', dict),
		eU: A2(elm$core$Dict$get, 'Title', dict)
	};
};
var author$project$Puzzle$Format$Xd$metadataLine = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Tuple$pair),
			elm$parser$Parser$spaces),
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				author$project$Puzzle$Format$Xd$readUntil(':'),
				elm$parser$Parser$symbol(':')),
			elm$parser$Parser$spaces)),
	author$project$Puzzle$Format$Xd$readUntil('\n'));
var author$project$Puzzle$Format$Xd$metadataPairs = A2(
	author$project$Puzzle$Format$Xd$loopUntil,
	'\n\n',
	function (x) {
		return A2(
			elm$parser$Parser$keeper,
			x,
			A2(
				elm$parser$Parser$ignorer,
				author$project$Puzzle$Format$Xd$metadataLine,
				elm$parser$Parser$symbol('\n')));
	});
var author$project$Puzzle$Format$Xd$metadata = A2(
	elm$parser$Parser$map,
	author$project$Puzzle$Format$Xd$dictToMetadata,
	A2(elm$parser$Parser$map, elm$core$Dict$fromList, author$project$Puzzle$Format$Xd$metadataPairs));
var author$project$Data$Grid$above = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return author$project$Data$Grid$get(
		_Utils_Tuple2(x, y - 1));
};
var author$project$Data$Grid$below = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return author$project$Data$Grid$get(
		_Utils_Tuple2(x, y + 1));
};
var elm$core$Basics$modBy = _Basics_modBy;
var author$project$Data$Grid$indexToPoint = F2(
	function (index, _n0) {
		var grid = _n0;
		return _Utils_Tuple2(
			A2(elm$core$Basics$modBy, grid.w, index),
			(index / grid.w) | 0);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$core$Array$toIndexedList = function (array) {
	var len = array.a;
	var helper = F2(
		function (entry, _n0) {
			var index = _n0.a;
			var list = _n0.b;
			return _Utils_Tuple2(
				index - 1,
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(index, entry),
					list));
		});
	return A3(
		elm$core$Array$foldr,
		helper,
		_Utils_Tuple2(len - 1, _List_Nil),
		array).b;
};
var author$project$Data$Grid$foldlIndexed = F3(
	function (fn, acc, g) {
		var grid = g;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n0, acc2) {
					var index = _n0.a;
					var cell = _n0.b;
					return A2(
						fn,
						_Utils_Tuple2(
							A2(author$project$Data$Grid$indexToPoint, index, g),
							cell),
						acc2);
				}),
			acc,
			elm$core$Array$toIndexedList(grid.x));
	});
var author$project$Data$Grid$leftOf = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return author$project$Data$Grid$get(
		_Utils_Tuple2(x - 1, y));
};
var author$project$Data$Grid$rightOf = function (_n0) {
	var x = _n0.a;
	var y = _n0.b;
	return author$project$Data$Grid$get(
		_Utils_Tuple2(x + 1, y));
};
var author$project$Data$Puzzle$AcrossAndDownStart = 2;
var author$project$Data$Puzzle$WordStart = F3(
	function (point, direction, clueNumber) {
		return {dy: clueNumber, z: direction, br: point};
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$Puzzle$Format$Xd$wordStarts = function (grid_) {
	var isDownStart = function (point) {
		var below = A3(
			elm$core$Basics$composeL,
			elm$core$Basics$not,
			author$project$Puzzle$Format$Xd$isShaded,
			A2(author$project$Data$Grid$below, point, grid_));
		var above = author$project$Puzzle$Format$Xd$isShaded(
			A2(author$project$Data$Grid$above, point, grid_));
		return above && below;
	};
	var isAcrossStart = function (point) {
		return author$project$Puzzle$Format$Xd$isShaded(
			A2(author$project$Data$Grid$leftOf, point, grid_)) && A3(
			elm$core$Basics$composeL,
			elm$core$Basics$not,
			author$project$Puzzle$Format$Xd$isShaded,
			A2(author$project$Data$Grid$rightOf, point, grid_));
	};
	var helper = F2(
		function (_n1, _n2) {
			var point = _n1.a;
			var theCell = _n1.b;
			var acc = _n2.a;
			var num = _n2.b;
			var _n0 = _Utils_Tuple3(
				author$project$Puzzle$Format$Xd$isShaded(theCell),
				isAcrossStart(point),
				isDownStart(point));
			_n0$3:
			while (true) {
				if (!_n0.a) {
					if (!_n0.b) {
						if (_n0.c) {
							return _Utils_Tuple2(
								A2(
									elm$core$List$cons,
									A3(author$project$Data$Puzzle$WordStart, point, 1, num),
									acc),
								num + 1);
						} else {
							break _n0$3;
						}
					} else {
						if (_n0.c) {
							return _Utils_Tuple2(
								A2(
									elm$core$List$cons,
									A3(author$project$Data$Puzzle$WordStart, point, 2, num),
									acc),
								num + 1);
						} else {
							return _Utils_Tuple2(
								A2(
									elm$core$List$cons,
									A3(author$project$Data$Puzzle$WordStart, point, 0, num),
									acc),
								num + 1);
						}
					}
				} else {
					break _n0$3;
				}
			}
			return _Utils_Tuple2(acc, num);
		});
	return elm$core$List$reverse(
		A3(
			author$project$Data$Grid$foldlIndexed,
			helper,
			_Utils_Tuple2(_List_Nil, 1),
			grid_).a);
};
var author$project$Puzzle$Format$Xd$puzzle = function (id) {
	var buildPuzzle = F3(
		function (metadata_, grid_, clues_) {
			var wordStarts_ = author$project$Puzzle$Format$Xd$wordStarts(grid_);
			return {
				dz: clues_,
				bd: A3(author$project$Puzzle$Format$Xd$annotate, grid_, wordStarts_, clues_),
				m: grid_,
				bh: id,
				d7: metadata_,
				em: elm$core$Maybe$Nothing,
				bY: wordStarts_
			};
		});
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(buildPuzzle),
				author$project$Puzzle$Format$Xd$metadata),
			author$project$Puzzle$Format$Xd$grid),
		author$project$Puzzle$Format$Xd$cluesDict);
};
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cd: col, cO: problem, eI: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.eI, p.cd, p.cO);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{cd: 1, g: _List_Nil, h: 1, c: 0, eI: 1, a: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Puzzle$Format$Xd$parse = F2(
	function (id, input) {
		return A2(
			elm$parser$Parser$run,
			author$project$Puzzle$Format$Xd$puzzle(id),
			input + '\n');
	});
var elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return elm$core$Maybe$Just(v);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$BundledPuzzles$parseBundledPuzzle = F2(
	function (i, string) {
		return elm$core$Result$toMaybe(
			A2(
				author$project$Puzzle$Format$Xd$parse,
				author$project$BundledPuzzles$bundledId(i),
				string));
	});
var author$project$Gen$BundledPuzzles$puzzle0 = 'Title: New York Times, Tuesday, April 22, 1952\nAuthor: Unknown\nEditor: Margaret Farrar\nDate: 1952-04-22\n\n\nDAYTON###CADENT\nODOACER#MALABAR\nMEDIATE#ABALONE\nILE#STANDIN#NEA\nNILE#ADORN#PITT\nENEAS#INE#PUTTS\n#ERSKINE#PELEE#\n###TING#ROSA###\n#LEEDS#DEPOSED#\nCORNS#SOS#SKIRL\nACID#SCOTT#INEE\nMAG#ALAMEIN#ASP\nDROLLER#PRELUDE\nENNEADS#SECEDER\nNOESIS###SKEINS\n\n\nA1. City of 243,872 in Ohio. ~ DAYTON\nA7. Having rhythm. ~ CADENT\nA13. First barbarian ruler of Italy. ~ ODOACER\nA15. Mr. Bromfield\'s hacienda. ~ MALABAR\nA16. What arbitrators do. ~ MEDIATE\nA17. Large snail with a bowl-like shell. ~ ABALONE\nA18. ___ de France. ~ ILE\nA19. Movie star\'s double. ~ STANDIN\nA21. Educational group: Abbr. ~ NEA\nA22. 4,160-mile river. ~ NILE\nA24. Add luster to. ~ ADORN\nA25. "The Great Commoner.” ~ PITT\nA26. Man\'s name. ~ ENEAS\nA28. Common suffix. ~ INE\nA29. Golf strokes. ~ PUTTS\nA30. British general at Suez. ~ ERSKINE\nA32. Martinique volcano, quiet since 1902. ~ PELEE\nA33. A ringing sound. ~ TING\nA34. Girl\'s name. ~ ROSA\nA35. English city on the Aire. ~ LEEDS\nA37. Removed from office. ~ DEPOSED\nA40. Preserves in brine. ~ CORNS\nA41. 3 dots, 3 dashes, 3 dots. ~ SOS\nA42. Play the bagpipes. ~ SKIRL\nA44. Etcher\'s equipment. ~ ACID\nA45. Mr. Fitzgerald. ~ SCOTT\nA47. Poison for arrow tips. ~ INEE\nA48. Short for a periodical. ~ MAG\nA49. Where the Desert Fox was turned back. ~ ALAMEIN\nA51. Cleopatra\'s way out. ~ ASP\nA52. More amusing. ~ DROLLER\nA54. Composition by Bach or Chopin. ~ PRELUDE\nA56. Groups of nine persons or things. ~ ENNEADS\nA57. One who withdraws from a group. ~ SECEDER\nA58. In philosophy, a thing grasped by the intellect alone. ~ NOESIS\nA59. Lengths of yarn. ~ SKEINS\n\nD1. Master: Latin. ~ DOMINE\nD2. Girl in an oldtime song. ~ ADELINE\nD3. A Swiss Bing Crosby. ~ YODELER\nD4. Siamese. ~ TAI\nD5. Tubers eaten in South America. ~ OCAS\nD6. Girl\'s nickname. ~ NETTA\nD7. Part of a motel. ~ CABIN\nD8. Mr. Mowbray, actor. ~ ALAN\nD9. Decaliter: Abbr. ~ DAL\nD10. Hard black stone. ~ EBONITE\nD11. The "No No” girl. ~ NANETTE\nD12. Pays the other fellow\'s check. ~ TREATS\nD14. City of 110,568 in Pennsylvania. ~ READING\nD15. Sierra ___ Mountains in Mexico. ~ MADRE\nD20. In no way. ~ NONE\nD23. Thickly settled part of London. ~ EASTEND\nD25. Polish general in our Revolutionary Army. ~ PULASKI\nD27. Slides sideways. ~ SKIDS\nD29. Silver money in the Philippines. ~ PESOS\nD31. Hartford\'s specialty: Abbr. ~ INS\nD32. Member of the family. ~ POP\nD34. Walks again a short distance. ~ RESTEPS\nD35. Scene of 1925 European peace pact. ~ LOCARNO\nD36. Daughter of Icarius. ~ ERIGONE\nD37. Adverse fate. ~ DOOM\nD38. President in Rome. ~ EINAUDI\nD39. Superior variety of porcelain. ~ DRESDEN\nD40. City of 124,555 in New Jersey. ~ CAMDEN\nD41. Catfaces. ~ SCARS\nD43. Outcasts. ~ LEPERS\nD45. Racers at Lake Placid. ~ SLEDS\nD46. White-walled items. ~ TIRES\nD49. Jai ___, Cuban game. ~ ALAI\nD50. Part of a violin. ~ NECK\nD53. "___ Misérables.” ~ LES\nD55. Governor of Utah. ~ LEE\n\n';
var author$project$Gen$BundledPuzzles$puzzle1 = 'Title: Leave a Cup Out\nAuthor: Mike Selinker & Gaby Weidling\nCopyright: © 2013 Eltana\nNumber: 60\nDate: 2013-03-16\n\n\nJOSS#EWAN#WASNT\nARUT#GORE#OSCAR\nMICE#GOES#RHODA\n#ETAL##ATHLETIC\nSNIDER##LID#TNT\nITO#COFFEE#DIE#\nMSN#TSAR##SUE##\n###MEASURING###\n##TAR##IOTA#SAM\n#DRY#BUTTER#TLC\nPEE#DIS##MEDALS\nAMERICAS##DINT#\nBOTOX#BEST#ALIG\nSTOLI#LAKE#NEMO\nTEPEE#ENYA#EYED\n\n\nA1. Serenity director Whedon ~ JOSS\nA5. He played Christian in Moulin Rouge! ~ EWAN\nA9. "It ___ me!" ~ WASNT\nA14. Stuck in ___ ~ ARUT\nA15. It may be part of a horror film ~ GORE\nA16. Grouchy owner of Slimey ~ OSCAR\nA17. Builders of Earth in the The Hitchhiker\'s Guide to the Galaxy ~ MICE\nA18. Travels ~ GOES\nA19. Valerie Harper sitcom ~ RHODA\nA20. Bibliography abbr. ~ ETAL\nA22. Like a varsity player ~ ATHLETIC\nA24. More underhanded ~ SNIDER\nA26. Cap ~ LID\nA27. Explosive substance ~ TNT\nA28. "What was ___ do?" ~ ITO\nA29. Shade of brown ~ COFFEE\nA32. Pass away ~ DIE\nA33. AOL competitor ~ MSN\nA34. Ivan the Terrible, e.g. ~ TSAR\nA35. Boy in a Johnny Cash song ~ SUE\nA36. Type of tape ~ MEASURING\nA39. Toxic output of cigarettes ~ TAR\nA40. Tiny amount ~ IOTA\nA41. Local attraction next to Hammering Man ~ SAM\nA44. Arid ~ DRY\nA45. Toast topper ~ BUTTER\nA47. "Waterfalls" trio ~ TLC\nA48. ___-wee Herman ~ PEE\nA49. Insult ~ DIS\nA50. Gets on the podium ~ MEDALS\nA52. Western Hemisphere lands ~ AMERICAS\nA55. Force ~ DINT\nA56. Cosmetic procedure ~ BOTOX\nA57. Greatest ~ BEST\nA60. Sacha Baron Cohen\'s character ~ ALIG\nA62. Maker of Chocolat Razberi and Ohranji vodkas ~ STOLI\nA63. Huron, e.g. ~ LAKE\nA64. Pixar fish ~ NEMO\nA65. Portable Plains dwelling ~ TEPEE\nA66. She sung over the closing credits of The Fellowship of the Ring ~ ENYA\nA67. Ogled ~ EYED\n\nD1. Rock out ~ JAM\nD2. Positions ~ ORIENTS\nD3. What a vacuum cleaner has ~ SUCTION\nD4. Place ~ STEAD\nD5. What Silly Putty comes in ~ EGG\nD6. Court ~ WOO\nD7. Length times width, in a rectangle ~ AREA\nD8. Crunch producer ~ NESTLE\nD9. Earth ~ WORLD\nD10. Tennis great Arthur ~ ASHE\nD11. Type of terrier ~ SCOTTIE\nD12. Woman to whom Chuck Berry sings, "Honey is that you?" ~ NADINE\nD13. Plot of land ~ TRACT\nD21. Hannibal the Cannibal ~ LECTER\nD23. Hasten ~ HIE\nD24. Virtual person in a series of PC games ~ SIM\nD25. Pink, to Carlos ~ ROSA\nD30. Fourth notes in a scale ~ FAS\nD31. Oft seen symbols on a slot machine ~ FRUIT\nD32. Burrowed ~ DUG\nD35. Caught ~ SNARED\nD36. Month featuring Mother\'s Day ~ MAY\nD37. Act like a zombie ~ ROT\nD38. One of twelve allowed an express checkout, perhaps ~ ITEM\nD39. "Rock-a-bye Baby" locale ~ TREETOP\nD41. The Devil Wears Prada co-star Tucci ~ STANLEY\nD42. Unsurpassed ~ ALLTIME\nD43. Hosts, briefly ~ MCS\nD44. Take away responsiblity ~ DEMOTE\nD45. Pen brand ~ BIC\nD46. Functional ~ USABLE\nD48. Beer with a blue ribbon ~ PABST\nD49. Nickname for the South ~ DIXIE\nD51. Keaton or Sawyer ~ DIANE\nD53. Part ~ ROLE\nD54. Penn of Mystic River ~ SEAN\nD58. Celestial dome ~ SKY\nD59. Boston harbor contents on December 16, 1773 ~ TEA\nD61. One trusted on a one? ~ GOD\n\n';
var author$project$Gen$BundledPuzzles$puzzle2 = 'Title: Send a Food Basket\nAuthor: Mike Selinker\nCopyright: © 2013 Eltana\nNumber: 58\nDate: 2013-02-13\n\n\n######BOO######\n#####SAINT#####\n####PARLORS####\n###SALT#RICE###\n###ERA###MAS###\n###NAM###MRT###\nREDD#ICAME#ACDC\nOSHA#SUGAR#THEO\nSCALP#TEX#DEIFY\n#ALLAH###PESCI#\nMRC#LENTILS#KLM\nAGUE#WAYTO#APIE\nCORNANDSOYBLEND\n#TRYA#IOU#STAG#\n##YAH#ANT#AIS##\n\n\nA1. Halloween sound ~ BOO\nA4. Ireland\'s Patrick, supposedly ~ SAINT\nA6. Drawing rooms ~ PARLORS\nA8. World Food Programme basket offering ~ SALT\nA9. WFP basket offering ~ RICE\nA11. Time period ~ ERA\nA12. "Live ___" (Taco Bell slogan) ~ MAS\nA13. Setting of Platoon and Apocalypse Now ~ NAM\nA14. Star of the BBC show World\'s Craziest Fools ~ MRT\nA15. Foxx of Sanford and Son ~ REDD\nA18. When "veni" means ~ ICAME\nA22. Its Back in Black album entered the Grammy Hall of Fame in 2012 ~ ACDC\nA26. Worksite-monitoring bureau ~ OSHA\nA27. WFP basket offering ~ SUGAR\nA28. Cliff Huxtable\'s son ~ THEO\nA29. Where hair grows ~ SCALP\nA31. Daffy Duck creator Avery ~ TEX\nA32. Treat as divine ~ DEIFY\nA33. In Islam, he has 99 names ~ ALLAH\nA35. Joe of Goodfellas ~ PESCI\nA36. Happy Days character named similarly to 14-Across ~ MRC\nA37. WFP basket offering ~ LENTILS\nA41. Dutch airline that\'s an alphabetic string ~ KLM\nA43. Fit of chills ~ AGUE\nA45. "Another ___ Die" (Bond theme by Jack White and Alicia Keys) ~ WAYTO\nA46. Where four and twenty blackbirds were baked ~ APIE\nA47. WFP basket offering ~ CORNANDSOYBLEND\nA50. "___ Little Tenderness" ~ TRYA\nA51. Promissory acronym ~ IOU\nA52. Just for men ~ STAG\nA53. Cry to a whipped horse ~ YAH\nA54. Farm animal ~ ANT\nA55. Computer brains, for short ~ AIS\n\nD1. Maggie\'s brother ~ BART\nD2. WFP basket offering ~ OIL\nD3. ___ (approximately) ~ ONOR\nD4. They hang out in butcher shops ~ SALAMIS\nD5. Device for tending hedges or mustaches ~ TRIMMER\nD6. Prefix for legal or trooper ~ PARA\nD7. The Lion King villain ~ SCAR\nD8. Email command which might get your whole office mad at you ~ SENDALL\nD10. Places like Wayne Manor ~ ESTATES\nD15. Sigur ___ (Icelandic alt-rock band) ~ ROS\nD16. French delicacy ~ ESCARGOT\nD17. WFP basket offering ~ DHALCURRY\nD19. With 40-Down, instruction to an annoying little brother ~ CUT\nD20. Vital stat ~ AGE\nD21. Mad ___ (Mel Gibson character) ~ MAX\nD23. WFP basket offering ~ CHICKPEAS\nD24. Corruption of purity ~ DEFILING\nD25. Coquettish ~ COY\nD30. Chum ~ PAL\nD32. ___ Moines, WA ~ DES\nD34. Macheted ~ HEWN\nD35. Clever ruse ~ PLOY\nD36. Apple computer ~ MAC\nD38. Gymnast Com ~ NADIA\nD39. Boxer/Broadway star Mike ~ TYSON\nD40. See 19-Down ~ ITOUT\nD42. Club ___ (Caribbean resort) ~ MED\nD44. Ethereal-voiced singer ~ ENYA\nD46. They sing with bassi and soprani ~ ALTI\nD48. Ooh and ___ ~ AAH\nD49. Org. that may change its ban on gays ~ BSA\n\n';
var author$project$Gen$BundledPuzzles$puzzle3 = 'Title: New York Times, Wednesday, November 22, 1950\nAuthor: Henry A. Wolfe\nEditor: Margaret Farrar\nDate: 1950-11-22\n\n\n#HEMPEL#MUNSEL#\nCANASTA#ADONAIS\nLILLIAN#LOCARNO\nARIAS#SIL#KINER\nUPSY#BIDES#LEAR\nDIT#PENATES#STE\nENSILAGE#CARTEL\n###WAR###ROI###\nPOLAND#SPENGLER\nICI#SERIATE#EVE\nLABS#NOTRE#SOAP\nARETE#BES#VANNA\nGIRASOL#EYELIDS\nENTITLE#CORONET\n#AENEAS#SUTLER#\n\n\nA1. A famous Marguerite. ~ HEMPEL\nA7. A popular Mignon. ~ MUNSEL\nA13. Bridge\'s rival. ~ CANASTA\nA14. Shelley\'s elegy to Keats. ~ ADONAIS\nA16. She played "The Curious Savage." ~ LILLIAN\nA17. Swiss town where Peace Pact was signed, 1925. ~ LOCARNO\nA18. Fortes of 1 and 7 Across. ~ ARIAS\nA19. Yellow ocher. ~ SIL\nA21. Home run specialist. ~ KINER\nA22. Child\'s word. ~ UPSY\nA23. Awaits. ~ BIDES\nA25. He had three daughters. ~ LEAR\nA26. Said: French. ~ DIT\nA27. Roman household gods. ~ PENATES\nA29. Sainte: Abbr. ~ STE\nA30. Farmer\'s winter store. ~ ENSILAGE\nA32. International trade combine. ~ CARTEL\nA34. Cold ___. ~ WAR\nA35. Louis XIV\'s title. ~ ROI\nA36. Chopin\'s birthplace. ~ POLAND\nA39. He wrote "The Decline of the West." ~ SPENGLER\nA44. Here: French. ~ ICI\nA45. Arranged in succession. ~ SERIATE\nA47. Miss Curie. ~ EVE\nA48. Where chem. students work. ~ LABS\nA50. Our: French. ~ NOTRE\nA51. Kind of opera. ~ SOAP\nA52. Rugged crest of a mountain. ~ ARETE\nA54. Egyptian god of pleasure. ~ BES\nA55. Monna ___, Maeterlinck heroine. ~ VANNA\nA56. Fire opal. ~ GIRASOL\nA58. Expressive parts of the face. ~ EYELIDS\nA60. Designate. ~ ENTITLE\nA61. Symbol of nobility. ~ CORONET\nA62. Dutiful son of Anchises. ~ AENEAS\nA63. Army follower who sells provisions to soldiers. ~ SUTLER\n\nD1. It\'s sometimes invisible. ~ HAIRPIN\nD2. Volunteers for military service. ~ ENLISTS\nD3. Native of Penang. ~ MALAY\nD4. Greek letters. ~ PSIS\nD5. Greek numeral 8. ~ ETA\nD6. Wilson\'s Secretary of State. ~ LANSING\nD7. Implement used in a game. ~ MALLET\nD8. Japanese herb. ~ UDO\nD9. Horn tip of an archer\'s bow. ~ NOCK\nD10. Gastropod. ~ SNAIL\nD11. Not trivial. ~ EARNEST\nD12. Marked with stripes. ~ LINEATE\nD13. M. Debussy. ~ CLAUDE\nD15. Warwick Deeping\'s hero. ~ SORREL\nD20. Suffix forming zoological names. ~ IDAE\nD23. Ballplayer, formerly with Cleveland, now with Washington. ~ BEARDEN\nD24. Conceal. ~ SECRETE\nD27. Layouts. ~ PLANS\nD28. Tributary of the Rhone. ~ SAONE\nD31. Frigate bird of Hawaii. ~ IWA\nD33. Vehicle with a horse. ~ RIG\nD36. Animal\'s coat: Rare. ~ PILAGE\nD37. Egg-shaped musical instrument. ~ OCARINA\nD38. New French luxury liner. ~ LIBERTE\nD39. Area for a building. ~ SITE\nD40. Measures for interstellar space. ~ PARSECS\nD41. Tawny. ~ LEONINE\nD42. Son of Hermes. ~ EVANDER\nD43. Feast. ~ REPAST\nD46. White oaks of California. ~ ROBLES\nD49. Dye. ~ STAIN\nD51. An antiseptic preparation. ~ SALOL\nD53. Town near Padua. ~ ESTE\nD55. Green: French. ~ VERT\nD57. Norse name. ~ OLA\nD59. Pronoun. ~ YOU\n\n';
var author$project$Gen$BundledPuzzles$puzzle4 = 'Title: Write a Poem\nAuthor: Mike Selinker\nCopyright: © 2013 Eltana\nNumber: 68\nDate: 2013-07-16\n\n\n##PITA#NOW##CRY\nGLAZED#YOHO#HUE\nDEPENDSUPON#ITS\nAMA#NIA#SOMUCH#\nYAY#INGE##ELK##\n#TANS##CAM#PELE\n###THECORE##NIX\nWITH#WATER#ASTO\nICH##EVADERS###\nLEEK#RAG##AKIN#\n##WEB##EARP#BOB\n#RHYMED#WAH#EGO\nTAI#WHEELBARROW\nKIT#SOBS#BESIDE\nONE##HIP#ILSA##\n\n\nA1. Falafel container ~ PITA\nA5. This second ~ NOW\nA8. Bawl ~ CRY\nA11. Like some donuts ~ GLAZED\nA13. Pirate chant ~ YOHO\nA15. Shade ~ HUE\nA16. Trusts ~ DEPENDSUPON\nA18. Indefinite pronoun ~ ITS\nA19. Doctors\' org. ~ AMA\nA20. Actress Long ~ NIA\nA21. "Why I Love You ___" (Monica single) ~ SOMUCH\nA23. "Great news!" ~ YAY\nA24. Pirates slugger Brandon ~ INGE\nA26. Large-antlered ruminant ~ ELK\nA27. Goes to a parlor ~ TANS\nA29. Moving part of an engine ~ CAM\nA32. His record of 75 goals in a year was just passed by Lionel Messi ~ PELE\nA35. 2003 film at #2 on NASA\'s Worst Sci-Fi Movies list, just behind 2012 ~ THECORE\nA38. Cancel ~ NIX\nA39. Alongside ~ WITH\nA42. Evian product ~ WATER\nA43. Vis-à-vis ~ ASTO\nA44. Berlin pronoun ~ ICH\nA45. They commit tax crimes ~ EVADERS\nA47. Vegetable related to the onion ~ LEEK\nA49. Terrible newspaper ~ RAG\nA50. Ex-Missouri Rep. Todd infamous for saying "The female body has ways to try to shut that whole thing down" ~ AKIN\nA53. Collection of millions of sites ~ WEB\nA55. Gunman Wyatt ~ EARP\nA58. Comedian Newhart ~ BOB\nA60. Created some poems, though not the one in this puzzle ~ RHYMED\nA63. "Doo ___ Diddy" ~ WAH\nA64. Big head ~ EGO\nA65. ___ chi ~ TAI\nA66. Device similar to a hand truck ~ WHEELBARROW\nA69. Snap-Tite offering ~ KIT\nA70. Has a good 8-Across ~ SOBS\nA71. Compared to ~ BESIDE\nA72. U2 song ~ ONE\nA73. Cool ~ HIP\nA74. Ingrid in Casablanca ~ ILSA\n\nD1. Ingredient in a Thai salad ~ PAPAYA\nD2. Ending for slender or commercial ~ IZE\nD3. About midmorning ~ TENNISH\nD4. Employ after the start of a recipe ~ ADDIN\nD5. Manhattan sch. ~ NYU\nD6. "My bad!" ~ OOPS\nD7. "That\'s awesome!" ~ WHOO\nD8. Coop denizens ~ CHICKENS\nD9. Book in which Naomi meets Boaz ~ RUTH\nD10. "Owner of a Lonely Heart" band ~ YES\nD11. Down Under salutation ~ GDAY\nD12. American Graffiti star Paul ~ LEMAT\nD14. "I shall pay for your purchase" ~ ONME\nD17. Droop ~ SAG\nD22. Throaty comment denoting worry ~ ULP\nD25. Earth Liberation Front action ~ ECOTAGE\nD28. Highest ~ NTH\nD30. Picasso\'s Woman in ___ Armchair ~ ARED\nD31. Paltry ~ MERE\nD33. Drunk ~ LIT\nD34. Prefix for skeleton or biology ~ EXO\nD36. Water vessel ~ EWER\nD37. Vena ___ ~ CAVA\nD39. Author/actor Wheaton ~ WIL\nD40. Summer beverage contents ~ ICE\nD41. Gandalf, post-resurrection ~ THEWHITE\nD43. Query ~ ASK\nD46. One of the ninja turtles ~ RAPHAEL\nD48. Solution ~ KEY\nD51. Land southwest of the Pyrenees ~ IBERIA\nD52. "Apart from me there is ___" (Isaiah 45:5) ~ NOGOD\nD54. Cars in the E series, likely ~ BMWS\nD56. Toolshelf item ~ AWL\nD57. Shul official ~ RABBI\nD59. Nineties heavyweight champ Riddick ~ BOWE\nD60. Beatles song featuring the lyric "When the sun shines they slip into the shade and sip their lemonade" ~ RAIN\nD61. Teletubbies catchphrase ~ EHOH\nD62. Ms. Thomas of skating ~ DEBI\nD65. Decision for 59-Down ~ TKO\nD67. Mental reading ~ ESP\nD68. Type of internet feed ~ RSS\n\n';
var author$project$Gen$BundledPuzzles$puzzle5 = 'Title: Build, Then Furnish\nAuthor: Mike Selinker\nCopyright: © 2014 Eltana\nNumber: 99\nDate: 2014-10-18\n\n\n######UMP######\n#####DREAM#####\n####EIGHTPM####\n###LOVESHACK###\n##AONE###ACAI##\n#ANDS#LEA#ISNT#\nPRIG#MIAMI#ERAS\nHOMEIMPROVEMENT\nIDA#MAS#USA#SKY\n##LBO#YEN#TMI##\n##HEN#NYT#SYD##\n##OFFICESPACE##\n##URIS###IWON##\n##SERA###TALC##\n##EEEK###HYDE##\n\n\nA1. World Series figure ~ UMP\nA4. Result of a vision quest ~ DREAM\nA6. 20:00, to civilians ~ EIGHTPM\nA8. B-52s song containing the phrase "Tin roof, rusted!" ~ LOVESHACK\nA10. Top-shelf ~ AONE\nA11. Popular berry ~ ACAI\nA13. They are not ifs or buts ~ ANDS\nA14. Glee\'s ___ Michele ~ LEA\nA17. Fails to exist ~ ISNT\nA19. Scold ~ PRIG\nA20. Site of the Fontainebleau Hotel ~ MIAMI\nA22. Periods ~ ERAS\nA24. Show on which Pamela Anderson debuted ~ HOMEIMPROVEMENT\nA27. Ore-___ (potato brand) ~ IDA\nA28. Ending for many holidays ~ MAS\nA29. Hope Solo\'s team ~ USA\nA30. Variety of blue ~ SKY\nA31. Hostile takeover, in stock reports ~ LBO\nA33. Far East currency ~ YEN\nA35. "Talk to the hand," briefly ~ TMI\nA37. Mother clucker ~ HEN\nA38. Abbr. for a Manhattan paper ~ NYT\nA39. Pink Floyd\'s Roger Barrett ~ SYD\nA40. 1999 film featuring a Swingline stapler ~ OFFICESPACE\nA43. Novelist Leon ~ URIS\nA44. Victorious shout ~ IWON\nA45. It twice follows "Que" in a song ~ SERA\nA46. Soft mineral ~ TALC\nA47. Shrieky cry ~ EEEK\nA48. Bad Mr. of literature ~ HYDE\n\nD1. Prompt ~ URGE\nD2. Uninterested comments ~ MEHS\nD3. Course ~ PATH\nD4. Terrible bar ~ DIVE\nD5. Oscars org. ~ MPAA\nD6. Forever ~ EONS\nD7. 1201, to the Romans ~ MCCI\nD8. Mountain abode ~ LODGE\nD9. Casey who passed in 2014 ~ KASEM\nD10. Movie with the line "Was it over when the Germans bombed Pearl Harbor?" ~ ANIMALHOUSE\nD12. Like the position of some artists ~ INRESIDENCE\nD13. Nickname of a Packer, Yankee, or tennis star, none of whom have any of the same names ~ AROD\nD14. Karaoke silently ~ LIPSYNC\nD15. Ring locale ~ EAR\nD16. Dollar figures ~ AMOUNTS\nD18. Fury vehicle ~ TANK\nD19. Letter in sorority names ~ PHI\nD20. Violent sport, for short ~ MMA\nD21. Drips RNs give you ~ IVS\nD23. Dirty place ~ STY\nD25. Song where Springsteen has "a freight train running through the middle of my head" ~ IMONFIRE\nD26. Erodes ~ EATSAWAY\nD32. Command to a creature released into the wild ~ BEFREE\nD34. Stare at ~ EYE\nD36. "From ___, dead hands" (NRA slogan) ~ MYCOLD\nD41. Ms. Dinesen of letters ~ ISAK\nD42. Spongy tissue in fruit ~ PITH\n\n';
var author$project$Gen$BundledPuzzles$puzzle6 = 'Title: TAPESTRY OF WORDS [New York Times, Sunday, September 23, 1951]\nAuthor: Israel Gitter\nEditor: Margaret Farrar\nDate: 1951-09-23\n\n\nMORTIMER#CALAIS#ABASE\nOVERBORE#OPORTO#BANTS\nROSENMAN#RINSED#CHAET\nSITS##SOUSA#EROS#STER\nEDS#RIMINI#ENAMOR#OLE\n###MATURE#SWAT#THELMA\nALLEGES##STELE##UNIAT\nMAILER#METERS#FABIANS\nBUNTS#ROGERS#FARAD###\nADDS#BERGEN#MILER#PRE\nLEE#CRATER#AINTAB#REX\nARN#HARAR#BINGES#LOTE\n###FEVER#MASHER#WEBER\nSHOALED#BAYLOR#FOMENT\nPARIS##MELEE##TIRADES\nABATES#ARAS#KEENLY###\nRAT#AUSTIN#DISHED#RPM\nKNOP#AHAB#TEMPE##SOIE\nMEROE#IPECAC#ORIENTAL\nARIEL#PARAMO#SANTAANA\nNAOMI#SNIDER#ANDERSON\n\n\nA1. First name of a radio blockhead. ~ MORTIMER\nA9. French port. ~ CALAIS\nA15. Reduce in rank. ~ ABASE\nA20. Domineered. ~ OVERBORE\nA21. Portuguese seaport. ~ OPORTO\nA22. Diets: Humorous. ~ BANTS\nA23. F. D. R. aide. ~ ROSENMAN\nA24. Washed. ~ RINSED\nA25. Mane: Comb. form. ~ CHAET\nA26. Congress does. ~ SITS\nA27. Composer of "El Capitan." ~ SOUSA\nA29. Youngest god. ~ EROS\nA31. Noun suffix. ~ STER\nA32. Wynn, Flynn. ~ EDS\nA33. Adriatic port. ~ RIMINI\nA35. Charm. ~ ENAMOR\nA37. Danish name. ~ OLE\nA38. Samson on the screen. ~ MATURE\nA39. Resounding slap. ~ SWAT\nA40. Actress Ritter. ~ THELMA\nA42. Asserts. ~ ALLEGES\nA45. A pillar. ~ STELE\nA46. Eastern Christian. ~ UNIAT\nA47. He wrote "Barbary Shore." ~ MAILER\nA48. Parking ___. ~ METERS\nA50. English socialists. ~ FABIANS\nA52. Rizzuto specialties. ~ BUNTS\nA53. Ginger of Hollywood. ~ ROGERS\nA54. Electrical unit. ~ FARAD\nA55. Appends. ~ ADDS\nA56. Seaport in Norway. ~ BERGEN\nA57. Runner. ~ MILER\nA58. Before: Prefix. ~ PRE\nA61. Utah Governor. ~ LEE\nA62. Shell hole. ~ CRATER\nA63. Turkish town, n. of Aleppo. ~ AINTAB\nA64. Actor Harrison. ~ REX\nA65. Kansas Governor. ~ ARN\nA66. Ethiopian town. ~ HARAR\nA67. Sprees. ~ BINGES\nA68. Water plant: Archaic. ~ LOTE\nA69. Excitement. ~ FEVER\nA70. Kitchen tool. ~ MASHER\nA71. ___ and Fields. ~ WEBER\nA72. Schooled, as fish. ~ SHOALED\nA75. Waco university. ~ BAYLOR\nA76. Instigate. ~ FOMENT\nA77. It is 2,000 years old. ~ PARIS\nA78. Free-for-all. ~ MELEE\nA79. Intemperate speeches. ~ TIRADES\nA80. Subsides. ~ ABATES\nA82. Macaws. ~ ARAS\nA83. Vehemently. ~ KEENLY\nA85. Rodent. ~ RAT\nA86. U. S. spokesman at U. N. ~ AUSTIN\nA88. Made concave. ~ DISHED\nA89. Revolutions per minute. ~ RPM\nA92. A boss. ~ KNOP\nA94. King of Israel. ~ AHAB\nA95. Vale of ___ in Thessaly. ~ TEMPE\nA96. Silk: French. ~ SOIE\nA97. Ancient capital of Ethiopia. ~ MEROE\nA99. Tropical plant. ~ IPECAC\nA101. Chinese. ~ ORIENTAL\nA104. "Tempest" spirit. ~ ARIEL\nA105. Andes plateau. ~ PARAMO\nA106. City in southern California. ~ SANTAANA\nA107. Mother-in-law of Ruth. ~ NAOMI\nA108. Baseball\'s "Duke." ~ SNIDER\nA109. Senator from New Mexico. ~ ANDERSON\n\nD1. Oregon\'s liberal Senator. ~ MORSE\nD2. Egglike. ~ OVOID\nD3. Cue supports in billiards. ~ RESTS\nD4. ___ bien. ~ TRES\nD5. ___ Saud. ~ IBN\nD6. May\'s lady. ~ MOM\nD7. Dutch scholar. ~ ERASMUS\nD8. He painted "Circus Children." ~ RENOIR\nD9. N. Y. C. Mayoralty candidate, 1950. ~ CORSI\nD10. Samoan seaport. ~ APIA\nD11. Mr. Chaney. ~ LON\nD12. Storehouses for arms. ~ ARSENALS\nD13. Say again. ~ ITERATE\nD14. Lot escaped its ruin. ~ SODOM\nD15. The rudiments. ~ ABC\nD16. Poohs. ~ BAHS\nD17. Asia Minor. ~ ANATOLIA\nD18. Truman\'s labor aide. ~ STEELMAN\nD19. Takes away by a levy: Law. ~ ESTREATS\nD28. One: French. ~ UNE\nD30. Stubborn: Dial. ~ SOT\nD33. Frenzies. ~ RAGES\nD34. Brain passage. ~ ITER\nD35. Jugs. ~ EWERS\nD36. Movie about a cat and baseball. ~ RHUBARB\nD38. Vanishes. ~ MELTS\nD39. Forbidding. ~ STERN\nD41. ___ Bagnold. ~ ENID\nD42. City in the Punjab. ~ AMBALA\nD43. He sang, "I Love a Lassie." ~ LAUDER\nD44. Unter den ___. ~ LINDEN\nD45. Stockyard transient. ~ STEER\nD48. Cannon with a short tube. ~ MORTAR\nD49. A moth. ~ EGGER\nD50. Hesitate. ~ FALTER\nD51. Scopes. ~ AREAS\nD53. Bred. ~ REARED\nD54. Pinky. ~ FINGER\nD56. Warren Spahn, for instance. ~ BRAVE\nD57. River in Spain and Portugal. ~ MINHO\nD58. Kefauver did. ~ PROBED\nD59. A hydrocarbon. ~ RETENE\nD60. Puts pressure. ~ EXERTS\nD62. Part of London. ~ CHELSEA\nD63. "Two on the ___." ~ AISLE\nD67. Former musical comedy star, Nora ___. ~ BAYES\nD68. Head of our strategic bombers. ~ LEMAY\nD69. ___ accompli (thing done). ~ FAIT\nD70. S. African Prime Minister. ~ MALAN\nD71. "One ___." ~ WORLD\nD72. Alabama Democrat. ~ SPARKMAN\nD73. Rise Stevens sings it. ~ HABANERA\nD74. Dramatic text: Music. ~ ORATORIO\nD75. Disease cured by Vitamin B. ~ BERIBERI\nD76. Governor of Pennsylvania. ~ FINE\nD78. Peloponnesos cape. ~ MATAPAN\nD79. Where Harriman went. ~ TEHERAN\nD81. Mole ruit ___ (It falls down of its own bigness). ~ SUA\nD83. ___ Il Sung. ~ KIM\nD84. Wife: Spanish. ~ ESPOSA\nD87. "United States," "America." ~ SHIPS\nD88. Ornamental ensemble. ~ DECOR\nD89. Roman Curia courts. ~ ROTAS\nD90. Soft:  Music. ~ PIANO\nD91. Black: Comb. form. ~ MELAN\nD93. Sandburg\'s forte. ~ POEM\nD95. Docile. ~ TAME\nD96. Old word for tangle. ~ SNAR\nD98. New Haven man. ~ ELI\nD100. Bounder. ~ CAD\nD102. Where Kokomo is: Abbr. ~ IND\nD103. French summer. ~ ETE\n\n';
var author$project$Gen$BundledPuzzles$puzzle7 = 'Title: LA Times, Nov 27, 1924  Tetracruciform (see notepad)\nCopyright: © 1924, The Ball Syndicate, Inc\nDate: 1924-11-27\nNotes: A mystical design combined with everyday words shorter than the name it bears.  Note: Clue headings were "Horizontal" and "Vertical" in this "Cross Word Puzzle".\n\n\n#GROGGY#ASSIGN#\nB#AFAR###ALSO#L\nON#FRET#SLAM#FA\nYAP#BAH#IVY#AIM\nUPAS#TO#DO#ESNE\nNEGUS#USE#OAKEN\nA#EBON#H#ARTS#T\n#####AMORT#####\nA#CAMP#A#EARN#A\nSILLY#ALB#MUIRS\nTRUE#OR#AD#ELIS\nROE#VIM#RIB#EMU\nAN#LILY#BAIT#EM\nL#BANE###RAID#E\n#RECEDE#HYSSOP#\n\n\nA1. Unsteady ~ GROGGY\nA6. Appoint ~ ASSIGN\nA12. Remotely ~ AFAR\nA13. Besides ~ ALSO\nA15. Upon ~ ON\nA17. Worry ~ FRET\nA19. Bang ~ SLAM\nA20. Fourth tone of a musical scale ~ FA\nA21. A bark or yelp ~ YAP\nA23. Pooh ~ BAH\nA24. Climbing plant ~ IVY\nA25. Purpose ~ AIM\nA26. Poisonous sap of Malaysian trees ~ UPAS\nA28. Toward ~ TO\nA29. Perform ~ DO\nA30. Hireling or serf ~ ESNE\nA31. A drink made of wine, water, and lemon-juice, sweetened ~ NEGUS\nA33. Employ ~ USE\nA35. Made of oak ~ OAKEN\nA36. Black ~ EBON\nA38. Practical application of knowledge (plural) ~ ARTS\nA39. Without life ~ AMORT\nA41. Temporary quarters ~ CAMP\nA44. Gain ~ EARN\nA49. Foolish ~ SILLY\nA51. Priest\'s vestment ~ ALB\nA53. Heaths (Scot.) ~ MUIRS\nA55. Faithful ~ TRUE\nA56. Either ~ OR\nA57. Advertisement (abbrevation) ~ AD\nA59. Province of Greece ~ ELIS\nA60. A small deer ~ ROE\nA61. Energy ~ VIM\nA62. Bony rod attached to the spine ~ RIB\nA64. A bird ~ EMU\nA65. One or any ~ AN\nA66. Ornamental plant ~ LILY\nA67. Used to allure a fish ~ BAIT\nA69. Unit of printer\'s measure ~ EM\nA70. Poison ~ BANE\nA71. To invade suddenly ~ RAID\nA73. Desist ~ RECEDE\nA74. Medicinal herb ~ HYSSOP\n\nD2. God of midday sun ~ RA\nD3. Aside from a main track ~ OFF\nD4. Complete dress ~ GARB\nD5. Vast ~ GREAT\nD7. Proviso ~ SALVO\nD8. Put to death ~ SLAY\nD9. Doctrine or system ~ ISM\nD10. Depart ~ GO\nD11. A large serpent of America ~ BOYUNA\nD14. Mourn ~ LAMENT\nD16. Back of the neck ~ NAPE\nD18. Familiar pronoun ~ THOU\nD19. Lateral ~ SIDE\nD20. Elegant ~ FINE\nD22. Male servant ~ PAGE\nD25. Inquiries ~ ASKS\nD27. Total ~ SUB\nD30. Consume ~ EAT\nD32. Therefore ~ SO\nD34. Shallow ~ SHOAL\nD35. Else ~ OR\nD37. Surface of fibers ~ NAP\nD38. Consumed ~ ATE\nD40. Pertaining to stars ~ ASTRAL\nD41. Guide ~ CLUE\nD42. Beverage ~ ALE\nD43. Possessive pronoun ~ MY\nD45. Part of "be" ~ AM\nD46. Grieve ~ RUE\nD47. African river ~ NILE\nD48. Take ~ ASSUME\nD50. Common metal ~ IRON\nD51. Host ~ ARMY\nD52. Sharp point ~ BARB\nD54. Element of poetry ~ RIME\nD56. Anointed ~ OILED\nD58. Record of daily events ~ DIARY\nD61. Slender plant ~ VINE\nD63. Prejudice ~ BIAS\nD66. Resinous substance ~ LAC\nD68. It is ~ TIS\nD70. Happen ~ BE\nD72. Execute ~ DO\n\n';
var author$project$Gen$BundledPuzzles$puzzles = _List_fromArray(
	[author$project$Gen$BundledPuzzles$puzzle0, author$project$Gen$BundledPuzzles$puzzle1, author$project$Gen$BundledPuzzles$puzzle2, author$project$Gen$BundledPuzzles$puzzle3, author$project$Gen$BundledPuzzles$puzzle4, author$project$Gen$BundledPuzzles$puzzle5, author$project$Gen$BundledPuzzles$puzzle6, author$project$Gen$BundledPuzzles$puzzle7]);
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var author$project$BundledPuzzles$puzzles = A2(
	elm$core$List$filterMap,
	elm$core$Basics$identity,
	A2(elm$core$List$indexedMap, author$project$BundledPuzzles$parseBundledPuzzle, author$project$Gen$BundledPuzzles$puzzles));
var author$project$Data$Puzzle$Id$toString = function (_n0) {
	var s = _n0;
	return s;
};
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var author$project$BundledPuzzles$getBundledPuzzleById = function (id) {
	return A2(
		elm$core$Maybe$andThen,
		function (i) {
			return A2(elm_community$list_extra$List$Extra$getAt, i, author$project$BundledPuzzles$puzzles);
		},
		A2(
			elm$core$Maybe$andThen,
			elm$core$String$toInt,
			elm$core$List$head(
				A2(
					elm$core$List$drop,
					1,
					A2(
						elm$core$String$split,
						'_',
						author$project$Data$Puzzle$Id$toString(id))))));
};
var elm$url$Url$Builder$toQueryPair = function (_n0) {
	var key = _n0.a;
	var value = _n0.b;
	return key + ('=' + value);
};
var elm$url$Url$Builder$toQuery = function (parameters) {
	if (!parameters.b) {
		return '';
	} else {
		return '?' + A2(
			elm$core$String$join,
			'&',
			A2(elm$core$List$map, elm$url$Url$Builder$toQueryPair, parameters));
	}
};
var elm$url$Url$Builder$crossOrigin = F3(
	function (prePath, pathSegments, parameters) {
		return prePath + ('/' + (A2(elm$core$String$join, '/', pathSegments) + elm$url$Url$Builder$toQuery(parameters)));
	});
var author$project$Http$Api$makeUrl = function (env) {
	if (!env) {
		return elm$url$Url$Builder$crossOrigin('http://localhost:8080');
	} else {
		return elm$url$Url$Builder$crossOrigin('https://api.xword.games');
	}
};
var author$project$Http$Puzzle$HttpError = function (a) {
	return {$: 0, a: a};
};
var author$project$Http$Puzzle$ParseError = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var elm$http$Http$NetworkError_ = {$: 2};
var elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$Timeout_ = {$: 1};
var elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			elm$core$Basics$identity,
			A2(elm$core$Basics$composeR, toResult, toMsg));
	});
var elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$NetworkError = {$: 2};
var elm$http$Http$Timeout = {$: 1};
var elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadUrl(url));
			case 1:
				return elm$core$Result$Err(elm$http$Http$Timeout);
			case 2:
				return elm$core$Result$Err(elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return elm$core$Result$Err(
					elm$http$Http$BadStatus(metadata.c6));
			default:
				var body = response.b;
				return A2(
					elm$core$Result$mapError,
					elm$http$Http$BadBody,
					toResult(body));
		}
	});
var elm$http$Http$expectString = function (toMsg) {
	return A2(
		elm$http$Http$expectStringResponse,
		toMsg,
		elm$http$Http$resolve(elm$core$Result$Ok));
};
var elm$http$Http$emptyBody = _Http_emptyBody;
var elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$http$Http$State = F2(
	function (reqs, subs) {
		return {cV: reqs, c9: subs};
	});
var elm$http$Http$init = elm$core$Task$succeed(
	A2(elm$http$Http$State, elm$core$Dict$empty, _List_Nil));
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Process$kill = _Scheduler_kill;
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _n2 = A2(elm$core$Dict$get, tracker, reqs);
					if (_n2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _n2.a;
						return A2(
							elm$core$Task$andThen,
							function (_n3) {
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2(elm$core$Dict$remove, tracker, reqs));
							},
							elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						elm$core$Task$andThen,
						function (pid) {
							var _n4 = req.O;
							if (_n4.$ === 1) {
								return A3(elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _n4.a;
								return A3(
									elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3(elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			elm$core$Task$andThen,
			function (reqs) {
				return elm$core$Task$succeed(
					A2(elm$http$Http$State, reqs, subs));
			},
			A3(elm$http$Http$updateReqs, router, cmds, state.cV));
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _n0) {
		var actualTracker = _n0.a;
		var toMsg = _n0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? elm$core$Maybe$Just(
			A2(
				elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : elm$core$Maybe$Nothing;
	});
var elm$http$Http$onSelfMsg = F3(
	function (router, _n0, state) {
		var tracker = _n0.a;
		var progress = _n0.b;
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$filterMap,
					A3(elm$http$Http$maybeSend, router, tracker, progress),
					state.c9)));
	});
var elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return elm$http$Http$Request(
				{
					aw: r.aw,
					b7: r.b7,
					cj: A2(_Http_mapExpect, func, r.cj),
					B: r.B,
					H: r.H,
					J: r.J,
					O: r.O,
					df: r.df
				});
		}
	});
var elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$http$Http$subMap = F2(
	function (func, _n0) {
		var tracker = _n0.a;
		var toMsg = _n0.b;
		return A2(
			elm$http$Http$MySub,
			tracker,
			A2(elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager(elm$http$Http$init, elm$http$Http$onEffects, elm$http$Http$onSelfMsg, elm$http$Http$cmdMap, elm$http$Http$subMap);
var elm$http$Http$command = _Platform_leaf('Http');
var elm$http$Http$subscription = _Platform_leaf('Http');
var elm$http$Http$request = function (r) {
	return elm$http$Http$command(
		elm$http$Http$Request(
			{aw: false, b7: r.b7, cj: r.cj, B: r.B, H: r.H, J: r.J, O: r.O, df: r.df}));
};
var elm$http$Http$get = function (r) {
	return elm$http$Http$request(
		{b7: elm$http$Http$emptyBody, cj: r.cj, B: _List_Nil, H: 'GET', J: elm$core$Maybe$Nothing, O: elm$core$Maybe$Nothing, df: r.df});
};
var author$project$Http$Puzzle$get = F3(
	function (env, toMsg, puzzleId) {
		var parse = function (puzzleStr) {
			return A2(author$project$Puzzle$Format$Xd$parse, puzzleId, puzzleStr);
		};
		return elm$http$Http$get(
			{
				cj: elm$http$Http$expectString(
					A2(
						elm$core$Basics$composeR,
						elm$core$Result$mapError(author$project$Http$Puzzle$HttpError),
						A2(
							elm$core$Basics$composeR,
							elm$core$Result$andThen(
								A2(
									elm$core$Basics$composeR,
									parse,
									elm$core$Result$mapError(author$project$Http$Puzzle$ParseError))),
							toMsg))),
				df: A3(
					author$project$Http$Api$makeUrl,
					env,
					_List_fromArray(
						[
							'puzzles',
							author$project$Data$Puzzle$Id$toString(puzzleId)
						]),
					_List_Nil)
			});
	});
var author$project$Page$Game$GotPuzzle = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var author$project$Page$Game$Loading = {$: 0};
var author$project$Page$Game$NoOp = {$: 15};
var author$project$Page$Game$Error = {$: 4};
var author$project$Page$Game$Initialized = function (a) {
	return {$: 1, a: a};
};
var author$project$Page$Game$InitializedState = function (puzzle) {
	return {i: puzzle};
};
var author$project$Page$Game$parsePuzzle = F2(
	function (id, input) {
		return A2(author$project$Puzzle$Format$Xd$parse, id, input);
	});
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var author$project$Page$Game$loadGame = function (id) {
	return A2(
		elm$core$Basics$composeR,
		author$project$Page$Game$parsePuzzle(id),
		A2(
			elm$core$Basics$composeR,
			elm$core$Result$map(
				A2(elm$core$Basics$composeR, author$project$Page$Game$InitializedState, author$project$Page$Game$Initialized)),
			elm$core$Result$withDefault(author$project$Page$Game$Error)));
};
var author$project$SamplePuzzle$id = author$project$Data$Puzzle$Id$fromString('sample');
var author$project$SamplePuzzle$puzzle = 'Title: New York Times, Thursday, January 12, 1961\nAuthor: Unknown\nEditor: Margaret Farrar\nDate: 1961-01-12\n\n\nRIPS#JOURS#FLEW\nOXEN#EASEL#LEDA\nAIRE#TRAVOLATOR\nRACERS##EPITOME\n##OZO#HERES####\nTELETHONS#LAPAZ\nOLA#EAST#HELENA\nMETE#VERGE#PRIX\nEMERGE#EARS#FOE\nSEDGE#MARATHONS\n####CRATE#IOR##\nALASKAN##ARMADA\nSYNCOPATOR#ATOP\nIONA#INAIR#GENS\nANON#DAILY#EDGE\n\n\nA1. Saws (wood) along the grain. ~ RIPS\nA5. Tous les ___ (every day): Fr. ~ JOURS\nA10. Went swiftly. ~ FLEW\nA14. Farm animals. ~ OXEN\nA15. Picture support. ~ EASEL\nA16. Mother of Helen of Troy. ~ LEDA\nA17. River in Yorkshire. ~ AIRE\nA18. London subway\'s moving sidewalk. ~ TRAVOLATOR\nA20. American black snakes. ~ RACERS\nA22. Compendium. ~ EPITOME\nA23. Combining form for a blue gas. ~ OZO\nA24. Start of a toast. ~ HERES\nA26. Endurance broadcasts. ~ TELETHONS\nA29. One of Bolivia\'s capitals. ~ LAPAZ\nA34. Wave: Span. ~ OLA\nA35. Compass point. ~ EAST\nA36. Capital of Montana. ~ HELENA\nA37. Measure out. ~ METE\nA39. Margin. ~ VERGE\nA41. ___ Goncourt, literary award. ~ PRIX\nA42. Come forth. ~ EMERGE\nA44. Auricles. ~ EARS\nA46. Antagonist. ~ FOE\nA47. Marsh plant. ~ SEDGE\nA48. Olympics events. ~ MARATHONS\nA50. Container. ~ CRATE\nA52. Suffix forming a comparative ending. ~ IOR\nA53. Native of Nome. ~ ALASKAN\nA57. Fleet of military planes. ~ ARMADA\nA60. Jazz addict. ~ SYNCOPATOR\nA63. At the summit. ~ ATOP\nA64. Hebrides island. ~ IONA\nA65. "Bombs bursting ___ . . . " ~ INAIR\nA66. Army men: Abbr. ~ GENS\nA67. Presently. ~ ANON\nA68. Type of newspaper. ~ DAILY\nA69. Sharpness. ~ EDGE\n\nD1. Loud, rumbling sound. ~ ROAR\nD2. South African iris. ~ IXIA\nD3. Filtered. ~ PERCOLATED\nD4. Nasal sound. ~ SNEEZE\nD5. Planes. ~ JETS\nD6. Sweep. ~ OAR\nD7. Army monogram. ~ USA\nD8. Lapels. ~ REVERS\nD9. Hillside. ~ SLOPE\nD10. Level. ~ FLAT\nD11. Mother of Apollo. ~ LETO\nD12. Name given to Esau. ~ EDOM\nD13. Old-time word of caution. ~ WARE\nD19. Linen or cotton thread. ~ LISLE\nD21. Repetition. ~ ROTE\nD24. Socks. ~ HOSE\nD25. Beseech. ~ ENTREAT\nD26. Weighty volumes. ~ TOMES\nD27. Smyrna fig. ~ ELEME\nD28. Engage in. ~ HAVE\nD30. High peak. ~ ALP\nD31. Punctured. ~ PERFORATED\nD32. Negatively charged atom. ~ ANION\nD33. Slate axes. ~ ZAXES\nD36. Queen of Olympus. ~ HERA\nD38. Unit of physical energy. ~ ERG\nD40. Depot: Fr. ~ GARE\nD43. Small lizard. ~ GECKO\nD45. Set in motion. ~ STIR\nD48. Tomorrow: Span. ~ MANANA\nD49. Deference. ~ HOMAGE\nD51. Done with speed. ~ RAPID\nD53. Global area. ~ ASIA\nD54. French city on the Rhone. ~ LYON\nD55. Part of A.D. ~ ANNO\nD56. Scrutinize. ~ SCAN\nD57. \'Arriet\'s friend. ~ ARRY\nD58. Bell sound. ~ DONG\nD59. Vaulted part of a church. ~ APSE\nD61. Indo-Chinese. ~ TAI\nD62. Fuel. ~ OIL\n\n';
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cn: fragment, cr: host, eB: path, cL: port_, cR: protocol, cS: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$focus = _Browser_call('focus');
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			A2(
				elm$core$Task$onError,
				A2(
					elm$core$Basics$composeL,
					A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
					elm$core$Result$Err),
				A2(
					elm$core$Task$andThen,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Ok),
					task)));
	});
var author$project$Page$Game$init = F2(
	function (session, puzzleId) {
		return _Utils_Tuple2(
			{
				am: function () {
					if (!puzzleId.$) {
						return author$project$Page$Game$Loading;
					} else {
						return A2(author$project$Page$Game$loadGame, author$project$SamplePuzzle$id, author$project$SamplePuzzle$puzzle);
					}
				}()
			},
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2(
						elm$core$Task$attempt,
						function (_n1) {
							return author$project$Page$Game$NoOp;
						},
						elm$browser$Browser$Dom$focus('game-grid')),
						function () {
						if (!puzzleId.$) {
							var id = puzzleId.a;
							var _n3 = author$project$BundledPuzzles$getBundledPuzzleById(id);
							if (!_n3.$) {
								var bundledPuzzle = _n3.a;
								return A2(
									elm$core$Task$perform,
									author$project$Page$Game$GotPuzzle(id),
									elm$core$Task$succeed(
										elm$core$Result$Ok(bundledPuzzle)));
							} else {
								return A3(
									author$project$Http$Puzzle$get,
									session.dN,
									author$project$Page$Game$GotPuzzle(id),
									id);
							}
						} else {
							return elm$core$Platform$Cmd$none;
						}
					}()
					])));
	});
var author$project$Data$Loadable$Loading = {$: 0};
var author$project$Http$Puzzle$errorify = function (resultFromX) {
	return function (httpResult) {
		return resultFromX(
			A2(elm$core$Result$mapError, author$project$Http$Puzzle$HttpError, httpResult));
	};
};
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$string = _Json_decodeString;
var elm_community$result_extra$Result$Extra$unpack = F3(
	function (errFunc, okFunc, result) {
		if (!result.$) {
			var ok = result.a;
			return okFunc(ok);
		} else {
			var err = result.a;
			return errFunc(err);
		}
	});
var author$project$Http$Puzzle$parserToDecoder = function (parser) {
	return A2(
		elm$json$Json$Decode$andThen,
		A2(elm_community$result_extra$Result$Extra$unpack, elm$json$Json$Decode$fail, elm$json$Json$Decode$succeed),
		A2(
			elm$json$Json$Decode$map,
			elm$core$Result$mapError(
				elm$core$Basics$always('Failed to parse puzzle!')),
			A2(
				elm$json$Json$Decode$map,
				function (x) {
					return A2(elm$parser$Parser$run, parser, x + '\n');
				},
				elm$json$Json$Decode$string)));
};
var elm$json$Json$Decode$field = _Json_decodeField;
var author$project$Http$Puzzle$puzzleDecoder = function () {
	var decodePuzzle = function (id) {
		return A2(
			elm$json$Json$Decode$field,
			'puzzle',
			author$project$Http$Puzzle$parserToDecoder(
				author$project$Puzzle$Format$Xd$puzzle(
					author$project$Data$Puzzle$Id$fromString(id))));
	};
	var decodeId = A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$string);
	return A2(elm$json$Json$Decode$andThen, decodePuzzle, decodeId);
}();
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			elm$http$Http$expectStringResponse,
			toMsg,
			elm$http$Http$resolve(
				function (string) {
					return A2(
						elm$core$Result$mapError,
						elm$json$Json$Decode$errorToString,
						A2(elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$url$Url$percentEncode = _Url_percentEncode;
var elm$url$Url$Builder$QueryParameter = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$url$Url$Builder$int = F2(
	function (key, value) {
		return A2(
			elm$url$Url$Builder$QueryParameter,
			elm$url$Url$percentEncode(key),
			elm$core$String$fromInt(value));
	});
var author$project$Http$Puzzle$random = F3(
	function (env, toMsg, howMany) {
		return elm$http$Http$get(
			{
				cj: A2(
					elm$http$Http$expectJson,
					author$project$Http$Puzzle$errorify(toMsg),
					elm$json$Json$Decode$list(author$project$Http$Puzzle$puzzleDecoder)),
				df: A3(
					author$project$Http$Api$makeUrl,
					env,
					_List_fromArray(
						['puzzles']),
					_List_fromArray(
						[
							A2(elm$url$Url$Builder$int, 'n', howMany)
						]))
			});
	});
var author$project$Page$Home$GotRandomPuzzles = function (a) {
	return {$: 0, a: a};
};
var author$project$Page$Home$init = function (session) {
	return _Utils_Tuple2(
		{bv: author$project$Data$Loadable$Loading},
		A3(author$project$Http$Puzzle$random, session.dN, author$project$Page$Home$GotRandomPuzzles, 8));
};
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Main$changeRouteTo = F2(
	function (maybeRoute, model) {
		var session = author$project$Main$toSession(model);
		var doInit = F3(
			function (toModel, _n4, toMsg) {
				var subModel = _n4.a;
				var subCmd = _n4.b;
				return _Utils_Tuple2(
					toModel(subModel),
					A2(elm$core$Platform$Cmd$map, toMsg, subCmd));
			});
		var _n0 = function () {
			if (maybeRoute.$ === 1) {
				return _Utils_Tuple2(author$project$Main$NotFound, elm$core$Platform$Cmd$none);
			} else {
				switch (maybeRoute.a.$) {
					case 0:
						var _n2 = maybeRoute.a;
						return A3(
							doInit,
							author$project$Main$Home,
							author$project$Page$Home$init(session),
							author$project$Main$GotHomeMsg);
					case 1:
						var gameId = maybeRoute.a.a;
						return A3(
							doInit,
							author$project$Main$Game,
							A2(author$project$Page$Game$init, session, gameId),
							author$project$Main$GotGameMsg);
					default:
						var _n3 = maybeRoute.a;
						return A3(
							doInit,
							author$project$Main$About,
							author$project$Page$About$init(session),
							author$project$Main$GotAboutMsg);
				}
			}
		}();
		var pageModel = _n0.a;
		var cmd = _n0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{aq: pageModel}),
			cmd);
	});
var author$project$Route$About = {$: 2};
var author$project$Route$Game = function (a) {
	return {$: 1, a: a};
};
var author$project$Route$Home = {$: 0};
var elm$url$Url$Parser$Parser = elm$core$Basics$identity;
var elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {al: frag, ar: params, ai: unvisited, X: value, av: visited};
	});
var elm$url$Url$Parser$mapState = F2(
	function (func, _n0) {
		var visited = _n0.av;
		var unvisited = _n0.ai;
		var params = _n0.ar;
		var frag = _n0.al;
		var value = _n0.X;
		return A5(
			elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var elm$url$Url$Parser$map = F2(
	function (subValue, _n0) {
		var parseArg = _n0;
		return function (_n1) {
			var visited = _n1.av;
			var unvisited = _n1.ai;
			var params = _n1.ar;
			var frag = _n1.al;
			var value = _n1.X;
			return A2(
				elm$core$List$map,
				elm$url$Url$Parser$mapState(value),
				parseArg(
					A5(elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			elm$core$List$concatMap,
			function (_n0) {
				var parser = _n0;
				return parser(state);
			},
			parsers);
	};
};
var elm$url$Url$Parser$s = function (str) {
	return function (_n0) {
		var visited = _n0.av;
		var unvisited = _n0.ai;
		var params = _n0.ar;
		var frag = _n0.al;
		var value = _n0.X;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					elm$url$Url$Parser$State,
					A2(elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var elm$url$Url$Parser$slash = F2(
	function (_n0, _n1) {
		var parseBefore = _n0;
		var parseAfter = _n1;
		return function (state) {
			return A2(
				elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var elm$url$Url$Parser$custom = F2(
	function (tipe, stringToSomething) {
		return function (_n0) {
			var visited = _n0.av;
			var unvisited = _n0.ai;
			var params = _n0.ar;
			var frag = _n0.al;
			var value = _n0.X;
			if (!unvisited.b) {
				return _List_Nil;
			} else {
				var next = unvisited.a;
				var rest = unvisited.b;
				var _n2 = stringToSomething(next);
				if (!_n2.$) {
					var nextValue = _n2.a;
					return _List_fromArray(
						[
							A5(
							elm$url$Url$Parser$State,
							A2(elm$core$List$cons, next, visited),
							rest,
							params,
							frag,
							value(nextValue))
						]);
				} else {
					return _List_Nil;
				}
			}
		};
	});
var elm$url$Url$Parser$string = A2(elm$url$Url$Parser$custom, 'STRING', elm$core$Maybe$Just);
var elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var author$project$Route$parser = elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(elm$url$Url$Parser$map, author$project$Route$Home, elm$url$Url$Parser$top),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Game,
			A2(
				elm$url$Url$Parser$slash,
				elm$url$Url$Parser$s('game'),
				A2(
					elm$url$Url$Parser$map,
					A2(elm$core$Basics$composeL, elm$core$Maybe$Just, author$project$Data$Puzzle$Id$fromString),
					elm$url$Url$Parser$string))),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$Game(elm$core$Maybe$Nothing),
			elm$url$Url$Parser$s('game')),
			A2(
			elm$url$Url$Parser$map,
			author$project$Route$About,
			elm$url$Url$Parser$s('about'))
		]));
var elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _n1 = state.ai;
			if (!_n1.b) {
				return elm$core$Maybe$Just(state.X);
			} else {
				if ((_n1.a === '') && (!_n1.b.b)) {
					return elm$core$Maybe$Just(state.X);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				elm$core$List$cons,
				segment,
				elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var elm$url$Url$Parser$preparePath = function (path) {
	var _n0 = A2(elm$core$String$split, '/', path);
	if (_n0.b && (_n0.a === '')) {
		var segments = _n0.b;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _n0;
		return elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var elm$url$Url$percentDecode = _Url_percentDecode;
var elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return elm$core$Maybe$Just(
				A2(elm$core$List$cons, value, list));
		}
	});
var elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _n0 = A2(elm$core$String$split, '=', segment);
		if ((_n0.b && _n0.b.b) && (!_n0.b.b.b)) {
			var rawKey = _n0.a;
			var _n1 = _n0.b;
			var rawValue = _n1.a;
			var _n2 = elm$url$Url$percentDecode(rawKey);
			if (_n2.$ === 1) {
				return dict;
			} else {
				var key = _n2.a;
				var _n3 = elm$url$Url$percentDecode(rawValue);
				if (_n3.$ === 1) {
					return dict;
				} else {
					var value = _n3.a;
					return A3(
						elm$core$Dict$update,
						key,
						elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			elm$core$List$foldr,
			elm$url$Url$Parser$addParam,
			elm$core$Dict$empty,
			A2(elm$core$String$split, '&', qry));
	}
};
var elm$url$Url$Parser$parse = F2(
	function (_n0, url) {
		var parser = _n0;
		return elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					elm$url$Url$Parser$State,
					_List_Nil,
					elm$url$Url$Parser$preparePath(url.eB),
					elm$url$Url$Parser$prepareQuery(url.cS),
					url.cn,
					elm$core$Basics$identity)));
	});
var author$project$Route$fromUrl = function (url) {
	return A2(
		elm$url$Url$Parser$parse,
		author$project$Route$parser,
		_Utils_update(
			url,
			{
				cn: elm$core$Maybe$Nothing,
				eB: A2(elm$core$Maybe$withDefault, '', url.cn)
			}));
};
var author$project$Data$Env$Dev = 0;
var author$project$Data$Env$Prod = 1;
var elm$json$Json$Decode$bool = _Json_decodeBool;
var author$project$Data$Env$decode = A2(
	elm$json$Json$Decode$map,
	function (isProd) {
		return isProd ? 1 : 0;
	},
	elm$json$Json$Decode$bool);
var elm$json$Json$Decode$decodeValue = _Json_run;
var author$project$Session$init = F2(
	function (key, flags) {
		return {
			dN: A2(
				elm$core$Result$withDefault,
				0,
				A2(
					elm$json$Json$Decode$decodeValue,
					A2(elm$json$Json$Decode$field, 'isProd', author$project$Data$Env$decode),
					flags)),
			d6: true,
			bL: key,
			cN: A2(
				elm$core$Result$withDefault,
				false,
				A2(
					elm$json$Json$Decode$decodeValue,
					A2(elm$json$Json$Decode$field, 'isProbablyMobile', elm$json$Json$Decode$bool),
					flags))
		};
	});
var author$project$Main$init = F3(
	function (flags, url, navKey) {
		return A2(
			author$project$Main$changeRouteTo,
			author$project$Route$fromUrl(url),
			{
				aq: author$project$Main$Redirect,
				ag: A2(author$project$Session$init, navKey, flags)
			});
	});
var author$project$Page$Game$OnKeyPress = function (a) {
	return {$: 5, a: a};
};
var author$project$Page$Game$TimerTick = {$: 3};
var author$project$Data$Board$Backward = 1;
var author$project$Data$Board$Forward = 0;
var author$project$Data$Grid$Down = 1;
var author$project$Data$Grid$Left = 2;
var author$project$Data$Grid$Right = 3;
var author$project$Data$Grid$Up = 0;
var author$project$Page$Game$ArrowKey = function (a) {
	return {$: 0, a: a};
};
var author$project$Page$Game$CycleSelectedClueKey = function (a) {
	return {$: 3, a: a};
};
var author$project$Page$Game$DeleteKey = {$: 2};
var author$project$Page$Game$LetterKey = function (a) {
	return {$: 1, a: a};
};
var author$project$Page$Game$OtherKey = {$: 6};
var author$project$Page$Game$RedoKey = {$: 5};
var author$project$Page$Game$UndoKey = {$: 4};
var elm$core$Char$fromCode = _Char_fromCode;
var author$project$Page$Game$keyCodeToKeyEvent = F3(
	function (code, meta, shiftKey) {
		switch (code) {
			case 37:
				return author$project$Page$Game$ArrowKey(2);
			case 39:
				return author$project$Page$Game$ArrowKey(3);
			case 38:
				return author$project$Page$Game$ArrowKey(0);
			case 40:
				return author$project$Page$Game$ArrowKey(1);
			case 8:
				return author$project$Page$Game$DeleteKey;
			default:
				return (meta && (code === 90)) ? (shiftKey ? author$project$Page$Game$RedoKey : author$project$Page$Game$UndoKey) : ((((64 <= code) && (code <= 90)) || (code === 32)) ? author$project$Page$Game$LetterKey(
					elm$core$Char$fromCode(code)) : (((code === 9) || (code === 13)) ? (shiftKey ? author$project$Page$Game$CycleSelectedClueKey(1) : author$project$Page$Game$CycleSelectedClueKey(0)) : author$project$Page$Game$OtherKey));
		}
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$json$Json$Decode$map3 = _Json_map3;
var author$project$Page$Game$keyDecoder = A4(
	elm$json$Json$Decode$map3,
	author$project$Page$Game$keyCodeToKeyEvent,
	A2(elm$json$Json$Decode$field, 'keyCode', elm$json$Json$Decode$int),
	A2(elm$json$Json$Decode$field, 'metaKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'shiftKey', elm$json$Json$Decode$bool));
var elm$browser$Browser$Events$Document = 0;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {cK: pids, c9: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {ci: event, d2: key};
	});
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.cK,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.d2;
		var event = _n0.ci;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.c9);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onKeyDown = A2(elm$browser$Browser$Events$on, 0, 'keydown');
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {cQ: processes, da: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 1) {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.cQ;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.da);
		if (_n0.$ === 1) {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var author$project$Page$Game$subscriptions = function (model) {
	var _n0 = model.am;
	switch (_n0.$) {
		case 2:
			return elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						elm$browser$Browser$Events$onKeyDown(
						A2(elm$json$Json$Decode$map, author$project$Page$Game$OnKeyPress, author$project$Page$Game$keyDecoder)),
						A2(
						elm$time$Time$every,
						1000,
						elm$core$Basics$always(author$project$Page$Game$TimerTick))
					]));
		case 3:
			return elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						elm$browser$Browser$Events$onKeyDown(
						A2(elm$json$Json$Decode$map, author$project$Page$Game$OnKeyPress, author$project$Page$Game$keyDecoder))
					]));
		default:
			return elm$core$Platform$Sub$none;
	}
};
var elm$core$Platform$Sub$map = _Platform_map;
var author$project$Main$subscriptions = function (model) {
	var _n0 = model.aq;
	if (_n0.$ === 3) {
		var subModel = _n0.a;
		return A2(
			elm$core$Platform$Sub$map,
			author$project$Main$GotGameMsg,
			author$project$Page$Game$subscriptions(subModel));
	} else {
		return elm$core$Platform$Sub$none;
	}
};
var author$project$Main$updateWith = F4(
	function (originalModel, toModel, toMsg, _n0) {
		var subModel = _n0.a;
		var subCmd = _n0.b;
		return _Utils_Tuple2(
			_Utils_update(
				originalModel,
				{
					aq: toModel(subModel)
				}),
			A2(elm$core$Platform$Cmd$map, toMsg, subCmd));
	});
var author$project$Page$About$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Page$Game$Model = function (game) {
	return {am: game};
};
var author$project$Page$Game$OnFileRead = function (a) {
	return {$: 1, a: a};
};
var author$project$Data$Puzzle$getMatchingClueId = F2(
	function (direction, clues) {
		if (!clues.$) {
			var clueId = clues.a;
			return _Utils_eq(direction, clueId.z) ? elm$core$Maybe$Just(clueId) : elm$core$Maybe$Nothing;
		} else {
			var clueIdOne = clues.a;
			var clueIdTwo = clues.b;
			return _Utils_eq(direction, clueIdOne.z) ? elm$core$Maybe$Just(clueIdOne) : (_Utils_eq(direction, clueIdTwo.z) ? elm$core$Maybe$Just(clueIdTwo) : elm$core$Maybe$Nothing);
		}
	});
var author$project$Data$Board$selectedClueId = F2(
	function (puzzle, board) {
		return A2(
			elm$core$Maybe$andThen,
			author$project$Data$Puzzle$getMatchingClueId(board.M.z),
			A2(
				elm$core$Dict$get,
				A2(author$project$Data$Grid$pointToIndex, board.M.P, puzzle.m),
				puzzle.bd));
	});
var author$project$Data$Grid$height = function (_n0) {
	var grid = _n0;
	return grid.Q;
};
var author$project$Data$Grid$width = function (_n0) {
	var grid = _n0;
	return grid.w;
};
var author$project$Data$Point$x = function (point) {
	return point.a;
};
var author$project$Data$Point$y = function (point) {
	return point.b;
};
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var author$project$Data$Point$clamp = F3(
	function (min, max, point) {
		return _Utils_Tuple2(
			A3(
				elm$core$Basics$clamp,
				author$project$Data$Point$x(min),
				author$project$Data$Point$x(max),
				author$project$Data$Point$x(point)),
			A3(
				elm$core$Basics$clamp,
				author$project$Data$Point$y(min),
				author$project$Data$Point$y(max),
				author$project$Data$Point$y(point)));
	});
var author$project$Data$Board$updateSelection = F3(
	function (point, direction, board) {
		return _Utils_update(
			board,
			{
				M: {
					P: A3(
						author$project$Data$Point$clamp,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(
							author$project$Data$Grid$width(board.m) - 1,
							author$project$Data$Grid$height(board.m) - 1),
						point),
					z: direction
				}
			});
	});
var author$project$Data$Direction$swap = function (dir) {
	if (!dir) {
		return 1;
	} else {
		return 0;
	}
};
var author$project$Data$Puzzle$wordStartMatchesDirection = F2(
	function (word, dir) {
		var _n0 = _Utils_Tuple2(word, dir);
		_n0$4:
		while (true) {
			if (!_n0.b) {
				switch (_n0.a) {
					case 0:
						var _n1 = _n0.a;
						var _n2 = _n0.b;
						return true;
					case 2:
						var _n5 = _n0.a;
						var _n6 = _n0.b;
						return true;
					default:
						break _n0$4;
				}
			} else {
				switch (_n0.a) {
					case 1:
						var _n3 = _n0.a;
						var _n4 = _n0.b;
						return true;
					case 2:
						var _n7 = _n0.a;
						var _n8 = _n0.b;
						return true;
					default:
						break _n0$4;
				}
			}
		}
		return false;
	});
var elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var author$project$Data$Board$cycleSelectedClue = F3(
	function (direction, puzzle, board) {
		var wordStarts = function () {
			if (!direction) {
				return puzzle.bY;
			} else {
				return elm$core$List$reverse(puzzle.bY);
			}
		}();
		var selection = board.M;
		var selectedWordStart = function () {
			var _n4 = A2(author$project$Data$Board$selectedClueId, puzzle, board);
			if (!_n4.$) {
				var clueId = _n4.a;
				return A2(
					elm_community$list_extra$List$Extra$find,
					function (ws) {
						return _Utils_eq(ws.dy, clueId.en);
					},
					puzzle.bY);
			} else {
				return elm$core$Maybe$Nothing;
			}
		}();
		var comparator = function () {
			if (!direction) {
				return elm$core$Basics$gt;
			} else {
				return elm$core$Basics$lt;
			}
		}();
		var isNextWord = function (word) {
			if (!selectedWordStart.$) {
				var wordStart = selectedWordStart.a;
				var wordIndex = A2(author$project$Data$Grid$pointToIndex, word.br, board.m);
				var selectionStartIndex = A2(author$project$Data$Grid$pointToIndex, wordStart.br, board.m);
				return A2(author$project$Data$Puzzle$wordStartMatchesDirection, word.z, selection.z) && A2(comparator, wordIndex, selectionStartIndex);
			} else {
				return false;
			}
		};
		var nextMatchingWordStart = A2(elm_community$list_extra$List$Extra$find, isNextWord, wordStarts);
		if (!nextMatchingWordStart.$) {
			var word = nextMatchingWordStart.a;
			return A3(author$project$Data$Board$updateSelection, word.br, selection.z, board);
		} else {
			var flippedDir = author$project$Data$Direction$swap(selection.z);
			var firstDifferentWordStart = A2(
				elm_community$list_extra$List$Extra$find,
				function (word) {
					return A2(author$project$Data$Puzzle$wordStartMatchesDirection, word.z, flippedDir);
				},
				wordStarts);
			if (!firstDifferentWordStart.$) {
				var word = firstDifferentWordStart.a;
				return A3(author$project$Data$Board$updateSelection, word.br, flippedDir, board);
			} else {
				return board;
			}
		}
	});
var author$project$Data$Board$isPartOfWord = F3(
	function (clue, point, puzzle) {
		var _n0 = A2(
			elm$core$Dict$get,
			A2(author$project$Data$Grid$pointToIndex, point, puzzle.m),
			puzzle.bd);
		if (!_n0.$) {
			if (!_n0.a.$) {
				var clueId = _n0.a.a;
				return _Utils_eq(clue.bh, clueId);
			} else {
				var _n1 = _n0.a;
				var id1 = _n1.a;
				var id2 = _n1.b;
				return _Utils_eq(clue.bh, id1) || _Utils_eq(clue.bh, id2);
			}
		} else {
			return false;
		}
	});
var author$project$Data$Board$moveSelectionToWord = F3(
	function (clue, puzzle, board) {
		var fn = F2(
			function (_n0, acc) {
				var point = _n0.a;
				return A3(author$project$Data$Board$isPartOfWord, clue, point, puzzle) ? A2(elm$core$List$cons, point, acc) : acc;
			});
		return A2(
			elm$core$Maybe$withDefault,
			board,
			A2(
				elm$core$Maybe$map,
				function (point) {
					return A3(author$project$Data$Board$updateSelection, point, clue.bh.z, board);
				},
				elm$core$List$head(
					elm$core$List$reverse(
						A3(author$project$Data$Grid$foldlIndexed, fn, _List_Nil, puzzle.m)))));
	});
var author$project$Page$Game$Ended = function (a) {
	return {$: 3, a: a};
};
var elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$findIndex = elm_community$list_extra$List$Extra$findIndexHelp(0);
var author$project$Data$Grid$findIndex = F2(
	function (fn, _n0) {
		var grid = _n0;
		return A2(
			elm_community$list_extra$List$Extra$findIndex,
			fn,
			elm$core$Array$toList(grid.x));
	});
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var author$project$Data$Grid$map = F2(
	function (fn, _n0) {
		var grid = _n0;
		return {
			x: A2(elm$core$Array$map, fn, grid.x),
			Q: grid.Q,
			w: grid.w
		};
	});
var elm$core$Basics$neq = _Utils_notEqual;
var author$project$Data$Board$fromPuzzle = function (_n0) {
	var grid = _n0.m;
	var notShaded = A2(
		elm$core$Basics$composeR,
		elm$core$Maybe$map(
			function (cell_) {
				return !_Utils_eq(cell_, author$project$Data$Puzzle$Shaded);
			}),
		elm$core$Maybe$withDefault(true));
	var firstNonShaded = A2(
		elm$core$Maybe$withDefault,
		0,
		A2(author$project$Data$Grid$findIndex, notShaded, grid));
	var startSelection = A2(author$project$Data$Grid$indexToPoint, firstNonShaded, grid);
	return {
		m: A2(
			author$project$Data$Grid$map,
			function (cell) {
				if (!cell.$) {
					if (!cell.a.$) {
						var _n2 = cell.a;
						return elm$core$Maybe$Just(author$project$Data$Puzzle$Shaded);
					} else {
						return elm$core$Maybe$Just(
							author$project$Data$Puzzle$Letter(' '));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			},
			grid),
		M: {P: startSelection, z: 0}
	};
};
var author$project$Page$Game$InProgress = function (a) {
	return {$: 2, a: a};
};
var author$project$View$Board$initTransform = {cu: 1, bm: 0, bn: 0, eJ: 1};
var author$project$View$Keyboard$State = function (touchedKeys) {
	return {bA: touchedKeys};
};
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var author$project$View$Keyboard$init = author$project$View$Keyboard$State(elm$core$Set$empty);
var elm_community$undo_redo$UndoList$UndoList = F3(
	function (past, present, future) {
		return {s: future, p: past, cM: present};
	});
var elm_community$undo_redo$UndoList$fresh = function (state) {
	return A3(elm_community$undo_redo$UndoList$UndoList, _List_Nil, state, _List_Nil);
};
var author$project$Page$Game$freshInProgress = function (puzzle) {
	var freshBoard = author$project$Data$Board$fromPuzzle(puzzle);
	return author$project$Page$Game$InProgress(
		{
			f: freshBoard,
			L: author$project$View$Board$initTransform,
			aX: author$project$View$Keyboard$init,
			i: puzzle,
			N: 0,
			ah: elm_community$undo_redo$UndoList$fresh(freshBoard)
		});
};
var author$project$Page$Game$onUpdatePan = F2(
	function (record, ev) {
		var boardTransform = record.L;
		return _Utils_update(
			record,
			{
				L: _Utils_update(
					boardTransform,
					{bm: boardTransform.bm + ev.dg, bn: boardTransform.bn + ev.dh})
			});
	});
var author$project$Page$Game$onUpdateZoom = F2(
	function (record, ev) {
		var boardTransform = record.L;
		var initScale = ev.d0 ? boardTransform.eJ : boardTransform.cu;
		return _Utils_update(
			record,
			{
				L: _Utils_update(
					boardTransform,
					{cu: initScale, bm: boardTransform.bm + ev.dg, bn: boardTransform.bn + ev.dh, eJ: initScale * ev.eJ})
			});
	});
var author$project$Data$Board$neighboringPoint = F2(
	function (direction, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		switch (direction) {
			case 0:
				return _Utils_Tuple2(x, y - 1);
			case 1:
				return _Utils_Tuple2(x, y + 1);
			case 2:
				return _Utils_Tuple2(x - 1, y);
			default:
				return _Utils_Tuple2(x + 1, y);
		}
	});
var author$project$Data$Board$moveSelectionSkip = F2(
	function (direction, board) {
		var selection = board.M;
		var helper = F3(
			function (dir, original, point) {
				helper:
				while (true) {
					var nextPoint = A2(author$project$Data$Board$neighboringPoint, dir, point);
					var nextCell = A2(author$project$Data$Grid$get, nextPoint, board.m);
					var _n0 = A2(
						elm$core$Maybe$map,
						function (cell_) {
							return !_Utils_eq(cell_, author$project$Data$Puzzle$Shaded);
						},
						nextCell);
					if (!_n0.$) {
						if (_n0.a) {
							return nextPoint;
						} else {
							var $temp$dir = direction,
								$temp$original = original,
								$temp$point = nextPoint;
							dir = $temp$dir;
							original = $temp$original;
							point = $temp$point;
							continue helper;
						}
					} else {
						return original;
					}
				}
			});
		return A3(
			author$project$Data$Board$updateSelection,
			A3(helper, direction, selection.P, selection.P),
			selection.z,
			board);
	});
var author$project$Page$Game$updateOnArrowKey = F2(
	function (direction, board) {
		var selection = board.M;
		var isChangingDirection = ((!selection.z) && ((!direction) || (direction === 1))) || ((selection.z === 1) && ((direction === 2) || (direction === 3)));
		var newDirection = isChangingDirection ? author$project$Data$Direction$swap(selection.z) : selection.z;
		return isChangingDirection ? A3(author$project$Data$Board$updateSelection, selection.P, newDirection, board) : A2(author$project$Data$Board$moveSelectionSkip, direction, board);
	});
var author$project$Page$Game$updateOnCellClick = F2(
	function (point, board) {
		var oldSelection = board.M;
		var direction = _Utils_eq(oldSelection.P, point) ? author$project$Data$Direction$swap(oldSelection.z) : oldSelection.z;
		return A3(author$project$Data$Board$updateSelection, point, direction, board);
	});
var author$project$Page$Game$updateEndedGame = F2(
	function (msg, gameState) {
		_n0$7:
		while (true) {
			switch (msg.$) {
				case 7:
					return _Utils_Tuple2(
						author$project$Page$Game$freshInProgress(gameState.i),
						elm$core$Platform$Cmd$none);
				case 4:
					var point = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Ended(
							_Utils_update(
								gameState,
								{
									f: A2(author$project$Page$Game$updateOnCellClick, point, gameState.f)
								})),
						elm$core$Platform$Cmd$none);
				case 6:
					var clue = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Ended(
							_Utils_update(
								gameState,
								{
									f: A3(author$project$Data$Board$moveSelectionToWord, clue, gameState.i, gameState.f)
								})),
						elm$core$Platform$Cmd$none);
				case 5:
					switch (msg.a.$) {
						case 0:
							var direction = msg.a.a;
							return _Utils_Tuple2(
								author$project$Page$Game$Ended(
									_Utils_update(
										gameState,
										{
											f: A2(author$project$Page$Game$updateOnArrowKey, direction, gameState.f)
										})),
								elm$core$Platform$Cmd$none);
						case 3:
							var direction = msg.a.a;
							return _Utils_Tuple2(
								author$project$Page$Game$Ended(
									_Utils_update(
										gameState,
										{
											f: A3(author$project$Data$Board$cycleSelectedClue, direction, gameState.i, gameState.f)
										})),
								elm$core$Platform$Cmd$none);
						default:
							break _n0$7;
					}
				case 13:
					var ev = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Ended(
							A2(author$project$Page$Game$onUpdatePan, gameState, ev)),
						elm$core$Platform$Cmd$none);
				case 14:
					var ev = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Ended(
							A2(author$project$Page$Game$onUpdateZoom, gameState, ev)),
						elm$core$Platform$Cmd$none);
				default:
					break _n0$7;
			}
		}
		return _Utils_Tuple2(
			author$project$Page$Game$Ended(gameState),
			elm$core$Platform$Cmd$none);
	});
var author$project$Data$Board$moveSelection = F2(
	function (direction, board) {
		var selection = board.M;
		var nextPoint = A2(author$project$Data$Board$neighboringPoint, direction, selection.P);
		var isShaded = A2(
			elm$core$Maybe$withDefault,
			true,
			A2(
				elm$core$Maybe$map,
				function (cell_) {
					return _Utils_eq(cell_, author$project$Data$Puzzle$Shaded);
				},
				A2(author$project$Data$Grid$get, nextPoint, board.m)));
		var newPoint = isShaded ? selection.P : nextPoint;
		return A3(author$project$Data$Board$updateSelection, newPoint, selection.z, board);
	});
var author$project$Data$Board$revealPuzzle = F2(
	function (_n0, board) {
		var grid = _n0.m;
		return _Utils_update(
			board,
			{m: grid});
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_n0.$) {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var author$project$Data$Grid$set = F3(
	function (point, value, g) {
		var grid = g;
		return {
			x: A3(
				elm$core$Array$set,
				A2(author$project$Data$Grid$pointToIndex, point, g),
				elm$core$Maybe$Just(value),
				grid.x),
			Q: grid.Q,
			w: grid.w
		};
	});
var author$project$Data$Board$revealSelectedCell = F2(
	function (puzzle, board) {
		var cursor = board.M.P;
		var selectedCell = A2(author$project$Data$Grid$get, cursor, puzzle.m);
		if (!selectedCell.$) {
			var letter = selectedCell.a;
			return _Utils_update(
				board,
				{
					m: A3(author$project$Data$Grid$set, cursor, letter, board.m)
				});
		} else {
			return board;
		}
	});
var author$project$Data$Board$isSelectedWord = F3(
	function (point, puzzle, board) {
		var clueId = A2(author$project$Data$Board$selectedClueId, puzzle, board);
		var _n0 = A2(
			elm$core$Dict$get,
			A2(author$project$Data$Grid$pointToIndex, point, puzzle.m),
			puzzle.bd);
		if (!_n0.$) {
			if (!_n0.a.$) {
				var id = _n0.a.a;
				return A2(
					elm$core$Maybe$withDefault,
					false,
					A2(
						elm$core$Maybe$map,
						function (c) {
							return _Utils_eq(c, id);
						},
						clueId));
			} else {
				var _n1 = _n0.a;
				var id1 = _n1.a;
				var id2 = _n1.b;
				return A2(
					elm$core$Maybe$withDefault,
					false,
					A2(
						elm$core$Maybe$map,
						function (c) {
							return _Utils_eq(c, id1) || _Utils_eq(c, id2);
						},
						clueId));
			}
		} else {
			return false;
		}
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			t: _List_Nil,
			o: 0,
			r: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.o * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						t: A2(elm$core$List$cons, mappedLeaf, builder.t),
						o: builder.o + 1,
						r: builder.r
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var author$project$Data$Grid$indexedMap = F2(
	function (fn, g) {
		var grid = g;
		return {
			x: A2(
				elm$core$Array$indexedMap,
				F2(
					function (index, c) {
						return A2(
							fn,
							A2(author$project$Data$Grid$indexToPoint, index, g),
							c);
					}),
				grid.x),
			Q: grid.Q,
			w: grid.w
		};
	});
var author$project$Data$Board$revealSelectedWord = F2(
	function (puzzle, board) {
		var reveal = F2(
			function (point, cell) {
				if (A3(author$project$Data$Board$isSelectedWord, point, puzzle, board)) {
					if ((!cell.$) && (cell.a.$ === 1)) {
						return A2(author$project$Data$Grid$get, point, puzzle.m);
					} else {
						return cell;
					}
				} else {
					return cell;
				}
			});
		return _Utils_update(
			board,
			{
				m: A2(author$project$Data$Grid$indexedMap, reveal, board.m)
			});
	});
var author$project$Data$Grid$equals = F2(
	function (_n0, _n1) {
		var one = _n0;
		var two = _n1;
		return _Utils_eq(one.x, two.x);
	});
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Set$remove = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$remove, key, dict);
	});
var author$project$View$Keyboard$update = F2(
	function (state, msg) {
		if (!msg.$) {
			var _char = msg.a;
			return _Utils_Tuple2(
				author$project$View$Keyboard$State(
					A2(elm$core$Set$insert, _char, state.bA)),
				elm$core$Platform$Cmd$none);
		} else {
			var _char = msg.a;
			var m = msg.b;
			return _Utils_Tuple2(
				author$project$View$Keyboard$State(
					A2(elm$core$Set$remove, _char, state.bA)),
				A2(
					elm$core$Task$perform,
					elm$core$Basics$always(m),
					elm$core$Task$succeed(0)));
		}
	});
var elm_community$undo_redo$UndoList$new = F2(
	function (event, _n0) {
		var past = _n0.p;
		var present = _n0.cM;
		return A3(
			elm_community$undo_redo$UndoList$UndoList,
			A2(elm$core$List$cons, present, past),
			event,
			_List_Nil);
	});
var elm_community$undo_redo$UndoList$redo = function (_n0) {
	var past = _n0.p;
	var present = _n0.cM;
	var future = _n0.s;
	if (!future.b) {
		return A3(elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = future.a;
		var xs = future.b;
		return A3(
			elm_community$undo_redo$UndoList$UndoList,
			A2(elm$core$List$cons, present, past),
			x,
			xs);
	}
};
var elm_community$undo_redo$UndoList$undo = function (_n0) {
	var past = _n0.p;
	var present = _n0.cM;
	var future = _n0.s;
	if (!past.b) {
		return A3(elm_community$undo_redo$UndoList$UndoList, past, present, future);
	} else {
		var x = past.a;
		var xs = past.b;
		return A3(
			elm_community$undo_redo$UndoList$UndoList,
			xs,
			x,
			A2(elm$core$List$cons, present, future));
	}
};
var author$project$Page$Game$updateInProgressGame = F2(
	function (msg, gameState) {
		var updateBoard = F2(
			function (game, board) {
				var isPuzzleCorrect = A2(author$project$Data$Grid$equals, board.m, game.i.m);
				return isPuzzleCorrect ? _Utils_Tuple2(
					author$project$Page$Game$Ended(
						{f: board, L: author$project$View$Board$initTransform, i: game.i, N: game.N}),
					elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					author$project$Page$Game$InProgress(
						_Utils_update(
							game,
							{
								f: board,
								ah: A2(elm_community$undo_redo$UndoList$new, board, game.ah)
							})),
					elm$core$Platform$Cmd$none);
			});
		var noOp = _Utils_Tuple2(
			author$project$Page$Game$InProgress(gameState),
			elm$core$Platform$Cmd$none);
		_n0$16:
		while (true) {
			switch (msg.$) {
				case 3:
					var newTime = gameState.N + 1;
					return _Utils_Tuple2(
						author$project$Page$Game$InProgress(
							_Utils_update(
								gameState,
								{N: newTime})),
						elm$core$Platform$Cmd$none);
				case 4:
					var point = msg.a;
					return A2(
						updateBoard,
						gameState,
						A2(author$project$Page$Game$updateOnCellClick, point, gameState.f));
				case 6:
					var clue = msg.a;
					return A2(
						updateBoard,
						gameState,
						A3(author$project$Data$Board$moveSelectionToWord, clue, gameState.i, gameState.f));
				case 7:
					return _Utils_Tuple2(
						author$project$Page$Game$freshInProgress(gameState.i),
						elm$core$Platform$Cmd$none);
				case 9:
					return A2(
						updateBoard,
						gameState,
						A2(author$project$Data$Board$revealSelectedWord, gameState.i, gameState.f));
				case 10:
					return A2(
						updateBoard,
						gameState,
						A2(author$project$Data$Board$revealSelectedCell, gameState.i, gameState.f));
				case 8:
					return A2(
						updateBoard,
						gameState,
						A2(author$project$Data$Board$revealPuzzle, gameState.i, gameState.f));
				case 5:
					switch (msg.a.$) {
						case 2:
							var _n1 = msg.a;
							var board = gameState.f;
							var cursor = board.M.P;
							var direction = function () {
								var _n2 = board.M.z;
								if (!_n2) {
									return 2;
								} else {
									return 0;
								}
							}();
							var newBoard = A2(
								author$project$Data$Board$moveSelection,
								direction,
								_Utils_update(
									board,
									{
										m: A3(
											author$project$Data$Grid$set,
											cursor,
											author$project$Data$Puzzle$Letter(' '),
											board.m)
									}));
							return A2(updateBoard, gameState, newBoard);
						case 1:
							var _char = msg.a.a;
							var board = gameState.f;
							var cursor = board.M.P;
							var direction = function () {
								var _n3 = board.M.z;
								if (!_n3) {
									return 3;
								} else {
									return 1;
								}
							}();
							var newBoard = A2(
								author$project$Data$Board$moveSelection,
								direction,
								_Utils_update(
									board,
									{
										m: A3(
											author$project$Data$Grid$set,
											cursor,
											author$project$Data$Puzzle$Letter(_char),
											board.m)
									}));
							return A2(updateBoard, gameState, newBoard);
						case 3:
							var direction = msg.a.a;
							return A2(
								updateBoard,
								gameState,
								A3(author$project$Data$Board$cycleSelectedClue, direction, gameState.i, gameState.f));
						case 0:
							var direction = msg.a.a;
							return A2(
								updateBoard,
								gameState,
								A2(author$project$Page$Game$updateOnArrowKey, direction, gameState.f));
						case 4:
							var _n4 = msg.a;
							var undoList = elm_community$undo_redo$UndoList$undo(gameState.ah);
							return _Utils_Tuple2(
								author$project$Page$Game$InProgress(
									_Utils_update(
										gameState,
										{f: undoList.cM, ah: undoList})),
								elm$core$Platform$Cmd$none);
						case 5:
							var _n5 = msg.a;
							var undoList = elm_community$undo_redo$UndoList$redo(gameState.ah);
							return _Utils_Tuple2(
								author$project$Page$Game$InProgress(
									_Utils_update(
										gameState,
										{f: undoList.cM, ah: undoList})),
								elm$core$Platform$Cmd$none);
						default:
							break _n0$16;
					}
				case 12:
					var keyboardMsg = msg.a;
					var _n6 = A2(author$project$View$Keyboard$update, gameState.aX, keyboardMsg);
					var s = _n6.a;
					var c = _n6.b;
					return _Utils_Tuple2(
						author$project$Page$Game$InProgress(
							_Utils_update(
								gameState,
								{aX: s})),
						c);
				case 13:
					var ev = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$InProgress(
							A2(author$project$Page$Game$onUpdatePan, gameState, ev)),
						elm$core$Platform$Cmd$none);
				case 14:
					var ev = msg.a;
					return _Utils_Tuple2(
						author$project$Page$Game$InProgress(
							A2(author$project$Page$Game$onUpdateZoom, gameState, ev)),
						elm$core$Platform$Cmd$none);
				default:
					break _n0$16;
			}
		}
		return noOp;
	});
var author$project$Page$Game$updateInitializedGame = F2(
	function (msg, state) {
		if (msg.$ === 2) {
			return _Utils_Tuple2(
				author$project$Page$Game$freshInProgress(state.i),
				elm$core$Platform$Cmd$none);
		} else {
			return _Utils_Tuple2(
				author$project$Page$Game$Initialized(state),
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Page$Game$updateGameState = F2(
	function (msg, gameState) {
		switch (gameState.$) {
			case 1:
				var initializedGame = gameState.a;
				return A2(author$project$Page$Game$updateInitializedGame, msg, initializedGame);
			case 2:
				var inProgressGame = gameState.a;
				return A2(author$project$Page$Game$updateInProgressGame, msg, inProgressGame);
			case 0:
				return _Utils_Tuple2(gameState, elm$core$Platform$Cmd$none);
			case 3:
				var endedGame = gameState.a;
				return A2(author$project$Page$Game$updateEndedGame, msg, endedGame);
			default:
				return _Utils_Tuple2(gameState, elm$core$Platform$Cmd$none);
		}
	});
var elm$file$File$name = _File_name;
var elm$file$File$toString = _File_toString;
var author$project$Page$Game$update = F2(
	function (msg, model) {
		var onFileRead = F2(
			function (file, contents) {
				return author$project$Page$Game$OnFileRead(
					{
						ce: contents,
						cD: elm$file$File$name(file)
					});
			});
		var _n0 = _Utils_Tuple2(msg, model.am);
		switch (_n0.a.$) {
			case 0:
				var _n1 = _n0.a;
				var file = _n1.a;
				return _Utils_Tuple2(
					model,
					A2(
						elm$core$Task$perform,
						onFileRead(file),
						elm$file$File$toString(file)));
			case 1:
				var contents = _n0.a.a.ce;
				var name = _n0.a.a.cD;
				return _Utils_Tuple2(
					author$project$Page$Game$Model(
						A2(
							author$project$Page$Game$loadGame,
							author$project$Data$Puzzle$Id$fromString(name),
							contents)),
					elm$core$Platform$Cmd$none);
			case 11:
				if (!_n0.a.b.$) {
					var _n2 = _n0.a;
					var id = _n2.a;
					var puzzle = _n2.b.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Model(
							author$project$Page$Game$Initialized(
								author$project$Page$Game$InitializedState(puzzle))),
						elm$core$Platform$Cmd$none);
				} else {
					var _n3 = _n0.a;
					var id = _n3.a;
					var p = _n3.b.a;
					return _Utils_Tuple2(
						author$project$Page$Game$Model(author$project$Page$Game$Error),
						elm$core$Platform$Cmd$none);
				}
			default:
				var game = _n0.b;
				var _n4 = A2(author$project$Page$Game$updateGameState, msg, game);
				var g = _n4.a;
				var c = _n4.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{am: g}),
					c);
		}
	});
var author$project$Data$Loadable$Failed = function (a) {
	return {$: 1, a: a};
};
var author$project$Data$Loadable$Loaded = function (a) {
	return {$: 2, a: a};
};
var author$project$Data$Loadable$fromResult = function (result) {
	if (!result.$) {
		var thing = result.a;
		return author$project$Data$Loadable$Loaded(thing);
	} else {
		var err = result.a;
		return author$project$Data$Loadable$Failed(err);
	}
};
var author$project$Page$Home$update = F2(
	function (msg, model) {
		if (msg.$ === 1) {
			return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		} else {
			var result = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						bv: author$project$Data$Loadable$fromResult(result)
					}),
				elm$core$Platform$Cmd$none);
		}
	});
var author$project$Session$collapseMenu = function (session) {
	return _Utils_update(
		session,
		{d6: true});
};
var author$project$Session$navKey = function (record) {
	return record.bL;
};
var author$project$Session$toggleMenuCollapsed = function (session) {
	return _Utils_update(
		session,
		{d6: !session.d6});
};
var elm$browser$Browser$Navigation$load = _Browser_load;
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.cR;
		if (!_n0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.cn,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.cS,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.cL,
					_Utils_ap(http, url.cr)),
				url.eB)));
};
var author$project$Main$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model.aq);
		_n0$6:
		while (true) {
			switch (_n0.a.$) {
				case 4:
					var urlRequest = _n0.a.a;
					var newModel = _Utils_update(
						model,
						{
							ag: author$project$Session$collapseMenu(
								author$project$Main$toSession(model))
						});
					if (!urlRequest.$) {
						var url = urlRequest.a;
						return _Utils_Tuple2(
							newModel,
							A2(
								elm$browser$Browser$Navigation$pushUrl,
								author$project$Session$navKey(
									author$project$Main$toSession(model)),
								elm$url$Url$toString(url)));
					} else {
						var href = urlRequest.a;
						return _Utils_Tuple2(
							newModel,
							elm$browser$Browser$Navigation$load(href));
					}
				case 2:
					var url = _n0.a.a;
					return A2(
						author$project$Main$changeRouteTo,
						author$project$Route$fromUrl(url),
						model);
				case 5:
					if (_n0.b.$ === 2) {
						var subMsg = _n0.a.a;
						var subModel = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							model,
							author$project$Main$Home,
							author$project$Main$GotHomeMsg,
							A2(author$project$Page$Home$update, subMsg, subModel));
					} else {
						break _n0$6;
					}
				case 6:
					if (_n0.b.$ === 3) {
						var subMsg = _n0.a.a;
						var subModel = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							model,
							author$project$Main$Game,
							author$project$Main$GotGameMsg,
							A2(author$project$Page$Game$update, subMsg, subModel));
					} else {
						break _n0$6;
					}
				case 7:
					if (_n0.b.$ === 4) {
						var subMsg = _n0.a.a;
						var subModel = _n0.b.a;
						return A4(
							author$project$Main$updateWith,
							model,
							author$project$Main$About,
							author$project$Main$GotAboutMsg,
							A2(author$project$Page$About$update, subMsg, subModel));
					} else {
						break _n0$6;
					}
				case 3:
					var _n2 = _n0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ag: author$project$Session$toggleMenuCollapsed(model.ag)
							}),
						elm$core$Platform$Cmd$none);
				default:
					break _n0$6;
			}
		}
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Main$NavBarToggled = {$: 3};
var author$project$Main$NoOp = {$: 0};
var author$project$Page$About = 3;
var author$project$Page$Game = 2;
var author$project$Page$Home = 1;
var author$project$Page$Other = 0;
var rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$Node;
var rtfeldman$elm_css$Html$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$node;
var rtfeldman$elm_css$Html$Styled$div = rtfeldman$elm_css$Html$Styled$node('div');
var author$project$Page$viewFooter = A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
var rtfeldman$elm_css$Css$PxUnits = 0;
var elm$core$String$fromFloat = _String_fromNumber;
var rtfeldman$elm_css$Css$Structure$Compatible = 0;
var rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			bZ: 0,
			ca: 0,
			aC: 0,
			A: 0,
			aY: 0,
			aG: 0,
			ac: 0,
			aH: 0,
			aI: 0,
			an: 0,
			ao: 0,
			V: 0,
			af: numericValue,
			aP: 0,
			aR: unitLabel,
			a8: units,
			X: _Utils_ap(
				elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var rtfeldman$elm_css$Css$px = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'px');
var author$project$Styles$mobileBreakWidth = rtfeldman$elm_css$Css$px(500);
var rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _n0) {
		var value = _n0.X;
		return {
			cl: key,
			X: elm$core$Maybe$Just(value)
		};
	});
var rtfeldman$elm_css$Css$Media$minWidth = function (value) {
	return A2(rtfeldman$elm_css$Css$Media$feature, 'min-width', value);
};
var rtfeldman$elm_css$Css$Structure$OnlyQuery = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Media$only = rtfeldman$elm_css$Css$Structure$OnlyQuery;
var rtfeldman$elm_css$Css$Structure$Screen = 1;
var rtfeldman$elm_css$Css$Media$screen = 1;
var rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Media$withMedia = rtfeldman$elm_css$Css$Preprocess$WithMedia;
var author$project$Styles$forDesktop = function (css_) {
	return A2(
		rtfeldman$elm_css$Css$Media$withMedia,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Css$Media$only,
				rtfeldman$elm_css$Css$Media$screen,
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$Media$minWidth(author$project$Styles$mobileBreakWidth)
					]))
			]),
		css_);
};
var rtfeldman$elm_css$Css$Media$maxWidth = function (value) {
	return A2(rtfeldman$elm_css$Css$Media$feature, 'max-width', value);
};
var author$project$Styles$forMobile = function (css_) {
	return A2(
		rtfeldman$elm_css$Css$Media$withMedia,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Css$Media$only,
				rtfeldman$elm_css$Css$Media$screen,
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$Media$maxWidth(author$project$Styles$mobileBreakWidth)
					]))
			]),
		css_);
};
var rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 6, a: a};
};
var rtfeldman$elm_css$Css$batch = rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var author$project$Styles$ifMobileElse = F2(
	function (mobileCss, nonMobileCss) {
		return rtfeldman$elm_css$Css$batch(
			_List_fromArray(
				[
					author$project$Styles$forMobile(mobileCss),
					author$project$Styles$forDesktop(nonMobileCss)
				]));
	});
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var feathericons$elm_feather$FeatherIcons$Icon = elm$core$Basics$identity;
var feathericons$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		bc: elm$core$Maybe$Just('feather feather-' + name),
		bR: 24,
		a3: '',
		bx: 2,
		bB: '0 0 24 24'
	};
};
var feathericons$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return {
			y: feathericons$elm_feather$FeatherIcons$defaultAttributes(name),
			a: src
		};
	});
var feathericons$elm_feather$FeatherIcons$menu = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'menu',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('3'),
					elm$svg$Svg$Attributes$y1('12'),
					elm$svg$Svg$Attributes$x2('21'),
					elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil),
			A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('3'),
					elm$svg$Svg$Attributes$y1('6'),
					elm$svg$Svg$Attributes$x2('21'),
					elm$svg$Svg$Attributes$y2('6')
				]),
			_List_Nil),
			A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('3'),
					elm$svg$Svg$Attributes$y1('18'),
					elm$svg$Svg$Attributes$x2('21'),
					elm$svg$Svg$Attributes$y2('18')
				]),
			_List_Nil)
		]));
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$svg$Svg$map = elm$virtual_dom$VirtualDom$map;
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var feathericons$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _n0) {
		var src = _n0.a;
		var attrs = _n0.y;
		var strSize = elm$core$String$fromFloat(attrs.bR);
		var baseAttributes = _List_fromArray(
			[
				elm$svg$Svg$Attributes$fill('none'),
				elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.a3)),
				elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.a3)),
				elm$svg$Svg$Attributes$stroke('currentColor'),
				elm$svg$Svg$Attributes$strokeLinecap('round'),
				elm$svg$Svg$Attributes$strokeLinejoin('round'),
				elm$svg$Svg$Attributes$strokeWidth(
				elm$core$String$fromFloat(attrs.bx)),
				elm$svg$Svg$Attributes$viewBox(attrs.bB)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _n1 = attrs.bc;
				if (!_n1.$) {
					var c = _n1.a;
					return A2(
						elm$core$List$cons,
						elm$svg$Svg$Attributes$class(c),
						baseAttributes);
				} else {
					return baseAttributes;
				}
			}(),
			attributes);
		return A2(
			elm$svg$Svg$svg,
			combinedAttributes,
			A2(
				elm$core$List$map,
				elm$svg$Svg$map(elm$core$Basics$never),
				src));
	});
var rtfeldman$elm_css$Css$absolute = {a1: 0, X: 'absolute'};
var rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2(rtfeldman$elm_css$Css$property, key, arg.X);
	});
var rtfeldman$elm_css$Css$cursor = rtfeldman$elm_css$Css$prop1('cursor');
var rtfeldman$elm_css$Css$display = rtfeldman$elm_css$Css$prop1('display');
var rtfeldman$elm_css$Css$none = {ax: 0, b6: 0, E: 0, P: 0, n: 0, dY: 0, cv: 0, bK: 0, aI: 0, an: 0, V: 0, e: 0, d: 0, bN: 0, bp: 0, eC: 0, S: 0, bs: 0, eK: 0, aO: 0, au: 0, K: 0, k: 0, eX: 0, X: 'none'};
var rtfeldman$elm_css$Css$pointer = {P: 0, X: 'pointer'};
var rtfeldman$elm_css$Css$position = rtfeldman$elm_css$Css$prop1('position');
var rtfeldman$elm_css$Css$right = rtfeldman$elm_css$Css$prop1('right');
var rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 4, a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var rtfeldman$elm_css$Html$Styled$fromUnstyled = rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
var elm$json$Json$Encode$string = _Json_wrap;
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {az: charsProcessed, aF: hash, as: seed, aM: shift};
	});
var Skinney$murmur3$Murmur3$c1 = 3432918353;
var Skinney$murmur3$Murmur3$c2 = 461845907;
var Skinney$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var elm$core$Bitwise$or = _Bitwise_or;
var Skinney$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var elm$core$Bitwise$xor = _Bitwise_xor;
var Skinney$murmur3$Murmur3$finalize = function (data) {
	var acc = data.aF ? (data.as ^ A2(
		Skinney$murmur3$Murmur3$multiplyBy,
		Skinney$murmur3$Murmur3$c2,
		A2(
			Skinney$murmur3$Murmur3$rotlBy,
			15,
			A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, data.aF)))) : data.as;
	var h0 = acc ^ data.az;
	var h1 = A2(Skinney$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2(Skinney$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var Skinney$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			Skinney$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				Skinney$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					Skinney$murmur3$Murmur3$multiplyBy,
					Skinney$murmur3$Murmur3$c2,
					A2(
						Skinney$murmur3$Murmur3$rotlBy,
						15,
						A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.aF | ((255 & elm$core$Char$toCode(c)) << data.aM);
		var _n0 = data.aM;
		if (_n0 === 24) {
			return {
				az: data.az + 1,
				aF: 0,
				as: A2(Skinney$murmur3$Murmur3$mix, data.as, res),
				aM: 0
			};
		} else {
			return {az: data.az + 1, aF: res, as: data.as, aM: data.aM + 8};
		}
	});
var elm$core$String$foldl = _String_foldl;
var Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return Skinney$murmur3$Murmur3$finalize(
			A3(
				elm$core$String$foldl,
				Skinney$murmur3$Murmur3$hashFold,
				A4(Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var elm$core$String$cons = _String_cons;
var rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {cc: elm$core$Maybe$Nothing, cs: _List_Nil, cE: _List_Nil, c4: snippets};
};
var rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_n0) {
	var declarations = _n0;
	return declarations;
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (!declarations.a.$) {
				var _n1 = declarations.a.a;
				var firstSelector = _n1.a;
				var otherSelectors = _n1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2(elm$core$List$cons, firstSelector, otherSelectors),
					rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 1) {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 9, a: a};
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 3, a: a, b: b, c: c, d: d, e: e};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (!declaration.$) {
			var structureStyleBlock = declaration.a;
			return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 0:
				var structureStyleBlock = declaration.a;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 1:
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 2:
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 3:
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 4:
				return declaration;
			case 5:
				return declaration;
			case 6:
				return declaration;
			case 7:
				return declaration;
			case 8:
				return declaration;
			default:
				return declaration;
		}
	});
var rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 8, a: a};
};
var rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 5, a: a};
};
var rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 6, a: a};
};
var rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 7, a: a};
};
var rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		return A3(
			rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 0:
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2(rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 1:
						var _n1 = declarations.a;
						var mediaQueries = _n1.a;
						var styleBlocks = _n1.b;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									rtfeldman$elm_css$Css$Structure$mapLast,
									rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2(elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3(rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _n0) {
		var sequence = _n0.a;
		var selectors = _n0.b;
		return A3(
			rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			elm$core$Maybe$Just(pseudo));
	});
var rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 1, a: a};
};
var rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 0:
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 1:
				var list = sequence.a;
				return rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _n1 = list.a;
				var combinator = _n1.a;
				var sequence = _n1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					elm$core$List$cons,
					first,
					A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_n0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 0:
							var styleBlock = declarations.a.a;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 1:
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _n1 = declarations.a;
									var mediaQueries = _n1.a;
									var _n2 = _n1.b;
									var styleBlock = _n2.a;
									return _List_fromArray(
										[
											A2(
											rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _n3 = declarations.a;
									var mediaQueries = _n3.a;
									var _n4 = _n3.b;
									var first = _n4.a;
									var rest = _n4.b;
									var _n5 = A2(
										rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2(rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_n5.b && (_n5.a.$ === 1)) && (!_n5.b.b)) {
										var _n6 = _n5.a;
										var newMediaQueries = _n6.a;
										var newStyleBlocks = _n6.b;
										return _List_fromArray(
											[
												A2(
												rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2(elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _n5;
										return newDeclarations;
									}
								}
							} else {
								break _n0$12;
							}
						case 2:
							var _n7 = declarations.a;
							var str = _n7.a;
							var nestedDeclarations = _n7.b;
							return _List_fromArray(
								[
									A2(
									rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 3:
							var _n8 = declarations.a;
							var str1 = _n8.a;
							var str2 = _n8.b;
							var str3 = _n8.c;
							var str4 = _n8.d;
							var styleBlock = _n8.e;
							return A2(
								elm$core$List$map,
								A4(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 4:
							var _n9 = declarations.a;
							return declarations;
						case 5:
							return declarations;
						case 6:
							return declarations;
						case 7:
							return declarations;
						case 8:
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _n0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			elm$core$List$cons,
			first,
			A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (!declaration.$) {
			var styleBlock = declaration.a;
			return A2(
				rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var rtfeldman$elm_css$Hash$murmurSeed = 15739;
var elm$core$String$fromList = _String_fromList;
var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return '0';
			case 1:
				return '1';
			case 2:
				return '2';
			case 3:
				return '3';
			case 4:
				return '4';
			case 5:
				return '5';
			case 6:
				return '6';
			case 7:
				return '7';
			case 8:
				return '8';
			case 9:
				return '9';
			case 10:
				return 'a';
			case 11:
				return 'b';
			case 12:
				return 'c';
			case 13:
				return 'd';
			case 14:
				return 'e';
			case 15:
				return 'f';
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					elm$core$List$cons,
					rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2(elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var rtfeldman$elm_hex$Hex$toString = function (num) {
	return elm$core$String$fromList(
		(num < 0) ? A2(
			elm$core$List$cons,
			'-',
			A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		elm$core$String$cons,
		'_',
		rtfeldman$elm_hex$Hex$toString(
			A2(Skinney$murmur3$Murmur3$hashString, rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				elm$core$List$tail(decls));
		};
		var nextResult = A2(
			rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				elm$core$Maybe$withDefault,
				_List_Nil,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _n14 = _Utils_Tuple2(
				elm$core$List$head(nextResult),
				rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((!_n14.a.$) && (!_n14.b.$)) {
				var nextResultParent = _n14.a.a;
				var originalParent = _n14.b.a;
				return _Utils_ap(
					A2(
						elm$core$List$take,
						elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return elm$core$List$concat(
				A2(
					rtfeldman$elm_css$Css$Structure$mapLast,
					rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						elm$core$List$map,
						elm$core$List$singleton,
						A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				elm$core$Maybe$map,
				insertStylesToNestedDecl,
				rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 0:
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 1:
					var _n4 = styles.a;
					var selector = _n4.a;
					var nestedStyles = _n4.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 2:
					var _n5 = styles.a;
					var selectorCombinator = _n5.a;
					var snippets = _n5.b;
					var rest = styles.b;
					var chain = F2(
						function (_n9, _n10) {
							var originalSequence = _n9.a;
							var originalTuples = _n9.b;
							var originalPseudoElement = _n9.c;
							var newSequence = _n10.a;
							var newTuples = _n10.b;
							var newPseudoElement = _n10.c;
							return A3(
								rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 0:
								var _n7 = declaration.a;
								var firstSelector = _n7.a;
								var otherSelectors = _n7.b;
								var nestedStyles = _n7.c;
								var newSelectors = A2(
									elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											elm$core$List$map,
											chain(originalSelector),
											A2(elm$core$List$cons, firstSelector, otherSelectors));
									},
									rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 1:
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 2:
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 3:
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									elm$core$List$map,
									A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 4:
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 5:
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 6:
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 7:
								var properties = declaration.a;
								return _List_fromArray(
									[
										rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								elm$core$List$map,
								expandDeclaration,
								A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 3:
					var _n11 = styles.a;
					var pseudoElement = _n11.a;
					var nestedStyles = _n11.b;
					var rest = styles.b;
					return A4(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 5:
					var str = styles.a.a;
					var rest = styles.b;
					var name = rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2(rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$Structure$Keyframes(
								{dF: str, cD: name})
							]));
				case 4:
					var _n12 = styles.a;
					var mediaQueries = _n12.a;
					var nestedStyles = _n12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _n13 = rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_n13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _n13.a;
							var otherSelectors = _n13.b;
							return A2(
								elm$core$List$map,
								rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									elm$core$List$singleton(
										rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_n2) {
	var firstSelector = _n2.a;
	var otherSelectors = _n2.b;
	var styles = _n2.c;
	return A2(
		rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2(elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2(rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 0:
			var styleBlock = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 1:
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 2:
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 3:
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				elm$core$List$map,
				A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 4:
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 5:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 6:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 7:
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_n0) {
	var charset = _n0.cc;
	var imports = _n0.cs;
	var namespaces = _n0.cE;
	var snippets = _n0.c4;
	var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {cc: charset, dG: declarations, cs: imports, cE: namespaces};
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _n0) {
		var keyframesByName = _n0.a;
		var declarations = _n0.b;
		switch (declaration.$) {
			case 0:
				var _n2 = declaration.a;
				var properties = _n2.c;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 1:
				var styleBlocks = declaration.b;
				return A2(
					elm$core$List$all,
					function (_n3) {
						var properties = _n3.c;
						return elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 2:
				var otherDeclarations = declaration.b;
				return elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 3:
				return _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 4:
				var properties = declaration.b;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 5:
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 6:
				var record = declaration.a;
				return elm$core$String$isEmpty(record.dF) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3(elm$core$Dict$insert, record.cD, record.dF, keyframesByName),
					declarations);
			case 7:
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			case 8:
				var properties = declaration.a;
				return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					elm$core$List$all,
					function (_n4) {
						var properties = _n4.b;
						return elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2(elm$core$List$cons, declaration, declarations));
		}
	});
var rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			elm$core$List$append,
			A2(
				elm$core$List$map,
				function (_n0) {
					var name = _n0.a;
					var decl = _n0.b;
					return rtfeldman$elm_css$Css$Structure$Keyframes(
						{dF: decl, cD: name});
				},
				elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_n0) {
	var charset = _n0.cc;
	var imports = _n0.cs;
	var namespaces = _n0.cE;
	var declarations = _n0.dG;
	var _n1 = A3(
		elm$core$List$foldr,
		rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2(elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _n1.a;
	var compactedDeclarations = _n1.b;
	var finalDeclarations = A2(rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {cc: charset, dG: finalDeclarations, cs: imports, cE: namespaces};
};
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.cl + (A2(
		elm$core$Maybe$withDefault,
		'',
		A2(
			elm$core$Maybe$map,
			elm$core$Basics$append(': '),
			expression.X)) + ')'));
};
var rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType) {
		case 0:
			return 'print';
		case 1:
			return 'screen';
		default:
			return 'speech';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				elm$core$String$join,
				' and ',
				A2(
					elm$core$List$cons,
					rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 0:
			var expressions = mediaQuery.a;
			return A2(
				elm$core$String$join,
				' and ',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 1:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 2:
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + (rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var rtfeldman$elm_css$Css$Structure$Output$importToString = function (_n0) {
	var name = _n0.a;
	var mediaQueries = _n0.b;
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_n0) {
	var prefix = _n0.a;
	var str = _n0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap(rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		elm$core$String$join,
		'\n',
		A2(
			elm$core$List$map,
			A2(elm$core$Basics$composeL, rtfeldman$elm_css$Css$Structure$Output$indent, rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var elm$core$String$append = _String_append;
var rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_n0) {
	var str = _n0;
	return '::' + str;
};
var rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator) {
		case 0:
			return '+';
		case 1:
			return '~';
		case 2:
			return '>';
		default:
			return '';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 0:
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 1:
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 2:
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 0:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 1:
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				elm$core$String$join,
				'',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$cons,
					str,
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_n0) {
	var combinator = _n0.a;
	var sequence = _n0.b;
	return A2(
		elm$core$String$join,
		' ',
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_n0) {
	var simpleSelectorSequence = _n0.a;
	var chain = _n0.b;
	var pseudoElement = _n0.c;
	var segments = A2(
		elm$core$List$cons,
		rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				elm$core$Maybe$withDefault,
				'',
				A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		elm$core$String$append,
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$filter,
				A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _n0) {
		var firstSelector = _n0.a;
		var otherSelectors = _n0.b;
		var properties = _n0.c;
		var selectorStr = A2(
			elm$core$String$join,
			', ',
			A2(
				elm$core$List$map,
				rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2(elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 0:
			var styleBlock = decl.a;
			return A2(rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 1:
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				elm$core$String$join,
				',\n',
				A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				elm$core$String$join,
				'\n\n',
				A2(
					elm$core$List$map,
					A2(
						elm$core$Basics$composeL,
						rtfeldman$elm_css$Css$Structure$Output$indent,
						rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 2:
			return 'TODO';
		case 3:
			return 'TODO';
		case 4:
			return 'TODO';
		case 5:
			return 'TODO';
		case 6:
			var name = decl.a.cD;
			var declaration = decl.a.dF;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 7:
			return 'TODO';
		case 8:
			return 'TODO';
		default:
			return 'TODO';
	}
};
var rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_n0) {
	var charset = _n0.cc;
	var imports = _n0.cs;
	var namespaces = _n0.cE;
	var declarations = _n0.dG;
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(
			elm$core$List$filter,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					elm$core$String$join,
					'\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					elm$core$String$join,
					'\n\n',
					A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		rtfeldman$elm_css$Css$Structure$compactStylesheet(
			rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var rtfeldman$elm_css$Css$Preprocess$Snippet = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
		return _List_fromArray(
			[
				rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
				A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
			]);
	});
var rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		elm$core$String$cons,
		'_',
		rtfeldman$elm_hex$Hex$toString(
			A2(
				Skinney$murmur3$Murmur3$hashString,
				rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					elm$core$List$singleton(
						rtfeldman$elm_css$Css$Preprocess$stylesheet(
							elm$core$List$singleton(
								A2(
									rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		elm$virtual_dom$VirtualDom$property,
		'className',
		elm$json$Json$Encode$string(classname));
	return A3(rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var rtfeldman$elm_css$Html$Styled$Attributes$css = rtfeldman$elm_css$Html$Styled$Internal$css;
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Page$hamburgerMenuToggle = function (onMenuToggle) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2(
						author$project$Styles$ifMobileElse,
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
								rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
								rtfeldman$elm_css$Css$right(
								rtfeldman$elm_css$Css$px(30))
							]),
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$none)
							]))
					])),
				rtfeldman$elm_css$Html$Styled$Events$onClick(onMenuToggle)
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$fromUnstyled(
				A2(feathericons$elm_feather$FeatherIcons$toHtml, _List_Nil, feathericons$elm_feather$FeatherIcons$menu))
			]));
};
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2(elm$core$String$startsWith, '#', str) ? str : A2(elm$core$String$cons, '#', str);
};
var rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		aU: 1,
		ds: 0,
		U: 0,
		dU: 0,
		eE: 0,
		X: rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var elm$core$String$toLower = _String_toLower;
var elm$core$Basics$pow = _Basics_pow;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2(elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2(elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return elm$core$Result$Err(
							elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var rtfeldman$elm_hex$Hex$fromString = function (str) {
	if (elm$core$String$isEmpty(str)) {
		return elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2(elm$core$String$startsWith, '-', str)) {
				var list = A2(
					elm$core$Maybe$withDefault,
					_List_Nil,
					elm$core$List$tail(
						elm$core$String$toList(str)));
				return A2(
					elm$core$Result$map,
					elm$core$Basics$negate,
					A3(
						rtfeldman$elm_hex$Hex$fromStringHelp,
						elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					rtfeldman$elm_hex$Hex$fromStringHelp,
					elm$core$String$length(str) - 1,
					elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2(elm$core$Result$mapError, formatError, result);
	}
};
var rtfeldman$elm_css$Css$validHex = F5(
	function (str, _n0, _n1, _n2, _n3) {
		var r1 = _n0.a;
		var r2 = _n0.b;
		var g1 = _n1.a;
		var g2 = _n1.b;
		var b1 = _n2.a;
		var b2 = _n2.b;
		var a1 = _n3.a;
		var a2 = _n3.b;
		var toResult = A2(
			elm$core$Basics$composeR,
			elm$core$String$fromList,
			A2(elm$core$Basics$composeR, elm$core$String$toLower, rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((!results.a.a.$) && (!results.a.b.$)) && (!results.b.a.$)) && (!results.b.b.$)) {
			var _n5 = results.a;
			var red = _n5.a.a;
			var green = _n5.b.a;
			var _n6 = results.b;
			var blue = _n6.a.a;
			var alpha = _n6.b.a;
			return {
				aU: alpha / 255,
				ds: blue,
				U: 0,
				dU: green,
				eE: red,
				X: rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2(elm$core$String$startsWith, '#', str) ? A2(elm$core$String$dropLeft, 1, str) : str;
	var _n0 = elm$core$String$toList(withoutHash);
	_n0$4:
	while (true) {
		if ((_n0.b && _n0.b.b) && _n0.b.b.b) {
			if (!_n0.b.b.b.b) {
				var r = _n0.a;
				var _n1 = _n0.b;
				var g = _n1.a;
				var _n2 = _n1.b;
				var b = _n2.a;
				return A5(
					rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2('f', 'f'));
			} else {
				if (!_n0.b.b.b.b.b) {
					var r = _n0.a;
					var _n3 = _n0.b;
					var g = _n3.a;
					var _n4 = _n3.b;
					var b = _n4.a;
					var _n5 = _n4.b;
					var a = _n5.a;
					return A5(
						rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_n0.b.b.b.b.b.b) {
						if (!_n0.b.b.b.b.b.b.b) {
							var r1 = _n0.a;
							var _n6 = _n0.b;
							var r2 = _n6.a;
							var _n7 = _n6.b;
							var g1 = _n7.a;
							var _n8 = _n7.b;
							var g2 = _n8.a;
							var _n9 = _n8.b;
							var b1 = _n9.a;
							var _n10 = _n9.b;
							var b2 = _n10.a;
							return A5(
								rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2('f', 'f'));
						} else {
							if (_n0.b.b.b.b.b.b.b.b && (!_n0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _n0.a;
								var _n11 = _n0.b;
								var r2 = _n11.a;
								var _n12 = _n11.b;
								var g1 = _n12.a;
								var _n13 = _n12.b;
								var g2 = _n13.a;
								var _n14 = _n13.b;
								var b1 = _n14.a;
								var _n15 = _n14.b;
								var b2 = _n15.a;
								var _n16 = _n15.b;
								var a1 = _n16.a;
								var _n17 = _n16.b;
								var a2 = _n17.a;
								return A5(
									rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _n0$4;
							}
						}
					} else {
						break _n0$4;
					}
				}
			}
		} else {
			break _n0$4;
		}
	}
	return rtfeldman$elm_css$Css$erroneousHex(str);
};
var author$project$Styles$colors = {
	b5: rtfeldman$elm_css$Css$hex('#000000'),
	bJ: rtfeldman$elm_css$Css$hex('#AAAAAA'),
	dW: rtfeldman$elm_css$Css$hex('#FF41B4'),
	d5: rtfeldman$elm_css$Css$hex('#9EEBCF'),
	cC: rtfeldman$elm_css$Css$hex('#FAFAFA'),
	eN: rtfeldman$elm_css$Css$hex('#FFDA00'),
	c0: rtfeldman$elm_css$Css$hex('#A7D8FF'),
	bX: rtfeldman$elm_css$Css$hex('#FFFFFF')
};
var rtfeldman$elm_css$Css$color = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'color', c.X);
};
var rtfeldman$elm_css$Css$marginTop = rtfeldman$elm_css$Css$prop1('margin-top');
var rtfeldman$elm_css$Css$outline = rtfeldman$elm_css$Css$prop1('outline');
var rtfeldman$elm_css$Css$paddingRight = rtfeldman$elm_css$Css$prop1('padding-right');
var rtfeldman$elm_css$Css$textDecoration = rtfeldman$elm_css$Css$prop1('text-decoration');
var rtfeldman$elm_css$Css$UnitlessInteger = 0;
var rtfeldman$elm_css$Css$zero = {aY: 0, aG: 0, ac: 0, aH: 0, aI: 0, an: 0, ao: 0, en: 0, af: 0, bp: 0, aR: '', a8: 0, X: '0'};
var rtfeldman$elm_css$Html$Styled$a = rtfeldman$elm_css$Html$Styled$node('a');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		elm$virtual_dom$VirtualDom$text(str));
};
var rtfeldman$elm_css$Html$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
var author$project$Page$viewHeaderLink = F3(
	function (session, route, string) {
		var showMenu = session.d6 ? _List_fromArray(
			[
				rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$none)
			]) : _List_fromArray(
			[
				rtfeldman$elm_css$Css$marginTop(
				rtfeldman$elm_css$Css$px(10))
			]);
		return A2(
			rtfeldman$elm_css$Html$Styled$a,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							A2(
							author$project$Styles$ifMobileElse,
							showMenu,
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$paddingRight(
									rtfeldman$elm_css$Css$px(20))
								])),
							rtfeldman$elm_css$Css$textDecoration(rtfeldman$elm_css$Css$none),
							rtfeldman$elm_css$Css$outline(rtfeldman$elm_css$Css$zero),
							rtfeldman$elm_css$Css$color(author$project$Styles$colors.b5)
						])),
					route
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(string)
				]));
	});
var author$project$Route$toParts = function (route) {
	switch (route.$) {
		case 0:
			return _List_Nil;
		case 1:
			if (!route.a.$) {
				var id = route.a.a;
				return _List_fromArray(
					[
						'game',
						author$project$Data$Puzzle$Id$toString(id)
					]);
			} else {
				var _n1 = route.a;
				return _List_fromArray(
					['game']);
			}
		default:
			return _List_fromArray(
				['about']);
	}
};
var rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			elm$json$Json$Encode$string(string));
	});
var rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2(rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var author$project$Route$toHref = function (route) {
	var parts = author$project$Route$toParts(route);
	return rtfeldman$elm_css$Html$Styled$Attributes$href(
		'#/' + A2(elm$core$String$join, '/', parts));
};
var author$project$Route$about = author$project$Route$toHref(author$project$Route$About);
var author$project$Route$defaultGame = author$project$Route$toHref(
	author$project$Route$Game(elm$core$Maybe$Nothing));
var author$project$Route$home = author$project$Route$toHref(author$project$Route$Home);
var rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return elm$core$List$isEmpty(list) ? {X: 'none'} : {
		X: A2(
			elm$core$String$join,
			', ',
			A2(
				elm$core$List$map,
				function (s) {
					return s;
				},
				list))
	};
};
var rtfeldman$elm_css$Css$fontFamilies = A2(
	elm$core$Basics$composeL,
	rtfeldman$elm_css$Css$prop1('font-family'),
	rtfeldman$elm_css$Css$stringsToValue);
var author$project$Styles$fonts = {
	dr: rtfeldman$elm_css$Css$fontFamilies(
		_List_fromArray(
			['avenir next', 'avenir', 'san-serif']))
};
var author$project$View$Logo$Black = 1;
var author$project$View$Logo$White = 0;
var rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var rtfeldman$elm_css$VirtualDom$Styled$nodeNS = rtfeldman$elm_css$VirtualDom$Styled$NodeNS;
var rtfeldman$elm_css$Svg$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$nodeNS('http://www.w3.org/2000/svg');
var rtfeldman$elm_css$Svg$Styled$rect = rtfeldman$elm_css$Svg$Styled$node('rect');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$attribute, key, value),
			_List_Nil,
			'');
	});
var rtfeldman$elm_css$Svg$Styled$Attributes$fill = rtfeldman$elm_css$VirtualDom$Styled$attribute('fill');
var rtfeldman$elm_css$Svg$Styled$Attributes$height = rtfeldman$elm_css$VirtualDom$Styled$attribute('height');
var rtfeldman$elm_css$Svg$Styled$Attributes$stroke = rtfeldman$elm_css$VirtualDom$Styled$attribute('stroke');
var rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth = rtfeldman$elm_css$VirtualDom$Styled$attribute('stroke-width');
var rtfeldman$elm_css$Svg$Styled$Attributes$width = rtfeldman$elm_css$VirtualDom$Styled$attribute('width');
var rtfeldman$elm_css$Svg$Styled$Attributes$x = rtfeldman$elm_css$VirtualDom$Styled$attribute('x');
var rtfeldman$elm_css$Svg$Styled$Attributes$y = rtfeldman$elm_css$VirtualDom$Styled$attribute('y');
var author$project$View$Logo$viewCell = F2(
	function (index, square) {
		var y = (5 * ((index / 4) | 0)) + 0.5;
		var x = (5 * A2(elm$core$Basics$modBy, 4, index)) + 0.5;
		var color = function () {
			if (!square) {
				return 'white';
			} else {
				return 'black';
			}
		}();
		return A2(
			rtfeldman$elm_css$Svg$Styled$rect,
			_List_fromArray(
				[
					rtfeldman$elm_css$Svg$Styled$Attributes$x(
					elm$core$String$fromFloat(x)),
					rtfeldman$elm_css$Svg$Styled$Attributes$y(
					elm$core$String$fromFloat(y)),
					rtfeldman$elm_css$Svg$Styled$Attributes$width('5'),
					rtfeldman$elm_css$Svg$Styled$Attributes$height('5'),
					rtfeldman$elm_css$Svg$Styled$Attributes$stroke('black'),
					rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth('.4'),
					rtfeldman$elm_css$Svg$Styled$Attributes$fill(color)
				]),
			_List_Nil);
	});
var rtfeldman$elm_css$Svg$Styled$g = rtfeldman$elm_css$Svg$Styled$node('g');
var rtfeldman$elm_css$Svg$Styled$svg = rtfeldman$elm_css$Svg$Styled$node('svg');
var rtfeldman$elm_css$Svg$Styled$Attributes$viewBox = rtfeldman$elm_css$VirtualDom$Styled$attribute('viewBox');
var author$project$View$Logo$view = function () {
	var grid = _List_fromArray(
		[
			_List_fromArray(
			[1, 0, 0, 0]),
			_List_fromArray(
			[0, 0, 1, 0]),
			_List_fromArray(
			[0, 1, 0, 0]),
			_List_fromArray(
			[0, 0, 0, 1])
		]);
	return A2(
		rtfeldman$elm_css$Svg$Styled$svg,
		_List_fromArray(
			[
				rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 21 21')
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Svg$Styled$rect,
				_List_fromArray(
					[
						rtfeldman$elm_css$Svg$Styled$Attributes$width('21'),
						rtfeldman$elm_css$Svg$Styled$Attributes$height('21'),
						rtfeldman$elm_css$Svg$Styled$Attributes$x('0'),
						rtfeldman$elm_css$Svg$Styled$Attributes$y('0'),
						rtfeldman$elm_css$Svg$Styled$Attributes$fill('none'),
						rtfeldman$elm_css$Svg$Styled$Attributes$stroke('black'),
						rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth('1')
					]),
				_List_Nil),
				A2(
				rtfeldman$elm_css$Svg$Styled$g,
				_List_Nil,
				A2(
					elm$core$List$indexedMap,
					author$project$View$Logo$viewCell,
					elm$core$List$concat(grid)))
			]));
}();
var rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 0:
					var str = style.a;
					var key = A2(
						elm$core$Maybe$withDefault,
						'',
						elm$core$List$head(
							A2(elm$core$String$split, ':', str)));
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 1:
					var selector = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 2:
					var combinator = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 3:
					var pseudoElement = style.a;
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 4:
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 5:
					return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _n1 = style.a;
							var only = _n1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _n2 = style.a;
							var first = _n2.a;
							var rest = _n2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var rtfeldman$elm_css$Css$Internal$IncompatibleUnits = 0;
var rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '', 0);
var rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$center = rtfeldman$elm_css$Css$prop1('center');
var rtfeldman$elm_css$Css$row = {bI: 0, aW: 0, X: 'row'};
var rtfeldman$elm_css$Css$column = _Utils_update(
	rtfeldman$elm_css$Css$row,
	{X: 'column'});
var rtfeldman$elm_css$Css$displayFlex = A2(rtfeldman$elm_css$Css$property, 'display', 'flex');
var rtfeldman$elm_css$Css$flexDirection = rtfeldman$elm_css$Css$prop1('flex-direction');
var rtfeldman$elm_css$Css$marginRight = rtfeldman$elm_css$Css$prop1('margin-right');
var rtfeldman$elm_css$Css$padding = rtfeldman$elm_css$Css$prop1('padding');
var rtfeldman$elm_css$Css$width = rtfeldman$elm_css$Css$prop1('width');
var rtfeldman$elm_css$Html$Styled$nav = rtfeldman$elm_css$Html$Styled$node('nav');
var author$project$Page$viewHeader = function (config) {
	return A2(
		rtfeldman$elm_css$Html$Styled$nav,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
						rtfeldman$elm_css$Css$padding(
						rtfeldman$elm_css$Css$px(14)),
						author$project$Styles$fonts.dr,
						A2(
						author$project$Styles$ifMobileElse,
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$flexDirection(rtfeldman$elm_css$Css$column)
							]),
						_List_Nil)
					]))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$displayFlex,
								rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
								rtfeldman$elm_css$Css$paddingRight(
								rtfeldman$elm_css$Css$px(20))
							]))
					]),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$a,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										rtfeldman$elm_css$Css$displayFlex,
										rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
										rtfeldman$elm_css$Css$textDecoration(rtfeldman$elm_css$Css$none),
										rtfeldman$elm_css$Css$outline(rtfeldman$elm_css$Css$zero),
										rtfeldman$elm_css$Css$color(author$project$Styles$colors.b5)
									])),
								author$project$Route$home
							]),
						_List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										author$project$Route$home,
										rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												rtfeldman$elm_css$Css$marginRight(
												rtfeldman$elm_css$Css$px(14)),
												rtfeldman$elm_css$Css$width(
												rtfeldman$elm_css$Css$px(25))
											]))
									]),
								_List_fromArray(
									[author$project$View$Logo$view])),
								rtfeldman$elm_css$Html$Styled$text('Crossword Games')
							])),
						author$project$Page$hamburgerMenuToggle(config.eu)
					])),
				A3(author$project$Page$viewHeaderLink, config.ag, author$project$Route$defaultGame, 'Solo Game'),
				A3(author$project$Page$viewHeaderLink, config.ag, author$project$Route$about, 'About')
			]));
};
var author$project$Page$view = function (config) {
	return {
		b7: _List_fromArray(
			[
				author$project$Page$viewHeader(config),
				config.bF.bF,
				author$project$Page$viewFooter
			]),
		eU: config.bF.eU
	};
};
var author$project$Page$About$view = function (model) {
	return {
		bF: A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[author$project$Styles$fonts.dr]))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('This is the about page')
				])),
		eU: 'About'
	};
};
var author$project$Page$Blank$view = {
	bF: rtfeldman$elm_css$Html$Styled$text(''),
	eU: ''
};
var author$project$Data$Board$selectedClue = F2(
	function (puzzle, board) {
		return A2(
			elm$core$Maybe$andThen,
			function (clueId) {
				return A2(
					elm$core$Dict$get,
					author$project$Data$Puzzle$clueIdToIndex(clueId),
					puzzle.dz);
			},
			A2(author$project$Data$Board$selectedClueId, puzzle, board));
	});
var author$project$Page$Game$OnCellClick = function (a) {
	return {$: 4, a: a};
};
var author$project$Page$Game$OnKeyboardMsg = function (a) {
	return {$: 12, a: a};
};
var author$project$Page$Game$OnDropFile = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$file$File$decoder = _File_decoder;
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$json$Json$Decode$oneOrMoreHelp = F2(
	function (toValue, xs) {
		if (!xs.b) {
			return elm$json$Json$Decode$fail('a ARRAY with at least ONE element');
		} else {
			var y = xs.a;
			var ys = xs.b;
			return elm$json$Json$Decode$succeed(
				A2(toValue, y, ys));
		}
	});
var elm$json$Json$Decode$oneOrMore = F2(
	function (toValue, decoder) {
		return A2(
			elm$json$Json$Decode$andThen,
			elm$json$Json$Decode$oneOrMoreHelp(toValue),
			elm$json$Json$Decode$list(decoder));
	});
var author$project$Page$Game$dropDecoder = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['dataTransfer', 'files']),
	A2(elm$json$Json$Decode$oneOrMore, author$project$Page$Game$OnDropFile, elm$file$File$decoder));
var author$project$Page$Game$hijack = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var author$project$Page$Game$hijackOn = F2(
	function (event, decoder) {
		return A2(
			rtfeldman$elm_css$Html$Styled$Events$preventDefaultOn,
			event,
			A2(elm$json$Json$Decode$map, author$project$Page$Game$hijack, decoder));
	});
var author$project$Data$TimeFormat$secondsPerHour = 3600;
var author$project$Data$TimeFormat$secondsPerMinute = 60;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var author$project$Data$TimeFormat$formatSeconds = function (seconds) {
	var s = A2(
		elm$core$Basics$modBy,
		author$project$Data$TimeFormat$secondsPerHour,
		A2(elm$core$Basics$modBy, author$project$Data$TimeFormat$secondsPerMinute, seconds));
	var m = (A2(elm$core$Basics$modBy, author$project$Data$TimeFormat$secondsPerHour, seconds) / author$project$Data$TimeFormat$secondsPerMinute) | 0;
	var h = (seconds / author$project$Data$TimeFormat$secondsPerHour) | 0;
	var list = (!h) ? _List_fromArray(
		[
			elm$core$String$fromInt(m),
			A3(
			elm$core$String$padLeft,
			2,
			'0',
			elm$core$String$fromInt(s))
		]) : _List_fromArray(
		[
			elm$core$String$fromInt(h),
			A3(
			elm$core$String$padLeft,
			2,
			'0',
			elm$core$String$fromInt(m)),
			A3(
			elm$core$String$padLeft,
			2,
			'0',
			elm$core$String$fromInt(s))
		]);
	return A2(elm$core$String$join, ':', list);
};
var author$project$Hammer$PanData = F4(
	function (deltaX, deltaY, velocityX, velocityY) {
		return {dI: deltaX, dJ: deltaY, dg: velocityX, dh: velocityY};
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$map4 = _Json_map4;
var author$project$Hammer$panDecoder = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['detail', 'hammerdata']),
	A5(
		elm$json$Json$Decode$map4,
		author$project$Hammer$PanData,
		A2(elm$json$Json$Decode$field, 'deltaX', elm$json$Json$Decode$float),
		A2(elm$json$Json$Decode$field, 'deltaY', elm$json$Json$Decode$float),
		A2(elm$json$Json$Decode$field, 'velocityX', elm$json$Json$Decode$float),
		A2(elm$json$Json$Decode$field, 'velocityY', elm$json$Json$Decode$float)));
var author$project$Hammer$ZoomData = F4(
	function (scale, velocityX, velocityY, isStart) {
		return {d0: isStart, eJ: scale, dg: velocityX, dh: velocityY};
	});
var author$project$Hammer$zoomDecoder = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['detail', 'hammerdata']),
	A5(
		elm$json$Json$Decode$map4,
		author$project$Hammer$ZoomData,
		A2(elm$json$Json$Decode$field, 'scale', elm$json$Json$Decode$float),
		A2(elm$json$Json$Decode$field, 'velocityX', elm$json$Json$Decode$float),
		A2(elm$json$Json$Decode$field, 'velocityY', elm$json$Json$Decode$float),
		A2(
			elm$json$Json$Decode$map,
			function (str) {
				return str === 'pinchstart';
			},
			A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string))));
var author$project$Hammer$view = F3(
	function (config, attrs, children) {
		return A3(
			rtfeldman$elm_css$Html$Styled$node,
			'hammer-wrapper',
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$Events$on,
						'pan',
						A2(elm$json$Json$Decode$map, config.cH, author$project$Hammer$panDecoder)),
						A2(
						rtfeldman$elm_css$Html$Styled$Events$on,
						'pinch',
						A2(elm$json$Json$Decode$map, config.cI, author$project$Hammer$zoomDecoder))
					]),
				attrs),
			children);
	});
var author$project$Page$Game$OnCrosswordPan = function (a) {
	return {$: 13, a: a};
};
var author$project$Page$Game$OnCrosswordZoom = function (a) {
	return {$: 14, a: a};
};
var author$project$Page$Game$hammerIf = function (cond) {
	return cond ? author$project$Hammer$view(
		{cH: author$project$Page$Game$OnCrosswordPan, cI: author$project$Page$Game$OnCrosswordZoom}) : rtfeldman$elm_css$Html$Styled$div;
};
var rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2(rtfeldman$elm_css$Css$property, 'background-color', c.X);
};
var rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.X, argB.X, argC.X])));
	});
var rtfeldman$elm_css$Css$border3 = rtfeldman$elm_css$Css$prop3('border');
var rtfeldman$elm_css$Css$margin = rtfeldman$elm_css$Css$prop1('margin');
var rtfeldman$elm_css$Css$solid = {E: 0, at: 0, X: 'solid'};
var author$project$Styles$buttonStyle = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.cC),
			A3(
			rtfeldman$elm_css$Css$border3,
			rtfeldman$elm_css$Css$px(1),
			rtfeldman$elm_css$Css$solid,
			author$project$Styles$colors.b5),
			rtfeldman$elm_css$Css$margin(
			rtfeldman$elm_css$Css$px(2)),
			rtfeldman$elm_css$Css$padding(
			rtfeldman$elm_css$Css$px(7))
		]));
var rtfeldman$elm_css$Html$Styled$button = rtfeldman$elm_css$Html$Styled$node('button');
var author$project$Page$Game$ourButton = F2(
	function (attrs, children) {
		return A2(
			rtfeldman$elm_css$Html$Styled$button,
			_Utils_ap(
				attrs,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$buttonStyle]))
					])),
			children);
	});
var author$project$Data$Board$transverseClueId = F2(
	function (puzzle, board) {
		return A2(
			elm$core$Maybe$andThen,
			author$project$Data$Puzzle$getMatchingClueId(
				author$project$Data$Direction$swap(board.M.z)),
			A2(
				elm$core$Dict$get,
				A2(author$project$Data$Grid$pointToIndex, board.M.P, puzzle.m),
				puzzle.bd));
	});
var author$project$Page$Game$OnClueClick = function (a) {
	return {$: 6, a: a};
};
var rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.X, argB.X])));
	});
var rtfeldman$elm_css$Css$padding2 = rtfeldman$elm_css$Css$prop2('padding');
var author$project$Styles$clue = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			A2(
			rtfeldman$elm_css$Css$padding2,
			rtfeldman$elm_css$Css$px(2),
			rtfeldman$elm_css$Css$px(5))
		]));
var rtfeldman$elm_css$Css$outline3 = rtfeldman$elm_css$Css$prop3('outline');
var rtfeldman$elm_css$Css$transparent = {U: 0, X: 'transparent'};
var rtfeldman$elm_css$Html$Styled$b = rtfeldman$elm_css$Html$Styled$node('b');
var rtfeldman$elm_css$Html$Styled$span = rtfeldman$elm_css$Html$Styled$node('span');
var author$project$Page$Game$viewClue = F3(
	function (selectedClue, transverseClue, clue) {
		var viewIndex = A2(
			rtfeldman$elm_css$Html$Styled$b,
			_List_Nil,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text(
					elm$core$String$fromInt(clue.bh.en))
				]));
		var isSelected = function (maybeClueId) {
			if (maybeClueId.$ === 1) {
				return false;
			} else {
				var clueId = maybeClueId.a;
				return _Utils_eq(clue.bh, clueId);
			}
		};
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							author$project$Styles$clue,
							isSelected(selectedClue) ? rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.c0) : rtfeldman$elm_css$Css$backgroundColor(rtfeldman$elm_css$Css$transparent),
							isSelected(transverseClue) ? A3(
							rtfeldman$elm_css$Css$outline3,
							rtfeldman$elm_css$Css$px(1),
							rtfeldman$elm_css$Css$solid,
							author$project$Styles$colors.c0) : rtfeldman$elm_css$Css$outline(rtfeldman$elm_css$Css$none)
						])),
					rtfeldman$elm_css$Html$Styled$Events$onClick(
					author$project$Page$Game$OnClueClick(clue))
				]),
			_List_fromArray(
				[
					viewIndex,
					A2(
					rtfeldman$elm_css$Html$Styled$span,
					_List_Nil,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(' ' + clue.dw)
						]))
				]));
	});
var rtfeldman$elm_css$Css$PercentageUnits = 0;
var rtfeldman$elm_css$Css$pct = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, '%');
var author$project$Styles$widths = {
	a0: rtfeldman$elm_css$Css$width(
		rtfeldman$elm_css$Css$pct(100)),
	cJ: rtfeldman$elm_css$Css$width(
		rtfeldman$elm_css$Css$pct(70)),
	ez: rtfeldman$elm_css$Css$width(
		rtfeldman$elm_css$Css$pct(90))
};
var elm$core$Dict$partition = F2(
	function (isGood, dict) {
		var add = F3(
			function (key, value, _n0) {
				var t1 = _n0.a;
				var t2 = _n0.b;
				return A2(isGood, key, value) ? _Utils_Tuple2(
					A3(elm$core$Dict$insert, key, value, t1),
					t2) : _Utils_Tuple2(
					t1,
					A3(elm$core$Dict$insert, key, value, t2));
			});
		return A3(
			elm$core$Dict$foldl,
			add,
			_Utils_Tuple2(elm$core$Dict$empty, elm$core$Dict$empty),
			dict);
	});
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$List$sortBy = _List_sortBy;
var rtfeldman$elm_css$Css$marginLeft = rtfeldman$elm_css$Css$prop1('margin-left');
var rtfeldman$elm_css$Html$Styled$h2 = rtfeldman$elm_css$Html$Styled$node('h2');
var author$project$Page$Game$viewClues = F2(
	function (puzzle, board) {
		var transverseClue = A2(author$project$Data$Board$transverseClueId, puzzle, board);
		var selectedClue = A2(author$project$Data$Board$selectedClueId, puzzle, board);
		var isAcross = F2(
			function (_n2, clue) {
				var _n1 = clue.bh.z;
				if (!_n1) {
					return true;
				} else {
					return false;
				}
			});
		var helper = A2(
			elm$core$Basics$composeR,
			elm$core$Dict$values,
			A2(
				elm$core$Basics$composeR,
				elm$core$List$sortBy(
					A2(
						elm$core$Basics$composeR,
						function ($) {
							return $.bh;
						},
						function ($) {
							return $.en;
						})),
				elm$core$List$map(
					A2(author$project$Page$Game$viewClue, selectedClue, transverseClue))));
		var _n0 = A2(elm$core$Dict$partition, isAcross, puzzle.dz);
		var acrossClues = _n0.a;
		var downClues = _n0.b;
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[rtfeldman$elm_css$Css$displayFlex]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[author$project$Styles$widths.a0]))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$h2,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text('Across')
								])),
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_Nil,
							helper(acrossClues))
						])),
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$marginLeft(
									rtfeldman$elm_css$Css$px(20)),
									author$project$Styles$widths.a0
								]))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$h2,
							_List_Nil,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$text('Down')
								])),
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_Nil,
							helper(downClues))
						]))
				]));
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt = function (_n0) {
	var day = _n0;
	return day;
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getDay = function (_n0) {
	var date = _n0;
	return date.dD;
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$getDay = A2(elm$core$Basics$composeL, PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt, PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getDay);
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getMonth = function (_n0) {
	var month = _n0.ec;
	return month;
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$getMonth = PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getMonth;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear = function (_n0) {
	var _int = _n0;
	return (!A2(elm$core$Basics$modBy, 4, _int)) && ((!A2(elm$core$Basics$modBy, 400, _int)) || (!(!A2(elm$core$Basics$modBy, 100, _int))));
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay = ((1000 * 60) * 60) * 24;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear = function (year) {
	return PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? (PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 366) : (PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 365);
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Year = elm$core$Basics$identity;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt = function (year) {
	return (year > 0) ? elm$core$Maybe$Just(year) : elm$core$Maybe$Nothing;
};
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch = function (_n0) {
	var year = _n0;
	var getTotalMillis = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			elm$core$List$sum,
			elm$core$List$map(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear)),
		elm$core$List$filterMap(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt));
	var epochYear = 1970;
	return (year >= 1970) ? getTotalMillis(
		A2(elm$core$List$range, epochYear, year - 1)) : (-getTotalMillis(
		A2(elm$core$List$range, year, epochYear - 1)));
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth = function (day) {
	return PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * (PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(day) - 1);
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt = function (month) {
	switch (month) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var elm$time$Time$Apr = 3;
var elm$time$Time$Aug = 7;
var elm$time$Time$Dec = 11;
var elm$time$Time$Feb = 1;
var elm$time$Time$Jan = 0;
var elm$time$Time$Jul = 6;
var elm$time$Time$Jun = 5;
var elm$time$Time$Mar = 2;
var elm$time$Time$May = 4;
var elm$time$Time$Nov = 10;
var elm$time$Time$Oct = 9;
var elm$time$Time$Sep = 8;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months = elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
var elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var elm$core$Elm$JsArray$slice = _JsArray_slice;
var elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = elm$core$Elm$JsArray$length(tail);
		var notAppended = (elm$core$Array$branchFactor - elm$core$Elm$JsArray$length(builder.r)) - tailLen;
		var appended = A3(elm$core$Elm$JsArray$appendN, elm$core$Array$branchFactor, builder.r, tail);
		return (notAppended < 0) ? {
			t: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.t),
			o: builder.o + 1,
			r: A3(elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			t: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.t),
			o: builder.o + 1,
			r: elm$core$Elm$JsArray$empty
		} : {t: builder.t, o: builder.o, r: appended});
	});
var elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					len - from,
					elm$core$Array$shiftStep,
					elm$core$Elm$JsArray$empty,
					A3(
						elm$core$Elm$JsArray$slice,
						from - elm$core$Array$tailIndex(len),
						elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2(elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2(elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * elm$core$Array$branchFactor);
					var initialBuilder = {
						t: _List_Nil,
						o: 0,
						r: A3(
							elm$core$Elm$JsArray$slice,
							firstSlice,
							elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						elm$core$Array$builderToArray,
						true,
						A3(elm$core$List$foldl, elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = elm$core$Array$bitMask & (treeEnd >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var sub = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _n0.a;
				return A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, values);
			}
		}
	});
var elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_n0.$) {
					var sub = _n0.a;
					var $temp$oldShift = oldShift - elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = elm$core$Array$bitMask & (endIdx >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_n0.$) {
			var sub = _n0.a;
			var newSub = A3(elm$core$Array$sliceTree, shift - elm$core$Array$shiftStep, endIdx, sub);
			return (!elm$core$Elm$JsArray$length(newSub)) ? A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				elm$core$Array$SubTree(newSub),
				A3(elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = elm$core$Array$tailIndex(end);
				var depth = elm$core$Basics$floor(
					A2(
						elm$core$Basics$logBase,
						elm$core$Array$branchFactor,
						A2(elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep);
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3(elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4(elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var elm$core$Array$translateIndex = F2(
	function (index, _n0) {
		var len = _n0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2(elm$core$Array$translateIndex, to, array);
		var correctFrom = A2(elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? elm$core$Array$empty : A2(
			elm$core$Array$sliceLeft,
			correctFrom,
			A2(elm$core$Array$sliceRight, correctTo, array));
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths = function (month) {
	return elm$core$Array$toList(
		A3(
			elm$core$Array$slice,
			0,
			PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt(month) - 1,
			PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months));
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day = elm$core$Basics$identity;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf = F2(
	function (year, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear = F2(
	function (year, month) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (m, res) {
					return res + (PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(
						A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf, year, m)));
				}),
			0,
			PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths(month));
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis = function (_n0) {
	var year = _n0.e0;
	var month = _n0.ec;
	var day = _n0.dD;
	return (PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch(year) + A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear, year, month)) + PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth(day);
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toPosix = A2(elm$core$Basics$composeL, elm$time$Time$millisToPosix, PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis);
var elm$time$Time$Fri = 4;
var elm$time$Time$Mon = 0;
var elm$time$Time$Sat = 5;
var elm$time$Time$Sun = 6;
var elm$time$Time$Thu = 3;
var elm$time$Time$Tue = 1;
var elm$time$Time$Wed = 2;
var elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return elm$core$Basics$floor(numerator / denominator);
	});
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.bS, posixMinutes) < 0) {
					return posixMinutes + era.c;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var elm$time$Time$toAdjustedMinutes = F2(
	function (_n0, time) {
		var defaultOffset = _n0.a;
		var eras = _n0.b;
		return A3(
			elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				elm$time$Time$flooredDiv,
				elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _n0 = A2(
			elm$core$Basics$modBy,
			7,
			A2(
				elm$time$Time$flooredDiv,
				A2(elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_n0) {
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
			case 3:
				return 6;
			case 4:
				return 0;
			case 5:
				return 1;
			default:
				return 2;
		}
	});
var elm$time$Time$utc = A2(elm$time$Time$Zone, 0, _List_Nil);
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getWeekday = function (date) {
	return A2(
		elm$time$Time$toWeekday,
		elm$time$Time$utc,
		PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toPosix(date));
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$getWeekday = PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getWeekday;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getYear = function (_n0) {
	var year = _n0.e0;
	return year;
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearToInt = function (_n0) {
	var year = _n0;
	return year;
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$getYear = A2(elm$core$Basics$composeL, PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearToInt, PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getYear);
var PanagiotisGeorgiadis$elm_datetime$Calendar$RawDate = F3(
	function (year, month, day) {
		return {dD: day, ec: month, e0: year};
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayFromInt = F3(
	function (year, month, day) {
		var maxValidDay = PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(
			A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf, year, month));
		return ((day > 0) && (A2(elm$core$Basics$compare, day, maxValidDay) !== 2)) ? elm$core$Maybe$Just(day) : elm$core$Maybe$Nothing;
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Date = elm$core$Basics$identity;
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$compareDays = F2(
	function (lhs, rhs) {
		return A2(
			elm$core$Basics$compare,
			PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(lhs),
			PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(rhs));
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromYearMonthDay = F3(
	function (y, m, d) {
		var maxDay = A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf, y, m);
		var _n0 = A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$compareDays, d, maxDay);
		if (_n0 === 2) {
			return elm$core$Maybe$Nothing;
		} else {
			return elm$core$Maybe$Just(
				{dD: d, ec: m, e0: y});
		}
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromRawDay = F3(
	function (year, month, day) {
		return A2(
			elm$core$Maybe$andThen,
			A2(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromYearMonthDay, year, month),
			A3(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayFromInt, year, month, day));
	});
var PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromRawParts = function (_n0) {
	var year = _n0.e0;
	var month = _n0.ec;
	var day = _n0.dD;
	return A2(
		elm$core$Maybe$andThen,
		function (y) {
			return A3(PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromRawDay, y, month, day);
		},
		PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt(year));
};
var PanagiotisGeorgiadis$elm_datetime$Calendar$fromRawParts = PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromRawParts;
var author$project$Data$Puzzle$Date$intToMonth = function (_int) {
	switch (_int) {
		case 1:
			return elm$core$Maybe$Just(0);
		case 2:
			return elm$core$Maybe$Just(1);
		case 3:
			return elm$core$Maybe$Just(2);
		case 4:
			return elm$core$Maybe$Just(3);
		case 5:
			return elm$core$Maybe$Just(4);
		case 6:
			return elm$core$Maybe$Just(5);
		case 7:
			return elm$core$Maybe$Just(6);
		case 8:
			return elm$core$Maybe$Just(7);
		case 9:
			return elm$core$Maybe$Just(8);
		case 10:
			return elm$core$Maybe$Just(9);
		case 11:
			return elm$core$Maybe$Just(10);
		case 12:
			return elm$core$Maybe$Just(11);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$Data$Puzzle$Date$dateFromYearMonthDay = F3(
	function (yearInt, monthInt, dayInt) {
		return A2(
			elm$core$Maybe$andThen,
			function (month) {
				return PanagiotisGeorgiadis$elm_datetime$Calendar$fromRawParts(
					A3(PanagiotisGeorgiadis$elm_datetime$Calendar$RawDate, yearInt, month, dayInt));
			},
			author$project$Data$Puzzle$Date$intToMonth(monthInt));
	});
var author$project$Data$Puzzle$Date$toEnglishMonth = function (month) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'Feburary';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var author$project$Data$Puzzle$Date$toEnglishWeekday = function (weekday) {
	switch (weekday) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var elm_community$maybe_extra$Maybe$Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _n0 = f(e);
			if (_n0.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var x = _n0.a;
				return A2(
					elm$core$Maybe$map,
					elm$core$List$cons(x),
					acc);
			}
		});
	return A2(
		elm$core$List$foldr,
		step,
		elm$core$Maybe$Just(_List_Nil));
};
var author$project$Data$Puzzle$Date$parseDateString = function (dateString) {
	var tupleAp3 = F2(
		function (fn, _n3) {
			var a = _n3.a;
			var b = _n3.b;
			var c = _n3.c;
			return A3(fn, a, b, c);
		});
	var listToTriple = function (ls) {
		if (((ls.b && ls.b.b) && ls.b.b.b) && (!ls.b.b.b.b)) {
			var yearInt = ls.a;
			var _n1 = ls.b;
			var monthInt = _n1.a;
			var _n2 = _n1.b;
			var dayInt = _n2.a;
			return elm$core$Maybe$Just(
				_Utils_Tuple3(yearInt, monthInt, dayInt));
		} else {
			return elm$core$Maybe$Nothing;
		}
	};
	return A2(
		elm$core$Maybe$map,
		function (date) {
			return {
				dE: elm$core$String$fromInt(
					PanagiotisGeorgiadis$elm_datetime$Calendar$getDay(date)),
				dM: author$project$Data$Puzzle$Date$toEnglishMonth(
					PanagiotisGeorgiadis$elm_datetime$Calendar$getMonth(date)),
				eZ: author$project$Data$Puzzle$Date$toEnglishWeekday(
					PanagiotisGeorgiadis$elm_datetime$Calendar$getWeekday(date)),
				e0: elm$core$String$fromInt(
					PanagiotisGeorgiadis$elm_datetime$Calendar$getYear(date))
			};
		},
		A2(
			elm$core$Maybe$andThen,
			tupleAp3(author$project$Data$Puzzle$Date$dateFromYearMonthDay),
			A2(
				elm$core$Maybe$andThen,
				listToTriple,
				A2(
					elm_community$maybe_extra$Maybe$Extra$traverse,
					elm$core$String$toInt,
					A2(elm$core$String$split, '-', dateString)))));
};
var rtfeldman$elm_css$Css$fontWeight = function (_n0) {
	var value = _n0.X;
	return A2(rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var rtfeldman$elm_css$Css$int = function (val) {
	return {
		ab: 0,
		bi: 0,
		ao: 0,
		V: 0,
		en: 0,
		bl: 0,
		af: val,
		aR: '',
		a8: 0,
		X: elm$core$String$fromInt(val)
	};
};
var rtfeldman$elm_css$Css$marginBottom = rtfeldman$elm_css$Css$prop1('margin-bottom');
var rtfeldman$elm_css$Css$paddingLeft = rtfeldman$elm_css$Css$prop1('padding-left');
var author$project$Page$Game$viewMetadata = function (metadata) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				function () {
					var _n0 = A2(elm$core$Maybe$andThen, author$project$Data$Puzzle$Date$parseDateString, metadata.dC);
					if (!_n0.$) {
						var weekDay = _n0.a.eZ;
						var englishMonth = _n0.a.dM;
						var dayNum = _n0.a.dE;
						var year = _n0.a.e0;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$h2,
								_List_fromArray(
									[
										rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												rtfeldman$elm_css$Css$marginBottom(
												rtfeldman$elm_css$Css$px(6))
											]))
									]),
								_List_fromArray(
									[
										A2(
										rtfeldman$elm_css$Html$Styled$span,
										_List_fromArray(
											[
												rtfeldman$elm_css$Html$Styled$Attributes$css(
												_List_fromArray(
													[
														rtfeldman$elm_css$Css$fontWeight(
														rtfeldman$elm_css$Css$int(700))
													]))
											]),
										_List_fromArray(
											[
												rtfeldman$elm_css$Html$Styled$text(weekDay + ' ')
											])),
										A2(
										rtfeldman$elm_css$Html$Styled$span,
										_List_fromArray(
											[
												rtfeldman$elm_css$Html$Styled$Attributes$css(
												_List_fromArray(
													[
														rtfeldman$elm_css$Css$fontWeight(
														rtfeldman$elm_css$Css$int(400))
													]))
											]),
										_List_fromArray(
											[
												rtfeldman$elm_css$Html$Styled$text(englishMonth + (' ' + (dayNum + (', ' + year))))
											]))
									]))
							]);
					} else {
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Html$Styled$h2,
								_List_Nil,
								_List_fromArray(
									[
										rtfeldman$elm_css$Html$Styled$text('Puzzle')
									]))
							]);
					}
				}()),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Html$Styled$span,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text('By ')
							])),
						A2(
						rtfeldman$elm_css$Html$Styled$b,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(
								A2(elm$core$Maybe$withDefault, 'Unknown', metadata.dq))
							])),
						A2(
						rtfeldman$elm_css$Html$Styled$span,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										rtfeldman$elm_css$Css$paddingLeft(
										rtfeldman$elm_css$Css$px(15))
									]))
							]),
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text('Edited by ')
							])),
						A2(
						rtfeldman$elm_css$Html$Styled$b,
						_List_Nil,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text(
								A2(elm$core$Maybe$withDefault, 'Unknown', metadata.dK))
							]))
					]))
			]));
};
var author$project$Data$Puzzle$clueIdToDisplayString = function (_n0) {
	var direction = _n0.z;
	var number = _n0.en;
	return _Utils_ap(
		elm$core$String$fromInt(number),
		author$project$Data$Direction$toString(direction));
};
var author$project$Styles$boardClue = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.c0),
			rtfeldman$elm_css$Css$padding(
			rtfeldman$elm_css$Css$px(16))
		]));
var author$project$Styles$hideOnMobile = author$project$Styles$forMobile(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$none)
		]));
var author$project$Page$Game$viewSelectedClue = F2(
	function (puzzle, board) {
		var selectedClue = A2(author$project$Data$Board$selectedClue, puzzle, board);
		var _n0 = function () {
			if (!selectedClue.$) {
				var clue = selectedClue.a;
				return _Utils_Tuple2(
					author$project$Data$Puzzle$clueIdToDisplayString(clue.bh),
					clue.dw);
			} else {
				return _Utils_Tuple2('', '');
			}
		}();
		var clueNumber = _n0.a;
		var clueText = _n0.b;
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[author$project$Styles$boardClue, author$project$Styles$hideOnMobile]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$b,
					_List_Nil,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(clueNumber)
						])),
					rtfeldman$elm_css$Html$Styled$text(' ' + clueText)
				]));
	});
var author$project$Page$Game$ResetPuzzle = {$: 7};
var author$project$Page$Game$RevealPuzzle = {$: 8};
var author$project$Page$Game$RevealSelectedCell = {$: 10};
var author$project$Page$Game$RevealSelectedWord = {$: 9};
var rtfeldman$elm_css$Css$flexStart = rtfeldman$elm_css$Css$prop1('flex-start');
var rtfeldman$elm_css$Css$justifyContent = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var rtfeldman$elm_css$Css$RemUnits = 0;
var rtfeldman$elm_css$Css$rem = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, 0, 'rem');
var author$project$Page$Game$viewToolbar = A2(
	rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$displayFlex,
					rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$flexStart),
					rtfeldman$elm_css$Css$marginBottom(
					rtfeldman$elm_css$Css$rem(0.5))
				]))
		]),
	_List_fromArray(
		[
			A2(
			author$project$Page$Game$ourButton,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Page$Game$ResetPuzzle)
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('Reset Puzzle')
				])),
			A2(
			author$project$Page$Game$ourButton,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Page$Game$RevealSelectedCell)
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('Reveal Square')
				])),
			A2(
			author$project$Page$Game$ourButton,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Page$Game$RevealSelectedWord)
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('Reveal Word')
				])),
			A2(
			author$project$Page$Game$ourButton,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Page$Game$RevealPuzzle)
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('Reveal Puzzle')
				]))
		]));
var author$project$Styles$toolbar = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$marginBottom(
			rtfeldman$elm_css$Css$px(16)),
			rtfeldman$elm_css$Css$marginTop(
			rtfeldman$elm_css$Css$px(16))
		]));
var author$project$View$Board$svgScale = 10;
var author$project$View$Board$boardTransformToCssTransform = F2(
	function (bg, _n0) {
		var viewboxW = _n0.a;
		var viewboxH = _n0.b;
		var translateY2 = elm$core$String$fromFloat(bg.bn * author$project$View$Board$svgScale);
		var translateX2 = elm$core$String$fromFloat(bg.bm * author$project$View$Board$svgScale);
		var sy = bg.eJ;
		var sx = bg.eJ;
		var matrix = F6(
			function (a, b, c, d, e, f) {
				return 'matrix(' + (A2(
					elm$core$String$join,
					',',
					A2(
						elm$core$List$map,
						elm$core$String$fromFloat,
						_List_fromArray(
							[a, b, c, d, e, f]))) + ')');
			});
		var cy = viewboxH / 2;
		var cx = viewboxH / 2;
		return A2(
			elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A6(matrix, sx, 0, 0, sy, cx - (sx * cx), cy - (sy * cy)),
					'translate(' + (translateX2 + (', ' + (translateY2 + ')')))
				]));
	});
var elm_community$list_extra$List$Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2(elm$core$List$drop, step, xs);
		var thisGroup = A2(elm$core$List$take, size, xs);
		var okayLength = _Utils_eq(
			size,
			elm$core$List$length(thisGroup));
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayLength) ? A2(
			elm$core$List$cons,
			thisGroup,
			A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var elm_community$list_extra$List$Extra$groupsOf = F2(
	function (size, xs) {
		return A3(elm_community$list_extra$List$Extra$groupsOfWithStep, size, size, xs);
	});
var author$project$Data$Grid$to2DList = function (_n0) {
	var grid = _n0;
	return A2(
		elm_community$list_extra$List$Extra$groupsOf,
		grid.w,
		elm$core$Array$toList(grid.x));
};
var author$project$Styles$colorToRgbString = function (_n0) {
	var red = _n0.eE;
	var green = _n0.dU;
	var blue = _n0.ds;
	return 'rgb(' + (elm$core$String$fromInt(red) + (',' + (elm$core$String$fromInt(green) + (',' + (elm$core$String$fromInt(blue) + ')')))));
};
var author$project$View$Board$viewboxDimensions = function (grid) {
	return _Utils_Tuple2(
		author$project$Data$Grid$width(grid) * author$project$View$Board$svgScale,
		author$project$Data$Grid$height(grid) * author$project$View$Board$svgScale);
};
var rtfeldman$elm_css$Css$fontSize = rtfeldman$elm_css$Css$prop1('font-size');
var rtfeldman$elm_css$Svg$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
var rtfeldman$elm_css$Svg$Styled$text_ = rtfeldman$elm_css$Svg$Styled$node('text');
var rtfeldman$elm_css$Svg$Styled$Internal$css = function (styles) {
	var classname = rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classAttribute = A2(elm$virtual_dom$VirtualDom$attribute, 'class', classname);
	return A3(rtfeldman$elm_css$VirtualDom$Styled$Attribute, classAttribute, styles, classname);
};
var rtfeldman$elm_css$Svg$Styled$Attributes$css = rtfeldman$elm_css$Svg$Styled$Internal$css;
var rtfeldman$elm_css$Svg$Styled$Attributes$textAnchor = rtfeldman$elm_css$VirtualDom$Styled$attribute('text-anchor');
var rtfeldman$elm_css$Svg$Styled$Events$onMouseDown = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'mousedown',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$View$Board$viewCell = F8(
	function (onCellClicked, clueIndicesVisible, selectionVisible, board, puzzle, y, x, cell) {
		var point = _Utils_Tuple2(x, y);
		var wordStartNumber = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.dy;
			},
			A2(
				elm_community$list_extra$List$Extra$find,
				function (ws) {
					return _Utils_eq(ws.br, point);
				},
				puzzle.bY));
		var isWordStart = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.z;
			},
			A2(
				elm_community$list_extra$List$Extra$find,
				function (ws) {
					return _Utils_eq(ws.br, point);
				},
				puzzle.bY));
		var isSelected = _Utils_eq(board.M.P, point);
		var _n0 = author$project$View$Board$viewboxDimensions(puzzle.m);
		var viewboxWidth = _n0.a;
		var viewboxHeight = _n0.b;
		var h = (viewboxHeight / author$project$Data$Grid$height(puzzle.m)) | 0;
		var w = (viewboxWidth / author$project$Data$Grid$width(puzzle.m)) | 0;
		return elm$core$List$concat(
			_List_fromArray(
				[
					function () {
					if (cell.$ === 1) {
						var _char = cell.a;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Svg$Styled$rect,
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$Events$onMouseDown(
										onCellClicked(point)),
										rtfeldman$elm_css$Svg$Styled$Attributes$width(
										elm$core$String$fromInt(w)),
										rtfeldman$elm_css$Svg$Styled$Attributes$height(
										elm$core$String$fromInt(h)),
										rtfeldman$elm_css$Svg$Styled$Attributes$stroke('black'),
										rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth('.5'),
										rtfeldman$elm_css$Svg$Styled$Attributes$x(
										elm$core$String$fromInt(x * w)),
										rtfeldman$elm_css$Svg$Styled$Attributes$y(
										elm$core$String$fromInt(y * h)),
										rtfeldman$elm_css$Svg$Styled$Attributes$css(
										_List_fromArray(
											[
												A2(rtfeldman$elm_css$Css$property, 'touch-action', 'manipulation'),
												A2(rtfeldman$elm_css$Css$property, '-webkit-tap-highlight-color', 'transparent')
											])),
										(selectionVisible && isSelected) ? rtfeldman$elm_css$Svg$Styled$Attributes$fill(
										author$project$Styles$colorToRgbString(author$project$Styles$colors.eN)) : ((selectionVisible && A3(author$project$Data$Board$isSelectedWord, point, puzzle, board)) ? rtfeldman$elm_css$Svg$Styled$Attributes$fill(
										author$project$Styles$colorToRgbString(author$project$Styles$colors.c0)) : rtfeldman$elm_css$Svg$Styled$Attributes$fill('white'))
									]),
								_List_Nil),
								A2(
								rtfeldman$elm_css$Svg$Styled$text_,
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$Attributes$css(
										_List_fromArray(
											[
												rtfeldman$elm_css$Css$fontSize(
												rtfeldman$elm_css$Css$px(5)),
												A2(rtfeldman$elm_css$Css$property, 'pointer-events', 'none')
											])),
										rtfeldman$elm_css$Svg$Styled$Attributes$x(
										elm$core$String$fromInt((x * w) + 5)),
										rtfeldman$elm_css$Svg$Styled$Attributes$y(
										elm$core$String$fromInt((y * h) + 8)),
										rtfeldman$elm_css$Svg$Styled$Attributes$textAnchor('middle'),
										rtfeldman$elm_css$Svg$Styled$Attributes$width(
										elm$core$String$fromInt(w)),
										rtfeldman$elm_css$Svg$Styled$Attributes$height(
										elm$core$String$fromInt(h))
									]),
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$text(
										elm$core$String$fromChar(_char))
									]))
							]);
					} else {
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Svg$Styled$rect,
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$Attributes$width(
										elm$core$String$fromInt(w)),
										rtfeldman$elm_css$Svg$Styled$Attributes$height(
										elm$core$String$fromInt(h)),
										rtfeldman$elm_css$Svg$Styled$Attributes$fill('black'),
										rtfeldman$elm_css$Svg$Styled$Attributes$stroke('black'),
										rtfeldman$elm_css$Svg$Styled$Attributes$x(
										elm$core$String$fromInt(x * w)),
										rtfeldman$elm_css$Svg$Styled$Attributes$y(
										elm$core$String$fromInt(y * h)),
										rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth('.5')
									]),
								_List_Nil)
							]);
					}
				}(),
					function () {
					var _n2 = _Utils_Tuple2(clueIndicesVisible, wordStartNumber);
					if (_n2.a && (!_n2.b.$)) {
						var n = _n2.b.a;
						return _List_fromArray(
							[
								A2(
								rtfeldman$elm_css$Svg$Styled$text_,
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$Attributes$css(
										_List_fromArray(
											[
												rtfeldman$elm_css$Css$fontSize(
												rtfeldman$elm_css$Css$px(3)),
												A2(rtfeldman$elm_css$Css$property, 'pointer-events', 'none')
											])),
										rtfeldman$elm_css$Svg$Styled$Attributes$x(
										elm$core$String$fromInt((x * w) + 1)),
										rtfeldman$elm_css$Svg$Styled$Attributes$y(
										elm$core$String$fromInt((y * h) + 3))
									]),
								_List_fromArray(
									[
										rtfeldman$elm_css$Svg$Styled$text(
										elm$core$String$fromInt(n))
									]))
							]);
					} else {
						return _List_Nil;
					}
				}()
				]));
	});
var author$project$View$Board$viewRow = F7(
	function (onCellClicked, clueIndicesVisible, selectionVisible, board, puzzle, y, row) {
		return elm$core$List$concat(
			A2(
				elm$core$List$indexedMap,
				A6(author$project$View$Board$viewCell, onCellClicked, clueIndicesVisible, selectionVisible, board, puzzle, y),
				row));
	});
var author$project$View$Board$lazyThing = F5(
	function (onCellClicked, clueIndicesVisible, selectionVisible, board, puzzle) {
		return A2(
			rtfeldman$elm_css$Svg$Styled$g,
			_List_Nil,
			elm$core$List$concat(
				A2(
					elm$core$List$indexedMap,
					A5(author$project$View$Board$viewRow, onCellClicked, clueIndicesVisible, selectionVisible, board, puzzle),
					A2(
						elm$core$List$map,
						elm$core$List$filterMap(elm$core$Basics$identity),
						author$project$Data$Grid$to2DList(board.m)))));
	});
var elm$virtual_dom$VirtualDom$lazy6 = _VirtualDom_lazy6;
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_n0, styles) {
		var newStyles = _n0.b;
		var classname = _n0.c;
		return elm$core$List$isEmpty(newStyles) ? styles : A3(elm$core$Dict$insert, classname, newStyles, styles);
	});
var rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_n0) {
	var val = _n0.a;
	return val;
};
var rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_n6, _n7) {
		var key = _n6.a;
		var html = _n6.b;
		var pairs = _n7.a;
		var styles = _n7.b;
		switch (html.$) {
			case 4:
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 0:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n9 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n9.a;
				var finalStyles = _n9.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 1:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n10 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n10.a;
				var finalStyles = _n10.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 2:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n11 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n11.a;
				var finalStyles = _n11.b;
				var vdom = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n12 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n12.a;
				var finalStyles = _n12.b;
				var vdom = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _n0) {
		var nodes = _n0.a;
		var styles = _n0.b;
		switch (html.$) {
			case 4:
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					styles);
			case 0:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n2 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n2.a;
				var finalStyles = _n2.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 1:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n3 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n3.a;
				var finalStyles = _n3.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 2:
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n4 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n4.a;
				var finalStyles = _n4.b;
				var vdomNode = A3(
					elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _n5 = A3(
					elm$core$List$foldl,
					rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _n5.a;
				var finalStyles = _n5.b;
				var vdomNode = A4(
					elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _n1 = properties.a;
				var styles = _n1.b;
				var classname = _n1.c;
				var rest = properties.b;
				if (elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _n0 = A2(rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, elm$core$Maybe$Nothing, properties);
	if (_n0.$ === 1) {
		return elm$core$Dict$empty;
	} else {
		var _n1 = _n0.a;
		var classname = _n1.a;
		var styles = _n1.b;
		return A2(elm$core$Dict$singleton, classname, styles);
	}
};
var rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 0, a: a};
};
var rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_n0) {
	var classname = _n0.a;
	var styles = _n0.b;
	return A2(
		rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		elm$core$List$singleton(
			rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					elm$core$List$map,
					rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					elm$core$Dict$toList(dict)))));
};
var rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		elm$core$List$singleton(
			elm$virtual_dom$VirtualDom$text(
				rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _n1 = pairs.a;
				var str = _n1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _n1 = pairs.a;
				var firstKey = _n1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2(rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2(rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _n0.a;
		var styles = _n0.b;
		var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				keyedStyleNode,
				elm$core$List$reverse(keyedChildNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _n0 = A3(
			elm$core$List$foldl,
			rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _n0.a;
		var styles = _n0.b;
		var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				elm$core$List$cons,
				styleNode,
				elm$core$List$reverse(childNodes)));
	});
var rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 4:
			var plainNode = vdom.a;
			return plainNode;
		case 0:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 1:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 2:
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var rtfeldman$elm_css$VirtualDom$Styled$lazyHelp5 = F6(
	function (fn, arg1, arg2, arg3, arg4, arg5) {
		return rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			A5(fn, arg1, arg2, arg3, arg4, arg5));
	});
var rtfeldman$elm_css$VirtualDom$Styled$lazy5 = F6(
	function (fn, arg1, arg2, arg3, arg4, arg5) {
		return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A7(elm$virtual_dom$VirtualDom$lazy6, rtfeldman$elm_css$VirtualDom$Styled$lazyHelp5, fn, arg1, arg2, arg3, arg4, arg5));
	});
var rtfeldman$elm_css$Html$Styled$Lazy$lazy5 = rtfeldman$elm_css$VirtualDom$Styled$lazy5;
var rtfeldman$elm_css$Svg$Styled$Attributes$id = rtfeldman$elm_css$VirtualDom$Styled$attribute('id');
var rtfeldman$elm_css$Svg$Styled$Attributes$transform = rtfeldman$elm_css$VirtualDom$Styled$attribute('transform');
var author$project$View$Board$view = F2(
	function (boardTransform, config) {
		var puzzle = config.i;
		var board = config.f;
		var _n0 = author$project$View$Board$viewboxDimensions(puzzle.m);
		var viewboxWidth = _n0.a;
		var viewboxHeight = _n0.b;
		return A2(
			rtfeldman$elm_css$Svg$Styled$svg,
			_List_fromArray(
				[
					rtfeldman$elm_css$Svg$Styled$Attributes$viewBox(
					'-2 -2 ' + (elm$core$String$fromInt(viewboxWidth + 4) + (' ' + elm$core$String$fromInt(viewboxHeight + 4)))),
					rtfeldman$elm_css$Svg$Styled$Attributes$id('game-grid'),
					rtfeldman$elm_css$Svg$Styled$Attributes$css(
					_List_fromArray(
						[
							A2(rtfeldman$elm_css$Css$property, 'pointer-events', 'all')
						]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Svg$Styled$g,
					_List_fromArray(
						[
							rtfeldman$elm_css$Svg$Styled$Attributes$transform(
							A2(
								author$project$View$Board$boardTransformToCssTransform,
								boardTransform,
								_Utils_Tuple2(viewboxWidth, viewboxHeight)))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Svg$Styled$rect,
							_List_fromArray(
								[
									rtfeldman$elm_css$Svg$Styled$Attributes$width(
									elm$core$String$fromInt(viewboxWidth + 2)),
									rtfeldman$elm_css$Svg$Styled$Attributes$height(
									elm$core$String$fromInt(viewboxHeight + 2)),
									rtfeldman$elm_css$Svg$Styled$Attributes$x('-1'),
									rtfeldman$elm_css$Svg$Styled$Attributes$y('-1'),
									rtfeldman$elm_css$Svg$Styled$Attributes$fill('none'),
									rtfeldman$elm_css$Svg$Styled$Attributes$stroke('black'),
									rtfeldman$elm_css$Svg$Styled$Attributes$strokeWidth('2')
								]),
							_List_Nil),
							A6(rtfeldman$elm_css$Html$Styled$Lazy$lazy5, author$project$View$Board$lazyThing, config.eq, config.eO, config.dx, config.f, config.i)
						]))
				]));
	});
var rtfeldman$elm_css$Css$block = {n: 0, X: 'block'};
var rtfeldman$elm_css$Css$relative = {a1: 0, X: 'relative'};
var rtfeldman$elm_css$Css$spaceAround = rtfeldman$elm_css$Css$prop1('space-around');
var author$project$Page$Game$viewCrossword = F2(
	function (probablyMobile, gameState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							rtfeldman$elm_css$Css$displayFlex,
							rtfeldman$elm_css$Css$flexDirection(rtfeldman$elm_css$Css$column),
							rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
							rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
						]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									A2(
									author$project$Styles$ifMobileElse,
									_List_fromArray(
										[author$project$Styles$widths.a0]),
									_List_fromArray(
										[author$project$Styles$widths.cJ]))
								]))
						]),
					_List_fromArray(
						[
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[author$project$Styles$hideOnMobile]))
								]),
							_List_fromArray(
								[
									author$project$Page$Game$viewMetadata(gameState.i.d7),
									rtfeldman$elm_css$Html$Styled$text(
									author$project$Data$TimeFormat$formatSeconds(gameState.N))
								])),
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[author$project$Styles$toolbar]))
								]),
							_List_fromArray(
								[author$project$Page$Game$viewToolbar])),
							A2(
							rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											rtfeldman$elm_css$Css$displayFlex,
											rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center)
										]))
								]),
							_List_fromArray(
								[
									A2(
									rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											rtfeldman$elm_css$Html$Styled$Attributes$css(
											_List_fromArray(
												[author$project$Styles$widths.a0]))
										]),
									_List_fromArray(
										[
											A2(author$project$Page$Game$viewSelectedClue, gameState.i, gameState.f),
											A3(
											author$project$Page$Game$hammerIf,
											probablyMobile,
											_List_fromArray(
												[
													rtfeldman$elm_css$Html$Styled$Attributes$css(
													_List_fromArray(
														[
															rtfeldman$elm_css$Css$marginTop(
															rtfeldman$elm_css$Css$px(15)),
															rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$block),
															rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
															A2(rtfeldman$elm_css$Css$property, 'pointer-events', 'none')
														]))
												]),
											_List_fromArray(
												[
													A2(
													author$project$View$Board$view,
													gameState.L,
													{f: gameState.f, dx: true, eq: author$project$Page$Game$OnCellClick, i: gameState.i, eO: true})
												])),
											A2(
											rtfeldman$elm_css$Html$Styled$div,
											_List_fromArray(
												[
													rtfeldman$elm_css$Html$Styled$Attributes$css(
													_List_fromArray(
														[
															rtfeldman$elm_css$Css$displayFlex,
															rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$spaceAround),
															rtfeldman$elm_css$Css$marginTop(
															rtfeldman$elm_css$Css$rem(0.5))
														]))
												]),
											_List_fromArray(
												[
													A2(
													author$project$Page$Game$ourButton,
													_List_fromArray(
														[
															rtfeldman$elm_css$Html$Styled$Events$onClick(
															author$project$Page$Game$OnKeyPress(author$project$Page$Game$UndoKey))
														]),
													_List_fromArray(
														[
															rtfeldman$elm_css$Html$Styled$text('undo')
														])),
													A2(
													author$project$Page$Game$ourButton,
													_List_fromArray(
														[
															rtfeldman$elm_css$Html$Styled$Events$onClick(
															author$project$Page$Game$OnKeyPress(author$project$Page$Game$RedoKey))
														]),
													_List_fromArray(
														[
															rtfeldman$elm_css$Html$Styled$text('redo')
														]))
												]))
										])),
									A2(
									rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											rtfeldman$elm_css$Html$Styled$Attributes$css(
											_List_fromArray(
												[
													rtfeldman$elm_css$Css$marginLeft(
													rtfeldman$elm_css$Css$px(40)),
													author$project$Styles$hideOnMobile,
													author$project$Styles$widths.a0
												]))
										]),
									_List_fromArray(
										[
											A2(author$project$Page$Game$viewClues, gameState.i, gameState.f)
										]))
								]))
						]))
				]));
	});
var author$project$Page$Game$viewGameEnd = F2(
	function (isProbablyMobile, gameState) {
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									rtfeldman$elm_css$Css$displayFlex,
									rtfeldman$elm_css$Css$flexDirection(rtfeldman$elm_css$Css$column),
									rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
									rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
									rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.d5),
									rtfeldman$elm_css$Css$padding(
									rtfeldman$elm_css$Css$px(16))
								]))
						]),
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text(
							'Puzzle completed in ' + (author$project$Data$TimeFormat$formatSeconds(gameState.N) + '!'))
						])),
					A2(
					author$project$Page$Game$viewCrossword,
					isProbablyMobile,
					{f: gameState.f, L: gameState.L, i: gameState.i, N: gameState.N})
				]));
	});
var author$project$Page$Game$OnGameStart = {$: 2};
var rtfeldman$elm_css$Css$paddingBottom = rtfeldman$elm_css$Css$prop1('padding-bottom');
var author$project$Page$Game$viewGameStart = function (gameState) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$flexDirection(rtfeldman$elm_css$Css$column),
						rtfeldman$elm_css$Css$justifyContent(rtfeldman$elm_css$Css$center),
						rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
					]))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								A2(
								author$project$Styles$ifMobileElse,
								_List_fromArray(
									[author$project$Styles$widths.ez]),
								_List_fromArray(
									[author$project$Styles$widths.cJ])),
								rtfeldman$elm_css$Css$paddingBottom(
								rtfeldman$elm_css$Css$px(193))
							]))
					]),
				_List_fromArray(
					[
						author$project$Page$Game$viewMetadata(gameState.i.d7),
						A2(
						author$project$Page$Game$ourButton,
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Page$Game$OnGameStart),
								rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										rtfeldman$elm_css$Css$padding(
										rtfeldman$elm_css$Css$px(20)),
										rtfeldman$elm_css$Css$marginTop(
										rtfeldman$elm_css$Css$px(16))
									]))
							]),
						_List_fromArray(
							[
								rtfeldman$elm_css$Html$Styled$text('Begin')
							]))
					]))
			]));
};
var author$project$Page$Game$viewGame = F2(
	function (game, probablyMobile) {
		switch (game.$) {
			case 1:
				var gameState = game.a;
				return author$project$Page$Game$viewGameStart(gameState);
			case 2:
				var gameState = game.a;
				return A2(author$project$Page$Game$viewCrossword, probablyMobile, gameState);
			case 3:
				var gameState = game.a;
				return A2(author$project$Page$Game$viewGameEnd, probablyMobile, gameState);
			case 0:
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text('loading...')
						]));
			default:
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_Nil,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$text('Failed to load puzzle! ')
						]));
		}
	});
var author$project$Styles$fontSizes = {
	d4: rtfeldman$elm_css$Css$px(18),
	eG: rtfeldman$elm_css$Css$px(16),
	c2: rtfeldman$elm_css$Css$px(14),
	dj: rtfeldman$elm_css$Css$px(21),
	e$: rtfeldman$elm_css$Css$px(12)
};
var author$project$Styles$justifyContentCenter = A2(rtfeldman$elm_css$Css$property, 'justify-content', 'center');
var author$project$Styles$justifyContentSpaceBetween = A2(rtfeldman$elm_css$Css$property, 'justify-content', 'space-between');
var author$project$Styles$noSelection = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			A2(rtfeldman$elm_css$Css$property, '-webkit-user-select', 'none'),
			A2(rtfeldman$elm_css$Css$property, '-moz-user-select', 'none'),
			A2(rtfeldman$elm_css$Css$property, '-ms-user-select', 'none'),
			A2(rtfeldman$elm_css$Css$property, 'user-select', 'none')
		]));
var author$project$Styles$touchActionManipulation = A2(rtfeldman$elm_css$Css$property, 'touch-action', 'manipulation');
var rtfeldman$elm_css$Css$borderRadius = rtfeldman$elm_css$Css$prop1('border-radius');
var rtfeldman$elm_css$Css$bottom = rtfeldman$elm_css$Css$prop1('bottom');
var rtfeldman$elm_css$Css$prop4 = F5(
	function (key, argA, argB, argC, argD) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.X, argB.X, argC.X, argD.X])));
	});
var rtfeldman$elm_css$Css$boxShadow4 = rtfeldman$elm_css$Css$prop4('box-shadow');
var rtfeldman$elm_css$Css$prop5 = F6(
	function (key, argA, argB, argC, argD, argE) {
		return A2(
			rtfeldman$elm_css$Css$property,
			key,
			A2(
				elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.X, argB.X, argC.X, argD.X, argE.X])));
	});
var rtfeldman$elm_css$Css$boxShadow5 = rtfeldman$elm_css$Css$prop5('box-shadow');
var rtfeldman$elm_css$Css$fixed = {aV: 0, a1: 0, by: 0, X: 'fixed'};
var rtfeldman$elm_css$Css$height = rtfeldman$elm_css$Css$prop1('height');
var rtfeldman$elm_css$Css$left = rtfeldman$elm_css$Css$prop1('left');
var rtfeldman$elm_css$Css$paddingTop = rtfeldman$elm_css$Css$prop1('padding-top');
var rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2(elm$core$String$join, ', ', args) + ')'));
	});
var rtfeldman$elm_css$Css$rgba = F4(
	function (r, g, b, alpha) {
		return {
			aU: alpha,
			ds: b,
			U: 0,
			dU: g,
			eE: r,
			X: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'rgba',
				_Utils_ap(
					A2(
						elm$core$List$map,
						elm$core$String$fromInt,
						_List_fromArray(
							[r, g, b])),
					_List_fromArray(
						[
							elm$core$String$fromFloat(alpha)
						])))
		};
	});
var author$project$Styles$keyboard = {
	dp: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$displayFlex,
				rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center)
			])),
	dz: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$displayFlex,
				author$project$Styles$justifyContentSpaceBetween,
				rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
				rtfeldman$elm_css$Css$fontSize(author$project$Styles$fontSizes.c2),
				rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.c0),
				rtfeldman$elm_css$Css$padding(
				rtfeldman$elm_css$Css$px(8))
			])),
	dA: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
				rtfeldman$elm_css$Css$width(
				rtfeldman$elm_css$Css$pct(100)),
				rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.bJ),
				rtfeldman$elm_css$Css$bottom(
				rtfeldman$elm_css$Css$px(0)),
				rtfeldman$elm_css$Css$left(
				rtfeldman$elm_css$Css$px(0)),
				rtfeldman$elm_css$Css$paddingBottom(
				rtfeldman$elm_css$Css$px(5)),
				author$project$Styles$noSelection,
				author$project$Styles$touchActionManipulation
			])),
	d2: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.bX),
				rtfeldman$elm_css$Css$width(
				rtfeldman$elm_css$Css$pct(9)),
				rtfeldman$elm_css$Css$margin(
				rtfeldman$elm_css$Css$px(3)),
				rtfeldman$elm_css$Css$height(
				rtfeldman$elm_css$Css$px(40)),
				rtfeldman$elm_css$Css$displayFlex,
				author$project$Styles$justifyContentCenter,
				rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
				rtfeldman$elm_css$Css$borderRadius(
				rtfeldman$elm_css$Css$px(3)),
				rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
				A4(
				rtfeldman$elm_css$Css$boxShadow4,
				rtfeldman$elm_css$Css$px(0),
				rtfeldman$elm_css$Css$px(2),
				rtfeldman$elm_css$Css$px(0),
				A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.1))
			])),
	d3: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$padding(
				rtfeldman$elm_css$Css$px(5))
			])),
	ed: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[
				rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
				rtfeldman$elm_css$Css$height(
				rtfeldman$elm_css$Css$px(90)),
				rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.bX),
				author$project$Styles$widths.a0,
				rtfeldman$elm_css$Css$displayFlex,
				author$project$Styles$justifyContentCenter,
				rtfeldman$elm_css$Css$borderRadius(
				rtfeldman$elm_css$Css$px(3)),
				rtfeldman$elm_css$Css$paddingTop(
				rtfeldman$elm_css$Css$px(6)),
				rtfeldman$elm_css$Css$bottom(
				rtfeldman$elm_css$Css$px(0)),
				A3(
				rtfeldman$elm_css$Css$border3,
				rtfeldman$elm_css$Css$px(1),
				rtfeldman$elm_css$Css$solid,
				author$project$Styles$colors.bJ),
				A5(
				rtfeldman$elm_css$Css$boxShadow5,
				rtfeldman$elm_css$Css$px(0),
				rtfeldman$elm_css$Css$px(0),
				rtfeldman$elm_css$Css$px(2),
				rtfeldman$elm_css$Css$px(2),
				A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.1)),
				rtfeldman$elm_css$Css$fontSize(author$project$Styles$fontSizes.dj)
			])),
	eI: rtfeldman$elm_css$Css$batch(
		_List_fromArray(
			[rtfeldman$elm_css$Css$displayFlex, author$project$Styles$justifyContentCenter]))
};
var author$project$View$Keyboard$OnTouchEnd = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$View$Keyboard$OnTouchStart = function (a) {
	return {$: 0, a: a};
};
var author$project$View$Keyboard$onTouchEnd = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'touchend',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$View$Keyboard$onTouchStart = function (msg) {
	return A2(
		rtfeldman$elm_css$Html$Styled$Events$on,
		'touchstart',
		elm$json$Json$Decode$succeed(msg));
};
var elm$core$Char$toUpper = _Char_toUpper;
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var feathericons$elm_feather$FeatherIcons$chevronLeft = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-left',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$polyline,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$points('15 18 9 12 15 6')
				]),
			_List_Nil)
		]));
var feathericons$elm_feather$FeatherIcons$chevronRight = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-right',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$polyline,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$points('9 18 15 12 9 6')
				]),
			_List_Nil)
		]));
var elm$svg$Svg$path = elm$svg$Svg$trustedNode('path');
var elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var feathericons$elm_feather$FeatherIcons$delete = A2(
	feathericons$elm_feather$FeatherIcons$makeBuilder,
	'delete',
	_List_fromArray(
		[
			A2(
			elm$svg$Svg$path,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$d('M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z')
				]),
			_List_Nil),
			A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('18'),
					elm$svg$Svg$Attributes$y1('9'),
					elm$svg$Svg$Attributes$x2('12'),
					elm$svg$Svg$Attributes$y2('15')
				]),
			_List_Nil),
			A2(
			elm$svg$Svg$line,
			_List_fromArray(
				[
					elm$svg$Svg$Attributes$x1('12'),
					elm$svg$Svg$Attributes$y1('9'),
					elm$svg$Svg$Attributes$x2('18'),
					elm$svg$Svg$Attributes$y2('15')
				]),
			_List_Nil)
		]));
var feathericons$elm_feather$FeatherIcons$withSize = F2(
	function (size, _n0) {
		var attrs = _n0.y;
		var src = _n0.a;
		return {
			y: _Utils_update(
				attrs,
				{bR: size}),
			a: src
		};
	});
var feathericons$elm_feather$FeatherIcons$withSizeUnit = F2(
	function (sizeUnit, _n0) {
		var attrs = _n0.y;
		var src = _n0.a;
		return {
			y: _Utils_update(
				attrs,
				{a3: sizeUnit}),
			a: src
		};
	});
var author$project$View$Keyboard$lazyView = F2(
	function (state, config) {
		var viewDeleteKey = A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[author$project$Styles$keyboard.d2])),
					author$project$View$Keyboard$onTouchEnd(config.es)
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$fromUnstyled(
					A2(
						feathericons$elm_feather$FeatherIcons$toHtml,
						_List_Nil,
						A2(
							feathericons$elm_feather$FeatherIcons$withSizeUnit,
							'%',
							A2(feathericons$elm_feather$FeatherIcons$withSize, 50, feathericons$elm_feather$FeatherIcons$delete))))
				]));
		var viewCharKey = function (_char) {
			var touched = A2(elm$core$Set$member, _char, state.bA);
			var mushroom = A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$keyboard.ed]))
					]),
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text(
						elm$core$String$fromChar(_char))
					]));
			return A2(
				rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$keyboard.d2])),
						author$project$View$Keyboard$onTouchEnd(
						config.eV(
							A2(
								author$project$View$Keyboard$OnTouchEnd,
								_char,
								config.et(_char)))),
						author$project$View$Keyboard$onTouchStart(
						config.eV(
							author$project$View$Keyboard$OnTouchStart(_char)))
					]),
				_List_fromArray(
					[
						touched ? mushroom : rtfeldman$elm_css$Html$Styled$text(
						elm$core$String$fromChar(_char))
					]));
		};
		var viewKeys = function () {
			var viewKeyRow = function (row) {
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[author$project$Styles$keyboard.eI]))
						]),
					row);
			};
			var thirdRow = 'zxcvbnm';
			var stringToKeys = function (str) {
				return A2(
					elm$core$List$map,
					A2(elm$core$Basics$composeR, elm$core$Char$toUpper, viewCharKey),
					elm$core$String$toList(str));
			};
			var secondRow = 'asdfghjkl';
			var firstRow = 'qwertyuiop';
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$keyboard.d3]))
					]),
				_List_fromArray(
					[
						viewKeyRow(
						stringToKeys(firstRow)),
						viewKeyRow(
						stringToKeys(secondRow)),
						viewKeyRow(
						_Utils_ap(
							stringToKeys(thirdRow),
							_List_fromArray(
								[viewDeleteKey])))
					]));
		}();
		var chevronRight = rtfeldman$elm_css$Html$Styled$fromUnstyled(
			A2(feathericons$elm_feather$FeatherIcons$toHtml, _List_Nil, feathericons$elm_feather$FeatherIcons$chevronRight));
		var chevronLeft = rtfeldman$elm_css$Html$Styled$fromUnstyled(
			A2(feathericons$elm_feather$FeatherIcons$toHtml, _List_Nil, feathericons$elm_feather$FeatherIcons$chevronLeft));
		var arrow = F2(
			function (isLeft, msg) {
				return A2(
					rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[author$project$Styles$keyboard.dp])),
							rtfeldman$elm_css$Html$Styled$Events$onClick(msg)
						]),
					_List_fromArray(
						[
							isLeft ? chevronLeft : chevronRight
						]));
			});
		var viewClueBar = function (maybeClue) {
			return A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$keyboard.dz]))
					]),
				_List_fromArray(
					[
						A2(arrow, true, config.eo),
						function () {
						if (!maybeClue.$) {
							var id = maybeClue.a.bh;
							var clue = maybeClue.a.dw;
							return A2(
								rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[author$project$Styles$widths.a0])),
										rtfeldman$elm_css$Html$Styled$Events$onClick(config.er)
									]),
								_List_fromArray(
									[
										A2(
										rtfeldman$elm_css$Html$Styled$b,
										_List_Nil,
										_List_fromArray(
											[
												rtfeldman$elm_css$Html$Styled$text(
												author$project$Data$Puzzle$clueIdToDisplayString(id))
											])),
										rtfeldman$elm_css$Html$Styled$text(' ' + clue)
									]));
						} else {
							return A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
						}
					}(),
						A2(arrow, false, config.ep)
					]));
		};
		return A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[author$project$Styles$keyboard.dA]))
				]),
			_List_fromArray(
				[
					viewClueBar(config.dw),
					viewKeys
				]));
	});
var elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2 = F3(
	function (fn, arg1, arg2) {
		return rtfeldman$elm_css$VirtualDom$Styled$toUnstyled(
			A2(fn, arg1, arg2));
	});
var rtfeldman$elm_css$VirtualDom$Styled$lazy2 = F3(
	function (fn, arg1, arg2) {
		return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
			A4(elm$virtual_dom$VirtualDom$lazy3, rtfeldman$elm_css$VirtualDom$Styled$lazyHelp2, fn, arg1, arg2));
	});
var rtfeldman$elm_css$Html$Styled$Lazy$lazy2 = rtfeldman$elm_css$VirtualDom$Styled$lazy2;
var author$project$View$Keyboard$view = F2(
	function (state, config) {
		return A3(rtfeldman$elm_css$Html$Styled$Lazy$lazy2, author$project$View$Keyboard$lazyView, state, config);
	});
var author$project$Page$Game$view = F2(
	function (session, model) {
		return {
			bF: A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2(author$project$Page$Game$hijackOn, 'drop', author$project$Page$Game$dropDecoder),
						A2(
						author$project$Page$Game$hijackOn,
						'dragover',
						elm$json$Json$Decode$succeed(author$project$Page$Game$NoOp)),
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Styles$fonts.dr]))
					]),
				_List_fromArray(
					[
						A2(author$project$Page$Game$viewGame, model.am, session.cN),
						function () {
						var _n0 = _Utils_Tuple2(model.am, session.cN);
						if ((_n0.a.$ === 2) && _n0.b) {
							var board = _n0.a.a.f;
							var puzzle = _n0.a.a.i;
							var keyboardState = _n0.a.a.aX;
							return A2(
								author$project$View$Keyboard$view,
								keyboardState,
								{
									dw: A2(author$project$Data$Board$selectedClue, puzzle, board),
									eo: author$project$Page$Game$OnKeyPress(
										author$project$Page$Game$CycleSelectedClueKey(1)),
									ep: author$project$Page$Game$OnKeyPress(
										author$project$Page$Game$CycleSelectedClueKey(0)),
									er: author$project$Page$Game$OnCellClick(board.M.P),
									es: author$project$Page$Game$OnKeyPress(author$project$Page$Game$DeleteKey),
									et: function (_char) {
										return author$project$Page$Game$OnKeyPress(
											author$project$Page$Game$LetterKey(_char));
									},
									eV: author$project$Page$Game$OnKeyboardMsg
								});
						} else {
							return A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
						}
					}()
					])),
			eU: 'Game'
		};
	});
var author$project$Page$Home$NoOp = {$: 1};
var rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 2, a: a};
};
var rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var rtfeldman$elm_css$Css$hover = rtfeldman$elm_css$Css$pseudoClass('hover');
var rtfeldman$elm_css$Css$maxWidth = rtfeldman$elm_css$Css$prop1('max-width');
var rtfeldman$elm_css$Css$minWidth = rtfeldman$elm_css$Css$prop1('min-width');
var rtfeldman$elm_css$Css$scale = function (x) {
	return {
		k: 0,
		X: A2(
			rtfeldman$elm_css$Css$cssFunction,
			'scale',
			_List_fromArray(
				[
					elm$core$String$fromFloat(x)
				]))
	};
};
var rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return elm$core$List$isEmpty(list) ? {X: 'none'} : {
		X: A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				function ($) {
					return $.X;
				},
				list))
	};
};
var rtfeldman$elm_css$Css$transforms = A2(
	elm$core$Basics$composeL,
	rtfeldman$elm_css$Css$prop1('transform'),
	rtfeldman$elm_css$Css$valuesOrNone);
var rtfeldman$elm_css$Css$transform = function (only) {
	return rtfeldman$elm_css$Css$transforms(
		_List_fromArray(
			[only]));
};
var rtfeldman$elm_css$Css$Transitions$BoxShadow = 25;
var rtfeldman$elm_css$Css$Transitions$Transition = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Transitions$fullTransition = F4(
	function (animation, duration, delay, timing) {
		return {
			ba: animation,
			be: elm$core$Maybe$Just(delay),
			cg: duration,
			bz: elm$core$Maybe$Just(timing)
		};
	});
var rtfeldman$elm_css$Css$Transitions$boxShadow3 = rtfeldman$elm_css$Css$Transitions$fullTransition(25);
var rtfeldman$elm_css$Css$Transitions$EaseOut = {$: 3};
var rtfeldman$elm_css$Css$Transitions$easeOut = rtfeldman$elm_css$Css$Transitions$EaseOut;
var rtfeldman$elm_css$Css$Transitions$Transform = 89;
var rtfeldman$elm_css$Css$Transitions$transform3 = rtfeldman$elm_css$Css$Transitions$fullTransition(89);
var rtfeldman$elm_css$Css$Transitions$propToString = function (prop) {
	switch (prop) {
		case 0:
			return 'background';
		case 1:
			return 'background-color';
		case 2:
			return 'background-position';
		case 3:
			return 'background-size';
		case 4:
			return 'border';
		case 5:
			return 'border-bottom';
		case 6:
			return 'border-bottom-color';
		case 7:
			return 'border-bottom-left-radius';
		case 8:
			return 'border-bottom-right-radius';
		case 9:
			return 'border-bottom-width';
		case 10:
			return 'border-color';
		case 11:
			return 'border-left';
		case 12:
			return 'border-left-color';
		case 13:
			return 'border-left-width';
		case 14:
			return 'border-radius';
		case 15:
			return 'border-right';
		case 16:
			return 'border-right-color';
		case 17:
			return 'border-right-width';
		case 18:
			return 'border-top';
		case 19:
			return 'border-top-color';
		case 20:
			return 'border-top-left-radius';
		case 21:
			return 'border-top-right-radius';
		case 22:
			return 'border-top-width';
		case 23:
			return 'border-width';
		case 24:
			return 'bottom';
		case 25:
			return 'box-shadow';
		case 26:
			return 'caret-color';
		case 27:
			return 'clip';
		case 28:
			return 'clip-path';
		case 29:
			return 'color';
		case 30:
			return 'column-count';
		case 31:
			return 'column-gap';
		case 32:
			return 'column-rule';
		case 33:
			return 'column-rule-color';
		case 34:
			return 'column-rule-width';
		case 35:
			return 'column-width';
		case 36:
			return 'columns';
		case 37:
			return 'filter';
		case 38:
			return 'flex';
		case 39:
			return 'flex-basis';
		case 40:
			return 'flex-grow';
		case 41:
			return 'flex-shrink';
		case 42:
			return 'font';
		case 43:
			return 'font-size';
		case 44:
			return 'font-size-adjust';
		case 45:
			return 'font-stretch';
		case 46:
			return 'font-variation-settings';
		case 47:
			return 'font-weight';
		case 48:
			return 'grid-column-gap';
		case 49:
			return 'grid-gap';
		case 50:
			return 'grid-row-gap';
		case 51:
			return 'height';
		case 52:
			return 'left';
		case 53:
			return 'letter-spacing';
		case 54:
			return 'line-height';
		case 55:
			return 'margin';
		case 56:
			return 'margin-bottom';
		case 57:
			return 'margin-left';
		case 58:
			return 'margin-right';
		case 59:
			return 'margin-top';
		case 60:
			return 'mask';
		case 61:
			return 'mask-position';
		case 62:
			return 'mask-size';
		case 63:
			return 'max-height';
		case 64:
			return 'max-width';
		case 65:
			return 'min-height';
		case 66:
			return 'min-width';
		case 67:
			return 'object-position';
		case 68:
			return 'offset';
		case 69:
			return 'offset-anchor';
		case 70:
			return 'offset-distance';
		case 71:
			return 'offset-path';
		case 72:
			return 'offset-rotate';
		case 73:
			return 'opacity';
		case 74:
			return 'order';
		case 75:
			return 'outline';
		case 76:
			return 'outline-color';
		case 77:
			return 'outline-offset';
		case 78:
			return 'outline-width';
		case 79:
			return 'padding';
		case 80:
			return 'padding-bottom';
		case 81:
			return 'padding-left';
		case 82:
			return 'padding-right';
		case 83:
			return 'padding-top';
		case 84:
			return 'right';
		case 85:
			return 'tab-size';
		case 86:
			return 'text-indent';
		case 87:
			return 'text-shadow';
		case 88:
			return 'top';
		case 89:
			return 'transform';
		case 90:
			return 'transform-origin';
		case 91:
			return 'vertical-align';
		case 92:
			return 'visibility';
		case 93:
			return 'width';
		case 94:
			return 'word-spacing';
		default:
			return 'z-index';
	}
};
var rtfeldman$elm_css$Css$Transitions$timeToString = function (time) {
	return elm$core$String$fromFloat(time) + 'ms';
};
var rtfeldman$elm_css$Css$Transitions$timingFunctionToString = function (tf) {
	switch (tf.$) {
		case 0:
			return 'ease';
		case 1:
			return 'linear';
		case 2:
			return 'ease-in';
		case 3:
			return 'ease-out';
		case 4:
			return 'ease-in-out';
		case 5:
			return 'step-start';
		case 6:
			return 'step-end';
		default:
			var _float = tf.a;
			var float2 = tf.b;
			var float3 = tf.c;
			var float4 = tf.d;
			return 'cubic-bezier(' + (elm$core$String$fromFloat(_float) + (' , ' + (elm$core$String$fromFloat(float2) + (' , ' + (elm$core$String$fromFloat(float3) + (' , ' + (elm$core$String$fromFloat(float4) + ')')))))));
	}
};
var rtfeldman$elm_css$Css$Transitions$transition = function (options) {
	var v = A3(
		elm$core$String$slice,
		0,
		-1,
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, s) {
					var animation = _n0.ba;
					var duration = _n0.cg;
					var delay = _n0.be;
					var timing = _n0.bz;
					return s + (A2(
						elm$core$String$join,
						' ',
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$Transitions$propToString(animation),
								rtfeldman$elm_css$Css$Transitions$timeToString(duration),
								A2(
								elm$core$Maybe$withDefault,
								'',
								A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Transitions$timeToString, delay)),
								A2(
								elm$core$Maybe$withDefault,
								'',
								A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Transitions$timingFunctionToString, timing))
							])) + ',');
				}),
			'',
			options));
	return A2(rtfeldman$elm_css$Css$property, 'transition', v);
};
var author$project$Page$Home$cardStyle = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$width(
			rtfeldman$elm_css$Css$pct(20)),
			rtfeldman$elm_css$Css$minWidth(
			rtfeldman$elm_css$Css$px(200)),
			rtfeldman$elm_css$Css$maxWidth(
			rtfeldman$elm_css$Css$px(400)),
			A2(
			author$project$Styles$ifMobileElse,
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$margin(
					rtfeldman$elm_css$Css$pct(3))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Css$margin(
					rtfeldman$elm_css$Css$pct(1))
				])),
			rtfeldman$elm_css$Css$marginBottom(
			rtfeldman$elm_css$Css$pct(4)),
			rtfeldman$elm_css$Css$borderRadius(
			rtfeldman$elm_css$Css$px(0)),
			A4(
			rtfeldman$elm_css$Css$boxShadow4,
			rtfeldman$elm_css$Css$px(0),
			rtfeldman$elm_css$Css$px(6),
			rtfeldman$elm_css$Css$px(8),
			A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.1)),
			rtfeldman$elm_css$Css$textDecoration(rtfeldman$elm_css$Css$none),
			rtfeldman$elm_css$Css$color(author$project$Styles$colors.b5),
			rtfeldman$elm_css$Css$cursor(rtfeldman$elm_css$Css$pointer),
			rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.bX),
			rtfeldman$elm_css$Css$Transitions$transition(
			_List_fromArray(
				[
					A3(rtfeldman$elm_css$Css$Transitions$transform3, 50, 0, rtfeldman$elm_css$Css$Transitions$easeOut),
					A3(rtfeldman$elm_css$Css$Transitions$boxShadow3, 50, 0, rtfeldman$elm_css$Css$Transitions$easeOut)
				])),
			rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.bX),
			rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					A4(
					rtfeldman$elm_css$Css$boxShadow4,
					rtfeldman$elm_css$Css$px(0),
					rtfeldman$elm_css$Css$px(6),
					rtfeldman$elm_css$Css$px(8),
					A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0.2)),
					rtfeldman$elm_css$Css$transform(
					rtfeldman$elm_css$Css$scale(1.03))
				]))
		]));
var rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var author$project$Page$Home$cardTitleStyle = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center),
			rtfeldman$elm_css$Css$margin(
			rtfeldman$elm_css$Css$pct(3))
		]));
var author$project$Route$gameForId = function (id) {
	return author$project$Route$toHref(
		author$project$Route$Game(
			elm$core$Maybe$Just(id)));
};
var author$project$Page$Home$viewPuzzle = function (puzzle) {
	return A2(
		rtfeldman$elm_css$Html$Styled$a,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[author$project$Page$Home$cardStyle])),
				author$project$Route$gameForId(puzzle.bh)
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						author$project$View$Board$view,
						author$project$View$Board$initTransform,
						{
							f: author$project$Data$Board$fromPuzzle(puzzle),
							dx: false,
							eq: elm$core$Basics$always(author$project$Page$Home$NoOp),
							i: puzzle,
							eO: false
						})
					])),
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[author$project$Page$Home$cardTitleStyle]))
					]),
				_List_fromArray(
					[
						function () {
						var _n0 = A2(elm$core$Maybe$andThen, author$project$Data$Puzzle$Date$parseDateString, puzzle.d7.dC);
						if (!_n0.$) {
							var weekDay = _n0.a.eZ;
							var englishMonth = _n0.a.dM;
							var dayNum = _n0.a.dE;
							var year = _n0.a.e0;
							return rtfeldman$elm_css$Html$Styled$text(weekDay + (' ' + (englishMonth + (' ' + (dayNum + (', ' + year))))));
						} else {
							return rtfeldman$elm_css$Html$Styled$text('Puzzle');
						}
					}()
					]))
			]));
};
var rtfeldman$elm_css$Css$animationDuration = function (arg) {
	return A2(rtfeldman$elm_css$Css$prop1, 'animation-duration', arg);
};
var rtfeldman$elm_css$Css$Preprocess$WithKeyframes = function (a) {
	return {$: 5, a: a};
};
var rtfeldman$elm_css$Css$animationName = function (arg) {
	return ((arg.X === 'none') || ((arg.X === 'inherit') || ((arg.X === 'unset') || (arg.X === 'initial')))) ? A2(rtfeldman$elm_css$Css$prop1, 'animation-name', arg) : rtfeldman$elm_css$Css$Preprocess$WithKeyframes(arg.X);
};
var rtfeldman$elm_css$Css$backgroundImage = rtfeldman$elm_css$Css$prop1('background-image');
var rtfeldman$elm_css$Css$backgroundSize2 = rtfeldman$elm_css$Css$prop2('background-size');
var rtfeldman$elm_css$Css$angleConverter = F2(
	function (suffix, angleVal) {
		return {
			dm: 0,
			T: 0,
			X: _Utils_ap(
				elm$core$String$fromFloat(angleVal),
				suffix)
		};
	});
var rtfeldman$elm_css$Css$deg = rtfeldman$elm_css$Css$angleConverter('deg');
var rtfeldman$elm_css$Css$collectStops = elm$core$List$map(
	function (_n0) {
		var c = _n0.a;
		var len = _n0.b;
		return A2(
			elm$core$String$append,
			c.X,
			A2(
				elm$core$Maybe$withDefault,
				'',
				A2(
					elm$core$Maybe$map,
					A2(
						elm$core$Basics$composeL,
						elm$core$String$cons(' '),
						function ($) {
							return $.X;
						}),
					len)));
	});
var rtfeldman$elm_css$Css$linearGradient2 = F4(
	function (direction, firstStop, secondStop, otherStops) {
		return {
			ax: 0,
			d: 0,
			X: A2(
				rtfeldman$elm_css$Css$cssFunction,
				'linear-gradient',
				A2(
					elm$core$List$cons,
					direction.X,
					rtfeldman$elm_css$Css$collectStops(
						_Utils_ap(
							_List_fromArray(
								[firstStop, secondStop]),
							otherStops))))
		};
	});
var rtfeldman$elm_css$Css$sec = function (amount) {
	return {
		cg: 0,
		X: elm$core$String$fromFloat(amount) + 's'
	};
};
var rtfeldman$elm_css$Css$stop2 = F2(
	function (c, len) {
		return _Utils_Tuple2(
			c,
			elm$core$Maybe$Just(len));
	});
var rtfeldman$elm_css$Css$Internal$printKeyframeSelector = function (_n0) {
	var percentage = _n0.a;
	var properties = _n0.b;
	var propertiesStr = A2(
		elm$core$String$join,
		'',
		A2(
			elm$core$List$map,
			function (_n1) {
				var prop = _n1;
				return prop + ';';
			},
			properties));
	var percentageStr = elm$core$String$fromInt(percentage) + '%';
	return percentageStr + (' {' + (propertiesStr + '}'));
};
var rtfeldman$elm_css$Css$Internal$compileKeyframes = function (tuples) {
	return A2(
		elm$core$String$join,
		'\n\n',
		A2(elm$core$List$map, rtfeldman$elm_css$Css$Internal$printKeyframeSelector, tuples));
};
var rtfeldman$elm_css$Css$Animations$keyframes = function (tuples) {
	return elm$core$List$isEmpty(tuples) ? {bK: 0, bN: 0, X: 'none'} : {
		bK: 0,
		bN: 0,
		X: rtfeldman$elm_css$Css$Internal$compileKeyframes(tuples)
	};
};
var rtfeldman$elm_css$Css$Internal$Property = elm$core$Basics$identity;
var rtfeldman$elm_css$Css$Animations$property = F2(
	function (key, value) {
		return key + (':' + value);
	});
var author$project$Styles$shimmerAnimation = rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			rtfeldman$elm_css$Css$animationDuration(
			rtfeldman$elm_css$Css$sec(2)),
			A2(rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
			A2(rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
			rtfeldman$elm_css$Css$animationName(
			rtfeldman$elm_css$Css$Animations$keyframes(
				_List_fromArray(
					[
						_Utils_Tuple2(
						0,
						_List_fromArray(
							[
								A2(rtfeldman$elm_css$Css$Animations$property, 'background-position', '-1200px 0')
							])),
						_Utils_Tuple2(
						100,
						_List_fromArray(
							[
								A2(rtfeldman$elm_css$Css$Animations$property, 'background-position', '1200px 0')
							]))
					]))),
			A2(rtfeldman$elm_css$Css$property, 'animation-timing-function', 'linear'),
			rtfeldman$elm_css$Css$backgroundColor(
			rtfeldman$elm_css$Css$hex('#F0F0F5')),
			rtfeldman$elm_css$Css$backgroundImage(
			A4(
				rtfeldman$elm_css$Css$linearGradient2,
				rtfeldman$elm_css$Css$deg(125),
				A2(
					rtfeldman$elm_css$Css$stop2,
					rtfeldman$elm_css$Css$hex('#F0F0F5'),
					rtfeldman$elm_css$Css$pct(4)),
				A2(
					rtfeldman$elm_css$Css$stop2,
					rtfeldman$elm_css$Css$hex('#E9E9ED'),
					rtfeldman$elm_css$Css$pct(25)),
				_List_fromArray(
					[
						A2(
						rtfeldman$elm_css$Css$stop2,
						rtfeldman$elm_css$Css$hex('#F0F0F5'),
						rtfeldman$elm_css$Css$pct(36))
					]))),
			A2(
			rtfeldman$elm_css$Css$backgroundSize2,
			rtfeldman$elm_css$Css$px(1200),
			rtfeldman$elm_css$Css$pct(100))
		]));
var author$project$Page$Home$viewPuzzleLoading = A2(
	rtfeldman$elm_css$Html$Styled$div,
	_List_fromArray(
		[
			rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[author$project$Page$Home$cardStyle]))
		]),
	_List_fromArray(
		[
			A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[author$project$Styles$shimmerAnimation]))
				]),
			_List_fromArray(
				[
					A2(
					rtfeldman$elm_css$Svg$Styled$svg,
					_List_fromArray(
						[
							rtfeldman$elm_css$Svg$Styled$Attributes$viewBox('0 0 1 1')
						]),
					_List_Nil)
				])),
			A2(
			rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							author$project$Styles$shimmerAnimation,
							author$project$Page$Home$cardTitleStyle,
							rtfeldman$elm_css$Css$height(
							rtfeldman$elm_css$Css$px(16))
						]))
				]),
			_List_fromArray(
				[
					rtfeldman$elm_css$Html$Styled$text('')
				]))
		]));
var author$project$Page$Home$viewCard = function (maybePuzzle) {
	if (!maybePuzzle.$) {
		var puzzle = maybePuzzle.a;
		return author$project$Page$Home$viewPuzzle(puzzle);
	} else {
		return author$project$Page$Home$viewPuzzleLoading;
	}
};
var rtfeldman$elm_css$Css$flexWrap = rtfeldman$elm_css$Css$prop1('flex-wrap');
var rtfeldman$elm_css$Css$wrap = {aW: 0, bg: 0, X: 'wrap'};
var author$project$Page$Home$viewCards = function (puzzles) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$flexWrap(rtfeldman$elm_css$Css$wrap),
						author$project$Styles$justifyContentCenter
					]))
			]),
		A2(elm$core$List$map, author$project$Page$Home$viewCard, puzzles));
};
var rtfeldman$elm_css$Css$minHeight = rtfeldman$elm_css$Css$prop1('min-height');
var author$project$Page$Home$viewError = function (contents) {
	var errorBar = A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
						rtfeldman$elm_css$Css$minHeight(
						rtfeldman$elm_css$Css$px(50)),
						rtfeldman$elm_css$Css$bottom(
						rtfeldman$elm_css$Css$px(0)),
						rtfeldman$elm_css$Css$left(
						rtfeldman$elm_css$Css$px(0)),
						rtfeldman$elm_css$Css$right(
						rtfeldman$elm_css$Css$px(0)),
						rtfeldman$elm_css$Css$backgroundColor(author$project$Styles$colors.dW),
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
						author$project$Styles$justifyContentCenter,
						rtfeldman$elm_css$Css$color(author$project$Styles$colors.bX),
						rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center)
					]))
			]),
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$text('Sorry, we had some trouble downloading puzzles. In the meantime, here are a few samples.')
			]));
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								rtfeldman$elm_css$Css$marginBottom(
								rtfeldman$elm_css$Css$px(50))
							]))
					]),
				_List_fromArray(
					[contents])),
				errorBar
			]));
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var rtfeldman$elm_css$Html$Styled$h3 = rtfeldman$elm_css$Html$Styled$node('h3');
var author$project$Page$Home$content = function (model) {
	return A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						rtfeldman$elm_css$Css$displayFlex,
						rtfeldman$elm_css$Css$flexDirection(rtfeldman$elm_css$Css$column),
						rtfeldman$elm_css$Css$alignItems(rtfeldman$elm_css$Css$center),
						author$project$Styles$fonts.dr
					]))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$h3,
				_List_Nil,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Welcome to Crossword Games!')
					])),
				function () {
				var _n0 = model.bv;
				switch (_n0.$) {
					case 0:
						return author$project$Page$Home$viewCards(
							A2(elm$core$List$repeat, 8, elm$core$Maybe$Nothing));
					case 2:
						var puzzles = _n0.a;
						return author$project$Page$Home$viewCards(
							A2(elm$core$List$map, elm$core$Maybe$Just, puzzles));
					default:
						var err = _n0.a;
						return author$project$Page$Home$viewError(
							author$project$Page$Home$viewCards(
								A2(elm$core$List$map, elm$core$Maybe$Just, author$project$BundledPuzzles$puzzles)));
				}
			}()
			]));
};
var author$project$Page$Home$view = function (model) {
	return {
		bF: author$project$Page$Home$content(model),
		eU: 'Home'
	};
};
var rtfeldman$elm_css$Html$Styled$h1 = rtfeldman$elm_css$Html$Styled$node('h1');
var author$project$Page$NotFound$view = {
	bF: A2(
		rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[author$project$Styles$fonts.dr]))
			]),
		_List_fromArray(
			[
				A2(
				rtfeldman$elm_css$Html$Styled$h1,
				_List_Nil,
				_List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$text('Not Found')
					]))
			])),
	eU: 'Page Not Found'
};
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
	function (transform, _n0) {
		var prop = _n0.a;
		var styles = _n0.b;
		var classname = _n0.c;
		return A3(
			rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2(elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
			styles,
			classname);
	});
var rtfeldman$elm_css$VirtualDom$Styled$map = F2(
	function (transform, vdomNode) {
		switch (vdomNode.$) {
			case 0:
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					rtfeldman$elm_css$VirtualDom$Styled$Node,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 1:
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
					ns,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$map(transform),
						children));
			case 2:
				var elemType = vdomNode.a;
				var properties = vdomNode.b;
				var children = vdomNode.c;
				return A3(
					rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						function (_n1) {
							var key = _n1.a;
							var child = _n1.b;
							return _Utils_Tuple2(
								key,
								A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			case 3:
				var ns = vdomNode.a;
				var elemType = vdomNode.b;
				var properties = vdomNode.c;
				var children = vdomNode.d;
				return A4(
					rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
					ns,
					elemType,
					A2(
						elm$core$List$map,
						rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
						properties),
					A2(
						elm$core$List$map,
						function (_n2) {
							var key = _n2.a;
							var child = _n2.b;
							return _Utils_Tuple2(
								key,
								A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
						},
						children));
			default:
				var vdom = vdomNode.a;
				return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
					A2(elm$virtual_dom$VirtualDom$map, transform, vdom));
		}
	});
var rtfeldman$elm_css$Html$Styled$map = rtfeldman$elm_css$VirtualDom$Styled$map;
var rtfeldman$elm_css$Html$Styled$toUnstyled = rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var author$project$Main$view = function (model) {
	var viewPage = F3(
		function (page, toMsg, content) {
			var mappedContent = A2(rtfeldman$elm_css$Html$Styled$map, toMsg, content.bF);
			var _n3 = author$project$Page$view(
				{
					bF: {bF: mappedContent, eU: content.eU},
					eu: author$project$Main$NavBarToggled,
					eA: page,
					ag: author$project$Main$toSession(model)
				});
			var title = _n3.eU;
			var body = _n3.b7;
			return {
				b7: _List_fromArray(
					[
						rtfeldman$elm_css$Html$Styled$toUnstyled(
						A2(rtfeldman$elm_css$Html$Styled$div, _List_Nil, body))
					]),
				eU: title
			};
		});
	var _n0 = model.aq;
	switch (_n0.$) {
		case 0:
			return A3(
				viewPage,
				0,
				function (_n1) {
					return author$project$Main$NoOp;
				},
				author$project$Page$Blank$view);
		case 1:
			return A3(
				viewPage,
				0,
				function (_n2) {
					return author$project$Main$NoOp;
				},
				author$project$Page$NotFound$view);
		case 2:
			var subModel = _n0.a;
			return A3(
				viewPage,
				1,
				author$project$Main$GotHomeMsg,
				author$project$Page$Home$view(subModel));
		case 3:
			var subModel = _n0.a;
			return A3(
				viewPage,
				2,
				author$project$Main$GotGameMsg,
				A2(author$project$Page$Game$view, model.ag, subModel));
		default:
			var subModel = _n0.a;
			return A3(
				viewPage,
				3,
				author$project$Main$GotAboutMsg,
				author$project$Page$About$view(subModel));
	}
};
var elm$browser$Browser$application = _Browser_application;
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Main$main = elm$browser$Browser$application(
	{d_: author$project$Main$init, ev: author$project$Main$ChangedUrl, ew: author$project$Main$ClickedLink, eR: author$project$Main$subscriptions, eW: author$project$Main$update, eY: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(elm$json$Json$Decode$value)(0)}});}(this));