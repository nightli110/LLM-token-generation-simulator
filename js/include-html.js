function includeHTML(elementId, filePath) {
    console.log(`Attempting to load ${filePath} into ${elementId}`);
    const element = document.getElementById(elementId);
    
    if (location.protocol === 'file:') {
        // Local file system, use XMLHttpRequest
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    element.innerHTML = this.responseText;
                    console.log(`Successfully loaded ${filePath}`);
                } else {
                    console.error(`Error loading HTML: ${this.statusText}`);
                    element.innerHTML = `<p>Error loading content. Please try again later.</p>`;
                }
            }
        };
        xhr.open('GET', filePath, true);
        xhr.send();
    } else {
        // Server environment, use fetch as before
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                console.log(`Successfully loaded ${filePath}`);
            })
            .catch(error => {
                console.error(`Error loading HTML: ${error.message}`);
                element.innerHTML = `<p>Error loading content. Please try again later.</p>`;
            });
    }
}