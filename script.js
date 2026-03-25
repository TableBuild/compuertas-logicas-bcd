/* ==================== COMPUERTAS LÓGICAS ==================== */
const NOT = x => !x;
const AND = (...x) => x.every(Boolean);
const OR  = (...x) => x.some(Boolean);

/* ==================== TABLA DE VERDAD ==================== */
/* A = MSB (8) | B = 4 | C = 2 | D = LSB (1) */
const tablaVerdad = [
  { A:0,B:0,C:0,D:0, a:1,b:1,c:1,d:1,e:1,f:1,g:0 },
  { A:0,B:0,C:0,D:1, a:0,b:1,c:1,d:0,e:0,f:0,g:0 },
  { A:0,B:0,C:1,D:0, a:1,b:1,c:0,d:1,e:1,f:0,g:1 },
  { A:0,B:0,C:1,D:1, a:1,b:1,c:1,d:1,e:0,f:0,g:1 },
  { A:0,B:1,C:0,D:0, a:0,b:1,c:1,d:0,e:0,f:1,g:1 },
  { A:0,B:1,C:0,D:1, a:1,b:0,c:1,d:1,e:0,f:1,g:1 },
  { A:0,B:1,C:1,D:0, a:1,b:0,c:1,d:1,e:1,f:1,g:1 },
  { A:0,B:1,C:1,D:1, a:1,b:1,c:1,d:0,e:0,f:0,g:0 },
  { A:1,B:0,C:0,D:0, a:1,b:1,c:1,d:1,e:1,f:1,g:1 },
  { A:1,B:0,C:0,D:1, a:1,b:1,c:1,d:1,e:0,f:1,g:1 }
];

/* ==================== ECUACIONES BOOLEANAS ==================== */
function evaluar(A,B,C,D) {
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

/* ==================== CREAR TABLA ==================== */
function crearTablaVerdad() {
  const tbody = document.querySelector("#truthTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  tablaVerdad.forEach((fila, index) => {
    const tr = document.createElement("tr");
    tr.dataset.index = index;

    ["A","B","C","D","a","b","c","d","e","f","g"].forEach(key => {
      const td = document.createElement("td");
      td.textContent = fila[key];
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
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

  // Display
  Object.keys(s).forEach(seg => {
    document.getElementById(seg).classList.toggle("on", s[seg]);
  });

  // Tabla
  document.querySelectorAll("#truthTable tbody tr")
    .forEach(tr => tr.classList.remove("activa"));

  if (numero <= 9) {
    const fila = document.querySelector(
      `#truthTable tbody tr[data-index="${numero}"]`
    );
    if (fila) fila.classList.add("activa");
  }
  
/* ==================== ECUACIONES ==================== */

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
}

/* ==================== INICIO ==================== */
document.addEventListener("DOMContentLoaded", () => {
  crearTablaVerdad();

  ["A","B","C","D"].forEach(id => {
    document.getElementById(id).addEventListener("change", actualizar);
  });

  actualizar();
});
