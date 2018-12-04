////FACTORY FUNCTIONS//////////

const createUser = ({ userName = "Anonymous", avatar = "abc.png" } = {}) => ({
  userName,
  avatar
});

console.log(createUser());

const swap = ([first, second]) => [second, first];

console.log(swap([1, 2]));

const rotate = ([first, ...rest]) => [...rest, first];

console.log(rotate([1, 2, 3, 4]));

//tuple to Array
const tToA = ([a, b]) => ({ [a]: b });

console.log(tToA(["saa", true]));

///////////////////////////

const withConstructor = constructor => obj => ({
  __proto__: {
    constructor
  },
  ...obj
});

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const withFlying = obj => {
  let isFlying = false;

  return {
    ...obj,
    fly() {
      isFlying = true;
      return this;
    },
    land() {
      isFlying = false;
      return this;
    },
    isFlying() {
      return isFlying;
    }
  };
};

const withBattery = ({ capacity } = {}) => obj => {
  let percentageCharged = 100;

  return {
    ...obj,
    draw(percent) {
      const remaining = percentageCharged - percent;
      percentageCharged = remaining > 0 ? remaining : 0;
      return this;
    },
    getCharge() {
      return percentageCharged;
    },
    getCapacity() {
      return capacity;
    }
  };
};

const createDrone = ({ capacity = "3000mAh" }) =>
  pipe(
    withFlying,
    withBattery({ capacity }),
    withConstructor(createDrone)
  )({});

const myDrone = createDrone({ capacity: "5000mAh" });

console.log(myDrone.land().isFlying());

console.log(myDrone.draw(70).getCharge());

console.log(myDrone.constructor === createDrone);

const createFalcon = obj => pipe(withFlying)({});
const myFalcon = createFalcon({});

console.log(myFalcon.fly().isFlying());

console.log(myFalcon.constructor);

//////FUCK CLASSES/////////////////

class User {
  constructor({ userName, avatar }) {
    this.userName = userName;
    this.avatar = avatar;
  }
}

const currUser = new User({ userName: "Johnny", avatar: "king pet" });

User.prototype = {};

console.log(User.prototype);

console.log("instance of ", currUser instanceof User);
