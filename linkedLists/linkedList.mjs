import { Node } from "./node.mjs";

export class LinkedList {
  constructor() {
    this.headNode = null;
  }

  //add a new node to the end of the list
  append(value) {
    const newNode = new Node(value);

    //check if the list is empty
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }

    //if it's not, we traverse through the last node
    let current = this.headNode;
    while (current.nextNode) {
      //link the last node to the new node
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  //add a new node to the start of the list
  prepend(value) {
    //set the headNode to the newNode
    const newNode = new Node(value, this.headNode);
    this.headNode = newNode;
  }

  //return the total number of nodes in the list
  size() {
    let size = 1;
    let current = this.headNode;
    //traverse throught the list
    while (current) {
      size++;
      current = current.nextNode;
    }
    return size;
  }

  //return the head node
  head() {
    return this.headNode;
  }

  //return the last node of the list
  tail() {
    let current = this.headNode;

    if (!current) return null; // return null if the list is empty

    //traverse through the list
    while (current.nextNode) {
      current = current.nextNode;
    }

    return current; //return the last node
  }

  //return the node at the given index
  at(index) {
    if (index < 0) return null; //return null for invalid index

    let current = this.headNode;
    let count = 0;
    while (current && count < index) {
      //traverse to the index
      current = current.nextNode;
      count++;
    }
    //return the node or null if index is out of bounds
    return current || null;
  }

  //remove the last element from the list
  pop() {
    //do nothing if the list is empty
    if (!this.headNode) return;

    //if there is only one node set the head node to null
    if (!this.nextNode.nextNode) {
      this.headNode = null;
      return;
    }

    //traverse through the list
    let current = this.head;
    while (current.nextNode && current.nextNode.nextNode) {
      current = current.nextNode;
    }
    //remove the last node
    current.nextNode = null;
  }

  //return true if the passed in value is in the list and otherwise return false.
  contains(value) {
    let current = this.headNode;

    //traverse through the list
    while (current) {
      if (current.value === value) return true; //if we find it we return true
      current = current.nextNode;
    }
    return false; //otherwise we return false
  }

  //return the index of the node containing value, or null if not found.
  find(value) {
    //["key", "value"]
    let current = this.headNode;
    let index = 0;
    //traverse through the list
    while (current) {
      //we check is the value is in the list
      //OR
      //in the case we have as values, [key, value] pairs (hash map), we check if the key is equal to the key we searching
      if (current.value === value || current.value[0] === value) return index; //return index if found
      current = current.nextNode;
      index++;
    }
    return null; //return null if not found
  }

  //represent the LinkedList objects as strings, so you can print them out and preview them in the console.
  //The format will be: ( value ) -> ( value ) -> ( value ) -> null
  toString() {
    let current = this.headNode;
    let result = "";
    //traverse through the list
    while (current) {
      result += `(${current.value}) -> `;
      current = current.nextNode;
    }

    //append null at the end
    return result + "null";
  }

  //insert a new node with the provided value at the given index
  insertAt(value, index) {
    if (index < 0) return null; //return null for invalid node

    //if index is 0 we prepend the new node
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    let prevNode = this.at(index - 1);
    //if prevNode is null, index is out of bounds
    if (!prevNode) return null;

    newNode.nextNode = prevNode.nextNode;
    prevNode.nextNode = newNode;
  }

  //remove the node at the given index.
  removeAt(index) {
    if (index < 0 || !this.headNode) return null; //do nothing for invalid index or empty list

    //if index is 0 we remove the head
    if (index === 0) {
      if (!this.headNode) return null;
      this.headNode = this.headNode.nextNode;
      return;
    }

    const prevNode = this.at(index - 1);
    //if prevNode is null, index is out of bounds
    if (!prevNode || !prevNode.nextNode) return null;

    prevNode.nextNode = prevNode.nextNode.nextNode;
  }

  //get an array with all the values of the list
  toArray() {
    const valuesArray = [];

    let current = this.headNode;
    while (current) {
      valuesArray.push(current.value);
      current = current.nextNode;
    }
    return valuesArray;
  }
}
