// Calculator JavaScript - Comprehensive Math Solver Tool

// Mode Selection
document.addEventListener('DOMContentLoaded', function() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const calculatorSections = document.querySelectorAll('.calculator-section');

    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            // Update active button
            modeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding calculator section
            calculatorSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === mode + '-calculator') {
                    section.classList.add('active');
                }
            });
        });
    });

    // Initialize mobile menu
    initializeMobileMenu();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.nav__mobile-toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('nav__menu--active');
        });
    }
}

// Basic Calculator Functions
let basicDisplay = document.getElementById('basic-display');
let basicExpression = '';

function appendToDisplay(calculator, value) {
    if (calculator === 'basic') {
        basicExpression += value;
        basicDisplay.value = basicExpression;
    }
}

function clearDisplay(calculator) {
    if (calculator === 'basic') {
        basicExpression = '';
        basicDisplay.value = '';
    }
}

function deleteLast(calculator) {
    if (calculator === 'basic') {
        basicExpression = basicExpression.slice(0, -1);
        basicDisplay.value = basicExpression;
    }
}

function calculateBasic() {
    try {
        const result = eval(basicExpression);
        basicDisplay.value = result;
        basicExpression = result.toString();
    } catch (error) {
        basicDisplay.value = 'Error';
        basicExpression = '';
    }
}

// Algebra Solver Functions
function solveEquation() {
    const equation = document.getElementById('equation-input').value;
    const resultDiv = document.getElementById('equation-result');
    
    if (!equation) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលសមីការជាមុន</div>';
        return;
    }

    try {
        // Simple linear equation solver: ax + b = c
        const equationRegex = /([+-]?\d*)\s*x\s*([+-]?\d+)\s*=\s*([+-]?\d+)/;
        const match = equation.match(equationRegex);
        
        if (match) {
            const a = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseInt(match[1]);
            const b = parseInt(match[2]);
            const c = parseInt(match[3]);
            
            const x = (c - b) / a;
            resultDiv.innerHTML = `
                <div class="success">
                    <strong>ដំណោះស្រាយ:</strong><br>
                    x = ${x.toFixed(3)}<br>
                    <small>សមីការ: ${equation}</small>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<div class="error">មិនអាចដោះស្រាយសមីការនេះបានទេ។ សូមប្រើទម្រង់: ax + b = c</div>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មានបញ្ហាក្នុងការដោះស្រាយសមីការ។</div>';
    }
}

function factorPolynomial() {
    const polynomial = document.getElementById('polynomial-input').value;
    const resultDiv = document.getElementById('polynomial-result');
    
    if (!polynomial) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលពហុធាជាមុន</div>';
        return;
    }

    try {
        // Simple quadratic factoring: ax² + bx + c
        const quadraticRegex = /([+-]?\d*)\s*x\^2\s*([+-]?\d*)\s*x\s*([+-]?\d+)/;
        const match = polynomial.match(quadraticRegex);
        
        if (match) {
            const a = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseInt(match[1]);
            const b = match[2] === '' || match[2] === '+' ? 1 : match[2] === '-' ? -1 : parseInt(match[2]);
            const c = parseInt(match[3]);
            
            const discriminant = b * b - 4 * a * c;
            
            if (discriminant >= 0) {
                const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                
                resultDiv.innerHTML = `
                    <div class="success">
                        <strong>កត្តានៃពហុធា:</strong><br>
                        ឫស: x₁ = ${x1.toFixed(3)}, x₂ = ${x2.toFixed(3)}<br>
                        <small>ពហុធា: ${polynomial}</small>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="success">
                        <strong>ពហុធានេះមិនមានឫសពិតទេ:</strong><br>
                        ដំណោះស្រាយស្មុគស្មាញ: ឫសកុំផ្លិច<br>
                        <small>ពហុធា: ${polynomial}</small>
                    </div>
                `;
            }
        } else {
            resultDiv.innerHTML = '<div class="error">មិនអាចរកកត្តាពហុធានេះបានទេ។ សូមប្រើទម្រង់: ax² + bx + c</div>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មានបញ្ហាក្នុងការរកកត្តាពហុធា។</div>';
    }
}

// Geometry Calculator Functions
function calculateCircle() {
    const radius = parseFloat(document.getElementById('circle-radius').value);
    const resultDiv = document.getElementById('circle-result');
    
    if (isNaN(radius) || radius <= 0) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលកាំរង្វង់ដែលត្រឹមត្រូវ</div>';
        return;
    }

    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    
    resultDiv.innerHTML = `
        <div class="success">
            <strong>លទ្ធផលរង្វង់:</strong><br>
            កាំ (r): ${radius}<br>
            ផ្ទៃក្រឡា: ${area.toFixed(3)}<br>
            បរិមាត្រ: ${circumference.toFixed(3)}
        </div>
    `;
}

function calculateTriangle() {
    const base = parseFloat(document.getElementById('triangle-base').value);
    const height = parseFloat(document.getElementById('triangle-height').value);
    const resultDiv = document.getElementById('triangle-result');
    
    if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលមូលដ្ឋាន និងកម្ពស់ដែលត្រឹមត្រូវ</div>';
        return;
    }

    const area = 0.5 * base * height;
    
    resultDiv.innerHTML = `
        <div class="success">
            <strong>លទ្ធផលត្រីកោណ:</strong><br>
            មូលដ្ឋាន (b): ${base}<br>
            កម្ពស់ (h): ${height}<br>
            ផ្ទៃក្រឡា: ${area.toFixed(3)}
        </div>
    `;
}

function calculateRectangle() {
    const length = parseFloat(document.getElementById('rectangle-length').value);
    const width = parseFloat(document.getElementById('rectangle-width').value);
    const resultDiv = document.getElementById('rectangle-result');
    
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលប្រវែង និងទទឹងដែលត្រឹមត្រូវ</div>';
        return;
    }

    const area = length * width;
    const perimeter = 2 * (length + width);
    
    resultDiv.innerHTML = `
        <div class="success">
            <strong>លទ្ធផលចតុកោណកែង:</strong><br>
            ប្រវែង (l): ${length}<br>
            ទទឹង (w): ${width}<br>
            ផ្ទៃក្រឡា: ${area.toFixed(3)}<br>
            បរិមាត្រ: ${perimeter.toFixed(3)}
        </div>
    `;
}

// Trigonometry Calculator Functions
function calculateTrigBasic() {
    const angle = parseFloat(document.getElementById('trig-angle').value);
    const resultDiv = document.getElementById('trig-basic-result');
    
    if (isNaN(angle)) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលមុំដែលត្រឹមត្រូវ</div>';
        return;
    }

    const radians = angle * Math.PI / 180;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const tan = Math.tan(radians);
    
    resultDiv.innerHTML = `
        <div class="success">
            <strong>ត្រីកោណមាត្រមូលដ្ឋាន:</strong><br>
            មុំ: ${angle}°<br>
            sin(${angle}°) = ${sin.toFixed(4)}<br>
            cos(${angle}°) = ${cos.toFixed(4)}<br>
            tan(${angle}°) = ${tan.toFixed(4)}
        </div>
    `;
}

function applyLawOfSines() {
    const sidesInput = document.getElementById('law-sides').value;
    const anglesInput = document.getElementById('law-angles').value;
    const resultDiv = document.getElementById('law-sines-result');
    
    if (!sidesInput || !anglesInput) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលជ្រុង និងមុំ</div>';
        return;
    }

    try {
        const sides = sidesInput.split(',').map(s => parseFloat(s.trim()));
        const angles = anglesInput.split(',').map(a => parseFloat(a.trim()));
        
        if (sides.length !== 3 || angles.length !== 3 || sides.some(isNaN) || angles.some(isNaN)) {
            resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលជ្រុង 3 និងមុំ 3 ដោយបំបែកជាមួយក្បៀស</div>';
            return;
        }

        // Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)
        const ratio = sides[0] / Math.sin(angles[0] * Math.PI / 180);
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>ច្បាប់ស៊ីនុស:</strong><br>
                សមាមាត្រ: ${ratio.toFixed(4)}<br>
                a/sin(A) = b/sin(B) = c/sin(C)<br>
                <small>ជ្រុង: ${sides.join(', ')}, មុំ: ${angles.join('°, ')}°</small>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មានបញ្ហាក្នុងការគណនាច្បាប់ស៊ីនុស។</div>';
    }
}

// Calculus Calculator Functions
function calculateDerivative() {
    const functionInput = document.getElementById('derivative-input').value;
    const resultDiv = document.getElementById('derivative-result');
    
    if (!functionInput) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលអនុគមន៍</div>';
        return;
    }

    try {
        // Simple derivative calculator for basic functions
        let derivative = '';
        
        // Power rule: x^n -> n*x^(n-1)
        if (functionInput.includes('x^')) {
            const powerRegex = /([+-]?\d*)\s*\*\s*x\^(\d+)/g;
            derivative = functionInput.replace(powerRegex, (match, coeff, power) => {
                const c = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseInt(coeff);
                const p = parseInt(power);
                const newCoeff = c * p;
                const newPower = p - 1;
                
                if (newPower === 0) return newCoeff.toString();
                if (newPower === 1) return newCoeff + 'x';
                return newCoeff + 'x^' + newPower;
            });
        } else if (functionInput.includes('x')) {
            // Linear function: ax + b -> a
            const linearRegex = /([+-]?\d*)\s*x/;
            const match = functionInput.match(linearRegex);
            if (match) {
                const coeff = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseInt(match[1]);
                derivative = coeff.toString();
            }
        } else {
            derivative = '0';
        }
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>ដេរីវេ:</strong><br>
                f(x) = ${functionInput}<br>
                f'(x) = ${derivative}
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មិនអាចគណនាដេរីវេបានទេ។ សូមព្យាយាមជាមួយអនុគមន៍ធម្មតា។</div>';
    }
}

function calculateIntegral() {
    const functionInput = document.getElementById('integral-input').value;
    const resultDiv = document.getElementById('integral-result');
    
    if (!functionInput) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលអនុគមន៍</div>';
        return;
    }

    try {
        // Simple integral calculator for basic functions
        let integral = '';
        
        // Power rule: x^n -> x^(n+1)/(n+1)
        if (functionInput.includes('x^')) {
            const powerRegex = /([+-]?\d*)\s*\*\s*x\^(\d+)/g;
            integral = functionInput.replace(powerRegex, (match, coeff, power) => {
                const c = coeff === '' || coeff === '+' ? 1 : coeff === '-' ? -1 : parseInt(coeff);
                const p = parseInt(power);
                const newPower = p + 1;
                const newCoeff = c / newPower;
                
                if (newCoeff === 1) return 'x^' + newPower;
                if (newCoeff === -1) return '-x^' + newPower;
                return newCoeff + 'x^' + newPower;
            });
        } else if (functionInput.includes('x')) {
            // Linear function: ax -> (a/2)x^2
            const linearRegex = /([+-]?\d*)\s*x/;
            const match = functionInput.match(linearRegex);
            if (match) {
                const coeff = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseInt(match[1]);
                const newCoeff = coeff / 2;
                integral = newCoeff + 'x^2';
            }
        } else {
            // Constant: c -> cx
            const constant = parseFloat(functionInput);
            if (!isNaN(constant)) {
                integral = constant + 'x';
            }
        }
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>អាំងតេក្រាល់:</strong><br>
                f(x) = ${functionInput}<br>
                ∫f(x)dx = ${integral} + C
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មិនអាចគណនាអាំងតេក្រាល់បានទេ។ សូមព្យាយាមជាមួយអនុគមន៍ធម្មតា។</div>';
    }
}

// Statistics Calculator Functions
function calculateStatistics() {
    const input = document.getElementById('stats-input').value;
    const resultDiv = document.getElementById('stats-result');
    
    if (!input) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលបណ្តុំលេខ</div>';
        return;
    }

    try {
        const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        
        if (numbers.length === 0) {
            resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលលេខដែលត្រឹមត្រូវ</div>';
            return;
        }

        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        
        // Sort for median
        const sorted = numbers.slice().sort((a, b) => a - b);
        const median = sorted.length % 2 === 0 
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];
        
        // Mode
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        
        const maxFrequency = Math.max(...Object.values(frequency));
        const modes = Object.keys(frequency).filter(key => frequency[key] === maxFrequency);
        
        // Standard deviation
        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
        const stdDev = Math.sqrt(variance);
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>ស្ថិតិមូលដ្ឋាន:</strong><br>
                ចំនួនធាតុ: ${numbers.length}<br>
                ផលបូក: ${sum.toFixed(3)}<br>
            មធ្យម: ${mean.toFixed(3)}<br>
                មេដ្យាន: ${median.toFixed(3)}<br>
                របៀប: ${modes.length === numbers.length ? 'គ្មាន' : modes.join(', ')}<br>
                គម្លាតគំរូ: ${stdDev.toFixed(3)}
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មានបញ្ហាក្នុងការគណនាស្ថិតិ។</div>';
    }
}

function calculateProbability() {
    const success = parseFloat(document.getElementById('prob-success').value);
    const trials = parseInt(document.getElementById('prob-trials').value);
    const resultDiv = document.getElementById('prob-result');
    
    if (isNaN(success) || isNaN(trials) || success < 0 || success > 1 || trials <= 0) {
        resultDiv.innerHTML = '<div class="error">សូមបញ្ចូលតម្លៃប្រូបាបលីតេដែលត្រឹមត្រូវ</div>';
        return;
    }

    try {
        const failure = 1 - success;
        
        // Expected value and variance
        const expectedValue = trials * success;
        const variance = trials * success * failure;
        const stdDev = Math.sqrt(variance);
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>ប្រូបាបលីតេទ្រីនូមី:</strong><br>
                លទ្ធផលជោគជ័យ (p): ${success}<br>
                លទ្ធផលបរាជ័យ (q): ${failure.toFixed(3)}<br>
                ចំនួនព្យាករណ៍ (n): ${trials}<br>
                តម្លៃរំពឹង: ${expectedValue.toFixed(3)}<br>
                វ៉ារ្យ៉ង់: ${variance.toFixed(3)}<br>
                គម្លាតគំរូ: ${stdDev.toFixed(3)}
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="error">មានបញ្ហាក្នុងការគណនាប្រូបាបលីតេ។</div>';
    }
}

// Keyboard Support for Basic Calculator
document.addEventListener('keydown', function(event) {
    const activeSection = document.querySelector('.calculator-section.active');
    
    if (activeSection && activeSection.id === 'basic-calculator') {
        const key = event.key;
        
        if (key >= '0' && key <= '9') {
            appendToDisplay('basic', key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendToDisplay('basic', key);
        } else if (key === '.') {
            appendToDisplay('basic', '.');
        } else if (key === '(') {
            appendToDisplay('basic', '(');
        } else if (key === ')') {
            appendToDisplay('basic', ')');
        } else if (key === 'Enter' || key === '=') {
            calculateBasic();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            clearDisplay('basic');
        } else if (key === 'Backspace') {
            deleteLast('basic');
        }
    }
});

// Input validation for number fields
document.addEventListener('input', function(event) {
    if (event.target.type === 'number') {
        const value = parseFloat(event.target.value);
        if (event.target.hasAttribute('min') && value < parseFloat(event.target.getAttribute('min'))) {
            event.target.value = event.target.getAttribute('min');
        }
        if (event.target.hasAttribute('max') && value > parseFloat(event.target.getAttribute('max'))) {
            event.target.value = event.target.getAttribute('max');
        }
    }
});

// Utility function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('km-KH').format(num);
}

// Utility function to show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div> កំពុងគណនា...';
}

// Utility function to clear results
function clearResults() {
    const resultElements = document.querySelectorAll('.result-display');
    resultElements.forEach(element => {
        element.innerHTML = '';
    });
}

// Initialize tooltips and help text
function initializeHelp() {
    const helpTexts = {
        'equation-input': 'ឧទាហរណ៍: 2x + 5 = 15, 3x - 7 = 8',
        'polynomial-input': 'ឧទាហរណ៍: x^2 - 5x + 6, 2x^2 + 7x + 3',
        'circle-radius': 'បញ្ចូលកាំរង្វង់ជាលេខវិជ្ជមាន',
        'triangle-base': 'បញ្ចូលប្រវែងមូលដ្ឋានត្រីកោណ',
        'triangle-height': 'បញ្ចូលកម្ពស់ត្រីកោណ',
        'rectangle-length': 'បញ្ចូលប្រវែងចតុកោណកែង',
        'rectangle-width': 'បញ្ចូលទទឹងចតុកោណកែង',
        'trig-angle': 'បញ្ចូលមុំក្នុងឯកតាអង្សារ',
        'law-sides': 'បញ្ចូលជ្រុងបីដោយបំបែកជាមួយក្បៀស',
        'law-angles': 'បញ្ចូលមុំបីដោយបំបែកជាមួយក្បៀស',
        'derivative-input': 'ឧទាហរណ៍: x^2 + 3x - 2, 2x^3 - 5x',
        'integral-input': 'ឧទាហរណ៍: x^2 + 3x - 2, 2x^3 - 5x',
        'stats-input': 'បញ្ចូលលេខច្រើនដោយបំបែកជាមួយក្បៀស',
        'prob-success': 'បញ្ចូលប្រូបាបលីតេរវាង 0 និង 1',
        'prob-trials': 'បញ្ចូលចំនួនព្យាករណ៍ជាចំនួនគត់វិជ្ជមាន'
    };

    Object.keys(helpTexts).forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.setAttribute('title', helpTexts[inputId]);
            input.setAttribute('placeholder', helpTexts[inputId]);
        }
    });
}

// Initialize help tooltips on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeHelp();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateBasic,
        solveEquation,
        factorPolynomial,
        calculateCircle,
        calculateTriangle,
        calculateRectangle,
        calculateTrigBasic,
        applyLawOfSines,
        calculateDerivative,
        calculateIntegral,
        calculateStatistics,
        calculateProbability
    };
}
