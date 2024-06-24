import { hashFunction } from "./hashFunction.mjs";
import { LinkedList } from "../linkedLists/linkedList.mjs";

export class HashMap {
  constructor(initialCapacity = 4, loadFactor = 0.75) {
    // Fill each bucket with an empty linked list
    this.buckets = new Array(initialCapacity)
      .fill(null)
      .map(() => new LinkedList());
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  // Add or update a key-value pair.
  set(key, value) {
    let index = hashFunction(key, this.buckets.length);

    // Ensure that the index is in the array's bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    //if the key already exists we overwright the value with the new value
    const keyPosition = bucket.find(key);
    if (keyPosition !== null) {
      bucket.at(keyPosition).value[1] = value;
      return;
    }

    // Append the key, value pair to the linked list
    bucket.append([key, value]);
    this.size++;

    // If loader factor greater than 0.75 then resize buckets
    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize();
    }
  }

  // Take one argument as a key and return the value that is assigned to this key. If a key is not found, return null
  get(key) {
    const index = hashFunction(key, this.buckets.length);

    // Ensure that the index is in the array's bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    // Find the key in the bucket
    const keyPosition = bucket.find(key);
    if (keyPosition !== null) {
      return bucket.at(keyPosition).value[1]; // If we foound it, return the value
    }
    return null; // If we did not found it, return null
  }

  // Take a key as an argument and return true or false based on whether or not the key is in the hash map
  has(key) {
    const index = hashFunction(key, this.buckets.length);

    // Ensure that the index is in the array's bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    // Find the key in the bucket
    const keyPosition = bucket.find(key);
    if (keyPosition !== null) {
      return true; // If we found it, return true
    }
    return false; // If we did not found it, return false
  }

  // Take a key as an argument. If the given key is in the hash map, we should remove the entry with that key and return true.
  // If the key isn’t in the hash map, we should return false.
  remove(key) {
    const index = hashFunction(key, this.buckets.length);

    // Ensure that the index is in the array's bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];
    // Find the key in the bucket
    const keyPosition = bucket.find(key);
    if (keyPosition !== null) {
      bucket.removeAt(keyPosition);
      this.size--;
      return true; // If we found it, return true
    }
    return false; // If we did not found it, return false
  }

  // Return the number of entries.
  length() {
    return this.size;
  }

  // Return an array containing all the keys inside the hash map.
  keys() {
    const keys = [];

    for (const bucket of this.buckets) {
      bucket.toArray().forEach((item) => {
        keys.push(item[0]);
      });
    }

    return keys;
  }

  // Return an array containing all the values.
  values() {
    const values = [];

    for (const bucket of this.buckets) {
      bucket.toArray().forEach((item) => {
        values.push(item[1]);
      });
    }

    return values;
  }

  // Return an array that contains each key, value pair
  entries() {
    const entries = [];

    for (const bucket of this.buckets) {
      bucket.toArray().forEach((item) => {
        entries.push(item);
      });
    }

    return entries;
  }

  // Remove all entries in the hash map.
  clear() {
    this.buckets = new Array(this.buckets.length)
      .fill(null)
      .map(() => new LinkedList());
    this.size = 0;
  }

  // Resize buckets
  resize() {
    // Copy the buckets and the entries
    const prevBuckets = this.buckets;
    const allEntries = this.entries();

    // Create a new array with double of the size
    this.buckets = new Array(prevBuckets.length * 2)
      .fill(null)
      .map(() => new LinkedList());
    this.size = 0;

    // Hash the entries and add them to the new buckets
    allEntries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
}
