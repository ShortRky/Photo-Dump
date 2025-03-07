document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.getElementById('photoGrid');
    const modal = document.getElementById('photoModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalMetadata = modal.querySelector('.modal-metadata');
    const closeButton = modal.querySelector('.close-button');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    let loading = false;
    let hasMore = true;

    function createPhotoElement(photo) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        const img = document.createElement('img');
        img.src = photo.imageUrl;
        img.alt = photo.title;
        img.loading = 'lazy';
        div.appendChild(img);
        
        // Add random glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance to glitch
                div.style.animation = 'glitch 0.3s infinite';
                setTimeout(() => {
                    div.style.animation = 'borderPulse 4s infinite';
                }, 300);
            }
        }, 2000);
        
        div.addEventListener('click', () => showModal(photo));
        return div;
    }

    function showModal(photo) {
        modalImage.src = photo.imageUrl;
        modalTitle.textContent = photo.title;
        modalDescription.textContent = photo.description;
        modalMetadata.innerHTML = `
            <p>📍 ${photo.location}</p>
            <p>📅 ${photo.date}</p>
            <p>📸 ${photo.camera.body} with ${photo.camera.lens}</p>
            <p>🎚️ ${photo.camera.settings}</p>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add glitch effect on modal open
        modalContent.style.animation = 'glitch 0.3s';
        setTimeout(() => {
            modalContent.style.animation = 'modalGlow 4s infinite';
        }, 300);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalImage.src = '';
    }

    closeButton.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    async function loadMorePhotos() {
        if (loading || !hasMore) return;
        
        loading = true;
        loadingSpinner.style.display = 'block';

        try {
            const photos = await fetchMorePhotos();
            if (photos.length === 0) {
                hasMore = false;
            } else {
                photos.forEach(photo => {
                    photoGrid.appendChild(createPhotoElement(photo));
                });
            }
        } catch (error) {
            console.error('Error loading photos:', error);
        } finally {
            loading = false;
            loadingSpinner.style.display = 'none';
        }
    }

    // Infinite scroll
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
            loadMorePhotos();
        }
    });

    observer.observe(loadingSpinner);

    // Initial load
    loadMorePhotos();

    // Add random global glitch effect
    setInterval(() => {
        if (Math.random() > 0.98) { // 2% chance to glitch everything
            document.body.style.filter = 'hue-rotate(90deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 100);
        }
    }, 3000);
});
