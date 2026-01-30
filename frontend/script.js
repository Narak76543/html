
let tg = null;

if (window.Telegram?.WebApp) {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}

const urlParams = new URLSearchParams(window.location.search);
const chatId = urlParams.get('chat_id');
const vId = urlParams.get('v_id');

// Function to show dialog
function showDialog(type, title, message) {
  const overlay        = document.getElementById('dialogOverlay');
  const icon           = document.getElementById('dialogIcon');
  const titleElement   = document.getElementById('dialogTitle');
  const messageElement = document.getElementById('dialogMessage');

  if (type === 'success') {
    icon.className = 'dialog-icon success';
    icon.innerHTML = '✓';
  } else if (type === 'error') {
    icon.className = 'dialog-icon error';
    icon.innerHTML = '✕';
  } else if (type === 'warning') {
    icon.className = 'dialog-icon warning';
    icon.innerHTML = '⚠';
  }

  titleElement.textContent = title;
  messageElement.textContent = message;
  overlay.classList.add('show');
}

function closeDialog() {
  const overlay = document.getElementById('dialogOverlay');
  overlay.classList.remove('show');
}

function validateForm() {
  const title   = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  const emptyFields = [];
  if (!title) emptyFields.push('News Title');
  if (!content) emptyFields.push('Content');

  if (emptyFields.length > 0) {
    const fieldList = emptyFields.join(', ');
    showDialog('warning', 'Empty Fields', `សូមបំពេញចន្លោះ៖ ${fieldList}`);
    return false;
  }
  return true;
}

const senderName = tg?.initDataUnsafe?.user?.first_name || "User";

// Submit news function
async function submitNews() {
const sendBtn = document.getElementById('sendBtn');
    const btnText    = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    

    const title   = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (!title || !content) {
        alert('Please fill in all fields');
        return;
    }

    btnText.textContent = 'Submitting...';
    btnSpinner.style.display = 'inline-block';
    sendBtn.disabled = true;
    setTimeout(() => {
        console.log('Submitting:', { title, content });
        
        btnText.textContent = 'Submit';
        btnSpinner.style.display = 'none';
        sendBtn.disabled = false;
        
        document.getElementById('newsForm').reset();
        
    }, 2000);

  if (!validateForm()) return;

  
  sendBtn.disabled = true;
  sendBtn.textContent = 'កំពុងបញ្ជូន...';

  const data = {
    chat_id    : chatId,
    v_id       : vId,
    sender_name: senderName,
    title      : document.getElementById('title').value,
    content    : document.getElementById('content').value,
    initData   : tg?.initData || null
  };

  const API_URL = "https://grateful-usable-hedy.ngrok-free.dev/news/submit";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showDialog('success', 'Success', 'Report was sumited ');
      document.getElementById('title').value = "";
      document.getElementById('content').value = "";

      if (tg) {
        setTimeout(() => { tg.close(); }, 2000);
      }
    } else {
      showDialog('error', 'faild', 'ការបញ្ជូនមានបញ្ហា។ សូមព្យាយាមម្តងទៀត។');
    }
  } catch (error) {
    showDialog('error', 'Connection Error', 'can not connect to server');
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Submite Report';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('dialogOverlay');
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeDialog();
  });
});