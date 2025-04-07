document
   .querySelector('.mobile-menu-toggle')
   .addEventListener('click', function () {
      document.querySelector('nav').classList.toggle('active');
   });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
         });
      }

      document.querySelector('nav').classList.remove('active');
   });
});

document
   .getElementById('contact-form')
   .addEventListener('submit', function (e) {
      e.preventDefault();

      const form = this;
      const formData = new FormData(form);
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      fetch(form.action, {
         method: form.method,
         body: formData,
         headers: {
            Accept: 'application/json',
         },
      })
         .then((response) => {
            if (response.ok) {
               form.reset();
               form.style.display = 'none';

               const successMessage = document.createElement('div');
               successMessage.className = 'success-message';
               successMessage.innerHTML =
                  "<h3>Thank you for your message!</h3><p>I'll get back to you as soon as possible.</p>";
               form.parentNode.insertBefore(successMessage, form.nextSibling);
            } else {
               throw new Error('Form submission failed');
            }
         })
         .catch((error) => {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.innerHTML =
               '<p>There was a problem submitting your form. Please try again or email me directly.</p>';
            form.parentNode.insertBefore(errorElement, form);

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

            console.error('Form submission error:', error);
         });
   });

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
   let current = '';

   sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
         current = section.getAttribute('id');
      }
   });

   navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
         link.classList.add('active');
      }
   });
});

document.addEventListener('DOMContentLoaded', function () {
   
   const projectsSection = document.getElementById('projects');
   if (projectsSection) {
      projectsSection.style.display = 'block';
   }

   const projectCards = document.querySelectorAll('.project-card');
   projectCards.forEach((card) => {
      card.style.display = 'flex';
      card.style.opacity = '1';
   });

   console.log('Portfolio site loaded successfully!');
   console.log('Number of project cards found:', projectCards.length);
});
