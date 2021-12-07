# JSClasser
## Description
JSClasser is basically just a nice utility library that can be used

to implement OOP [Object Oriented Programming] into old javascript engines

if classes aren't available.

## Quick look at API features
- `Class` Object
  - `Functions`
    - `new` - Creates an `Instance` of a `Class`
    - `toString` - Nice output of the current `Instance` or `Class`
    - `extend` - Used as Class Inheritance
    - `abstract` - Abstractifies the `Class` so it can't create a `Instance`
  - `Properties`
    - `name` - Name of the class
    - `super` - If the class has inheritance than this will point to the inheritance `Class` Object

Most `Class` Properties and functions will be inherited by the `Instance` Object

- `Instance` Object
  - `Functions`
    - `instanceOf` - Checks if the `Class` passed is the name `Class` of the `Instance`
    - `cast` - Can cast the `Instance` back into a inherited `Instance` 
  - `Properties`
    - `__classId` - The ID of the `Instance` creation under that `Class`
    - `class` - Reference to the original `Class` Object

- Base Library functions
  - `isClass` - Checks if the `object` passed is a `Class`
  - `isInstance` - Checks if the `object` passed is a `Instance`

- `Enum` Object
  - `Functions`
    - `toString` - Nice output of the enum
  - `Properties`
    - `name` - Enum name
    - `enum` - Count of the enum

## API Docs
You first want to paste the `classer.js` code into your script.

But if you already have then let's start!

## Creating a `Class`
**Most** `Class`es start off with the `Class` function.

The `Class` function has 2 possible parameters, `name`, and `properties`.

You don't have to pass the `properties` parameter if you decide to pass the `name` parameter which you don't have to pass either,

but if you don't pass a `name` then it will default to `'?'`

```js
var Window = Class("Window", {
    width: 100,
    height: 100
});
```

Now let's add a `init` function that will run when creating a new instance.

**NOTE: to tell your users to pass a object. because this will only pass 1 parameter.**

```js
Window.init = function(init_data) {
    this.width = init_data.width;
    this.height = init_data.height;
};
```

## Creating a `Instance`
Now that we have a a `Window Class` we can create an `Instance` with the `new` function.

**NOTE: If the class is `abstracted` then you can't create an `Instance` out of it.**

```js
var NewWindow = Window.new({
    width: 200,
    height: 200
});
```

**NOTE 2: You can create an instance without running the init function you just have to do this instead:**
```js
var NewWindow = Window.new(undefined, false); // first value can be anything just make sure you set the second to "false"
```

## Abstracting a Class
You can create a `abstract` class by using the `abstract` function when creating a `Class`.

```js
var AbstractClass = Class("AbstractClass");
AbstractClass.abstract();
```

## Extending / Inheriting from a `Class`
Once you've created a `Class` you can inherit from a `Class` using the the `extend` function.

The `extend` function has the same parameters as the `Class` function.

```js
var GraphicalInterface = Class("GraphicalInterface", {
    x: 0,
    y: 0
});

var Window = GraphicalInterface.extend("Window", {
    width: 200,
    height: 200
}); // Now this class has both any function & property GraphicalInterface
```

## Casting a `Instance`
If you have a `Instance` that is from a `Class` with inheritance you can cast it back to inheritated class

by using the `cast` function.

```js
var GraphicalInterface = Class("GraphicalInterface", {
    x: 0,
    y: 0
});

var Window = GraphicalInterface.extend("Window", {
    width: 200,
    height: 200
}); // Now this class has both any function & property GraphicalInterface

var UserWindow = Window.new();
UserWindow.x = 200;

var UserWindowGI = UserWindow.cast(GraphicalInterface); // x in the GraphicalInterface will be 200 because the UserWindow.x was 200
```

## Creating a `Enum`
Enumerators are suppose to replicate the `enum` keyword in other programming languages

```js
var WindowStates = Enum("WindowStates", [
  "Maximized",
  "Minimized",
  "FullScreen",
  "Custom"
]);

var MaxWindowState = WindowStates.Maximized;

if (CurrentWindow.State == MaxWindowState) {
  // do whatever when the window is maximized
}
```

## Finally some checks.
### Checking if a `object` is a `Class`
You can check if a object is a `Class` or not by using the `isClass` function like so.

```js
var Window = Class("Window");
var UserWindow = Window.new();

console.log(isClass(Window)); // true
console.log(isClass(UserWindow)); // false
console.log(isClass({})); // false
```

### Checking if a `object` is a `Instance`
You can check if a object is a `Instance` or not by using the `isInstance` function like so.

```js
var Window = Class("Window");
var UserWindow = Window.new();

console.log(isInstance(UserWindow)); // true
console.log(isInstance(Window)); // false
console.log(isInstance({})); // false
```

### 2 `Instance Class` checking
You can check if two `Instance`s are the same `Class` by using the `instanceOf` function.

```js
var Shape = Class("Shape");
// You don't have to 'instanceOf' on extended classes you can use it on normal classes
var Rectangle = Shape.extend("Rectangle");
var Triangle = Shape.extend("Triangle");
var NRectangle = Rectangle.new();

console.log(NRectangle.instanceOf(Rectangle)) // true
console.log(NRectangle.instanceOf(Shape)) // true, althought it does inherit from the 'Shape` class, the Instance isn't a 'Shape' class it's a 'Rectangle' class
console.log(NRectangle.instanceOf(Triangle)) // false
```
