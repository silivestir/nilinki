document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nilinki-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (page reload)
            const page = this.getAttribute('href'); // Get the page to load
            loadContent(page); // Load content for the clicked page
        });
    });
});

function loadContent(page) {
  if(page=='/class.html'){
  
  window.location.href='/class.html'}
  else if('/chat.html'){
      window.location.href='/chat.html'}
    if(page=='/private.html'){
        window.location.href='/private.html'}
    /*  else{
        window.location.href='/chat.html'
  }
  */
  /*
    // Fetch content from the server using AJAX
    fetch(page)
        .then(response => response.text()) // Parse response as text
        .then(html => {
            // Update the content area with the fetched HTML
            document.querySelector('.container').innerHTML = html;
            
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });*/
}
