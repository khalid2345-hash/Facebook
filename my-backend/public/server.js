document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page refresh

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // ✅ If backend redirects, browser will follow automatically
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const result = await response.text();
        alert(result); // fallback if no redirect
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("⚠️ Something went wrong. Please try again.");
    }
  });
});
