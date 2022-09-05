// ---------------- Slider --------------
var index = 1;
save = function()
{
	var img = ["https://cdn.tgdd.vn/2022/03/banner/A53-830-300-830x300.png",
	          "https://cdn.tgdd.vn/2022/03/banner/830-300-830x300-8.png",
	          "https://cdn.tgdd.vn/2022/03/banner/830-300-830x300-12.png",
	          "https://cdn.tgdd.vn/2022/03/banner/830-x-300(1)-830x300.png"];
   
   document.getElementById('ig').src = img[index];
   index ++;
   if(index == 4)
   {
   	index = 0;
   }
}
setInterval(save,1000);

// ---------------- Search Sản Phẩm --------------

var listSp = document.querySelectorAll('.sp');
        // console.log(listSp[0].childNodes[1].childNodes[1].src);
        // console.log(listSp[0].childNodes[3].childNodes[3].innerText);
        // console.log(listSp[0].childNodes[3].childNodes[5].childNodes[1].childNodes[1].innerText);
        // console.log(listSp[0].childNodes[3].childNodes[5].childNodes[14].innerText);
        // console.log(listSp[0].childNodes[3].childNodes[5].childNodes[16].innerText);
function search()
{
    var input = document.getElementById('search').value;
    var loc = [];
    var content='';

    for (let i = 0; i < listSp.length; i++)
    {
        if (listSp[i].childNodes[3].childNodes[3].innerText.toUpperCase().includes(input.toUpperCase()) == true) {
          loc.push(listSp[i]);
        }
    }

    // console.log(loc);

    if (loc.length == listSp.length || loc.length == 0) {
        document.getElementById("list").style.display = "none";
      }
      

      else if ( loc.length < listSp.length) {
        document.getElementById("list").style.display = "block";

        for (let i = 0; i < loc.length; i++) {
    
            content +=`<li>
            <a href="/detail/${loc[i].childNodes[3].childNodes[5].childNodes[14].innerText}"><img src="${loc[i].childNodes[1].childNodes[1].childNodes[0].src}" alt=""></a>
            <span>${loc[i].childNodes[3].childNodes[3].innerText}</span>
            <p style="display: none;">${loc[i].childNodes[3].childNodes[5].childNodes[1].childNodes[1].innerText}</p>
            <p style="display: none;">${loc[i].childNodes[3].childNodes[5].childNodes[14].innerText}</p>
            <p style="display: none;">${loc[i].childNodes[3].childNodes[5].childNodes[16].innerText}</p>
        </li>`
        }
        document.getElementById("list").innerHTML = content;
      }
    }

    // ---------------- Thêm Vào giỏ hàng --------------

    function buy(sp)
    {
        // console.log(sp.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].src);
        // console.log(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].innerText);
        // console.log(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[1].childNodes[1].innerText);
        // console.log(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[14].innerText);
        // console.log(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[16].innerText);
        // var img = sp.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].src;

        var img = sp.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0].src;
        var name = sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].innerText;
        var price = Number(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[1].childNodes[1].innerText);
        var id = Number(sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[14].innerText);
        var detail = sp.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[16].innerText;

        addSP(id,img,name,price,detail);
    }

function addSP(id,img,name,price,detail)
{

   var addtr = document.createElement("tr");

   var cartItem = document.querySelectorAll("tbody tr");

  for (var i = 0; i < cartItem.length; i++)
  {
     var productT = document.querySelectorAll(".name-cart");
     if(productT[i].innerText==name)
     {
        alert("Sản phẩm đã có trong giỏ hàng");
        return;
     }
  }

  var layHet = 
  ` <tr>
      <td style="display: none;">`+id+`</td>
      <td class ="name-cart">`+name+`</td>
      <td><img src="`+img+`" alt=""></td>
      <td class = "gia">`+price+`</td>
      <td style="display: none;">`+detail+`</td>
      <td><input onchange="tinh()" type="number" value="1" min="0"></td>
      <td><i onclick="xoa(this)" class="fa-solid fa-trash-can"></i></td>
  </tr>`


   addtr.innerHTML = layHet;

  var table = document.querySelector("tbody");
  table.append(addtr);
  tinhToan()

}
function tinhToan()
{
    var cartItem = document.querySelectorAll("tbody tr");
	var totalC = 0;

	for (var i = 0; i < cartItem.length; i++)
	{
		var inputValue = cartItem[i].querySelector("input").value;

		var productPrice = cartItem[i].querySelector(".gia").innerText;

		totalA = inputValue * productPrice;

		totalC += totalA;
	}
	document.getElementById('tt').innerText = "$ " +totalC;

    /* Đếm Số lượng sản phẩm trong giỏ hàng */
    document.getElementById('demSL').innerText = cartItem.length;
}
function xoa(sp)
{
   var check = confirm("Bạn muôn xóa sản phẩm này không")
   if(check == true)
   {
      parent = sp.parentNode.parentNode;
      parent.remove();
      tinhToan();
   }
}

function tinh()
{
    var sl = document.querySelector("input").value;
    var gia = document.querySelector('.gia').innerText;
    var tong = 0;
    tong = sl*gia;
    tinhToan();

}
// ----------------Ẩn Hiện Giỏ Hàng --------------
var indexShow = true;
function show()
{
   if(indexShow == true)
   {
      document.getElementById('cart').style.display = "block";
      indexShow = false;
   }
   else if(indexShow == false)
   {
      document.getElementById('cart').style.display = "none";
      indexShow = true;
   }
}

// ----------------Đặt Hàng--------------
function datHang(cart)
{
    var cartItem = document.querySelectorAll("tbody tr");
    // console.log(cartItem[0].childNodes[3].innerText);
    // console.log(cartItem[0].childNodes[5].childNodes[0].src);
    // console.log(cartItem[0].childNodes[7].innerText);
    // console.log(cartItem[0].childNodes[11].childNodes[0].value);

    var list = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : [];
   
    for (let i = 0; i < cartItem.length; i++) {
        var sp = {
            name: cartItem[i].childNodes[3].innerText,
            img: cartItem[i].childNodes[5].childNodes[0].src,
            price: cartItem[i].childNodes[7].innerText,
            sl: cartItem[i].childNodes[11].childNodes[0].value
        }
        list.push(sp);
        localStorage.setItem("Cart", JSON.stringify(list))

    }
    
 
  window.location = '/cart';
}
// ----------------User Page--------------
 function User1()
 {
    window.location = '/cart'
 }



