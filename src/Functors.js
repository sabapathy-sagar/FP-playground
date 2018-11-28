const negate = val => !val;

const uppify = val => val.toUpperCase();

const multiply = a => b => a * b;

const multiplyBy10 = multiply(10);

const appendText = text => str => `${str} ${text}`;

const appendTextWhisky = appendText("whisky");

const typeCheck = (predicate, def) => val => ({
  aP: fn => (predicate(val) ? fn(val) : def),
  val
});

const numBox = typeCheck(v => typeof v === "number", "NaN: not a number");

console.log(numBox(2).aP(multiplyBy10));

const stringBox = typeCheck(v => typeof v === "string", "Not a string!");

console.log(stringBox("sagar sabapathy").aP(uppify));

const booleanBox = typeCheck(v => typeof v === "boolean", "not a boolean");

console.log(booleanBox(false).aP(negate));

//console.log(appendText("whisky", "scotch"));

console.log(stringBox("harley").aP(appendTextWhisky));

const TypeBox = (predicate, defaultValue) => {
  const TypePredicate = value => ({
    map: fn =>
      predicate(value) ? TypePredicate(fn(value)) : TypePredicate(defaultValue),
    value
  });
  return TypePredicate;
};

const NumberBox = TypeBox(value => typeof value === "number", NaN);
const double = v => v * 2;
const increment = v => v + 1;
NumberBox(5)
  .map(double)
  .map(increment).value;
console.log(
  NumberBox(3)
    .map(double)
    .map(increment).value
);
