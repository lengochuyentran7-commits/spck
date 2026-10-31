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

// ------------------------
// ==========================================
// 1. KẾT NỐI API DUMMYJSON
// ==========================================

// Đường dẫn API
const API_URL = "https://dummyjson.com/products";

// Hàm lấy sản phẩm theo danh mục
async function getProductsByCategory(category) {
  const response = await fetch(`${API_URL}/category/${category}`);
  const data = await response.json();
  return data.products;
}

// Hàm lấy tất cả sản phẩm
async function getAllProducts() {
  const response = await fetch(`${API_URL}?limit=0`);

  const data = await response.json();

  return data.products;
}

// ==========================================
// 2. LẤY CÁC KHU VỰC HIỂN THỊ SẢN PHẨM
// ==========================================

const laptopList = document.getElementById("laptopList");
const phoneList = document.getElementById("phoneList");
const headphoneList = document.getElementById("headphoneList");
const pcList = document.getElementById("pcList");
const tabletList = document.getElementById("tabletList");
const accessoryList = document.getElementById("accessoryList");

// ==========================================
// 3. HÀM HIỂN THỊ SẢN PHẨM
// ==========================================

function displayProducts(products, element) {
  // Xóa nội dung cũ
  element.innerHTML = "";

  // Kiểm tra danh sách sản phẩm
  if (products.length === 0) {
    element.innerHTML = `
            <p class="text-center">
                Hiện chưa có sản phẩm trong danh mục này.
            </p>
        `;
    return;
  }

  // Duyệt qua từng sản phẩm
  products.forEach((product) => {
    element.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3">

                <div class="card product-card h-100">

                    <!-- Hình ảnh sản phẩm -->
                    <img
                        src="${product.thumbnail}"
                        class="card-img-top product-img"
                        alt="${product.title}"
                    >

                    <div class="card-body">

                        <!-- Tên sản phẩm -->
                        <h5 class="card-title">
                            ${product.title}
                        </h5>

                        <!-- Mô tả sản phẩm -->
                        <p class="card-text product-description">
                            ${product.description}
                        </p>

                        <p class="product-price">
                            ${product.price.toLocaleString("vi-VN")} $
                        
                        </p>

                        <!-- Nút xem chi tiết -->
                        <button
                            class="btn btn-detail"
                            data-product-id="${product.id}"
                            type="button"
                        >
                            Xem chi tiết
                        </button>

                    </div>
                </div>

            </div>
        `;
  });
}

// ==========================================
// 4. HÀM LỌC SẢN PHẨM
// ==========================================

// Lọc tai nghe theo tên sản phẩm
function isHeadphone(product) {
  const name = product.title.toLowerCase();

  return (
    name.includes("headphone") ||
    name.includes("earphone") ||
    name.includes("earbud") ||
    name.includes("airpod") ||
    name.includes("headset")
  );
}

// Lọc PC theo tên sản phẩm
function isPC(product) {
  const name = product.title.toLowerCase();

  return (
    name.includes("desktop") ||
    name.includes("gaming pc") ||
    name.includes("computer") ||
    name.includes("monitor")
  );
}

// ==========================================
// 5. LẤY VÀ HIỂN THỊ SẢN PHẨM CHO 6 TAB
// ==========================================

async function loadAllProducts() {
  // Lấy dữ liệu từ API
  const laptops = await getProductsByCategory("laptops");

  const phones = await getProductsByCategory("smartphones");

  const tablets = await getProductsByCategory("tablets");

  const mobileAccessories = await getProductsByCategory("mobile-accessories");

  const allProducts = await getAllProducts();

  // Tab 1: Laptop
  displayProducts(laptops, laptopList);

  // Tab 2: Điện thoại
  displayProducts(phones, phoneList);

  // Tab 3: Tai nghe
  const headphones = mobileAccessories.filter(isHeadphone);

  displayProducts(headphones, headphoneList);

  // Tab 4: PC
  const pcs = allProducts.filter(isPC);

  displayProducts(pcs, pcList);

  // Tab 5: Tablet
  displayProducts(tablets, tabletList);

  // Tab 6: Phụ kiện
  const accessories = mobileAccessories.filter(
    (product) => !isHeadphone(product),
  );

  displayProducts(accessories, accessoryList);
}


// ==========================================
// 6. XEM CHI TIẾT SẢN PHẨM
// ==========================================

// async function viewProductDetail(id) {

//     try {
//         const response = await fetch(`${API_URL}/${id}`);

//         if (!response.ok) {
//             throw new Error("Không thể lấy thông tin sản phẩm");
//         }

//         const product = await response.json();

//         // Hiển thị thông tin chi tiết
//         console.log("Thông tin sản phẩm:", product);

//     } catch (error) {
//         console.log("Lỗi xem chi tiết:", error);
//     }
// }

// // Lắng nghe sự kiện nhấn nút Xem chi tiết
// document.addEventListener("click", function(event) {

//     if (event.target.classList.contains("btn-detail")) {

//         const productId = event.target.dataset.productId;

//         viewProductDetail(productId);
//     }

// });

loadAllProducts();
