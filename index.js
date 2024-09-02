
function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 1, firstName: 'Иван', lastName: 'Иванов', age: 25, email: 'ivan@example.com', photoUrl: '' },
                { id: 2, firstName: 'Петр', lastName: 'Петров', age: 30, email: 'petr@example.com', photoUrl: '' },
                { id: 3, firstName: 'Мария', lastName: 'Иванова', age: 22, email: 'maria@example.com', photoUrl: '' },
            ];
            resolve(users);
        }, 1000);
    });
}

function renderUsers(filteredUsers) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    filteredUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <img src="${user.photoUrl || ''}" alt="Фото пользователя" width="100">
            <div class="user-info">
                <p>Имя: ${user.firstName}</p>
                <p>Фамилия: ${user.lastName}</p>
                <p>Возраст: ${user.age}</p>
                <p>Email: ${user.email}</p>
            </div>
            <div class="photo-upload">
                <input type="file" accept="image/*" data-user-id="${user.id}">
            </div>
        `;

        userList.appendChild(userCard);
    });

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });
}

// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const userId = event.target.getAttribute('data-user-id');

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const user = users.find(u => u.id === parseInt(userId));
            if (user) {
                user.photoUrl = e.target.result;
                renderUsers(filterUsers());
            }
        };
        reader.readAsDataURL(file);
    }
}

function filterUsers() {
    const ageFilter = document.getElementById('ageFilter').value;
    const firstNameFilter = document.getElementById('firstNameFilter').value.toLowerCase();
    const lastNameFilter = document.getElementById('lastNameFilter').value.toLowerCase();

    return users.filter(user => 
        (user.age >= (ageFilter || 0)) &&
        (user.firstName.toLowerCase().includes(firstNameFilter)) &&
        (user.lastName.toLowerCase().includes(lastNameFilter))
    );
}

function init() {

    fetchUserData().then(data => {
        users = data;
        renderUsers(users);

        document.getElementById('ageFilter').addEventListener('input', () => {
            renderUsers(filterUsers());
        });

        document.getElementById('firstNameFilter').addEventListener('input', () => {
            renderUsers(filterUsers());
        });

        document.getElementById('lastNameFilter').addEventListener('input', () => {
            renderUsers(filterUsers());
        });
    }).catch(error => {
        console.error('Error fetching user data:', error);
    });
}

init();