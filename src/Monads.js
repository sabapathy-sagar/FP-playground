/////////MONADS//////////////////
console.log("---------------MONADS----------------");

const x = 20;

const double = x => [x * 2];

const arrX = Array.of(x);

console.log(arrX.map(double));

console.log(arrX.flatMap(double));

const prom1 = Promise.resolve(x);

const promDouble = x => Promise.resolve(x * 2);

prom1.then(promDouble).then(r => console.log("--", r));

const simpleCompose = (f, g) => x => f(g(x));

const add = a => b => a + b;

const inc = add(1);

const add10 = add(10);

console.log(simpleCompose(inc, add10)(5));

const trace = label => val => {
  console.log(label, val);
  return val;
};

trace("test")(50);

trace("map composes")([
  [50].map(inc).map(add10),
  [50].map(simpleCompose(add10, inc))
]);

const ComposePromise = (...ms) => ms.reduce((f, g) => x => g(x).then(f));

// a -> Monad(b)
const asynAdd10 = v => Promise.resolve(v + 10);

//b -> Monad(c)
const asyncDouble = v => Promise.resolve(v * 2);

//d -> Monad(e)
const asyncResult = ComposePromise(asynAdd10, asyncDouble);

asyncResult(2).then(trace("composePromise"));

//general monad composer
const composeM = method => (...ms) => ms.reduce((f, g) => x => g(x)[method](f));

const composeMap = composeM("map");

const composeIncAndAdd10 = composeMap(inc, add10);

console.log(composeMap);

const Id = value => ({
  map: f => Id.of(f(value)),
  chain: f => f(value),
  toString: () => `Id(${value})`
});

Id.of = Id;

const g = n => Id(n + 1);

const f = n => Id(n * 2);

trace("Id monad left identity")([Id(33).chain(Id.of), Id(33)]);
