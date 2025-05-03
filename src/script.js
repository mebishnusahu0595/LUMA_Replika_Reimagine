// ... existing code ...

fetch("https://luma-replika-reimagine.onrender.com/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Hello from homepage!" })
})
  .then(response => response.json())
  .then(data => {
    // Handle response data
    console.log(data);
  })
  .catch(error => {
    // Handle error
    console.error("Error:", error);
  });

// ... existing code ...