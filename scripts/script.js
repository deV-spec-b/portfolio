function openModal(modalId) {
    console.log('Пытаюсь открыть модалку:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Модалка открыта!');
    } else {
        console.error('Модалка не найдена:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Закрываю модалку:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-page-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

console.log('JavaScript загружен! Модалки должны работать.');


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (nameInput) {
            nameInput.addEventListener('input', function() {
                validateName();
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                validateMessage();
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                validateEmail();
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                alert('Сообщение отправлено!');
                this.reset();
                hideError('name-error');
                hideError('email-error');
                hideError('message-error');
            }
        });
    }
});

function validateName() {
    const nameInput = document.getElementById('name');
    if (!nameInput) return true;
    
    const value = nameInput.value.trim();
    if (value.length < 2) {
        showError('name-error', 'Имя должно содержать минимум 2 символа');
        return false;
    } else {
        hideError('name-error');
        return true;
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    if (!emailInput) return true;
    
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError('email-error', 'Введите корректный email адрес');
        return false;
    } else {
        hideError('email-error');
        return true;
    }
}

function validateMessage() {
    const messageInput = document.getElementById('message');
    if (!messageInput) return true;
    
    const value = messageInput.value.trim();
    if (value.length < 10) {
        showError('message-error', 'Сообщение должно содержать минимум 10 символов');
        return false;
    } else {
        hideError('message-error');
        return true;
    }
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('visually-hidden');
    }
}

function hideError(id) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.classList.add('visually-hidden');
    }
}