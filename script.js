// E-Paper Newspaper Application
class EPaperApp {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 12;
        this.zoomLevel = 100;
        this.isFullscreen = false;
        
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.setCurrentDate();
        this.generateThumbnails();
        this.loadPage(1);
    }

    cacheDOM() {
        this.dateElement = document.getElementById('currentDate');
        this.datePicker = document.getElementById('datePicker');
        this.goToDateBtn = document.getElementById('goToDate');
        this.currentPageSpan = document.getElementById('currentPage');
        this.totalPagesSpan = document.getElementById('totalPages');
        this.currentPageImage = document.getElementById('currentPageImage');
        this.pageContainer = document.getElementById('pageContainer');
        this.pageLoading = document.getElementById('pageLoading');
        this.thumbnailsGrid = document.getElementById('thumbnailsGrid');
        this.zoomLevelSpan = document.getElementById('zoomLevel');
        this.pastDatesList = document.getElementById('pastDatesList');
        
        // Buttons
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.navLeftBtn = document.getElementById('navLeft');
        this.navRightBtn = document.getElementById('navRight');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.fullscreenBtn = document.getElementById('fullscreen');
        this.downloadBtn = document.getElementById('download');
        this.menuToggle = document.getElementById('menuToggle');
    }

    bindEvents() {
        // Navigation
        this.prevPageBtn.addEventListener('click', () => this.prevPage());
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
        this.navLeftBtn.addEventListener('click', () => this.prevPage());
        this.navRightBtn.addEventListener('click', () => this.nextPage());
        
        // Zoom
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        
        // Fullscreen
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        
        // Download
        this.downloadBtn.addEventListener('click', () => this.downloadPDF());
        
        // Date picker
        this.goToDateBtn.addEventListener('click', () => this.goToDate());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch/Swipe support
        this.pageContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.pageContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Mobile menu
        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Past dates sidebar
        if (this.pastDatesList) {
            this.pastDatesList.addEventListener('click', (e) => this.handleDateSelection(e));
        }
    }

    handleDateSelection(e) {
        const dateItem = e.target.closest('.date-item');
        if (!dateItem) return;
        
        // Remove active class from all items
        const allDateItems = this.pastDatesList.querySelectorAll('.date-item');
        allDateItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked item
        dateItem.classList.add('active');
        
        // Get the date and load that newspaper
        const selectedDate = dateItem.dataset.date;
        this.datePicker.value = selectedDate;
        
        // Show alert for demo (in production, this would load actual newspaper for that date)
        alert(`${selectedDate} కోసం వార్తాపత్రిక లోడ్ అవుతోంది`);
        
        // Reset to page 1 for new date
        this.loadPage(1);
    }

    setCurrentDate() {
        const now = new Date();
        const teluguMonths = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
        const teluguDays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
        
        const day = teluguDays[now.getDay()];
        const date = now.getDate();
        const month = teluguMonths[now.getMonth()];
        const year = now.getFullYear();
        
        this.dateElement.textContent = `${day}, ${date} ${month}, ${year}`;
        
        // Set date picker to today
        const today = now.toISOString().split('T')[0];
        this.datePicker.value = today;
    }

    loadPage(pageNum) {
        if (pageNum < 1 || pageNum > this.totalPages) return;
        
        // Show loading
        this.pageLoading.classList.add('active');
        
        // Update current page
        this.currentPage = pageNum;
        this.currentPageSpan.textContent = pageNum;
        
        // Simulate page loading (in production, this would load actual images)
        setTimeout(() => {
            // For demo, using placeholder. In production, use actual newspaper page images
            this.currentPageImage.src = `pages/page-${pageNum}.png`;
            this.currentPageImage.alt = `Newspaper Page ${pageNum}`;
            this.pageLoading.classList.remove('active');
        }, 300);
        
        // Update thumbnails
        this.updateThumbnails();
        
        // Update button states
        this.updateButtonStates();
        
        // Scroll to page viewer on mobile
        if (window.innerWidth <= 768) {
            document.getElementById('pageViewer').scrollIntoView({ behavior: 'smooth' });
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.loadPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.loadPage(this.currentPage + 1);
        }
    }

    goToPage(pageNum) {
        this.loadPage(pageNum);
    }

    zoomIn() {
        if (this.zoomLevel < 200) {
            this.zoomLevel += 25;
            this.updateZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 50) {
            this.zoomLevel -= 25;
            this.updateZoom();
        }
    }

    updateZoom() {
        this.zoomLevelSpan.textContent = `${this.zoomLevel}%`;
        this.pageContainer.style.transform = `scale(${this.zoomLevel / 100})`;
    }

    toggleFullscreen() {
        const viewer = document.getElementById('pageViewer');
        
        if (!this.isFullscreen) {
            if (viewer.requestFullscreen) {
                viewer.requestFullscreen();
            } else if (viewer.webkitRequestFullscreen) {
                viewer.webkitRequestFullscreen();
            } else if (viewer.msRequestFullscreen) {
                viewer.msRequestFullscreen();
            }
            this.isFullscreen = true;
            this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
            this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    downloadPDF() {
        const date = this.datePicker.value;
        alert(`${date} కోసం PDF డౌన్‌లోడ్ అవుతోంది - పేజీ ${this.currentPage}`);
    }

    goToDate() {
        const selectedDate = this.datePicker.value;
        if (selectedDate) {
            alert(`${selectedDate} కోసం వార్తాపత్రిక లోడ్ అవుతోంది`);
            this.loadPage(1);
        }
    }

    generateThumbnails() {
        this.thumbnailsGrid.innerHTML = '';
        
        for (let i = 1; i <= this.totalPages; i++) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-item' + (i === 1 ? ' active' : '');
            thumbnail.innerHTML = `
                <img src="pages/page-${i}.png" alt="Page ${i}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22150%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22150%22/%3E%3Ctext x=%2250%22 y=%2275%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2214%22%3EPage ${i}%3C/text%3E%3C/svg%3E'">
                <div class="thumbnail-number">Page ${i}</div>
            `;
            thumbnail.addEventListener('click', () => this.goToPage(i));
            this.thumbnailsGrid.appendChild(thumbnail);
        }
    }

    updateThumbnails() {
        const thumbnails = this.thumbnailsGrid.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index + 1 === this.currentPage);
        });
    }

    updateButtonStates() {
        this.prevPageBtn.disabled = this.currentPage === 1;
        this.navLeftBtn.disabled = this.currentPage === 1;
        this.nextPageBtn.disabled = this.currentPage === this.totalPages;
        this.navRightBtn.disabled = this.currentPage === this.totalPages;
        
        this.prevPageBtn.style.opacity = this.currentPage === 1 ? '0.5' : '1';
        this.navLeftBtn.style.opacity = this.currentPage === 1 ? '0.5' : '1';
        this.nextPageBtn.style.opacity = this.currentPage === this.totalPages ? '0.5' : '1';
        this.navRightBtn.style.opacity = this.currentPage === this.totalPages ? '0.5' : '1';
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.prevPage();
                break;
            case 'ArrowRight':
                this.nextPage();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                }
                break;
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next page
                this.nextPage();
            } else {
                // Swipe right - previous page
                this.prevPage();
            }
        }
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-active');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EPaperApp();
    initBreakingNewsSlider();
});

// Breaking News Slider
function initBreakingNewsSlider() {
    const slides = document.querySelectorAll('.breaking-slide');
    const dots = document.querySelectorAll('.breaking-dots .dot');
    const prevBtn = document.getElementById('breakingPrev');
    const nextBtn = document.getElementById('breakingNext');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Start auto-slide
    if (slides.length > 0) startAutoSlide();
}

// Handle fullscreen change
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        const fullscreenBtn = document.getElementById('fullscreen');
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
});

// WhatsApp Share Button - Show icon+text initially, after 15s show only icon
document.addEventListener('DOMContentLoaded', () => {
    const whatsappText = document.getElementById('whatsappText');
    if (whatsappText) {
        // Initially show both icon and text (visible by default)
        // After 15 seconds, hide the text
        setTimeout(() => {
            whatsappText.style.display = 'none';
        }, 15000);
    }
    
    // Initialize Weather Slider
    initWeatherSlider();
});

// Weather Slider for Multiple Locations with Real-time Data
function initWeatherSlider() {
    const slides = document.querySelectorAll('.weather-slide');
    const dots = document.querySelectorAll('.weather-dots .dot');
    const prevBtn = document.getElementById('weatherPrev');
    const nextBtn = document.getElementById('weatherNext');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // API configuration - Replace with your OpenWeatherMap API key
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get free key from openweathermap.org
    const locations = [
        { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, teluguName: 'హైదరాబాద్' },
        { name: 'Vijayawada', lat: 16.5062, lon: 80.6480, teluguName: 'విజయవాడ' },
        { name: 'Tirupati', lat: 13.6288, lon: 79.4192, teluguName: 'తిరుపతి' }
    ];

    // Fetch real-time weather and forecast data
    async function fetchWeatherData(lat, lon) {
        try {
            // Using Open-Meteo API (free, no key required)
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Weather fetch error:', error);
            return null;
        }
    }

    // Get Telugu day name
    function getTeluguDayName(date) {
        const days = ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'];
        return days[date.getDay()];
    }

    // Render 5-day forecast
    function renderForecast(daily, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !daily) return;
        
        let html = '';
        for (let i = 0; i < 5; i++) {
            const date = new Date(daily.time[i]);
            const dayName = getTeluguDayName(date);
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);
            const weatherCode = daily.weather_code[i];
            const icon = getWeatherIcon(weatherCode);
            
            html += `
                <div class="forecast-item">
                    <span class="forecast-day">${dayName}</span>
                    <i class="fas ${icon}"></i>
                    <span class="forecast-temp">${maxTemp}° / ${minTemp}°</span>
                </div>
            `;
        }
        container.innerHTML = html;
    }

    // Get weather icon based on weather code
    function getWeatherIcon(code) {
        // WMO Weather interpretation codes
        if (code === 0) return 'fa-sun'; // Clear sky
        if (code >= 1 && code <= 3) return 'fa-cloud-sun'; // Partly cloudy
        if (code >= 45 && code <= 48) return 'fa-smog'; // Fog
        if (code >= 51 && code <= 67) return 'fa-cloud-rain'; // Rain
        if (code >= 71 && code <= 77) return 'fa-snowflake'; // Snow
        if (code >= 80 && code <= 82) return 'fa-cloud-showers-heavy'; // Showers
        if (code >= 95) return 'fa-bolt'; // Thunderstorm
        return 'fa-cloud';
    }

    // Get weather description in Telugu
    function getWeatherDesc(code) {
        if (code === 0) return 'ఎండగా ఉంది';
        if (code >= 1 && code <= 3) return 'పాప్చిగా మేఘావృతం';
        if (code >= 45 && code <= 48) return 'పొగమంచు';
        if (code >= 51 && code <= 67) return 'వర్షం';
        if (code >= 71 && code <= 77) return 'మంచు';
        if (code >= 80 && code <= 82) return 'తేలికపాటి వర్షం';
        if (code >= 95) return 'పిడుగు';
        return 'మేఘావృతం';
    }

    // Update weather display with real data
    async function updateWeatherDisplay() {
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            const slide = slides[i];
            
            const weatherData = await fetchWeatherData(location.lat, location.lon);
            
            if (weatherData && weatherData.current) {
                const current = weatherData.current;
                
                // Update temperature
                const tempEl = slide.querySelector('.weather-temp');
                if (tempEl) tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
                
                // Update humidity
                const humidityEl = slide.querySelector('.weather-item:nth-child(1) .weather-value');
                if (humidityEl) humidityEl.textContent = `${current.relative_humidity_2m}%`;
                
                // Update wind speed
                const windEl = slide.querySelector('.weather-item:nth-child(2) .weather-value');
                if (windEl) windEl.textContent = `${current.wind_speed_10m} km/h`;
                
                // Update weather icon
                const iconEl = slide.querySelector('.weather-icon i');
                if (iconEl) {
                    iconEl.className = `fas ${getWeatherIcon(current.weather_code)}`;
                }
                
                // Update description
                const descEl = slide.querySelector('.weather-desc');
                if (descEl) descEl.textContent = getWeatherDesc(current.weather_code);
                
                // Update 5-day forecast
                const forecastId = `forecast-${location.name.toLowerCase()}`;
                if (weatherData.daily) {
                    renderForecast(weatherData.daily, forecastId);
                }
            }
        }
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Initialize
    updateWeatherDisplay(); // Fetch real-time data
    
    // Refresh weather data every 10 minutes
    setInterval(updateWeatherDisplay, 600000);
    
    // Start auto-slide
    if (slides.length > 0) startAutoSlide();
}
