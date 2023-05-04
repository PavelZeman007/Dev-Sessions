class HashTable {
  // Create a HashTable with table and size initial properties
  // Add hash() function to transofrm keys into indexes
  // Add set() and get() methods for adding and retrieving key/value pairs
  constructor() {
    this.table = new Array(127);
    this.size = 0;
  }

  hash(key) {
    // hash will be sum of the ASCII code of the characters using the charCodeAt()
    // Needs to return number between 0 and 127
    let hash = 0;
    for(let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    // Call the hash() to get index value
    // Assign key/value pairs to the table
    // Increment the size property
    const index = this.hash(key);
    // If the key matches, replace the value at index
    // Else create a new array and push the key/value pair to the index
    const bucket = this.table[index];
    if(!bucket) {
      this.table[index] = [[key, value]];
      this.size++;
    } else {
      const sameKeyItem = bucket.find(item => item[0] === key);
      if(sameKeyItem) {
        sameKeyItem[1] = value;
      } else {
        bucket.push([key, value]);
        this.size++;
      }
    }
  }

  get(key) {
    // Call the hash() to get index value
    // Return the value stored at table[index]
    const index = this.hash(key);
    // Check the second level array
    const bucket = this.table[index];
    if(bucket) {
      const sameKeyItem = bucket.find(item => item[0] === key);
      if(sameKeyItem) {
        return sameKeyItem;
      }
    }
    return undefined;
  }

  remove(key) {
    // Call the hash() to get the index value
    // Check if the table[index] exists and it's length is greater than 0
    // Assign the undefined value to the correct index
    // Decrement size by 1
    // If not, return false
    const index = this.hash(key);
    // Find the correct key, remove the array using splice()
    const bucket = this.table[index];
    if(bucket) {
      const sameKeyItem = bucket.find(item => item[0] === key);
      if(sameKeyItem) {
        bucket.splice(bucket.indexOf(sameKeyItem), 1);
        if(bucket.length === 0) {
          this.table[index] = undefined;
        }
        this.size--;
        return true;
      }
    } else {
      return false;
    }
  }

  display() {
    // Display all key/value pairs stored in HashTable
    for(let i = 0; i < this.table.length; i++) {
      if(this.table[i]) {
        console.log(i, this.table[i]);
      }
    }
  }
}

let birthYears = new HashTable();
birthYears.set("Pavel", 1993);
birthYears.set("Luky", 1991);
birthYears.set("David", 1995);

console.log(birthYears.get("Luky"));
console.log(birthYears.get("David"));
console.log(birthYears.get("Pavel"));
console.log(birthYears.size);

console.log(birthYears.remove("Luky"));
console.log(birthYears.remove("Jazmin"));

birthYears.display();

birthYears.set("Jazmin", 1998);
birthYears.set("Levap", 2050);

console.log(birthYears.remove("Pavel"));

birthYears.display();
console.log(birthYears.size);