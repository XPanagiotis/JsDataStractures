export function hashFunction(key, bucketSize) {
  let hashCode = 0;
  let primeNumber = 31;
  for (let i = 0; i <= key.length - 1; i++) {
    hashCode = hashCode * primeNumber + key.charCodeAt(i);
  }
  return hashCode % bucketSize;
}
