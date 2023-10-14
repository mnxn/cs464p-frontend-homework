const form = document.querySelector('#main-form');
const nameInput = form.elements.name;
const emailInput = form.elements.email;
const statusInput = form.elements.status;
const coursesInput = form.elements.courses;
const commentsInput = form.elements.comments;

const handleInput = function handleInput(event) {
  event.preventDefault();

  const courses = Array.from(coursesInput)
    .filter((e) => e.checked)
    .map((e) => e.value)
    .join(', ');

  console.group('Form Submission');
  console.log(`Full Name: ${nameInput.value}`);
  console.log(`Email: ${emailInput.value}`);
  console.log(`Registration Status: ${statusInput.value}`);
  console.log(`Courses: ${courses}`);
  console.log(`Comments: ${commentsInput.value}`);
  console.groupEnd();
};

form.addEventListener('submit', handleInput);
