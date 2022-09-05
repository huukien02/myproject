/* LIST SẢN PHẨM */
fetch("http://localhost:3000/admin/products")
    .then(function (res) {
        // console.log(res);
        if (!res.ok) { throw new Error("Lỗi = " + res.status); }
        return res.json();
    })
    .then(function (data) {

        document.getElementById('slsp').innerHTML = data.length;

        var content = `<tr>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>PRICE</th>
            <th>ACTION</th>
        </tr>`;
        for (let i = 0; i < data.length; i++) {
            content += `<tr>
                <td>${(i + 1)}</td>
                <td>${data[i].name}</td>
                <td><img style="width: 100px;" src="${data[i].image}" alt=""></td>
                <td>${data[i].price}</td>
                <td>
                    <a href="/detail/${data[i].id}"><i class="fa-solid fa-magnifying-glass"></i></i></a>
                    <a href="/delete/products/${data[i].id}"><i class="fa-solid fa-trash-can"></i></a>
                    <a href="/edit/products/${data[i].id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>`
        }
        document.getElementById('table1').innerHTML = content
    })
    .catch(function (error) {
        console.log("Lỗi: ", error);
    })

/* LIST User */
fetch("http://localhost:3000/admin/user")
    .then(function (res) {
        if (!res.ok) { throw new Error("Lỗi = " + res.status); }
        return res.json();
    })
    .then(function (data) {

        document.getElementById('slkh').innerHTML = data.length;
        var content = `<tr>
            <th>ID</th>
            <th>NAME</th>
            <th>USERNAME</th>
            <th>PASSWORD</th>
            <th>PHONE</th>
            <th>ACTION</th>
        </tr>`;
        for (let i = 0; i < data.length; i++) {
            content += `<tr>
                <td>${(i + 1)}</td>
                <td>${data[i].name}</td>
                <td>${data[i].username}</td>
                <td>${data[i].password}</td>
                <td>${data[i].phone}</td>

                <td>
                    <a href="/delete/user/${data[i].id}"><i class="fa-solid fa-trash-can"></i></a>
                </td>
            </tr>`
        }
        document.getElementById('table2').innerHTML = content
    })
    .catch(function (error) {
        console.log("Lỗi: ", error);
    })

/* LIST ĐƠN HÀNG */
fetch("http://localhost:3000/admin/order")
    .then(function (res) {
        if (!res.ok) { throw new Error("Lỗi = " + res.status); }
        return res.json();
    })
    .then(function (data) {
        document.getElementById('sldh').innerHTML = data.length;

        var content = `<tr>
            <th>ID</th>
            <th>NAME</th>
            <th>ADDRESS</th>
            <th>PHONE</th>
            <th>TOTAL</th>
            <th>NOTE</th>
            <th>COMFIRM</th>
        </tr>`;
        for (let i = 0; i < data.length; i++) {
            content += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].address}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].total}</td>
            <td>${data[i].note}</td>

            <td>
                <a href="/delete/order/${data[i].id}"><i class="fa-solid fa-circle-check"></i></a>
                <i onclick="chiTiet(${i})" class="fa-solid fa-book-open"></i>
            </td>
        </tr>`
        }
        document.getElementById('table3').innerHTML = content;
    })

    .catch(function (error) {
        console.log("Lỗi: ", error);
    })


function chiTiet(id) {
    document.querySelector('.detail').style.display = 'block';
    fetch("http://localhost:3000/admin/order")
        .then(function (res) {
            if (!res.ok) { throw new Error("Lỗi = " + res.status); }
            return res.json();
        })
        .then(function (data) {

        

            const item = JSON.parse(data[id].dsOrder)
    


             var content = `<tr>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>PRICE</th>
            <th>AMOUNT</th>
        </tr>`;

        for (let i = 0; i < item.length; i++) {
            console.log(item[i]);
            content += `<tr>
            <td>${item[i].name}</td>
            <td><img  style="width:100px ;"  src="${item[i].img} " alt=""></td>
            <td>${item[i].price}</td>
            <td>${item[i].sl}</td>
        </tr>`
         }

        document.getElementById('table4').innerHTML = content;

            
        })

        .catch(function (error) {
            console.log("Lỗi: ", error);
        })
}

function CloseTable4()
{
    document.querySelector('.detail').style.display = 'none';
}


/* Menu */
var list = document.querySelectorAll('.left ul li');
// console.log(list);

list[0].addEventListener('click', function () {
    document.querySelector('.home').style.display = 'block';
    document.querySelector('.listSP').style.display = 'none';
    document.querySelector('.listUser').style.display = 'none';
    document.querySelector('.listOder').style.display = 'none';

    document.querySelector('.fa-solid.fa-house').style.color = 'red';
    document.querySelector('.fa-solid.fa-list').style.color = 'white';
    document.querySelector('.fa-solid.fa-user').style.color = 'white';
    document.querySelector('.fa-solid.fa-calendar-check').style.color = 'white';
})

list[1].addEventListener('click', function () {
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.listSP').style.display = 'block';
    document.querySelector('.listUser').style.display = 'none';
    document.querySelector('.listOder').style.display = 'none';

    document.querySelector('.fa-solid.fa-house').style.color = 'white';
    document.querySelector('.fa-solid.fa-list').style.color = 'red';
    document.querySelector('.fa-solid.fa-user').style.color = 'white';
    document.querySelector('.fa-solid.fa-calendar-check').style.color = 'white';
})

list[2].addEventListener('click', function () {
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.listSP').style.display = 'none';
    document.querySelector('.listUser').style.display = 'block';
    document.querySelector('.listOder').style.display = 'none';

    document.querySelector('.fa-solid.fa-house').style.color = 'white';
    document.querySelector('.fa-solid.fa-list').style.color = 'white';
    document.querySelector('.fa-solid.fa-user').style.color = 'red';
    document.querySelector('.fa-solid.fa-calendar-check').style.color = 'white';
})

list[3].addEventListener('click', function () {
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.listSP').style.display = 'none';
    document.querySelector('.listUser').style.display = 'none';
    document.querySelector('.listOder').style.display = 'block';

    document.querySelector('.fa-solid.fa-house').style.color = 'white';
    document.querySelector('.fa-solid.fa-list').style.color = 'white';
    document.querySelector('.fa-solid.fa-user').style.color = 'white';
    document.querySelector('.fa-solid.fa-calendar-check').style.color = 'red';
})
 /* Log Out */
var delete_cookie = function (name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

list[4].addEventListener('click', () => {
    if (confirm("Bạn có muốn đăng xuất ko")) {
        delete_cookie('token');
        location.reload();
    }
})
