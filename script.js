document.addEventListener("DOMContentLoaded", function() {
    const teknikKategorileri = document.querySelector(".teknik-kategorileri");
    const teknikIcerik = document.getElementById("teknik-icerik");

    teknikKategorileri.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const kategori = event.target.dataset.kategori;
            teknikIcerigiYukle(kategori);
        }
    });

    function teknikIcerigiYukle(kategori) {
        let icerik = "";

        switch (kategori) {
            case "dogrusal-programlama":
                icerik = `
                    <h3>Doğrusal Programlama (DP)</h3>
                    <p>Doğrusal programlama, doğrusal bir amaç fonksiyonunu, doğrusal eşitlik/eşitsizlik kısıtları altında optimize etmek için kullanılan bir matematiksel modelleme tekniğidir.</p>
                    <p><strong>Standart Form:</strong></p>
                    <p>\\[ \\text{maks. } z = c^T x \\quad \\text{öyle ki} \\quad Ax \\le b, \\quad x \\ge 0 \\]</p>
                    <p><strong>Çözüm Yöntemleri:</strong> Simpleks yöntemi (Dantzig, 1947), iç nokta yöntemleri; iki değişkenli problemler için grafiksel çözüm.</p>
                    <p><strong>Örnek Problem:</strong> Bir fabrika iki ürün üretiyor; her ürün belirli miktarda işçilik ve hammadde tüketiyor. Kısıtlı kaynaklarla kârı maksimize eden üretim karması, \\( \\text{maks. } z = 40x_1 + 30x_2 \\) şeklinde, kaynak kısıtları altında bulunur.</p>
                `;
                break;
            case "tamsayili-programlama":
                icerik = `
                    <h3>Tamsayılı Programlama (TP)</h3>
                    <p>Tamsayılı programlama, karar değişkenlerinin tamsayı (bazen sadece 0/1) değerler alması gerektiği durumlarda kullanılan bir optimizasyon tekniğidir — örneğin "bu tesisi kur ya da kurma" gibi bölünemez kararlarda.</p>
                    <p><strong>Standart Form:</strong></p>
                    <p>\\[ \\text{maks. } z = c^T x \\quad \\text{öyle ki} \\quad Ax \\le b, \\quad x \\in \\mathbb{Z}_{\\ge 0}^n \\]</p>
                    <p><strong>Çözüm Yöntemleri:</strong> Dallan-ve-sınırla (branch and bound), kesme düzlemi (cutting plane) yöntemleri; 0/1 değişkenli özel durum "ikili (binary) programlama" olarak anılır.</p>
                    <p><strong>Örnek Problem:</strong> Sabit sayıda depo adayı arasından, açılış maliyeti ile taşıma maliyetini birlikte minimize edecek şekilde hangi depoların açılacağına karar veren "tesis yeri seçimi" (facility location) problemi.</p>
                `;
                break;
            case "kuyruk-teorisi":
                icerik = `
                    <h3>Kuyruk Teorisi</h3>
                    <p>Kuyruk teorisi, müşterilerin (kişi, çağrı, iş parçası) bir hizmet noktasına rastgele aralıklarla geldiği ve rastgele sürede hizmet aldığı sistemlerin davranışını analiz eder.</p>
                    <p><strong>M/M/1 Modeli:</strong> Poisson varışlı (\\(\\lambda\\)), üstel hizmet süreli (\\(\\mu\\)), tek sunuculu kuyruk için sistemdeki ortalama müşteri sayısı:</p>
                    <p>\\[ L = \\frac{\\rho}{1-\\rho}, \\qquad \\rho = \\frac{\\lambda}{\\mu} \\]</p>
                    <p><strong>Performans Ölçütleri:</strong> Ortalama bekleme süresi (\\(W_q\\)), sistemdeki ortalama müşteri sayısı (\\(L\\)), sunucu doluluk oranı (\\(\\rho\\)) — Little Yasası \\(L = \\lambda W\\) ile birbirine bağlanır.</p>
                    <p><strong>Örnek Uygulamalar:</strong> Çağrı merkezi personel sayısı belirleme, banka gişe sayısı optimizasyonu, hastane acil servis kapasite planlaması.</p>
                `;
                break;
            case "benzetim":
                icerik = `
                    <h3>Benzetim (Simülasyon)</h3>
                    <p>Benzetim, analitik olarak çözülmesi zor veya imkansız olan karmaşık sistemlerin davranışını, bilgisayar üzerinde zaman içinde adım adım taklit ederek incelemek için kullanılan bir tekniktir.</p>
                    <p><strong>Yaygın Teknikler:</strong> Olay-güdümlü benzetim (discrete-event simulation), Monte Carlo benzetimi, ajan-tabanlı modelleme.</p>
                    <p><strong>Modelleme Adımları:</strong> Sistemi tanımlama → rastgele değişkenlerin dağılımını belirleme (varış süresi, hizmet süresi vb.) → benzetim modelini kurma → çok sayıda tekrar (replikasyon) ile sonuçların güven aralığını hesaplama.</p>
                    <p><strong>Örnek Uygulamalar:</strong> Üretim hattı darboğaz analizi, hastane yatak kapasitesi planlaması, tedarik zinciri stok politikalarının karşılaştırılması.</p>
                `;
                break;
            default:
                icerik = "<p>Lütfen yukarıdan bir teknik seçin.</p>";
                break;
        }

        teknikIcerik.innerHTML = icerik;

        // Matematiksel ifadelerin işlenmesi için MathJax'ı yeniden başlat
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise([teknikIcerik]).catch(function (err) {
                console.log(err.message);
            });
        }
    }

    // İlk Yüklemede Boş İçerik Göster
    teknikIcerigiYukle("");
});

// --- Problem Çözücü (gerçek PuLP/kuyruk-teorisi backend'i, ayrı, global scope -
// index.html'deki onclick="cozProblemi()" buna erişebilsin diye yukarıdaki
// DOMContentLoaded kapanışının dışında tanımlandı) ---
const COZUCU_API = "";

async function cozucuConfigYukle() {
    try {
        const cfg = await (await fetch(`${COZUCU_API}/config`)).json();
        document.getElementById("modelBadge").textContent = `Aktif model: ${cfg.provider} / ${cfg.model}`;
    } catch {
        document.getElementById("modelBadge").textContent = "";
    }
}

function fmtSayi(v) {
    if (v === null || v === undefined) return "-";
    if (!isFinite(v)) return "∞";
    return Number(v).toFixed(4).replace(/\.?0+$/, "") || "0";
}

function renderLpSonuc(sol) {
    const degiskenler = Object.entries(sol.variable_values)
        .map(([k, v]) => `<span class="lp-degisken"><strong>${k}</strong> = ${fmtSayi(v)}</span>`)
        .join("");
    return `
        <div class="sonuc-kutusu">
            <div class="sonuc-baslik">Gerçek Solver Sonucu (PuLP/CBC)</div>
            <div class="sonuc-satir">Durum: <strong>${sol.status}</strong></div>
            <div class="sonuc-satir">Optimal değer: <strong>${fmtSayi(sol.objective_value)}</strong></div>
            <div class="lp-degiskenler">${degiskenler}</div>
        </div>`;
}

function renderQueueSonuc(r) {
    if (!r.stable) {
        return `<div class="sonuc-kutusu sonuc-uyari">
            <div class="sonuc-baslik">Gerçek Hesap (${r.model.toUpperCase()})</div>
            <div class="sonuc-satir">Utilizasyon (ρ) = ${fmtSayi(r.rho)} ≥ 1 - sistem <strong>KARARSIZ</strong>.</div>
        </div>`;
    }
    return `
        <div class="sonuc-kutusu">
            <div class="sonuc-baslik">Gerçek Hesap (${r.model.toUpperCase()})</div>
            <div class="sonuc-satir">ρ (utilizasyon) = <strong>${fmtSayi(r.rho)}</strong></div>
            <div class="sonuc-satir">L (sistemde ort. müşteri) = <strong>${fmtSayi(r.L)}</strong></div>
            <div class="sonuc-satir">Lq (kuyrukta ort. müşteri) = <strong>${fmtSayi(r.Lq)}</strong></div>
            <div class="sonuc-satir">W (sistemde ort. süre) = <strong>${fmtSayi(r.W)}</strong></div>
            <div class="sonuc-satir">Wq (kuyrukta ort. bekleme) = <strong>${fmtSayi(r.Wq)}</strong></div>
        </div>`;
}

async function cozProblemi() {
    const soru = document.getElementById("cozucuSoru").value.trim();
    if (!soru) return;
    const durumEl = document.getElementById("cozucuDurum");
    const btn = document.getElementById("cozucuBtn");
    const sonucEl = document.getElementById("cozucuSonuc");
    btn.disabled = true;
    durumEl.textContent = "Problem ayrıştırılıyor ve gerçek çözücüyle hesaplanıyor - 10-40 sn sürebilir...";
    sonucEl.innerHTML = "";

    try {
        const res = await fetch(`${COZUCU_API}/solve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: soru }),
        });
        if (!res.ok) {
            let msg = await res.text();
            try { msg = JSON.parse(msg).detail || msg; } catch {}
            durumEl.textContent = "Hata: " + msg;
            return;
        }
        const data = await res.json();
        durumEl.textContent = "";

        if (data.problem_type === "lp" && data.lp_solution) {
            sonucEl.innerHTML = renderLpSonuc(data.lp_solution) +
                `<div class="sonuc-aciklama">${data.explanation.replace(/\n/g, "<br>")}</div>`;
        } else if (data.problem_type === "queueing" && data.queueing_result) {
            sonucEl.innerHTML = renderQueueSonuc(data.queueing_result) +
                `<div class="sonuc-aciklama">${data.explanation.replace(/\n/g, "<br>")}</div>`;
        } else {
            sonucEl.innerHTML = `<div class="sonuc-kutusu sonuc-uyari"><div class="sonuc-satir">${data.clarification_needed}</div></div>`;
        }
    } catch (e) {
        durumEl.textContent = "Hata: " + e.message;
    } finally {
        btn.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", cozucuConfigYukle);
