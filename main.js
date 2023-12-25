const books = document.querySelector('.mybooks');
const form = document.querySelector('.form');
const contacts = document.querySelector('.contacts');
const bookList = document.querySelector('#awesomebooks');

let library = [];

const renderSection = (e) => {
    switch (e.target.id) {
        case 'contacts':
            contacts.classList.remove('hidden');
            books.classList.add('hidden');
            form.classList.add('hidden');
            break;

        case 'form':
            contacts.classList.add('hidden');
            books.classList.add('hidden');
            form.classList.remove('hidden');
            break;

        case 'mybooks':
            contacts.classList.add('hidden');
            form.classList.add('hidden');
            books.classList.remove('hidden');
            displayBook();
            break;
    }
};

const navBtns = document.querySelectorAll('.navitems');
navBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => renderSection(e));
});

const addBook = (title, author) => {
    if (title !== '' && author !== '') {
        library.push({ id: library.length + 1, title, author });
        displayBook();
    }
};

const removeBook = (id) => {
    library = library.filter((el) => el.id !== id);
    displayBook();
};

const displayBook = () => {
    bookList.innerHTML = '';

    if (library.length) {
        const ul = document.createElement('ul');
        library.forEach((el) => {
            const li = document.createElement('li');
            const trash = document.createElement('span');
            trash.innerHTML = `<i id=${el.id} class="fa-sharp fa-solid fa-trash"></i>`;
            trash.addEventListener('click', () => removeBook(el.id));
            li.setAttribute('id', el.id);
            li.innerHTML = `<p><span>Author:</span> ${el.author} <span>Title:</span> ${el.title}</p>`;
            li.append(trash);
            ul.append(li);
        });
        bookList.append(ul);
    }
};

const addStuff = () => {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');

    addBook(titleInput.value, authorInput.value);

    titleInput.value = '';
    authorInput.value = '';
    titleInput.focus();
};

const addButton = document.querySelector('#btn');
addButton.addEventListener('click', addStuff);

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addStuff(e);
  }
});

const displayTime = () => {
  const dates = document.querySelector('.dates');
  var currentDate = new Date();

  var formattedTime = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
  }).format(currentDate);

  dates.textContent = formattedTime;
};

window.onload = () => {
    contacts.classList.add('hidden');
    books.classList.remove('hidden');
    form.classList.add('hidden');
    displayBook();
    displayTime();
};
