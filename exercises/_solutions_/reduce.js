const skills = [
  {
    name: 'Tom',
    skill: 'CSS',
    yearsExperience: 3,
    category: 'Web Design'
  },
  {
    name: 'Jim',
    skill: 'HTML',
    yearsExperience: 10,
    category: 'Web Design'
  },
  {
    name: 'Sue',
    skill: 'JavaScript',
    yearsExperience: 5,
    category: 'Web Development'
  },
  {
    name: 'Maria',
    skill: 'PHP',
    yearsExperience: 7,
    category: 'Web Development'
  },
  {
    name: 'John',
    skill: 'Photoshop',
    yearsExperience: 1,
    category: 'Web Design'
  },
  {
    name: 'David',
    skill: 'Writing',
    yearsExperience: 12,
    category: 'Content'
  },
  {
    name: 'Ellen',
    skill: 'Editor',
    yearsExperience: 5,
    category: 'Content'
  }
];

// Get the total years experience
const totalExperience = skills.reduce((prev, current) => prev + current.yearsExperience, 0);
console.log(totalExperience);

// Get the experience per category
// { 'Web Design': 14, 'Web Development': 12, Content: 17 }
const categoryExperienceTotals = skills.reduce((groupedByCategory, worker) => {
  const category = worker.category;
  if (!groupedByCategory[category]) {
    groupedByCategory[category] = 0;
  }
  groupedByCategory[category] += worker.yearsExperience;
  return groupedByCategory;
}, {});

console.log(categoryExperienceTotals);
