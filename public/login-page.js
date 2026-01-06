document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      username: form.username.value,
      password: form.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        // Client-side redirect
        window.location.href = data.redirectUrl;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit. Please try again.");
    }
  });
});
