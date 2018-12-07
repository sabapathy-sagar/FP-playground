const log = msg => console.log(msg);

const friends = [
  { id: 1, name: "Sting", nearMe: true },
  { id: 2, name: "Radiohead", nearMe: true },
  { id: 3, name: "NIN", nearMe: false },
  { id: 4, name: "Echo", nearMe: true },
  { id: 5, name: "Zeppelin", nearMe: false }
];

const isNearMe = ({ nearMe }) => nearMe;

const getName = ({ name }) => name;

const friendsNearMe = friends.filter(isNearMe).map(getName);

log(friendsNearMe);

const nastyConcatanator = values =>
  values.reduce((acc, curr) => acc + curr, "");

log(nastyConcatanator(friendsNearMe));

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const isEven = x => x % 2 === 0;

const double = x => x * 2;

const mapR = f => step => (a, c) => step(a, f(c));

const filterR = predicate => step => (a, c) => (predicate(c) ? step(a, c) : a);

const doubleEvens = pipe(
  mapR(double),
  filterR(isEven)
);

const arrayConcat = (a, c) => a.concat(c);

const xform = doubleEvens(arrayConcat);

log([1, 2, 3, 4, 5, 6, 7].reduce(xform, []));

const resFriends = compose(
  filterR(isNearMe),
  mapR(getName)
);

const xform2 = resFriends(arrayConcat);

log(friends.reduce(xform2, []));

const curry = (f, arr = []) => (...args) =>
  (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);

const transduce = curry((step, initial, xform, foldable) =>
  foldable.reduce(xform(step), initial)
);

const toArray = transduce(arrayConcat, []);

const res2 = toArray(doubleEvens, [1, 2, 3, 4, 5, 6, 7]);

log(res2);

log([1, 2, 3, 4, 5, 6, 7].filter(isEven).map(double));

const foo = (...args) => log(args.flatMap(arg => arg));

const arr1 = [1, 2, 3, 4, 5];

foo(arr1);
