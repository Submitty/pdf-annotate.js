// Transform point by matrix
//
export function applyTransform(p, m) {
  var xt = p[0] * m[0] + p[1] * m[2] + m[4];
  var yt = p[0] * m[1] + p[1] * m[3] + m[5];
  return [xt, yt];
};

// Transform point by matrix inverse
//
export function applyInverseTransform(p, m) {
  var d = m[0] * m[3] - m[1] * m[2];
  var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
  var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
  return [xt, yt];
};


// Concatenates two transformation matrices together and returns the result.
export function transform(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
};

export function translate(m, x, y) {
  return [
    m[0],
    m[1],
    m[2],
    m[3],
    m[0] * x + m[2] * y + m[4],
    m[1] * x + m[3] * y + m[5]
  ];
};


export function rotate(m, angle) {
  angle = angle * Math.PI / 180;

  var cosValue = Math.cos(angle);
  var sinValue = Math.sin(angle);

  return [
    m[0] * cosValue + m[2] * sinValue,
    m[1] * cosValue + m[3] * sinValue,
    m[0] * (-sinValue) + m[2] * cosValue,
    m[1] * (-sinValue) + m[3] * cosValue,
    m[4],
    m[5]
  ];
};

export function scale(m, x, y) {
  return [
    m[0] * x,
    m[1] * x,
    m[2] * y,
    m[3] * y,
    m[4],
    m[5]
  ];
};
  
function getInverseTransform(m) {
  var d = m[0] * m[3] - m[1] * m[2];
  return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d,
    (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
};
