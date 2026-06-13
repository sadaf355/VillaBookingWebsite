// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && e.target !== menuBtn) {
      mobileNav.classList.remove('open');
    }
  });
}

let loginbtn = document.querySelector('#book');
let loginform = document.querySelector('.bookingform');
let closebtn = document.querySelector('#form-close');

if (loginbtn && loginform && closebtn) {
  loginbtn.addEventListener('click', function () {
    if (typeof window.isLoggedIn === 'function' && !window.isLoggedIn()) {
      alert("Please log in first to proceed with staycation booking!");
      if (typeof window.openLoginModal === 'function') {
        window.openLoginModal();
      }
    } else {
      // Pre-fill user details if logged in
      if (typeof window.getCurrentUser === 'function') {
        const user = window.getCurrentUser();
        if (user) {
          const nameField = document.querySelector('.bookingform form input[placeholder="Enter your name"]');
          const emailField = document.getElementById('e');
          const phoneField = document.getElementById('p');
          if (nameField) nameField.value = `${user.first_name} ${user.last_name}`;
          if (emailField) emailField.value = user.email;
          if (phoneField) phoneField.value = user.phone;
        }
      }
      loginform.classList.add('active');
    }
  });
  closebtn.addEventListener('click', function () {
    loginform.classList.remove('active');
  });
}

function calc(val) {
  var v = val;
  var a = 20000;
  var x = document.getElementById("tt");
  x.value = parseInt(v) + parseInt(a) + " per/day";
}

function mouseover() {
  document.getElementById("head1").innerHTML = 'Alibag, Chorande, Mapgaon, Maharashtra 402201, India';
}
function mouseout() {
  document.getElementById("head1").innerHTML = 'Alibaug';
}

var i = 0;
var imgs = [];
var time = 1000;

imgs[0] = "Assests/Images/a1.png";
imgs[1] = "Assests/Images/a2.png";
imgs[2] = "Assests/Images/a3.png";
imgs[3] = "Assests/Images/a4.png";
imgs[4] = "Assests/Images/a5.png";
imgs[5] = "Assests/Images/a6.png";
imgs[6] = "Assests/Images/a7.png";
imgs[7] = "Assests/Images/a8.png";
imgs[8] = "Assests/Images/a9.png";
imgs[9] = "Assests/Images/a10.png";
imgs[10] = "Assests/Images/a11.png";
imgs[11] = "Assests/Images/a12.png";
imgs[12] = "Assests/Images/a13.png";
imgs[13] = "Assests/Images/a14.png";

function slides() {
  document.slide.src = imgs[i];
  if (i < imgs.length - 1) {
    i++;
  } else {
    i = 0;
  }
  setTimeout("slides()", time);
}
window.onload = slides;

var services = ["Assests/Images/a5.png", "Assests/Images/a4.png", "Assests/Images/a3.png", "Assests/Images/a9.png", "Assests/Images/a8.png", "Assests/Images/act5.png"];
function show(s) {
  document.display.src = services[s];
}

function scrollWin(x, y) {
  window.scrollBy(x, y);
}

async function Submitt() {
  var nameField = document.querySelector('.bookingform form input[placeholder="Enter your name"]');
  var name = nameField ? nameField.value.trim() : "";
  var email = document.getElementById("e").value.trim();
  var phn = document.getElementById("p").value.trim();
  var checkin = document.getElementById("checkin-date").value;
  var checkout = document.getElementById("checkout-date").value;
  
  var genderInput = document.querySelector('.bookingform form input[name="gender"]:checked');
  var gender = genderInput ? genderInput.value : "Male";
  
  var statusSelect = document.getElementById("status");
  var packageType = statusSelect.options[statusSelect.selectedIndex].text;
  var totalAmount = document.getElementById("tt").value;
  
  var msgField = document.getElementById("message");
  var message = msgField ? msgField.value.trim() : "";

  if (!name || !email || !phn || !checkin || !checkout || !packageType || !totalAmount) {
      alert("Please fill in all the required fields.");
      return;
  }

  var token = typeof window.getAuthToken === 'function' ? window.getAuthToken() : null;
  if (!token) {
      alert("You are not logged in. Please log in first.");
      if (typeof window.openLoginModal === 'function') window.openLoginModal();
      return;
  }

  var submitBtn = document.querySelector('.bookingform form .btn');
  var originalVal = submitBtn.value;
  submitBtn.disabled = true;
  submitBtn.value = "Processing...";

  try {
      const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              full_name: name,
              email,
              phone: phn,
              checkin_date: checkin,
              checkout_date: checkout,
              gender,
              package_type: packageType,
              total_amount: totalAmount,
              message
          })
      });

      const data = await response.json();

      if (!response.ok) {
          alert(data.error || "Booking failed. Please try again.");
          return;
      }

      // Successful Booking confirmation
      var split = email.split("@");
      var e1 = split[0];
      var e2 = split[1];
      e1 = e1.substring(0, e1.length / 2);

      var arr = phn.split("");
      arr.splice(0, 6, '******');

      alert("Thank You!!! " + e1 + "****@" + e2 + " for choosing us. \n The Booking Confirmation sms has been sent to " + arr.join(""));
      
      // Reset form & close modal
      document.querySelector('.bookingform form').reset();
      document.querySelector('.bookingform').classList.remove('active');
  } catch (err) {
      console.error('Booking submission error:', err);
      alert("Network error. Please check your connection and try again.");
  } finally {
      submitBtn.disabled = false;
      submitBtn.value = originalVal;
  }
}