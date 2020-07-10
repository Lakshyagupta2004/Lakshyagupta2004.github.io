//Variables
const cart = document.getElementById('cart');
const courses = document.getElementById('courses');
const emptyCartBtn = document.getElementById('empty-cart');
const list = document.querySelector('#list');


//Listeners
console.log(list);
loadEventListeners();
function loadEventListeners() {
  courses.addEventListener('click', buyCourse);
  cart.addEventListener('click', deleteCourse);
  emptyCartBtn.addEventListener('click', emptyCart);
  document.addEventListener('DOMContentLoaded', readLocalStorage);
}


//Functions

//Add course to cart
function buyCourse(e){
  e.preventDefault();
  if(e.target.classList.contains('add-cart')){
    const course = e.target.parentElement.parentElement;
    readDataCourse(course);
  }
}

//Read Data Course
function readDataCourse(course){
  const info = {
    image: course.querySelector('img').src,
    title: course.querySelector('h5').textContent,
    price: course.querySelector('.discount').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  insertInCart(info);
}

//Insert to Cart
function insertInCart(course) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${course.image}" width=100%>
  </td>
  <td>${course.title}</td>
  <td>${course.price}</td>
  <td><a href="#" class="delete-course" data-id="${course.id}">X</a></td>
  `;
  list.appendChild(row);
  saveCourseLocalStorage(course);
}

//Remove item from cart
function deleteCourse(e) {
  e.preventDefault();
  let course, courseID;
  if (e.target.classList.contains('delete-course')) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseID = course.querySelector('a').getAttribute('data-id');
  }
  deleteCourseLocalStorage(courseID);
  console.log(course);
}

//Empty the cart
function emptyCart() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  emptyLocalStorage();
  return false;
}

//Store courses to local storage
function saveCourseLocalStorage(course) {
  let courses;
  courses = getCoursesLocalStorage();
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}

//Check for items in local storage
function getCoursesLocalStorage() {
  let courseLS;
  if (localStorage.getItem('courses') === null) {
    courseLS = [];
  }
  else
  {
    courseLS = JSON.parse(localStorage.getItem('courses'));
  }
  return courseLS;
}

//put items from local storage into cart
function readLocalStorage() {
  let coursesLS;
  coursesLS = getCoursesLocalStorage();
  coursesLS.forEach(function(course) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${course.image}" width=100%>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td><a href="#" class="delete-course" data-id="${course.id}">X</a></td>
    `;
    list.appendChild(row);
  });
}
    
//Delete courses by ID in cart
function deleteCourseLocalStorage(courseID) {
  let coursesLS;
  coursesLS = getCoursesLocalStorage();
  coursesLS.forEach( function( courseLS, index) {
    if (courseLS.id === courseID) {
      coursesLS.splice(index, 1);      
    }
  });
  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//Empty cart in local storage
function emptyLocalStorage() {
  localStorage.clear();
}
