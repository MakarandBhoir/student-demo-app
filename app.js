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

    function deleteStudent(index) {
        const students = getStudents();
        students.splice(index, 1);
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
            const span = document.createElement('span');
            span.textContent = `${idx + 1}. ${student.name} (Age: ${student.age}, Grade: ${student.grade})`;
            const btn = document.createElement('button');
            btn.textContent = 'Delete';
            btn.className = 'delete-btn';
            btn.dataset.index = idx;
            btn.setAttribute('aria-label', `Delete ${student.name}`);
            li.appendChild(span);
            li.appendChild(btn);
            studentList.appendChild(li);
        });
    }

    studentList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            deleteStudent(index);
        }
    });

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
