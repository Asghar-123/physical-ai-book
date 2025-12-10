// This file is a placeholder for handling user text selection in the frontend.

// 1. Function to detect user text selection.
// This would involve adding event listeners for mouseup events to capture selected text.

// 2. Function to send selected text to the backend for retrieval.
// This function would make an API call to the chatbot backend with the selected text.

// Example conceptual function:
// export function getSelectedText(): string | null {
//   if (window.getSelection) {
//     return window.getSelection().toString();
//   } else if (document.getSelection) {
//     return document.getSelection().toString();
//   } else if ((document as any).selection) {
//     return (document as any).selection.createRange().text;
//   }
//   return null;
// }

// export async function sendSelectedTextForRetrieval(selectedText: string): Promise<any> {
//   const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/chatbot/retrieve_selected_text`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ text: selectedText }),
//   });
//   return response.json();
// }
