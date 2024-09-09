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
const modeSelect = document.getElementById('mode-select');

let startTime;
let isGenerating = false;
let generatedTokens = 0;
let animationFrameId;
let intervalId;

const quantizationOptions = [
    { value: 'F16', label: 'Model: llama 7B F16' },
    { value: 'Q8_0', label: 'Model: llama 7B Q8_0' },
    { value: 'Q4_0', label: 'Model: llama 7B Q4_0' }
];
const modeOptions = [
    { value: 'PP', label: 'Prompt Processing' },
    { value: 'TG', label: 'Text Generation' }
];

// Update the populateSelect function
function populateSelect(selectElement, options, defaultOption = null) {
    selectElement.innerHTML = '';
    if (defaultOption) {
        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = defaultOption;
        selectElement.appendChild(defaultOpt);
    }
    options.forEach(option => {
        const opt = document.createElement('option');
        if (typeof option === 'object' && option.value && option.label) {
            opt.value = option.value;
            opt.textContent = option.label;
        } else {
            opt.value = option;
            opt.textContent = option;
        }
        selectElement.appendChild(opt);
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Populate chip options using the function from benchmarks.js
    const chipOptions = window.getChipOptions();
    populateSelect(chipSelect, chipOptions, 'Select a chip');

    // Populate quantization options
    populateSelect(quantizationSelect, quantizationOptions);

    // Populate mode options
    populateSelect(modeSelect, modeOptions);

    // Set default values for quantization and mode
    quantizationSelect.value = 'Q4_0';
    modeSelect.value = 'TG'; // Set Text Generation as default

    // Initially hide quantization and mode selects
    quantizationSelect.parentElement.style.display = 'none';
    modeSelect.parentElement.style.display = 'none';

    // Add event listeners for chip, quantization, and mode selection
    chipSelect.addEventListener('change', function() {
        if (this.value && this.value !== 'Select a chip') {
            quantizationSelect.parentElement.style.display = 'block';
            modeSelect.parentElement.style.display = 'block';
        } else {
            quantizationSelect.parentElement.style.display = 'none';
            modeSelect.parentElement.style.display = 'none';
        }
        hideNoDataMessage(); // Hide the message when chip selection changes
        updateBenchmarkDisplay();
    });
    quantizationSelect.addEventListener('change', function() {
        hideNoDataMessage(); // Hide the message when quantization changes
        updateBenchmarkResults();
    });
    modeSelect.addEventListener('change', function() {
        hideNoDataMessage(); // Hide the message when mode changes
        updateBenchmarkResults();
    });

    // Initialize speed display
    updateSpeedDisplay();

    // Call updateBenchmarkDisplay to set initial state
    updateBenchmarkDisplay();

    // Initialize other components
    updateSystemInfo();
    updateTooltip();
    updateSimulationInfo();
    initializeTooltips();
});

// Update the updateBenchmarkDisplay function
function updateBenchmarkDisplay() {
    const selectedChip = chipSelect.value;

    if (selectedChip && selectedChip !== 'Select a chip') {
        const benchmark = window.getBenchmarkForChip(selectedChip);
        if (benchmark) {
            document.getElementById('result-chip').textContent = selectedChip;
            document.getElementById('result-bw').textContent = `${benchmark.BW} GB/s`;
            document.getElementById('result-gpu').textContent = benchmark.GPUCores;

            updateBenchmarkResults();
            benchmarkResults.style.display = 'block';
        } else {
            console.error(`No benchmark data found for chip: ${selectedChip}`);
            benchmarkResults.style.display = 'none';
            quantizationSelect.parentElement.style.display = 'none';
            modeSelect.parentElement.style.display = 'none';
        }
    } else {
        benchmarkResults.style.display = 'none';
        quantizationSelect.parentElement.style.display = 'none';
        modeSelect.parentElement.style.display = 'none';
    }
}

// Update the updateBenchmarkResults function
function updateBenchmarkResults() {
    const selectedChip = chipSelect.value;
    const selectedQuantization = quantizationSelect.value;
    const selectedMode = modeSelect.value;

    const benchmark = window.getBenchmarkForChip(selectedChip);
    let tokensPerSecond = 0;
    let quantizationLabel = quantizationOptions.find(q => q.value === selectedQuantization).label;
    let modeLabel = modeOptions.find(m => m.value === selectedMode).label;

    if (selectedQuantization === 'F16') {
        tokensPerSecond = selectedMode === 'PP' ? benchmark.F16PP : benchmark.F16TG;
    } else if (selectedQuantization === 'Q8_0') {
        tokensPerSecond = selectedMode === 'PP' ? benchmark.Q8_0PP : benchmark.Q8_0TG;
    } else if (selectedQuantization === 'Q4_0') {
        tokensPerSecond = selectedMode === 'PP' ? benchmark.Q4_0PP : benchmark.Q4_0TG;
    }

    const resultTps = document.getElementById('result-tps');
    const resultQuantization = document.getElementById('result-quantization');
    const noDataMessage = document.getElementById('no-data-message');

    if (tokensPerSecond) {
        resultTps.textContent = `${tokensPerSecond.toFixed(2)} t/s`;
        resultQuantization.textContent = `${quantizationLabel} (${modeLabel})`;
        noDataMessage.style.display = 'none';
        speedNumber.value = Math.min(Math.round(tokensPerSecond), 32768);
        const sliderValue = Math.round((Math.log(speedNumber.value) - Math.log(1)) / (Math.log(32768) - Math.log(1)) * 100);
        speedInput.value = sliderValue;
    } else {
        resultTps.textContent = '0 t/s';
        resultQuantization.textContent = `${quantizationLabel} (${modeLabel})`;
        noDataMessage.textContent = `No data available for ${quantizationLabel} in ${modeLabel} mode for this chip.`;
        noDataMessage.style.display = 'block';
        speedNumber.value = 0;
        speedInput.value = 0;
    }
}

function logSlider(position) {
    const minp = 0;
    const maxp = 100;
    const minv = Math.log(1);
    const maxv = Math.log(32768);
    const scale = (maxv - minv) / (maxp - minp);
    return Math.round(Math.exp(minv + scale * (position - minp)));
}

function updateSpeedDisplay() {
    const tokensPerSecond = logSlider(speedInput.value);
    speedNumber.value = tokensPerSecond;
    
    // If a chip is selected, deselect it
    if (chipSelect.value !== '' && chipSelect.value !== 'Select a chip') {
        chipSelect.value = '';
        updateBenchmarkDisplay();
    }
    
    hideNoDataMessage(); // Hide the message when speed is manually changed
}

speedInput.addEventListener('input', updateSpeedDisplay);

speedNumber.addEventListener('input', () => {
    const value = parseInt(speedNumber.value);
    if (value >= 1 && value <= 32768) {
        const sliderValue = Math.round((Math.log(value) - Math.log(1)) / (Math.log(32768) - Math.log(1)) * 100);
        speedInput.value = sliderValue;
    }
});

function updateGenerationTime() {
    const tokensPerSecond = parseInt(speedNumber.value);
    const totalTokens = parseInt(tokenCountInput.value);
    const expectedTime = totalTokens / tokensPerSecond;
    const elapsedTime = (performance.now() - startTime) / 1000;
    document.getElementById('elapsed-time').textContent = elapsedTime.toFixed(3);
    document.getElementById('expected-time').textContent = expectedTime.toFixed(3);
}

function generateTokens(timestamp) {
    if (!startTime) {
        startTime = performance.now();
        intervalId = setInterval(updateGenerationTime, 10); // Update every 10ms
    }
    const elapsedTime = timestamp - startTime;
    const tokensPerSecond = parseInt(speedNumber.value);
    const totalTokens = parseInt(tokenCountInput.value);
    
    const expectedTokens = Math.min(
        Math.floor((elapsedTime / 1000) * tokensPerSecond),
        totalTokens
    );

    while (generatedTokens < expectedTokens) {
        const startIndex = (generatedTokens * 4) % sampleTextContent.length;
        let endIndex = startIndex + 4;
        let token;
        
        if (endIndex <= sampleTextContent.length) {
            token = sampleTextContent.slice(startIndex, endIndex);
        } else {
            const remainingChars = sampleTextContent.length - startIndex;
            token = sampleTextContent.slice(startIndex) + sampleTextContent.slice(0, 4 - remainingChars);
        }
        
        tokenDisplay.textContent += token;
        generatedTokens++;

        // Scroll to the bottom of the text area
        tokenDisplay.scrollTop = tokenDisplay.scrollHeight;
    }

    tokenCountSpan.textContent = `(${generatedTokens} tokens)`;

    if (generatedTokens < totalTokens) {
        animationFrameId = requestAnimationFrame(generateTokens);
    } else {
        stopGeneration();
    }
}

function startGeneration() {
    const totalTokens = parseInt(tokenCountInput.value);
    const tokensPerSecond = parseInt(speedNumber.value);

    if (totalTokens < 1 || totalTokens > 32768) {
        alert('Please enter a number of tokens between 1 and 32,768');
        return;
    }

    if (tokensPerSecond < 1 || tokensPerSecond > 32768) {
        alert('Please enter a speed between 1 and 32,768 tokens/s');
        return;
    }

    tokenDisplay.textContent = '';
    tokenCountSpan.textContent = '(0 tokens)';
    document.getElementById('elapsed-time').textContent = '0.000';
    document.getElementById('expected-time').textContent = '0.000';
    startTime = null;
    generatedTokens = 0;
    isGenerating = true;

    startBtn.disabled = true;
    stopBtn.disabled = false;
    speedInput.disabled = true;
    speedNumber.disabled = true;
    tokenCountInput.disabled = true;

    hideNoDataMessage(); // Hide the message when generation starts

    animationFrameId = requestAnimationFrame(generateTokens);
}

startBtn.addEventListener('click', startGeneration);

function stopGeneration() {
    isGenerating = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    speedInput.disabled = false;
    speedNumber.disabled = false;
    tokenCountInput.disabled = false;
    cancelAnimationFrame(animationFrameId);
    clearInterval(intervalId);
    updateGenerationTime(); // Final update of the generation time
}

function resetDisplay() {
    tokenDisplay.textContent = '';
    tokenCountSpan.textContent = '(0 tokens)';
    document.getElementById('elapsed-time').textContent = '0.000';
    document.getElementById('expected-time').textContent = '0.000';
    generatedTokens = 0;
    cancelAnimationFrame(animationFrameId);
    clearInterval(intervalId);
    startTime = null;
    hideNoDataMessage(); // Hide the message when display is reset
    
    // Reset chip, quantization, and mode selects
    chipSelect.value = '';
    quantizationSelect.value = 'Q4_0';
    modeSelect.value = 'TG';
    updateBenchmarkDisplay(); // This will hide quantization and mode selects
}

stopBtn.addEventListener('click', stopGeneration);
resetBtn.addEventListener('click', resetDisplay);

// Initialize speed display
updateSpeedDisplay();

function updateSystemInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const cores = navigator.hardwareConcurrency || 'Unknown';
    
    systemInfo.textContent = `Browser: ${userAgent} | Platform: ${platform} | CPU Cores: ${cores}`;
}

function updateTooltip() {
    const tooltipText = `
        <strong>Elapsed Time:</strong> The real time taken by your device to generate the tokens. This may vary based on your system's performance and current load.<br><br>
        <strong>Expected Time:</strong> The expected time calculated by dividing the number of tokens by the tokens per second rate. This represents ideal performance without system limitations.<br><br>
        <strong>Note:</strong> Differences between elapsed and expected times can be due to various factors such as CPU speed, background processes, and browser performance. This simulator is for demonstration purposes and may not reflect real-world language model performance.
    `;
    const tooltip = document.querySelector('[data-bs-toggle="tooltip"]');
    tooltip.setAttribute('data-bs-title', tooltipText);
}

function updateSimulationInfo() {
    const simulationInfo = document.getElementById('simulation-info');
    const infoText = `
        <h4>About This Simulation</h4>
        <p>This is a simulation of token generation, designed to demonstrate the concept of tokens per second in language models. Here's what's happening:</p>
        <ul>
            <li><strong>Token Generation:</strong> We're simulating the generation of tokens, where each token is approximately 4 characters of text.</li>
            <li><strong>Expected Time:</strong> Calculated as (Total Tokens) / (Tokens per Second). This is the ideal time if token generation was instantaneous.</li>
            <li><strong>Elapsed Time:</strong> Measured using the browser's performance API. This includes the time taken to generate tokens and update the display.</li>
            <li><strong>Differences in Times:</strong> The elapsed time may be longer due to factors like:
                <ul>
                    <li>JavaScript execution speed</li>
                    <li>DOM update performance</li>
                    <li>Your device's current load and capabilities</li>
                </ul>
            </li>
            <li><strong>Not a Real Language Model:</strong> This simulation uses pre-defined text and doesn't perform actual language model computations. Real language models would have different performance characteristics.</li>
        </ul>
        <p>This simulator is meant for educational purposes to help visualize token generation speeds. It's not indicative of real-world language model performance, which involves complex computations and can vary greatly based on model size and hardware.</p>
    `;
    simulationInfo.innerHTML = infoText;
}

function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Make sure sampleTextContent is defined
if (typeof sampleTextContent === 'undefined') {
    console.error('sampleTextContent is not defined. Make sure text.js is loaded properly.');
    sampleTextContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '; // Fallback text
}

// Add this function to hide the no-data message
function hideNoDataMessage() {
    const noDataMessage = document.getElementById('no-data-message');
    noDataMessage.style.display = 'none';
}