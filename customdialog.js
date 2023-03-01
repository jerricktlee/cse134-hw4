const alertBtn = document.querySelector('#alertBtn');
const alertDialog = document.querySelector('#alertDialog');
const alertOk = document.querySelector('#alertOk');

const confirmBtn = document.querySelector('#confirmBtn');
const confirmCancel = document.querySelector('#confirmCancel');
const confirmOk = document.querySelector('#confirmOk');

const promptBtn = document.querySelector('#promptBtn');
const promptCancel = document.querySelector('#promptCancel');
const promptOk = document.querySelector('#promptOk');

const userInput = document.querySelector('#userInput');
const userOutput = document.querySelector('#userOutput');

const cancelMsg = 'User didn\'t enter anything.';

// Alert 
alertBtn.addEventListener('click', () => {
    alertDialog.showModal();
});
alertOk.addEventListener('click', () => {
    alertDialog.close();
})

// Confirm 
confirmBtn.addEventListener('click', () => {
    confirmDialog.showModal();
})
confirmCancel.addEventListener('click', () => {
    userOutput.innerText = 'Confirm result: false';
    confirmDialog.close();
})
confirmOk.addEventListener('click', () => {
    userOutput.innerText = 'Confirm result: true';
    confirmDialog.close();
})

// Prompt 
promptBtn.addEventListener('click', () => {
    userInput.value = '';
    promptDialog.showModal();
})
promptCancel.addEventListener('click', () => {
    userOutput.innerHTML = cancelMsg;
    promptDialog.close();
})
promptOk.addEventListener('click', () => {
    let purifiedInput = DOMPurify.sanitize(userInput.value);
    userOutput.innerHTML = purifiedInput;
    promptDialog.close();
})