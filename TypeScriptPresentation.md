Setup:

1. Load something so we can easily get to `lib.d.ts`
2. Turn off Whitespace in Visual Studio
3. Turn off compile on save for TypeScript
4. Turn off 'auto load changes if saved'
5. Bump up fonts
6. Open http://www.typescriptlang.org/Playground/

===

# TypeScript
### Presented By
# Jason Jarrett
> * Twitter: [@staxmanade](https://twitter.com/staxmanade)
> * Blog: [http://elegantcode.com](http://elegantcode.com)
> * Some Code: [http://github.com/staxmanade](http://github.com/staxmanade)
> * Work at: [Vertigo](http://vertigo.com)

===

### TypeScript

# What?

==

## The Language

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

===

# TypeScript typings are optional

===

### TypeScript

# Why?

Note:
- Difficult to structure JavaScript at scale.
- Prevalence of JavaScript
- Catches a class of bugs earlier

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

# Who else?

- [DefinitelyTyped](http://github.com/DefinitelyTyped) (OSS)
    - `NuGet` and `tsd`

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

==

# some options

      -d, --declaration             Generates corresponding .d.ts file
      -m KIND, --module KIND        Specify module code generation: "commonjs" or "amd"
      --noImplicitAny               Warn on expressions and declarations with an implied 'any' type.
      --sourcemap                   Generates corresponding .map file
      -t VERSION, --target VERSION  Specify ECMAScript target version: "ES3" (default), or "ES5"
      @<file>                       Insert command line options and files from a file.

... there are more than listed above ...

Note:

- declaration: will generate a typescript definition file - good for public libraries so others can use the definitions.
- module type (commonjs or AMD)
- noImplicitAny: will warn you if the compiler infers an 'any' type in your code.
- sourcemap:
- target: which version of EcmaScript to compile to ES3(default) or ES5 supported
- (at-file): allows you to put your command line options into a file.


===

# Componentization

1. Modules
2. Classes
3. Interfaces

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

==

    import SomeClass from 'SomeClass';
    var myClass = new SomeClass();

<br>

The above can work with either `CommonJS` like in `nodejs`, `AMD` line with `RequireJS`, `UMD`, `System`

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

## Enum sample 2

    enum MyOtherEnum {
        Value1 = 3,
        Value2 = 5,
        Value3 = 8
    }

compiles to

    var MyOtherEnum;
    (function (MyOtherEnum) {
        MyOtherEnum[MyOtherEnum["Value1"] = 3] = "Value1";
        MyOtherEnum[MyOtherEnum["Value2"] = 5] = "Value2";
        MyOtherEnum[MyOtherEnum["Value3"] = 8] = "Value3";
    })(MyOtherEnum || (MyOtherEnum = {}));

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


Note:
TODO:


## Access modifiers

- public
- private
- static

## Generics with type constraints

  class ItemCollection< T >
  {
      items: Array< T > = [];

      add(item: T) {
          this.items.push(item);
      }
  }

  var stringCollection = new ItemCollection<string>();

  stringCollection.add("a");

  // error (number 1 is not a string)
  stringCollection.add(1);


===

# Interfacing with external JS

==

## Ambient Declarations

angry tsc

    myGlobal.foo = "Hello";

error TS2304: Cannot find name 'myGlobal'.

---

happy tsc

    declare var myGlobal;
    myGlobal.foo = "Hello";
==

## Definiton files

lib.d.ts

DefinitelyTyped

Note:
- show lib.d.ts it in V.S.

===

## Presentation:
[http://github.com/staxmanade/TypeScriptPresentation](http://github.com/staxmanade/TypeScriptPresentation)
<br>Or this: [http://goo.gl/68qTPm](http://goo.gl/68qTPm)
<br>
<br>
### Thanks
Jason Jarrett
