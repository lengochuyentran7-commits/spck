
const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (existingUser) {
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    alert("Đăng nhập thành công!");
    location.href = "index.html";
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
});
