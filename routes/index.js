var express = require('express');
var router = express.Router();
var db = require('../database/connect');
const jwt = require('jsonwebtoken');

/* GET Login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
})
/* 
   Check Username + Password trong database
    Nếu đúng : tạo token-> lưu vào cookies  
*/
router.post('/login', function (req, res, next) {

  db.query("SELECT * FROM username ", function (err, data) {
    if (err) throw err;
    var check = data.find((un) => {
      return un.username.toUpperCase() === req.body.username.toUpperCase() && un.password.toUpperCase() === req.body.password.toUpperCase();
    })

    if (check == null) { res.json("Mật khẩu không đúng") }

    if (check != null) {
      var token = jwt.sign({ id: check.id }, 'mk');
      console.log(token);
      res.render('checkLogin', { token: token })
    }

  })
});

/* 
   Lấy token ở Cookies ra để check Login 
   (Cookies == null) => Cần đăng nhập
 */
var checkLogin = (req, res, next) => {
  try {
    var token = req.cookies.token;/* Lấy token ở Cookies */
    var idUser = jwt.verify(token, 'mk'); /* Mã hóa lại Token => id */

    db.query("SELECT * FROM username ", function (err, data) {
      if (err) throw err;
      var check = data.find((un) => {
        // return un.id === idUser.id;
        if (un.id === idUser.id) {
          return un;
        }
      })

      if (check != null) {
        req.data = check;
        next()
      }

    })
  }

  catch (err) {
    
    // res.send('<a href="/login">Login</a>')
    res.render('login')
  }

}

/*   Check Quyền User  */
var checkUser = (req, res, next) => {
  var role = req.data.role;
  var name = req.data.name;
  console.log('===> ....', req.data);
  // req.data = name;


  if (role === 'user' || role === 'admin') {
    next()
  }
  else {
    res.json("Bạn không đủ quyền")
  }
}

/*   Check Quyền Admin */
var checkAdmin = (req, res, next) => {

  var role = req.data.role;
  if (role === 'admin') {
    next()
  }
  else {
    res.send('<h1>Bạn không đủ quyền</h1>')
  }
}




/* GET home page. */
router.get('/', checkLogin, checkUser, function (req, res, next) {
  var name = req.data.name;
  db.query("SELECT * FROM products ", function (err, data) {
    if (err) throw err;
    res.render('index', { data: data, name: name });
  })
});

// Get data => Json
router.get('/listSP', function (req, res, next) {
  db.query("SELECT * FROM products ", function (err, data) {
    if (err) throw err;
    res.json(data);
  })
});


/* Post comments */
router.post('/detail/:id', function (req, res, next) {
  console.log(req.body.date);

  db.query(`INSERT INTO comment2 (name,idSP,cmt,date) VALUES(
    '${req.body.name}',
    '${req.body.idSP}',
    '${req.body.cmt}',
    '${req.body.date}'

)`,

    function (err) {
      if (err) throw err;
      res.redirect(`/detail/${req.body.idSP}`);
    })
});

/* Get Commnet */

router.get('/detail/:id', checkLogin, checkUser, function (req, res, next) {

  var name = req.data.name;


  db.query(`SELECT *FROM comment2 WHERE idSP=${req.params.id}`, function (err, result1) {

    db.query(`SELECT *FROM products WHERE id=${req.params.id}`, function (err, result) {
      if (err) throw err;
      res.render('chiTiet', { data: result, data1: result1, name: name })
    })
  })



});

/* Delete Comment */
router.get('/delete/cmt/:id', checkLogin, function (req, res, next) {
  var role = req.data.role;
  var name = req.data.name;

  console.log('Name.......', name);

  if (role === 'admin') {
    db.query(`DELETE FROM comment2 WHERE id=${req.params.id}`, function (err) {
      if (err) throw err;
      res.redirect('/')
    })
  }

  else if (role != 'admin') {
    db.query(`SELECT name FROM comment2 WHERE id=${req.params.id}`, function (err, data) {
      console.log(data[0].name);
      if (name == data[0].name) {
        db.query(`DELETE FROM comment2 WHERE id=${req.params.id}`, function (err) {
          if (err) throw err;
          res.redirect('/')
        })
      }
      else{
        res.send("<h4>Không thể xóa comment của người khác</h4>")
      }
    })
  }
});





/* GET Admin page. */
router.get('/admin', checkLogin, checkAdmin, function (req, res, next) {
  res.render('admin')
})

/* List Order */
router.get('/admin/order', checkLogin, checkAdmin, function (req, res, next) {
  db.query("SELECT * FROM donhang ", function (err, data) {
    if (err) throw err;
    res.json(data)
  })
});
/* Xóa Order */
router.get('/delete/order/:id', checkLogin, checkAdmin, function (req, res, next) {
  db.query(`DELETE FROM donhang WHERE id=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect('/admin')
  })
});


/* Profile Products */
router.get('/admin/products', checkLogin, checkAdmin, function (req, res, next) {
  db.query("SELECT * FROM products ", function (err, data) {
    if (err) throw err;
    res.json(data)
  })
});

/* Add Products */
router.get('/admin/addproducts', checkLogin, checkAdmin, function (req, res, next) {
  res.render('addProduct')
});



router.post('/admin/addproducts', function (req, res, next) {

  db.query("SELECT name FROM products ", function (err, data) {
    if (err) throw err;
    var check = data.find((un) => {
      return un.name.toUpperCase() === req.body.name.toUpperCase();
    })

    if (check == null) {
      db.query(`INSERT INTO products (name,price,image,moTa) VALUES(
       '${req.body.name}',
       '${req.body.price}',
       '${req.body.image}',
       '${req.body.moTa}'
  )`,

        function (err) {
          if (err) throw err;
          res.redirect('/admin');
        })
    }

    if (check != null) {
      res.send("<h1>Sản phẩm đã tồn tại</h1>")
    }

  })
});



/* Edit Products */
router.get('/edit/products/:id', checkLogin, checkAdmin, function (req, res, next) {
  var data = db.query(`SELECT *FROM products WHERE id=${req.params.id}`, function (err, data) {
    if (err) throw err;
    res.render('editProducts', { data: data })
  })
});

router.post("/edit/products", function (req, res) {
  db.query(`
      UPDATE products set 
          name='${req.body.name}',
          price='${req.body.price}',
          image='${req.body.image}',
          moTa='${req.body.moTa}' WHERE id='${req.body.id}'
          `,

    function (err) {
      if (err) throw err;
      res.redirect('/admin')
    })
})

router.get('/admin/products/:id', checkLogin, checkAdmin, function (req, res, next) {
  var data = db.query(`SELECT *FROM products WHERE id=${req.params.id}`, function (err, data) {
    if (err) throw err;
    res.json(data)

  })
});

/* Delete Products */
router.get('/delete/products/:id', checkLogin, checkAdmin, function (req, res, next) {
  db.query(`DELETE FROM products WHERE id=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect('/admin')
  })
});

/* Delete User */
router.get('/delete/user/:id', checkLogin, checkAdmin, function (req, res, next) {
  db.query(`DELETE FROM username WHERE id=${req.params.id}`, function (err) {
    if (err) throw err;
    res.redirect('/admin')
  })
});


/* Profile User */
router.get('/admin/user', checkLogin, function (req, res, next) {
  db.query("SELECT * FROM username ", function (err, data) {
    if (err) throw err;
    res.json(data)
  })
});

router.get('/admin/user/:id', checkLogin, function (req, res, next) {
  var data = db.query(`SELECT *FROM username WHERE id=${req.params.id}`, function (err, data) {
    if (err) throw err;
    res.json(data)

  })
});




/* GET Sign Up page. */
router.get('/Signup', function (req, res, next) {
  res.render('Signup');
})


router.post('/Signup', function (req, res, next) {

  db.query("SELECT username FROM username ", function (err, data) {
    if (err) throw err;
    var check = data.find((un) => {
      return un.username === req.body.username;
    })

    if (check == null) {
      db.query(`INSERT INTO username (name,username,password,phone,role) VALUES(
              '${req.body.name}',
               '${req.body.username}',
               '${req.body.password}',
               '${req.body.phone}',
               '${req.body.role}'
          )`,

        function (err) {
          if (err) throw err;
          res.redirect('/Signup');
        })
    }

    if (check != null) {
      res.send("<h1>Tài khoản đã tồn tại</h1>")
    }

  })
});

/* My Cart. */
router.get('/cart', checkLogin, checkUser, function (req, res, next) {
  var name = req.data.name;
  var username = req.data.username;
  var password = req.data.password;
  var phone = req.data.phone;
  var role = req.data.role;
  var id = req.data.id;


  res.render('datHang', { name: name, username: username, password: password, phone: phone, role: role, id: id });
})

router.post("/cart", function (req, res) {

  db.query(`INSERT INTO donhang (name,address,phone,dsOrder,total,note) VALUES(
     '${req.body.name}',
     '${req.body.address}',
     '${req.body.phone}',
     '${req.body.donHang}',
     '${req.body.thanhToan}',
     '${req.body.note}'

)`,

    function (err) {
      if (err) throw err;
      res.redirect('/cart');
    })
})

router.get('/cart/changepass', checkLogin, checkUser, function (req, res, next) {
  var name = req.data.name;
  var username = req.data.username;
  var password = req.data.password;
  var phone = req.data.phone;
  var role = req.data.role;
  var id = req.data.id;

  // console.log(id);
  // console.log(password);
  res.render('ChangePass', { id: id })

})

router.post('/cart/changepass', function (req, res, next) {
  db.query(`
  UPDATE username set 
      password='${req.body.password}' WHERE id='${req.body.id}'
      `,

    function (err) {
      if (err) throw err;
      res.redirect('/cart')
    })

})




module.exports = router;
