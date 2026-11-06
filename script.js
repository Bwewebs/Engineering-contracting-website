/* =====================================================================
   الشركة الهندسية للمقاولات العامة — site behaviour
   ===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     LANGUAGE TOGGLE
     Every bilingual element in index.html carries class "t-ar" or
     "t-en". We simply show the pair matching the active language and
     hide the other, then flip <html lang> and <html dir>.
  --------------------------------------------------------------- */
  var html = document.documentElement;
  var langToggle = document.getElementById("langToggle");

  function applyLanguage(lang) {
    var isEn = lang === "en";
    html.setAttribute("lang", isEn ? "en" : "ar");
    html.setAttribute("dir", isEn ? "ltr" : "rtl");
    langToggle.textContent = isEn ? "AR" : "EN";

    document.querySelectorAll(".t-ar").forEach(function (el) {
      el.style.display = isEn ? "none" : "";
    });
    document.querySelectorAll(".t-en").forEach(function (el) {
      el.style.display = isEn ? "" : "none";
    });

    try { localStorage.setItem("site-lang", lang); } catch (e) {}
    renderReviews(lang);
  }

  langToggle.addEventListener("click", function () {
    var current = html.getAttribute("lang") === "en" ? "en" : "ar";
    applyLanguage(current === "en" ? "ar" : "en");
  });

  var savedLang = "ar";
  try { savedLang = localStorage.getItem("site-lang") || "ar"; } catch (e) {}

  /* ---------------------------------------------------------------
     MOBILE MENU
  --------------------------------------------------------------- */
  var burger = document.getElementById("burgerBtn");
  var navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  /* ---------------------------------------------------------------
     FAQ ACCORDION
  --------------------------------------------------------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    btn.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (i) {
        i.classList.remove("open");
        i.querySelector(".mark").textContent = "+";
      });
      if (!wasOpen) {
        item.classList.add("open");
        item.querySelector(".mark").textContent = "–";
      }
    });
  });

  /* ---------------------------------------------------------------
     BEFORE / AFTER DRAG SLIDER
  --------------------------------------------------------------- */
  document.querySelectorAll("[data-ba]").forEach(function (wrap) {
    var after = wrap.querySelector(".ba-after");
    var handle = wrap.querySelector(".ba-handle");
    var range = wrap.querySelector(".ba-range");

    function update(value) {
      var rtl = html.getAttribute("dir") === "rtl";
      var revealFromEnd = 100 - value;
      after.style.clipPath = rtl
        ? "inset(0 " + value + "% 0 0)"
        : "inset(0 0 0 " + value + "%)";
      handle.style.insetInlineStart = value + "%";
    }

    range.addEventListener("input", function () {
      update(Number(range.value));
    });
    update(50);
  });

  /* ---------------------------------------------------------------
     REVIEWS
     PLACEHOLDER CONTENT — replace the text/name/location fields
     below with real customer reviews before launch. Keep the same
     object shape (ar / en / stars / name / loc).
  --------------------------------------------------------------- */
  var REVIEWS = [
    {
      stars: 5,
      ar: "بيض الله وجيههم، عزلوا لنا السطح شغل مرتب و من بعدها ما شفنا للرطوبة طاري لا مع الشتاء ولا غيره. تعامل راقي و اهم شيء التزامهم بالمواعيد مضبوط.",
      en: "May God bless them — they waterproofed our roof and did a tidy job. We haven't seen a trace of damp since, winter or otherwise. Classy to deal with, and most importantly, they stuck to the schedule.",
      name_ar: "أبو فهد", name_en: "Abu Fahad",
      loc_ar: "الرياض", loc_en: "Riyadh"
    },
    {
      stars: 5,
      ar: "ارضية الايبوكسي بالمستودع طلعت نظيفة و متينة، فريق منظم وما سوّوا فوضى بالموقع. ينصح فيهم.",
      en: "The epoxy flooring in our warehouse came out clean and solid. Organized crew, no mess left behind on site. Recommended.",
      name_ar: "خالد العتيبي", name_en: "Khalid Al-Otaibi",
      loc_ar: "جدة", loc_en: "Jeddah"
    },
    {
      stars: 5,
      ar: "رمموا لنا واجهة الفيلا من الصفر، والله الشغل فاق التوقعات وما قصروا بالتفاصيل. جزاهم الله خير.",
      en: "They rebuilt our villa's facade from scratch — honestly, the work exceeded expectations and they didn't skip a single detail. May God reward them well.",
      name_ar: "أم سلطان", name_en: "Umm Sultan",
      loc_ar: "الدمام", loc_en: "Dammam"
    }
  ];

  function renderReviews(lang) {
    var track = document.getElementById("reviewsTrack");
    if (!track) return;
    var isEn = lang === "en";
    track.innerHTML = "";
    REVIEWS.forEach(function (r) {
      var item = document.createElement("div");
      item.className = "review-item";
      var stars = document.createElement("div");
      stars.className = "review-stars";
      stars.textContent = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
      var p = document.createElement("p");
      p.textContent = isEn ? r.en : r.ar;
      var name = document.createElement("div");
      name.className = "review-name";
      name.textContent = isEn ? r.name_en : r.name_ar;
      var loc = document.createElement("div");
      loc.className = "review-loc";
      loc.textContent = isEn ? r.loc_en : r.loc_ar;
      item.appendChild(stars);
      item.appendChild(p);
      item.appendChild(name);
      item.appendChild(loc);
      track.appendChild(item);
    });
  }

  /* ---------------------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  var y1 = document.getElementById("year");
  var y2 = document.getElementById("year2");
  if (y1) y1.textContent = year;
  if (y2) y2.textContent = year;

  /* ---------------------------------------------------------------
     INIT
  --------------------------------------------------------------- */
  applyLanguage(savedLang);
})();
