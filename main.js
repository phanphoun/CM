        // Authentication System
        class AuthManager {
            constructor() {
                this.currentUser = this.getCurrentUser();
                this.initAuthListeners();
            }
            
            getCurrentUser() {
                const user = localStorage.getItem('currentUser');
                return user ? JSON.parse(user) : null;
            }
            
            isLoggedIn() {
                return this.currentUser !== null;
            }
            
            requireAuth(callback, fallbackUrl = '#login') {
                if (this.isLoggedIn()) {
                    callback();
                } else {
                    this.showLoginPrompt(fallbackUrl);
                }
            }
            
            showLoginPrompt(fallbackUrl = '#login') {
                // Create modal overlay
                const modal = document.createElement('div');
                modal.className = 'auth-modal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                `;
                
                // Create modal content
                const content = document.createElement('div');
                content.className = 'auth-modal__content';
                content.style.cssText = `
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                `;
                
                content.innerHTML = `
                    <h3 style="margin: 0 0 1rem 0; color: var(--color-primary);">តម្រូវឱ្យមានគណនី</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--color-text); line-height: 1.6;">
                        ដើម្បីចូលប្រើលំហាត់ និងធ្វើតេស្ត អ្នកត្រូវការចុះឈ្មោះគណនីជាមុនសិន។
                        សូមចុះឈ្មោះ ឬចូលប្រើដើម្បីបន្ត។
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn btn--primary" onclick="authManager.closeModal(); window.location.href='${fallbackUrl}'">ចូលប្រើ</button>
                        <button class="btn btn--outline" onclick="authManager.closeModal()">បោះបង់</button>
                    </div>
                `;
                
                modal.appendChild(content);
                document.body.appendChild(modal);
                
                // Close modal when clicking outside
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal();
                    }
                });
                
                this.currentModal = modal;
            }
            
            closeModal() {
                if (this.currentModal) {
                    this.currentModal.remove();
                    this.currentModal = null;
                }
            }
            
            initAuthListeners() {
                // Handle login form
                const loginForm = document.querySelector('#login-form');
                if (loginForm) {
                    loginForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleLogin(loginForm);
                    });
                }
                
                // Handle register form
                const registerForm = document.querySelector('#register-form');
                if (registerForm) {
                    registerForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleRegister(registerForm);
                    });
                }
                
                // Handle logout
                const logoutBtn = document.querySelector('#logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', () => {
                        this.handleLogout();
                    });
                }
            }
            
            handleLogin(form) {
                const email = form.querySelector('#email').value;
                const password = form.querySelector('#password').value;
                
                // Simulate login (in real app, this would be an API call)
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    this.currentUser = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.updateAuthUI();
                    this.showSuccessMessage('ចូលប្រើបានជោគជ័យ!');
                    form.reset();
                } else {
                    this.showErrorMessage('អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!');
                }
            }
            
            handleRegister(form) {
                const name = form.querySelector('#name').value;
                const email = form.querySelector('#email').value;
                const password = form.querySelector('#password').value;
                const confirmPassword = form.querySelector('#confirm-password').value;
                
                if (password !== confirmPassword) {
                    this.showErrorMessage('ពាក្យសម្ងាត់មិនត្រូវគ្នា!');
                    return;
                }
                
                // Simulate registration (in real app, this would be an API call)
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                if (users.find(u => u.email === email)) {
                    this.showErrorMessage('អ៊ីមែលនេះត្រូវបានប្រើរួចហើយ!');
                    return;
                }
                
                const newUser = {
                    id: Date.now(),
                    name,
                    email,
                    password, // In real app, this would be hashed
                    createdAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                this.currentUser = newUser;
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                this.updateAuthUI();
                this.showSuccessMessage('ចុះឈ្មោះបានជោគជ័យ!');
                form.reset();
            }
            
            handleLogout() {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                this.updateAuthUI();
                this.showSuccessMessage('ចាកចេញបានជោគជ័យ!');
            }
            
            updateAuthUI() {
                const authButtons = document.querySelector('.nav__auth');
                if (!authButtons) return;
                
                if (this.isLoggedIn()) {
                    authButtons.innerHTML = `
                        <span style="margin-right: 1rem; color: var(--color-text);">សួស្តី, ${this.currentUser.name}</span>
                        <button id="logout-btn" class="btn btn--outline">ចាកចេញ</button>
                    `;
                    
                    // Re-attach logout listener
                    document.querySelector('#logout-btn').addEventListener('click', () => {
                        this.handleLogout();
                    });
                } else {
                    authButtons.innerHTML = `
                        <a href="#login" class="btn btn--outline" role="button">ចូលប្រើ</a>
                        <a href="#register" class="btn btn--primary" role="button">ចុះឈ្មោះ</a>
                    `;
                }
            }
            
            showSuccessMessage(message) {
                this.showMessage(message, 'success');
            }
            
            showErrorMessage(message) {
                this.showMessage(message, 'error');
            }
            
            showMessage(message, type) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `auth-message auth-message--${type}`;
                messageDiv.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    z-index: 1001;
                    animation: slideIn 0.3s ease;
                    background: ${type === 'success' ? 'var(--color-accent)' : 'var(--color-error)'};
                `;
                messageDiv.textContent = message;
                
                document.body.appendChild(messageDiv);
                
                setTimeout(() => {
                    messageDiv.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => messageDiv.remove(), 300);
                }, 3000);
            }
        }

        // Initialize auth manager
        const authManager = new AuthManager();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Chatbot functionality
        class ChatBot {
            constructor() {
                this.chatbot = document.getElementById('chatbot');
                this.toggle = document.getElementById('chatbot-toggle');
                this.close = document.getElementById('chatbot-close');
                this.input = document.getElementById('chatbot-input');
                this.send = document.getElementById('chatbot-send');
                this.messages = document.getElementById('chatbot-messages');
                this.isOpen = false;
                
                this.initEventListeners();
            }
            
            initEventListeners() {
                this.toggle.addEventListener('click', () => this.toggleChat());
                this.close.addEventListener('click', () => this.closeChat());
                this.send.addEventListener('click', () => this.sendMessage());
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });
            }
            
            toggleChat() {
                this.isOpen = !this.isOpen;
                this.chatbot.classList.toggle('chatbot--active', this.isOpen);
                this.toggle.setAttribute('aria-expanded', this.isOpen);
                this.chatbot.setAttribute('aria-hidden', !this.isOpen);
                
                if (this.isOpen) {
                    this.input.focus();
                }
            }
            
            closeChat() {
                this.isOpen = false;
                this.chatbot.classList.remove('chatbot--active');
                this.toggle.setAttribute('aria-expanded', false);
                this.chatbot.setAttribute('aria-hidden', true);
            }
            
            sendMessage() {
                const message = this.input.value.trim();
                if (!message) return;
                
                // Add user message
                this.addMessage(message, 'user');
                this.input.value = '';
                
                // Show typing indicator
                this.showTypingIndicator();
                
                // Simulate API call (replace with actual OpenAI API call)
                this.simulateAPIResponse(message);
            }
            
            addMessage(message, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `chatbot__message chatbot__message--${sender}`;
                messageDiv.textContent = message;
                
                this.messages.appendChild(messageDiv);
                this.messages.scrollTop = this.messages.scrollHeight;
            }
            
            showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'chatbot__message chatbot__message--bot';
                typingDiv.innerHTML = '<div class="loading"></div>';
                typingDiv.id = 'typing-indicator';
                
                this.messages.appendChild(typingDiv);
                this.messages.scrollTop = this.messages.scrollHeight;
            }
            
            removeTypingIndicator() {
                const indicator = document.getElementById('typing-indicator');
                if (indicator) {
                    indicator.remove();
                }
            }
            
            simulateAPIResponse(userMessage) {
                // Simulate API delay
                setTimeout(() => {
                    this.removeTypingIndicator();
                    
                    // Simple response logic (replace with actual OpenAI API call)
                    let response = this.generateResponse(userMessage);
                    this.addMessage(response, 'bot');
                }, 1500);
            }
            
            generateResponse(message) {
                // Simple rule-based responses (replace with OpenAI API)
                const responses = {
                    'សមីការ': 'សមីការគឺជាសេចក្តីថ្លែងមួយដែលបង្ហាញថាតម្លៃពីរសមគ្នា។ តើអ្នកត្រូវការជំនួយលើសមីការណាមួយ?',
                    'ពហុធា': 'ពហុធាគឺជាកន្សោមនៃបណ្តាអថេរ ថេរលេខ និងឃោស។ តើអ្នកចង់រៀនពីការបូកដក ការគុណ ឬការចែកពហុធា?',
                    'ត្រីកោណមិតិ': 'ត្រីកោណមិតិសិក្សាពីទំនាក់ទំនងរវាងមុំ និងចំហៀងនៅក្នុងត្រីកោណ។ តើអ្នកត្រូវការជំនួយលើ sin, cos, ឬ tan?',
                    'default': 'ខ្ញុំយល់ហើយ។ តើអ្នកអាចសួរជាក់លាក់បន្តិចទៀតបានទេ? ឧទាហរណ៍ អំពីសមីការ ពហុធា ឬរូបធរណីមាត្រ?'
                };
                
                // Check for keywords
                for (let keyword in responses) {
                    if (message.includes(keyword) && keyword !== 'default') {
                        return responses[keyword];
                    }
                }
                
                return responses.default;
            }
            
            // Method to integrate with actual OpenAI API
            async callOpenAI(message) {
                try {
                    // Replace with your actual OpenAI API key and endpoint
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer YOUR_API_KEY_HERE'
                        },
                        body: JSON.stringify({
                            model: 'gpt-3.5-turbo',
                            messages: [
                                {
                                    role: 'system', 
                                    content: 'You are a helpful mathematics tutor for Khmer students. Answer in Khmer language and explain concepts clearly.'
                                },
                                {
                                    role: 'user', 
                                    content: message
                                }
                            ],
                            max_tokens: 150
                        })
                    });
                    
                    const data = await response.json();
                    return data.choices[0].message.content;
                    
                } catch (error) {
                    console.error('OpenAI API Error:', error);
                    return 'សូមអភ័យទោស មានបញ្ហាបច្ចេកទេស។ សូមព្យាយាមម្តងទៀត។';
                }
            }
        }

        // Study Tips Carousel
        class Carousel {
            constructor(element) {
                this.carousel = element;
                this.content = element.querySelector('.carousel__content');
                this.slides = element.querySelectorAll('.carousel__slide');
                this.dots = element.querySelectorAll('.carousel__dot');
                this.currentSlide = 0;
                this.totalSlides = this.slides.length;
                
                this.initEventListeners();
                this.autoPlay();
            }
            
            initEventListeners() {
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
            }
            
            goToSlide(index) {
                this.currentSlide = index;
                this.content.style.transform = `translateX(-${index * 100}%)`;
                
                // Update dots
                this.dots.forEach((dot, i) => {
                    dot.classList.toggle('carousel__dot--active', i === index);
                });
            }
            
            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(this.currentSlide);
            }
            
            autoPlay() {
                setInterval(() => {
                    this.nextSlide();
                }, 5000); // Change slide every 5 seconds
            }
        }

        // Quiz functionality
        class QuizManager {
            constructor() {
                this.submitButton = document.getElementById('submit-quiz');
                this.questions = document.querySelectorAll('.quiz__question');
                
                this.initEventListeners();
            }
            
            initEventListeners() {
                if (this.submitButton) {
                    this.submitButton.addEventListener('click', () => this.submitQuiz());
                }
            }
            
            submitQuiz() {
                const answers = this.getAnswers();
                const score = this.calculateScore(answers);
                this.displayResults(score);
            }
            

            getAnswers() {
                const answers = {};
                this.questions.forEach((question, index) => {
                    const selectedOption = question.querySelector('input[type="radio"]:checked');
                    if (selectedOption) {
                        answers[`q${index + 1}`] = selectedOption.value;
                    }
                });
                return answers;
            }
            
            calculateScore(answers) {
                // Correct answers (you can modify these)
                const correctAnswers = {
                    'q1': '5',  // 2x + 5 = 15, so x = 5
                    'q2': '64'  // 8² = 64
                };
                
                let score = 0;
                Object.keys(correctAnswers).forEach(key => {
                    if (answers[key] === correctAnswers[key]) {
                        score++;
                    }
                });
                
                return {
                    correct: score,
                    total: Object.keys(correctAnswers).length,
                    percentage: Math.round((score / Object.keys(correctAnswers).length) * 100)
                };
            }
            
            displayResults(score) {
                const resultMessage = `អ្នកទទួលបាន ${score.correct}/${score.total} (${score.percentage}%)`;
                
                // Create result display
                const resultDiv = document.createElement('div');
                resultDiv.className = 'quiz-result';
                resultDiv.style.cssText = `
                    background-color: var(--color-accent);
                    color: white;
                    padding: var(--spacing-lg);
                    border-radius: 8px;
                    margin-top: var(--spacing-lg);
                    text-align: center;
                    font-weight: bold;
                `;
                resultDiv.textContent = resultMessage;
                
                // Add result after submit button
                this.submitButton.parentNode.appendChild(resultDiv);
                
                // Disable submit button
                this.submitButton.disabled = true;
                this.submitButton.textContent = 'បានដាក់ស្នើរ';
                
                // Update progress (simulate)
                this.updateProgress(score.percentage);
            }
            
            updateProgress(percentage) {
                // Simulate progress update
                console.log(`Progress updated: ${percentage}%`);
            }
        }

        // Mobile Menu Toggle
        class MobileMenu {
            constructor() {
                this.menuToggle = document.querySelector('.nav__mobile-toggle');
                this.navMenu = document.querySelector('.nav__menu');
                this.isOpen = false;
                
                if (this.menuToggle && this.navMenu) {
                    this.initEventListeners();
                }
            }
            
            initEventListeners() {
                this.menuToggle.addEventListener('click', () => this.toggleMenu());
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                        this.closeMenu();
                    }
                });
                
                // Close menu when clicking on a link
                this.navMenu.querySelectorAll('.nav__link').forEach(link => {
                    link.addEventListener('click', () => this.closeMenu());
                });
            }
            
            toggleMenu() {
                this.isOpen = !this.isOpen;
                this.navMenu.classList.toggle('active', this.isOpen);
                this.menuToggle.setAttribute('aria-expanded', this.isOpen);
                this.menuToggle.textContent = this.isOpen ? '✕' : '☰';
            }
            
            closeMenu() {
                this.isOpen = false;
                this.navMenu.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', false);
                this.menuToggle.textContent = '☰';
            }
        }

        // Initialize all components when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize auth manager and update UI
            authManager.updateAuthUI();
            
            // Initialize chatbot
            new ChatBot();
            
            // Initialize carousel
            const carouselElement = document.getElementById('tips-carousel');
            if (carouselElement) {
                new Carousel(carouselElement);
            }
            
            // Initialize quiz
            new QuizManager();
            
            // Initialize mobile menu
            new MobileMenu();
            
            // Handle active navigation states
            function updateActiveNavigation() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100; // Account for fixed header
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
            
            // Update navigation on scroll
            window.addEventListener('scroll', updateActiveNavigation);
            
            // Handle form submissions
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simulate form submission
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<div class="loading"></div>';
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.style.cssText = `
                            background-color: var(--color-accent);
                            color: white;
                            padding: var(--spacing-md);
                            border-radius: 8px;
                            margin-top: var(--spacing-md);
                            text-align: center;
                        `;
                        successMsg.textContent = 'ការដាក់ស្នើបានជោគជ័យ!';
                        
                        form.appendChild(successMsg);
                        
                        setTimeout(() => {
                            successMsg.remove();
                        }, 3000);
                    }, 2000);
                });
            });
        });

        // Service Worker for offline capabilities (optional)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }