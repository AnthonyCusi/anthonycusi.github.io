// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});
// Project data
const projects = [
    {
        id: 1,
        title: "Predictive Customer Churn Model",
        description: "Built a model predicting customer churn with 92% accuracy using XGBoost and SHAP for explainability. The project involved feature engineering, model selection, and deployment as a REST API. The model helped reduce churn by 15% for the client.",
        image: "http://static.photos/technology/1024x576/1",
        tags: ["Machine Learning", "XGBoost", "SHAP", "Python", "Scikit-learn"]
    },
    {
        id: 2,
        title: "Interactive COVID-19 Dashboard",
        description: "Created an interactive dashboard tracking pandemic metrics using Plotly Dash and deployed on Heroku. The dashboard included time-series analysis, geospatial visualization, and real-time data updates from multiple sources.",
        image: "http://static.photos/technology/1024x576/2",
        tags: ["Data Visualization", "Plotly", "Dash", "Python", "Heroku"]
    },
    {
        id: 3,
        title: "Sentiment Analysis API",
        description: "Developed a sentiment analysis service using BERT and FastAPI for processing customer reviews. The API could process 1000+ reviews per minute with 89% accuracy and provided sentiment scores and key phrases.",
        image: "http://static.photos/technology/1024x576/3",
        tags: ["NLP", "BERT", "FastAPI", "Transformers", "Docker"]
    },
    {
        id: 4,
        title: "Retail Demand Forecasting",
        description: "Implemented Prophet and ARIMA models to forecast product demand for a retail chain. The solution reduced inventory costs by 22% and improved stock availability to 98% across all stores.",
        image: "http://static.photos/technology/1024x576/4",
        tags: ["Time Series", "Prophet", "ARIMA", "Pandas", "Statsmodels"]
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Setup project modals
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            const project = projects[index];
            const modal = document.querySelector('custom-modal');
            modal.open(project.title, project.description, project.image, project.tags);
        });
    });

    // Highlight current section in nav
window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Contact form submission (uses Formspree)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const status = document.getElementById('form-status');
            if (status) status.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            try {
                const res = await fetch(contactForm.action, {
                    method: contactForm.method || 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    contactForm.reset();
                    if (status) status.textContent = 'Thanks — message sent!';
                } else {
                    const data = await res.json().catch(() => ({}));
                    if (status) status.textContent = data.error || 'Error sending message.';
                }
            } catch (err) {
                if (status) status.textContent = 'Network error — check form action URL.';
            }

            setTimeout(() => { if (status) status.textContent = ''; }, 5000);
        });
    }
});