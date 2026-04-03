// Student Management App

document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');

    function getStudents() {
        const students = localStorage.getItem('students');
        return students ? JSON.parse(students) : [];
    }

    function saveStudents(students) {
        localStorage.setItem('students', JSON.stringify(students));
    }

    function addStudent(student) {
        const students = getStudents();
        students.push(student);
        saveStudents(students);
        renderStudents();
    }

    function renderStudents() {
        const students = getStudents();
        studentList.innerHTML = '';
        if (students.length === 0) {
            studentList.innerHTML = '<li>No students found.</li>';
            return;
        }
        students.forEach((student, idx) => {
            const li = document.createElement('li');
            li.textContent = `${idx + 1}. ${student.name} (Age: ${student.age}, Grade: ${student.grade})`;
            studentList.appendChild(li);
        });
    }

    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value.trim();
        const grade = document.getElementById('grade').value.trim();
        if (name && age && grade) {
            addStudent({ name, age, grade });
            studentForm.reset();
        }
    });

    renderStudents();
});
