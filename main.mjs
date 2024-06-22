import { LinkedList } from "./linkedList.mjs";

const list = new LinkedList();
list.append(10); // Add 10 to the end
list.append(20); // Add 20 to the end
list.append(30); // Add 20 to the end
list.prepend(5); // Add 5 to the start

console.log(list.size());
console.log(list.head());
console.log(list.tail());
console.log(list.at(2));
console.log(list.contains(20));
console.log(list.find(10));
console.log(list.toString());

list.insertAt(15, 1); // Insert 15 at index 1
console.log(list.toString());

list.removeAt(1); // Remove node at index 1
console.log(list.toString());
