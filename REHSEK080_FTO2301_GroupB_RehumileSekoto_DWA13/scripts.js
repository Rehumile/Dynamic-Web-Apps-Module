// data
const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

//console log each name
names.forEach(console.log);

//console log each name with a province eg. Ashwin (Western Cape)
names.forEach((person, provinceIndex) => {
  const province = provinces[provinceIndex];
  console.log(`${person} (${province})`);
});

// console log new array with province names in uppercase using map
const upperCase = provinces.map((item) => item.toUpperCase());
console.log("UPPER CASE PROVINCES", upperCase);

// loop over names and display number of characters using map
const numOfChar = names.map((item) => item.length);
console.log("NUMBER OF CHARACTERS", numOfChar);

// use toSorted to sort all provinces alphabetically
const sortedProvinces = provinces.toSorted();
console.log("SORTED PROVINCES", sortedProvinces);

// use filter to remove provinces with word 'cape'
const filteredProvinces = provinces.filter((item) => {
  return !item.includes("Cape");
});
console.log('PROVINCES WITHHOUT "CAPE"', filteredProvinces);

//using map and some to determine whether a name contains an S character
const includesSArray = names.map(
  (name) => name.includes("S") || name.includes("s")
);
console.log(includesSArray);

// use reduce to turn into object
const result = names.reduce((acc, curr, index) => {
  acc[curr] = provinces[index];
  return acc;
}, {});
console.log(result);

// Exercise 2


const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// console log each product name using forEach
products.forEach((item) => {
  console.log(item.product);
});

// filter products that have a name longer than 5 characters
const filteredProducts = products.filter((item) => item.product.length >= 5);
console.log(filteredProducts)
// use filter and map to convert price to num and remove prices
//without num then calculate total using reduc
const prices = products
  .map((item) => parseInt(item.price))
  .filter((item) => {
    return !isNaN(item);
  });

const totalPrice = prices.reduce((total, item) => {
  return total + item;
}, 0);
console.log(totalPrice)

// concatenate product names using reduce
const concatenatedList = products.reduce((current, item) => {
  if (current === "") {
    return item.product;
  } else return ` ${current}, ${item.product}`;
}, "");
console.log(concatenatedList)

// find highest and lowest-priced items
const highestProduct = products.reduce((highestItem, item) => {
  const priceNum = parseInt(item.price);
  if (priceNum > highestItem.price || !highestItem.price) {
    return item;
  } else {
    return highestItem;
  }
}, {});

const LowestProduct = products.reduce((LowestItem, item) => {
  const priceNum = parseInt(item.price);
  if (priceNum < LowestItem.price || !LowestItem.price) {
    return item;
  } else {
    return LowestItem;
  }
}, {});
console.log(`Lowest: ${LowestProduct.product}. Highest: ${highestProduct.product}`)

// change product to name and price to cost
const changedArray = products.reduce((accumalator, item) => {
  const modifiedItem = Object.entries(item).reduce((newItem, [key, value]) => {
    if (key === "product") {
      newItem["name"] = value;
    } else if (key === "price") {
      newItem["cost"] = value;
    } else {
      newItem[key] = value;
    }
    return newItem;
  }, {});

  accumalator.push(modifiedItem);
  return accumalator;
}, []);

console.log(changedArray);


