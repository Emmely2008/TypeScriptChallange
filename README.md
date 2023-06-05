### The Challange

```
// Extend this type to make it support the usage below.
// path should be recieved in dot notation and should give suggestions on keys.
// correct return type should be calculated depending on the given path.
declare function get(obj: {}, path: string): unknown;

const object = {
    "user": {
        "fullName": "Janis Pagac",
        "age": 30,
        "address": {
            "street": "83727 Beatty Garden",
            "city": "Hamilton"
        },
        "friends": {
            "0": {
                "fullName": "Franklin Kuhn",
                "age": 20
            },
            "1": {
                "fullName": "Hubert Sawayn"
            }
        }
    }
} ;

const fullName = get(object, "user.fullName");
const age = get(object, "user.age");
const street = get(object, "user.address.street");
const fullNameOfFriend = get(object, "user.friends.0.fullName");
const ageOfFriend = get(object, "user.friends.0.age");
```


### The solution

In my solution, I first defined the `User` type by combining the properties of the `Person` interface with additional properties like `address` and `friends` using key mappings. This ensures that the `User` type includes all the necessary properties and avoiding redundancy.

Next, I introduced the `getPossibleKeys` type, which generates valid path keys as strings based on the object type. This type handles arrays by using __conditional types__ to recursively generate keys for array elements. This allows for proper suggestions on keys when using dot notation.

The valid path keys for the object in the example is:

`"fullName"`
`"age"`
`"friends.0.fullName"`
`"friends.0.age"`
`"address.city"`
`"address.street"`

To extract the correct return type based on the given path, I defined the `GetValue` type. This type traverses the object based on the keys in the path, checking for object and array types along the way. The return type is determined by the final key in the path.


#### Why I dropped the string `user`

When I dropped the "user" part in the paths like get(object, "user.fullName"), it was because the object itself was already an instance of the User type. Since the User type includes all the properties defined in the Person interface, as well as the address and friends properties, I could directly access the properties of object without specifying the "user" property in the path.

So instead of using get(object, "user.fullName"), I could simply use get(object, "fullName") because the fullName property is already part of the User type. The same applied to other properties like age, address.street, and so on. They were all directly accessible on the object of type User.

By defining const object: User = { ... }, I created an instance of the User type that included all the required properties defined in the User type itself, as well as the properties inherited from the Person interface.