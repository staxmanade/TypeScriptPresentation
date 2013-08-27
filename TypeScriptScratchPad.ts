

/*

// Shows
// - class
// - constructor
// - Public properties (name) (via constructor)
// - method

class Animal {
    constructor(public name) { }

    move(meters) {
       alert(this.name + " moved " + meters + "m.");
    }
}

var animal = new Animal("");

*/








/*

// Shows a basic interaction with an external library
// by giving type definitions VIA interfaces.

interface JQuery {
    text(content: string);
}

interface JQueryStatic {
    (query: string): JQuery; 
    get(url: string, callback: (data: string) => any); 
}

declare var $: JQueryStatic;

// declare var $;

$.get("http://mysite.org/divContent", function (data: string) {
    $("div").text(data);
});

*/

















/*

// Shows how to declare a type (interface) and then assign a regular 
// javascript object to it (that conforms to the interface)

interface Presenter {
    name: string;
}

var jason: Presenter;

jason = {
    name: "Jason Jarrett",
    topic: "TypeScript"
};

*/










/*

// sample generic type

class List<T> {
    items: T[];
    add(item: T) {
        this.items.push(item);
    }
}

var numberList = new List<number>();
numberList.add(1);
numberList.add(2);

// error
// numberList.add("car");





var stringList = new List<string>();
stringList.add("car");
stringList.add("driver");

// error
// stringList.add(1);


interface car {
    type: string;
    description: string;
}

var cars = new List<car>();

cars.add({
    type: "FORD",
    description: "Found on road dead",
    someOtherItem: 1 // shows that types not defined
                     // on the interface are OK
});

cars.add({
    type: "OLDSMOBILE",
    description: "Old Ladies Driving Slow Make Others Behind Infuriatingly Late Everyday"
});

*/

module Mo {
    export function myFun(x: number) {
        return x;
    }
}

var m: typeof Mo = Mo;
