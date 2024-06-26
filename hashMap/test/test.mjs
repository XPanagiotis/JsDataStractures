import { HashMap } from "../hashMap.mjs";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.buckets[10].toString()); // 10 is the hash code of "apple"
test.set("apple", "green");
console.log(test.buckets[10].toString()); // 10 is the hash code of "apple"

console.log(test.get("apple"));

console.log(test.has("apple"));
console.log(test.has("orange"));

test.remove("apple");
console.log(test.has("apple"));

console.log(test.length());

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.length());
