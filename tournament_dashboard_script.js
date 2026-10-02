const formatIDR = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
const formatYen = (number) => '¥ ' + new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(number);

// Fungsi Memajukan Tim di Bracket
function advance(sourceId, targetId) {
    const sourceElement = document.getElementById(sourceId);
    const targetElement = document.getElementById(targetId);
    const sourceName = sourceElement.innerText.trim();

    if (targetElement && sourceName !== "" && sourceName !== "TBD" && !sourceName.includes("Finalist")) {
        targetElement.innerText = sourceName;
        
        // Animasi visual pada slot target
        const parentBox = targetElement.parentElement;
        targetElement.classList.remove('text-gray-500', 'text-gray-600', 'text-gray-700');
        
        if(targetId === 't31') {
            // Styling Khusus Pemenang (Winner Slot)
            targetElement.classList.add('text-white');
        } else {
            targetElement.classList.add('text-white');
            parentBox.classList.remove('border-dashed', 'border-gray-600', 'border-yellow-800/50', 'bg-black/40', 'bg-black/20');
            parentBox.classList.add('border-crimson', 'bg-gradient-to-r', 'from-crimson-dark/40', 'to-transparent');
        }
    }
}

// Fungsi Reset Bracket
function resetBracket() {
    if(confirm("Anda yakin ingin mengosongkan dan me-reset seluruh formasi tim di Bracket?")) {
        // Reset text dan styles
        for(let i=17; i<=31; i++) {
            const el = document.getElementById('t' + i);
            if(el) {
                el.innerText = i === 31 ? "Winner" : (i >= 29 ? "Finalist " + (i===29?"A":"B") : "TBD");
                
                // Kembalikan style origin
                el.classList.remove('text-white');
                const parent = el.parentElement;
                parent.classList.remove('border-crimson', 'bg-gradient-to-r', 'from-crimson-dark/40', 'to-transparent');
                
                if(i === 31) {
                    el.classList.add('text-yellow-400');
                } else if(i >= 29) {
                    el.classList.add('text-gray-700');
                    parent.classList.add('border-dashed', 'border-yellow-800/50', 'bg-black/40');
                } else if(i >= 25) {
                    el.classList.add('text-gray-600');
                    parent.classList.add('border-dashed', 'border-gray-600', 'bg-black/20');
                } else {
                    el.classList.add('text-gray-500');
                    parent.classList.add('border-dashed', 'border-gray-600', 'bg-black/40');
                }
            }
        }
        
        // Reset R1
        for(let i=1; i<=16; i++) {
            const el = document.getElementById('t' + i);
            if(el) el.innerText = "Team " + i;
        }
    }
}

function calculateRewards() {
    // Ambil nilai dari input
    const totalDonasi = parseFloat(document.getElementById('input-donasi').value) || 0;
    const totalInGame = parseFloat(document.getElementById('input-ingame').value) || 0;
    const biayaDaftar = parseFloat(document.getElementById('input-daftar').value) || 0;
    
    // Variabel konstan sesuai aturan event
    const totalTim = 16;
    const playerPerTim = 2;

    // --- HITUNG RUPIAH DONASI (Sesuai Aturan: 50 - 30 - 20) ---
    const prizePoolRp = totalDonasi * 0.50;
    const serverRp = totalDonasi * 0.30;
    const panitiaRp = totalDonasi * 0.20;

    // Rasio Prize Pool: Juara 1 (50%), Juara 2 (30%), Juara 3 (20%) dari 500k
    const j1Rp = prizePoolRp * 0.50;
    const j2Rp = prizePoolRp * 0.30;
    const j3Rp = prizePoolRp * 0.20;

    // Perhitungan Individu (Rupiah)
    const j1RpOrang = j1Rp / playerPerTim;
    const j2RpOrang = j2Rp / playerPerTim;
    const j3RpOrang = j3Rp / playerPerTim;

    // Update DOM Rupiah Umum
    document.getElementById('val-prizepool').innerText = formatIDR(prizePoolRp);
    document.getElementById('val-server').innerText = formatIDR(serverRp);
    document.getElementById('val-panitia').innerText = formatIDR(panitiaRp);
    
    // Update DOM Rupiah Juara & Individu
    document.getElementById('val-juara1-rp').innerText = formatIDR(j1Rp);
    document.getElementById('val-j1-orang').innerText = formatIDR(j1RpOrang) + ' / orang';
    document.getElementById('val-juara2-rp').innerText = formatIDR(j2Rp);
    document.getElementById('val-j2-orang').innerText = formatIDR(j2RpOrang) + ' / orang';
    document.getElementById('val-juara3-rp').innerText = formatIDR(j3Rp);
    document.getElementById('val-j3-orang').innerText = formatIDR(j3RpOrang) + ' / orang';


    // --- HITUNG IN-GAME ---
    // Rasio: 40%, 34.7%, 25.3%
    const j1Ig = totalInGame * 0.40;
    const j2Ig = totalInGame * 0.347; 
    const j3Ig = totalInGame * 0.253; 

    // Perhitungan Individu (In-game)
    const j1IgOrang = j1Ig / playerPerTim;
    const j2IgOrang = j2Ig / playerPerTim;
    const j3IgOrang = j3Ig / playerPerTim;

    // Update DOM In-Game Umum
    document.getElementById('val-ingame-total').innerText = formatYen(totalInGame);
    
    // Update DOM In-Game Juara & Individu
    document.getElementById('val-juara1-ig').innerText = formatYen(j1Ig);
    document.getElementById('val-j1-ig-orang').innerText = formatYen(j1IgOrang) + ' / orang';
    document.getElementById('val-juara2-ig').innerText = formatYen(j2Ig);
    document.getElementById('val-j2-ig-orang').innerText = formatYen(j2IgOrang) + ' / orang';
    document.getElementById('val-juara3-ig').innerText = formatYen(j3Ig);
    document.getElementById('val-j3-ig-orang').innerText = formatYen(j3IgOrang) + ' / orang';


    // --- HITUNG PENDAFTARAN ---
    const totalPendapatanDaftar = totalTim * biayaDaftar;
    document.getElementById('label-biaya-daftar').innerText = formatYen(biayaDaftar);
    document.getElementById('val-total-daftar').innerText = formatYen(totalPendapatanDaftar);
}

// Fungsi Tab Switcher
function switchTab(tabId) {
    // Sembunyikan semua tab content
    const sections = ['finance', 'tor', 'bracket', 'discord', 'guideline', 'partner'];
    sections.forEach(id => {
        document.getElementById(`tab-${id}`).classList.add('hidden');
        document.getElementById(`nav-${id}`).classList.remove('active');
    });

    // Tampilkan tab yang dipilih
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    document.getElementById(`nav-${tabId}`).classList.add('active');
}

// Jalankan kalkulasi pertama kali saat load
window.onload = () => {
    calculateRewards();
};