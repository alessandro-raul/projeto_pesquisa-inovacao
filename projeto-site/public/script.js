function changeToRegister() {
    login.style = 'display: none';
    register.style = 'display: block';
    register.style = 'display: flex';
}
function changeToLogin() {
    register.style = 'display: none';
    login.style = 'display: block, flex';
}
function changeSteps(next) {
    if (next) {
        container_step2.style = 'display: none';
        container_step1.style = 'display: block, flex';
    } else {
        container_step2.style = 'display: block, flex';
        container_step1.style = 'display: none';
    }
}
function valida_email() {
    var emaill = email.value;
    if (emaill.includes('@') == true && emaill.includes('.com') == true) {
        email.style = `border-color: green`;
        msg.style = 'display:block';
        msg.innerHTML = `E-mail válido`;
    } else {
        email.style = 'border-color:red';
        msg.style = 'display:block';
        msg.innerHTML = 'Digite um email válido!';
    }
}
function valida_senha() {
    var password = senha.value;
    if (password.length >= 8) {
        senha.style = `border-color: green`;
        mens.innerHTML = `Senha válida`;
        mens.style = 'display:block';
    } else {
        senha.style = 'border-color:red';
        mens.style = 'display:block'
        mens.innerHTML = 'Digite uma senha válida!';
    }
}
function validar_empresa() {
    if ((nome.value).length < 1) {
        nome.style = "border-color: red";
    } else {
        nome.style = "border-color: green";
    }
}
function validar_cnpj() {
    if ((cnpjEmpresa.value).length == 14) {
        cnpjEmpresa.style = "border-color: green";
    } else {
        cnpjEmpresa.style = "border-color: red";
    }
}
function validar_rua() {
    if ((ruaEmpresa.value).length < 7) {
        ruaEmpresa.style = "border-color: red";
    } else {
        ruaEmpresa.style = "border-color: green";
    }
}
function validar_numero() {
    if ((numEmpresa.value).length < 1) {
        numEmpresa.style = "border-color: red";
    } else {
        numEmpresa.style = "border-color: green";
    }
}
function validar_bairro() {
    if ((bairroEmpresa.value).length < 5) {
        bairroEmpresa.style = "border-color: red";
    } else {
        bairroEmpresa.style = "border-color: green";
    }
}
function validar_cidade() {
    if ((cidadeEmpresa.value).length < 3) {
        cidadeEmpresa.style = "border-color: red";
    } else {
        cidadeEmpresa.style = "border-color: green";
    }
}
function validar_cep() {
    if ((cepEmpresa.value).length != 8) {
        cepEmpresa.style = "border-color: red";
    } else {
        cepEmpresa.style = "border-color: green";
    }
}
function validar_email() {
    var emai = emailEmpresa.value
    if (emai.includes('@') == true && emai.includes('.com') == true) {
        emailEmpresa.style = "border-color: green";
    } else {
        emailEmpresa.style = "border-color: red";
    }
}
function validar_telefone() {
    if ((telefoneEmpresa1.value).length < 11) {
        telefoneEmpresa1.style = "border-color: red";
    } else {
        telefoneEmpresa1.style = "border-color: green";
    }
}
function validar_confirmarSenha() {
    if (senhaEmpresa.value === confirmarSenha.value) {
        confirmarSenha.style = "border-color: green";
    } else {
        confirmarSenha.style = "border-color: red";
    }
}
function validar_senha() {
    if ((senhaEmpresa.value).length > 7) {
        senhaEmpresa.style = "border-color: green";
    } else {
        senhaEmpresa.style = "border-color: red";
    }
}
function iniciarAguardar() {
    btn_login.style = "display: none";
    loading.style = "display: block";
    loading.style = "display: flex";
}
function finalizarAguardar() {
    btn_login.style = "display: block, flex";
    loading.style = "display: none";
}
function cadastrarEmpresa() {
    var formulario = new URLSearchParams(new FormData(form_cadastro));
    fetch("/empresas/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                sessionStorage.setItem("idEmpresa", json.idEmpresa);
                sessionStorage.setItem("cnpj", json.cnpj);
            })
            sucessoMsg("Empresa")
        } else {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                falhaMsg("empresa");
            });
        }
    });
    return false;
}
function verificarLogin() {
    iniciarAguardar()
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/empresas/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            response.json().then(json => {
                sessionStorage.setItem("idEmpresa", json.idEmpresa);
                sessionStorage.setItem("cnpj", json.cnpj);
            })
            window.location.href = "pages/dashboard/index.html";
        } else {
            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                falhaLogin(resposta);
            });
        }
    });
    return false;
}
function sucessoMsg(param) {
    Swal.fire({
        icon: "success",
        title: 'Empresa cadastrada com sucesso!',
        confirmButtonText: `Ok`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href = "pages/dashboard/index.html"
        }
    })
}
function falhaMsg(param) {
    Swal.fire(
        'Ops...',
        'Erro ao cadastrar ' + param,
        'error'
    );
}
function falhaLogin(param) {
    finalizarAguardar();
    Swal.fire(
        'Ops...',
        `${param}`,
        'error'
    );
}