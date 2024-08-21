document.addEventListener('DOMContentLoaded', function(){
    let toggleButton = document.getElementById('toggleButton');
    let input = document.getElementById('input');
    let noResults = document.getElementById('noResults');
    let bio = document.getElementById('bio');
    let location = document.getElementById('location');
    let twitter = document.getElementById('twitter');
    let twitterStyle = twitter.style;
    let website = document.getElementById('website');
    input.value = 'octocat';

    document.getElementById('search').addEventListener('click', performSearch);
    input.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            performSearch();
        }
    });
    function performSearch() {

        fetch(`https://api.github.com/users/${input.value}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    noResults.classList.remove('hidden');
                }
                // Skip the next 'then' block
                throw new Error('User not found');
            }

            return response.json();
        })
        .then(data =>{
            let avatar = document.getElementById('avatar');

            let dateParts = data.created_at.substring(0, 10).split('-');
            const monthNames = [
                "Jan", "Feb", "March", "April", "May", "June",
                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            let monthName = monthNames[parseInt(dateParts[1], 10) - 1];
            let formattedDate = `${dateParts[2]} ${monthName} ${dateParts[0]}`;

            noResults.classList.add('hidden');

            avatar.src = data.avatar_url;
            avatar.alt = `${data.name}'s avatar`;

            document.getElementById('date').innerText = formattedDate;
            document.getElementById('name').innerText = data.name || data.login;
            document.getElementById('realName').innerText = data.login;
            bio.innerText = data.bio || 'This profile has no bio';
            if(bio.innerText !== 'This profile has no bio'){
                bio.style.color = '#rgb(143, 163, 193)';
            }
            document.getElementById('repos').innerText = data.public_repos;
            document.getElementById('followers').innerText = data.followers;
            document.getElementById('following').innerText = data.following;

            location.innerText = data.location;
            if(data.location == null){
                location.style.color = 'rgb(143, 163, 193)';
                location.innerText = 'Not Available';
            } else{
                location.style.color = 'var(--link-color)';
            }

            twitter.innerText = data.twitter_username || 'Not Available';
            if(data.twitter_username == null){
                twitterStyle.color = 'rgb(143, 163, 193)';
                twitter.innerText = 'Not Available';            
                twitterStyle.pointerEvents  = "none";
                document.querySelector('.twitterWrapper').style.cursor = "text";
            } else{
                twitter.href = `https://twitter.com/${data.twitter_username}`;
                twitterStyle.color = 'var(--link-color)';
                twitterStyle.pointerEvents = "all";
                document.querySelector('.twitterWrapper').style.cursor = "default";
                twitterStyle.cursor = 'pointer';
            }
            
            
            website.innerText = data.blog || 'Not Available';
            if(data.blog == null || data.blog == ''){
                website.style.color = 'rgb(143, 163, 193)';
                website.innerText = 'Not Available';
                website.style.pointerEvents = "none";
                document.querySelector('.websiteWrapper').style.cursor = "text";
            } else {
                let blogUrl = data.blog;
                if (!blogUrl.startsWith('http://') && !blogUrl.startsWith('https://')) {
                    blogUrl = `https://${blogUrl}`;
                }
                
                if (blogUrl.startsWith('https://')) {
                    blogUrl = blogUrl.substring(8);
                }
            
                website.innerText = blogUrl;
                website.href = `https://${blogUrl}`;
                website.style.color = 'var(--link-color)';
                website.style.pointerEvents = "all";
                document.querySelector('.websiteWrapper').style.cursor = "default";
                website.style.cursor = 'pointer';
            }
            

            document.getElementById('company').innerText = data.company || 'Not Available';
            if(data.company == null){
                document.getElementById('company').style.color = 'rgb(143, 163, 193)';
                document.getElementById('company').innerText = 'Not Available';
            } else{
                document.getElementById('company').style.color = 'var(--link-color)';
            }

            input.value = '';
            console.log(data);
        });
    }

    performSearch();


    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('light');

        if (document.body.classList.contains('light')) {
            toggleButton.innerHTML = `Dark<img src="assets/icon-moon.svg" alt="moon" class="iconButton moon">`;
        } else {
            toggleButton.innerHTML = `Light<img src="assets/icon-sun.svg" alt="sun" class="iconButton">`;
        }
    });
});
