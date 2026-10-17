

const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
    // Ngăn trang tải lại khi gửi form
    e.preventDefault();

    // Lấy username và password
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Lấy danh sách tài khoản đã đăng ký
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm tài khoản khớp username và password
    const existingUser = users.find(function (user) {
        return user.username === username && user.password === password;
    });

    if (existingUser) {
        // Lưu thông tin người đang đăng nhập
        localStorage.setItem("currentUser", JSON.stringify({
            username: existingUser.username
        }));

        // Lưu username để index.js có thể hiển thị lời chào
        localStorage.setItem("username", existingUser.username);

        alert("Đăng nhập thành công!");

        // Chuyển về trang chủ
        window.location.href = "./index.html";
    } else {
        alert("Username hoặc mật khẩu không đúng!");
    }
});
