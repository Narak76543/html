let tg = null;

if (window.Telegram?.WebApp) {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}

// Grab the chat_id from the browser URL
const urlParams = new URLSearchParams(window.location.search);
const chatId = urlParams.get('chat_id');

// When sending the POST request to /news/submit:
const payload = {
    chat_id: chatId, // This must be included!
    village_name: villageValue,
    commune_name: communeValue,
    title: titleValue,
    content: contentValue
};

// async function submitNews() {
//   const data = {
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
//       tg?.showConfirm("✅ News sent successfully!", () => tg.close());
//     } else {
//       tg?.showAlert("❌ Submission failed.");
//     }
//   } catch (error) {
//     tg?.showAlert("🚫 Cannot connect to server.");
//   }
// }

// async function submitNews() {
//   const data = {
//     chat_id: chatId, // <--- ADD THIS LINE HERE
//     village_name: document.getElementById('village').value,
//     commune_name: document.getElementById('commune').value,
//     title: document.getElementById('title').value,
//     content: document.getElementById('content').value,
//     initData: tg?.initData || null
//   };

//   // The rest of your code is correct
//   const API_URL = "https://grateful-usable-hedy.ngrok-free.dev/news/submit";

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     if (response.ok) {
//       tg?.showConfirm("✅ របាយការណ៍ត្រូវបានបញ្ជូន!", () => tg.close());
//     } else {
//       tg?.showAlert("❌ ការបញ្ជូនបានបរាជ័យ។");
//     }
//   } catch (error) {
//     tg?.showAlert("🚫 មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនមេបានទេ។");
//   }
// }
async function submitNews() {
  const data = {
    // THIS LINE IS CRITICAL: it sends your personal ID to the backend
    chat_id: chatId, 
    village_name: document.getElementById('village').value,
    commune_name: document.getElementById('commune').value,
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
      tg?.showConfirm("✅ របាយការណ៍ត្រូវបានបញ្ជូន!", () => tg.close());
    } else {
      tg?.showAlert("❌ ការបញ្ជូនបានបរាជ័យ។");
    }
  } catch (error) {
    tg?.showAlert("🚫 មិនអាចភ្ជាប់ទៅកាន់ម៉ាស៊ីនមេបានទេ។");
  }
}