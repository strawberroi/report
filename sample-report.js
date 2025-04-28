const fileInput = document.getElementById("fileInput");
const previewImg = document.getElementById("previewImg");
const uploadBtn = document.getElementById("uploadBtn");
const removeBtn = document.getElementById("removeBtn");
const changeBtn = document.getElementById("changeBtn");

const categorySelect = document.getElementById("category");
const statusSelect = document.getElementById("status");
const descriptionInput = document.getElementById("descriptionInput");
const contactInput = document.getElementById("contactInput");

const saveBtn = document.getElementById("saveBtn");
const cardsContainer = document.getElementById("cardsContainer");

let uploadedImageData = "";

document.querySelector('.overlay-main').style.display = 'block';

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      removeBtn.style.display = "inline-block";
      changeBtn.style.display = "inline-block";
      uploadBtn.style.display = "none";
      uploadedImageData = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
});

removeBtn.addEventListener("click", () => {
  fileInput.value = "";
  previewImg.src = "";
  previewImg.style.display = "none";
  removeBtn.style.display = "none";
  changeBtn.style.display = "none";
  uploadBtn.style.display = "inline-block";
  uploadedImageData = "";
});

changeBtn.addEventListener("click", () => fileInput.click());

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!uploadedImageData) {
    alert("Please upload an image.");
    return;
  }
  if (!categorySelect.value) {
    alert("Please select a category.");
    return;
  }
  if (!statusSelect.value) {
    alert("Please select a status.");
    return;
  }
  if (!descriptionInput.value.trim()) {
    alert("Please enter a description.");
    return;
  }
  if (!contactInput.value.trim()) {
    alert("Please enter your contact info.");
    return;
  }


  const card = document.createElement("div");
  card.className = "cardbox";

  card.innerHTML = `
    <img src="${uploadedImageData}" alt="Uploaded Image" />
    <p><strong>Category:</strong> ${categorySelect.options[categorySelect.selectedIndex].text}</p>
    <p><strong>Status:</strong> ${statusSelect.options[statusSelect.selectedIndex].text}</p>
    <p><strong>Description:</strong> ${descriptionInput.value.trim()}</p>
    <p><strong>Contact:</strong> ${contactInput.value.trim()}</p>
  `;


  cardsContainer.prepend(card);


  categorySelect.value = "";
  statusSelect.value = "";
  descriptionInput.value = "";
  contactInput.value = "";
  fileInput.value = "";
  previewImg.src = "";
  previewImg.style.display = "none";
  removeBtn.style.display = "none";
  changeBtn.style.display = "none";
  uploadBtn.style.display = "inline-block";
  uploadedImageData = "";
});

const searchInput = document.getElementById('categorySearch');
const searchBtn = document.getElementById('categorySearchBtn');

function filterCardboxes() {
  const query = searchInput.value.trim().toLowerCase();
  const queryWords = query.split(/\s+/).filter(Boolean);

  // Query live cardboxes every time
  const cardboxes = document.querySelectorAll('.cardbox');

  cardboxes.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    const matches = queryWords.every(word => cardText.includes(word));
    card.style.display = matches ? '' : 'none';
  });
}

// Filter as user types
searchInput.addEventListener('input', filterCardboxes);

// Filter on search button click
searchBtn.addEventListener('click', e => {
  e.preventDefault();
  filterCardboxes();
});
$(document).ready(function() {
  $('#category').select2({
    placeholder: "Select a category",
    allowClear: true
  });
});

const cContainer = document.getElementById('cardsContainer');

cContainer.addEventListener('click', (e) => {
  // Check if clicked element is an image inside a cardbox
  if (e.target.tagName.toLowerCase() === 'img' && e.target.closest('.cardbox')) {
    const card = e.target.closest('.cardbox');

    // If overlay already exists, do nothing
    if (card.querySelector('.cardbox-overlay')) return;

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.classList.add('cardbox-overlay');

    // Create buttons
    const contactBtn = document.createElement('button');
contactBtn.textContent = 'Contact';
contactBtn.addEventListener('click', ev => {
  ev.preventDefault();
  window.open(
    'https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com',
    '_blank'
  );
});
document.body.appendChild(contactBtn);


    const claimBtn = document.createElement('button');
    claimBtn.textContent = 'Claim';
    claimBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      const cardbox = ev.target.closest('.cardbox');
    
      // Remove overlay
      const overlay = cardbox.querySelector('.cardbox-overlay');
      if (overlay) overlay.remove();
    
      // Move cardbox to visible container
      document.getElementById('visibleContainer').appendChild(cardbox);
    });
    

    const exitBtn = document.createElement('button');
    exitBtn.textContent = 'Exit';
    exitBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      overlay.remove();
    });

    // Append buttons to overlay
    overlay.appendChild(contactBtn);
    overlay.appendChild(claimBtn);
    overlay.appendChild(exitBtn);

    // Append overlay inside cardbox
    card.appendChild(overlay);
  }
});
const caContainer = document.getElementById('cardsContainer');
const filterButtons = document.querySelector('.container');

filterButtons.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() !== 'button') return;

  const filter = e.target.getAttribute('name').toLowerCase();
  const cardboxes = caContainer.querySelectorAll('.cardbox');

  cardboxes.forEach(card => {
    const text = card.textContent.toLowerCase();

    if (filter === 'all') {
      card.style.display = '';
    } else if (text.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});
if ("Notification" in window) {
  // Notifications are supported
}
Notification.requestPermission().then(function(permission) {
  console.log('Permission status:', permission);
});

const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
};
https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("I'm HTTPS-enabled!");
}).listen(8080);
