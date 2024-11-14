// 4. Maps
// A map is a collection of key-value pairs, similar to an object, 
// but it allows any data type as a key and maintains the order of elements.

// set: Adds a key-value pair to the map.
// get: Retrieves the value associated with a specific key.
// has: Checks if a specified key exists in the map.
// delete: Removes a specified key-value pair from the map.
// clear: Removes all key-value pairs from the map.
// size: Returns the number of key-value pairs in the map.

const set = new Set([1, 2, 3]);

// add
set.add(4); // Set {1, 2, 3, 4}

// delete
set.delete(3); // Set {1, 2, 4}

// has
const hasTwo = set.has(2); // true

// clear
set.clear(); // Set {}

// size
const size = set.size; // 0 (after clearing, it's now empty)

