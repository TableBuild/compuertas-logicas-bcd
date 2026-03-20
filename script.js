/* ==================== COMPUERTAS ==================== */
const NOT = x => !x;
const AND = (...x) => x.every(Boolean);
const OR  = (...x) => x.some(Boolean);

/* ==================== ECUACIONES ==================== */
function evaluar(A, B, C, D) {
  return {
    a: OR(A, C, AND(B,D), AND(NOT(B),NOT(D))),
    b: OR(NOT(B), AND(NOT(C),NOT(D)), AND(C,D)),
    c: OR(B, NOT(C), D),
    d: OR(A, AND(NOT(B),C), AND(NOT(B),NOT(D)), AND(C,NOT(D)), AND(B,NOT(C),D)),
    e: OR(AND(NOT(B),NOT(D)), AND(C,NOT(D))),
    f: OR(A, AND(NOT(C),NOT(D)), AND(B,NOT(C)), AND(B,NOT(D))),
    g: OR(A, AND(NOT(B),C), AND(B,NOT(C)), AND(C,NOT(D)))
  };
}

/* ==================== ANIMACIÓN ==================== */
function animarSegmentoA(A, B, C, D) {

  const get = id => document.getElementById(id);

  const ids = [
    "wire-A","wire-B","wire-C","wire-D",
    "notB","notD","andBD","andNotBD","orA",
    "wire-BD","wire-notBD","wire-A2","wire-C2","wire-out-a"
  ];

  // Reset
  ids.forEach(id => {
    const el = get(id);
    if (el) el.classList.remove("active-wire","active-gate","flow");
  });

  // ===== ENTRADAS =====
  if (A) get("wire-A").classList.add("active-wire","flow");
  if (B) get("wire-B").classList.add("active-wire","flow");
  if (C) get("wire-C").classList.add("active-wire","flow");
  if (D) get("wire-D").classList.add("active-wire","flow");

  // ===== NOT =====
  const notB = !B;
  const notD = !D;

  if (notB) get("notB").classList.add("active-gate");
  if (notD) get("notD").classList.add("active-gate");

  // ===== AND =====
  const BD = B && D;
  const nBnD = notB && notD;

  if (BD) {
    get("andBD").classList.add("active-gate");
    get("wire-BD").classList.add("active-wire","flow");
  }

  if (nBnD) {
    get("andNotBD").classList.add("active-gate");
    get("wire-notBD").classList.add("active-wire","flow");
  }

  // ===== OR FINAL =====
  const salida = A || C || BD || nBnD;

  if (salida) {
    get("orA").classList.add("active-gate");
    get("wire-out-a").classList.add("active-wire","flow");
  }

  if (A) get("wire-A2").classList.add("active-wire","flow");
  if (C) get("wire-C2").classList.add("active-wire","flow");
}

/* ==================== ACTUALIZAR ==================== */
function actualizar() {
  const A = document.getElementById("A").checked;
  const B = document.getElementById("B").checked;
  const C = document.getElementById("C").checked;
  const D = document.getElementById("D").checked;

  const numero = A*8 + B*4 + C*2 + D;
  document.getElementById("valor").textContent = numero;

  const s = evaluar(A,B,C,D);

  Object.keys(s).forEach(seg => {
    document.getElementById(seg).classList.toggle("on", s[seg]);
  });

  // Mostrar ecuaciones
  document.getElementById("eq-a").textContent =
    `a = A + C + (B·D) + (¬B·¬D) = ${s.a}`;
  document.getElementById("eq-b").textContent =
    `b = ¬B + (¬C·¬D) + (C·D) = ${s.b}`;
  document.getElementById("eq-c").textContent =
    `c = B + ¬C + D = ${s.c}`;
  document.getElementById("eq-d").textContent =
    `d = A + (¬B·C) + (¬B·¬D) + (C·¬D) + (B·¬C·D) = ${s.d}`;
  document.getElementById("eq-e").textContent =
    `e = (¬B·¬D) + (C·¬D) = ${s.e}`;
  document.getElementById("eq-f").textContent =
    `f = A + (¬C·¬D) + (B·¬C) + (B·¬D) = ${s.f}`;
  document.getElementById("eq-g").textContent =
    `g = A + (¬B·C) + (B·¬C) + (C·¬D) = ${s.g}`;

  // 🔥 Animación integrada correctamente
  animarSegmentoA(A, B, C, D);
}

/* ==================== INICIALIZACIÓN ==================== */
document.addEventListener("DOMContentLoaded", () => {

  ["A","B","C","D"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", actualizar);
  });

  actualizar(); // estado inicial
});