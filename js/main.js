// Declare variables at the top of the file
const speedInput = document.getElementById('speed-input');
const speedNumber = document.getElementById('speed-number');
const tokenCountInput = document.getElementById('token-count-input');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const tokenDisplay = document.getElementById('token-display');
const tokenCountSpan = document.getElementById('token-count');
const systemInfo = document.getElementById('system-info');
const chipSelect = document.getElementById('chip-select');
const benchmarkResults = document.getElementById('benchmark-results');
const quantizationSelect = document.getElementById('quantization-select');
const elapsedTimeSpan = document.getElementById('elapsed-time');
const expectedTimeSpan = document.getElementById('expected-time');
const tokenCountSlider = document.getElementById('token-count-slider');

let startTime;
let isGenerating = false;
let generatedTokens = 0;
let animationFrameId;
let intervalId;

// Add this fallback text in case the sample text is not loaded
const fallbackText = "This is a fallback sample text for token generation. It will be used if the actual sample text fails to load. The purpose of this text is to provide a backup solution for the token generation simulation.";

// Function to get all available devices
function getAllDevices() {
    return window.combinedBenchmarkData.map(item => item.device);
}

// Function to populate the device select element
function populateDeviceSelect() {
    const devices = getAllDevices();
    chipSelect.innerHTML = '<option value="">Select device</option>';
    devices.forEach(device => {
        const [category, name] = device.split('|');
        const option = document.createElement('option');
        option.value = device;
        
        const deviceData = window.combinedBenchmarkData.find(item => item.device === device);
        if (category === 'Apple') {
            option.textContent = `${category} ${name} (${deviceData.GPUCores} cores, ${deviceData.BW} GB/s)`;
        } else {
            option.textContent = `${category} ${name}`;
        }
        
        chipSelect.appendChild(option);
    });
}

// Function to get available models for a selected device
function getAvailableModels(deviceValue) {
    const deviceData = window.combinedBenchmarkData.find(item => item.device === deviceValue);
    return Object.keys(deviceData).filter(key => 
        key !== 'device' && key !== 'GPUCores' && key !== 'BW' && deviceData[key] !== null
    );
}

// Function to populate the model select element
function populateModelSelect() {
    const selectedDevice = chipSelect.value;
    quantizationSelect.innerHTML = '<option value="">Select model</option>';
    
    if (selectedDevice) {
        const models = getAvailableModels(selectedDevice);
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            quantizationSelect.appendChild(option);
        });
    }
}

// Function to get benchmark data for a specific device and model
function getBenchmarkData(deviceValue, model) {
    const deviceData = window.combinedBenchmarkData.find(item => item.device === deviceValue);
    return {
        GPUCores: deviceData.GPUCores,
        BW: deviceData.BW,
        value: deviceData[model] || null
    };
}

// Update the updateBenchmarkResults function
function updateBenchmarkResults() {
    const deviceValue = chipSelect.value;
    const model = quantizationSelect.value;
    
    const resultChip = document.getElementById('result-chip');
    const resultBW = document.getElementById('result-bw');
    const resultGPU = document.getElementById('result-gpu');
    const resultModel = document.getElementById('result-model');
    const resultTps = document.getElementById('result-tps');
    const noDataMessage = document.getElementById('no-data-message');
    
    if (deviceValue && model) {
        const data = getBenchmarkData(deviceValue, model);
        
        if (data.value !== null) {
            const [category, name] = deviceValue.split('|');
            resultChip.textContent = `${category} ${name}`;
            if (category === 'Apple') {
                resultBW.textContent = `${data.BW} GB/s`;
                resultGPU.textContent = `${data.GPUCores} cores`;
            } else {
                resultBW.textContent = 'N/A';
                resultGPU.textContent = 'N/A';
            }
            resultModel.textContent = model;
            resultTps.textContent = `${data.value.toFixed(2)} t/s`;
            noDataMessage.style.display = 'none';
            benchmarkResults.style.display = 'block';
            speedNumber.value = Math.min(Math.round(data.value), 32768);
            const sliderValue = Math.round((Math.log(speedNumber.value) - Math.log(1)) / (Math.log(32768) - Math.log(1)) * 100);
            speedInput.value = sliderValue;
        } else {
            noDataMessage.textContent = `No data available for ${model} on this device.`;
            noDataMessage.style.display = 'block';
            benchmarkResults.style.display = 'none';
        }
    } else {
        noDataMessage.style.display = 'none';
        benchmarkResults.style.display = 'none';
    }
}

// Function to update the speed number input when the range input changes
speedInput.addEventListener('input', function() {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(1);
    const maxv = Math.log(32768);
    const scale = (maxv - minv) / (maxp - minp);
    speedNumber.value = Math.round(Math.exp(minv + scale * (this.value - minp)));
    resetDeviceAndModel();
    updateExpectedTime();
});

// Function to update the range input when the speed number input changes
speedNumber.addEventListener('input', function() {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(1);
    const maxv = Math.log(32768);
    const scale = (maxv - minv) / (maxp - minp);
    speedInput.value = Math.round((Math.log(this.value) - minv) / scale + minp);
    resetDeviceAndModel();
    updateExpectedTime();
});

// Function to start token generation
function startGeneration() {
    if (isGenerating) return;
    isGenerating = true;
    startTime = performance.now();
    generatedTokens = 0;
    tokenDisplay.textContent = '';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    generateTokens();
}

// Function to stop token generation
function stopGeneration() {
    isGenerating = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Calculate and display final elapsed time
    const elapsedTime = (performance.now() - startTime) / 1000;
    elapsedTimeSpan.textContent = elapsedTime.toFixed(3);
}

// Function to reset the simulation
function resetSimulation() {
    stopGeneration();
    generatedTokens = 0;
    tokenDisplay.textContent = '';
    tokenCountSpan.textContent = '(0 tokens)';
    elapsedTimeSpan.textContent = '0.000';
    expectedTimeSpan.textContent = '0.000';
    tokenCountSlider.value = 50;
    tokenCountInput.value = 100;
    updateExpectedTime();
}

// Function to generate tokens
function generateTokens() {
    const tokensPerSecond = parseInt(speedNumber.value);
    const totalTokens = parseInt(tokenCountInput.value);
    
    // Use the fallback text if sampleTextContent is not available
    const words = (window.sampleTextContent || fallbackText).split(' ');
    let wordIndex = 0;

    const startTime = performance.now();
    let lastUpdateTime = startTime;

    function generateToken() {
        if (generatedTokens < totalTokens && isGenerating) {
            const currentTime = performance.now();
            const elapsedTime = (currentTime - startTime) / 1000;
            const expectedTokens = Math.floor(elapsedTime * tokensPerSecond);

            while (generatedTokens < expectedTokens && generatedTokens < totalTokens) {
                tokenDisplay.textContent += words[wordIndex] + ' ';
                wordIndex = (wordIndex + 1) % words.length;
                generatedTokens++;
            }

            tokenCountSpan.textContent = `(${generatedTokens} tokens)`;
            tokenDisplay.scrollTop = tokenDisplay.scrollHeight;

            elapsedTimeSpan.textContent = elapsedTime.toFixed(3);
            expectedTimeSpan.textContent = (totalTokens / tokensPerSecond).toFixed(3);

            if (currentTime - lastUpdateTime > 16) {  // Update UI at most every 16ms (60fps)
                lastUpdateTime = currentTime;
                requestAnimationFrame(generateToken);
            } else {
                setTimeout(generateToken, 0);
            }
        } else {
            if (generatedTokens >= totalTokens) {
                stopGeneration();
            }
        }
    }

    generateToken();
}

// Function to update the token count input when the range input changes
tokenCountSlider.addEventListener('input', function() {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(1);
    const maxv = Math.log(32768);
    const scale = (maxv - minv) / (maxp - minp);
    tokenCountInput.value = Math.round(Math.exp(minv + scale * (this.value - minp)));
    resetDeviceAndModel();
    updateExpectedTime();
});

// Function to update the range input when the token count input changes
tokenCountInput.addEventListener('input', function() {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(1);
    const maxv = Math.log(32768);
    const scale = (maxv - minv) / (maxp - minp);
    tokenCountSlider.value = Math.round((Math.log(this.value) - minv) / scale + minp);
    resetDeviceAndModel();
    updateExpectedTime();
});

// Function to update the expected time
function updateExpectedTime() {
    const tokensPerSecond = parseInt(speedNumber.value);
    const totalTokens = parseInt(tokenCountInput.value);
    const expectedTime = totalTokens / tokensPerSecond;
    expectedTimeSpan.textContent = expectedTime.toFixed(3);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateDeviceSelect();
    populateModelSelect();
    
    chipSelect.addEventListener('change', () => {
        populateModelSelect();
        updateBenchmarkResults();
    });
    quantizationSelect.addEventListener('change', updateBenchmarkResults);
    
    startBtn.addEventListener('click', startGeneration);
    stopBtn.addEventListener('click', stopGeneration);
    resetBtn.addEventListener('click', resetSimulation);
    
    // Add event listener for token count input
    // tokenCountInput.addEventListener('input', () => { ... });

    // Update the speed number input event listener
    speedNumber.addEventListener('input', () => {
        const minp = 0;
        const maxp = 100;
        const minv = Math.log(1);
        const maxv = Math.log(32768);
        const scale = (maxv - minv) / (maxp - minp);
        speedInput.value = Math.round((Math.log(this.value) - minv) / scale + minp);
        resetDeviceAndModel();
        updateExpectedTime();
    });

    // Set default speed
    speedNumber.value = 1; // or whatever default you want
    const sliderValue = Math.round((Math.log(speedNumber.value) - Math.log(1)) / (Math.log(32768) - Math.log(1)) * 100);
    speedInput.value = sliderValue;

    // Initial update
    updateBenchmarkResults();
});

// Function to reset device and model selections
function resetDeviceAndModel() {
    chipSelect.value = "";
    quantizationSelect.value = "";
    populateModelSelect(); // Reset model options
    updateBenchmarkResults(); // Hide benchmark results
}

// ... (keep other existing functions)