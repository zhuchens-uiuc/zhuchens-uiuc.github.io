// Global variables
let allPublications = [];
let showingSelected = true;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, starting initialization...");
  
  // Load publications data
  loadPublications();
  
  // Initialize visit counter with a small delay to ensure DOM is ready
  setTimeout(updateVisitCounter, 100);
  
  // Initialize animation delays for sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add event listener for toggle button
  const toggleButton = document.getElementById('toggle-publications');
  if (toggleButton) {
    console.log("Toggle button found:", toggleButton);
    toggleButton.addEventListener('click', togglePublications);
  } else {
    console.error("Toggle button not found!");
  }
});

// Load publications from JSON file
function loadPublications() {
  console.log("Loading publications...");
  console.log("Current directory:", window.location.href);
  
  // Add timestamp to bypass cache
  const timestamp = new Date().getTime();
  fetch(`publications.json?t=${timestamp}`)
    .then(response => {
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.text(); // Get raw text first
    })
    .then(text => {
      console.log("Raw JSON text:", text);
      return JSON.parse(text); // Parse it manually
    })
    .then(data => {
      console.log("Publications loaded successfully:", data);
      console.log("Number of publications:", data.publications.length);
      console.log("First publication:", data.publications[0]);
      allPublications = data.publications;
      renderPublications(true);
    })
    .catch(error => {
      console.error('Error loading publications:', error);
      // Create fallback publications display if JSON loading fails
      displayFallbackPublications();
    });
}

// Fallback if JSON loading fails
function displayFallbackPublications() {
  const container = document.getElementById('publications-container');
  container.innerHTML = `Error loading publications.`;
}

// Toggle between showing all or selected publications
function togglePublications() {
  showingSelected = !showingSelected;
  renderPublications(showingSelected);
  
  // Update button text
  const toggleButton = document.getElementById('toggle-publications');
  toggleButton.textContent = showingSelected ? 'Show All' : 'Show Selected';
  const toggleHeader = document.getElementById('toggle-header');
  toggleHeader.textContent = showingSelected ? 'Selected Publications' : 'All Publications';
}

// Render publications based on selection state
function renderPublications(selectedOnly) {
  console.log("Rendering publications, selectedOnly:", selectedOnly);
  const publicationsContainer = document.getElementById('publications-container');
  console.log("Publications container:", publicationsContainer);
  
  if (!publicationsContainer) {
    console.error("Publications container not found!");
    return;
  }
  
  // Check what's currently in the container
  console.log("Current container HTML before clearing:", publicationsContainer.innerHTML);
  
  publicationsContainer.innerHTML = '';
  
  // Show all publications or just the most recent 5
  const pubsToShow = selectedOnly ? 
    allPublications.filter(pub => pub.selected === 1) : 
    allPublications;
  
  console.log("Publications to show:", pubsToShow);
  console.log("All publications array:", allPublications);
  
  if (pubsToShow.length === 0) {
    console.log("No publications to show!");
    publicationsContainer.innerHTML = '<p>No publications found.</p>';
    return;
  }
  
  pubsToShow.forEach((publication, index) => {
    console.log(`Creating element ${index} for:`, publication.title);
    const pubElement = createPublicationElement(publication);
    publicationsContainer.appendChild(pubElement);
  });
  
  console.log("Final container HTML:", publicationsContainer.innerHTML);
}

// Create HTML element for a publication
function createPublicationElement(publication) {
  const pubItem = document.createElement('div');
  pubItem.className = 'publication-item';
  
  // Create content container
  const content = document.createElement('div');
  content.className = 'pub-content';
  
  // Add title
  const title = document.createElement('div');
  title.className = 'pub-title';
  title.textContent = publication.title;
  content.appendChild(title);
  
  // Add authors with highlight for Zhuchen Shao
  const authors = document.createElement('div');
  authors.className = 'pub-authors';
  
  // Format authors with highlighting for Zhuchen Shao
  let authorsHTML = '';
  publication.authors.forEach((author, index) => {
    if (author.includes('Zhuchen Shao')) {
      authorsHTML += `<span class="highlight-name">${author}</span>`;
    } else {
      authorsHTML += author;
    }
    
    if (index < publication.authors.length - 1) {
      authorsHTML += ', ';
    }
  });
  
  authors.innerHTML = authorsHTML;
  content.appendChild(authors);
  
  // Add venue
  const venueContainer = document.createElement('div');
  venueContainer.className = 'pub-venue-container';
  
  const venue = document.createElement('div');
  venue.className = 'pub-venue';
  venue.textContent = publication.venue;
  venueContainer.appendChild(venue);
  
  content.appendChild(venueContainer);
  
  // Add links if they exist
  if (publication.links) {
    const links = document.createElement('div');
    links.className = 'pub-links';
    
    if (publication.links.pdf) {
      const pdfLink = document.createElement('a');
      pdfLink.href = publication.links.pdf;
      pdfLink.target = "_blank";
      pdfLink.textContent = '[PDF]';
      links.appendChild(pdfLink);
    }
    
    if (publication.links.code) {
      const codeLink = document.createElement('a');
      codeLink.href = publication.links.code;
      codeLink.target = "_blank";
      codeLink.textContent = '[Code]';
      links.appendChild(codeLink);
    }
    
    if (publication.links.project) {
      const projectLink = document.createElement('a');
      projectLink.href = publication.links.project;
      projectLink.target = "_blank";
      projectLink.textContent = '[Project Page]';
      links.appendChild(projectLink);
    }
    
    content.appendChild(links);
  }
  
  // Assemble the publication item
  pubItem.appendChild(content);
  
  return pubItem;
}

// Modal functionality for viewing original images
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Visit counter functionality
function updateVisitCounter() {
  console.log("Updating visit counter...");
  
  let visitCount = localStorage.getItem('visitCount') || 0;
  visitCount = parseInt(visitCount) + 1;
  localStorage.setItem('visitCount', visitCount);
  
  console.log("Visit count:", visitCount);
  
  // Update the footer with visit count
  const footer = document.querySelector('footer p');
  console.log("Footer element found:", footer);
  
  if (footer) {
    const currentText = footer.innerHTML;
    console.log("Current footer text:", currentText);
    
    if (!currentText.includes('Visit count:')) {
      const newText = currentText + ' Visit count: <span class="visit-count">' + visitCount + '</span>';
      footer.innerHTML = newText;
      console.log("Updated footer text:", newText);
    } else {
      console.log("Visit count already exists in footer");
    }
  } else {
    console.error("Footer element not found!");
  }
}
