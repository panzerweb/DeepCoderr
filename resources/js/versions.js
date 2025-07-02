/*
    This fetches all previous releases of the website's version
*/
fetch('../../updates.json')
.then(response => response.json())
.then(data => {
    let allVersions = document.getElementById("versions");
    const changesList = data
        .filter(version => version.previousVersion == true)
        .map(update => 
        `
        <div class="col-12 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="mb-2">
                        ✅ ${update.changes}
                    </p>
                    <h6><span class="badge text-bg-secondary">Version ${update.version_number}</span></h6>
                    <small class="text-muted">${update.version_date}</small>
                </div>
            </div>
        </div>
        `)
        .join('');
    
        allVersions.innerHTML = changesList;
})
/*
    This fetches all the new releases of the new version
*/
fetch('../../updates.json')
.then(response => response.json())
.then(data => {
    let newVersion = document.getElementById("new_versions");
    const changesList = data
        .filter(version => version.previousVersion == false)
        .map(update => 
        `
        <div class="col-12 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="mb-2">
                        🆕 ${update.changes}
                    </p>
                    <h6><span class="badge text-bg-secondary">Version ${update.version_number}</span></h6>
                    <small class="text-muted">${update.version_date}</small>
                </div>
            </div>
        </div>
        `)
        .join('');
    
        newVersion.innerHTML = changesList;
})

/*
    This fetches all the bugs of the new version
*/
fetch('../../bugs.json')
.then(response => response.json())
.then(data => {
    let bugElement = document.getElementById("bugs");
    const changesList = data
        .filter(version => version.previousVersion == false)
        .map(bug => 
        `
        <div class="col-12 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="mb-2">
                        🐞 ${bug.bug_name}
                    </p>
                    <h6><span class="badge text-bg-secondary">Version ${bug.version_number}</span></h6>
                    <small class="text-muted">${bug.version_date}</small>
                </div>
            </div>
        </div>
        `)
        .join('');
    
        bugElement.innerHTML = changesList;
})