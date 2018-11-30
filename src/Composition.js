const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const add = a => b => a + b;

const inc = add(1);

const multiply = a => b => a * b;

const double = multiply(2);

//Imperative composition
const doStuffBadly = x => {
  const afterIncrement = inc(x);
  const afterDouble = double(afterIncrement);

  return afterDouble;
};

//Declarative composition
const doStuffBetter = pipe(
  inc,
  double
);

console.log(doStuffBadly(5), doStuffBetter(5));

const signInUser = user => (user.signedIn = true);

const user1 = {
  name: "Foo",
  signedIn: false
};

signInUser(user1);

console.log("==>", user1);

const authenticateUser = user => ({ ...user, signedIn: true });

const user2 = {
  name: "Bar",
  signedIn: false
};

const authUser = authenticateUser(user2);

console.log("user2==>", user2);
console.log("authUser==>", authUser);

console.log("----------------------Isolate I/O----------------------- ");

const log = (...args) => console.log(...args);

const readUser = () => Promise.resolve({ msgUser: "Hi I am a User" });

const getFolderInfo = () => Promise.resolve({ msgFolder: "Hi I am a folder" });

const haveWriteAccess = ({ msgUser, msgFolder }) =>
  Promise.resolve({ msgUser, msgFolder });

const uploadToFolder = () => Promise.resolve("Success!!!!");

const user = "123";
const folder = "456";
const files = ["a", "b", "c"];
// async function uploadFiles({user, folder, files}) {
//   const dbUser = await readUser({ user });
//   const folderInfo = await getFolderInfo({ folder });
//   if (await haveWriteAccess({dbUser, folderInfo})) {
//     return uploadToFolder({dbUser, folderInfo, files });
//   } else {
//     throw new Error("No write access to that folder");
//   }
// }
// uploadFiles({user, folder, files})
//   .then(log);

const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);

const uploadFiles = asyncPipe(
  readUser,
  getFolderInfo,
  haveWriteAccess,
  uploadToFolder
);

uploadFiles({ user, folder, files })
  .then(log)
  .catch(log);

log("-------Use objects that represent future computations---");

const call = (fn, ...args) => ({ fn, args });

const put = msg => ({ msg });

const sendMessage = msg => Promise.reject(`Some response with msg: ${msg}`);

const handleResponse = response => ({
  type: "RECEIVED_RESPONSE",
  payload: response
});

const handleError = err => ({
  type: "IO_ERROR",
  payload: err
});

function* sendMessageSaga(msg) {
  try {
    const response = yield call(sendMessage, msg);
    yield put(handleResponse(response));
  } catch (err) {
    yield put(handleError(err));
  }
}

const iter = sendMessageSaga("Bonjour Cava!");

const step1 = iter.next();

log(step1);

const errStep = iter.throw("aaaa");

log(errStep);
