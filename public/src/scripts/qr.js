//d
//  login.ts
//
//  Generated by Poll Castillo on 15/02/2023.
//
import { getUserInfo, _userAgent, getEntityData } from "./endpoints.js";
const loginContainer = document.getElementById('login-container');
const app = document.getElementById('app');
const connectionHeader = {
    Accept: "application/json",
    "User-agent": _userAgent,
    Authorization: "Basic YzNjMDM1MzQ2MjoyZmM5ZjFiZTVkN2IwZDE4ZjI1YmU2NDJiM2FmMWU1Yg==",
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: "JSESSIONID=CDD208A868EAABD1F523BB6F3C8946AF",
};
const reqOP = {
    url: 'https://backend.netliinks.com:443/oauth/token',
    method: 'POST'
};
export class SignIn {
    async checkSignIn() {
        const accessToken = localStorage.getItem('access_token');
        const checkUser = async () => {
            let currentUser = await getUserInfo();
            if (currentUser.error === 'invalid_token') {
                this.accessToken();
            }
            if (currentUser.username === "qr") {
                const valores = window.location.search;
                const urlParams = new URLSearchParams(valores);
                var token = urlParams.get('key');
                if (token == null || token == '' || token == undefined) {
                    this.show404();
                }
                else {
                    reg(token);
                }
            }
        };
        const reg = async (token) => {
            await getEntityData("Visit", `${token}`)
                .then((res) => {
                if (res.visitState?.name == "Finalizado") {
                    this.showFinish();
                }
                else {
                    this.showQr(res);
                }
            })
                .catch(error => {
                this.show404();
                console.log('error', error);
            });
        };
        if (accessToken) {
            checkUser();
        }
        else {
            this.accessToken();
        }
    }
    showQr(data) {
        loginContainer.style.display = 'flex !important';
        loginContainer.innerHTML = `
        <div class="login_window">
        <div class="login_header">
          <img src="./public/src/assets/pictures/app_logo.png">
          <h1 class="login_title">QR VISITA</h1>
          <div class="input_detail">
            <label for="ingress-date"><i class="fa-solid fa-user"></i> ${data.firstName} ${data.firstLastName}</label><br>
            <label for="ingress-date"><i class="fa-solid fa-address-card"></i> ${data.dni}</label><br>
            <label for="ingress-date"><i class="fa-solid fa-calendar"></i> ${data.creationDate}</label><br>
            <label for="ingress-date"><i class="fa-solid fa-heartbeat"></i> ${data.visitState.name}</label><br>
            <label for="ingress-date"><i class="fa-solid fa-share"></i> ${data.user.username}</label><br>
          </div>
        </div>
        <div class="login_content">
            <div id="qrcode" style="display:flex;justify-content:center"></div>
        </div>

        <div class="login_footer">
          <div class="login_icons">
            <i class="fa-regular fa-house"></i>
            <i class="fa-regular fa-user"></i>
            <i class="fa-regular fa-inbox"></i>
            <i class="fa-regular fa-file"></i>
            <i class="fa-regular fa-computer"></i>
            <i class="fa-regular fa-mobile"></i>
          </div>
          <p>Accede a todas nuestras herramientas</p>

          <div class="foot_brief">
            <p>Desarrollado por</p>
            <img src="./public/src/assets/pictures/login_logo.png">
          </div>
        </div>
      </div>
        `;
        this.signIn();
        this.intervalQr(data);
    }
    showFinish() {
        loginContainer.style.display = 'flex !important';
        loginContainer.innerHTML = `
        <div class="login_window">
            <div class="login_header">
                <img src="./public/src/assets/pictures/app_logo.png">
                <h1 class="login_title">PORTAL QR VISITA</h1>
                <div class="input_detail">
                    <label for="ingress-date"><i class="fa-solid fa-check-square" style="color:green;"></i> La visita ha finalizado</label><br>
                </div>
                </div>
                <div class="login_content" style="display:flex;justify-content:center">
                <br>
                    <img src="./public/src/assets/pictures/in-time.png" width="50%" height="50%">
                </div>

                <div class="login_footer">
                <div class="login_icons">
                    <i class="fa-regular fa-house"></i>
                    <i class="fa-regular fa-user"></i>
                    <i class="fa-regular fa-inbox"></i>
                    <i class="fa-regular fa-file"></i>
                    <i class="fa-regular fa-computer"></i>
                    <i class="fa-regular fa-mobile"></i>
                </div>
                <p>Accede a todas nuestras herramientas</p>

                <div class="foot_brief">
                    <p>Desarrollado por</p>
                    <img src="./public/src/assets/pictures/login_logo.png">
                </div>
            </div>
        </div>
        `;
    }
    show404() {
        loginContainer.style.display = 'flex !important';
        loginContainer.innerHTML = `
        <div class="login_window">
            <div class="login_header">
                <img src="./public/src/assets/pictures/app_logo.png">
                <h1 class="login_title">PORTAL QR VISITA</h1>
                <div class="input_detail">
                    <label for="ingress-date"><i class="fa-solid fa-exclamation-circle" style="color:red;"></i> Ha ocurrido un error</label><br>
                </div>
                </div>
                <div class="login_content" style="display:flex;justify-content:center">
                <br>
                    <img src="./public/src/assets/pictures/404.jpg" width="75%" height="75%">
                </div>

                <div class="login_footer">
                <div class="login_icons">
                    <i class="fa-regular fa-house"></i>
                    <i class="fa-regular fa-user"></i>
                    <i class="fa-regular fa-inbox"></i>
                    <i class="fa-regular fa-file"></i>
                    <i class="fa-regular fa-computer"></i>
                    <i class="fa-regular fa-mobile"></i>
                </div>
                <p>Accede a todas nuestras herramientas</p>

                <div class="foot_brief">
                    <p>Desarrollado por</p>
                    <img src="./public/src/assets/pictures/login_logo.png">
                </div>
            </div>
        </div>
        `;
    }
    intervalQr(data) {
        var counter = 10;
        let change = () => {
            counter *= 10;
            let randomKey = { key: Math.floor(Math.random() * 999999) };
            setTimeout(() => {
                // @ts-ignore
                new QRCode(document.getElementById("qrcode"), `${randomKey.key}`);
            }, counter);
        };
        setTimeout(change, counter);
    }
    signIn() {
        const form = document.querySelector('#login-form');
        //this.accessToken()
    }
    accessToken() {
        localStorage.removeItem('access_token');
        const reqOptions = {
            method: reqOP.method,
            body: `grant_type=password&username=qr&password=qr`,
            headers: connectionHeader
        };
        fetch(reqOP.url, reqOptions)
            .then((res) => res.json())
            .then((res) => {
            if (res.error == 'Bad credentials') {
                console.error('error en las credenciales');
            }
            else {
                const connectionData = {
                    token: res.access_token,
                    expiresIn: res.expires_in,
                    refreshToken: res.refresh_token,
                    scope: res.scope,
                    tokenType: res.token_type
                };
                localStorage.setItem('access_token', connectionData.token);
                window.location.reload();
            }
        });
    }
    signOut() {
        this.accessToken();
    }
}
