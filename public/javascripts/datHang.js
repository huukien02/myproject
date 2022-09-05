/*Đóng mở Form đặt hàng*/
function deleteForm() {
    var form = document.querySelector(".form");
    form.style.display = "none";
  }

  function openForm() {
    var form = document.querySelector(".form");
    form.style.display = "block";
  }

  /* Delete Cart */
  function deleteCart() {
    window.localStorage.removeItem("Cart");
  }

  /* Hiển thị giỏ hàng*/
  var list = localStorage.getItem("Cart")
    ? JSON.parse(localStorage.getItem("Cart"))
    : [];
  var content = `  <tr>
           <th>NAME</th>
           <th>IMAGE</th>
           <th>PRICE</th>
           <th>AMOUNT</th>
           <th>OTHER</th>
        </tr>`;

  for (let i = 0; i < list.length; i++) {
    content += ` <tr>
            <td>${list[i].name}</td>
            <td><img src="${list[i].img}" alt=""></td>
            <td>${list[i].price}</td>
            <td><input disabled type="number" value="${list[i].sl}"></td>
            <td>
                <i onclick="xoa(${i})" class="fa-solid fa-trash-can"></i>
            </td>
        </tr>`;
  }
  document.getElementById("table").innerHTML = content;
  document.getElementById("donHang").value = JSON.stringify(list);



  var total = 0;
  for (let i = 0; i < list.length; i++) {
    total += Number(list[i].price) * Number(list[i].sl);
  }
  document.getElementById("total").innerHTML = total;
  document.getElementById("tt").value = total;

  function xoa(id) {
    var check = confirm("Bạn muốn xóa Sản Phẩm này không");
    if (check == true) {
      var list = localStorage.getItem("Cart")
        ? JSON.parse(localStorage.getItem("Cart"))
        : [];
      list.splice(id, 1);
      localStorage.setItem("Cart", JSON.stringify(list));
      location.reload();
    }
  }