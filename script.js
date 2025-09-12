const studentForm = document.getElementById("studentForm");
const tableBody = document.querySelector("tbody");

let students = [];
let editIndex = -1;

// form submission handle
studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields!");
    return;
  }

  const student = { name, studentId, email, contact };

  if (editIndex === -1) {
    // Add new student
    students.push(student);
  } else {
    // Update existing student
    students[editIndex] = student;
    editIndex = -1;
  }

  studentForm.reset();
  renderStudents();
});

// Render the students in table
function renderStudents() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
  <td class="border-2 p-3">${student.name}</td>
  <td class="border-2 p-3">${student.studentId}</td>
  <td class="border-2 p-3">${student.email}</td>
  <td class="border-2 p-3">${student.contact}</td>
  <td class="border-2 p-3 text-center">
    <div class="flex justify-center gap-2">
      <button onclick="editStudent(${index})" class="bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer px-3 py-2 rounded text-sm">
        <i class="fa fa-edit"></i>
      </button>
      <button onclick="deleteStudent(${index})" class="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-3 py-2 rounded text-sm">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </td>
`;

    tableBody.appendChild(row);
  });
}

// For Edit Student Record
function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  editIndex = index;
}

// For Delete Student Record
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    renderStudents();
  }
}
