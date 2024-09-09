const appleSiliconBenchmarks = [
  { Chip: "M1", BW: 68, GPUCores: 7, F16PP: null, F16TG: null, Q8_0PP: 108.21, Q8_0TG: 7.92, Q4_0PP: 107.81, Q4_0TG: 14.19 },
  { Chip: "M1", BW: 68, GPUCores: 8, F16PP: null, F16TG: null, Q8_0PP: 117.25, Q8_0TG: 7.91, Q4_0PP: 117.96, Q4_0TG: 14.15 },
  { Chip: "M1 Pro", BW: 200, GPUCores: 14, F16PP: null, F16TG: null, Q8_0PP: 235.16, Q8_0TG: 21.95, Q4_0PP: 232.55, Q4_0TG: 35.52 },
  { Chip: "M1 Pro", BW: 200, GPUCores: 16, F16PP: 302.14, F16TG: 12.75, Q8_0PP: 270.37, Q8_0TG: 22.34, Q4_0PP: 266.25, Q4_0TG: 36.41 },
  { Chip: "M1 Max", BW: 400, GPUCores: 24, F16PP: 453.03, F16TG: 22.55, Q8_0PP: 405.87, Q8_0TG: 37.81, Q4_0PP: 400.26, Q4_0TG: 54.61 },
  { Chip: "M1 Max", BW: 400, GPUCores: 32, F16PP: 599.53, F16TG: 23.03, Q8_0PP: 537.37, Q8_0TG: 40.2, Q4_0PP: 530.06, Q4_0TG: 61.19 },
  { Chip: "M1 Ultra", BW: 800, GPUCores: 48, F16PP: 875.81, F16TG: 33.92, Q8_0PP: 783.45, Q8_0TG: 55.69, Q4_0PP: 772.24, Q4_0TG: 74.93 },
  { Chip: "M2", BW: 100, GPUCores: 10, F16PP: 201.34, F16TG: 6.72, Q8_0PP: 181.4, Q8_0TG: 12.21, Q4_0PP: 179.57, Q4_0TG: 21.91 },
  { Chip: "M2 Pro", BW: 200, GPUCores: 16, F16PP: 312.65, F16TG: 12.47, Q8_0PP: 288.46, Q8_0TG: 22.7, Q4_0PP: 294.24, Q4_0TG: 37.87 },
  { Chip: "M2 Pro", BW: 200, GPUCores: 19, F16PP: 384.38, F16TG: 13.06, Q8_0PP: 344.5, Q8_0TG: 23.01, Q4_0PP: 341.19, Q4_0TG: 38.86 },
  { Chip: "M2 Max", BW: 400, GPUCores: 30, F16PP: 600.46, F16TG: 24.16, Q8_0PP: 540.15, Q8_0TG: 39.97, Q4_0PP: 537.6, Q4_0TG: 60.99 },
  { Chip: "M2 Max", BW: 400, GPUCores: 38, F16PP: 755.67, F16TG: 24.65, Q8_0PP: 677.91, Q8_0TG: 41.83, Q4_0PP: 671.31, Q4_0TG: 65.95 },
  { Chip: "M2 Ultra", BW: 800, GPUCores: 60, F16PP: 1128.59, F16TG: 39.86, Q8_0PP: 1003.16, Q8_0TG: 62.14, Q4_0PP: 1013.81, Q4_0TG: 88.64 },
  { Chip: "M2 Ultra", BW: 800, GPUCores: 76, F16PP: 1401.85, F16TG: 41.02, Q8_0PP: 1248.59, Q8_0TG: 66.64, Q4_0PP: 1238.48, Q4_0TG: 94.27 },
  { Chip: "M3", BW: 100, GPUCores: 10, F16PP: null, F16TG: null, Q8_0PP: 187.52, Q8_0TG: 12.27, Q4_0PP: 186.75, Q4_0TG: 21.34 },
  { Chip: "M3 Pro", BW: 150, GPUCores: 14, F16PP: null, F16TG: null, Q8_0PP: 272.11, Q8_0TG: 17.44, Q4_0PP: 269.49, Q4_0TG: 30.65 },
  { Chip: "M3 Pro", BW: 150, GPUCores: 18, F16PP: 357.45, F16TG: 9.89, Q8_0PP: 344.66, Q8_0TG: 17.53, Q4_0PP: 341.67, Q4_0TG: 30.74 },
  { Chip: "M3 Max", BW: 400, GPUCores: 40, F16PP: 779.17, F16TG: 25.09, Q8_0PP: 757.64, Q8_0TG: 42.75, Q4_0PP: 759.7, Q4_0TG: 66.31 },
  // { Chip: "3070", BW: 448, GPUCores: null, F16PP: null, F16TG: null, Q8_0PP: 2283.62, Q8_0TG: 70.94, Q4_0PP: null, Q4_0TG: null }, // GPU added
  // { Chip: "3080", BW: 760, GPUCores: null, F16PP: null, F16TG: null, Q8_0PP: 3557.02, Q8_0TG: 106.40, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "3080 Ti", BW: 912, GPUCores: null, F16PP: null, F16TG: null, Q8_0PP: 3556.67, Q8_0TG: 106.71, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "4070 Ti", BW: 504, GPUCores: null, F16PP: null, F16TG: null, Q8_0PP: 3653.07, Q8_0TG: 82.21, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "4080", BW: 717, GPUCores: null, F16PP: 6758.90, F16TG: 40.29, Q8_0PP: 5064.99, Q8_0TG: 106.22, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "RTX 4000 Ada", BW: 288, GPUCores: null, F16PP: 2951.87, F16TG: 20.85, Q8_0PP: 2310.53, Q8_0TG: 58.59, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "3090", BW: 936, GPUCores: null, F16PP: 4239.64, F16TG: 46.51, Q8_0PP: 3865.39, Q8_0TG: 111.74, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "4090", BW: 1008, GPUCores: null, F16PP: 9056.26, F16TG: 54.34, Q8_0PP: 6898.71, Q8_0TG: 127.74, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "RTX 5000 Ada", BW: 480, GPUCores: null, F16PP: 5835.41, F16TG: 32.67, Q8_0PP: 4467.46, Q8_0TG: 89.87, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "RTX A6000", BW: 768, GPUCores: null, F16PP: 4315.18, F16TG: 40.25, Q8_0PP: 3621.81, Q8_0TG: 102.22, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "RTX 6000 Ada", BW: 960, GPUCores: null, F16PP: 6205.44, F16TG: 51.97, Q8_0PP: 5560.94, Q8_0TG: 130.99, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "A40", BW: 696, GPUCores: null, F16PP: 4043.05, F16TG: 33.95, Q8_0PP: 3240.95, Q8_0TG: 88.95, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "L40S", BW: 864, GPUCores: null, F16PP: 2491.65, F16TG: 43.42, Q8_0PP: 5908.52, Q8_0TG: 113.60, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "A100 PCIe", BW: 1935, GPUCores: null, F16PP: 7504.24, F16TG: 54.56, Q8_0PP: 5800.48, Q8_0TG: 138.31, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "A100 SXM", BW: 2039, GPUCores: null, F16PP: 681.47, F16TG: 53.18, Q8_0PP: 5863.92, Q8_0TG: 133.38, Q4_0PP: null, Q4_0TG: null },
  // { Chip: "H100 PCIe", BW: 2000, GPUCores: null, F16PP: 10342.63, F16TG: 67.79, Q8_0PP: 7760.16, Q8_0TG: 144.49, Q4_0PP: null, Q4_0TG: null },
];

function getChipOptions() {
  return appleSiliconBenchmarks.map(b => `${b.Chip} (${b.GPUCores} GPU Cores)`);
}

function getBenchmarkForChip(chipString) {
  const [chipName, gpuCores] = chipString.split(' (');
  const cores = parseInt(gpuCores);
  return appleSiliconBenchmarks.find(b => b.Chip === chipName && b.GPUCores === cores);
}

// Expose functions globally
window.getChipOptions = getChipOptions;
window.getBenchmarkForChip = getBenchmarkForChip;