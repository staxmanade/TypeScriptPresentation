Setup:

1. Load something so we can easily get to `lib.d.ts`
2. Visual Studio
	- Turn off Whitespace in Visual Studio
	- Turn off compile on save for TypeScript
	- Turn off 'auto load changes if saved'
5. Bump up fonts
6. Open http://www.typescriptlang.org/Playground/
7. Start presentation `nws -o index.html`
8. Press `s` to start notes window

===

# TypeScript
### Presented By
# Jason Jarrett
> * Web: [http://staxmanade.com](http://staxmanade.com)
> * Code: [http://github.com/staxmanade](http://github.com/staxmanade)
> * Work: [Vertigo](http://vertigo.com)
> * Twitter: [@staxmanade](https://twitter.com/staxmanade)

===

### What?

Optionally typed superset of JavaScript that enables building larger JavaScript based projects.

==

## Superset

The below JavaScript

    function log(value) {
        console.log(value);
    }

    log("Hello World");

is also TypeScript

Note:
- It's just JavaScript - sort of -(Superset)
- ES6
- Static annotations
- Modules
- Classes
- Compiler for static verification

==

# Optionally Typed

    var x = 1;
    var x: number = 1;
    
    var x: number = "hello"; // Compiler Error

Note:
- --noImplicitAny
- any

==

# Structural Typings

    var m: { x: string } = { x: "hello" };


    interface SomeType {
      propA: string;
      propB: boolean;
    }
    
    var x: SomeType;
    
    x = {
      propA: "Hello",
      propB: true
    }



===

# TypeScript typings are optional

===

### TypeScript

# Why?

Note:
- Difficult to structure JavaScript at scale.
- Prevalence of JavaScript
- Catches a large class of bugs earlier (spelling typos, case sensitivity, etc)

==

## subtle bug(s)

> can you see the error(s) here?

    function myLog(value: string) {
        alert(value);
    }

    mylog(["Hello World"]);

==

## Catching easy to miss typos

    function myLog(value: string) {
        alert(value);
    }

    mylog(["Hello World"]);

compile and we get

    error TS2304: Cannot find name 'mylog'.

==

## next bug

> can you see the error here?

    function myLog(value: string) {
        console.log(value);
    }

    myLog(["Hello World"]);

==

# Error 2


> can you see the error here?

    function myLog(value: string) {
        console.log(value);
    }

    myLog(["Hello World"]);

compile and we get

    Compile Error.

    test.ts(5,7): error TS2345: Argument of
        type 'string[]' is not assignable to
        parameter of type 'string'.

==

Now that all our errors are removed

    function myLog(value: string) {
        console.log(value);
    }

    myLog("Hello World");

compile and we get

    function myLog(value) {
        console.log(value);
    }

    myLog("Hello World");

===

### TypeScript

# Who?

Note:
- Built by Microsoft (built out in the open)
    - Over 70 contributors to the project on GitHub
- Open Source (Apache License 2.0)
- Project hosted on GitHub
- Led by Anders Hejlsberg (Considered the father of C#)

==

# Community

- [DefinitelyTyped.org](http://github.com/DefinitelyTyped) (OSS)
- Gulp/Grunt plugins
- Editors
- and more...

Note:
- TypeScript in place of w3c language
- DefinitelyTyped
- Forks of TypeScript on GitHub

===

### TypeScript

# Where?

Anywhere you write JavaScript (almost)

===

### TypeScript

# How?

Note:
- IDE's
- Build tools (command line, C.I.)

==

## Install CLI

`npm install -g typescript`

==

### Editors/IDE's and Plugins

 - Visual Studio (proper)
 - VS Code
 - Atom
 - [CATS](http://jbaron.github.io/cats/) - Code Assistant for TypeScript
 - WebStorm
 - Vim
 - Cloud9 IDE
 - Eclipse Plugin
 - Sublime
 - Emacs

==

### Compiler

    :> tsc [options] [file ..]


Some Examples

    :> tsc hello.ts
    :> tsc --out foo.js foo.ts

Note:

- command line `tsc`
- compiler is written in `.ts` and when running is just `.js`
- can be leveraged by 3rd party tooling (AST, Tokenizer, etc)

===

# Componentization

1. Modules
2. Classes
3. Interfaces

> Superset of functionality from ES6 I mean EcmaScript 2015


==

## Modules

    module Zoo {
        export function getAnimalCount() {
            return 243;
        }
    }
Compiles to:

    var Zoo;
    (function (Zoo) {
        function getAnimalCount() {
            return 243;
        }
        Zoo.getAnimalCount = getAnimalCount;
    })(Zoo || (Zoo = {}));

==

## Classes

    class Animal {
        constructor(public name) { }
        move(meters) {
            console.log(this.name + " moved " + meters + "m.");
        }
    }

Compiles to:

    var Animal = (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.move = function (meters) {
            console.log(this.name + " moved " + meters + "m.");
        };
        return Animal;
    })();

==

## Interfaces

    interface ZooTime {
        hours: number;
        minutes: number;
    }

    interface Zoo {
        openTime() : ZooTime;
    }
Compiles to:

    /*
     * nothing - interfaces striped away during compilation
     * only used during static verification
     */

===

# Bits of the Language

==

How to reference another TypeScript file?

    /// <reference path="someDependency.ts" />
    var myClass = new someDependency.someClass();

or

    import SomeClass from 'SomeClass';
    var myClass = new SomeClass();

<br>

Can generate `CommonJS`, `AMD`, `UMD`, or `System`.

==
## Type annotations


    var a: number = 1;
    var b: string = "hello";
    var c: SomeClass = new SomeClass();

    class SomeClass { }
    var func = function(input: SomeClass): number {
        return 1;
    }

==

## Optional Parameters?

    function optional(name: string, age?: number) {
        return "Name: " + name + " Age: " + age;
    }

    optional("hi");
    optional("hi", 1);

compiles to

    function optional(name, age) {
        return "Name: " + name + " Age: " + age;
    }

    optional("hi");
    optional("hi", 1);

==

## Default Parameters

    function defaultParameter(name: string = 'myDefaultValue') {
        return name;
    }

compiles to

    function defaultParameter(name) {
        if (typeof name === "undefined") { name = 'myDefaultValue'; }
        return name;
    }

==

## Overloads

    class TestClass {
        someMethod(stringParameter: string): void;
        someMethod(numberParameter: number, stringParameter: string): void;

        someMethod(stringOrNumberParameter: any, stringParameter?: string): void {
            if (stringOrNumberParameter && typeof stringOrNumberParameter == "number")
                alert("Variant #2: numberParameter = " + stringOrNumberParameter + ", stringParameter = " + stringParameter);
            else
                alert("Variant #1: stringParameter = " + stringOrNumberParameter);
        }
    }

==

## Enumerations

    enum MyEnum {
        Value1,
        Value2,
        Value3
    }

compiles to

    var MyEnum;
    (function (MyEnum) {
        MyEnum[MyEnum["Value1"] = 0] = "Value1";
        MyEnum[MyEnum["Value2"] = 1] = "Value2";
        MyEnum[MyEnum["Value3"] = 2] = "Value3";
    })(MyEnum || (MyEnum = {}));

==

## Structural Typing

    class ClassA {
        someMethod(name: string) {
            return name;
        }
    }

    var SpecialC = function() { }
    SpecialC.prototype.someMethod = function (name: string) {
        return name;
    }

    var proof: ClassA = new SpecialC();

==

## Access modifiers

Function/Properties

- public
- private
- static

==

## Access Modifiers (sample)

    class ClassA {
		private privateFoo: number;
		public publicFoo: number;
		static staticFoo: number;
        constructor() {
			this.privateFoo = 1; // not an error
			this.publicFoo = 1;
			ClassA.staticFoo = 1;
        }
    }

    var obj = new ClassA();

	var privateFoo = obj.privateFoo; // error
	var publicFoo = obj.publicFoo;
	var staticFoo = ClassA.staticFoo;

==

## Generics

    class ItemCollection<T> {
      items: Array<T> = [];

      add(item: T) {
          this.items.push(item);
      }
    }

    var stringCollection = new ItemCollection<string>();

    stringCollection.add("a");

    // error (1 is not a string)
    stringCollection.add(1);

==

## Generics with type constraints	interface IBar {
		doSomething(): void;
	}
	
	class MyClass<T extends IBar>{
		constructor(public someBar: T) {
		}
	}
	
	var foo = {
		doSomething: () => {
			console.log("did something");
		}
	}
	var x = new MyClass(foo);
	
	x.someBar.doSomething();

==

## Union Types

	class Class {
		name: string;
		daysOfWeek: string[];
	}
	
	class Student {
		name: string;
	}
	
	var noun: Class|Student = new Class();
	
	console.log(noun.name);
	console.log(noun.daysOfWeek); // error
	
	if(noun instanceof Class) {
		console.log(noun.daysOfWeek); // no error
	}

===

# Interfacing with external JS

==

## Ambient Declarations

global variable not known to TypeScript

    myGlobal.foo = "Hello";

error TS2304: Cannot find name 'myGlobal'.

==

Tell TypeScript about the variable:

    declare var myGlobal: any;
    myGlobal.foo = "Hello";
==

## Definiton files

lib.d.ts

DefinitelyTyped

Note:
- show lib.d.ts it in V.S.

===

## Presentation:

[staxmanade.com/TypeScriptPresentation](http://staxmanade.com/TypeScriptPresentation)
<br>
<br>
### Thanks

Jason Jarrett

[@staxmanade](http://staxmanade.com)
