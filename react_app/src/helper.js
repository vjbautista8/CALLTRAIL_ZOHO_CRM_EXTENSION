export const convertListStringToArray = (listString) => {
  listString = listString.replace(/'/g, '"'); // Replace single quotes with double quotes
  return JSON.parse(listString); // Parse the JSON string into an array
};
export const isEmptyObject = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);

  // Check if the object is empty
  if (keys.length === 0) {
    return true;
  }

  // Check if any property has an undefined value
  return keys.every((key) => value[key] === undefined);
};

export const isValidDurationFormat = (text) => {
  const regex = /^\d{1,3}:\d{2}$/;
  return regex.test(text);
};
export const removeElement = (arr, element) =>
  arr.filter((item) => item !== element);

export const addElement = (arr, element) => [...arr, element];

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const toggleElementList = (arr, element) => {
  // Check if the element exists in the array
  if (arr.includes(element)) {
    // Remove the element if it exists
    return arr.filter((item) => item !== element);
  } else {
    // Add the element if it doesn't exist
    return [...arr, element];
  }
};

export const sortByKey = (list, key) => {
  // Sort the list based on the key
  const sortedList = list.sort((a, b) => (a[key] > b[key] ? 1 : -1));

  // Remove duplicates
  const seen = new Set();
  const uniqueList = sortedList.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });

  return uniqueList;
};

export const sortAndRemoveDuplicates = (list, key, ascending = true) => {
  // Create a copy of the list to avoid mutating the original array
  const listCopy = [...list];

  // Sort the list based on the key and order
  const sortedList = listCopy.sort((a, b) => {
    if (ascending) {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });

  // Remove duplicates
  const seen = new Set();
  const uniqueList = sortedList.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });

  return uniqueList;
};
// Example usage:
// const items = [
//   { name: 'John', age: 25 },
//   { name: 'Jane', age: 22 },
//   { name: 'Bob', age: 30 },
//   { name: 'John', age: 25 },
//   { name: 'Alice', age: 22 },
// ];

// // Sort ascending by 'name'
// const sortedUniqueItemsAsc = sortAndRemoveDuplicates(items, 'name', true);
// console.log(sortedUniqueItemsAsc);

// // Sort descending by 'name'
// const sortedUniqueItemsDesc = sortAndRemoveDuplicates(items, 'name', false);
// console.log(sortedUniqueItemsDesc);
export const findObjectByKeyValue = (list, key, value) => {
  return list.find((item) => item[key] === value);
  // Example usage:
  // const items = [
  //   { name: 'John', age: 25 },
  //   { name: 'Jane', age: 22 },
  //   { name: 'Bob', age: 30 },
  //   { name: 'Alice', age: 28 },
  // ];

  // const result = findObjectByKeyValue(items, 'name', 'Jane');
  // console.log(result); // Output: { name: 'Jane', age: 22 }

  // const result2 = findObjectByKeyValue(items, 'age', 30);
  // console.log(result2); // Output: { name: 'Bob', age: 30 }
};

export const sortObjectsByKeyValuePosition = (list, key, value, position) => {
  // Find the object with the specified key-value pair
  const targetIndex = list.findIndex((item) => item[key] === value);

  if (targetIndex === -1) {
    console.warn(`No object with ${key} = ${value} found in the list.`);
    return list;
  }

  // Remove the object from its current position
  const [targetObject] = list.splice(targetIndex, 1);

  // Insert the object at the specified position
  list.splice(position, 0, targetObject);

  return list;
  // Example usage:
  // const items = [
  //   { name: 'John', age: 25 },
  //   { name: 'Jane', age: 22 },
  //   { name: 'Bob', age: 30 },
  //   { name: 'Alice', age: 28 },
  // ];

  // // Move the object with name 'Jane' to the position 2 (third position, 0-based index)
  // const sortedItems = sortObjectsByKeyValuePosition(items, 'name', 'Jane', 2);
  // console.log(sortedItems);
  // // Output:
  // // [
  // //   { name: 'John', age: 25 },
  // //   { name: 'Bob', age: 30 },
  // //   { name: 'Jane', age: 22 },
  // //   { name: 'Alice', age: 28 }
  // // ]
};

export const findIndexByKeyValue = (list, key, value) => {
  return list.findIndex((item) => item[key] === value);
  // Example usage:
  // const items = [
  //   { name: 'John', age: 25 },
  //   { name: 'Jane', age: 22 },
  //   { name: 'Bob', age: 30 },
  //   { name: 'Alice', age: 28 },
  // ];

  // const index = findIndexByKeyValue(items, 'name', 'Jane');
  // console.log(index); // Output: 1

  // const index2 = findIndexByKeyValue(items, 'age', 30);
  // console.log(index2); // Output: 2
};

export const findIndexOfElement = (array, element) => {
  return array.findIndex((item) => item === element);
  // Example usage:
  // const items = ['John', 'Jane', 'Bob', 'Alice'];

  // const index = findIndexOfElement(items, 'Jane');
  // console.log(index); // Output: 1

  // const index2 = findIndexOfElement(items, 'Bob');
  // console.log(index2); // Output: 2

  // const index3 = findIndexOfElement(items, 'Charlie');
  // console.log(index3); // Output: -1 (element not found)
};

export const changeOrder = (list, element, newPosition) => {
  // Find the index of the element
  const currentIndex = list.indexOf(element);

  // If the element is not found, return the original list
  if (currentIndex === -1) {
    console.warn(`Element "${element}" not found in the list.`);
    return list;
  }

  // Create a new array to avoid mutating the original array
  const newList = [...list];

  // Remove the element from its current position
  newList.splice(currentIndex, 1);

  // Adjust the new position
  if (newPosition === -1) {
    newPosition = newList.length; // Move to the last position
  } else if (newPosition === 0) {
    newPosition = 0; // Move to the first position
  }

  // Insert the element at the new position
  newList.splice(newPosition, 0, element);

  return newList;
  // // Example usage:
  // const items = ['John', 'Jane', 'Bob', 'Alice'];

  // // Move 'Jane' to position 2 (third position, 0-based index)
  // const newOrder = changeOrder(items, 'Jane', 2);
  // console.log(newOrder); // Output: ['John', 'Bob', 'Jane', 'Alice']

  // // Move 'Bob' to position 0 (first position, 0-based index)
  // const newOrder2 = changeOrder(items, 'Bob', 0);
  // console.log(newOrder2); // Output: ['Bob', 'John', 'Jane', 'Alice']
};
export const convertListToString = (list) => list.join(',');

// // Example usage:
// const items = ["ONecall", "MRO", "Drone", "Direct Hire", "Contract Crew"];

// const result = convertListToString(items);
// console.log(result); // Output: "ONecall,MRO,Drone,Direct Hire,Contract Crew"

export const openNewTab = (link) => {
  window.open(link, '_blank');
};

export const sortList = (list, key, ascending = true) => {
  // Create a copy of the list to avoid mutating the original array
  const listCopy = [...list];

  // Sort the list based on the key and order
  const sortedList = listCopy.sort((a, b) => {
    if (ascending) {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });

  return sortedList;
};

// Example usage:
// const items = [
//   { name: 'John', age: 25 },
//   { name: 'Jane', age: 22 },
//   { name: 'Bob', age: 30 },
//   { name: 'Jane', age: 28 },
//   { name: 'Alice', age: 22 },
// ];

// const sortedItems = sortList(items, 'name');
// console.log(sortedItems);
// // Output:
// // [
// //   { name: 'Alice', age: 22 },
// //   { name: 'Bob', age: 30 },
// //   { name: 'Jane', age: 22 },
// //   { name: 'Jane', age: 28 },
// //   { name: 'John', age: 25 }
// // ]
