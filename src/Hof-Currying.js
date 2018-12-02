//const greet = (greeting, name) => `${greeting} ${name}!`;

//console.log(greet("Hi", "John"));

const greet = greeting => name => `${greeting} ${name}!`;

//console.log(greet("Hi"));

const pets = ["Johnny", "Judo", "Misty"];

//console.log(pets.map(greet("Hi")));

const stars = ["Depp", "Cruise", "Ashton"];

//console.log(stars.map(greet("Hello")));

const products = [
  {
    id: "123",
    name: "Perfume"
  },
  {
    id: "124",
    name: "Toy car"
  }
];

const orders = [
  {
    code: "987",
    placedOn: "11/11/2017"
  },
  {
    code: "998",
    placedOn: "01/10/2018"
  }
];

const generateDisplayString = label => val =>
  `${label.toUpperCase()}:-> ${val}`;

const getValue = key => obj => obj[key];

console.log(
  products.map(getValue("name")).map(generateDisplayString("Product name"))
);

console.log(
  products.map(getValue("id")).map(generateDisplayString("Product Id"))
);

console.log(
  orders.map(getValue("code")).map(generateDisplayString("Order code"))
);

console.log(
  orders.map(getValue("placedOn")).map(generateDisplayString("Order Placed On"))
);

// const reviews = [4.5, 4.0, 4.5, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0, 2.5];

// const reviewCount = (acc, reviewScore) => {

//   const count  = acc[reviewScore] || 0;
//     return {
//       ...acc,
//       [reviewScore]: count + 1
//   }
// }

// const numReviews = reviews.reduce(reviewCount, {});

// console.log(numReviews);

// const grades = [60, 55, 80, 90, 99, 92, 75, 72];

// const avg = (a, b) => (a+b)/2 ;

// console.log(avg(95,90));

// console.log(grades.reduce(avg));

// const groupByGrade = (acc, grade) => {
//   const {a = 0, b = 0, c = 0, d = 0, e = 0, f = 0} = acc;

//   if (grade >= 90) {
//     return {...acc, a: a + 1}
//   } else if (grade >= 80) {
//     return {...acc, b: b + 1}
//   } else if (grade >= 70) {
//     return {...acc, c: c + 1}
//   } else if (grade >= 60) {
//     return {...acc, d: d + 1}
//   } else {
//     return {...acc, f: f + 1}
//   }
// }

// const gradeCount = grades.reduce(groupByGrade, {});

// console.log(gradeCount);

// const empO = {};

// const someO = {
//   a: 1
// }

// console.log({...someO, ...empO});

//const add = a => b => a + b;

// const arrayAdd = [2,4,6].reduce(add, 0);

// //console.log("==",arrayAdd);

// const applyMap = (acc, item, index, arr) => acc.concat(fn(item, index, arr))

// const _map_ = (fn, arr) => arr.reduce((acc, item, index, arr) => acc.concat(fn(item, index, arr)), []);

// const increment = add(1);

// console.log(increment);

// console.log(_map_(increment, [50,2,3]));

// const compose = fns => x => fns.reduceRight((v, f) => f(v), x);

// const add1 = add(1);

// const add2 = add(2);

// const add10 = add(10);
// const multiply = (a, b) => a * b;

// console.log(compose([add1, add2, add10])(1));

// const pipe = fns => x => fns.reduce((v, f) => f(v), x);

// console.log(pipe([add10, add2, add1])(10));

const log = msg => console.log(msg);

log("-------------PART 2-----------------");

const add = a => (b, c) => a + b + c;

const inc = add(1);

log(inc(5, 6));

const mapC = fn => arr => arr.map(fn);

const arr = [1, 2, 3, 4];

const isEven = n => n % 2 === 0;

const striped = mapC(isEven);

const stripedAll = striped(arr);

log(stripedAll);

const isLight = val => (val ? "light" : "dark");

const checkLight = mapC(isLight);

log(checkLight(stripedAll));

const isLight2 = arr.map(isEven).map(isLight);

log(isLight2);
