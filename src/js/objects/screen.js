
const screen = {
    userProfile: document.querySelector('.profile'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="profile__header">
                         <img
                         src="${user.avatarUrl}"
                         alt="User profile Image"
                         class="profile__img"
                         />
                         <div>
                           <h1 class="profile__name">${user.name ?? "Do not have a name"}</h1>
                           <p class="profile__username">@${user.userName}</p>
                           <p class="profile__bio">
                               ${user.bio ?? "Do not have a bio"}
                           </p>
                         </div>
                     </div>
                     <div class="profile__info">
                         <ul>
                           <li class="profile__followers">Followers</li>
                           <li class="profile__followers-item">${user.followers}</li>
                         </ul>
                         <ul>
                           <li class="profile__following">Following</li>
                           <li class="profile__following-item">${user.following}</li>
                         </ul>
                     </div> `;

        let repositoriesItens = "";
         user.repositories.forEach(repo => {
         repositoriesItens += `<li>
                                  <a href="${repo.html_url}" target ="_blank">
                                  ${repo.name}
                                 <div class="repositories__icons">
                                  🍴${repo.forks} ⭐${repo.stargazers_count} 👀${repo.watchers} 👨‍💻${repo.language}
                                 </div>
                                  </a>
                               </li>`
         })
        
        if(user.repositories.length > 0) {
            document.querySelector('.repositories').innerHTML = `<h2>Repositories</h2>
                                                                 <ul class="repositories__list">
                                                                  ${repositoriesItens}
                                                                </ul>`;
        };

        let eventsItens = "";
        const eventsFilter = user.events.filter
        (e => e.payload.commits !== undefined).slice(0,10);

        eventsFilter.forEach(event => {
          const repoName = event.repo.name;
          const repoMessage = event.payload.commits[0].message;
      
          eventsItens += `<li>${repoName} - <span>${repoMessage}</span></li>`
        });

        if(user.events.length > 0) {
          document.querySelector('.events').innerHTML = `<h2>Events</h2>
                                                         <ul class="events__list">
                                                           ${eventsItens}
                                                         </ul>`;
        }
    },
    renderNotFound() {
      this.userProfile.innerHTML = "<h3>User not found<h3>";
      document.querySelector('.repositories').innerHTML = "";
      document.querySelector('.events').innerHTML = "";
    }
};

export { screen };