// Extend this type to make it support the usage below.
// path should be recieved in dot notation and should give suggestions on keys.
// correct return type should be calculated depending on the given path.

interface Person {
    fullName: string;
    age: number;
}

type User = {
    address: {
        street: string;
        city: string;
    };
} & { [K in keyof Person]: Person[K] } & {
    friends: { [K in keyof Person]?: Person[K] }[];
};

type getPossibleKeys<T, P extends keyof T = keyof T> = P extends keyof T
    ? T[P] extends Array<unknown>
    ? `${P & string}.${number}.${getPossibleKeys<T[P][0]> & string}`
    : T[P] extends object
    ? `${P & string}.${getPossibleKeys<T[P]> & string}`
    : P
    : P;

type GetValue<T, P extends string, K1 = T, K2 = P, K3 = never> =
    K1 extends object
    ? K2 extends `${infer Key}.${infer Rest}`
    ? Key extends keyof K1
    ? Rest extends string
    ? GetValue<K1[Key], Rest, K1[Key], Rest, K3>
    : K1[Key] extends Array<unknown>
    ? GetValue<K1[Key][number], Rest, K1[Key][number], Rest, K3>
    : K1[Key]
    : never
    : never
    : K3 extends keyof K1
    ? K1[K3]
    : never;

declare function get<T, P extends string>(obj: T, path: getPossibleKeys<T, P & keyof T>): GetValue<T, P>;

const object: User = {
    fullName: "Janis Pagac",
    age: 30,
    address: {
        street: "83727 Beatty Garden",
        city: "Hamilton",
    },
    friends: [
        {
            fullName: "Franklin Kuhn",
            age: 20,
        },
        {
            fullName: "Hubert Sawayn",
        },
    ],
};

const fullName: User["fullName"] = get(object, "fullName");
const age: User["age"] = get(object, "age");
const city: User["address"]["city"] = get(object, "address.city");
const street: User["address"]["city"] = get(object, "address.street");
const fullNameOfFriend: User["friends"][number]["fullName"] = get(object, "friends.0.fullName");
const ageOfFriend: User["friends"][number]["age"] = get(object, "friends.0.age");
