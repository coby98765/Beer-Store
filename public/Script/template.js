//stylesheets
// import '../Style/template.css';


//insert heder
const header = document.getElementById('navbar')
header.innerHTML = `
<h2 class="logo" id="logo">yaakov.store</h2>
        <nav class="navigation">
            <a class="navigationItem" href="./home.html#home">Home</a>
            <a class="navigationItem" href="./store.html">Shop</a>
            <a class="navigationItem" href="./home.html#about">About</a>
             <a class="navigationItem" href="./home.html#contact">Contact</a>
            <a class="navigationItem" href="./cart.html">Cart</a>
            <button class="login-popup">Log-In</button>
        </nav>
`;


//nav bar scrolled back color 
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


//Jump to top button
// Display the button when the user scrolls down 20px from the top
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("jumpToTopBtn").style.display = "block";
    } else {
        document.getElementById("jumpToTopBtn").style.display = "none";
    }
}

// Scroll to the top when the button is clicked
function jumpToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



//insert footer
const footer = document.getElementById('footer')
footer.innerHTML = `
<div class="footer-container">
<div class="footer-row">
    <div class="footer-col">
        <h4>Company</h4>
        <ul>
            <li><a href="./home.html#about">About us</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="./home.html#contact">Contact</a></li>
            <li><a href="#">Privacy</a></li>
        </ul>
    </div>
    <div class="footer-col">
        <h4>Support</h4>
        <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="../Pages/admin.html">Admin</a></li>
            <li><a href="#">get help</a></li>
        </ul>
    </div>
    <div class="footer-col">
        <h4>projects</h4>
        <ul>
            <li><a href="#">other</a></li>
            <li><a href="#">other</a></li>
            <li><a href="#">other</a></li>
            <li><a href="#">other</a></li>
        </ul>
    </div>
    <div class="footer-col">
        <h4>Follow us</h4>
        <div class="footer-social-links">
            <a href="https://wa.me/972526437441"><ion-icon name="logo-whatsapp"></ion-icon></a>
            <a href="mailto:yaakovmoncharsh@gmail.com"><ion-icon name="mail"></ion-icon></a>
            <a href="https://www.linkedin.com/in/yaakov-moncharsh-ab6992153/"><ion-icon
                    name="logo-linkedin"></ion-icon></a>
            <a href="https://github.com/coby98765"><ion-icon name="logo-github"></ion-icon></a>
        </div>
    </div>
</div>
</div>
  `;

//login popup
const login_popupbtn = document.querySelector('.login-popup');
const wrapper = document.querySelector('.wrapper');
login_popupbtn.addEventListener('click', (e) => {
    //activet login popup
    wrapper.classList.add('active-popup');
    //insert login HTML
    wrapper.innerHTML = `
        <span class="icon-close">
            <ion-icon name="close"></ion-icon>
        </span>

        <div class="form-box login">
            <h2>Login</h2>
            <form action="#">
                <div class="imputBox">
                    <span class="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="text" id="login-email" required>
                    <label>Email</label>
                    <p class="messege" id="login-email-messege">Email is not Valid</span></p>
                </div>
                <div class="imputBox">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" id="login-password" required>
                    <label>Password</label>
                    <p class="messege" id="login-password-messege">Password is <span
                            id="login-password-strangth"></span></p>
                </div>
                <div class="remember-forget">
                    <label><input type="checkbox" name="rememberMe" id="rememberMe">Remember Me</label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" class="login-Button" id="login-Button">Login</button>
                <div class="login-register" >
                    <p>Don't Have an account?
                        <a href="#" class="register-link" id="register-link">Register</a>
                    </p>
                </div>
            </form>
        </div>
    `;
    const icon_close = document.querySelector('.icon-close');
    icon_close.addEventListener('click', (e) => {
        wrapper.classList.remove('active-popup');
        wrapper.innerHTML = "";
    });

    //login form
    const login_email = document.getElementById("login-email");
    const login_email_messege = document.getElementById("login-email-messege");
    const login_password = document.getElementById("login-password");
    const login_password_messege = document.getElementById("login-password-messege");
    const login_password_strangth = document.getElementById("login-password-strangth");
    // const login_rememberMe = document.getElementById("rememberMe");
    const login_Button = document.getElementById("login-Button");
    // let login_passwordValid = false;
    // let login_emailValid = false;
    login_email_messege.style.display = "none";
    login_password_messege.style.display = "none";
    // login_Button.disabled = true;

    login_password.addEventListener("input", () => {
        PasswordLangth(login_password, login_password_messege);
        PasswordStrangth(login_password, login_password_strangth, login_password_messege);
        // login_passwordValid = true;
        // console.log(login_passwordValid);
    });
    login_email.addEventListener("input", (e) => {
        EmailValid(login_email, login_email_messege, login_emailValid)
        console.log(login_emailValid);

    });
    // document.addEventListener("mousemove", (e) => {
    //     if (login_passwordValid || login_emailValid) {
    //         login_Button.disabled = false;
    //     }
    // });

    //insert register HTML
    const register_link = document.getElementById('register-link');
    const form_box = document.querySelector('.form-box');
    register_link.addEventListener('click', (e) => {
        console.log(e);
        form_box.classList.remove('login');
        form_box.classList.add('register');
        form_box.innerHTML = `
    <h2>Registration</h2>
    <form action="#">
        <div class="imputBox">
            <span class="icon">
                <ion-icon name="person"></ion-icon>
            </span>
            <input type="text" id="register-Username" required>
            <label>Username</label>
            <!-- <p class="messege" id="email-messege">Email is not Valid</span></p> -->
        </div>
        <div class="imputBox">
            <span class="icon"><ion-icon name="mail"></ion-icon></span>
            <input type="text" id="register-email" required>
            <label>Email</label>
            <p class="messege" id="register-email-messege">Email is not Valid</span></p>
        </div>
        <div class="imputBox">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" id="register-password" required>
            <label>Password</label>
            <p class="messege" id="register-password-messege">Password is <span
                    id="register-password-strangth"></span></p>
        </div>
        <div class="remember-forget">
            <label><input type="checkbox" name="rememberMe" id="agree_to_conditions">Agree to terms and
                conditions</label>
        </div>
        <button type="submit" class="login-Button" id="register-Button">Register</button>
        <div class="login-register">
            <p>Already Have an account?
                <a href="#" class="login-link" id="login-link">login</a>
            </p>
        </div>
    </form>
    `;
        const login_link = document.getElementById('login-link');
        login_link.addEventListener('click', (e) => {
            console.log(e);
            form_box.classList.remove('register');
            form_box.classList.add('login');
            form_box.innerHTML = `
        <h2>Login</h2>
        <form action="#">
            <div class="imputBox">
                <span class="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="text" id="login-email" required>
                <label>Email</label>
                <p class="messege" id="login-email-messege">Email is not Valid</span></p>
            </div>
            <div class="imputBox">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" id="login-password" required>
                <label>Password</label>
                <p class="messege" id="login-password-messege">Password is <span
                        id="login-password-strangth"></span></p>
            </div>
            <div class="remember-forget">
                <label><input type="checkbox" name="rememberMe" id="rememberMe">Remember Me</label>
                <a href="#">Forgot Password</a>
            </div>
            <button type="submit" class="login-Button" id="login-Button">Login</button>
            <div class="login-register" >
                <p>Don't Have an account?
                    <a href="#" class="register-link" id="register-link">Register</a>
                </p>
            </div>
        </form>
    `;
        });


        //register
        const register_Username = document.getElementById("register-Username");
        const register_email = document.getElementById("register-email");
        const register_email_messege = document.getElementById("register-email-messege");
        const register_password = document.getElementById("register-password");
        const register_password_messege = document.getElementById("register-password-messege");
        const register_password_strangth = document.getElementById("register-password-strangth");
        const register_agree_to_conditions = document.getElementById("agree_to_conditions");
        const register_Button = document.getElementById("register-Button");
        let register_passwordValid = false;
        let register_emailValid = false;
        register_email_messege.style.display = "none";
        register_password_messege.style.display = "none";
        register_Button.disabled = true;


        register_password.addEventListener("input", () => {
            PasswordLangth(register_password, register_password_messege);
            PasswordStrangth(register_password, register_password_strangth, register_password_messege);
            // register_passwordValid = true;
            // console.log(register_passwordValid);
        });


        register_email.addEventListener("input", (e) => {
            EmailValid(register_email, register_email_messege, register_emailValid)
            console.log(register_emailValid);

        });

        // document.addEventListener("mousemove", (e) => {
        //     if (register_passwordValid || register_emailValid) {
        //         register_Button.disabled = false;
        //     }
        // });

    });
});



//login popup

// const login_link = document.querySelector('.login-link');
// const register_link = document.querySelector('.register-link');


// register_link.addEventListener('click', (e) => {
//     wrapper.classList.add('active');
// });

// login_link.addEventListener('click', (e) => {
//     wrapper.classList.remove('active');
// });

// login_popup.addEventListener('click', (e) => {
//     wrapper.classList.add('active-popup');
// });





// //form
// //login
// const login_email = document.getElementById("login-email");
// const login_email_messege = document.getElementById("login-email-messege");
// const login_password = document.getElementById("login-password");
// const login_password_messege = document.getElementById("login-password-messege");
// const login_password_strangth = document.getElementById("login-password-strangth");
// const login_rememberMe = document.getElementById("rememberMe");
// const login_Button = document.getElementById("login-Button");
// let login_passwordValid = false;
// let login_emailValid = false;
// // login_email_messege.style.display = "none";
// // login_password_messege.style.display = "none";
// // login_Button.disabled = true

// //register
// const register_Username = document.getElementById("register-Username");
// const register_email = document.getElementById("register-email");
// const register_email_messege = document.getElementById("register-email-messege");
// const register_password = document.getElementById("register-password");
// const register_password_messege = document.getElementById("register-password-messege");
// const register_password_strangth = document.getElementById("register-password-strangth");
// const register_agree_to_conditions = document.getElementById("agree_to_conditions");
// const register_Button = document.getElementById("register-Button");
// let register_passwordValid = false;
// let register_emailValid = false;
// // register_email_messege.style.display = "none";
// // register_password_messege.style.display = "none";
// // register_Button.disabled = true



// login_password.addEventListener("input", () => {
//     PasswordLangth(login_password, login_password_messege);
//     PasswordStrangth(login_password, login_password_strangth, login_password_messege);
//     // login_passwordValid = true;
//     // console.log(login_passwordValid);
// })

// register_password.addEventListener("input", () => {
//     PasswordLangth(register_password, register_password_messege);
//     PasswordStrangth(register_password, register_password_strangth, register_password_messege);
//     // register_passwordValid = true;
//     // console.log(register_passwordValid);
// })

// login_email.addEventListener("input", (e) => {
//     EmailValid(login_email, login_email_messege, login_emailValid)
//     console.log(login_emailValid);

// })

// document.addEventListener("mousemove", (e) => {
//     if (login_passwordValid || login_emailValid) {
//         login_Button.disabled = false;
//     }
// })


//login functions
function isPasswordValid(password) {
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[0-9]/.test(password)) {
        return false;
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return false;
    }

    return true;
};

function PasswordLangth(password, messege) {
    if (password.value.length > 0) {
        messege.style.display = "block";
    }
    else {
        messege.style.display = "none";
    }
};
function PasswordStrangth(password, strangth, messege,) {
    if (password.value.length < 4 || !isPasswordValid(password.value)) {
        strangth.innerHTML = "week";
        password.style.borderColor = "#ff5925";
        messege.style.color = "#ff5925";
    }
    else if (password.value.length >= 8 && isPasswordValid(password.value)) {
        strangth.innerHTML = "strong";
        password.style.borderColor = "#26d730";
        messege.style.color = "#26d730";
    }
};

function EmailValid(email, messege, Valid) {
    let regexp = /@.+\.co/
    const findText = regexp.test(email.value);
    if (findText) {
        messege.style.display = "none";
        Valid = true
    }
    else {
        messege.style.display = "block";
    }
};

// window.addEventListener('click', (event) => {
//     console.log(event.button)
//     if (event.button === 3){
//         event.preventDefault
//     }
//   })