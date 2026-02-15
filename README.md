#### Q-1: What is the difference between null and undefined?

**Ans:** null হচ্ছে কোনো variable এর মান যেটা intentionally খালি রাখা হইছে। For example: let x = null;
এবং undefined হচ্ছে কোনো variable এর মান যেটা এখনো assign করা হয় নাই। For example: let x;

#### Q-2: What is the use of the map() function in JavaScript? How is it different from forEach()?

**Ans:** map() function ইউজ করে একটি array-কে নতুন একটি array-তে রুপান্তর করা হয়। এবং forEach() function আলাদা কারন,
forEach() function ইউজ করে array এর প্রত্যেকটা element এর উপর কোনো কাজ করা হয় কিন্তু নতুন array তৈরি হয় না।

#### Q-3: What is the difference between == and ===?

**Ans:** == হচ্ছে যেখানে দুইটা variable এর শুধুমাত্র value compare করা হয়, কিন্তু === ইউজ করে দুইটা variable এর value এবং type দুইটাই compare করা হয়।

#### Q-4: What is the significance of async/await in fetching API data?

**Ans:** API data fetching এর সময় async/await ইউজ করলে কোড better readable হয়, debug করা সহজ হয়, error
handling করা সহজ হয় এবং data fetch হওয়ার সময় synchronous behave করে, যার ফলে application এর performance ভালো থাকে।

#### Q-5: Explain the concept of Scope in JavaScript (Global, Function, Block).

**Ans:** Scope বলতে বুঝায়, কোনো variable কোথায় access করা যাবে।
Global Scope: যে variable যেকোনো জায়গা থেকে access করা যায়, সে variable global scope এ আছে।
Function Scope: কোনো function এর মধ্যে declare করা variable ঐ function এর বাইরে access করা যায় না, এটাই হচ্ছে Function Scope।
Block Scope: কোনো block এর মধ্যে let এবং const ইউজ করে declare করা variable ঐ block এর বাইরে access করা যায় না, এটাই হচ্ছে Block Scope। var এর ক্ষেত্রে Block Scope হয় না।
