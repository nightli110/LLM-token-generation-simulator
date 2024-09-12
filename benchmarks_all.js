const benchmarkData = {
    "Apple": {
        "M1": [
            {
                "BW": 68, 
                "GPUCores": 7, 
                "Llama2_7B_F16_Processing": null, 
                "Llama2_7B_F16_Generation": null, 
                "Llama2_7B_Q8_0_Processing": 108.21, 
                "Llama2_7B_Q8_0_Generation": 7.92, 
                "Llama2_7B_Q4_0_Processing": 107.81, 
                "Llama2_7B_Q4_0_Generation": 14.19,
                "Llama3_8B_Q4_K_M_Processing": 87.26,
                "Llama3_8B_Q4_K_M_Generation": 9.72,
                "Llama3_8B_F16_Processing": null,
                "Llama3_8B_F16_Generation": null,
                "Llama3_70B_Q4_K_M_Processing": null,
                "Llama3_70B_Q4_K_M_Generation": null,
                "Llama3_70B_F16_Processing": null,
                "Llama3_70B_F16_Generation": null
            },
            {"BW": 68, "GPUCores": 8, "Llama2_7B_F16_Processing": null, "Llama2_7B_F16_Generation": null, "Llama2_7B_Q8_0_Processing": 117.25, "Llama2_7B_Q8_0_Generation": 7.91, "Llama2_7B_Q4_0_Processing": 117.96, "Llama2_7B_Q4_0_Generation": 14.15}
        ],
        "M1_Pro": [
            {"BW": 200, "GPUCores": 14, "Llama2_7B_F16_Processing": null, "Llama2_7B_F16_Generation": null, "Llama2_7B_Q8_0_Processing": 235.16, "Llama2_7B_Q8_0_Generation": 21.95, "Llama2_7B_Q4_0_Processing": 232.55, "Llama2_7B_Q4_0_Generation": 35.52}, 
            {"BW": 200, "GPUCores": 16, "Llama2_7B_F16_Processing": 302.14, "Llama2_7B_F16_Generation": 12.75, "Llama2_7B_Q8_0_Processing": 270.37, "Llama2_7B_Q8_0_Generation": 22.34, "Llama2_7B_Q4_0_Processing": 266.25, "Llama2_7B_Q4_0_Generation": 36.41}
        ],
        "M1_Max": [
            {"BW": 400, "GPUCores": 24, "Llama2_7B_F16_Processing": 453.03, "Llama2_7B_F16_Generation": 22.55, "Llama2_7B_Q8_0_Processing": 405.87, "Llama2_7B_Q8_0_Generation": 37.81, "Llama2_7B_Q4_0_Processing": 400.26, "Llama2_7B_Q4_0_Generation": 54.61}, 
            {
                "BW": 400, 
                "GPUCores": 32, 
                "Llama2_7B_F16_Processing": 599.53, 
                "Llama2_7B_F16_Generation": 23.03, 
                "Llama2_7B_Q8_0_Processing": 537.37, 
                "Llama2_7B_Q8_0_Generation": 40.2, 
                "Llama2_7B_Q4_0_Processing": 530.06, 
                "Llama2_7B_Q4_0_Generation": 61.19,
                "Llama3_8B_Q4_K_M_Processing": 355.45,
                "Llama3_8B_Q4_K_M_Generation": 34.49,
                "Llama3_8B_F16_Processing": 418.77,
                "Llama3_8B_F16_Generation": 18.43,
                "Llama3_70B_Q4_K_M_Processing": 33.01,
                "Llama3_70B_Q4_K_M_Generation": 4.09,
                "Llama3_70B_F16_Processing": null,
                "Llama3_70B_F16_Generation": null
            }
        ],
        "M1_Ultra": [
            {"BW": 800, "GPUCores": 48, "Llama2_7B_F16_Processing": 875.81, "Llama2_7B_F16_Generation": 33.92, "Llama2_7B_Q8_0_Processing": 783.45, "Llama2_7B_Q8_0_Generation": 55.69, "Llama2_7B_Q4_0_Processing": 772.24, "Llama2_7B_Q4_0_Generation": 74.93}
        ],
        "M2": [
            {"BW": 100, "GPUCores": 10, "Llama2_7B_F16_Processing": 201.34, "Llama2_7B_F16_Generation": 6.72, "Llama2_7B_Q8_0_Processing": 181.4, "Llama2_7B_Q8_0_Generation": 12.21, "Llama2_7B_Q4_0_Processing": 179.57, "Llama2_7B_Q4_0_Generation": 21.91}
        ],
        "M2_Pro": [
            {"BW": 200, "GPUCores": 16, "Llama2_7B_F16_Processing": 312.65, "Llama2_7B_F16_Generation": 12.47, "Llama2_7B_Q8_0_Processing": 288.46, "Llama2_7B_Q8_0_Generation": 22.7, "Llama2_7B_Q4_0_Processing": 294.24, "Llama2_7B_Q4_0_Generation": 37.87}, 
            {"BW": 200, "GPUCores": 19, "Llama2_7B_F16_Processing": 384.38, "Llama2_7B_F16_Generation": 13.06, "Llama2_7B_Q8_0_Processing": 344.5, "Llama2_7B_Q8_0_Generation": 23.01, "Llama2_7B_Q4_0_Processing": 341.19, "Llama2_7B_Q4_0_Generation": 38.86}
        ],
        "M2_Max": [
            {"BW": 400, "GPUCores": 30, "Llama2_7B_F16_Processing": 600.46, "Llama2_7B_F16_Generation": 24.16, "Llama2_7B_Q8_0_Processing": 540.15, "Llama2_7B_Q8_0_Generation": 39.97, "Llama2_7B_Q4_0_Processing": 537.6, "Llama2_7B_Q4_0_Generation": 60.99}, 
            {"BW": 400, "GPUCores": 38, "Llama2_7B_F16_Processing": 755.67, "Llama2_7B_F16_Generation": 24.65, "Llama2_7B_Q8_0_Processing": 677.91, "Llama2_7B_Q8_0_Generation": 41.83, "Llama2_7B_Q4_0_Processing": 671.31, "Llama2_7B_Q4_0_Generation": 65.95}
        ],
        "M2_Ultra": [
            {"BW": 800, "GPUCores": 60, "Llama2_7B_F16_Processing": 1128.59, "Llama2_7B_F16_Generation": 39.86, "Llama2_7B_Q8_0_Processing": 1003.16, "Llama2_7B_Q8_0_Generation": 62.14, "Llama2_7B_Q4_0_Processing": 1013.81, "Llama2_7B_Q4_0_Generation": 88.64}, 
            {
                "BW": 800, 
                "GPUCores": 76, 
                "Llama2_7B_F16_Processing": 1401.85, 
                "Llama2_7B_F16_Generation": 41.02, 
                "Llama2_7B_Q8_0_Processing": 1248.59, 
                "Llama2_7B_Q8_0_Generation": 66.64, 
                "Llama2_7B_Q4_0_Processing": 1238.48, 
                "Llama2_7B_Q4_0_Generation": 94.27,
                "Llama3_8B_Q4_K_M_Processing": 1023.89,
                "Llama3_8B_Q4_K_M_Generation": 76.28,
                "Llama3_8B_F16_Processing": 1202.74,
                "Llama3_8B_F16_Generation": 36.25,
                "Llama3_70B_Q4_K_M_Processing": 117.76,
                "Llama3_70B_Q4_K_M_Generation": 12.13,
                "Llama3_70B_F16_Processing": 145.82,
                "Llama3_70B_F16_Generation": 4.71
            }
        ],
        "M3": [
            {"BW": 100, "GPUCores": 10, "Llama2_7B_F16_Processing": null, "Llama2_7B_F16_Generation": null, "Llama2_7B_Q8_0_Processing": 187.52, "Llama2_7B_Q8_0_Generation": 12.27, "Llama2_7B_Q4_0_Processing": 186.75, "Llama2_7B_Q4_0_Generation": 21.34}
        ],
        "M3_Pro": [
            {"BW": 150, "GPUCores": 14, "Llama2_7B_F16_Processing": null, "Llama2_7B_F16_Generation": null, "Llama2_7B_Q8_0_Processing": 272.11, "Llama2_7B_Q8_0_Generation": 17.44, "Llama2_7B_Q4_0_Processing": 269.49, "Llama2_7B_Q4_0_Generation": 30.65}, 
            {"BW": 150, "GPUCores": 18, "Llama2_7B_F16_Processing": 357.45, "Llama2_7B_F16_Generation": 9.89, "Llama2_7B_Q8_0_Processing": 344.66, "Llama2_7B_Q8_0_Generation": 17.53, "Llama2_7B_Q4_0_Processing": 341.67, "Llama2_7B_Q4_0_Generation": 30.74}
        ],
        "M3_Max": [
            {
                "BW": 400, 
                "GPUCores": 40, 
                "Llama2_7B_F16_Processing": 779.17, 
                "Llama2_7B_F16_Generation": 25.09, 
                "Llama2_7B_Q8_0_Processing": 757.64, 
                "Llama2_7B_Q8_0_Generation": 42.75, 
                "Llama2_7B_Q4_0_Processing": 759.7, 
                "Llama2_7B_Q4_0_Generation": 66.31,
                "Llama3_8B_Q4_K_M_Processing": 678.04,
                "Llama3_8B_Q4_K_M_Generation": 50.74,
                "Llama3_8B_F16_Processing": 751.49,
                "Llama3_8B_F16_Generation": 22.39,
                "Llama3_70B_Q4_K_M_Processing": 62.88,
                "Llama3_70B_Q4_K_M_Generation": 7.53,
                "Llama3_70B_F16_Processing": null,
                "Llama3_70B_F16_Generation": null
            }
        ]
    },
    "NVIDIA": {
        "3070_8GB": {
            "Llama3_8B_Q4_K_M_Generation": 70.94, 
            "Llama3_8B_F16_Generation": null, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 2283.62, 
            "Llama3_8B_F16_Processing": null, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "3080_10GB": {
            "Llama3_8B_Q4_K_M_Generation": 106.4, 
            "Llama3_8B_F16_Generation": null, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3557.02, 
            "Llama3_8B_F16_Processing": null, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "3080_Ti_12GB": {
            "Llama3_8B_Q4_K_M_Generation": 106.71, 
            "Llama3_8B_F16_Generation": null, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3556.67, 
            "Llama3_8B_F16_Processing": null, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "4070_Ti_12GB": {
            "Llama3_8B_Q4_K_M_Generation": 82.21, 
            "Llama3_8B_F16_Generation": null, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3653.07, 
            "Llama3_8B_F16_Processing": null, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "4080_16GB": {
            "Llama3_8B_Q4_K_M_Generation": 106.22, 
            "Llama3_8B_F16_Generation": 40.29, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 5064.99, 
            "Llama3_8B_F16_Processing": 6758.9, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "RTX_4000_Ada_20GB": {
            "Llama3_8B_Q4_K_M_Generation": 58.59, 
            "Llama3_8B_F16_Generation": 20.85, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 2310.53, 
            "Llama3_8B_F16_Processing": 2951.87, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "3090_24GB": {
            "Llama3_8B_Q4_K_M_Generation": 111.74, 
            "Llama3_8B_F16_Generation": 46.51, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3865.39, 
            "Llama3_8B_F16_Processing": 4239.64, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "4090_24GB": {
            "Llama3_8B_Q4_K_M_Generation": 127.74, 
            "Llama3_8B_F16_Generation": 54.34, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 6898.71, 
            "Llama3_8B_F16_Processing": 9056.26, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "RTX_5000_Ada_32GB": {
            "Llama3_8B_Q4_K_M_Generation": 89.87, 
            "Llama3_8B_F16_Generation": 32.67, 
            "Llama3_70B_Q4_K_M_Generation": null, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 4467.46, 
            "Llama3_8B_F16_Processing": 5835.41, 
            "Llama3_70B_Q4_K_M_Processing": null, 
            "Llama3_70B_F16_Processing": null
        },
        "3090_24GB_x2": {
            "Llama3_8B_Q4_K_M_Generation": 108.07, 
            "Llama3_8B_F16_Generation": 47.15, 
            "Llama3_70B_Q4_K_M_Generation": 16.29, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 4004.14, 
            "Llama3_8B_F16_Processing": 4690.5, 
            "Llama3_70B_Q4_K_M_Processing": 393.89, 
            "Llama3_70B_F16_Processing": null
        },
        "4090_24GB_x2": {
            "Llama3_8B_Q4_K_M_Generation": 122.56, 
            "Llama3_8B_F16_Generation": 53.27, 
            "Llama3_70B_Q4_K_M_Generation": 19.06, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 8545.0, 
            "Llama3_8B_F16_Processing": 11094.51, 
            "Llama3_70B_Q4_K_M_Processing": 905.38, 
            "Llama3_70B_F16_Processing": null
        },
        "RTX_A6000_48GB": {
            "Llama3_8B_Q4_K_M_Generation": 102.22, 
            "Llama3_8B_F16_Generation": 40.25, 
            "Llama3_70B_Q4_K_M_Generation": 14.58, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3621.81, 
            "Llama3_8B_F16_Processing": 4315.18, 
            "Llama3_70B_Q4_K_M_Processing": 466.82, 
            "Llama3_70B_F16_Processing": null
        },
        "RTX_6000_Ada_48GB": {
            "Llama3_8B_Q4_K_M_Generation": 130.99, 
            "Llama3_8B_F16_Generation": 51.97, 
            "Llama3_70B_Q4_K_M_Generation": 18.36, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 5560.94, 
            "Llama3_8B_F16_Processing": 6205.44, 
            "Llama3_70B_Q4_K_M_Processing": 547.03, 
            "Llama3_70B_F16_Processing": null
        },
        "A40_48GB": {
            "Llama3_8B_Q4_K_M_Generation": 88.95, 
            "Llama3_8B_F16_Generation": 33.95, 
            "Llama3_70B_Q4_K_M_Generation": 12.08, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3240.95, 
            "Llama3_8B_F16_Processing": 4043.05, 
            "Llama3_70B_Q4_K_M_Processing": 239.92, 
            "Llama3_70B_F16_Processing": null
        },
        "L40S_48GB": {
            "Llama3_8B_Q4_K_M_Generation": 113.6, 
            "Llama3_8B_F16_Generation": 43.42, 
            "Llama3_70B_Q4_K_M_Generation": 15.31, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 5908.52, 
            "Llama3_8B_F16_Processing": 2491.65, 
            "Llama3_70B_Q4_K_M_Processing": 649.08, 
            "Llama3_70B_F16_Processing": null
        },
        "RTX_4000_Ada_20GB_x4": {
            "Llama3_8B_Q4_K_M_Generation": 56.14, 
            "Llama3_8B_F16_Generation": 20.58, 
            "Llama3_70B_Q4_K_M_Generation": 7.33, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 3369.24, 
            "Llama3_8B_F16_Processing": 4366.64, 
            "Llama3_70B_Q4_K_M_Processing": 306.44, 
            "Llama3_70B_F16_Processing": null
        },
        "A100_PCIe_80GB": {
            "Llama3_8B_Q4_K_M_Generation": 138.31, 
            "Llama3_8B_F16_Generation": 54.56, 
            "Llama3_70B_Q4_K_M_Generation": 22.11, 
            "Llama3_70B_F16_Generation": null, 
            "Llama3_8B_Q4_K_M_Processing": 5800.48, 
            "Llama3_8B_F16_Processing": 7504.24, 
            "Llama3_70B_Q4_K_M_Processing": 726.65, 
            "Llama3_70B_F16_Processing": null
        },
        "A100_SXM_80GB": {
            "Llama3_8B_Q4_K_M_Generation": 133.38, 
            "Llama3_8B_F16_Generation": 53.18, 
            "Llama3_70B_Q4_K_M_Generation": 24.33
        }
    }
};

// Function to flatten the Apple data while preserving variants
function flattenAppleData(data) {
    const flattened = [];
    for (const [chip, variants] of Object.entries(data)) {
        variants.forEach((variant, index) => {
            flattened.push({
                device: `Apple|${chip}${variants.length > 1 ? ` (${variant.GPUCores} cores)` : ''}`,
                GPUCores: variant.GPUCores,
                BW: variant.BW,
                ...Object.fromEntries(Object.entries(variant).filter(([key]) => 
                    key !== 'GPUCores' && key !== 'BW'
                ))
            });
        });
    }
    return flattened;
}

// Flatten Apple data
const flattenedApple = flattenAppleData(benchmarkData.Apple);

// Combine flattened Apple data with NVIDIA GPUs
const combinedBenchmarkData = [
    ...flattenedApple,
    ...Object.entries(benchmarkData.NVIDIA).map(([gpu, data]) => ({
        device: `NVIDIA|${gpu}`,
        ...data
    }))
];

// Expose combinedBenchmarkData globally
window.combinedBenchmarkData = combinedBenchmarkData;
