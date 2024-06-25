document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchVideos(query);
    }
});

function fetchVideos(query) {
    const apiKey = 'AIzaSyBXoqLtyyL7Rvkj-tbrwdwgV08BArM7NoU';  
    const videoSection = document.getElementById('videoSection');
    videoSection.innerHTML = '';

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.items) {
                data.items.forEach((el) => {
                    const videoId = el.id.videoId;
                    const thumbnailUrl = el.snippet.thumbnails.high.url;
                    const title = el.snippet.title;

                    const videoElement = document.createElement('div');
                    videoElement.classList.add('yt-video');
                    videoElement.innerHTML = `
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${thumbnailUrl}" alt="${title}" />
                            <h3>${title}</h3>
                        </a>
                    `;
                    videoSection.appendChild(videoElement);
                });
            } else {
                videoSection.innerHTML = '<p>No videos found.</p>';
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            videoSection.innerHTML = '<p>Error fetching data.</p>';
        });
}