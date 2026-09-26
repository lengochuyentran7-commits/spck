const form = document.getElementById("register-box")

//lang nghe su kien submit
form.addEventListener("submit", (e)=>{
    e.preventDefault()

    //lay thong tin nhap tren cac o
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const lowerCaseLetter = /[a-z]/g;
    const upperCaseLetter = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (username.length < 6) {
        alert("Tên đăng nhập phải ít nhất 6 ký tự");
    } else if (password.length < 8) {
        alert("Mật khẩu phải ít nhất 8 ký tự");
    } else if (!password.match(lowerCaseLetter)) {
        alert("Mật khẩu cần có chữ thường");
    } else if (!password.match(upperCaseLetter)) {
        alert("Mật khẩu cần có chữ hoa");
    } else if (!password.match(numbers)) {
        alert("Mật khẩu cần có số hoặc ký tự đặc biệt");
    } else if (password !== confirmPassword){
        alert("Confirm Password không đúng vui lòng nhập lại")
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Tạo tài khoản thành công! Vui lòng đăng nhập.");
        location.href = "login.html";
    }
})