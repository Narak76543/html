// let tg = null;

// if (window.Telegram?.WebApp) {
//   tg = window.Telegram.WebApp;
//   tg.ready();
//   tg.expand();
// }

// // ទាញយកព័ត៌មានពី URL (ឧទាហរណ៍៖ ?chat_id=123&v_id=PV02)
// const urlParams = new URLSearchParams(window.location.search);
// const chatId = urlParams.get('chat_id');
// const vId = urlParams.get('v_id');

// // Function to show dialog
// function showDialog(type, title, message) {
//   const overlay = document.getElementById('dialogOverlay');
//   const icon = document.getElementById('dialogIcon');
//   const titleElement = document.getElementById('dialogTitle');
//   const messageElement = document.getElementById('dialogMessage');

//   // Set icon based on type
//   if (type === 'success') {
//     icon.className = 'dialog-icon success';
//     icon.innerHTML = '✓';
//   } else if (type === 'error') {
//     icon.className = 'dialog-icon error';
//     icon.innerHTML = '✕';
//   } else if (type === 'warning') {
//     icon.className = 'dialog-icon warning';
//     icon.innerHTML = '⚠';
//   }

//   titleElement.textContent = title;
//   messageElement.textContent = message;
//   overlay.classList.add('show');
// }

// // Function to close dialog
// function closeDialog() {
//   const overlay = document.getElementById('dialogOverlay');
//   overlay.classList.remove('show');
// }

// // Validate form fields
// function validateForm() {
//   const village = document.getElementById('village').value.trim();
//   const commune = document.getElementById('commune').value.trim();
//   const title = document.getElementById('title').value.trim();
//   const content = document.getElementById('content').value.trim();

//   const emptyFields = [];

//   if (!village) emptyFields.push('Village Name');
//   if (!commune) emptyFields.push('Target Commune');
//   if (!title) emptyFields.push('News Title');
//   if (!content) emptyFields.push('Content');

//   if (emptyFields.length > 0) {
//     const fieldList = emptyFields.join(', ');
//     showDialog('warning', 'Empty Fields', `Please fill in the following fields: ${fieldList}`);
//     return false;
//   }

//   return true;
// }

// // Submit news function with validation
// async function submitNews() {
//   // Validate form first
//   if (!validateForm()) {
//     return;
//   }

//   const sendBtn = document.getElementById('sendBtn');
  
//   // Disable button to prevent double submission
//   sendBtn.disabled = true;
//   sendBtn.textContent = 'Submitting...';

//   console.log("Village   : " + document.getElementById('village').value);
//   console.log("Commune   : " + document.getElementById('commune').value);
//   console.log("New Title : " + document.getElementById('title').value);
//   console.log("Content   : " + document.getElementById('content').value);

//   // បង្កើតទិន្នន័យសម្រាប់ផ្ញើទៅ Backend
//   const data = {
//     chat_id: chatId,
//     v_id: vId,
//     village_name: document.getElementById('village').value,
//     commune_name: document.getElementById('commune').value,
//     title: document.getElementById('title').value,
//     content: document.getElementById('content').value,
//     initData: tg?.initData || null
//   };

//   const API_URL = "https://grateful-usable-hedy.ngrok-free.dev/news/submit";

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     if (response.ok) {
//       // Show success dialog
//       showDialog('success', 'Success!', 'របាយការណ៍ត្រូវបានបញ្ជូនដោយជោគជ័យ!');
      
//       // Clear form fields
//       document.getElementById('village').value = "";
//       document.getElementById('commune').value = "";
//       document.getElementById('title').value = "";
//       document.getElementById('content').value = "";

//       // Close Telegram WebApp after 2 seconds if available
//       if (tg) {
//         setTimeout(() => {
//           tg.close();
//         }, 2000);
//       }
//     } else {
//       showDialog('error', 'Error', 'ការបញ្ជូនបានបរាជ័យ។ សូមព្យាយាមម្តងទៀត។');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     showDialog('error', 'Connection Error', 'មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនមេបានទេ។ សូមពិនិត្យអ៊ីនធឺណិតរបស់អ្នក។');
//   } finally {
//     // Re-enable button
//     sendBtn.disabled = false;
//     sendBtn.textContent = 'Submit';
//   }
// }

// // Close dialog when clicking outside
// document.addEventListener('DOMContentLoaded', function() {
//   const overlay = document.getElementById('dialogOverlay');
//   overlay.addEventListener('click', function(e) {
//     if (e.target === overlay) {
//       closeDialog();
//     }
//   });
// });

let tg = null;

if (window.Telegram?.WebApp) {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}

// ទាញយកព័ត៌មានពី URL (ឧទាហរណ៍៖ ?chat_id=123&v_id=PV02)
const urlParams = new URLSearchParams(window.location.search);
const chatId = urlParams.get('chat_id');
const vId = urlParams.get('v_id');

// Function to show dialog
function showDialog(type, title, message) {
  const overlay = document.getElementById('dialogOverlay');
  const icon = document.getElementById('dialogIcon');
  const titleElement = document.getElementById('dialogTitle');
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

// ប្តូរការ Validate: ឆែកតែ Title និង Content បានហើយ
function validateForm() {
  const title = document.getElementById('title').value.trim();
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

// Submit news function
async function submitNews() {
  if (!validateForm()) return;

  const sendBtn = document.getElementById('sendBtn');
  sendBtn.disabled = true;
  sendBtn.textContent = 'កំពុងបញ្ជូន...';

  // បង្កើតទិន្នន័យសម្រាប់ផ្ញើទៅ Backend (លុប village_name និង commune_name ចេញ)
  const data = {
    chat_id: chatId,
    v_id: vId, // ផ្ញើ ID ទៅដើម្បីឱ្យ Backend ទាញទិន្នន័យពី DB
    title: document.getElementById('title').value,
    content: document.getElementById('content').value,
    initData: tg?.initData || null
  };

  const API_URL = "https://grateful-usable-hedy.ngrok-free.dev/news/submit";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showDialog('success', 'ជោគជ័យ!', 'របាយការណ៍ត្រូវបានបញ្ជូនទៅរដ្ឋបាលឃុំរួចរាល់!');
      
      // Clear fields
      document.getElementById('title').value = "";
      document.getElementById('content').value = "";

      if (tg) {
        setTimeout(() => { tg.close(); }, 2000);
      }
    } else {
      showDialog('error', 'បរាជ័យ', 'ការបញ្ជូនមានបញ្ហា។ សូមព្យាយាមម្តងទៀត។');
    }
  } catch (error) {
    showDialog('error', 'Connection Error', 'មិនអាចភ្ជាប់ទៅកាន់ Server បានទេ។');
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'បញ្ជូនរបាយការណ៍';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('dialogOverlay');
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeDialog();
  });
});