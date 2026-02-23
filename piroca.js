// Função para carregar os contatos do LocalStorage
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const tableBody = document.getElementById('contact-table').getElementsByTagName('tbody')[0];
    const contactCount = document.getElementById('contact-count');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos
    contacts.forEach((contact, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = contact.name;
        row.insertCell(1).innerText = contact.email;
        row.insertCell(2).innerText = contact.phone;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
            <button class="edit" onclick="editContact(${index})">Editar</button>
            <button class="delete" onclick="deleteContact(${index})">Excluir</button>
        `;
    });
    contactCount.innerText = contacts.length;
}

// Função para adicionar um contato
function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ name, email, phone });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts(); // Atualiza a tabela
}

// Função para excluir um contato
function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts(); // Atualiza a tabela
}

// Função para editar um contato
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    // Alterando o botão para atualizar o contato
    const button = document.querySelector('button');
    button.innerText = 'Atualizar';
    button.onclick = () => updateContact(index);
}

// Função para atualizar o contato
function updateContact(index) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts[index] = { name, email, phone };
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Reseta o botão e limpa os campos
    const button = document.querySelector('button');
    button.innerText = 'Cadastrar';
    button.onclick = addContact;

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    loadContacts(); // Atualiza a tabela
}

// Função para filtrar contatos
document.getElementById('filter').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter));
    
    // Atualiza a tabela com os contatos filtrados
    const tableBody = document.getElementById('contact-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    filteredContacts.forEach((contact, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = contact.name;
        row.insertCell(1).innerText = contact.email;
        row.insertCell(2).innerText = contact.phone;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
            <button class="edit" onclick="editContact(${index})">Editar</button>
            <button class="delete" onclick="deleteContact(${index})">Excluir</button>
        `;
    });
});

// Carregar os contatos ao iniciar a página
window.onload = loadContacts;
