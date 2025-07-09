const input = document.querySelector('.head input');
const addBtn = document.querySelector('.head button');
const list = document.querySelector('.list');


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

addBtn.addEventListener('click', () => {
    const task = input.value.trim();
    if (task === '') return;

    const taskEl = document.createElement('div');
    taskEl.className = 'task';

    const text = document.createElement('span');
    text.textContent = task;

 
    text.addEventListener('click', () => {
        text.classList.toggle('done');
    });


    const edit = document.createElement('button');
    edit.className = 'edit';
    edit.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.28 6.4L11.74 15.94C10.79 16.89 7.97 17.33 7.34 16.7C6.71 16.07 7.14 13.25 8.09 12.3L17.64 2.75C18.87 1.47 21.53 3.13 21.28 6.4Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 4H6C4.94 4 3.92 4.42 3.17 5.17C2.42 5.92 2 6.94 2 8V18C2 19.06 2.42 20.08 3.17 20.83C3.92 21.58 4.94 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    edit.addEventListener('click', () => {
        const currentText = text.textContent;
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.setAttribute('maxlength', '25');
        inputEdit.value = currentText;
        inputEdit.className = 'edit-input';
        taskEl.replaceChild(inputEdit, text);
        inputEdit.focus();

        const save = () => {
            const newText = inputEdit.value.trim();
            if (newText !== '') {
                text.textContent = newText;
            }
            taskEl.replaceChild(text, inputEdit);
        };

        inputEdit.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') save();
        });

        inputEdit.addEventListener('blur', save);
    });

    const del = document.createElement('button');
    del.className = 'delete';
    del.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="black"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
        d="M9 4.5V6H6V7.5H18V6H15V4.5H9ZM6.75 8.25H8.25V17.6893L8.56066 18H15.4393L15.75 17.6893V8.25H17.25V18.3107L16.0607 19.5H7.93934L6.75 18.3107V8.25Z"
        fill="#080341"/>
    </svg>`;
    del.addEventListener('click', () => taskEl.remove());


    taskEl.addEventListener('mouseover', () => {
        edit.style.marginRight = '30px';
    });
    taskEl.addEventListener('mouseout', () => {
        edit.style.marginRight = '0px';
    });

    taskEl.appendChild(text);
    taskEl.appendChild(del);
    taskEl.appendChild(edit);
    list.appendChild(taskEl);

    input.value = '';
    input.focus();
});
