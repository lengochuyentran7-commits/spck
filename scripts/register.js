
const form = document.getElementById("register-form");

form.addEventListener("submit", function (e) {
    // Không cho form tải lại trang
    e.preventDefault();

    // Lấy thông tin người dùng nhập
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra username
    if (username.length < 6) {
        alert("Tên đăng nhập phải ít nhất 6 ký tự!");
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        alert("Mật khẩu phải ít nhất 8 ký tự!");
        return;
    }

    // Kiểm tra mật khẩu có chữ thường
    if (!/[a-z]/.test(password)) {
        alert("Mật khẩu cần có chữ thường!");
        return;
    }

    // Kiểm tra mật khẩu có chữ hoa
    if (!/[A-Z]/.test(password)) {
        alert("Mật khẩu cần có chữ hoa!");
        return;
    }

    // Kiểm tra mật khẩu có số
    if (!/[0-9]/.test(password)) {
        alert("Mật khẩu cần có ít nhất một chữ số!");
        return;
    }

    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // Lấy danh sách tài khoản đã đăng ký
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã được đăng ký chưa
    const emailExists = users.some(function (user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
        alert("Email này đã được đăng ký!");
        return;
    }

    // Thêm tài khoản mới vào danh sách
    users.push({
        username: username,
        email: email,
        password: password
    });

    // Lưu danh sách tài khoản
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    // Chuyển sang trang đăng nhập
    window.location.href = "./login.html";
});
