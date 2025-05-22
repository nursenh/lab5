let originalData = {};
let currentData = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  document.getElementById("resetBtn").addEventListener("click", resetData);
});

function fetchData() {
  const saved = localStorage.getItem('profileData');
  if (saved) {
    currentData = JSON.parse(saved);
    originalData = JSON.parse(saved);
    renderProfile();
  } else {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        originalData = JSON.parse(JSON.stringify(data));
        currentData = data;
        renderProfile();
      })
      .catch(error => console.error('Fetch xətası:', error));
  }
}

function renderProfile() {
  const container = document.getElementById('profile');
  container.innerHTML = '';

  Object.keys(currentData).forEach(key => {
    const div = document.createElement('div');
    div.className = 'profile-field';
    div.dataset.key = key;

    const span = document.createElement('span');
    span.textContent = ${key}: ${currentData[key]};

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Düzəliş et';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => enableEdit(div, key));

    div.appendChild(span);
    div.appendChild(editBtn);
    container.appendChild(div);
  });
}

function enableEdit(div, key) {
  const currentValue = currentData[key];
  div.innerHTML = '';

  const input = document.createElement('input');
  input.value = currentValue;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Yadda saxla';
  saveBtn.className = 'edit-btn';
  saveBtn.addEventListener('click', () => {
    currentData[key] = input.value;
    localStorage.setItem('profileData', JSON.stringify(currentData));
    renderProfile();
  });

  div.appendChild(input);
  div.appendChild(saveBtn);
}

function resetData() {
  currentData = JSON.parse(JSON.stringify(originalData));
  localStorage.removeItem('profileData');
  renderProfile();
}
