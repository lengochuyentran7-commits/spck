
// Lấy khu vực hiển thị thông tin người dùng
const userArea = document.getElementById("userArea");

// Kiểm tra người dùng đã đăng nhập chưa
function hienThiNguoiDung() {
    // Lấy username từ localStorage
    const username = localStorage.getItem("username");

    if (username) {
        // Nếu đã đăng nhập
        userArea.innerHTML = `
            <span class="welcome-user">
                Xin chào, ${username}
            </span>

            <button class="btn btn-logout" id="logoutBtn">
                Đăng xuất
            </button>
        `;

        // Xử lý nút đăng xuất
        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("username");

            // Chuyển về trạng thái chưa đăng nhập
            hienThiNguoiDung();
        });

    } else {
        // Nếu chưa đăng nhập
        userArea.innerHTML = `
            <a href="login.html" class="btn btn-login">
                Đăng nhập
            </a>
        `;
    }
}

// Hiển thị khi mở trang
hienThiNguoiDung();
