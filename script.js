AOS.init();

const navLinks = document.querySelectorAll('nav a');
const ham = document.getElementById('hamburger');
const nav = document.getElementById('navMenu');
const loginPage = document.getElementById('loginPage');
const mainContent = document.getElementById('mainContent');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// hamburger menu
ham.onclick = () => {
    ham.classList.toggle('active');
    nav.classList.toggle('show');
};

// Tutup menu saat link diklik (untuk mobile)
document.querySelectorAll('#navMenu a').forEach(a => {
    a.onclick = () => {
        nav.classList.remove('show');
        ham.classList.remove('active');
    };
});

//LOGIN
function login() {
    if (usernameInput.value === 'XIITKJA' && passwordInput.value === 'SNELIKTKJ') {
        loginPage.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        alert('Akses ditolak! Periksa kembali Username dan Password.');
    }
}

//MANAJEMEN PIKET 
function savePiket() {
    const data = {};
    document.querySelectorAll('.piket-card').forEach(c => {
        const day = c.dataset.day;
        data[day] = [];
        c.querySelectorAll('.piket-nama div').forEach(n => data[day].push(n.innerText));
    });
    localStorage.setItem('piketData', JSON.stringify(data));
}

function loadPiket() {
    const data = JSON.parse(localStorage.getItem('piketData'));
    if (!data) return;
    document.querySelectorAll('.piket-card').forEach(c => {
        const day = c.dataset.day;
        if (data[day]) {
            c.querySelectorAll('.piket-nama div').forEach((n, i) => {
                if (data[day][i]) n.innerText = data[day][i];
            });
        }
    });
}

function editPiket(btn) {
    const card = btn.closest('.piket-card');
    card.querySelectorAll('.piket-nama div').forEach(n => {
        const v = prompt('Edit nama piket:', n.innerText);
        if (v !== null && v.trim() !== "") n.innerText = v;
    });
    savePiket();
}

document.addEventListener('DOMContentLoaded', loadPiket);
