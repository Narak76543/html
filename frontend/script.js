let tg = null;

if (window.Telegram?.WebApp) {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}

// ទាញយកព័ត៌មានពី URL (ឧទាហរណ៍៖ ?chat_id=123&v_id=PV02)
const urlParams = new URLSearchParams(window.location.search);
const chatId = urlParams.get('chat_id');
const vId = urlParams.get('v_id'); // <--- ត្រូវបន្ថែមត្រង់នេះ

async function submitNews() {
  // បង្កើតទិន្នន័យសម្រាប់ផ្ញើទៅ Backend
  const data = {
    chat_id: chatId,      // ID របស់អ្នករាយការណ៍
    v_id: vId,            // ID របស់ភូមិ (សំខាន់ខ្លាំងសម្រាប់ Lookup ក្នុង DB)
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