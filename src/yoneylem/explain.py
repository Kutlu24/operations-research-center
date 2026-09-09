"""Writes the Turkish natural-language explanation of an ALREADY-COMPUTED
real result (from lp_solver.py or queueing.py). The LLM is given the exact
numbers and instructed to narrate them, not invent new ones - mirroring
the same real-number-first discipline used elsewhere in this account
(see e.g. GFCA's llm/synthesis.py)."""
from __future__ import annotations

from .llm import complete
from .models import LPFormulation, LPSolution, QueueingParams, QueueingResult

_SYSTEM = """Sen bir yoneylem arastirmasi asistanisin. Sana GERCEKTEN COZULMUS bir \
optimizasyon veya kuyruk teorisi probleminin sonuclarini veriyorum - bu sayilar gercek bir \
solver/formul tarafindan hesaplandi, senin isin onlari Turkce, anlasilir bir sekilde \
aciklamak. Verilen sayilari degistirme veya yeni sayi uydurma - sadece verilenleri yorumla \
ve karar vericiye ne anlama geldigini anlat. Kisa ve net yaz."""


def explain_lp(question: str, formulation: LPFormulation, solution: LPSolution) -> str:
    user = (
        f"Kullanicinin sorusu: {question}\n\n"
        f"Kurulan model: {formulation.sense} etmek uzere amac fonksiyonu {formulation.objective}, "
        f"kisitlar: {[c.model_dump() for c in formulation.constraints]}, "
        f"tamsayi degiskenler: {formulation.integer_vars or 'yok'}.\n\n"
        f"Gercek solver sonucu: durum={solution.status}, "
        f"optimal deger={solution.objective_value}, "
        f"degisken degerleri={solution.variable_values}.\n\n"
        "Bu gercek sonucu Turkce acikla: optimal cozum nedir, hangi degiskenler ne deger aldi, "
        "amac fonksiyonunun degeri ne oldu."
    )
    return complete(_SYSTEM, user)


def explain_queueing(question: str, params: QueueingParams, result: QueueingResult) -> str:
    if not result.stable:
        user = (
            f"Kullanicinin sorusu: {question}\n\n"
            f"Parametreler: varis orani={params.arrival_rate}, hizmet orani={params.service_rate}, "
            f"sunucu sayisi={params.servers}.\n\n"
            f"Gercek hesap: utilizasyon (rho)={result.rho:.3f} >= 1 - sistem KARARSIZ "
            "(kuyruk sinirsiz buyur).\n\n"
            "Bu gercek sonucu Turkce acikla: sistemin neden kararli olmadigini ve "
            "kararli hale gelmesi icin ne yapilmasi gerektigini (daha fazla sunucu, "
            "daha yuksek hizmet orani vb.) anlat."
        )
        return complete(_SYSTEM, user)

    user = (
        f"Kullanicinin sorusu: {question}\n\n"
        f"Parametreler: varis orani (lambda)={params.arrival_rate}, "
        f"hizmet orani (mu)={params.service_rate}, sunucu sayisi={params.servers}, model={result.model}.\n\n"
        f"Gercek hesaplanmis sonuclar: utilizasyon (rho)={result.rho:.4f}, "
        f"sistemdeki ortalama musteri sayisi (L)={result.L:.4f}, "
        f"kuyruktaki ortalama musteri sayisi (Lq)={result.Lq:.4f}, "
        f"sistemde ortalama gecirilen sure (W)={result.W:.4f}, "
        f"kuyrukta ortalama bekleme suresi (Wq)={result.Wq:.4f}.\n\n"
        "Bu gercek sonuclari Turkce acikla, sayilarin pratikte ne anlama geldigini yorumla."
    )
    return complete(_SYSTEM, user)
