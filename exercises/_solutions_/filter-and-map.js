const items = [
  { time: '5:17', name: 'Flexbox Video' },
  { time: '8:22', name: 'Redux Video' },
  { time: '3:34', name: 'Flexbox Video' },
  { time: '5:23', name: 'Flexbox Video' },
  { time: '7:24', name: 'Redux Video' },
  { time: '6:46', name: 'Flexbox Video' },
  { time: '4:45', name: 'Flexbox Video' },
  { time: '7:58', name: 'Flexbox Video' },
  { time: '11:51', name: 'Redux Video' },
  { time: '9:13', name: 'Flexbox Video' },
  { time: '5:50', name: 'Flexbox Video' },
  { time: '5:52', name: 'Redux Video' },
  { time: '5:49', name: 'Redux Video' },
  { time: '8:57', name: 'Flexbox Video' },
  { time: '11:29', name: 'Flexbox Video' },
  { time: '3:07', name: 'Redux Video' },
  { time: '3:31', name: 'Redux Video' },
];

//
// Get the total number seconds for all video's starting with 'Flexbox'
//

// Individual steps:
// .1 Filter for only the elements that contain the word 'Flexbox'
const total = items
  .filter((item) => item.name.includes('Flexbox'))
  // .2 map down to a list of time strings
  .map((item) => item.time)
  // 3. map to an array of seconds
  .map((timeCode) => {
    const parts = timeCode.split(':').map((part) => parseFloat(part));
    return parts[0] * 60 + parts[1];
  })
  // 4. reduce to get total
  .reduce((runningTotal, seconds) => runningTotal + seconds);
console.log(total);

// Optional: 🔥 Do this with a single .reduce()
const total2 = items.reduce((acc, item) => {
  if (item.name.includes('Flexbox')) {
    const parts = item.time.split(':').map((part) => parseFloat(part));
    const secs = parts[0] * 60 + parts[1];
    // const [min, sec] = item.time.split(':').map(part => parseFloat(part));
    // const secs = min * 60 + sec;
    return acc + secs;
  }
}, 0);
console.log(total2);
